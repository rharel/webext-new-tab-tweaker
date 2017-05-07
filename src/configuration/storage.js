const Version = require('./version');
const DEFAULT_CONFIGURATION = require('./layout').DEFAULT;

/**
 * The key to the configuration object in local storage.
 */
const KEY = "configuration@new-tab-tweaker";
/**
 * The extension's local storage
 */
const LocalStorage =
	browser !== undefined ?
		browser.storage.local :
		null;

/**
 * Loads the configuration from local storage asynchronously.
 *
 * @returns
 *      A promise which yields a configuration object when fulfilled.
 */
function load()
{
	if (LocalStorage === null)
	{
		return DEFAULT_CONFIGURATION;
	}
	else
	{
		return LocalStorage.get(KEY).then(item =>
		{
			if (item.hasOwnProperty(KEY))
			{
				return item[KEY];
			}
			else
			{
				return DEFAULT_CONFIGURATION;
			}
		});
	}
}
/**
 * Saves a configuration to local storage asynchronously.
 *
 * @param cfg
 *      The configuration to save.
 * @returns
 *      A promise.
 */
function save(cfg)
{
	if (LocalStorage === null)
	{
		return Promise.reject();
	}
	else
	{
		const item = {};
		item[KEY] = cfg;

		return LocalStorage.set(item);
	}
}

module.exports = exports =
{
	KEY: KEY,

	load: load,
	save: save
};
