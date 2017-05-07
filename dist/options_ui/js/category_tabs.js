(function()
{
	/**
	 * This will contain DOM elements proceeding a call to initialize().
	 */
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
		}
	};

	/**
	 * Displays the panel which corresponds to the selected radio button.
	 */
	function update()
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
	 * Initializes element variables.
	 */
	function initialize()
	{
		DOM.new_tab.radio = document.getElementById('category-tab');
		DOM.new_tab.panel = document.getElementById('tab-category-options');

		DOM.notification.radio =
			document.getElementById('category-notification');
		DOM.notification.panel =
			document.getElementById('notification-category-options');

		DOM.advanced.radio = document.getElementById('category-advanced');
		DOM.advanced.panel = document.getElementById('advanced-category-options');

		DOM.radio_buttons =
		[
			DOM.new_tab.radio,
			DOM.notification.radio,
			DOM.advanced.radio
		];
		DOM.panel_of = {};
		DOM.panel_of[DOM.new_tab.radio.id] = DOM.new_tab.panel;
		DOM.panel_of[DOM.notification.radio.id] = DOM.notification.panel;
		DOM.panel_of[DOM.advanced.radio.id] = DOM.advanced.panel;

		DOM.radio_buttons
			.forEach(item => item.addEventListener('click', update));

		update();
	}

	document.addEventListener('DOMContentLoaded', initialize);
})();
