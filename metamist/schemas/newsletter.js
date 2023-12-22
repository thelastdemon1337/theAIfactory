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
      name: 'subject',
      title: 'Subject',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    // {
    //   name: 'released',
    //   title: 'Released',
    //   type: 'boolean',
    //   default: false,
    // },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'author',
    },
  },
}
