{
	// The messages to display upon unsuccessful operations.
	const ErrorMessage =
	{
		// Display upon an unsuccessful configuration load.
		CONFIGURATION_LOAD: "An error occurred while loading your settings.",
		// Display upon an unsuccessful configuration save.
		CONFIGURATION_SAVE: "An error occurred while saving your settings.",
	};
	// This will contain DOM elements proceeding a call to initialize().
	const DOM =
	{
		version: null,

		error:
		{
			panel: null,
			message: null
		},

		new_tab:
		{
			redirect:
			{
				url: null
			},
			custom_page:
			{
				background:
				{
					color: null,
					animation_enabled: null,
					animation_duration: null
				},
				wallpaper:
				{
					is_enabled: null,
					animation_enabled: null,
					animation_duration: null
				}
			},
		},
		notification:
		{
			new_features: null
		},
		advanced:
		{
			restore_default_options: null
		}
	};

	// Displays the specified error message to the user.
	function display_error(message)
	{
		if (DOM.error.panel.style.display !== "block")
		{
			DOM.error.panel.style.display = "block";
		}
		DOM.error.message.textContent = message;
	}
	// Hides any previously displayed error message.
	function display_success()
	{
		display_error("");
		DOM.error.panel.style.display = "none";
	}

	// Gets selected background color options.
	function get_background_options()
	{
		const bg = DOM.new_tab.custom_page.background;
		return {
			color: bg.color.value,

			do_animate: bg.animation_enabled.checked,
			animation_duration: parseFloat(bg.animation_duration.value)
		};
	}
	// Gets selected wallpaper options.
	function get_wallpaper_options()
	{
		const wp = DOM.new_tab.custom_page.wallpaper;
		return {
			is_enabled: wp.is_enabled.checked,

			urls: NTT.OptionsUI.NewTab.Wallpaper.get_urls(),

			do_animate: wp.animation_enabled.checked,
			animation_duration: parseFloat(wp.animation_duration.value)
		};
	}
	// Gets selected notification options.
	function get_notification_options()
	{
		return {
			new_features: DOM.notification.new_features.checked
		}
	}

	// Gets the configuration represented by the page's controls.
	function get_configuration()
	{
		return {
			version: NTT.Configuration.Version.CURRENT,

			notification: get_notification_options(),
			new_tab:
			{
				behavior: NTT.OptionsUI.NewTab.Behavior.get_selected(),

				redirect:
				{
					url: DOM.new_tab.redirect.url.value.trim()
				},
				custom_page:
				{
					background: get_background_options(),
					wallpaper:  get_wallpaper_options()
				}
			},
			options_ui:
			{
				theme: NTT.OptionsUI.Theme.get_selected()
			}
		};
	}
	// Sets the configuration represented by the page's controls.
	function set_configuration(cfg)
	{
		// notification
		DOM.notification.new_features.checked = cfg.notification.new_features;

		// new-tab behavior
		NTT.OptionsUI.NewTab.Behavior.set_selected(cfg.new_tab.behavior);

		// new-tab redirection
		DOM.new_tab.redirect.url.value = cfg.new_tab.redirect.url;

		// new-tab custom page background
		const ui_bg  = DOM.new_tab.custom_page.background;
		const cfg_bg = cfg.new_tab.custom_page.background;

		ui_bg.color.value = cfg_bg.color;
		ui_bg.animation_enabled.checked = cfg_bg.do_animate;
		ui_bg.animation_duration.value  = cfg_bg.animation_duration;

		// new-tab custom page wallpaper
		const ui_wp  = DOM.new_tab.custom_page.wallpaper;
		const cfg_wp = cfg.new_tab.custom_page.wallpaper;

		ui_wp.is_enabled.checked = cfg_wp.is_enabled;
		NTT.OptionsUI.NewTab.Wallpaper.set_urls(cfg_wp.urls);
		ui_wp.animation_enabled.checked = cfg_wp.do_animate;
		ui_wp.animation_duration.value  = cfg_wp.animation_duration;

		NTT.OptionsUI.Theme.set_selected(cfg.options_ui.theme);
	}

	// Resets the configuration represented by the page's controls to its default state.
	function reset_configuration()
	{
		set_configuration(NTT.Configuration.create_default());
		display_success();
	}
	// Saves the configuration represented by the page's controls to local storage.
	function save_configuration()
	{
		const cfg = get_configuration();

		display_success();
		NTT.Configuration
			.Storage.save(cfg)
			.catch(() => display_error(ErrorMessage.CONFIGURATION_SAVE));
	}

	function initialize()
	{
		// Populating DOM properties //

		DOM.version = document.getElementById('version');

		DOM.error.panel   = document.getElementById('errors');
		DOM.error.message = document.getElementById('error-message');

		DOM.new_tab.redirect.url = document.getElementById('redirection-url');

		const bg = DOM.new_tab.custom_page.background;
		bg.color              = document.getElementById('bg-color');
		bg.animation_enabled  = document.getElementById('do-animate-bg-color');
		bg.animation_duration = document.getElementById('bg-color-animation-duration');

		const wp = DOM.new_tab.custom_page.wallpaper;
		wp.is_enabled         = document.getElementById('do-display-wallpaper');
		wp.animation_enabled  = document.getElementById('do-animate-wallpaper');
		wp.animation_duration = document.getElementById('wallpaper-animation-duration');

		DOM.notification.new_features        = document.getElementById('do-notify-about-new-features');
		DOM.advanced.restore_default_options = document.getElementById('restore-default-options-button');

		// Hooking up events //

		// Checkboxes
		document
			.querySelectorAll('fieldset input[type="checkbox"]')
			.forEach(item =>
			{
				item.addEventListener('click', save_configuration);
			});
		// Radios
		document
			.querySelectorAll('fieldset input[type="radio"]')
			.forEach(item =>
			{
				item.addEventListener('click', save_configuration)
			});
		// Value inputs
		document
			.querySelectorAll('fieldset input[type="color"], input[type="url"], input[type="number"]')
			.forEach(item =>
			{
				item.addEventListener('input', save_configuration);
			});
		NTT.OptionsUI.NewTab.Wallpaper.on_change = save_configuration;

		// Buttons
		DOM.advanced.restore_default_options.addEventListener('click', () =>
		{
			reset_configuration();
			save_configuration();
		});

		// Display version number //

		DOM.version.textContent =
			NTT.Configuration.Version
			.as_string(NTT.Configuration.Version.CURRENT);

		// Load and apply settings //

		NTT.Configuration.Storage.load().then
		(
			// On fulfillment:
			cfg => set_configuration(cfg),
			// On rejection:
			() => display_error(ErrorMessage.CONFIGURATION_LOAD)
		);
	}
	document.addEventListener('DOMContentLoaded', initialize);
}
