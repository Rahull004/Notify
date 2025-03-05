import { Client, Account, Databases, Avatars, Storage } from "appwrite";

export const appwriteConfig = {
  url: "https://cloud.appwrite.io/v1",
  projectId: "67c804c1001c24498b2b",
  databaseId: "67c804da000df95b4c2e",
  storageId: "67c812ae0008a848eb4a",
  userId: "67c8076a0005123edfeb",
  noteId: "67c8052700140b1934ed",
  draftId: "67c807ce000fabddd663",
  pdfId: "67c804e4002cfbedfcdd",
};

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
