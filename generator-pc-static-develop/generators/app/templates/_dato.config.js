'use strict'

// dato, allows you to get content coming from your administrative area;
// root, represents the root of your project and makes it easy to create local files and directories;
// i18n, is useful in multi-language sites to switch between the various available locales and get back translated content;
const util = require('util');
const fs = require('fs');

// Example dato.config.js from https://docs.datocms.com/metalsmith/basic-usage.html
module.exports = (dato, root, i18n) => {

	// inside a "src/html/pages/posts" directory...
	root.directory("src/html/pages/posts", (articlesDir) => {

		// ...iterate over the "Blog post" records...
		dato.blogPosts.forEach((article) => {

			// ...and create a markdown file for each article!
			articlesDir.createPost(
				`${article.slug}.md`, "yaml", {
					frontmatter: {
						title: article.title,
						category: article.categories.map(cat => cat.name)
					},
					content: article.content
				}
			);
		});
	});
};
