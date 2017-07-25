{
	// This will contain DOM elements proceeding a call to initialize().
	const DOM =
	{
		background: null,
		wallpaper: null,

		customize_page_button: null
	};
	// The storage key associated with the URL of the last picked wallpaper.
	//
	// It is used to avoid displaying the same wallpaper consecutively, when the wallpaper URL list
	// contains more than one item.
	const PREVIOUS_WALLPAPER_INDEX = "previous-wallpaper-index@new-tab-tweaker";

	// Fades-in the background color over the specified duration (in seconds).
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

	// Loads the specified image and invokes a callback when done.
	// The callback receives the loaded image as its parameter.
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
	// Fades-in the wallpaper image over the specified duration (in seconds).
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

	// Applies the specified configuration to the page.
	function apply_configuration(cfg)
	{
		const TabBehavior = NTT.Configuration.TabBehavior;

		if (cfg.new_tab.behavior === TabBehavior.Redirect &&
			cfg.new_tab.redirect.url !== window.location)
		{
			let url = cfg.new_tab.redirect.url;

			if (!url.startsWith("http://") &&
				!url.startsWith("https://"))
			{
				url = `http://${url}`
			}

			window.location.replace(url);
		}
		else if (cfg.new_tab.behavior === TabBehavior.DisplayCustomPage)
		{
			const bg = cfg.new_tab.custom_page.background;
			fade_in_background(bg.color, bg.do_animate ? bg.animation_duration : 0);

			const wp = cfg.new_tab.custom_page.wallpaper;
			if (wp.is_enabled && wp.urls.length > 0)
			{
				DOM.wallpaper = new Image();
				DOM.wallpaper.id = "wallpaper";
				DOM.wallpaper.src = "/icons/main_128.png";
				DOM.background.appendChild(DOM.wallpaper);

				let index, url;
				{
					if (wp.urls.length === 1) { index = 0; }
					else
					{
						let previous_index = parseInt(localStorage.getItem(PREVIOUS_WALLPAPER_INDEX));
						if (previous_index >= wp.urls.length) { previous_index = 0; }

						index = NTT.RNG.integer_in_range(0, wp.urls.length - 1);
						if (index === previous_index)
						{
							index = (index + 1) % wp.urls.length;
						}
					}
					url = wp.urls[index];
				}
				load_wallpaper(
					url,
					() => fade_in_wallpaper(wp.do_animate ? wp.animation_duration : 0)
				);
				localStorage.setItem(PREVIOUS_WALLPAPER_INDEX, index);
			}
		}
	}
	function initialize()
	{
		DOM.background = document.getElementById('background');
		DOM.wallpaper  = document.getElementById('wallpaper');

		NTT.Configuration.Storage
			.load()
			.then(apply_configuration);

		DOM.customize_page_button = document.getElementById('customize-button');
		DOM.customize_page_button.addEventListener('click', () =>
		{
			browser.runtime.openOptionsPage();
		});
	}
	document.addEventListener('DOMContentLoaded', initialize);
}
