import { Injectable } from "@nestjs/common"
import { CreateUserDto } from "../users/dto/create-user.dto"
import { UsersService } from "../users/users.service"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
              private jwtService: JwtService) {
  }

  async login(userDto: CreateUserDto) {
  }
}
