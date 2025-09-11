import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../services/db.mjs";

export const handler = async (event) => {
    const note = JSON.parse(event.body || "{}");
    const sk = `noteid-${Date.now()}`;
    const timestamp = new Date().toISOString();
    const username = event.pathParameters?.username;

    const command = new PutItemCommand({
        TableName: "swingnotes-api",
        Item: {
            pk: { S: username },
            sk: { S: sk },
            title: { S: note.title },
            text: { S: note.text },
            createdAt: { S: timestamp },
            modifiedAt: { S: timestamp }
        }
    });

    await client.send(command);

    return {
        statusCode: 200,
        body: JSON.stringify({
        success: true,
        message: "New note added",
        note: {
          pk: username, 
          sk: sk,
          title: note.title,
          text: note.text,
          createdAt: timestamp,
          modifiedAt: timestamp
        }
        })
  };
};
