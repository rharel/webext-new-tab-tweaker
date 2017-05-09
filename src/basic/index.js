module.exports = exports =
{
	Ordering: require('./ordering')
};
if (window !== undefined)
{
	if (window.NTT === undefined) { window.NTT = {}; }
	window.NTT.Common = exports;
}
