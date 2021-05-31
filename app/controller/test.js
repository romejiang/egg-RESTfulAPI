const Controller = require('egg').Controller
const path = require('path')

class TestController extends Controller {
  async index() {
    this.ctx.body = {
      name: 'test'
    }
  }

  async echo() {
    const { ctx } = this
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

module.exports = TestController
