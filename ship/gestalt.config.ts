import { defineConfiguration } from 'gestaltjs/configuration'
import reactPlugin from '@gestaltjs/gestalt-plugin-react'

// eslint-disable-next-line import/no-default-export
export default defineConfiguration({
  name: 'Ship',
  plugins: [reactPlugin()],
})
