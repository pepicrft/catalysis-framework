import { NodePlopAPI } from 'plop'

export default function (plop: NodePlopAPI) {
  plop.setGenerator('gestalt-project', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Name: ',
      },
      {
        type: 'input',
        name: 'path',
        message: 'Project path: ',
      },
      {
        type: 'input',
        name: 'version',
        message: 'GestaltJS version: ',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: '{{path}}/{{name}}',
        templateFiles: './template',
        base: './template',
      },
    ],
  })
}
