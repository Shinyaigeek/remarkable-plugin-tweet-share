import { peek } from "./peek";

describe("peek", () => {
  test("peek 3 char", () => {
    const src = `
        # HogeHoge

        ![](./asdf.jpg)

        tweet![](https://twitter.com/Shinyaigeek/status/1363155719717982210?s=20)
        `;

    expect(peek(src, 54, 5)).toEqual("tweet");
  });

  test("can peek over src", () => {
    const src = `t`;

    expect(peek(src, 0, 5)).toEqual("t");
  });
});
