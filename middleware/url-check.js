export default function (req, res, next) {
  try {
    if (String(req.url).includes('?')) {
      decodeURI(req.url)
      next()
    } else next()
  } catch (error) {
    res.statusCode = 301
    res.end(
      `<html><script>window.location.href = window.location.origin + '/404'</script></html>`
    )
  }
}
