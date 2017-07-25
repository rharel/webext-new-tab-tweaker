{
	const Theme = NTT.Configuration.Theme;

	const stylesheets = {};
	stylesheets[Theme.Light] = "css/theme_light.css";
	stylesheets[Theme.Dark]  = "css/theme_dark.css";

	// This will contain DOM elements proceeding a call to initialize().
	const DOM =
	{
		theme: null,
		light: null,
		dark: null
	};

	// Applies the theme which corresponds to the selected radio button.
	function update_theme()
	{
		if (DOM.light.checked) { DOM.theme.href = stylesheets[Theme.Light]; }
		else                   { DOM.theme.href = stylesheets[Theme.Dark];  }
	}

	// Gets the selected theme.
	function get_selected_theme()
	{
		if (DOM.light.checked) { return Theme.Light; }
		else                   { return Theme.Dark;  }
	}
	// Sets the selected theme.
	function set_selected_theme(value)
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
		update_theme();
	}

	function initialize()
	{
		DOM.theme = document.getElementById('theme');
		DOM.light = document.getElementById('light-theme-button');
		DOM.dark  = document.getElementById('dark-theme-button');

		[DOM.light, DOM.dark].forEach(item =>
		{
			item.addEventListener('click', update_theme);
		});

		NTT.OptionsUI.Theme =
		{
			get_selected: get_selected_theme,
			set_selected: set_selected_theme,
		};

		update_theme();
	}
	document.addEventListener('DOMContentLoaded', initialize);
}
