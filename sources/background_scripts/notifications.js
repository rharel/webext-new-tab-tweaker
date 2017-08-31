(function()
{
    const active_ids    = [];
    const reading_speed = 55;  // in ms per character

    const addon_name = browser.runtime.getManifest().name;
    const icon_url   = browser.extension.getURL("/icons/main_64.png");
    
    // Displays a notification message with given identifier. If an earlier notification with same
    // identifier exists, it is discarded. Notifications last a variable duration based on the
    // length of their message text.
    function notify(id, message)
    {
        // This discards any active notifications with the same identifier.
        browser.notifications.create(id,
        {
            type:    "basic",
            iconUrl: icon_url,
            title:   addon_name,
            message: message
        });

        active_ids.push(id);
        setTimeout(function()
        {
            // Clear the first (oldest) notification
            browser.notifications.clear(active_ids.shift());
        }, message.length * reading_speed);
    }
    
    define({ notify: notify });
})();
