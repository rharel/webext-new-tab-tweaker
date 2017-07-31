{
	// This will contain DOM elements proceeding a call to initialize().
	const DOM =
	{
		urls: null,
	};

	// Gets the url-list content.
	function get_urls()
	{
		const seen = {};
		return DOM.urls.value.split("\n")
			.map   (url => url.trim())
			.filter(url =>
			{
				if (url.length === 0 || seen.hasOwnProperty(url)) { return false;            }
				else                                              { return seen[url] = true; }
			});
	}
	// Sets the url-list content.
	function set_urls(items)
	{
		DOM.urls.value = items.join("\n");
	}

	function initialize()
	{
		DOM.urls = document.getElementById('wallpaper-urls');
		DOM.urls.addEventListener('change', () =>
		{
			NTT.OptionsUI.NewTab.Wallpaper.on_change();
		});
		NTT.OptionsUI.NewTab.Wallpaper =
		{
			get_urls: get_urls,
			set_urls: set_urls,

			on_change: () => {}
		};
	}
	document.addEventListener('DOMContentLoaded', initialize);
}
