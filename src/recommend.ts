import { Context, Handler } from "aws-lambda";
import { readData } from "./db";

const main: Handler = async (event: any, context: Context) => {
  try {
    const sp = new URLSearchParams(event.body);
    const text = sp.get("text") as string;

    const list = await readData(text);

    const rtn =
      list.length <= 0
        ? "메뉴를 추가해 주세요."
        : list[Math.floor(Math.random() * list.length)].name;

    return {
      statusCode: 200,
      body: JSON.stringify({
        text: `⭐⭐오늘의 추천 메뉴는 ::${rtn}:: 입니다⭐⭐`,
        response_type: "in_channel",
      }),
    };
  } catch (e) {
    return {
      statusCode: 404,
      body: JSON.stringify({ text: `🐛점심 추천 오류\n${e?.message ?? ""}` }),
    };
  }
};

export { main };
