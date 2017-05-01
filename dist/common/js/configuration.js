;(function() {
"use strict";

/**
 * The configuration object's layout version.
 */
const CURRENT_VERSION =
{
	major: 1,
	minor: 0,
	patch: 0
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
function is_valid_version_object(obj)
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
 * 		A positive integer if first > second,
 *      a negative integer if first < second,
 *      and zero if first == second.
 */
function compare_versions(first, second)
{
	const
		GREATER = 1,
		LESSER = -1,
		EQUAL = 0;

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
			return GREATER;
		}
		else if (first_part < second_part)
		{
			return LESSER;
		}
	}
	return EQUAL;
}

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
	CustomPage: "custom-page"
};
/**
 * Enumerates possible image sources.
 */
const ImageSource =
{
	/**
	 * There is no image.
	 */
	None: "none",
	/**
	 * The image is retrieved from a direct URL to the image file.
	 */
	Direct: "direct",
	/**
	 * The image is a random pick from an Imgur public album.
	 */
	ImgurAlbum: "imgur-album"
};

/**
 * The default configuration for the "redirect" tab behavior.
 */
const DEFAULT_REDIRECTION_CONFIGURATION =
{
	/**
	 * The configuration object's layout version.
	 */
	version: CURRENT_VERSION,
	/**
	 * The selected tab behavior.
	 */
	tab_behavior: TabBehavior.Redirect,
	/**
	 * The target URL to redirect to.
	 */
	target_url: ""
};
/**
 * The default configuration for the "custom page" tab behavior.
 */
const DEFAULT_CUSTOM_PAGE_CONFIGURATION =
{
	/**
	 * The configuration object's layout version.
	 */
	version: CURRENT_VERSION,
	/**
	 * The selected tab behavior.
	 */
	tab_behavior: TabBehavior.CustomPage,
	/**
	 * The selected background color.
	 */
	background_color: "#ffffff",
	/**
	 * The fade-in duration (in seconds) of the background color.
	 */
	background_color_fade_in_duration: 0,
	/**
	 * The source of the background image.
	 */
	background_image_source: ImageSource.None,
	/**
	 * The selected background image URL.
	 */
	background_image_url: "",
	/**
	 * The fade-in duration (in seconds) of the background image.
	 */
	background_image_fade_in_duration: 0
};
/**
 * The default configuration.
 */
const DEFAULT_CONFIGURATION = DEFAULT_CUSTOM_PAGE_CONFIGURATION;

/**
 * Validates the specified URL.
 *
 * @param url
 * 		The URL to validate.
 * @returns
 * 		True iff the specified URL is valid.
 */
function is_valid_url(url)
{
	// Copyright (c) 2010-2013 Diego Perini, MIT licensed
	// https://gist.github.com/dperini/729294
	// see also https://mathiasbynens.be/demo/url-regex
	// modified to allow protocol-relative URLs
	return /^(?:(?:(?:https?|ftp|file):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
		.test(url);
}
/**
 * Validates the specified image URL.
 *
 * @param url
 * 		The URL to validate.
 * @returns
 * 		True iff the specified URL is valid.
 */
function is_valid_image_url(url)
{
	return /^((https?|file):\/\/[^\[]*\.(?:gif|jpg|jpeg|png|svg))$/i
		.test(url);
}
/**
 * Validates the specified Imgur album URL.
 *
 * @param url
 * 		The URL to validate.
 * @returns
 * 		True iff the specified URL is valid one for an Imgur album.
 */
function is_valid_imgur_album_url(url)
{
	return /^((https?):\/\/imgur\.com\/a\/(?:[0-9a-zA-Z])+)$/i
		.test(url);
}
/**
 * Validates the specified string as an hexadecimal color.
 *
 * @param string
 * 		The string to validate.
 * @returns
 * 		True iff the specified string is a valid hexadecimal color.
 */
function is_valid_hex_color(string)
{
	return /^#(?:[0-9a-f]{6})$/
		.test(string);
}

/**
 * Validates the specified configuration.
 *
 * @param cfg
 * 		The configuration to validate.
 * @returns
 * 		True iff the specified configuration is valid.
 */
function validate(cfg)
{
	if (cfg.tab_behavior === TabBehavior.Redirect)
	{
		return is_valid_url(cfg.target_url);
	}
	else if (cfg.tab_behavior === TabBehavior.CustomPage)
	{
		const is_valid_bg_color = is_valid_hex_color(cfg.background_color);
		const is_valid_bg_color_fade_in_duration =
			cfg.background_color_fade_in_duration >= 0 &&
			cfg.background_color_fade_in_duration <= 5;

		if (cfg.background_image_source === ImageSource.None)
		{
			return (
				is_valid_bg_color &&
				is_valid_bg_color_fade_in_duration
			);
		}
		else
		{
			const is_valid_bg_image_fade_in_duration =
				cfg.background_image_fade_in_duration >= 0 &&
				cfg.background_image_fade_in_duration <= 5;

			let is_valid_bg_image_url;
			if (cfg.background_image_source === ImageSource.Direct)
			{
				is_valid_bg_image_url =
					is_valid_image_url(cfg.background_image_url);
			}
			else if (cfg.background_image_source === ImageSource.ImgurAlbum)
			{
				is_valid_bg_image_url =
					is_valid_imgur_album_url(cfg.background_image_url);
			}

			return (
				is_valid_bg_color &&
				is_valid_bg_color_fade_in_duration &&
				is_valid_bg_image_url &&
				is_valid_bg_image_fade_in_duration
			);
		}
	}
	else
	{
		return false;
	}
}

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
function load()
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
function save(cfg)
{
	const item = {};
	item[STORAGE_KEY] = cfg;

	return browser.storage.local.set(item);
}

if (window.CustomNewTab === undefined)
{
	window.CustomNewTab = {};
}
window.CustomNewTab.Configuration =
{
	CURRENT_VERSION: CURRENT_VERSION,

	is_valid_version_object: is_valid_version_object,
	compare_versions: compare_versions,

	TabBehavior: TabBehavior,
	ImageSource: ImageSource,

	DEFAULT_REDIRECTION_CONFIGURATION: DEFAULT_REDIRECTION_CONFIGURATION,
	DEFAULT_CUSTOM_PAGE_CONFIGURATION: DEFAULT_CUSTOM_PAGE_CONFIGURATION,
	DEFAULT_CONFIGURATION: DEFAULT_CONFIGURATION,

	validate: validate,

	load: load,
	save: save
};
}());
