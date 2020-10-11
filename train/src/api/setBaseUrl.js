var baseUrl = ''

switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = 'http://api.stooop.top/'
    break
  case 'production':
    baseUrl = 'http://api.stooop.top/'
    break
}

export default baseUrl
