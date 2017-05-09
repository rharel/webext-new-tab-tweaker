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
