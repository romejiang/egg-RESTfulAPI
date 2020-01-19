'use strict'

const { app, assert } = require('egg-mock/bootstrap')
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('test/app/service/fly.test.js', () => {

  let id = ''

  it('should get exists user', async () => {
    // 创建 ctx
    const ctx = app.mockContext();
    const payload = { name: 'test' + new Date().getTime(), access: 'service' }
    const fly = await ctx.service.fly.create(payload);
    assert(fly);
    assert(fly.access === 'service');
    id = fly._id;
    // console.log(fly);
  });

  it('should get null when user not exists', async () => {
    await wait(2 * 1000);

    const ctx = app.mockContext();
    // console.log(id);
    const fly = await ctx.service.fly.destroy(id);
    // console.log(fly);
    assert(fly);
    assert(fly.access === 'service');

  })

})