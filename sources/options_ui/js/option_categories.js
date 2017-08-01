{
	// This will contain DOM elements proceeding a call to initialize().
	const DOM =
	{
		new_tab:
		{
			radio: null,
			panel: null
		},
		notification:
		{
			radio: null,
			panel: null
		},
		advanced:
		{
			radio: null,
			panel: null
		},

		radio_buttons: [],
		panel_of:      {}
	};

	// Displays the panel which corresponds to the selected radio button.
	function update()
	{
		DOM.radio_buttons.forEach(item =>
		{
			const panel = DOM.panel_of[item.id];

			if (item.checked) { panel.style.display = "block"; }
			else              { panel.style.display = "none";  }
		});
	}

	function initialize()
	{
		DOM.new_tab.radio = document.getElementById('new-tab-option-category-button');
		DOM.new_tab.panel = document.getElementById('new-tab-options');

		DOM.notification.radio = document.getElementById('notification-option-category-button');
		DOM.notification.panel = document.getElementById('notification-options');

		DOM.advanced.radio = document.getElementById('advanced-option-category-button');
		DOM.advanced.panel = document.getElementById('advanced-options');

		DOM.panel_of = {};
		DOM.panel_of[DOM.new_tab.radio.id]      = DOM.new_tab.panel;
		DOM.panel_of[DOM.notification.radio.id] = DOM.notification.panel;
		DOM.panel_of[DOM.advanced.radio.id]     = DOM.advanced.panel;

		DOM.radio_buttons =
		[
			DOM.new_tab.radio,
			DOM.notification.radio,
			DOM.advanced.radio
		];
		DOM.radio_buttons.forEach(item =>
		{
			item.addEventListener('click', update);
		});
		update();
	}
	document.addEventListener('DOMContentLoaded', initialize);
}
