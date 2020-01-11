const querystring = require('querystring');
const path = require('path');
const fs = require('fs');

const fetch = require('node-fetch');
const dotenv = require('dotenv');
const minimist = require('minimist');
const opts = minimist(process.argv.slice(2));

dotenv.config();

// Configuration
/// Trello API URL
const TRELLO_API_URL_PREFIX = "https://api.trello.com/1/lists/";

/// Configure Trello API Client
const TRELLO_API = {
	access_token_key: process.env.TRELLO_API_TOKEN_KEY,
	access_token_secret: process.env.TRELLO_API_TOKEN_SECRET
};

/// Configure list. Our list is "Curated"
const TRELLO_FE_WEEKLY_LIST = process.env.TRELLO_FE_WEEKLY_LIST;

/// Posts location
const POSTS_DIR = path.resolve(process.env.PWD, 'src/posts');

// Helper functions
/// Helper Function to return unknown errors
const handleError = err => {
	console.error(err);
	const msg = Array.isArray(err) ? err[0].message : err.message;
	return {
		statusCode: 422,
		body: String(msg)
	}
};

/// Generate querystring for Trello cards API
const params = () => {
	return querystring.stringify({
		attachments: true,
		card_attachment_fields: "url",
		fields: "id,name,desc",
		key: TRELLO_API.access_token_key,
		token: TRELLO_API.access_token_secret
	});
};

/// Prepare 11ty's Template Data
const prepareTemplateData = (response) => {
	// Strip URL and /n from desc
	const removeNoise = value => {
		const regex = /(\\n|\\r)|http(s):\/\/\S*/gm;
		return value.replace(regex, '').trim();
	};

	const fixDescCallBack = (accumulator, currentElement) => {
		const fixDesc = {
			...currentElement,
			desc: removeNoise(currentElement.desc)
		};

		// Return the value for the next step by using the array from the previous step and
		// replace desc
		return [...accumulator, fixDesc];
	};

	return response.reduce(fixDescCallBack, []);
};

/// Fetch cards from Trello
const getCards = async () => {
	try {
		const response = await fetch(`${TRELLO_API_URL_PREFIX}${TRELLO_FE_WEEKLY_LIST}/cards?${params()}`, {
			"method": "GET"
		});

		return prepareTemplateData(await response.json());
	} catch (err) {
		handleError(err);
	}
};

/// Put templateData in POSTS_DIR
const putData = templateData => {
	// If opts.vol isn't passed then exit
	if (!opts.vol) {
		console.error(`opts.vol is REQUIRED. Please add post vol using the '--vol=' parameter`);
		process.exit(1)
	}

	try {
		fs.writeFileSync(`${POSTS_DIR}/${opts.vol}.11tydata.json`, JSON.stringify(templateData, null, 2),'utf-8')
	} catch (err) {
		handleError(err);
	}
};

// Main Function
async function main() {
	const templateData = await getCards();
	putData(templateData);
}

main();
