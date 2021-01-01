function createHtmlDocument(title, body) {
  return (
    '<!DOCTYPE html>\n' +
    '<html lang="en">\n' +
    '<head>\n' +
    '<meta charset="utf-8">\n' +
    '<title>' +
    title +
    '</title>\n' +
    '</head>\n' +
    '<body>\n' +
    '<pre>' +
    body +
    '</pre>\n' +
    '</body>\n' +
    '</html>\n'
  )
}

export default function (req, res, next) {
  try {
    if (String(req.url).includes('?')) {
      decodeURI(req.url)
      next()
    } else next()
  } catch (error) {
    res.statusCode = 301
    res.end(
      createHtmlDocument(
        'Redirecting',
        `<script>window.location.href=window.location.origin + '/404'</script>`
      )
    )
  }
}
