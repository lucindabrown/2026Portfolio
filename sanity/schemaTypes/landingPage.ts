export default {
  name: "landingPage",
  title: "Landing Page",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    {
      name: "modules",
      title: "Modules",
      type: "array",
      of: [{ type: "heroModule" }, { type: "patientJourneysModule" }, { type: "logoModule" }, { type: "centeredModule" }, { type: "contactModule" }],
    },
  ],
};
