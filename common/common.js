(function()
{
    /**
     * The key to the option configuration object in local storage.
     */
    const OPTIONS_STORAGE_KEY = "configuration";

	/**
	 * Enumerates possible tab types.
	 */
	const TabType =
	{
		Redirect: "redirect",
		Color: "color",
		Image: "image"
	};

	/**
	 * Gets the a default option configuration object.
	 *
	 * @returns
	 *      The default option configuration.
	 */
	function default_options()
	{
		return {
			/**
			 * The selected tab type.
			 */
			tab_type: TabType.Color,
			/**
			 * The selected page URL for the redirect-tab type.
			 */
			redirect_url: "",
			/**
			 * The selected color for the color-tab type.
			 */
			color: "#ffffff",
			/**
			 * The selected image URL for the image-tab type.
			 */
			image_url: ""
		};
	}

	/**
	 * Loads the option configuration from local storage asynchronously.
	 *
	 * @returns
	 *      A promise which yields a configuration object when fulfilled.
	 */
	function load_options_from_storage()
	{
		return browser.storage.local
			.get(OPTIONS_STORAGE_KEY)
			.then(item =>
			{
				if (item.hasOwnProperty(OPTIONS_STORAGE_KEY))
				{
					return item[OPTIONS_STORAGE_KEY];
				}
				else
				{
					return default_options();
				}
			});
	}
	/**
	 * Saves an option configuration to local storage asynchronously.
	 *
	 * @param options
	 *      The option configuration to save.
	 */
	function save_options_to_storage(options)
	{
		const item = {};
		item[OPTIONS_STORAGE_KEY] = options;

		return browser.storage.local.set(item);
	}

	if (!window.CustomNewTab) { window.CustomNewTab = {}; }

	window.CustomNewTab.OPTIONS_STORAGE_KEY = OPTIONS_STORAGE_KEY;
	window.CustomNewTab.TabType = TabType;
	window.CustomNewTab.default_options = default_options;
	window.CustomNewTab.load_options_from_storage = load_options_from_storage;
	window.CustomNewTab.save_options_to_storage = save_options_to_storage;
})();
