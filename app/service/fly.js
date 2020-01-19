
const Service = require('egg').Service

class FlyService extends Service {
  // create===============================================>
  async create(payload) {
    return this.ctx.model.Fly.create(payload)
  }

  // destroy===============================================>  
  async destroy(_id) {
    const { ctx, service } = this
    const fly = await ctx.service.fly.find(_id)
    if (!fly) {
      ctx.throw(404, 'fly not found')
    }
    return ctx.model.Fly.findByIdAndRemove(_id)
  }

  // update===============================================>
  async update(_id, payload) {
    const { ctx, service } = this
    const fly = await ctx.service.fly.find(_id)
    if (!fly) {
      ctx.throw(404, 'fly not found')
    }
    return ctx.model.Fly.findByIdAndUpdate(_id, payload)
  }

  // show===============================================>
  async show(_id) {
    const fly = await this.ctx.service.fly.find(_id)
    if (!fly) {
      this.ctx.throw(404, 'fly not found')
    }
    return this.ctx.model.Fly.findById(_id)
  }

  // index===============================================>
  async index(payload) {
    let { currentPage, pageSize } = payload

    // 分页
    pageSize = Number(pageSize || 10)
    currentPage = Number(currentPage || 1)
    const skip = (currentPage - 1) * pageSize

    // 排序
    const sort = { createdAt: -1 }

    // 对象映射
    // let populate = ['blockchain', 'block']
    // .populate(populate)

    // 查询参数
    let querys = {}
    // if (height) {
    //   querys.reason = { $regex: height }
    // }

    const res = await this.ctx.model.Fly.find(querys).skip(skip).limit(pageSize).sort(sort).exec()
    const count = await this.ctx.model.Fly.count(querys).exec()

    // 整理数据源 -> Ant Design Pro
    const list = res.map((e, i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.index = i
      jsonObject.createdAt = e.createdAt.getTime()
      return jsonObject
    })

    return { count, list, pageSize, currentPage }
  }

  // removes===============================================>
  async removes(values) {
    return this.ctx.model.Fly.remove({ _id: { $in: values } })
  }

  // Commons===============================================>
  async find(id) {
    return this.ctx.model.Fly.findById(id)
  }

}

module.exports = FlyService

