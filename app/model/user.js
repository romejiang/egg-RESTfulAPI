module.exports = app => {
  const mongoose = app.mongoose
  const UserSchema = new mongoose.Schema({
    mobile: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    realName: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    avatar: { type: String, default: 'https://1.gravatar.com/avatar/a3e54af3cb6e157e496ae430aed4f4a3?s=96&d=mm'},
    extra: { type: mongoose.Schema.Types.Mixed },

  }, { timestamps: true })

  UserSchema.methods.getInfo =  function () {
    return this.mobile + this.realName
  }

  UserSchema.methods.toString = function () {
    return this.mobile  
  }

  UserSchema.statics = {
    async findByQuery(query, proj = {}, opt = {}, populate = []) {
      return await this.find(query, proj, opt).populate(populate)
    },

    async findOneByQuery(query, proj = {}, opt = {}, populate = []) {
      return await this.findOne(query, proj, opt).populate(populate)
    }
  }

  return mongoose.model('User', UserSchema)
}
