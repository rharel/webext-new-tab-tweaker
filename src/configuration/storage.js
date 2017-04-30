/**
 * The key to the configuration object in local storage.
 */
const STORAGE_KEY =
	"configuration@v" +
	CURRENT_VERSION.major + "." +
	CURRENT_VERSION.minor + "." +
	CURRENT_VERSION.patch;
/**
 * Loads the configuration from local storage asynchronously.
 *
 * @returns
 *      A promise which yields a configuration object when fulfilled.
 */
function load_configuration()
{
	return browser.storage.local
		.get(STORAGE_KEY)
		.then(item =>
		{
			if (item.hasOwnProperty(STORAGE_KEY))
			{
				return item[STORAGE_KEY];
			}
			else
			{
				return DEFAULT_CONFIGURATION;
			}
		});
}
/**
 * Saves a configuration to local storage asynchronously.
 *
 * @param cfg
 *      The configuration to save.
 * @returns
 *      A promise.
 */
function save_configuration(cfg)
{
	const item = {};
	item[STORAGE_KEY] = cfg;

	return browser.storage.local.set(item);
}
