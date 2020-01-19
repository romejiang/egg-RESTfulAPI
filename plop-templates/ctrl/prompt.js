const { notEmpty } = require('../utils.js')

module.exports = {
  description: 'generate a view',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'model name please',
    validate: notEmpty('name')
  }
  ],
  actions: data => {
    const name = '{{name}}'
    const actions = [{
      type: 'add',
      path: `app/controller/${name}.js`,
      templateFile: 'plop-templates/ctrl/controller.hbs',
      skipIfExists: true,
      data: {
        name: name,
      }
    },
    {
      type: 'add',
      path: `app/service/${name}.js`,
      templateFile: 'plop-templates/ctrl/service.hbs',
      skipIfExists: true,
      data: {
        name: name,
      }
    }, 
    {
      type: 'add',
      path: `app/model/${name}.js`,
      templateFile: 'plop-templates/ctrl/model.hbs',
      skipIfExists: true,
      data: {
        name: name,
      }
    },
    {
      type: 'modify',
      path: `app/router.js`,
      templateFile: 'plop-templates/ctrl/router.hbs',
      pattern: /\/\/ insert/,
      data: {
        name: name,
      }
    }
    ]

    return actions
  }
}
