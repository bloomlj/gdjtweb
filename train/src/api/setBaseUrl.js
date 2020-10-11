var baseUrl = ''

switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = '/api/'
    break
  case 'production':
    baseUrl = 'http://gdjt.vieword.club/'
    break
}

export default baseUrl
