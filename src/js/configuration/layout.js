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
