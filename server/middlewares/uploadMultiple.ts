import { Request, Response, NextFunction } from 'express'
import { config as awsConfig, S3 } from 'aws-sdk'
// import sharp from 'sharp'
import fs from 'fs'

import config from 'config'

export interface CustomFile {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
}

const uploadMultipleImages = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  res.locals.images = []

  if (req?.files) {
    if (awsConfig) {
      awsConfig.update({
        region: 'ap-southeast-1',
        accessKeyId: config.aws.accessKey,
        secretAccessKey: config.aws.secret,
      })
    }

    const s3Bucket = config.aws.bucketName
    const s3 = new S3()
    const files = req.files as unknown as CustomFile[]
    const promises = []

    if (s3Bucket) {
      for (const file of files) {
        const buffer = fs.readFileSync(file.path)
        const s3Params = {
          Bucket: s3Bucket,
          Key: `original/${file.originalname}-${new Date().toISOString()}`,
          Body: buffer,
          ContentType: file.mimetype,
          ACL: 'public-read',
        }

        const promise = s3
          .upload(
            s3Params,
            function (error: Error, data: S3.ManagedUpload.SendData) {
              if (error) {
                console.error({ type: 'AWS Upload', error, data })
                res.status(500).json({ message: 'Image upload failed' })
              }

              return
            }
          )
          .promise()

        promises.push(promise)
      }
    }

    const result = await Promise.all(promises)
    res.locals.images = result.map((item) => item.Location)
    next()
  } else {
    next()
  }
}

export default uploadMultipleImages
