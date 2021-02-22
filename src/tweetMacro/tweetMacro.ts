import Remarkable, {
  ContentToken,
  ImageToken,
  LinkCloseToken,
  LinkOpenToken,
  LinkToken,
} from "remarkable/lib";
import { isValidTweetUrl } from "../isValidTweetUrl/isValidTweetUrl";
import { peek } from "../peek/peek";

export const tokenizeTweetMacro = (state: Remarkable.StateInline): boolean => {
  const start = state.pos;
  let marker = state.src.charCodeAt(start);
  const max = state.posMax;

  if (peek(state.src, start, 6) !== "!tweet") {
    state.pos = start;
    return false;
  }
  state.pos += 6;
  marker = state.src.charCodeAt(state.pos);

  if (marker !== 0x5b /* [ */) {
    state.pos = start;
    return false;
  }

  let labelLevel = 1;

  let labelFound = false;

  state.pos++;

  const labelStart = state.pos;

  while (state.pos < max) {
    marker = state.src.charCodeAt(state.pos);
    if (marker === 0x5b /* [ */) {
      labelLevel++;
    } else if (marker === 0x5d /* ] */) {
      labelLevel--;
      if (labelLevel === 0) {
        labelFound = true;
        break;
      }
    }

    state.pos++;
  }

  if (!labelFound) {
    state.pos = start;
    return false;
  }

  const labelEnd = state.pos;
  state.pos++;

  const label = state.src.slice(labelStart, labelEnd);

  if (
    state.src.charCodeAt(state.pos) !== 0x28
    /* ( */
  ) {
    state.pos = start;
    return false;
  }

  let hrefLevel = 1;

  let hrefFound = false;

  state.pos++;

  const hrefStart = state.pos;

  while (state.pos < max) {
    marker = state.src.charCodeAt(state.pos);
    if (marker === 0x28 /* ( */) {
      hrefLevel++;
    } else if (marker === 0x29 /* ) */) {
      hrefLevel--;
      if (hrefLevel === 0) {
        hrefFound = true;
        break;
      }
    }

    state.pos++;
  }

  if (!hrefFound) {
    state.pos = start;
    return false;
  }

  const hrefEnd = state.pos;

  state.pos++;

  const href = state.src.slice(hrefStart, hrefEnd);

  if (!isValidTweetUrl(href)) {
    throw new Error("tweet url is invalid");
  }

  const tweetId = new URL(href).pathname.split("/")[3];

  state.push({
    type: "link_open",
    href: href,
    level: state.level,
  } as LinkOpenToken);

  state.push({
    type: "image",
    src: `https://tweet2image.vercel.app/${tweetId}.jpg`,
    alt: label,
    level: state.level++,
  } as ImageToken);

  state.push({ type: "link_close", level: --state.level } as LinkCloseToken);

  return true;
};
