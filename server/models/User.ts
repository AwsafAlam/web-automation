import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from 'config/db'
import { ListingInput } from './Listing'

interface UserMetadata {
  cookingTime: string | null
}

interface UserAttributes {
  id: number
  title: string
  slug?: string
  instruction?: string
  author?: string
  meta?: UserMetadata
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface UserInput extends Optional<UserAttributes, 'id' | 'slug'> {
  listings?: ListingInput[]
}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number
  public title!: string
  public slug!: string
  public instruction!: string
  public author!: string
  public meta!: UserMetadata

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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    instruction: {
      type: DataTypes.TEXT,
    },
    meta: {
      type: DataTypes.JSON,
    },
    author: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: sequelizeConnection,
    paranoid: true,
  }
)

export default User
