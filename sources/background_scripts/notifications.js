(function()
{
    // The minimum amount of time (in ms) a notification remains visible (assuming it has not been
    // overridden by another with the same identifier).
    const minimum_visibility_duration = 1000;
    const reading_speed = (function()  // in ms per character
    {
        // The average reading rate in English is ~863 +- 234 characters per minute [1].
        // To accommodate non-native speakers we shall assume the lower bound.
        //
        // 1. https://en.wikipedia.org/wiki/Words_per_minute#Reading_and_comprehension
        const cpm  = 863 - 234;
        return 60000 / cpm;
    })();
    // Computes the number of ms it takes to read a given text.
    function compute_reading_time(text)
    {
        const length_based_duration = text.length * reading_speed;
        return Math.max(length_based_duration, minimum_visibility_duration);
    }

    const addon_name = browser.runtime.getManifest().name;
    const icon_url   = browser.extension.getURL("/icons/main_64.png");
    const active_ids = [];

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
        }, compute_reading_time(message));
    }
    
    define({ notify: notify });
})();
