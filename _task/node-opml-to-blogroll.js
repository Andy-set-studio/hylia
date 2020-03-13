const path = require('path');
const fs = require('fs');

const jq = require('node-jq');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

const DATA_PATH = path.resolve(process.env.PWD, 'src/_data');

dotenv.config();

// Configuration
/// Feedbin API URL
const FEEDBIN_API_URL = 'https://api.feedbin.com/v2/subscriptions.json';

/// Configure Feedbin API option
const FEEDBIN_API_OPTION = {
  method: 'GET',
  headers: {
    Authorization: `Basic ${process.env.FEEDBIN_API_TOKEN}`
  }
};

// Helpers function
/// Function to return unknown errors
const handleError = err => {
  console.error(err);
  process.exit(1);
};

/// Fetch latest subscriptions from Feedbin
const getSubscription = async () => {
  try {
    const response = await fetch(`${FEEDBIN_API_URL}`, FEEDBIN_API_OPTION);

    return await response.json();
  } catch (err) {
    handleError(err);
  }
};

/// Function to transform JSON using node-jq
const transformJSON = async json => {
  const baseSchema = '{dateCreated: .[0].created_at, items: [.[]]}';
  const removeUnusedKey = '.items |= map(del(.id, .feed_id))';
  const removeDupe = '.items |= unique_by(.feed_url)';
  const sortByTitle = '.items |= sort_by(.title)';
  const AListApartURLFix =
    '.items |= map(if .title == "A List Apart" then .site_url = "https://alistapart.com" else . end)';
  const flagTwitter =
    '.items |= map(if .title|test("^Twitter List*.*") then .+ {twitter: true} else . end)';
  const flagNewsletter =
    '.items |= map(if .feed_url|test(".*\\\\?[0-9a-f]{5,40}") then .+ {newsletter: true} else . end)';

  const filter = `${baseSchema} | ${removeUnusedKey} | ${removeDupe} | ${sortByTitle} | ${AListApartURLFix} | ${flagTwitter} | ${flagNewsletter}`;

  const option = {
    input: 'string'
  };

  try {
    return await jq.run(filter, json, option);
  } catch (error) {
    console.log(error);
  }
};

// Main Function
async function main() {
  const subscription = await getSubscription();
  const json = JSON.stringify(subscription, null, 2);
  const blogroll = await transformJSON(json);

  // console.log(blogroll);

  fs.writeFileSync(`${DATA_PATH}/opml.json`, blogroll, 'utf-8');
}

main();
