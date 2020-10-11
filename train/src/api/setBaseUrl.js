var baseUrl = ''

switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = 'http://stooop.top/'
    break
  case 'production':
    baseUrl = 'http://stooop.top/'
    break
}

export default baseUrl
