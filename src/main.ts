import Remarkable from "remarkable/lib";
import { tokenizeTweetMacro } from "./tweetMacro/tweetMacro";

export const tweetMacroPlugin = (md: Remarkable) => {
  md.inline.ruler.before("links", "tweet-macro", tokenizeTweetMacro, {});
};
