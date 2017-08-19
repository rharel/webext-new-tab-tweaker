{
	const NEW_TAB_TWEAKER_ITEM_ID     = "new-tab-tweaker";
	const SET_WALLPAPER_IMAGE_ITEM_ID = "set-wallpaper-image";
	const ADD_WALLPAPER_IMAGE_ITEM_ID = "add-wallpaper-image";

	let context_items_are_active = false;
	let configuration = null;

	// Adds image context menu items for the setting/addition of the custom new tab page's
	// wallpapers.
	function create_context_menu_items()
	{
		browser.contextMenus.create(
		{
			id: NEW_TAB_TWEAKER_ITEM_ID,
			title: "New Tab Tweaker",
			contexts: ["image"]
		});
		browser.contextMenus.create(
		{
			id: SET_WALLPAPER_IMAGE_ITEM_ID,
			parentId: NEW_TAB_TWEAKER_ITEM_ID,
			title: "Set image as wallpaper",
			contexts: ["image"]
		});
		browser.contextMenus.create(
		{
			id: ADD_WALLPAPER_IMAGE_ITEM_ID,
			parentId: NEW_TAB_TWEAKER_ITEM_ID,
			title: "Add image to wallpaper collection",
			contexts: ["image"]
		});

		// Sets context image as the only wallpaper image.
		browser.contextMenus.onClicked.addListener(info =>
		{
			if (info.menuItemId === SET_WALLPAPER_IMAGE_ITEM_ID)
			{
				configuration.new_tab.custom_page.wallpaper.urls = [info.srcUrl];
				NTT.Configuration.Storage.save(configuration);
				NTT.notify("The image was set as wallpaper.");
			}
		});
		// Adds context image to the wallpaper image collection.
		browser.contextMenus.onClicked.addListener(info =>
		{
			if (info.menuItemId === ADD_WALLPAPER_IMAGE_ITEM_ID)
			{
				const existing_urls = configuration.new_tab.custom_page.wallpaper.urls;

				if (!existing_urls.includes(info.srcUrl))
				{
					existing_urls.push(info.srcUrl);
					NTT.Configuration.Storage.save(configuration);
					NTT.notify("Added wallpaper to wallpaper collection.");
				}else{
					NTT.notify("Wallpaper already exists in wallpaper collection.");
				}
			}
		});

		context_items_are_active = true;
	}
	// Removes context menu items that were created by create_context_menu_items().
	function remove_context_menu_items()
	{
		browser.contextMenus.remove(ADD_WALLPAPER_IMAGE_ITEM_ID);
		browser.contextMenus.remove(SET_WALLPAPER_IMAGE_ITEM_ID);
		browser.contextMenus.remove(NEW_TAB_TWEAKER_ITEM_ID);

		context_items_are_active = false;
	}

	// Decides on whether or not to add image context menu items based on the current option
	// configuration.
	function update_context_menu_item_visibility()
	{
		NTT.Configuration.Storage.load().then(cfg =>
		{
			const TabBehavior = NTT.Configuration.TabBehavior;
			const wallpaper_is_relevant =
				cfg.new_tab.behavior === TabBehavior.DisplayCustomPage &&
				cfg.new_tab.custom_page.wallpaper.is_enabled;

			configuration = cfg;

			if (wallpaper_is_relevant && !context_items_are_active)
			{
				create_context_menu_items();
			}
			else if (!wallpaper_is_relevant && context_items_are_active)
			{
				remove_context_menu_items();
			}
		});
	}
	browser.storage.onChanged.addListener((changes, area) =>
	{
		if (area === "local" &&
			changes.hasOwnProperty(NTT.Configuration.Storage.KEY))
		{
			update_context_menu_item_visibility();
		}
	});
	update_context_menu_item_visibility();
}
