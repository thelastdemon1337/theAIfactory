const { createClient } = require("@sanity/client");

const sanityConfig = {
  projectId: "321dm2om",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-12-12",
  token: "skEbE0jXigz3JDhuyfLzZorUHF0jccOVESCbsuZoJS5Dz7mZKA0wNptyo7glKj6ISy9dVc2f7ekuAV3RdS6oRLm9N91ZnSI46prrkEPsRhexjAjcX3G8wpd9tneoXceObvQGypWwwhbxQPL1TUXbko7EyZNqVk7hjm5efXa889SRhHwVaTYx",
};

const client = createClient(sanityConfig);

module.exports = { client };
