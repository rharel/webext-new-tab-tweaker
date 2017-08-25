(function()
{
    // Set in define().
    let configuration;
    const options_ui =
    {
        categories:   null,
        new_tab:      null,
        notification: null,
        theme:        null,
    };

    // This will contain DOM elements proceeding a call to initialize().
    const DOM =
    {
        version: null,

        error:
        {
            panel:   null,
            message: null
        },

        restore_default_options: null
    };

    // The messages to display upon unsuccessful operations.
    const ErrorMessage =
    {
        // Display upon an unsuccessful configuration load.
        CONFIGURATION_LOAD: "An error occurred while loading your settings.",
        // Display upon an unsuccessful configuration save.
        CONFIGURATION_SAVE: "An error occurred while saving your settings.",
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

    function get()
    {
        return {
            version: configuration.version.CURRENT,

            notification:
            {
                new_features: options_ui.notification.get_new_features()
            },
            new_tab: options_ui.new_tab.get(),
            options_ui:
            {
                theme: options_ui.theme.get()
            }
        };
    }
    function set(options)
    {
        options_ui.notification.set_new_features(options.notification.new_features);
        options_ui.new_tab.set(options.new_tab);
        options_ui.theme.set(options.options_ui.theme);
    }

    function reset()
    {
        set(configuration.create_default());
        display_success();
    }

    function save()
    {
        const options = get();

        display_success();
        configuration.storage.save(options)
            .catch(() => display_error(ErrorMessage.CONFIGURATION_SAVE));
    }

    function initialize()
    {
        DOM.version = document.getElementById('version');

        DOM.error.panel   = document.getElementById('errors');
        DOM.error.message = document.getElementById('error-message');

        DOM.restore_default_options = document.getElementById('restore-default-options-button');
        DOM.restore_default_options.addEventListener('click', () =>
        {
            reset();
            save();
        });

        options_ui.notification.initialize();
        options_ui.notification.add_change_listener(save);

        options_ui.new_tab.initialize();
        options_ui.new_tab.add_change_listener(save);

        options_ui.theme.initialize();
        options_ui.theme.add_change_listener(save);
        {
            const version = configuration.version;
            DOM.version.textContent = version.as_string(version.CURRENT);
        }

        options_ui.dialogs.initialize();
        options_ui.categories.initialize();

        configuration.storage.load().then
        (
            // On fulfillment:
            options => set(options),
            // On rejection:
            () => display_error(ErrorMessage.CONFIGURATION_LOAD)
        );
    }

    requirejs.config(
    {
        paths:
        {
            "common":    "../../common/js",
            "common_ui": "./common",
        }
    });
    requirejs(
    [
        "common/after_page_load",
        "common/configuration",

        "common_ui/dialogs",

        "./option_categories",
        "./notifications",
        "./themes",
        "./new_tab/main"
    ],
    function(after_page_load, configuration_module,
             dialogs,
             categories, notifications, themes, new_tab)
    {
        configuration = configuration_module;

        options_ui.dialogs      = dialogs;
        options_ui.categories   = categories;
        options_ui.notification = notifications;
        options_ui.theme        = themes;
        options_ui.new_tab      = new_tab;

        after_page_load.do(initialize);
    });
})();
