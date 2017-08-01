{
    const options = NTT.OptionsUI.NewTab.Redirection =
    {
        initialize: null,

        get: null,
        set: null,

        change_listeners: []
    };

    // This will contain DOM elements proceeding a call to initialize().
    const DOM =
    {
        url: null
    };

    options.get = function()      { return DOM.url.value; };
    options.set = function(value) { DOM.url.value = value; };

    // Invoked when the represented configuration changes.
    function on_change()
    {
        options.change_listeners.forEach(listener => listener());
    }

    options.initialize = function()
    {
        DOM.url = document.getElementById('redirection-url');
        DOM.url.addEventListener('input', on_change);
    };
}
