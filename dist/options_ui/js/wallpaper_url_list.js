(function()
{
	/**
	 * This will contain DOM elements proceeding a call to initialize().
	 */
	const DOM =
	{
		wallpaper_urls: null,
		add_url: null,

		open_import_dialog: null,
		import_dialog: null,
		album_url: null,
		album_info: null,
		import_urls: null
	};
	/**
	 * Contains candidate URLs to import.
	 */
	let urls_to_import = [];

	/**
	 * Adds a URL field.
	 *
	 * @param allow_removal
	 * 		Indicates whether the field should be accompanied with a 'remove'
	 * 		button. Default is true.
	 * @returns
	 * 		The created element.
	 */
	function add_url_field(allow_removal = true)
	{
		const field = document.createElement('div');

		const url_input = document.createElement('input');
		url_input.type = "url";
		url_input.pattern = "(https?:\/\/)?.+";
		url_input.maxLength = "2048";
		url_input.placeholder = "https://some.image/file.png";
		url_input.title = "Wallpaper image URL";
		url_input.addEventListener(
			'input',
			NTT.OptionsUI.NewTab.Wallpaper.on_change
		);

		field.appendChild(url_input);

		if (allow_removal)
		{
			const remove_button = document.createElement('a');
			remove_button.className = "link-button";
			remove_button.textContent = "X";
			remove_button.title = "Remove this URL";
			remove_button.addEventListener('click', () =>
			{
				remove_url_field(field);
			});

			field.appendChild(remove_button);
		}

		DOM.wallpaper_urls.appendChild(field);
		url_input.focus();

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

		const url_input = field.firstChild;
		if (url_input.value.trim().length > 0)
		{
			NTT.OptionsUI.NewTab.Wallpaper.on_change();
		}
	}

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
	 * Gets the current values of all url fields.
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
			add_url_field(true, false);
		}
		items.forEach((item, index) =>
		{
			const field = DOM.wallpaper_urls.childNodes[index];
			const url_input = field.firstChild;

			url_input.value = item;
		});
	}

	/**
	 * Called when the album to import has changed.
	 */
	function on_import_album_selection()
	{
		const Imgur = NTT.Imgur;
		const url = DOM.album_url.value;

		if (!Imgur.is_valid_album_url(url))
		{
			DOM.import_urls.style.visibility = "hidden";
			DOM.album_info.textContent =
				"The URL specified does not seem to point to a valid album.";

			return;
		}

		DOM.album_info.textContent = "Loading album info...";
		Imgur.get_album_image_urls(
			// Album URL
			url,
			// On success
			urls =>
		{
			urls_to_import = urls;

			DOM.album_info.textContent =
				`Detected ${urls.length} images.`;
			DOM.import_urls.style.visibility = "visible";
		},
			// On error
			() =>
		{
			DOM.import_urls.style.visibility = "hidden";
			DOM.album_info.textContent =
				"Could not retrieve images. Make sure the album is not hidden.";
		});
	}
	/**
	 * Called when the user confirms he/she wants to import the selected album.
	 */
	function on_import_album_confirmation()
	{
		const current_urls = get_urls();
		const new_urls =
			urls_to_import.filter(item => !current_urls.includes(item));

		set_urls(current_urls.concat(new_urls));

		NTT.OptionsUI.Dialog.close();
		NTT.OptionsUI.NewTab.Wallpaper.on_change();
	}

	/**
	 * Initializes element variables and event handling.
	 */
	function initialize()
	{
		DOM.wallpaper_urls =
			document.getElementById('wallpaper-urls');
		DOM.add_url =
			document.getElementById('add-wallpaper-url-button');

		DOM.open_import_dialog =
			document.getElementById('open-wallpaper-url-import-dialog-button');
		DOM.import_dialog =
			document.getElementById('wallpaper-url-import-dialog');
		DOM.album_url =
			document.getElementById('imgur-album-url');
		DOM.album_info =
			document.getElementById('imgur-album-info');
		DOM.import_urls =
			document.getElementById('import-wallpaper-urls-button');

		DOM.add_url.addEventListener('click', add_url_field);

		DOM.album_url.addEventListener('input', on_import_album_selection);
		DOM.import_urls.addEventListener('click', on_import_album_confirmation);
		DOM.open_import_dialog.addEventListener('click', () =>
		{
			urls_to_import = [];
			DOM.album_url.value = "";
			DOM.album_info.textContent = "";
			DOM.import_urls.style.visibility = "hidden";
			NTT.OptionsUI.Dialog.open(DOM.import_dialog);
		});

		window.NTT.OptionsUI.NewTab.Wallpaper =
		{
			get_urls: get_urls,
			set_urls: set_urls,

			on_change: () => {}
		};

		add_url_field(false);
	}

	document.addEventListener('DOMContentLoaded', initialize);
})();
