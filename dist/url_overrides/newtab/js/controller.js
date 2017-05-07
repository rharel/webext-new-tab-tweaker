;(function()
{
	/**
	 * This will contain DOM elements proceeding a call to initialize().
	 */
	const DOM =
	{
		bg_color: null,
		wallpaper: null
	};

	/**
	 * Fades-in the specified panel over the specified duration.
	 *
	 * @param element
	 * 		The element to animate.
	 * @param duration
	 * 		Duration (in seconds) of the animation.
	 */
	function fade_in(element, duration)
	{
		if (duration > 0)
		{
			element.style.transition = `opacity ${duration}s ease`;
		}
		element.style.visibility = "visible";
		element.style.opacity = 1;
	}

	/**
	 * Applies the specified configuration to the page.
	 *
	 * @param cfg
	 * 		The configuration to apply.
	 */
	function apply_configuration(cfg)
	{
		const TabBehavior = NTT.Configuration.Layout.TabBehavior;
		const ImageURL = NTT.Configuration.Layout.ImageURL;

		if (cfg.new_tab.behavior === TabBehavior.Redirect &&
		    cfg.new_tab.redirect.url !== window.location)
		{
			let url = cfg.new_tab.redirect.url;

			if (!url.startsWith("http://") &&
			    !url.startsWith("https://"))
			{
				url = `https://${url}`
			}

			console.log(`[new-tab-tweaker]: Redirecting to: ${url}`);
			window.location.assign(url);
		}
		else if (cfg.new_tab.behavior === TabBehavior.DisplayCustomPage)
		{
			const bg = cfg.new_tab.custom_page.background;
			const wp = cfg.new_tab.custom_page.wallpaper;

			DOM.bg_color.style.backgroundColor = bg.color;
			fade_in(DOM.bg_color, bg.animation_duration);

			if (wp.source === ImageURL.Direct)
			{
				DOM.wallpaper.style.backgroundImage = `url('${wp.url}')`;
				fade_in(DOM.wallpaper, wp.animation_duration);
			}
		}
	}

	/**
	 * Initializes the page.
	 */
	function initialize()
	{
		DOM.bg_color = document.getElementById('bg-color');
		DOM.wallpaper = document.getElementById('wallpaper');

		NTT.Configuration.Storage
			.load()
			.then(apply_configuration);
	}

	document.addEventListener('DOMContentLoaded', initialize);
})();
