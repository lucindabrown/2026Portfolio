export default {
  name: "patientJourneysModule",
  title: "Patient Journeys Module",
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
    { name: "ctaLink", title: "CTA Link", type: "url" },
    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
    { name: "backgroundColor", title: "Background Color", type: "string" },
    {
      name: "imagePosition",
      title: "Image Position",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
        layout: "radio",
      },
    },
  ],
};
