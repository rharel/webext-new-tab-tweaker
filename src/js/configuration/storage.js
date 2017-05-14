/**
 * The key to the configuration object in local storage.
 */
const KEY = "configuration@new-tab-tweaker";
/**
 * Cross-browser storage API.
 */
const LocalStorage = browser.storage.local;

/**
 * Loads the configuration from local storage asynchronously.
 *
 * @returns
 *      A promise which yields a configuration object when fulfilled.
 */
function load()
{
	const DEFAULT_CONFIGURATION = NTT.Configuration.DEFAULT;

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
	const item = {};
	item[KEY] = cfg;

	return LocalStorage.set(item);
}

// Populate the Configuration.Storage namespace.
window.NTT.Configuration.Storage =
{
	KEY: KEY,

	load: load,
	save: save
};

// Perform configuration layout updates once (if necessary).
load().then(cfg =>
{
	const Ordering = NTT.Ordering;
	const Version = NTT.Configuration.Version;

	if (Version.compare(cfg.version, Version.CURRENT) ===
		Ordering.Less)
	{
		cfg = NTT.Configuration.update(cfg);
		save(cfg);
	}
});
