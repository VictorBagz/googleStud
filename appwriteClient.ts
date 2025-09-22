import { Client, Databases, ID, Account, Permission, Role } from 'appwrite';

// NOTE: Replace these with your actual Appwrite project details.
// It's recommended to use environment variables for these values.
const APPWRITE_ENDPOINT = 'https://sfo.cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = '68d0cd50003d9afdb775'; // <-- Replace with your Project ID

const client = new Client();

client
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

export const databases = new Databases(client);
export const account = new Account(client);
export { ID, client, Permission, Role };