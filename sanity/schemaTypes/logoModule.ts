export default {
  name: "logoModule",
  title: "Logo Module",
  type: "object",
  fields: [
    { name: "headline", title: "Headline", type: "string" },
    { name: "backgroundColor", title: "Background Color", type: "string" },
    {
      name: "logos",
      title: "Logos",
      type: "array",
      of: [{ type: "reference", to: [{ type: "clientLogo" }] }],
    },
  ],
};
