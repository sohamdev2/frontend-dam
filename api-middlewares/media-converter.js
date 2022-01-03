const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg')
const express = require('express')
const app = express()
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')
const Sharp = require('sharp')
const axios = require('axios')

const SUPPORTED_SHARP_TYPES = [
  'jpg',
  'jpeg',
  'png',
  'webp',
  'gif',
  'jp2',
  'tif',
  'tiff',
  'avif',
  'heif',
]

app.use(
  cors({
    origin: '*',
    exposedHeaders: 'ETAG',
    allowedHeaders: '*',
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

function convert(source, fileType, format, res) {
  // eslint-disable-next-line
  const destination = __dirname + '/' + uuidv4() + '.' + format
  try {
    if (['fla', 'flv', 'f4v', 'f4p', 'f4a', 'f4b'].includes(format)) {
      ffmpeg(source)
        .preset('flashvideo')
        .on('close', () => console.log('closed'))
        .on('end', () => {
          console.log('end')
        })
        .on('exit', () => console.log('exit'))
        .on('error', function (err) {
          console.error('an error happened: ' + err.message)
          try {
            res.status(500).send(err.message)
          } catch (e) {
            console.error(e)
          }
        })
        .pipe(res)
    } else {
      ffmpeg(source)
        .format(format)
        .on('close', () => console.log('closed'))
        .on('end', () => {
          console.log('end')
          res.download(destination, null, (e) => {
            if (e) console.log('download error', e)
            try {
              fs.unlinkSync(destination)
            } catch (ee) {
              console.error(ee)
            }
          })
        })
        .on('exit', () => console.log('exit'))
        .on('error', (e) => {
          console.error(e.message)
          try {
            res.status(500).send(e)
          } catch (e1) {
            console.error(e1)
          }
        })
        .save(destination)
    }
  } catch (e) {
    try {
      res.status(500).send(e)
    } catch (ee) {
      console.log(ee)
    }
  }
}

function fromSvg(inputBuffer, format) {
  if (!SUPPORTED_SHARP_TYPES.includes(format)) {
    throw new Error('Unsupported type ' + format)
  }
  return new Promise((resolve, reject) => {
    Sharp(inputBuffer)
      .toFormat(format)
      .toBuffer((err, data, info) => {
        if (err) {
          return reject(err)
        }
        resolve(data)
      })
  })
}

app.post('/', async (req, res) => {
  const { url, fileType, format } = req.body
  if (!url || !format || !fileType) {
    return res.status(400).send('url|fileType|targetFormat missing')
  }
  if (['audio', 'video'].includes(fileType)) {
    return convert(url, fileType, format, res)
  }
  if (fileType !== 'image') {
    return res.status(400).send('Unknown file type')
  }
  try {
    const { data } = await axios({
      url,
      responseType: 'arraybuffer',
    })
    fromSvg(data, format)
      .then((buffer) => {
        res.send(buffer)
      })
      .catch((e) => res.status(500).send(e.message))
  } catch (e) {
    res.status(500).send(e.message)
  }
})

module.exports = {
  path: '/convert',
  handler: app,
}
