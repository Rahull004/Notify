import { Client, Account, Databases, Avatars, Storage } from "appwrite";

export const appwriteConfig = {
  url: "https://cloud.appwrite.io/v1",
  projectId: "66d03155003887171085",
  databaseId: "66d031a20031ea9ff0b6",
  storageId: "66d0452200331a4db04e",
  userId: "66d031dc00344b2a4acb",
  noteId: "66d031e200246a2d431c",
  draftId: "66d031b10027d579fd99",
  pdfId: "66d031d50038f4b0e7c7",
};

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
