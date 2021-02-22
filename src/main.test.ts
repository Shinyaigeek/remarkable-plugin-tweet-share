import { Remarkable } from "remarkable";
import { tweetMacroPlugin } from "./main";

describe("remarkdown-plugin-tweet-share", () => {
  test("parse !tweet macro", () => {
    const src = `## h2
### h3

!tweet[](https://twitter.com/Shinyaigeek/status/1363426871950536705?s=20)
`;

    const md = new Remarkable();
    md.use(tweetMacroPlugin)
    console.log(md.render(src))
    expect(md.render(src)).toEqual(`<h2>h2</h2>
<h3>h3</h3>
<p><a href="https://twitter.com/Shinyaigeek/status/1363426871950536705?s=20"><img src="https://tweet2image.vercel.app/1363426871950536705.jpg" alt=""></a></p>
`);
  });

  test("parse !tweet macro", () => {
    const src = `## h2
### h3

!tweet[](https://twitter.com/Shinyaigeek/status/1363426871950536705?s=20)

![](asdf)
`;

    const md = new Remarkable();
    md.use(tweetMacroPlugin)
    console.log(md.render(src))
    expect(md.render(src)).toEqual(`<h2>h2</h2>
<h3>h3</h3>
<p><a href="https://twitter.com/Shinyaigeek/status/1363426871950536705?s=20"><img src="https://tweet2image.vercel.app/1363426871950536705.jpg" alt=""></a></p>
<p><img src="asdf" alt=""></p>
`);
  });

  test("cancel parsing !tweet", () => {
    const src = `## h2
### h3

!tweet[
`;

    const md = new Remarkable();
    md.use(tweetMacroPlugin)
    console.log(md.render(src))
    expect(md.render(src)).toEqual(`<h2>h2</h2>
<h3>h3</h3>
<p>!tweet[</p>
`);
  });

  test("parse !tweet alt", () => {
    const src = `## h2
### h3

!tweet[ここはalt](https://twitter.com/Shinyaigeek/status/1363426871950536705?s=20)
`;

    const md = new Remarkable();
    md.use(tweetMacroPlugin)
    console.log(md.render(src))
    expect(md.render(src)).toEqual(`<h2>h2</h2>
<h3>h3</h3>
<p><a href="https://twitter.com/Shinyaigeek/status/1363426871950536705?s=20"><img src="https://tweet2image.vercel.app/1363426871950536705.jpg" alt="ここはalt"></a></p>
`);
  });
});
