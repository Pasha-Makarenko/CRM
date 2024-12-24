import { Body, Controller, Get, Param, Put, UseGuards } from "@nestjs/common"
import { ApiOperation, ApiResponse } from "@nestjs/swagger"
import { Roles, User } from "../users/users.model"
import { RoleAuth } from "../decorators/role-auth.decorator"
import { JwtAuthGuard } from "../guards/jwt-auth.guard"
import { RolesGuard } from "../guards/roles.guard"
import { AssignManagerDto } from "../dto/assign-manager.dto"
import { SubordinationService } from "./subordination.service"
import { GetSubordinatesGuard } from "../guards/get-subordinates.guard"

@Controller("subordination")
export class SubordinationController {
  constructor(private subordinationService: SubordinationService) {
  }

  @ApiOperation({ summary: "Assign manager" })
  @ApiResponse({ status: 200, type: User })
  @RoleAuth(Roles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put("/assign")
  assignManager(@Body() dto: AssignManagerDto) {
    return this.subordinationService.assignManager(dto)
  }

  @ApiOperation({ summary: "Unassign manager" })
  @ApiResponse({ status: 200, type: User })
  @RoleAuth(Roles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put("/unassign")
  unassignManager(@Body() dto: AssignManagerDto) {
    return this.subordinationService.unassignManager(dto)
  }

  @ApiOperation({ summary: "Get manager subordinates" })
  @ApiResponse({ status: 200, type: [ User ] })
  @UseGuards(JwtAuthGuard, GetSubordinatesGuard)
  @Get("/:userId")
  getSubordinates(@Param("userId") userId: number) {
    return this.subordinationService.getManagerSubordinates(userId)
  }
}
