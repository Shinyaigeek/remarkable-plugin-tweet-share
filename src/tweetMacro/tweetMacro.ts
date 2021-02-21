import Remarkable, {
  ContentToken,
  ImageToken,
  LinkCloseToken,
  LinkOpenToken,
  LinkToken,
} from "remarkable/lib";
import { peek } from "../peek/peek";

export const tokenizeTweetMacro = (
  state: Remarkable.StateInline,
  silent: boolean
): boolean => {
  let max = state.posMax,
    start = state.pos,
    marker = state.src.charCodeAt(start);

  if (peek(state.src, start, 6) !== "!tweet") {
    return false;
  }
  state.pos += 6;
  marker = state.src.charCodeAt(state.pos);

  if (marker !== 0x5b /* [ */) {
    return false;
  }

  let level = 1;

  let found = false;

  state.pos++;

  const labelStart = state.pos;

  while (state.pos < max) {
    marker = state.src.charCodeAt(state.pos);
    if (marker === 0x5b /* [ */) {
      level++;
    } else if (marker === 0x5d /* ] */) {
      level--;
      if (level === 0) {
        found = true;
        break;
      }
    }

    state.pos++;
  }

  if (!found) {
    return false;
  }

  const labelEnd = state.pos;
  state.pos++;

  const label = state.src.slice(labelStart, labelEnd);

  if (
    state.src.charCodeAt(state.pos) !== 0x28
    /* ( */
  ) {
    return false;
  }

  level = 1;

  found = false;

  state.pos++;

  const hrefStart = state.pos;

  while (state.pos < max) {
    marker = state.src.charCodeAt(state.pos);
    if (marker === 0x28 /* ( */) {
      level++;
    } else if (marker === 0x29 /* ) */) {
      level--;
      if (level === 0) {
        found = true;
        break;
      }
    }

    state.pos++;
  }

  if (!found) {
    return false;
  }

  const hrefEnd = state.pos;

  state.pos++;

  const href = state.src.slice(hrefStart, hrefEnd);

  const tweetUrl = new URL(href).pathname.split("/")[3];

  state.push({
    type: "link_open",
    href: href,
    level: state.level,
  } as LinkOpenToken);

  state.push({
    type: "image",
    src: `https://tweet2image.vercel.app/${tweetUrl}.jpg`,
    alt: label,
    level: state.level++,
  } as ImageToken);

  state.push({ type: "link_close", level: --state.level } as LinkCloseToken);

  return true;
};
