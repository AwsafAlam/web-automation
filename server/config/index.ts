import dotenv from 'dotenv'

dotenv.config()

export default {
  port: process.env.APPID || 4000,
  env: process.env.NODE_ENV || 'development',
  deployed: process.env.DEPLOYED === 'true',
  aws: {
    bucketName: process.env.BUCKET_NAME,
    accessKey: process.env.S3_ACCESS_KEY,
    secret: process.env.S3_SECRET,
  },
  mysql: {
    database: process.env.DB_NAME || 'boomershub',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASS || '',
  },
  token: {
    access: {
      secret: 'secret',
      expiresIn: '15 days',
    },
    refresh: {
      secret: 'secret',
      expiresIn: '90 days',
    },
  },
}
