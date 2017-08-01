{
    const options = NTT.OptionsUI = {};

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

	options.get = function()
	{
		return {
		    version: NTT.Configuration.Version.CURRENT,

            notification:
            {
                new_features: options.Notification.get_new_features()
            },
            new_tab: options.NewTab.get(),
            options_ui:
            {
                theme: options.Theme.get()
            }
		};
	};
	options.set = function(cfg)
	{
	    options.Notification.set_new_features(cfg.notification.new_features);
        options.NewTab.set(cfg.new_tab);
        options.Theme.set(cfg.options_ui.theme);
	};
	options.reset = function()
	{
		options.set(NTT.Configuration.create_default());
		display_success();
	};
	options.save = function()
	{
		const cfg = options.get();

		display_success();
		NTT.Configuration.Storage.save(cfg)
            .catch(() => display_error(ErrorMessage.CONFIGURATION_SAVE));
	};

	function initialize()
	{
		DOM.version = document.getElementById('version');

		DOM.error.panel   = document.getElementById('errors');
		DOM.error.message = document.getElementById('error-message');

		DOM.restore_default_options = document.getElementById('restore-default-options-button');
		DOM.restore_default_options.addEventListener('click', () =>
		{
			options.reset();
			options.save();
		});

		options.Notification.initialize();
		options.Notification.change_listeners.push(options.save);

		options.NewTab.initialize();
		options.NewTab.change_listeners.push(options.save);

		options.Theme.initialize();
		options.Theme.change_listeners.push(options.save);
        {
            const Version = NTT.Configuration.Version;
            DOM.version.textContent = Version.as_string(Version.CURRENT);
        }
		NTT.Configuration.Storage.load().then
		(
			// On fulfillment:
			cfg => options.set(cfg),
			// On rejection:
			() => display_error(ErrorMessage.CONFIGURATION_LOAD)
		);
	}
	document.addEventListener('DOMContentLoaded', initialize);
}
