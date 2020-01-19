const { notEmpty } = require('../utils.js')

module.exports = {
  description: 'generate a view',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'view name please',
    validate: notEmpty('name')
  },
  {
    type: 'checkbox',
    name: 'blocks',
    message: 'Blocks:',
    choices: [
      {
        name: '<script>',
        value: 'script',
        checked: true
      }
    ],
    validate(value) {
      if (value.indexOf('script') === -1) {
        return 'View require at least a <script> or <template> tag.'
      }
      return true
    }
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
        script: data.blocks.includes('script'),
      }
    },
    {
      type: 'add',
      path: `app/service/${name}.js`,
      templateFile: 'plop-templates/ctrl/service.hbs',
      skipIfExists: true,
      data: {
        name: name,
        script: data.blocks.includes('script'),
      }
    }, 
    {
      type: 'add',
      path: `app/model/${name}.js`,
      templateFile: 'plop-templates/ctrl/model.hbs',
      skipIfExists: true,
      data: {
        name: name,
        script: data.blocks.includes('script'),
      }
    },
    {
      type: 'modify',
      path: `app/router.js`,
      templateFile: 'plop-templates/ctrl/router.hbs',
      pattern: /\/\/ insert/,
      data: {
        name: name,
        script: data.blocks.includes('script'),
      }
    }
    ]

    return actions
  }
}