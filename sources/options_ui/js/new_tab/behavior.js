{
	const TabBehavior = NTT.Configuration.TabBehavior;

    const options = NTT.OptionsUI.NewTab.Behavior =
	{
	    initialize: null,

		get: null,
		set: null,

		change_listeners: []
	};

	// This will contain DOM elements proceeding a call to initialize().
	const DOM =
	{
		redirection:
		{
			radio: null,
			panel: null
		},
		custom_page:
		{
			radio: null,
			panel: null
		},

		radio_buttons: [],
		panel_of:      {}
	};

	options.get = function()
	{
		if (DOM.redirection.radio.checked) { return TabBehavior.Redirect;          }
		else                               { return TabBehavior.DisplayCustomPage; }
	};
	options.set = function(value)
	{
		if (value === TabBehavior.Redirect)
		{
			DOM.custom_page.radio.checked = false;
			DOM.redirection.radio.checked = true;
		}
		else if (value === TabBehavior.DisplayCustomPage)
		{
			DOM.redirection.radio.checked = false;
			DOM.custom_page.radio.checked = true;
		}
		update();
	};

    // Updates the display of panels corresponding to the selected radio button.
    function update()
    {
        DOM.radio_buttons.forEach(item =>
        {
            const panel = DOM.panel_of[item.id];

            if (item.checked) { panel.style.display = "block"; }
            else              { panel.style.display = "none";  }
        });
    }

    // Invoked when the represented configuration changes.
    function on_change()
    {
        options.change_listeners.forEach(listener => listener());
    }

	options.initialize = function()
	{
		DOM.redirection.radio = document.getElementById('redirect-button');
		DOM.redirection.panel = document.getElementById('redirection-options');

		DOM.custom_page.radio = document.getElementById('display-custom-page-button');
		DOM.custom_page.panel = document.getElementById('custom-page-options');

		DOM.panel_of = {};
		DOM.panel_of[DOM.redirection.radio.id] = DOM.redirection.panel;
		DOM.panel_of[DOM.custom_page.radio.id] = DOM.custom_page.panel;

		DOM.radio_buttons =
		[
			DOM.redirection.radio,
			DOM.custom_page.radio
		];
		DOM.radio_buttons.forEach(item =>
		{
            item.addEventListener('change', () => { update(); on_change(); });
		});
	};
}
