/**
 * Migrates a configuration from version 0.0.0-1.1.3 to 1.2.0
 *
 * @param previous
 * 		The previous version(s) configuration object, version 0.0.0-1.1.3.
 * @returns
 * 		An up-to-date configuration object based on the previous one.
 */
function migrate_to_1_2_0(previous)
{
	const cfg = JSON.parse(JSON.stringify(previous));
	const wallpaper = cfg.new_tab.custom_page.wallpaper;

	// Convert:
	// 		previous: wallpaper.source: {"none" | "direct"}
	// 		current: wallpaper.is_enabled: boolean
	wallpaper.is_enabled = wallpaper.source !== "none";
	delete wallpaper.source;

	// Convert:
	// 		previous: wallpaper.url: String
	//		current: wallpaper.urls: String[]
	wallpaper.urls = [wallpaper.url];
	delete wallpaper.url;

	// update version descriptor
	cfg.version = NTT.Configuration.Version.create(1, 2, 0);

	return cfg;
}

/**
 * Updates the configuration object's layout to the one specified in the
 * current version.
 *
 * @param cfg
 *		The previous version(s) configuration object.
 * @returns
 * 		An up-to-date configuration object based on the previous one.
 * @note
 * 		If the previous object is compatible with the current version,
 * 	    a copy of it is returned instead.
 */
function update(cfg)
{
	const Ordering = NTT.Ordering;
	const Version = NTT.Configuration.Version;

	if (Version.compare(cfg.version, Version.create(1, 2, 0)) ===
		Ordering.Less)
	{
		cfg = migrate_to_1_2_0(cfg);
	}

	return cfg;
}

window.NTT.Configuration.update = update;
