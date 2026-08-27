// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';

export default config({
  // In dev mode, save directly to your local hard drive
  storage: import.meta.env.DEV 
  ? { kind: 'local' }
  : {
      kind: 'github',
      repo: 'mikeethedude/eeepta'
    },
  collections: {
    
    // 1. The Announcements Collection
    announcements: collection({
      label: 'Announcements',
      slugField: 'title',
      path: 'src/data/announcements/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Publish Date', validation: { isRequired: true } }),
        content: fields.markdoc({ label: 'Content', extension: 'md', }),
      },
    }),

    // 2. The Team/Board Members Collection
    team: collection({
      label: 'Board Members',
      slugField: 'title',
      path: 'src/data/team/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Name' } }),
        position: fields.text({ label: 'Board Position' }),
        weight: fields.integer({ label: 'Sort Order (Lower numbers at the top)' }),
        image: fields.image({ 
          label: 'Profile Photo',
          directory: 'public',
          publicPath: '/'
        }),
        content: fields.markdoc({ label: 'Bio', extension: 'md', }),
      },
    }),

  },
});