import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../services/db.mjs";

export const handler = async (event) => {
  const path = event.rawPath;
  const username = path.startsWith("/") ? path.slice(1) : path;

  const input = {
    TableName: "swingnotes-api",
    KeyConditionExpression: "pk = :username",
    ExpressionAttributeValues: {
      ":username": { S: username },
    },
  };

    try {
    const command = new QueryCommand(input);
    const response = await client.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        items: response.Items || [],
      }),
    };

  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: "Internal Server Error" }),
    };
  }
};
