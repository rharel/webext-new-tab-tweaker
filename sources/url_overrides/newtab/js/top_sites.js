(function()
{
    // Set in define().
    let Visibility;

    // This will contain DOM elements proceeding a call to initialize().
    const DOM =
    {
        background: null,
        list:       null
    };

    // The maximum number of sites to list.
    const MAXIMUM_LIST_SIZE = 20;
    // The maximum number of characters in a site's title. The middle part of titles longer than
    // this is truncated.
    const MAXIMUM_TITLE_SIZE = 100;
    /// The truncated part of long titles is replaced by this.
    const TRUNCATION_SYMBOL = "...";

    function toggle_visibility()
    {
        const style = DOM.list.style;
        if (style.display !== "flex")
        {
            style.display = "flex";
            // Allow the DOM some time to update before initiating animation,
            // otherwise it may be skipped.
            setTimeout(() => { style.opacity = 1; }, 10);
        }
        else
        {
            style.display = "none";
            style.opacity = 0;
        }
    }

    // Applies the specified options to the page.
    function apply_options(options)
    {
        if (options.visibility === Visibility.Hide) { return; }

        DOM.list    = document.createElement("div");
        DOM.list.id = "top-sites-list";

        browser.topSites.get().then(items =>
        {
            const displayed_item_count = Math.min(items.length, MAXIMUM_LIST_SIZE);
            for (let i = 0; i < displayed_item_count; ++i)
            {
                const item = items[i];

                // Use the item's URL if there is no meaningful title.
                let title = (!item.title || item.title.trim() === "") ?
                              item.url : item.title;
                // Truncate long titles:
                if (title.length > MAXIMUM_TITLE_SIZE)
                {
                    // The title's total length post truncation should equal MAXIMUM_TITLE_SIZE.
                    // The truncated title begins with the original's prefix, followed by the
                    // truncation symbol, and ends with the original's suffix.

                    const segment_size = (MAXIMUM_TITLE_SIZE - TRUNCATION_SYMBOL.length) / 2;
                    const prefix_end   = Math.ceil(segment_size);
                    const suffix_start = MAXIMUM_TITLE_SIZE - Math.floor(segment_size);

                    title = title.substring(0, prefix_end) + TRUNCATION_SYMBOL +
                            title.substring(suffix_start, title.length);
                }

                const anchor = document.createElement("a");
                anchor.className   = "link-button";
                anchor.href        = item.url;
                anchor.textContent = title;

                const favicon = new Image();
                favicon.style.visibility = "hidden";
                favicon.addEventListener("load", () => { favicon.style.visibility = "visible"; });
                favicon.src = `${anchor.origin}/favicon.ico`;
                anchor.insertBefore(favicon, anchor.firstChild);

                const container = document.createElement("div");
                container.className = "button-container";
                container.appendChild(anchor);

                DOM.list.appendChild(container);
            }
            if (options.visibility === Visibility.ShowOnRequest)
            {
                DOM.list.style.display = "none";
                DOM.list.style.opacity = 0;
                DOM.background.addEventListener("click", () =>
                {
                    toggle_visibility();

                    // Sometimes the top sites would be selected by the click, we don't want that:
                    document.getSelection().removeAllRanges();
                });
            }
            else
            {
                DOM.list.style.display = "flex";
                DOM.list.style.opacity = 1;
            }
            DOM.background.appendChild(DOM.list);
        });
    }

    function initialize()
    {
        DOM.background = document.getElementById("background");
    }

    define(["common/configuration"], function(configuration)
    {
        Visibility = configuration.TopSitesVisibility;

        return {
            initialize:    initialize,
            apply_options: apply_options
        };
    });
})();
