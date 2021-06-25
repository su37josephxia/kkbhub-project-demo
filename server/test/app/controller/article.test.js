'use strict'

const { app, assert, mock } = require('egg-mock/bootstrap')
describe('controller/article', () => {

  // beforeEach(async () => {

  //   // 创建当前应用的 app 实例
  //   app = mock.app()
  //   // 初始化数据
  //   // await require('../../data/initData')(app.config.mongoose)
  //   // 等待 app 启动成功，才能执行测试用例
  //   return app.ready()

  // })

  afterEach(mock.restore)

  it('should GET /article Mongoose Mock', async () => {
    // mock模拟单元测试
    const mockModel = {
      find: () => mockModel,
      populate: () => mockModel,
      sort: () => ({ name: 'helloworld' }),
    }

    app.model.Article = mockModel
    return app.httpRequest()
      .get('/article')
      .expect({ code: 0, data: { name: 'helloworld' } })
      .expect(200)
  })

  it('should GET /article/:id TestDB', async () => {
    // mock模拟单元测试

    const mockModel = {
      findOneAndUpdate: () => mockModel,
      populate: () => ({ name: 'helloworld' }),
    }
    app.model.Article = mockModel
    return app.httpRequest()
      .get('/article/12345')
      .expect({ code: 0, data: { name: 'helloworld' } })
      .expect(200)
  })

  describe('should POST /article/create', () => {
    it('未登录', async () => {
      // mock模拟单元测试
      const mockModel = {
        findOneAndUpdate: () => mockModel,
        populate: () => ({ name: 'helloworld' }),
      }
      app.model.Article = mockModel

      return app.httpRequest()
        .post('/article/create')
        .expect({ code: -666, message: '用户没有登录' })
        .expect(200)
    })


    it('Mock登录', async () => {
      // mock模拟单元测试

      const mockModel = {
        findOneAndUpdate: () => mockModel,
        populate: () => ({ name: 'helloworld' }),
      }
      app.model.Article = mockModel

      // Mock Jwt
      app._app.middlewares.jwt = app => (ctx, next) => {
        next()
      }

      return app.httpRequest()
        .post('/article/create')
        .expect({ code: -666, message: '用户没有登录' })
        .expect(200)
    })
  })


})
