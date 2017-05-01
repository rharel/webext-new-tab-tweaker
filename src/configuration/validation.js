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
