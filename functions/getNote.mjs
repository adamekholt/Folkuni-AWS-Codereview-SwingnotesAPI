import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../services/db.mjs";

export const handler = async (event) => {
  const path = event.rawPath;
  const username = path.startsWith("/") ? path.slice(1) : path;

    const input = {
        TableName: "swingnotes-api",
        KeyConditionExpression: "pk = username",
        QueryFilter: {
            "pk": { S: username },
        },
    };

  if( username === pk ) {
    const command = new QueryCommand(input);
    const respons = await client.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        items: [respons],
    }),
    };

  } else {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: "Internal Server Error" }),
    };
  }
};
