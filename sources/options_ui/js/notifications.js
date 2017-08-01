{
    const options = NTT.OptionsUI.Notification =
    {
        initialize: null,

        get_new_features: null,
        set_new_features: null,

        change_listeners: []
    };

    // This will contain DOM elements proceeding a call to initialize().
    const DOM =
    {
        new_features: null
    };

    options.get_new_features = function()
    {
        return DOM.new_features.checked;
    };
    options.set_new_features = function(value)
    {
        DOM.new_features.checked = value;
    };

    // Invoked when the represented configuration changes.
    function on_change()
    {
        options.change_listeners.forEach(listener => listener());
    }

    options.initialize = function()
    {
        DOM.new_features = document.getElementById('do-notify-about-new-features');
        DOM.new_features.addEventListener('change', on_change);
    };
}
