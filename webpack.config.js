const path = require('path');

module.exports =
{
	entry:
	{
		common: "./src/common/index.js",
		configuration: "./src/configuration/index.js"
	},
	output:
	{
		path: path.resolve(__dirname, "dist/common/js/"),
		filename: "[name].js"
	}
};
