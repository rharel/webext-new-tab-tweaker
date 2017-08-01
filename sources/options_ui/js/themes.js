{
	const Theme = NTT.Configuration.Theme;

    const options = NTT.OptionsUI.Theme =
    {
        initialize: null,

        get: null,
        set: null,

        change_listeners: []
    };

	// This will contain DOM elements proceeding a call to initialize().
	const DOM =
	{
		theme: null,
		light: null,
		dark:  null
	};

	options.get = function()
	{
		if (DOM.light.checked) { return Theme.Light; }
		else                   { return Theme.Dark;  }
	};
	options.set = function(value)
	{
		if (value === Theme.Light)
		{
			DOM.dark.checked  = false;
			DOM.light.checked = true;
		}
		else if (value === Theme.Dark)
		{
			DOM.light.checked = false;
			DOM.dark.checked  = true;
		}
		update();
	};

    // Applies the theme which corresponds to the selected radio button.
    function update()
    {
        DOM.theme.href = `css/themes/${options.get()}.css`;
    }

    // Invoked when the represented configuration changes.
    function on_change()
    {
        options.change_listeners.forEach(listener => listener());
    }

    options.initialize = function()
	{
		DOM.theme = document.getElementById('theme');
		DOM.light = document.getElementById('light-theme-button');
		DOM.dark  = document.getElementById('dark-theme-button');

		[DOM.light, DOM.dark].forEach(item =>
		{
			item.addEventListener('change', () => { update(); on_change(); });
		});
	};
}
