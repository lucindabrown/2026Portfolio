export default {
  name: "centeredModule",
  title: "Centered Module",
  type: "object",
  fields: [
    { name: "headline", title: "Headline", type: "string" },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block", styles: [], lists: [], marks: { decorators: [{ title: "Bold", value: "strong" }, { title: "Italic", value: "em" }] } }],
    },
    { name: "ctaText", title: "CTA Text", type: "string" },
    { name: "ctaLink", title: "CTA Link", type: "string" },
    { name: "backgroundImage", title: "Background Pattern Image", type: "image", options: { hotspot: false } },
    { name: "backgroundColor", title: "Background Color", type: "string" },
  ],
};
