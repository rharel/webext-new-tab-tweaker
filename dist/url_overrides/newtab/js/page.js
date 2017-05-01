;(function()
{
	/**
	 * Just a shorthand.
	 */
	const CNT = CustomNewTab;

	/**
	 * This will contain DOM elements proceeding a call to initialize().
	 */
	const DOM =
	{
		background_color_container: null,
		background_image_container: null
	};

	/**
	 * Reveals the specified background color.
	 *
	 * @param color
	 * 		CSS-color string.
	 * @param animation_duration
	 * 		Duration (in seconds) of the fade-in animation.
	 */
	function reveal_background_color(color, animation_duration)
	{
		if (animation_duration > 0)
		{
			DOM.background_color_container.style.transition =
				"opacity " + animation_duration + "s ease";
		}
		DOM.background_color_container.style.backgroundColor = color;
		DOM.background_color_container.style.visibility = "visible";
		DOM.background_color_container.style.opacity = 1;
	}
	/**
	 * Reveals the specified background color.
	 *
	 * @param url
	 * 		Revealed image's URL.
	 * @param animation_duration
	 * 		Duration (in seconds) of the fade-in animation.
	 */
	function reveal_background_image(url, animation_duration)
	{
		if (animation_duration > 0)
		{
			DOM.background_image_container.style.transition =
				"opacity " + animation_duration + "s ease";
		}
		DOM.background_image_container.style.backgroundImage =
			"url('" + url + "')";
		DOM.background_image_container.style.visibility = "visible";
		DOM.background_image_container.style.opacity = 1;
	}

	/**
	 * Applies the specified configuration to the page.
	 *
	 * @param cfg
	 * 		The configuration to apply.
	 */
	function apply_configuration(cfg)
	{
		const TabBehavior = CNT.Configuration.TabBehavior;
		const ImageSource = CNT.Configuration.ImageSource;

		if (cfg.tab_behavior === TabBehavior.Redirect &&
		    cfg.target_url !== window.location)
		{
			window.location.assign(cfg.target_url);
		}
		else if (cfg.tab_behavior === TabBehavior.CustomPage)
		{
			reveal_background_color(
				cfg.background_color,
				cfg.background_color_fade_in_duration
			);
			if (cfg.background_image_source === ImageSource.Direct)
			{
				reveal_background_image(
					cfg.background_image_url,
					cfg.background_image_fade_in_duration
				);
			}
		}
	}

	/**
	 * Initializes the page.
	 */
	function initialize()
	{
		[
			'background_color_container',
			'background_image_container'
		]
			.forEach(item =>
			{
				const id = item.replace(new RegExp('_', 'g'), '-');
				DOM[item] = document.getElementById(id);
			});

		CNT.Configuration.load().then(apply_configuration);
	}

	document.addEventListener('DOMContentLoaded', initialize);
})();
