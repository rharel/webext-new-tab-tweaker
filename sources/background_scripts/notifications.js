(function() {
    const active_ids = [];
    const readingSpeed = 55;

    const addonName = browser.runtime.getManifest().name;
    const iconUrl = browser.extension.getURL("/icons/main_64.png");
    
    // Display a notification
    // Close existing message if a message with the same identifier already exists
    // The notification is closed after a variable delay.
    function notify(id, message){
        // Do not display the same message twice by using a active_id
        browser.notifications.create(id,
        {
            type: "basic",
            iconUrl: iconUrl,
            title: addonName,
            message: message
        });

        // Add active_id to active_ids, so we can clear it later
        active_ids.push(id);

        setTimeout(function()
        {
            // Clear the first (oldest) notification
            browser.notifications.clear(active_ids.shift());
        }, message.length * readingSpeed);
    }
    
    define({ notify: notify });
})();
