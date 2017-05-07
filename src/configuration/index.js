module.exports = exports =
{
	Version: require('./version'),
	Layout: require('./layout'),
	Storage: require('./storage')
};
if (window !== undefined)
{
	if (window.NTT === undefined) { window.NTT = {}; }
	window.NTT.Configuration = exports;
}
