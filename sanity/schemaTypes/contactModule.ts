export default {
  name: "contactModule",
  title: "Contact Module",
  type: "object",
  fields: [
    { name: "headline", title: "Headline", type: "string" },
    { name: "body", title: "Body", type: "text" },
    { name: "photo", title: "Photo", type: "image", options: { hotspot: true } },
    { name: "backgroundColor", title: "Background Color", type: "string" },
  ],
};
