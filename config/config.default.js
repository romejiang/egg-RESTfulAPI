module.exports = appInfo => {
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513779989145_1674'

  // add your config here
  // 加载 errorHandler 中间件
  config.middleware = ['errorHandler']

  // 只对 /api 前缀的 url 路径生效
  // config.errorHandler = {
  //   match: '/api',
  // }

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ['*'],
  }

  config.cors = {
    credentials: true,
    origin: ctx => ctx.get('origin'),
  }

  config.multipart = {
    fileExtensions: ['.apk', '.pptx', '.docx', '.csv', '.doc', '.ppt', '.pdf', '.pages', '.wav', '.mov'], // 增加对 .apk 扩展名的支持
  },

  config.bcrypt = {
    saltRounds: 10 // default 10
  }

  config.mongoose = {
    url: 'mongodb://localhost:27017/test',
    options: {
      useFindAndModify: false,
      bufferMaxEntries: 0,
      useCreateIndex: true,
      useNewUrlParser: true,
      readPreference: 'secondaryPreferred',
      useUnifiedTopology: true
    },
  }

  config.jwt = {
    secret: 'Great4-M',
    enable: true,
    // match: '/jwt', // optional
    match: /^\/api\/((?!public).)*$/
  }

  config.image = {
    server: 'http://www.local.com:7001'
  }

  config.session = {
    key: 'EGG_PROJECT_REST',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
    renew: true,
  }

  return config
}
