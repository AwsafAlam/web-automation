import { Request, Response, NextFunction } from 'express'
import { config as awsConfig, S3 } from 'aws-sdk'
import config from 'config'
import fs from 'fs'

const uploadFile =
  (folderName: string) =>
  async (
    req: Request<never, never, never, { useFileName: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    if (req?.file?.path) {
      if (awsConfig) {
        awsConfig.update({
          region: 'ap-southeast-1',
          accessKeyId: config.aws.accessKey,
          secretAccessKey: config.aws.secret,
        })
      }

      const fileName =
        req.query.useFileName === 'true'
          ? req.file.filename
          : new Date().toISOString()
      const fileType = req.file.mimetype

      const s3Bucket = config.aws.bucketName
      const s3 = new S3()

      const buffer = fs.readFileSync(req.file.path)

      if (s3Bucket) {
        const s3Params = {
          Bucket: s3Bucket,
          Key: `${folderName}/${fileName}`,
          Body: buffer,
          ContentType: fileType,
          ACL: 'public-read',
        }

        s3.upload(
          s3Params,
          function (error: Error, data: S3.ManagedUpload.SendData) {
            if (!error) {
              res.locals.publicUrl = data.Location

              return next()
            } else {
              console.error({ type: 'AWS Upload', error, data })
              return res.status(500).json({ msg: 'Image upload failed' })
            }
          }
        )
      }
    }
  }

export default uploadFile
