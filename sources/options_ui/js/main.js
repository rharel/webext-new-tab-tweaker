(function()
{
    // Set in define().
    const options =
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
            version: NTT.Configuration.Version.CURRENT,

            notification:
            {
                new_features: options.notification.get_new_features()
            },
            new_tab: options.new_tab.get(),
            options_ui:
            {
                theme: options.theme.get()
            }
        };
    }
    function set(cfg)
    {
        options.notification.set_new_features(cfg.notification.new_features);
        options.new_tab.set(cfg.new_tab);
        options.theme.set(cfg.options_ui.theme);
    }

    function reset()
    {
        set(NTT.Configuration.create_default());
        display_success();
    }

    function save()
    {
        const cfg = get();

        display_success();
        NTT.Configuration.Storage.save(cfg)
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

        options.notification.initialize();
        options.notification.add_change_listener(save);

        options.new_tab.initialize();
        options.new_tab.add_change_listener(save);

        options.theme.initialize();
        options.theme.add_change_listener(save);
        {
            const Version = NTT.Configuration.Version;
            DOM.version.textContent = Version.as_string(Version.CURRENT);
        }

        options.dialogs.initialize();
        options.categories.initialize();

        NTT.Configuration.Storage.load().then
        (
            // On fulfillment:
            cfg => set(cfg),
            // On rejection:
            () => display_error(ErrorMessage.CONFIGURATION_LOAD)
        );
    }

    requirejs.config(
    {
        paths:
        {
            "after_page_load":      "common/after_page_load",
            "animation_options":    "common/animation_options",
            "numeric_utilities":    "common/numeric_utilities",
            "subscription_service": "common/subscription_service",
            "dialogs":              "common/dialogs"
        }
    });
    requirejs(["after_page_load", "dialogs",
               "./option_categories", "./notifications", "./themes",
               "./new_tab/main"],
    function(after_page_load, dialogs, categories, notifications, themes, new_tab)
    {
        options.dialogs      = dialogs;
        options.categories   = categories;
        options.notification = notifications;
        options.theme        = themes;
        options.new_tab      = new_tab;

        after_page_load.do(initialize);
    });
})();
