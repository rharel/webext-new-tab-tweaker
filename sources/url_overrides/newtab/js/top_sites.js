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

    // Toggles visibility of the list.
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

    // Truncates the specified title.
    //
    // The middle part of titles longer than this is truncated and replaced by the specified
    // symbol.
    function truncate_title(title, target_length = 100, truncation_symbol = "...")
    {
        if (target_length <= 0)                        { return "";                }
        if (title.length  <= target_length)            { return title;             }
        if (target_length <= truncation_symbol.length) { return truncation_symbol; }

        // The title's total length post truncation should equal MAXIMUM_TITLE_SIZE.
        // The truncated title begins with the original's prefix, followed by the
        // truncation symbol, and ends with the original's suffix.

        const segment_size = (target_length - truncation_symbol.length) / 2;
        const prefix_end   = Math.ceil(segment_size);
        const suffix_start = title.length - Math.floor(segment_size);

        return title.substring(0, prefix_end) +
               truncation_symbol +
               title.substring(suffix_start, title.length);
    }
    // Adds the specified site to the listing.
    function add_site(site)
    {
        // Use the site's URL if there is no meaningful title.
        let title = (!site.title || site.title.trim() === "") ?
                      site.url   :  site.title;
        title = truncate_title(title);  // Truncates if too long.

        const anchor = document.createElement("a");
        anchor.className   = "link-button";
        anchor.href        = site.url;
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

    // The maximum number of sites to list.
    const MAXIMUM_LIST_SIZE = 20;
    // Applies the specified options to the page.
    function apply_options(options)
    {
        if (options.visibility === Visibility.Hide) { return; }

        DOM.list    = document.createElement("div");
        DOM.list.id = "top-sites-list";

        browser.topSites.get().then(sites =>
        {
            const displayed_item_count = Math.min(sites.length, MAXIMUM_LIST_SIZE);
            for (let i = 0; i < displayed_item_count; ++i) { add_site(sites[i]); }

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
