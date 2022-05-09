import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from 'config/db'

interface ListingAttributes {
  id: number
  govSiteId?: number
  name: string
  slug: string
  phone?: string
  description?: string
  address?: string
  city?: string
  zipCode?: string
  type?: string
  url?: string
  state?: string
  capacity?: string
  county?: string
  images?: string[]
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface ListingInput
  extends Optional<ListingAttributes, 'id' | 'slug'> {}

export interface ListingOutput extends Required<ListingAttributes> {}

class Listing
  extends Model<ListingAttributes, ListingInput>
  implements ListingAttributes
{
  public id!: number
  declare govSiteId: number
  declare name: string
  declare slug: string
  declare phone: string
  declare description: string
  declare address: string
  declare city: string
  declare zipCode: string
  declare type: string
  declare url: string
  declare capacity: string
  declare state: string
  declare county: string
  declare images: string[]

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
    govSiteId: {
      type: DataTypes.INTEGER,
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
    phone: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    address: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    zipCode: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    capacity: {
      type: DataTypes.STRING,
    },
    county: {
      type: DataTypes.STRING,
    },
    images: {
      type: DataTypes.JSON,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['govSiteId', 'state'],
      },
    ],
    sequelize: sequelizeConnection,
    paranoid: true,
  }
)

export default Listing
