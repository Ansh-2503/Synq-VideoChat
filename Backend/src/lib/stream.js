import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiKeySecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiKeySecret) {
  console.error("Stream API key or SECRET key is missing");
}

const streamClient = StreamChat.getInstance(apiKey, apiKeySecret);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("Error upserting Stream user", error);
  }
};

const genStreamToken = async (userId) => {};
