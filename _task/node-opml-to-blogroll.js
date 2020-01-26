const path = require('path');
const fs = require('fs');
const parser = require('fast-xml-parser');

const OPML_PATH = path.resolve(process.env.PWD, '_task');
const DATA_PATH = path.resolve(process.env.PWD, 'src/_data');

const opml = fs.readFileSync(`${OPML_PATH}/subscriptions.xml`, 'utf-8');

// Helpers function
const removeDuplicates = (array, key) => {
  let lookup = new Set();
  return array.filter(obj => !lookup.has(obj[key]) && lookup.add(obj[key]));
};

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
  const uniqueObj = removeDuplicates(parsed.opml.body.outline.outline, '_xmlUrl');
  const finalObj = {
    dateCreated: parsed.opml.head.dateCreated,
    items: uniqueObj
  };
  const blogroll = JSON.stringify(finalObj, null, 2);

  console.log(blogroll);

  fs.writeFileSync(`${DATA_PATH}/opml.json`, blogroll, 'utf-8');
} catch (error) {
  console.log(error.message)
}
