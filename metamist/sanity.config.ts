import { defineConfig, isDev } from 'sanity'
import { visionTool } from '@sanity/vision'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemas'
import { getStartedPlugin } from './plugins/sanity-plugin-tutorial'
import { HelloWorldAction } from './actions'

const devOnlyPlugins = [getStartedPlugin()]

export default defineConfig({
  name: 'default',
  title: 'TheAIFactory',

  projectId: '321dm2om',
  dataset: 'production',

  plugins: [deskTool(), visionTool(), ...(isDev ? devOnlyPlugins : []),],

  document: {
    actions: (prev, context) => {
      // Only add the action for documents of type "movie"
      return context.schemaType === 'newsletter' ? [HelloWorldAction, ...prev] : prev;
    },
  },
  schema: {
    types: schemaTypes,
  },
})

