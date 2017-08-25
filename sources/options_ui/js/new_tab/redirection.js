(function()
{
    // Set in define().
    let change_listeners;

    // This will contain DOM elements proceeding a call to initialize().
    const DOM =
    {
        url: null
    };

    function get()      { return DOM.url.value; };
    function set(value) { DOM.url.value = value; };

    function initialize()
    {
        DOM.url = document.getElementById('redirection-url');
        DOM.url.addEventListener('input', change_listeners.notify);
    }

    define(["common_ui/subscription_service"],
    function(subscription_service)
    {
        change_listeners = subscription_service.setup();

        return {
            initialize: initialize,

            get: get,
            set: set,

            add_change_listener: change_listeners.add
        };
    });
})();
