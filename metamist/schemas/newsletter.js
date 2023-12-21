// schemas/newsletter.js

export default {
  name: 'newsletter',
  title: 'Newsletter',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'email',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'author',
    },
  },
}
