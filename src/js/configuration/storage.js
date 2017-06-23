/**
 * The key to the configuration object in local storage.
 */
const KEY = "configuration@new-tab-tweaker";
/**
 * A reference to local storage.
 */
const LocalStorage = browser.storage.local;

/**
 * Loads the configuration from local storage asynchronously.
 *
 * @returns
 *      A promise which yields a configuration object when fulfilled.
 *
 * @note
 * 		If no configuration object is detected, returns one with default values.
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
	const Version  = NTT.Configuration.Version;

	if (Version.compare(cfg.version, Version.CURRENT) ===
		Ordering.Less)
	{
		save(NTT.Configuration.update(cfg));
	}
});
