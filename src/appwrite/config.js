import { Client, Account, Databases, Avatars, Storage } from "appwrite";

export const appwriteConfig = {
  url: "https://cloud.appwrite.io/v1",
  projectId:"66676736001077c5a86a" ,
  databaseId: "666768450032ab9c3c7a",
  storageId: "",
  userId: "6667698d002ab53e34ac",
  noteId: "666768b700318b9584ea",
  pdfId:"6667687e0012871126a0",
};

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
