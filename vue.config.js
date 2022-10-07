const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
	transpileDependencies: true,

	pages: {
		popup: {
			template: "public/browser-extension.html",
			entry: "./src/components/Popup/main.js",
			title: "Popup"
		},
		newTab: {
			template: "public/browser-extension.html",
			entry: "./src/views/tab/main.js",
			title: "NewTab"
		}
	},

	pluginOptions: {
		browserExtension: {
			componentOptions: {
				background: {
					entry: "src/background.js"
				},
				contentScripts: {
					entries: {
						"content-script": [
							"src/content-scripts/content-script.js"
						]
					}
				}
			}
		}
	}
});
