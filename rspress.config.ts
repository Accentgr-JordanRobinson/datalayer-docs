import * as path from "node:path";
import { defineConfig } from "rspress/config";
import { pluginShiki } from '@rspress/plugin-shiki';

export default defineConfig({
	plugins: [pluginShiki({
		theme: "one-dark-pro",
	})],
	root: path.join(__dirname, "docs"),
	builderConfig: {
		resolve: {
			alias: {
				'@components': path.resolve(__dirname, './components/custom')
			}
		}
	},
	markdown: {
		mdxRs: false,
		globalComponents: [
			path.join(__dirname, 'components/global/Code.jsx'),
			path.join(__dirname, 'components/global/Tile.jsx'),
			path.join(__dirname, 'components/global/Table.jsx'),
			path.join(__dirname, 'components/global/GoogleEvent.jsx'),
			path.join(__dirname, 'components/global/GooglePage.jsx'),
			path.join(__dirname, 'components/global/Conditions.jsx'),
			path.join(__dirname, 'components/global/Actions.jsx'),
			path.join(__dirname, 'components/global/Tab.jsx'),
			path.join(__dirname, 'components/global/DataPath.jsx'),
			path.join(__dirname, 'components/global/Compare.jsx'),
			path.join(__dirname, 'components/global/EFCode.jsx'),
			path.join(__dirname, 'components/global/Fetch.jsx'),
			path.join(__dirname, 'components/global/Card.jsx')
		]
	},
	base: '/datalayer-docs/',
	globalStyles: path.join(__dirname, "styles/index.css"),
	title: "Martech Docs",
	icon: "https://fav.farm/%E2%98%95",
	logoText: 'Martech Docs',
	themeConfig: {
		lastUpdated: true,
	}
	
});
