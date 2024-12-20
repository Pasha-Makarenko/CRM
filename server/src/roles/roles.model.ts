import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript"
import { ApiProperty } from "@nestjs/swagger"
import { User } from "../users/users.model"
import { UserRoles } from "./user-roles.model"

interface RoleCreationAttributes {
  value: string
}

@Table({ tableName: "roles" })
export class Role extends Model<Role, RoleCreationAttributes> {
  @ApiProperty({ example: 1, description: "Unique identifier" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number

  @ApiProperty({ example: "ADMIN", description: "Role value" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string

  @BelongsToMany(() => User, () => UserRoles)
  users: Array<User>
}