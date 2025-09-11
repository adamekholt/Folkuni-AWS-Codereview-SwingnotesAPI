import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../services/db.mjs";

export const handler = async (event) => {
    const body = JSON.parse(event.body);

    const command = new PutItemCommand({
        TableName: "swingnotes-api",
        Item: {
            pk: { S: body.username },
            sk: { S: `id-${new Date().toISOString()}`},
            title: { S: body.title },
            text: { S: body.text },
            createdAt: { S: new Date().toISOString()},
        }
    });

    try {
    await client.send(command);
    return {
        statusCode: 200,
        body: JSON.stringify({ 
            success: true, 
            message: "OK" }),
    };
    } catch (err) {
    console.error(err);
    return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: "Bad request" }),
    };
    }
};
