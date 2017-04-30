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
	background_image_source: ImageSource.Direct,
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
