// schemas/aitools.js

export default {
  name: 'aitools',
  title: 'AItools',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'publicationDate',
      title: 'Publication Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
    },
    {
      name: 'likes',
      title: 'Likes',
      type: 'number',
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
    },
    // {
    //   name: 'reviews',
    //   title: 'Reviews',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'object',
    //       fields: [
    //         {name: 'user', type: 'reference', to: [{type: 'user'}]},
    //         {name: 'rating', type: 'number'},
    //         {name: 'comment', type: 'text'},
    //         {name: 'timestamp', type: 'datetime'},
    //       ],
    //     },
    //   ],
    // },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'isChatBot',
      title: 'isChatBot',
      type: 'boolean',
      default: false,
    },
    {
      name: 'chatGPTAPI',
      title: 'chatGPTAPI',
      type: 'string',
      hidden: ({document}) => !document.isChatBot,
    },
    {
      name: 'isGeminiBot',
      title: 'isGeminiBot',
      type: 'boolean',
      default: false,
    },
    {
      name: 'geminiGPTAPI',
      title: 'geminiGPTAPI',
      type: 'string',
      hidden: ({document}) => !document.isGeminiBot,
    },
    {
      name: 'isTool',
      title: 'isTool',
      type: 'boolean',
      default: false,
    },
    {
      name: 'toolURL',
      title: 'toolURL',
      type: 'string',
      hidden: ({document}) => !document.isTool,
    },
    {
      name: 'videoLink',
      title: 'Video Link',
      type: 'url',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      validation: (Rule) => Rule.required().assetRequired(),
      options: {
        hotspot: true, // <-- Defaults to false
      },
      //       {
      //   name: 'released',
      //   title: 'Released',
      //   type: 'boolean',
      //   default: false,
      // },

      // fields: [
      //   {
      //     name: 'caption',
      //     type: 'string',
      //     title: 'Caption',
      //   },
      //   {
      //     name: 'attribution',
      //     type: 'string',
      //     title: 'Attribution',
      //   },
      // ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
    },
  },
}
