import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { CreateUserDto } from "../users/dto/create-user.dto"
import { UsersService } from "../users/users.service"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcryptjs"

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
              private jwtService: JwtService) {
  }

  async login(userDto: CreateUserDto) {
  }

  async register(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(userDto.email)

    if (candidate) {
      throw new HttpException("User with this email already exists", HttpStatus.CONFLICT)
    }

    const hashPassword = await bcrypt.hash(userDto.password, process.env.SALT)
    const user = await this.usersService.createUser({ ...userDto, password: hashPassword })

    return this.generateToken(user)
  }

  async generateToken(user) {
    const payload = { email: user.email, id: user.id, roles: user.roles }
    return {
      token: this.jwtService.sign(payload)
    }
  }
}
