import { Column, DataType, Model, Table } from "sequelize-typescript"
import { ApiProperty } from "@nestjs/swagger"

interface UserCreationAttributes {
  email: string
  password: string
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({ example: 1, description: "Unique identifier" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number

  @ApiProperty({ example: "example@gmail.com", description: "User email" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string

  @ApiProperty({ example: "12345678Aa", description: "User password" })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string
}