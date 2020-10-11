var baseUrl = ''

switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = 'http://gdjt.vieword.club/'
    break
  case 'production':
    baseUrl = 'http://gdjt.vieword.club/'
    break
}

export default baseUrl
