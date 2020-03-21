let envApi = {}
switch (process.env.NODE_ENV) {
  case 'production':
    // 生产环境接口地址
    envApi = {
      web: 'https://somsgateway.ksudi.com',
      websocket: '://somsgateway.ksudi.com'
    }
    break
  case 'beta':
    // 预生产环境接口地址
    envApi = {
      web: 'https://somsgateway.ksudi.com',
      websocket: '://somsgateway.ksudi.com'
    }
    break
  case 'test':
    // 测试环境接口地址
    envApi = {
      web: 'https://sstest1.ksudi.com',
      websocket: '://sstest1.ksudi.com'
    }
    break
  case 'dev':
    envApi = {
      web: 'http://192.168.1.13:9999',
      websocket: '://192.168.1.13:9999'
    }
    break
  default:
    // 默认开发
    envApi = {
      web: 'http://192.168.1.13:9999',
      websocket: '://192.168.1.13:9999'
    }
    break
}

export default envApi
