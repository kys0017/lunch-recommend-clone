import { Context, Handler } from "aws-lambda";
import { readData } from "./db";

const main: Handler = async (event: any, context: Context) => {
  try {
    const sp = new URLSearchParams(event.body);
    const text = sp.get("text") as string;
    const list = await readData(text);

    let rtn = `🍱${!!text ? `'${text}' 메뉴 리스트` : `전체 메뉴 리스트`} [${
      list?.length ?? 0
    }건] 🍱\n`;

    if (!!list.length) {
      list.sort((a, b) => (a.name > b.name ? 1 : -1));

      list.forEach((item) => {
        rtn += `➡️ ${item.name}\n`;
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ text: rtn }),
    };
  } catch (e) {
    return {
      statusCode: 404,
      body: JSON.stringify({ text: `🐛메뉴 조회 오류\n${e?.message ?? ""}` }),
    };
  }
};

export { main };
