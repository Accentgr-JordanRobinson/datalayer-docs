import * as path from "node:path";
import { defineConfig } from "rspress/config";

export default defineConfig({
	base: '/datalayer-docs/',
	root: path.join(__dirname, "docs"),
	globalStyles: path.join(__dirname, "styles/index.css"),
	title: "Martech Docs",
	icon: "https://fav.farm/%E2%98%95",
	logoText: 'Martech Docs',
	themeConfig: {
		lastUpdated: true,
	},
});
