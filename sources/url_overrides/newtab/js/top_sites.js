(function()
{
    // Set in define().
    let Visibility;

    // This will contain DOM elements proceeding a call to initialize().
    const DOM =
    {
        list: null
    };

    // Applies the specified options to the page.
    function apply_options(options)
    {
        if (options.visibility === Visibility.Hide) { return; }

        DOM.list    = document.createElement('div');
        DOM.list.id = "top-sites-list";

        browser.topSites.get().then(items =>
        {
            items.forEach(item =>
            {
                const anchor = document.createElement('a');
                anchor.classList = "link-button";
                anchor.href        = item.url;
                anchor.textContent = (!item.title || item.title.trim() === '') ?
                                       item.url : item.title;

                const container = document.createElement('div');
                container.classList = "button-container";
                container.appendChild(anchor);

                DOM.list.appendChild(container);
            });
            if (options.visibility === Visibility.ShowOnRequest)
            {
                DOM.list.style.display = "none";
                DOM.list.style.opacity = 0;
            }
            document.body.appendChild(DOM.list);
            document.body.addEventListener('click', () =>
            {
                if (DOM.list.style.display !== "none")
                {
                    DOM.list.style.display = "none";
                    DOM.list.style.opacity = 0;
                }
                else
                {
                    DOM.list.style.display = "flex";
                    // Allow the DOM some time to update before initiating animation,
                    // otherwise it may be skipped.
                    setTimeout(() =>
                    {
                        DOM.list.style.opacity = 1;
                    }, 50);
                }
            });
        });
    }

    define(["common/configuration"], function(configuration)
    {
        Visibility = configuration.TopSitesVisibility;

        return { apply_options: apply_options }
    });
})();
