(function()
{
	/**
	 * This will contain DOM elements proceeding a call to initialize().
	 */
	const DOM =
	{
		wallpaper_urls: null,
		add_url_button: null,
	};

	/**
	 * Gets all url input elements.
	 *
	 * @returns
	 * 		An array of elements.
	 */
	function get_url_inputs()
	{
		return document.querySelectorAll('#wallpaper-urls input');
	}

	/**
	 * Adds a URL field.
	 *
	 * @param allow_removal
	 * 		Indicates whether the field should be accompanied with a 'remove'
	 * 		button (default is true).
	 * @returns
	 * 		The created element.
	 */
	function add_url_field(allow_removal)
	{
		if (allow_removal === undefined)
		{
			allow_removal = true;
		}

		const field = document.createElement('div');

		const url_input = document.createElement('input');
		url_input.type = "url";
		url_input.pattern = "(https?:\/\/)?.+";
		url_input.maxLength = "2048";
		url_input.placeholder = "https://some.image/file.png";
		url_input.title = "Wallpaper image URL";

		field.appendChild(url_input);

		if (allow_removal)
		{
			const remove_button = document.createElement('a');
			remove_button.className = "link-button";
			remove_button.textContent = "X";
			remove_button.title = "Remove this URL";
			remove_button.addEventListener('click', () => remove_url_field(field));

			field.appendChild(remove_button);
		}

		DOM.wallpaper_urls.appendChild(field);
		url_input.focus();

		NTT.OptionsUI.NewTab.wallpaper.on_url_field_addition(field);

		return field;
	}
	/**
	 * Removes a URL field.
	 *
	 * @param field
	 * 		The element to remove.
	 */
	function remove_url_field(field)
	{
		DOM.wallpaper_urls.removeChild(field);

		NTT.OptionsUI.NewTab.wallpaper.on_url_field_removal(field);
	}

	/**
	 * Gets the current state of all url fields.
	 *
	 * @returns
	 * 		An array of strings.
	 */
	function get_urls()
	{
		return Array.prototype
			.slice.call(get_url_inputs())
			.map(item => item.value);
	}
	/**
	 * Sets the current state of all url fields.
	 *
	 * @param items
	 * 		An array of strings.
	 */
	function set_urls(items)
	{
		while (DOM.wallpaper_urls.childNodes.length < items.length)
		{
			add_url_field();
		}
		items.forEach((item, index) =>
		{
			const field = DOM.wallpaper_urls.childNodes[index];
			const url_input = field.firstChild;

			url_input.value = item;
		});
	}

	function initialize()
	{
		DOM.wallpaper_urls =
			document.getElementById('wallpaper-urls');
		DOM.add_url_button =
			document.getElementById('add-wallpaper-url-button');

		DOM.add_url_button.addEventListener('click', add_url_field);

		window.NTT.OptionsUI.NewTab.wallpaper =
		{
			get_urls: get_urls,
			set_urls: set_urls,

			on_url_field_addition: () => {},
			on_url_field_removal: () => {}
		};

		add_url_field(false);
	}

	document.addEventListener('DOMContentLoaded', initialize);
})();
