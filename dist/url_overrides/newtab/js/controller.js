;(function()
{
	/**
	 * This will contain DOM elements proceeding a call to initialize().
	 */
	const DOM =
	{
		background: null,
		wallpaper: null,

		customize_page_button: null
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
			DOM.background.style.transition =
				`background-color ${duration}s ease`;

			// Allow the DOM some time to update before initiating animation,
			// otherwise it may be skipped.
			setTimeout(() =>
			{
				DOM.background.style.backgroundColor = color;
			}, 50);
		}
		else
		{
			DOM.background.style.backgroundColor = color;
		}
	}

	/**
	 * Loads the specified image and invokes a callback when done.
	 *
	 * @param url
	 * 		The image URL to load.
 	 * @param on_load
	 * 		The callback to invoke once the image is loaded.
	 * 	    It is given the Image object as a parameter.
	 */
	function load_wallpaper(url, on_load)
	{
		DOM.wallpaper.addEventListener('load', () =>
		{
			if (DOM.wallpaper.src === url)
			{
				on_load(DOM.wallpaper);
			}
		});
		DOM.wallpaper.src = url;
	}
	/**
	 * Fades-in the wallpaper image over the specified duration.
	 *
	 * @param duration
	 * 		Duration (in seconds) of the animation.
	 */
	function fade_in_wallpaper(duration)
	{
		if (duration > 0)
		{
			DOM.wallpaper.style.transition = `opacity ${duration}s ease`;

			// Allow the DOM some time to update before initiating animation,
			// otherwise it may be skipped.
			setTimeout(() =>
			{
				DOM.wallpaper.style.opacity = 1;
			}, 50);
		}
		else
		{
			DOM.wallpaper.style.opacity = 1;
		}
	}

	/**
	 * Applies the specified configuration to the page.
	 *
	 * @param cfg
	 * 		The configuration to apply.
	 */
	function apply_configuration(cfg)
	{
		const TabBehavior = NTT.Configuration.TabBehavior;
		const ImageURL = NTT.Configuration.ImageURL;

		if (cfg.new_tab.behavior === TabBehavior.Redirect &&
		    cfg.new_tab.redirect.url !== window.location)
		{
			let url = cfg.new_tab.redirect.url;

			if (!url.startsWith("http://") &&
			    !url.startsWith("https://"))
			{
				url = `https://${url}`
			}

			window.location.assign(url);
		}
		else if (cfg.new_tab.behavior === TabBehavior.DisplayCustomPage)
		{
			const bg = cfg.new_tab.custom_page.background;
			fade_in_background(bg.color, bg.animation_duration);

			const wp = cfg.new_tab.custom_page.wallpaper;
			if (wp.source !== ImageURL.None)
			{
				DOM.wallpaper = new Image();
				DOM.wallpaper.id = "wallpaper";
				DOM.wallpaper.src = "/icons/main_128.png";
				DOM.background.appendChild(DOM.wallpaper);
			}
			if (wp.source === ImageURL.Direct)
			{
				load_wallpaper
				(
					wp.url,
					// On load:
					() => fade_in_wallpaper(wp.animation_duration)
				);
			}
		}
	}

	/**
	 * Initializes the page.
	 */
	function initialize()
	{
		DOM.background = document.getElementById('background');
		DOM.wallpaper = document.getElementById('wallpaper');

		NTT.Configuration.Storage
			.load()
			.then(apply_configuration);

		DOM.customize_page_button =
			document.getElementById('customize-button');
		DOM.customize_page_button.addEventListener('click', () =>
		{
			browser.runtime.openOptionsPage();
		});
	}

	document.addEventListener('DOMContentLoaded', initialize);
})();
