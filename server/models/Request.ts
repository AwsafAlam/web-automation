import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from 'config/db'

interface RequestAttributes {
  id: number
  url: string
  crawled: boolean
  tryCount: number
  name?: string
  createdAt?: Date
  city?: string
  type?: string
  state?: string
  updatedAt?: Date
  deletedAt?: Date
}

export interface RequestInput extends Optional<RequestAttributes, 'id'> {}

export interface RequestOutput extends Required<RequestAttributes> {}

class Request
  extends Model<RequestAttributes, RequestInput>
  implements RequestAttributes
{
  public id!: number
  declare name: string
  declare url: string
  declare crawled: boolean
  declare tryCount: number
  declare city: string
  declare type: string
  declare capacity: string
  declare state: string

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date
}

Request.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    crawled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    tryCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    state: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: sequelizeConnection,
    paranoid: true,
  }
)

export default Request
