import { isValidEntityCode } from "remarkable/lib/common/utils";
import { isValidTweetUrl } from "./isValidTweetUrl";

describe("isValidTweetUrl", () => {
  test("isValidTweetUrl with valid tweet url", () => {
    expect(
      isValidTweetUrl(
        "https://twitter.com/Shinyaigeek/status/1363426871950536705?s=20"
      )
    ).toBeTruthy();
  });

  test("isValidTweetUrl with invalid tweet url", () => {
    expect(
      isValidTweetUrl(
        "https://qiita.com/acro5piano/items/5787b9133f7433040085"
      )
    ).toBeFalsy();
  });

  test("isValidTweetUrl with invalid url", () => {
    expect(
      isValidTweetUrl(
        "shinyaigeek"
      )
    ).toBeFalsy();
  });
});
