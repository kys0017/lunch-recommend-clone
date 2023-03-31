import { createUpdateData, PARTITION_KEY_VALUE, readDataItem } from "./db";
import { Context, Handler } from "aws-lambda";

const main: Handler = async (event: any, context: Context) => {
  try {
    const sp = new URLSearchParams(event.body);
    const text = sp.get("text") as string;

    // 이미 있는 메뉴인지 확인
    const list = await readDataItem(text);

    if (list.length <= 0) {
      await createUpdateData({
        type: PARTITION_KEY_VALUE,
        desc: `${PARTITION_KEY_VALUE}-${text}`,
        name: text,
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        text: !!list.length
          ? "❗이미 존재하는 메뉴입니다"
          : "👌메뉴에 [" + text + "] 추가 완료",
      }),
    };
  } catch (e) {
    return {
      statusCode: 404,
      body: JSON.stringify({ text: `🐛메뉴 추가 오류\n${e?.message ?? ""}` }),
    };
  }
};

export { main };
