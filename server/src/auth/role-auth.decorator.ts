import { SetMetadata } from "@nestjs/common"
import { Roles } from "../roles/roles.model"

export const ROLES_KEY = "roles"

export const RoleAuth = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles)