(function() {
    const active_ids = [];
    const reading_speed = 55;

    const addon_name = browser.runtime.getManifest().name;
    const icon_url = browser.extension.getURL("/icons/main_64.png");
    
    // Display a notification
    // Close existing message if a message with the same identifier already exists
    // The notification is closed after a variable delay.
    function notify(id, message){
        // Do not display the same message twice by using a active_id
        browser.notifications.create(id,
        {
            type: "basic",
            iconUrl: icon_url,
            title: addon_name,
            message: message
        });

        // Add active_id to active_ids, so we can clear it later
        active_ids.push(id);

        setTimeout(function()
        {
            // Clear the first (oldest) notification
            browser.notifications.clear(active_ids.shift());
        }, message.length * reading_speed);
    }
    
    define({ notify: notify });
})();
