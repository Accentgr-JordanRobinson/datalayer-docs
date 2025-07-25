import * as path from "node:path";
import { defineConfig } from "rspress/config";

export default defineConfig({
	root: path.join(__dirname, "docs"),
	globalStyles: path.join(__dirname, "styles/index.css"),
	title: "Adobe Experience Platform",
	icon: "https://fav.farm/%E2%98%95",
	logo: {
		light: "/logo-dark.png",
		dark: "/logo-light.png",
	},
	themeConfig: {
		lastUpdated: true,
	},
});
