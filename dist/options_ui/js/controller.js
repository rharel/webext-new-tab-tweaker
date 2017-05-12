(function()
{
	/**
	 * The messages to display upon unsuccessful operations.
	 */
	const ErrorMessage =
	{
		/**
		 * The message to display upon an unsuccessful configuration load.
		 */
		CONFIGURATION_LOAD:
			"An error occurred while loading your settings.",
		/**
		 * The message to display upon an unsuccessful configuration save.
		 */
		CONFIGURATION_SAVE:
			"An error occurred while saving your settings.",
	};
	/**
	 * This will contain DOM elements proceeding a call to initialize().
	 */
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
		
    /**
     * Displays the specified error message to the user.
     *
     * @param message
     *      The message to display.
     */
    function display_error(message)
    {
		if (DOM.error.panel.style.display !== "block")
		{
			DOM.error.panel.style.display = "block";
		}
        DOM.error.message.textContent = message;
    }
	/**
	 * Hides any previously displayed error message.
	 */
	function display_success()
	{
		display_error("");
		DOM.error.panel.style.display = "none";
	}

	/**
	 * Gets selected background color options.
	 */
	function get_background_options()
	{
		const bg = DOM.new_tab.custom_page.background;

		return {

			color:
				bg.color.value,
			animation_duration:
				bg.animation_enabled.checked ?
				parseFloat(bg.animation_duration.value) : 0,
		};
	}
	/**
	 * Gets selected wallpaper options.
	 */
	function get_wallpaper_options()
	{
		const wp = DOM.new_tab.custom_page.wallpaper;

		return {

			is_enabled: wp.is_enabled.checked,
			urls:
				NTT.OptionsUI.NewTab
					.wallpaper.get_urls()
					.filter(item => item.trim().length > 0),
			animation_duration:
				wp.animation_enabled.checked ?
				parseFloat(wp.animation_duration.value) : 0
		};
	}
	/**
	 * Gets selected notification options.
	 */
	function get_notification_options()
	{
		return {

			new_features:
				DOM.notification.new_features.checked
		}
	}

    /**
     * Gets the configuration represented by the page's controls.
     *
     * @returns
     *      A configuration object.
     */
    function get_configuration()
	{
		return {

			version: NTT.Configuration.Version.CURRENT,

			notification: get_notification_options(),
			new_tab:
			{
				behavior: NTT.OptionsUI.NewTab.get_selected_behavior(),

				redirect:
				{
					url: DOM.new_tab.redirect.url.value
				},
				custom_page:
				{
					background: get_background_options(),
					wallpaper: get_wallpaper_options()
				}
			}
		};
    }
    /**
     * Sets the configuration represented by the page's controls.
     *
     * @param cfg
     *      The configuration to assign.
     */
    function set_configuration(cfg)
    {
		// notification
		DOM.notification.new_features.checked =
			cfg.notification.new_features;

		// new-tab behavior
		NTT.OptionsUI.NewTab.set_selected_behavior(cfg.new_tab.behavior);
		NTT.OptionsUI.NewTab.update_behavior_panels();

		// new-tab redirection
		DOM.new_tab.redirect.url.value = cfg.new_tab.redirect.url;

		// new-tab custom page background
		const ui_bg = DOM.new_tab.custom_page.background;
		const cfg_bg = cfg.new_tab.custom_page.background;

		ui_bg.color.value = cfg_bg.color;
		ui_bg.animation_enabled.checked = cfg_bg.animation_duration > 0;
		ui_bg.animation_duration.value = cfg_bg.animation_duration;

		// new-tab custom page wallpaper
		const ui_wp = DOM.new_tab.custom_page.wallpaper;
		const cfg_wp = cfg.new_tab.custom_page.wallpaper;

		ui_wp.is_enabled.checked = cfg_wp.is_enabled;
		NTT.OptionsUI.NewTab.wallpaper.set_urls(cfg_wp.urls);
		ui_wp.animation_enabled.checked = cfg_wp.animation_duration > 0;
		ui_wp.animation_duration.value = cfg_wp.animation_duration;
    }

    /**
     * Resets the configuration represented by the page's controls to its
	 * default state.
     */
    function reset_configuration()
    {
        set_configuration(NTT.Configuration.DEFAULT);
        display_success();
    }
    /**
     * Saves the configuration represented by the page's controls to local
	 * storage.
     */
    function save_configuration()
    {
    	const cfg = get_configuration();

    	display_success();
		NTT.Configuration
			.Storage.save(cfg)
			.catch(() => display_error(ErrorMessage.CONFIGURATION_SAVE));
    }

    /**
     * Initializes the page.
     */
    function initialize()
    {
    	// Populating DOM properties //

		DOM.version =
			document.getElementById('version');

    	DOM.error.panel =
			document.getElementById('errors');
    	DOM.error.message =
			document.getElementById('error-message');

		DOM.new_tab.redirect.url =
			document.getElementById('redirection-url');

		DOM.new_tab.custom_page.background.color =
			document.getElementById('bg-color');
		DOM.new_tab.custom_page.background.animation_enabled =
			document.getElementById('do-animate-bg-color');
		DOM.new_tab.custom_page.background.animation_duration =
			document.getElementById('bg-color-animation-duration');

		DOM.new_tab.custom_page.wallpaper.is_enabled =
			document.getElementById('do-display-wallpaper');
		DOM.new_tab.custom_page.wallpaper.animation_enabled =
			document.getElementById('do-animate-wallpaper');
		DOM.new_tab.custom_page.wallpaper.animation_duration =
			document.getElementById('wallpaper-animation-duration');

		DOM.notification.new_features =
			document.getElementById('do-notify-about-new-features');

		DOM.advanced.restore_default_options =
			document.getElementById('restore-default-options-button');

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
			.querySelectorAll('fieldset input[type="color"], input[type="url"]')
			.forEach(item =>
		{
			item.addEventListener('input', save_configuration);
		});
		// Wallpaper url fields
		NTT.OptionsUI.NewTab
			.wallpaper.on_url_field_addition = field =>
		{
			field.addEventListener('input', save_configuration);
		};
		NTT.OptionsUI.NewTab
			.wallpaper.on_url_field_removal = save_configuration;

		// Buttons
		DOM.advanced
			.restore_default_options
			.addEventListener('click', () =>
		{
			reset_configuration();
			save_configuration();
		});

		// Display version number //

		DOM.version.textContent =
			NTT.Configuration.Version
			.as_string(NTT.Configuration.Version.CURRENT);

		// Load & apply settings //

		reset_configuration();
		NTT.Configuration.Storage.load().then
		(
			// On fulfillment:
			cfg => set_configuration(cfg),
			// On rejection:
			() => display_error(ErrorMessage.CONFIGURATION_LOAD)
		);
    }

    document.addEventListener('DOMContentLoaded', initialize);
})();
