{
    const options = NTT.OptionsUI.NewTab.Wallpaper.URLs =
    {
        initialize: null,

        get: null,
        set: null,

        change_listeners: []
    };

    // This will contain DOM elements proceeding a call to initialize().
	const DOM =
	{
		urls: null
	};

	options.get = function()
	{
		const seen = {};
		return DOM.urls.value.split("\n")
			.map   (url => url.trim())
			.filter(url =>
			{
				if (url.length === 0 ||
					seen.hasOwnProperty(url))
				{
					return false;
				}
				else
                {
                    return seen[url] = true;
                }
			});
	};
	options.set = function(array, invoke_change_listeners = false)
	{
		DOM.urls.value = array.join("\n");

		if (invoke_change_listeners) { on_change(); }
	};

    // Invoked when the represented configuration changes.
    function on_change()
    {
        options.change_listeners.forEach(listener => listener());
    }

	options.initialize = function()
	{
		DOM.urls = document.getElementById('wallpaper-urls');
		DOM.urls.addEventListener('input', on_change);
	};
}
