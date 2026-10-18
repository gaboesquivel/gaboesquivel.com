import { EmbeddedTweet, TweetNotFound } from "react-tweet";
import type { TweetProps } from "react-tweet";
import { getTweet } from "react-tweet/api";

import "./tweet.css";

const TweetContent = async ({ id, components, onError }: TweetProps) => {
  let error: unknown;
  const tweet = id
    ? await getTweet(id).catch((error) => {
        if (onError) {
          error = onError(error);
        } else {
          console.error(error);
          error = error;
        }
      })
    : undefined;

  if (!tweet) {
    const NotFound = components?.TweetNotFound || TweetNotFound;
    return <NotFound error={error} />;
  }

  return <EmbeddedTweet tweet={tweet} components={components} />;
};

export const ReactTweet = (props: TweetProps) => <TweetContent {...props} />;

export async function TweetComponent({ id }: { id: string }) {
  return (
    <div className="tweet my-6">
      <div className="flex justify-center">
        <ReactTweet id={id} />
      </div>
    </div>
  );
}
