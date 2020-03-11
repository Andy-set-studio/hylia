const querystring = require('querystring');
const path = require('path');
const fs = require('fs');

const jq = require('node-jq');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const minimist = require('minimist');
const opts = minimist(process.argv.slice(2));

dotenv.config();

// Configuration
/// Posts location
const POSTS_DIR = path.resolve(process.env.PWD, 'src/posts');

// Helper functions
/// Helper Function to return unknown errors
const handleError = err => {
  console.error(err);
  process.exit(1);
};

/// option handler
const optionHandler = () => {
  // If opts.vol isn't passed then exit
  if (!opts.vol) {
    handleError(`opts.vol is REQUIRED. Please add post vol using the '--vol=' parameter`);
  }

  // If opts.date isn't passed then exit
  if (!opts.date) {
    handleError(
      `opts.date is REQUIRED. Please add post vol using the '--date=YYYY-MM-DD' parameter`
    );
  }
};

/// Prepare Template
const prepareTemplateData = async response => {
  /// Function to transform response using node-jq
  const transformResponse = async res => {
    const json = JSON.stringify(res, null, 2);
    const baseSchema =
      '.[] |= { id: .id, title: .name, desc: .desc, label: .labels[].name, url: .attachments[].url }';
    const filter = `${baseSchema}`;

    try {
      const option = {
        input: 'string'
      };
      return await jq.run(filter, json, option);
    } catch (error) {
      console.log(error);
    }
  };

  return JSON.parse(await transformResponse(response));
};

/// Fetch cards from Trello
const getCards = async () => {
  /// Trello API URL
  const TRELLO_API_URL_PREFIX = 'https://api.trello.com/1/lists/';

  /// Configure Trello API Client
  const TRELLO_API = {
    access_token_key: process.env.TRELLO_API_TOKEN_KEY,
    access_token_secret: process.env.TRELLO_API_TOKEN_SECRET
  };

  /// Configure list. Our list is "Curated"
  const TRELLO_FE_WEEKLY_LIST = process.env.TRELLO_FE_WEEKLY_LIST;

  /// Generate querystring for Trello cards API
  const params = () => {
    return querystring.stringify({
      attachments: true,
      card_attachment_fields: 'url',
      fields: 'id,name,desc,labels',
      key: TRELLO_API.access_token_key,
      token: TRELLO_API.access_token_secret
    });
  };

  try {
    const requestURL = `${TRELLO_API_URL_PREFIX}${TRELLO_FE_WEEKLY_LIST}/cards?${params()}`;
    const response = await fetch(requestURL, {method: 'GET'});
    return prepareTemplateData(await response.json());
  } catch (err) {
    handleError(err);
  }
};

/// Generate a post file
const generatePost = tmplData => {
  const makeTitle = vol => `title: Vol.${vol}`;
  const makeDate = date => `date: ${date}`;
  const makeDesc = () => `desc: '3 OF TRANSLATED TITLE、ほか計${tmplData.length}リンク'`;
  const makePermalink = vol => `permalink: /posts/${vol}/`;
  const frontMatter = () =>
    `---
${makeTitle(opts.vol)}
${makeDate(opts.date)}
${makeDesc()}
${makePermalink(opts.vol)}
---
`;

  // Strip URL and /n from desc
  const removeNoise = value => {
    const regex = /(\\n|\\r)|http(s):\/\/\S*/gm;
    return value.replace(regex, '').trim();
  };

  const description = element => (element ? removeNoise(element) : `FILL ME`);

  // A typical post would look like this:
  // ## [${Title}(${Link})
  // #### ${Translated Title}
  // ${Excerpt}
  // ↑ We will have 3 of this.
  // In Trello, MUSTREAD MUST be labeled as MUSTREAD
  const isMustRead = element => element.label === 'MUSTREAD';
  const makeMustRead = element =>
    `## [${element.title}](${element.url})
#### TRANSLATED TITLE

${description(element.desc)}

`;

  // ## [${Title}(${Link})
  // ${Excerpt}
  // ↑ We will have about 4 of this.
  // In Trello, FEATURED MUST be labeled as FEATURED
  const isFeatured = element => element.label === 'FEATURED';
  const makeFeatured = element =>
    `## [${element.title}](${element.url})

${description(element.desc)}

`;

  // In Brief heading
  const makeInBriefHeading = () => `# In Brief{inbrief}`;

  // InBrief is
  // - **[${Title}(${Link})]**: ${Translated Title}
  // ↑ We will have about 5 of this.
  // In Trello, INBRIEF MUST be labeled as INBRIEF
  const isInBrief = element => element.label === 'INBRIEF';
  const makeInBrief = element =>
    `
- **[${element.title}](${element.url})**: TRANSLATED TITLE
`;

  const mustread = tmplData
    .filter(isMustRead)
    .map(makeMustRead)
    .join('');
  const featured = tmplData
    .filter(isFeatured)
    .map(makeFeatured)
    .join('');
  const inBrief = tmplData
    .filter(isInBrief)
    .map(makeInBrief)
    .join('');

  return `${frontMatter()}
${mustread}
${featured}
${makeInBriefHeading()}
${inBrief}`;
};

/// Save post as md
const savePost = post => {
  const filePath = `${POSTS_DIR}/${opts.date}-v${opts.vol}.md`;
  try {
    fs.writeFileSync(filePath, post, 'utf-8');
  } catch (err) {
    handleError(err);
  }
};

// Main Function
async function main() {
  optionHandler();
  const tmplData = await getCards();
  const post = generatePost(tmplData);
  savePost(post);
}

main();
