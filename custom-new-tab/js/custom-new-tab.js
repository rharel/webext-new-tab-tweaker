(function()
{
	const TabType = CustomNewTab.TabType;
	const load_options = CustomNewTab.load_options_from_storage;

	/**
	 * DOM element hosting the background color.
	 */
	let background_color_container;
	/**
	 * DOM element hosting the background image.
	 */
	let background_image_container;

	/**
	 * Reveals the specified background color.
	 *
	 * @param color
	 * 		CSS-color string.
	 */
	function reveal_background_color(color)
	{
		background_color_container.style.backgroundColor = color;
		background_color_container.style.visibility = "visible";
		background_color_container.style.opacity = 1;
	}
	/**
	 * Reveals the specified background color.
	 *
	 * @param url
	 * 		Revealed image's URL.
	 */
	function reveal_background_image(url)
	{
		background_image_container.style.backgroundImage = "url('" + url + "')";
		background_image_container.style.visibility = "visible";
		background_image_container.style.opacity = 1;
	}

	/**
	 * Applies the specified option configuration to the page.
	 *
	 * @param options
	 * 		The option configuration to apply.
	 */
	function apply_options(options)
	{
		if (options.tab_type === TabType.Redirect)
		{
			window.location.assign(options.redirect_url);
		}
		else if (options.tab_type === TabType.Color)
		{
			reveal_background_color(options.color);
		}
		else if (options.tab_type === TabType.Image)
		{
			reveal_background_color("black");
			reveal_background_image(options.image_url);
		}
	}

	/**
	 * Initializes the page.
	 */
	function initialize()
	{
		background_color_container =
			document.getElementById('background-color-container');
		background_image_container =
			document.getElementById('background-image-container');

		load_options().then(apply_options);
	}

	document.addEventListener('DOMContentLoaded', initialize);
})();
