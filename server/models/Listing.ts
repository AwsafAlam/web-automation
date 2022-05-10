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
  mailingAddress?: string
  city?: string
  zipCode?: string
  type?: string
  url?: string
  state?: string
  capacity?: string
  county?: string
  images?: string[]
  owner?: string
  licenseSince?: string
  profitStatus?: string
  ahaNum?: string
  cliaNum?: string
  fieldOffices?: string
  medicareStatus?: string
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
  declare mailingAddress: string
  declare city: string
  declare zipCode: string
  declare type: string
  declare url: string
  declare capacity: string
  declare state: string
  declare county: string
  declare images: string[]
  declare owner: string
  declare licenseSince: string
  declare profitStatus: string
  declare ahaNum: string
  declare cliaNum: string
  declare fieldOffices: string
  declare medicareStatus: string

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
    mailingAddress: {
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
    owner: {
      type: DataTypes.STRING,
    },
    licenseSince: {
      type: DataTypes.STRING,
    },
    profitStatus: {
      type: DataTypes.STRING,
    },
    ahaNum: {
      type: DataTypes.STRING,
    },
    cliaNum: {
      type: DataTypes.STRING,
    },
    fieldOffices: {
      type: DataTypes.STRING,
    },
    medicareStatus: {
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
