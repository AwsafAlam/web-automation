import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from 'config/db'

interface ListingAttributes {
  id: number
  name: string
  slug: string
  description?: string
  foodGroup?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface ListingInput
  extends Optional<ListingAttributes, 'id' | 'slug'> {}

export interface ListingOuput extends Required<ListingAttributes> {}

class Listing
  extends Model<ListingAttributes, ListingInput>
  implements ListingAttributes
{
  public id!: number
  public name!: string
  public slug!: string
  public description!: string
  public foodGroup!: string

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date
}

Listing.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    foodGroup: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: sequelizeConnection,
    paranoid: true,
  }
)

export default Listing
