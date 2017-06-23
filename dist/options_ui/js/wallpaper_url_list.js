(function() {
"use strict";

/**
 * This will contain DOM elements proceeding a call to initialize().
 */
const DOM =
{
	wallpaper_urls: null,

	open_import_dialog: null,
	import_dialog: null,
	album_url: null,
	album_info: null,
	import_urls: null,
};
/**
 * Contains candidate URLs to import.
 */
let urls_to_import = [];

/**
 * Gets the current url list.
 *
 * @returns
 * 		An array of strings.
 */
function get_urls()
{
	return DOM.wallpaper_urls.value.split('\n').map(x => x.trim());
}
/**
 * Sets the current url list.
 *
 * @param items
 * 		An array of strings.
 */
function set_urls(items)
{
	DOM.wallpaper_urls.value = items.join('\n');
}

/**
 * Called when the album to import has changed.
 */
function on_import_album_selection()
{
	const Imgur = NTT.OptionsUI.Imgur;
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
	DOM.wallpaper_urls.addEventListener('change', () =>
	{
		NTT.OptionsUI.NewTab.Wallpaper.on_change();
	});

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
}

document.addEventListener('DOMContentLoaded', initialize);
})();
