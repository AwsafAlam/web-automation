import { Request, Response, NextFunction } from 'express'
import { config as awsConfig, S3 } from 'aws-sdk'
import config from 'config'
import sharp from 'sharp'

const resizeImages = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.files) return next()
  req.body.images = []
  if (req?.files && Array.isArray(req.files)) {
    await Promise.all(
      req.files.map(async (file) => {
        const newFilename = new Date().toISOString()

        if (awsConfig) {
          awsConfig.update({
            region: 'ap-southeast-1',
            accessKeyId: config.aws.accessKey,
            secretAccessKey: config.aws.secret,
          })
        }

        // const fileType = file.mimetype
        const s3Bucket = config.aws.bucketName
        const s3 = new S3()

        const { data, info } = await sharp(file.buffer)
          // .resize(640, 320)
          .resize(320, 160)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toBuffer({ resolveWithObject: true })

        // const buffer = fs.readFileSync(file.buffer)

        if (s3Bucket) {
          const s3Params = {
            Bucket: s3Bucket,
            Key: `compressed/${newFilename}`,
            Body: data,
            ContentType: info.format,
            ACL: 'public-read',
          }
          // console.log(s3Params)
          s3.upload(
            s3Params,
            function (error: Error, data: S3.ManagedUpload.SendData) {
              if (!error) {
                console.log(data.Location)
                res.locals.publicUrl = data.Location
                req.body.images.push(data.Location)
                // return next()
                return
              } else {
                console.error({ type: 'AWS Upload', error, data })
                return res.status(500).json({ msg: 'Image upload failed' })
              }
            }
          )
        }
      })
    )
    // next()
  }
}

export default resizeImages
