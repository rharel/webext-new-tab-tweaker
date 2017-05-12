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
				is_enabled: false,
				urls: [],
				animation_duration: 1.5
			}
		}
	}
};

window.NTT.Configuration.DEFAULT = DEFAULT;
window.NTT.Configuration.TabBehavior = TabBehavior;
