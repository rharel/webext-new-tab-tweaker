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
	 * Fades-in the background color over the specified duration.
	 *
	 * @param color
	 * 		The target color to fade to.
	 * @param duration
	 *		Duration (in seconds) of the animation.
	 */
	function fade_in_background(color, duration)
	{
		if (duration > 0)
		{
			DOM.bg_color.style.transition = `background-color ${duration}s ease`;
		}
		DOM.bg_color.style.backgroundColor = color;
	}
	/**
	 * Fades-in the wallpaper image over the specified duration.
	 *
	 * @param image_url
	 * 		Direct URL to the wallpaper image.
	 * @param duration
	 * 		Duration (in seconds) of the animation.
	 */
	function fade_in_wallpaper(image_url, duration)
	{
		if (duration > 0)
		{
			DOM.wallpaper.style.transition = `opacity ${duration}s ease`;
		}
		DOM.wallpaper.style.visibility = "visible";
		DOM.wallpaper.style.backgroundImage = `url('${image_url}')`;
		DOM.wallpaper.style.opacity = 1;
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
			fade_in_background(bg.color, bg.animation_duration);

			const wp = cfg.new_tab.custom_page.wallpaper;
			if (wp.source === ImageURL.Direct)
			{
				fade_in_wallpaper(wp.url, wp.animation_duration);
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
