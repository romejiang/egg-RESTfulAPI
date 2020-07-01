const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    this.ctx.body = `hi, egg-RESTfulAPI!
    A optimized Node.js RESTful API Server Template based on egg.js.
    https://github.com/icxcat/egg-RESTfulAPI.git`
  }

  async init() {
    const { ctx, service } = this

    const rolejson = {
      name: 'admin',
      access: 'admin'
    }
  
    const role = await ctx.model.Role.findOne(rolejson) || await service.role.create(rolejson)
    
    // 组装参数
    const payload = {
      mobile: '13988889999',
      realName: 'admin',
      role: role
    }

    // 调用 Service 进行业务处理
    const res = await ctx.model.User.findOne(payload) || await service.user.create(Object.assign(payload, {password: '123123'}))
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }


  async echo() {
    const { ctx } = this;
    // const _id = ctx.state.user && ctx.state.user.data._id // GET ID
    const post = ctx.request.body || {} // POST
    const get = ctx.query // GET

    console.log( post , get)

    const res = {
      post,
      get
    }
    
    ctx.helper.success({ctx, res})
  }


}

module.exports = HomeController
