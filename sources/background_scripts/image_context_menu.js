(function()
{
    const NEW_TAB_TWEAKER_ITEM_ID     = "new-tab-tweaker";
    const SET_WALLPAPER_IMAGE_ITEM_ID = "set-wallpaper-image";
    const ADD_WALLPAPER_IMAGE_ITEM_ID = "add-wallpaper-image";

    let context_items_are_active = false;
    let configuration = null;
    let options       = null;
    let notifications = null;
    
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
                options.new_tab.custom_page.wallpaper.urls = [info.srcUrl];
                configuration.storage.save(options).then(
                    () => notifications.notify(SET_WALLPAPER_IMAGE_ITEM_ID, "The image was set as wallpaper."), // Notify success
                    () => notifications.notify(SET_WALLPAPER_IMAGE_ITEM_ID, "Failed to set image as wallpaper.") // Notify failure
                );
                
            }
        });
        // Adds context image to the wallpaper image collection.
        browser.contextMenus.onClicked.addListener(info =>
        {
            if (info.menuItemId === ADD_WALLPAPER_IMAGE_ITEM_ID)
            {
                const existing_urls = options.new_tab.custom_page.wallpaper.urls,
                      candidate_url = info.srcUrl;

                if (!existing_urls.includes(candidate_url))
                {
                    existing_urls.push(candidate_url);
                    configuration.storage.save(options).then(
                         () => notifications.notify(ADD_WALLPAPER_IMAGE_ITEM_ID, "Added wallpaper to wallpaper collection."), // Notify success
                         () => notifications.notify(ADD_WALLPAPER_IMAGE_ITEM_ID, "Failed to add wallpaper to wallpaper collection.") // Notify failure
                    );
                }
                else
                {
                    notifications.notify(ADD_WALLPAPER_IMAGE_ITEM_ID, "Wallpaper already exists in wallpaper collection.");
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
        configuration.storage.load().then(result =>
        {
            options = result;

            const TabBehavior = configuration.TabBehavior;
            const wallpaper_is_relevant =
                options.new_tab.behavior === TabBehavior.DisplayCustomPage &&
                options.new_tab.custom_page.wallpaper.is_enabled;

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

    define(["common/configuration", "background_scripts/notifications"],
	function(configuration_module, notifications_module)
	{
		// Configuration
		configuration = configuration_module;

		browser.storage.onChanged.addListener((changes, area) =>
		{
			if (area === "local" &&
				changes.hasOwnProperty(configuration.storage.KEY))
			{
				update_context_menu_item_visibility();
			}
		});
		update_context_menu_item_visibility();
		
		// Notifications
		notifications = notifications_module;
	}
    );

})();
