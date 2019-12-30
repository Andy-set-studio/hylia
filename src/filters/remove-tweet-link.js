module.exports = function tweetRemoveLink(value) {
	return value.replace(/https:\/\/t.co\/\S*/gm, "")
};
