export default {
  name: "heroModule",
  title: "Hero Module",
  type: "object",
  fields: [
    { name: "headline", title: "Headline", type: "string" },
    { name: "accentText", title: "Accent Text (new line, different color)", type: "string" },
    { name: "accentColor", title: "Accent Color (hex)", type: "string" },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block", styles: [], lists: [], marks: { decorators: [{ title: "Bold", value: "strong" }, { title: "Italic", value: "em" }] } }],
    },
    { name: "ctaText", title: "CTA Text", type: "string" },
    { name: "ctaLink", title: "CTA Link", type: "string" },
    { name: "stillImage", title: "Still Image", type: "image", options: { hotspot: true } },
    { name: "lottieFile", title: "Lottie Animation File (.json)", type: "file", options: { accept: ".json" } },
    { name: "backgroundColor", title: "Background Color", type: "string" },
  ],
};
