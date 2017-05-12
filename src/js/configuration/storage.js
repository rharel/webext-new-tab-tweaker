/**
 * The key to the configuration object in local storage.
 */
const KEY = "configuration@new-tab-tweaker";
/**
 * Just a shorthand.
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
	const Ordering = NTT.Ordering;
	const Version = NTT.Configuration.Version;
	const DEFAULT_CONFIGURATION = NTT.Configuration.DEFAULT;

	return LocalStorage.get(KEY).then(item =>
	{
		if (item.hasOwnProperty(KEY))
		{
			let cfg = item[KEY];

			if (Version.compare(cfg.version, Version.CURRENT) ===
				Ordering.Less)
			{
				cfg = NTT.Configuration.update(cfg);
				save(cfg);
			}

			return cfg;
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

window.NTT.Configuration.Storage =
{
	KEY: KEY,

	load: load,
	save: save
};
