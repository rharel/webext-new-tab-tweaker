(function() {
"use strict";

/**
 * The configuration object's layout version.
 */
const CURRENT =
{
	major: 1,
	minor: 1,
	patch: 1
};
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

window.NTT.Configuration.Version =
{
	CURRENT: CURRENT,

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
/**
 * Enumerates possible image sources.
 */
const ImageURL =
{
	/**
	 * There is no image.
	 */
	None: "none",
	/**
	 * The URL points directly to the image file.
	 */
	Direct: "direct"
};

/**
 * The default configuration layout.
 */
const DEFAULT =
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
				color: "#ffffff",
				animation_duration: 0.5
			},
			wallpaper:
			{
				source: ImageURL.None,
				url: "",
				animation_duration: 1.5
			}
		}
	}
};

window.NTT.Configuration.DEFAULT = DEFAULT;
window.NTT.Configuration.TabBehavior = TabBehavior;
window.NTT.Configuration.ImageURL = ImageURL;
}());

(function() {
"use strict";

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
	const DEFAULT_CONFIGURATION = NTT.Configuration.DEFAULT;

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

window.NTT.Configuration.Storage =
{
	KEY: KEY,

	load: load,
	save: save
};
}());
