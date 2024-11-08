import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

import * as Constants from "./constants.jsx";

export const sanityConfig = {
  projectId: Constants.PROJECT_ID,
  dataset: Constants.DATASET,
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "2023-12-12", // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN, // Only if you want to update content with the client
  token:"skEbE0jXigz3JDhuyfLzZorUHF0jccOVESCbsuZoJS5Dz7mZKA0wNptyo7glKj6ISy9dVc2f7ekuAV3RdS6oRLm9N91ZnSI46prrkEPsRhexjAjcX3G8wpd9tneoXceObvQGypWwwhbxQPL1TUXbko7EyZNqVk7hjm5efXa889SRhHwVaTYx"
};

export const client = createClient(sanityConfig);

export const builder = imageUrlBuilder(sanityConfig);

export async function getNews() {
  const posts = await client.fetch('*[_type == "news"]');
  return posts;
}

export async function getAitools() {
  const posts = await client.fetch('*[_type == "aitools"]');
  return posts;
}

export async function getNewsletter() {
  const newsletter = await client.fetch('*[_type == "newsletter"]');
  return newsletter;
}

export async function subscribeToNewsletter(email) {
  try {
    const result = await client.create(
      {
        _type: "newsletter",
        title: email,
        email: email,
      },
      {
        token:
          "skEbE0jXigz3JDhuyfLzZorUHF0jccOVESCbsuZoJS5Dz7mZKA0wNptyo7glKj6ISy9dVc2f7ekuAV3RdS6oRLm9N91ZnSI46prrkEPsRhexjAjcX3G8wpd9tneoXceObvQGypWwwhbxQPL1TUXbko7EyZNqVk7hjm5efXa889SRhHwVaTYx",
      }
    );
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateToolLikes(_id, like) {
  console.log(like)
  console.log(_id)
  const result = await client.patch(_id).set({ likes: 1 })
  console.log(result)
  return result;
}
export async function incToolLikes(_id, like) {
  const result = await client.patch(_id).set({ likes: like + 1 }).commit();
  await getAitools()
  console.log(result)
  return result;
  
}

export async function decToolLikes(_id, like) {
  const result = await client.patch(_id).set({ likes: like - 1 }).commit();
  console.log(result)
  await getAitools()
  return result;
}


// uses GROQ to query content: https://www.sanity.io/docs/groq
// export async function getPosts() {
//   const posts = await client.fetch('*[_type == "post"]')
//   return posts
// }

// export async function createPost(post: Post) {
//   const result = client.create(post)
//   return result
// }

// export async function updateDocumentTitle(_id, title) {
//   const result = client.patch(_id).set({title})
//   return result
// }
