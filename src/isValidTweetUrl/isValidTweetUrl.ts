type UserName = string;
type TweetId = number;

export const isValidTweetUrl = (
  url: string
): url is `https://twitter.com/${UserName}/status/${TweetId}` => {
  if (!url.startsWith("https://twitter.com/")) {
    return false;
  }

  const urlObj = new URL(url);
  const { pathname } = urlObj;
  const paths = pathname.split("");
  // check only url is https://twitter.com/hoge/bar
  return paths.length > 1;
};
