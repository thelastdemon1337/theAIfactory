// schemas/news.js

export default {
    name: 'news',
    title: 'News',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'content',
        title: 'Content',
        type: 'text',
      },
      {
        name: 'publicationDate',
        title: 'Publication Date',
        type: 'datetime',
      },
      {
        name: 'author',
        title: 'Author',
        type: 'string',
      },
      {
        name: 'likes',
        title: 'Likes',
        type: 'number',
      },
      {
        name: 'tags',
        title: 'Tags',
        type: 'array',
        of: [{ type: 'string' }],
      },
      {
        title: 'Image',
        name: 'image',
        type: 'image',
        validation: (Rule) => Rule.required().assetRequired(),
        options: {
          hotspot: true, // <-- Defaults to false
        },
        fields: [
          {
            name: 'caption',
            type: 'string',
            title: 'Caption',
          },
          {
            name: 'attribution',
            type: 'string',
            title: 'Attribution',
          },
        ],
      },
      
    ],
    preview: {
      select: {
        title: 'title',
        subtitle: 'author',

      },
    },
  };
  