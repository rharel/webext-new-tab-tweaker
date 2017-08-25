(function()
{
    // Set in define().
    let change_listeners;

    // This will contain DOM elements proceeding a call to initialize().
    const DOM =
    {
        urls: null
    };

    function get()
    {
        const seen = {};
        return DOM.urls.value.split("\n")
            .map   (url => url.trim())
            .filter(url =>
            {
                if (url.length === 0 ||
                    seen.hasOwnProperty(url))
                {
                    return false;
                }
                else
                {
                    return seen[url] = true;
                }
            });
    }
    function set(array, invoke_change_listeners = false)
    {
        DOM.urls.value = array.join("\n");

        if (invoke_change_listeners) { change_listeners.notify(); }
    }

    function initialize()
    {
        DOM.urls = document.getElementById('wallpaper-urls');
        DOM.urls.addEventListener('input', change_listeners.notify);
    }

    define(["common_ui/subscription_service"],
    function(subscription_service)
    {
        change_listeners  = subscription_service.setup();

        return {
            initialize: initialize,

            get: get,
            set: set,

            add_change_listener: change_listeners.add
        };
    });
})();
