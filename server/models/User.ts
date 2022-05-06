import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from 'config/db'
import { Roles } from 'lib/constants'
// import { ListingInput } from './Listing'

export type RoleType = 1111 | 9999 | 8081

interface IUser {
  id: number
  username: string
  email: string
  slug: string
  password: string
  role: RoleType
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface UserInput extends Optional<IUser, 'id'> {}
export interface UserOutput extends Required<IUser> {}

class User extends Model<IUser, UserInput> implements IUser {
  declare id: number
  public username!: string
  public email!: string
  public slug!: string
  public password!: string
  public role!: RoleType

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: Roles.User,
    },
  },
  {
    sequelize: sequelizeConnection,
    paranoid: true,
  }
)

export default User
