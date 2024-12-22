import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common"
import { CreateUserDto } from "../users/dto/create-user.dto"
import { UsersService } from "../users/users.service"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcryptjs"
import { User } from "../users/users.model"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
              private jwtService: JwtService,
              private configService: ConfigService) {
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto)

    if (!user) {
      throw new BadRequestException("Invalid credentials")
    }

    const roles = await this.usersService.getUserRoles(user.id)
    user.roles = roles

    return this.generateToken(user)
  }

  async register(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(userDto.email)

    if (candidate) {
      throw new HttpException("User with this email already exists", HttpStatus.CONFLICT)
    }

    const hashPassword = await bcrypt.hash(userDto.password, Number(this.configService.get<number>("SALT")))
    const user = await this.usersService.createUser({ ...userDto, password: hashPassword })

    return this.generateToken(user)
  }

  private async generateToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: user.roles
    }

    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email)

    if (!user) {
      throw new NotFoundException(`User with email ${userDto.email} not found`)
    }

    const passwordEquals = await bcrypt.compare(userDto.password, user.password)

    if (passwordEquals) {
      return user
    }

    throw new BadRequestException("Invalid credentials")
  }
}
