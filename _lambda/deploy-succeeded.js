// Stolen from https://github.com/maxboeck/mxb/blob/master/_lambda/deploy-succeeded.js

import fetch from 'node-fetch';
import dotenv from 'dotenv';
import Twitter from 'twitter';

dotenv.config();

// URL of site JSON feed
const FEED_URL = 'https://frontendweekly.tokyo/feed.json';

// Configure Twitter API Client
const twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// Helper Function to return unknown errors
const handleError = err => {
  console.error(err);
  const msg = Array.isArray(err) ? err[0].message : err.message;
  return {
    statusCode: 422,
    body: String(msg)
  };
};

// Helper Function to return function status
const status = (code, msg) => {
  console.log(msg);
  return {
    statusCode: code,
    body: msg
  };
};

// Check existing posts
const processPosts = async posts => {
  const items = posts.items;

  if (!items.length) {
    return status(404, 'No posts found to process.');
  }

  // assume the last post is not yet syndicated
  const latestPost = items[0];

  console.log('latestPost.url is ', latestPost.url);

  try {
    // check twitter for any tweets containing post URL.
    // if there are none, publish it.
    const q = await twitter.get('search/tweets', {q: latestPost.url});
    if (q.statuses && q.statuses.length === 0) {
      return publishPost(latestPost);
    } else {
      return status(400, 'Latest post was already syndicated. No action taken.');
    }
  } catch (err) {
    return handleError(err);
  }
};

// Prepare the content string for tweet format
const prepareStatusText = post => {
  // Tweet will be
  // title === Vol.252
  // summary === Containプロパティを用いたブラウザの最適化、クリーンなコードが全てではない、Webにおけるフォントサイズの変遷、ほか計12リンク
  // url === https://frontendweekly.tokyo/posts/252/
  // `${summary} Frontend Weekly ${title} {$url}`
  // `${summary} Frontend Weekly ${title}`.length MUST be within maxLength
  const maxLength = 280 - 3 - 1 - 23 - 20;

  const title = post.title;
  const summary = post.summary;

  let tweetText = `${summary} Frontend Weekly ${title}`;

  // truncate text if its too long for a tweet.
  if (tweetText.length > maxLength) {
    tweetText = tweetText.substring(0, maxLength) + '...';
  }

  // include the post url at the end;
  tweetText += ` ${post.url}`;

  return tweetText;
};

// Push a new post to Twitter
const publishPost = async post => {
  try {
    const statusText = prepareStatusText(post);
    const tweet = await twitter.post('statuses/update', {
      status: statusText
    });
    if (tweet) {
      return status(200, `Post ${post.date} successfully posted to Twitter.`);
    } else {
      return status(422, 'Error posting to Twitter API.');
    }
  } catch (err) {
    return handleError(err);
  }
};

// Main Lambda Function Handler
exports.handler = async () => {
  // Fetch the list of published posts to work on,
  // then process them to check if an action is necessary
  return fetch(FEED_URL)
    .then(response => response.json())
    .then(processPosts)
    .catch(handleError);
};
