import { Body, Controller, Post } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { CreateUserDto } from "../users/dto/create-user.dto"
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"

@ApiTags("Authorization")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @ApiOperation({ summary: "User authorization" })
  @ApiResponse({ status: 200, type: CreateUserDto })
  @Post("/login")
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto)
  }

  @ApiOperation({ summary: "User registration" })
  @ApiResponse({ status: 200, type: CreateUserDto })
  @Post("/register")
  register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto)
  }
}
