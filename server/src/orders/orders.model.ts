import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { ApiProperty } from "@nestjs/swagger"
import { User } from "../users/users.model"

export enum OrderStatus {
  CREATED = "CREATED",
  PROCESSED = "PROCESSED",
  DONE = "DONE",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED"
}

interface OrderCreationAttributes {
  status: OrderStatus
  dueDate: Date
  description: string
  contact: string
  userId: number
}

@Table({ tableName: "orders" })
export class Order extends Model<Order, OrderCreationAttributes> {
  @ApiProperty({ example: 1, description: "Unique identifier" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number

  @ApiProperty({ example: "CREATED", description: "Order status" })
  @Column({ type: DataType.ENUM(...Object.values(OrderStatus)), allowNull: false, defaultValue: OrderStatus.CREATED })
  status: OrderStatus

  @ApiProperty({ example: "2021-10-01", description: "Due date" })
  @Column({ type: DataType.DATE, allowNull: false })
  dueDate: Date

  @ApiProperty({ example: "Some description", description: "Order description" })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string

  @ApiProperty({ example: "example@gmail.com", description: "Contact person" })
  @Column({ type: DataType.STRING, allowNull: false })
  contact: string

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number

  @BelongsTo(() => User)
  user: User
}