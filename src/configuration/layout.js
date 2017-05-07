const Version = require('./version');

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
	version: Version.CURRENT,

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
				animation_duration: 2
			},
			wallpaper:
			{
				source: ImageURL.None,
				url: "",
				animation_duration: 3
			}
		}
	}
};

module.exports = exports =
{
	TabBehavior: TabBehavior,
	ImageURL: ImageURL,

	DEFAULT: DEFAULT
};
