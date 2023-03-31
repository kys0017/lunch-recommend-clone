/**
 * dynamoDB 사용하기
 */

import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  DeleteCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";

import { MenuInfo } from "./types";

const ddbClient = new DynamoDBClient({ region: "ap-southeast-2" });

const marshallOptions = {
  // Whether to automatically convert empty strings, blobs, and sets to `null`.
  convertEmptyValues: false, // false, by default.
  // Whether to remove undefined values while marshalling.
  removeUndefinedValues: true, // false, by default.
  // Whether to convert typeof object to map attribute.
  convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
  // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
  wrapNumbers: false, // false, by default.
};

// Create the DynamoDB document client.
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, {
  marshallOptions,
  unmarshallOptions,
});

export const PARTITION_KEY_VALUE = "메뉴";

/**
 * 데이터 조회 (eq)
 * @param name 탐색할 key
 */
export const readDataItem = async (name: string): Promise<MenuInfo[]> => {
  if (!!name) {
    try {
      const data = await ddbDocClient.send(
        new GetCommand({
          TableName: "lunch-list",
          Key: {
            type: PARTITION_KEY_VALUE,
            desc: `${PARTITION_KEY_VALUE}-${name}`,
          },
          AttributesToGet: ["name"],
        })
      );

      return (!!data.Item ? [data.Item] : []) as MenuInfo[];
    } catch (error) {
      throw error;
    }
  } else {
    throw new Error("There is no search value!");
  }
};

/**
 * 데이터 조회 (contains)
 * @param name 탐색할 key
 */
export const readData = async (name?: string): Promise<MenuInfo[]> => {
  if (!!name) {
    try {
      const data = await ddbClient.send(
        new QueryCommand({
          TableName: "lunch-list",
          KeyConditionExpression: "#type = :type",
          FilterExpression: "contains(#name, :name)",
          ExpressionAttributeNames: {
            "#type": "type",
            "#name": "name",
          },
          ExpressionAttributeValues: {
            ":type": { S: PARTITION_KEY_VALUE },
            ":name": { S: name },
          },
          ProjectionExpression: "#name",
        })
      );

      return (data?.Items || []).map((item) => ({
        name: item.name.S,
      })) as unknown as MenuInfo[];
    } catch (error) {
      throw error;
    }
  } else {
    try {
      const data = await ddbDocClient.send(
        new ScanCommand({
          TableName: "lunch-list",
        })
      );

      return (data.Items || []) as MenuInfo[];
    } catch (error) {
      throw error;
    }
  }
};

/**
 * 데이터 생성 OR 업데이트
 * @param input: MenuInfo
 */
export const createUpdateData = async (input: MenuInfo): Promise<boolean> => {
  try {
    await ddbDocClient.send(
      new PutCommand({
        TableName: "lunch-list",
        Item: {
          ...input,
        },
      })
    );

    return true;
  } catch (error) {
    throw error;
  }
};

/**
 * 데이터 삭제
 * @param name 삭제할 key
 * @returns
 */
export const deleteData = async (name: string): Promise<boolean> => {
  try {
    await ddbDocClient.send(
      new DeleteCommand({
        TableName: "lunch-list",
        Key: {
          type: PARTITION_KEY_VALUE,
          desc: `${PARTITION_KEY_VALUE}-${name}`,
        },
      })
    );
    return true;
  } catch (error) {
    throw error;
  }
};
