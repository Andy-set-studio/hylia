const isLive = post => {
  const now = new Date();
  return !post.draft && post.date && new Date(post.date) <= now;
}

module.exports = {
  eleventyComputed: {
    permalink: data => {
      let postPermalink = "/posts/{{ page.fileSlug }}/";
      return isLive(data) ? postPermalink : false;
    },
    eleventyExcludeFromCollections: data => {
      return !isLive(data);
    }
  }
};
