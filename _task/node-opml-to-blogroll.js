const path = require('path');
const fs = require('fs');
const parser = require('fast-xml-parser');
const jq = require('node-jq');

const OPML_PATH = path.resolve(process.env.PWD, '_task');
const DATA_PATH = path.resolve(process.env.PWD, 'src/_data');

const opml = fs.readFileSync(`${OPML_PATH}/subscriptions.xml`, 'utf-8');

// Helpers function
const transformJSON = async json => {
  const filter = '.opml | {dateCreated: .head.dateCreated, items: .body.outline.outline} | .items|=map(del(._text, ._type)) | .items|=unique_by(._xmlUrl) | .items|=sort_by(._title)';

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
  try {
    const options = {
      attributeNamePrefix: "_",
      attrNodeName: false,
      textNodeName : "#text",
      ignoreAttributes: false,
      ignoreNameSpace: false,
      allowBooleanAttributes: true,
      parseNodeValue : true,
      parseAttributeValue : false,
      trimValues: true,
      arrayMode: false
    };

    const parsed = parser.parse(opml, options, true);
    const json = JSON.stringify(parsed, null, 2);
    const blogroll = await transformJSON(json);


    console.log(blogroll);

    fs.writeFileSync(`${DATA_PATH}/opml.json`, blogroll, 'utf-8');
  } catch (error) {
    console.log(error.message)
  }
}

main();
