'use strict'

// dato, allows you to get content coming from your administrative area;
// root, represents the root of your project and makes it easy to create local files and directories;
// i18n, is useful in multi-language sites to switch between the various available locales and get back translated content;
const util = require('util');
const fs = require('fs');
module.exports = (dato, root, i18n) => {
	root.directory("src/html/data", (dir) => {
		writeHomePage(dir,dato);
		writeAboutPage(dir,dato);
		writeServicePage(dir,dato);
	});

	root.directory("src/html/articles_data", (articlesDir) => {
		dato.articles.forEach((article) => {

			articlesDir.createPost(
				`${article.slug}.md`, 'yaml', {
					frontmatter: {
						header_image: article.headerImage,
						title: article.title,
						summary: article.summary,
						sub_title: article.subTitle,
						left_box_heading: article.leftBoxHeading,
						left_box_copy: article.leftBoxCopy,
						right_box_heading: article.rightBoxHeading,
						right_box_copy: article.rightBoxCopy,
						article_type: article.articleType,
						author: article.author,
						url: article.title,
						content: article.content.toMap()
					}
				}
			);
		});
	});
	root.directory("src/html/data", (articlesDir) => {
		let results = [];

		dato.articles.forEach((article) => {

				const el = article.toMap();
				const content = {
					header_image: article.headerImage,
					title: article.title,
					summary: article.summary,
					sub_title: article.subTitle,
					left_box_heading: article.leftBoxHeading,
					left_box_copy: article.leftBoxCopy,
					right_box_heading: article.rightBoxHeading,
					right_box_copy: article.rightBoxCopy,
					article_type: article.articleType,
					author: article.author,
					featured: article.featured,
					small_tile: article.smallTile,
					medium_tile: article.mediumTile,
					large_tile: article.largeTile,
					url: article.slug,
					content: article.content.toMap()
				};
				results.push(content);
		});

		articlesDir.createDataFile('all_articles.json', 'json', results);
	});
};

function writeHomePage(dir,dato) {
	const el = dato.homePage.toMap();
	dir.createDataFile('home_page.json', 'json', {
		title_white: el.titleWhite,
		title_white_two: el.titleWhiteTwo,
		title_red: el.titleRed,
		header_image: el.headerImage
	});
}

function writeAboutPage(dir,dato) {
	const el = dato.aboutPage.toMap();
	dir.createDataFile('about_page.json', 'json', {
		header_image: el.headerImage,
		title_white: el.titleWhite,
		title_red: el.titleRed,
		subtitle: el.subtitle,
		intro_heading: el.introHeading,
		intro_text: el.introText,
		intro_image: el.introImage,
		section_two_heading: el.sectionTwoHeading,
		section_two_gallery: el.sectionTwoGallery,
		section_three_heading: el.sectionThreeHeading,
		section_three_image_left: el.sectionThreeImageLeft,
		section_three_subheading_left: el.sectionThreeSubheadingLeft,
		section_three_copy_left: el.sectionThreeCopyLeft,
		section_three_image_right: el.sectionThreeImageRight,
		section_three_subheading_right: el.sectionThreeSubheadingRight,
		section_three_copy_right: el.sectionThreeCopyRight,
		section_four_heading: el.sectionFourHeading,
		section_four_gallery: el.sectionFourGallery,
		invite_text: el.inviteText
	});
}

function writeServicePage(dir,dato) {
	const el = dato.servicePage.toMap();
	dir.createDataFile('service_page.json', 'json', {
		header_image: el.headerImage,
		title_white: el.titleWhite,
		title_red: el.titleRed,
		subtitle: el.subtitle,
		intro_heading: el.introHeading,
		section_one_image: el.sectionOneImage,
		section_one_heading: el.sectionOneHeading,
		section_one_subheading: el.sectionOneSubheading,
		section_one_copy: el.sectionOneCopy,
		section_two_image: el.sectionTwoImage,
		section_two_heading: el.sectionTwoHeading,
		section_two_subheading: el.sectionTwoSubheading,
		section_two_copy: el.sectionTwoCopy,
		section_three_image: el.sectionThreeImage,
		section_three_heading: el.sectionThreeHeading,
		section_three_subheading: el.sectionThreeSubheading,
		section_three_copy: el.sectionThreeCopy,
		section_four_image: el.sectionFourImage,
		section_four_heading: el.sectionFourHeading,
		section_four_subheading: el.sectionFourSubheading,
		section_four_copy: el.sectionFourCopy
	});
}
