(function() {
"use strict";

/**
 * This will contain DOM elements proceeding a call to initialize().
 */
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
	}
};

/**
 * Displays the panel which corresponds to the selected radio button.
 */
function update_active_panel()
{
	DOM.radio_buttons.forEach(item =>
	{
		const panel = DOM.panel_of[item.id];

		if (item.checked)
		{
			panel.style.display = "block";
		}
		else
		{
			panel.style.display = "none";
		}
	});
}

/**
 * Gets the selected tab behavior.
 */
function get_selected_behavior()
{
	const TabBehavior = NTT.Configuration.TabBehavior;

	if (DOM.redirection.radio.checked)
	{
		return TabBehavior.Redirect;
	}
	else
	{
		return TabBehavior.DisplayCustomPage;
	}
}
/**
 * Sets the selected tab behavior.
 *
 * @param value
 * 		The value to assign.
 */
function set_selected_behavior(value)
{
	const TabBehavior = NTT.Configuration.TabBehavior;

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
	update_active_panel();
}

/**
 * Initializes element variables and event handling.
 */
function initialize()
{
	DOM.redirection.radio =
		document.getElementById('redirect-button');
	DOM.redirection.panel =
		document.getElementById('redirection-options');

	DOM.custom_page.radio =
		document.getElementById('display-custom-page-button');
	DOM.custom_page.panel =
		document.getElementById('custom-page-options');

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
		item.addEventListener('click', update_active_panel);
	});

	window.NTT.OptionsUI.NewTab.Behavior =
	{
		get_selected: get_selected_behavior,
		set_selected: set_selected_behavior,
	};

	update_active_panel();
}

document.addEventListener('DOMContentLoaded', initialize);
})();
