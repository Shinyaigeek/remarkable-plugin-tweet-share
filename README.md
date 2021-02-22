# Remarkable plugin tweet share

## Feature ✨

This is plugin for [remarkable](https://github.com/jonschlinkert/remarkable).
This plugin will allow you to share tweet in markdown with tiny code and without script to embed tweet, like

```markdown
!tweet[](tweet url)
```

For Example, 

```markdown
!tweet()[https://twitter.com/Shinyaigeek/status/1363426871950536705?s=20]
```

above markdown will be parsed into

```html
<a href="https://twitter.com/Shinyaigeek/status/1363426871950536705?s=20">
  <img src="https://tweet2image.vercel.app/1363426871950536705.jpg" alt="">
</a>
```

and rendered as

![](./1363426871950536705.jpg).

## Usage

```cli
yarn add remarkable-plugin-tweet-share remarkable -D
```

and 

```typescript
import { Remarkable } from "remarkable";
import { tweetMacroPlugin } from "remarkable-plugin-tweet-share";

const md = new Remarkable();

md.use(tweetMacroPlugin);

md.render(html);
```

## LICENSE

MIT