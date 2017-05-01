;(function()
{
	/**
	 * Just a shorthand.
	 */
	const CNT = window.CustomNewTab;

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
		/**
		 * The message to display upon an unsuccessful validation of user input.
		 */
		CONFIGURATION_VALIDATION:
			"The selected options are not valid. Please make sure all fields " +
			"are filled-in correctly."
	};

	/**
	 * This will contain DOM elements proceeding a call to initialize().
	 */
	const DOM =
	{
		error_container: null,
		error_message: null,

		tb_redirect_radio: null,
		tb_custom_page_radio: null,

		tb_redirect_target_url: null,

		tb_cp_bg_color: null,
		tb_cp_bg_color_fade_in_duration: null,

		tb_cp_bg_image_source: null,
		tb_cp_bg_image_url: null,
		tb_cp_bg_image_fade_in_duration: null,
	};
		
    /**
     * Displays the specified error message to the user.
     *
     * @param message
     *      The message to display.
     */
    function display_error(message)
    {
		if (DOM.error_container.style.display !== "block")
		{
			DOM.error_container.style.display = "block";
		}
        DOM.error_message.innerHTML = message;
    }
	/**
	 * Hides any previously displayed error message.
	 */
	function display_success()
	{
		display_error("");
		DOM.error_container.style.display = "none";
	}

    /**
     * Gets the configuration represented by the page's controls.
     *
     * @returns
     *      A configuration object.
     */
    function get_ui_configuration()
    {
    	const TabBehavior = CNT.Configuration.TabBehavior;

		let cfg;

    	if (DOM.tb_redirect_radio.checked)
		{
			cfg =
			{
				tab_behavior: TabBehavior.Redirect,
				target_url: DOM.tb_redirect_target_url.value
			};
		}
        else if (DOM.tb_custom_page_radio.checked)
        {
			const ImageSource = CNT.Configuration.ImageSource;

			cfg =
			{
				tab_behavior: TabBehavior.CustomPage,

				background_color:
					DOM.tb_cp_bg_color.value,
				background_color_fade_in_duration:
					parseFloat(DOM.tb_cp_bg_color_fade_in_duration.value),

				background_image_source:
					DOM.tb_cp_bg_image_source.value
			};
        	if (cfg.background_image_source !== ImageSource.None)
			{
				cfg.background_image_url =
					DOM.tb_cp_bg_image_url.value;
				cfg.background_image_fade_in_duration =
					parseFloat(DOM.tb_cp_bg_image_fade_in_duration.value);
			}
        }

        return cfg;
    }
    /**
     * Sets the configuration represented by the page's controls.
     *
     * @param cfg
     *      The configuration to assign.
     */
    function set_ui_configuration(cfg)
    {
    	const TabBehavior = CNT.Configuration.TabBehavior;

    	DOM.tb_redirect_radio.checked =
			cfg.tab_behavior === TabBehavior.Redirect;
    	DOM.tb_custom_page_radio.checked =
            cfg.tab_behavior === TabBehavior.CustomPage;

    	if (cfg.tab_behavior === TabBehavior.Redirect)
		{
			DOM.tb_redirect_radio.checked = true;
			DOM.tb_redirect_target_url.value = cfg.target_url;
		}
		else if (cfg.tab_behavior === TabBehavior.CustomPage)
		{
			const ImageSource = CNT.Configuration.ImageSource;

			DOM.tb_custom_page_radio.checked = true;

			DOM.tb_cp_bg_color.value =
				cfg.background_color;
			DOM.tb_cp_bg_color_fade_in_duration.value =
				cfg.background_color_fade_in_duration.toString();

			DOM.tb_cp_bg_image_source.value = cfg.background_image_source;

			if (cfg.background_image_source !== ImageSource.None)
			{
				DOM.tb_cp_bg_image_url.value =
					cfg.background_image_url;
				DOM.tb_cp_bg_image_fade_in_duration.value =
					cfg.background_image_fade_in_duration.toString();
			}
		}

        CNT.OptionsUIControls.update();
    }

    /**
     * Resets the configuration represented by the page's controls to its
	 * default state.
     */
    function reset_ui_configuration()
    {
        set_ui_configuration(CNT.Configuration.DEFAULT_CONFIGURATION);
        display_success();
    }
    /**
     * Saves the configuration represented by the page's controls to local
	 * storage.
     */
    function save_ui_configuration()
    {
    	const cfg = get_ui_configuration();
        if (CNT.Configuration.validate(cfg))
		{
			display_success();

			CNT.Configuration.save(cfg)
				.catch(() => display_error(ErrorMessage.CONFIGURATION_SAVE));
		}
		else
		{
			display_error(ErrorMessage.CONFIGURATION_VALIDATION);
		}
    }

    /**
     * Initializes the page.
     */
    function initialize()
    {
    	[
    		'error_container',
			'error_message',

			'tb_redirect_radio',
			'tb_custom_page_radio',

			'tb_redirect_target_url',

			'tb_cp_bg_color',
			'tb_cp_bg_color_fade_in_duration',

			'tb_cp_bg_image_source',
			'tb_cp_bg_image_url',
			'tb_cp_bg_image_fade_in_duration'
		]
			.forEach(item =>
			{
				const id = item.replace(new RegExp('_', 'g'), '-');
				DOM[item] = document.getElementById(id);
			});

		CNT.Configuration.load().then
		(
			// On fulfillment:
			cfg => set_ui_configuration(cfg),
			// On rejection:
			() => display_error(ErrorMessage.CONFIGURATION_LOAD)
		);

        document
            .getElementById('options-form')
            .addEventListener('submit', event =>
            {
                event.preventDefault();
                save_ui_configuration();
            });
        document
            .getElementById('options-form')
            .addEventListener('reset', event =>
            {
                event.preventDefault();
                reset_ui_configuration();
            });
    }

    document.addEventListener('DOMContentLoaded', initialize);
})();
