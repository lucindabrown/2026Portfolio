export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'thumbnail', title: 'Thumbnail', type: 'image' },
    { name: 'body', title: 'Case Study', type: 'array', of: [{ type: 'block' }] },
    {
  name: 'imagePosition',
  title: 'Image Position',
  type: 'string',
  options: {
    list: [
      { title: 'Left', value: 'left' },
      { title: 'Right', value: 'right' },
    ],
    layout: 'radio',
  },
  initialValue: 'right',
},
  ],
}