import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript"
import { ApiProperty } from "@nestjs/swagger"
import { Order } from "../orders/orders.model"

export enum Roles {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  USER = "USER"
}

interface UserCreationAttributes {
  name: string
  email: string
  password: string
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({ example: 1, description: "Unique identifier" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number

  @ApiProperty({ example: "Name", description: "User name" })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string

  @ApiProperty({ example: "example@gmail.com", description: "User email" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string

  @ApiProperty({ example: "12345678Aa", description: "User password" })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string

  @ApiProperty({ example: Roles.USER, description: "User role" })
  @Column({ type: DataType.ENUM(...Object.values(Roles)), defaultValue: Roles.USER })
  role: Roles

  @ApiProperty({ example: 1, description: "Manager identifier (if user role is \"USER\")" })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: true })
  managerId: number

  @BelongsTo(() => User, "managerId")
  manager: User

  @HasMany(() => User, "managerId")
  subordinates: User[]

  @HasMany(() => Order)
  orders: Order[]
}