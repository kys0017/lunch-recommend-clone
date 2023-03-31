import { PARTITION_KEY_VALUE } from "./db";

export interface MenuInfo {
  type: typeof PARTITION_KEY_VALUE; // partitionKey
  desc: string; // sortKey
  name: string;
}
