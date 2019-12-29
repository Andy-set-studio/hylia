module.exports = {
  getNextHeadingLevel(currentLevel) {
    return parseInt(currentLevel, 10) + 1;
  },
  getReadingTime(text) {
  	// Stealed from https://github.com/pritishvaidya/read-time-estimate
  	const WORDS_PER_MIN = 270;
		const IMAGE_READ_TIME = 12;
		const CHINESE_KOREAN_READ_TIME = 400;
		const IMAGE_TAGS = ['img', 'Image'];

		function stripWhitespace(string) {
			return string.replace(/^\s+/, '').replace(/\s+$/, '');
		}

		function stripTags(string) {
			const pattern = '<\\w+(\\s+("[^"]*"|\\\'[^\\\']*\'|[^>])+)?>|<\\/\\w+>';
			const reg = new RegExp(pattern, 'gi');
			return string.replace(reg, '');
		}

		function wordsCount(string) {
			const pattern = '\\w+';
			const reg = new RegExp(pattern, 'g');
			return (string.match(reg) || []).length;
		}

		// Chinese / Japanese / Korean
		function otherLanguageReadTime(string) {
			const pattern = '[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]';
			const reg = new RegExp(pattern, 'g');
			const count = (string.match(reg) || []).length;
			const time = count / CHINESE_KOREAN_READ_TIME;
			const formattedString = string.replace(reg, '');
			return {
				count,
				time,
				formattedString,
			};
		}

		function wordsReadTime(string, wordsPerMin = WORDS_PER_MIN) {
			const {
				count: characterCount,
				time: otherLanguageTime,
				formattedString,
			} = otherLanguageReadTime(string);
			const wordCount = wordsCount(formattedString);
			const wordTime = wordCount / wordsPerMin;
			return {
				characterCount,
				otherLanguageTime,
				wordTime,
				wordCount,
			};
		}

		function imageCount(imageTags, string) {
			const combinedImageTags = imageTags.join('|');
			const pattern = `<(${combinedImageTags})([\\w\\W]+?)[\\/]?>`;
			const reg = new RegExp(pattern, 'g');
			return (string.match(reg) || []).length;
		}

		function imageReadTime(customImageTime = IMAGE_READ_TIME, tags = IMAGE_TAGS, string) {
			let seconds = 0;
			const count = imageCount(tags, string);

			if (count > 10) {
				seconds = ((count / 2) * (customImageTime + 3)) + (count - 10) * 3; // n/2(a+b) + 3 sec/image
			} else {
				seconds = (count / 2) * (2 * customImageTime + (1 - count)); // n/2[2a+(n-1)d]
			}
			return {
				time: seconds / 60,
				count,
			};
		}

		function readTime(
			string = text,
			customWordTime = WORDS_PER_MIN,
			customImageTime = IMAGE_READ_TIME,
			chineseKoreanReadTime = CHINESE_KOREAN_READ_TIME,
			imageTags = IMAGE_TAGS,
		) {
			const { time: imageTime, count: imageCount } = imageReadTime(customImageTime, imageTags, string);
			const strippedString = stripTags(stripWhitespace(string));
			const {
				characterCount,
				otherLanguageTime,
				wordTime,
				wordCount,
			} = wordsReadTime(strippedString, customWordTime);
			return Math.ceil(imageTime + wordTime);
		}

		return readTime()
  }
};
