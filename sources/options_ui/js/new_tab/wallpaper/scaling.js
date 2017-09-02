(function()
{
    // Set in define().
    let change_listeners;

    // This will contain DOM elements proceeding a call to initialize().
    const DOM =
    {
        scaling: null
    };

    function get()
    {
        return DOM.scaling.value;
    }
    function set(value)
    {
        let i;
        for (i = 0;
             i < DOM.scaling.options.length &&
             DOM.scaling.options.item(i).value !== value;
             i++) {}

        DOM.scaling.selectedIndex = i;
    }

    function initialize()
    {
        DOM.scaling = document.getElementById('wallpaper-scaling');
        DOM.scaling.addEventListener('change', change_listeners.notify);
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
