(function()
{   /**
     * The key to the configuration object in local storage.
     */
    const CONFIGURATION_STORAGE_KEY = "configuration";

    /**
     * The message to display upon an unsuccessful configuration load.
     */
    const LOAD_ERROR_MESSAGE =
        "An error occurred while loading your saved settings.";
    /**
     * The message to display upon an unsuccessful configuration save.
     */
    const SAVE_ERROR_MESSAGE =
        "An error occurred while saving your settings.";

    /**
     * Enumerates possible background types.
     */
    const BackgroundType =
    {   Solid: "solid",
        Image: "image"
    };

    /**
     * Creates a default configuration object.
     *
     * @returns
     *      A configuration object with default values of its properties.
     */
    function create_default_configuration()
    {   return {
            /**
         * The selected background type.
         */
            background_type: BackgroundType.Solid,
            /**
             * The selected color for the solid-background type.
             */
            solid_color: "#ffffff",
            /**
             * The selected image path for the image-background type.
             */
            image_url: ""
        };
    }

    // These will contain form-elements proceeding a call to initialize().
    let error_message;
    let solid_bg_radio, solid_color_input;
    let image_bg_radio, image_url_input;

    /**
     * Displays the specified error message to the user.
     *
     * @param message
     *      The message to display.
     */
    function display_error(message)
    {   error_message.innerHTML = message;
    }

    /**
     * Reads an options configuration from the page's controls.
     *
     * @returns
     *      A configuration object.
     */
    function read_configuration_from_ui()
    {   let cfg = create_default_configuration();

        if (solid_bg_radio.checked)
        {   cfg.background_type = BackgroundType.Solid;
            cfg.solid_color = solid_color_input.value;
        }
        else if (image_bg_radio.checked)
        {   cfg.background_type = BackgroundType.Image;
            cfg.image_url = image_url_input.value;
        }

        return cfg;
    }
    /**
     * Applies an options configuration to the page's controls.
     *
     * @param cfg
     *      The configuration to apply.
     */
    function apply_configuration_to_ui(cfg)
    {   solid_bg_radio.checked =
            cfg.background_type === BackgroundType.Solid;
        image_bg_radio.checked =
            cfg.background_type === BackgroundType.Image;

        solid_color_input.value = cfg.solid_color;
        image_url_input.value = cfg.image_url;

        options_ui.update();
    }

    /**
     * Loads an option configuration from local storage asynchronously.
     *
     * @returns
     *      A promise which yields a configuration object when fulfilled.
     */
    function load_configuration_from_storage()
    {   return browser.storage.local
            .get(CONFIGURATION_STORAGE_KEY)
            .then(item =>
            {   const cfg = item[CONFIGURATION_STORAGE_KEY];
                if (cfg) { return cfg; }
                else { return create_default_configuration(); }
            })
            .catch(() => display_error(LOAD_ERROR_MESSAGE));
    }
    /**
     * Saves an option configuration to local storage asynchronously.
     *
     * @param cfg
     *      The configuration to save.
     */
    function save_configuration_to_storage(cfg)
    {   const item = {};
        item[CONFIGURATION_STORAGE_KEY] = cfg;

        return browser.storage.local
            .set(item)
            .then()
            .catch(() => display_error(SAVE_ERROR_MESSAGE));
    }

    /**
     * Resets the active option configuration to its default state.
     */
    function reset_ui_configuration()
    {   const cfg = create_default_configuration();
        apply_configuration_to_ui(cfg);
    }
    /**
     * Saves the selected option configuration to local storage.
     */
    function save_ui_configuration_to_storage()
    {   const cfg = read_configuration_from_ui();
        save_configuration_to_storage(cfg);
    }

    /**
     * Initializes the page.
     */
    function initialize()
    {   error_message = document.getElementById('error-message');

        solid_bg_radio = document.getElementById('solid-bg-radio');
        solid_color_input = document.getElementById('solid-color-input');

        image_bg_radio = document.getElementById('image-bg-radio');
        image_url_input = document.getElementById('image-url-input');

        load_configuration_from_storage()
            .then(cfg => apply_configuration_to_ui(cfg));

        document
            .getElementById('options-form')
            .addEventListener('submit', event =>
            {
                event.preventDefault();
                save_ui_configuration_to_storage();
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
