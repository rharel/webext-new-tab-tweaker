(function() {
"use strict";

// Create the Configuration namespace.
window.NTT.Configuration = {};
}());

(function() {
"use strict";

/**
 * The configuration object's layout version.
 */
const CURRENT = create(1, 4, 0);
/**
 * Creates a new version object.
 *
 * @param major
 * 		The major change-set version number.
 * @param minor
 * 		The minor change-set version number.
 * @param patch
 * 		The patch version number.
 */
function create(major, minor, patch)
{
	return {
		major: major,
		minor: minor,
		patch: patch
	};
}
/**
 * Determines whether the specified object represents a valid version
 * object.
 *
 * @param obj
 *        The object to test.
 * @returns
 *        True iff the object is a valid version object.
 */
function is_valid(obj)
{
	/**
	 * Determines whether the specified object is a (non-strict) positive
	 * integer.
	 *
	 * @param obj
	 *        The object to test.
	 * @returns
	 *        True iff the object is a (non-strict) positive integer.
	 */
	function is_positive_integer(obj)
	{
		return Number.isInteger(obj) && obj >= 0;
	}
	return (
		is_positive_integer(obj.major) &&
		is_positive_integer(obj.minor) &&
		is_positive_integer(obj.patch)
	);
}
/**
 * Determines whether one version is greater, lesser, or equal than/to
 * another.
 *
 * @param first
 * 		The first version object.
 * @param second
 * 		The second version object.
 * @returns
 * 		An ordering descriptor with relation to 'first' and 'second'.
 */
function compare(first, second)
{
	const Ordering = NTT.Ordering;
	const
		parts_of_first = [first.major, first.minor, first.patch],
		parts_of_second = [second.major, second.minor, second.patch];

	for (let i = 0; i < 3; ++i)
	{
		const
			first_part = parts_of_first[i],
			second_part = parts_of_second[i];

		if (first_part > second_part)
		{
			return Ordering.Greater;
		}
		else if (first_part < second_part)
		{
			return Ordering.Less;
		}
	}
	return Ordering.Equal;
}
/**
 * Represent the specified version as a string.
 *
 * @param version
 * 		The version object to represent.
 * @returns
 *		A human-readable string representing the specified version.
 */
function as_string(version)
{
	return `${version.major}.${version.minor}.${version.patch}`;
}

// Populate the Configuration.Version namespace.
window.NTT.Configuration.Version =
{
	CURRENT: CURRENT,

	create: create,
	is_valid: is_valid,
	compare: compare,
	as_string: as_string
};
}());

(function() {
"use strict";

/**
 * Enumerates possible tab behaviors.
 */
const TabBehavior =
{
	/**
	 * The tab redirects the browser to a specified URL.
	 */
	Redirect: "redirect",
	/**
	 * The tab displays a customized page.
	 */
	DisplayCustomPage: "display-custom-page"
};
window.NTT.Configuration.TabBehavior = TabBehavior;

/**
 * The default configuration layout.
 */
window.NTT.Configuration.DEFAULT =
{
	version: NTT.Configuration.Version.CURRENT,

	notification:
	{
		new_features: true
	},
	new_tab:
	{
		behavior: TabBehavior.DisplayCustomPage,

		redirect:
		{
			url: ""
		},
		custom_page:
		{
			background:
			{
				color: "#2d2d2d",
				animation_duration: 0.5
			},
			wallpaper:
			{
				is_enabled: false,
				urls: [],
				animation_duration: 0
			}
		}
	}
};
}());

(function() {
"use strict";

/**
 * Migrates a configuration from version 0.0.0-1.1.3 to 1.2.0
 *
 * @param previous
 * 		The previous version's configuration object, version 0.0.0-1.1.3.
 * @returns
 * 		The previous configuration represented for version 1.2.0.
 */
function migrate_to_1_2_0(previous)
{
	const cfg = JSON.parse(JSON.stringify(previous));  // Make a copy.
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
 *		The previous version's configuration object.
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
}());

(function() {
"use strict";

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
}());
