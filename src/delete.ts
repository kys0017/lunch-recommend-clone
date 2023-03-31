import { Context, Handler } from "aws-lambda";
import { deleteData } from "./db";

const main: Handler = async (event: any, context: Context) => {
  try {
    const sp = new URLSearchParams(event.body);
    const text = sp.get("text") as string;

    await deleteData(text);

    return {
      statusCode: 200,
      body: JSON.stringify({ text: "➖메뉴 삭제 완료" }),
    };
  } catch (e) {
    return {
      statusCode: 404,
      body: JSON.stringify({ text: `🐛메뉴 삭제 오류\n${e?.message ?? ""}` }),
    };
  }
};

export { main };
