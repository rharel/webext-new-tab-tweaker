(function()
{
    /**
     * The message to display upon an unsuccessful configuration load.
     */
    const LOAD_ERROR_MESSAGE =
        "An error occurred while loading your settings.";
    /**
     * The message to display upon an unsuccessful configuration save.
     */
    const SAVE_ERROR_MESSAGE =
        "An error occurred while saving your settings.";
	/**
	 * The message to display upon an unsuccessful validation of user input.
	 */
    const VALIDATION_ERROR_MESSAGE =
		"The selected options are not valid. Please make sure all fields are " +
		"filled-in correctly.";

    const TabType = CustomNewTab.TabType;
    const default_options = CustomNewTab.default_options;
    const load_options = CustomNewTab.load_options_from_storage;
    const save_options = CustomNewTab.save_options_to_storage;
	const update_ui = CustomNewTab.OptionsPage.update;

    // These will contain DOM elements proceeding a call to initialize().
    let error_message;
    let redirect_tab_radio, redirect_url_input;
    let color_tab_radio, color_background_input;
    let image_tab_radio, image_url_input;

    /**
     * Displays the specified error message to the user.
     *
     * @param message
     *      The message to display.
     */
    function display_error(message)
    {
        error_message.innerHTML = message;
    }

    /**
     * Reads an options configuration from the page's controls.
     *
     * @returns
     *      An option configuration object.
     */
    function read_options_from_ui()
    {
    	let options = default_options();

    	if (redirect_tab_radio.checked)
		{
			options.tab_type = TabType.Redirect;
			options.redirect_url = redirect_url_input.value;
		}
        else if (color_tab_radio.checked)
        {
        	options.tab_type = TabType.Color;
            options.color = color_background_input.value;
        }
        else if (image_tab_radio.checked)
        {
        	options.tab_type = TabType.Image;
            options.image_url = image_url_input.value;
        }

        return options;
    }
    /**
     * Applies an options configuration to the page's controls.
     *
     * @param options
     *      The option configuration to apply.
     */
    function apply_options_to_ui(options)
    {
    	redirect_tab_radio.checked =
			options.tab_type === TabType.Redirect;
    	color_tab_radio.checked =
            options.tab_type === TabType.Color;
        image_tab_radio.checked =
            options.tab_type === TabType.Image;

        redirect_url_input.value = options.redirect_url;
        color_background_input.value = options.color;
        image_url_input.value = options.image_url;

        update_ui();
    }

	/**
	 * Validates the specified option configuration.
	 *
	 * @param options
	 * 		The options configuration to validate.
	 * @returns
	 * 		True iff the selected option configuration is valid.
	 */
	function validate_options(options)
	{
		if (options.tab_type === TabType.Redirect)
		{
			return options.redirect_url.trim().length > 0;
		}
		else if (options.tab_type === TabType.Color)
		{
			return /^#(?:[0-9a-f]{6})$/.test(options.color);
		}
		else if (options.tab_type === TabType.Image)
		{
			return options.image_url.trim().length > 0;
		}
		else
		{
			return false;
		}
	}

    /**
     * Resets the active option configuration to its default state.
     */
    function reset_ui_options()
    {
    	const options = default_options();
        apply_options_to_ui(options);
    }
    /**
     * Saves the selected option configuration to local storage.
     */
    function save_ui_options()
    {
    	const options = read_options_from_ui();
        if (validate_options(options))
		{
			display_error("");
			save_options(options)
				.catch(() => display_error(SAVE_ERROR_MESSAGE));
		}
		else
		{
			display_error(VALIDATION_ERROR_MESSAGE);
		}
    }

    /**
     * Initializes the page.
     */
    function initialize()
    {
    	error_message = document.getElementById('error-message');

    	redirect_tab_radio = document.getElementById('redirect-tab-radio');
    	redirect_url_input = document.getElementById('redirect-url-input');

        color_tab_radio = document.getElementById('color-tab-radio');
        color_background_input = document.getElementById('color-background-input');

        image_tab_radio = document.getElementById('image-tab-radio');
        image_url_input = document.getElementById('image-url-input');

		load_options().then
		(
			// On fulfillment:
			options => apply_options_to_ui(options),
			// On rejection:
			() => display_error(LOAD_ERROR_MESSAGE)
		);

        document
            .getElementById('options-form')
            .addEventListener('submit', event =>
            {
                event.preventDefault();
                save_ui_options();
            });
        document
            .getElementById('options-form')
            .addEventListener('reset', event =>
            {
                event.preventDefault();
                reset_ui_options();
            });
    }

    document.addEventListener('DOMContentLoaded', initialize);
})();
