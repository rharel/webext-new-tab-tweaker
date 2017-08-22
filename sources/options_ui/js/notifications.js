(function()
{
    // Set in define().
    let change_listeners;

    // This will contain DOM elements proceeding a call to initialize().
    const DOM =
    {
        new_features: null
    };

    function get_new_features()
    {
        return DOM.new_features.checked;
    }
    function set_new_features (value)
    {
        DOM.new_features.checked = value;
    }

    function initialize ()
    {
        DOM.new_features = document.getElementById('do-notify-about-new-features');
        DOM.new_features.addEventListener('change', change_listeners.notify);
    }

    define(["subscription_service"],
    function(subscription_service)
    {
        change_listeners  = subscription_service.setup();

        return {
            initialize: initialize,

            get_new_features: get_new_features,
            set_new_features: set_new_features,

            add_change_listener: change_listeners.add
        };
    });
})();
