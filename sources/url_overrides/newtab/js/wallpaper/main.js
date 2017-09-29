(function()
{
    // Set in define().
    let rng, scaling;

    // This will contain DOM elements proceeding a call to initialize().
    const DOM =
    {
        background: null,
        wallpaper:  null,
    };

    // The storage key associated with the URL of the last picked wallpaper.
    //
    // It is used to avoid displaying the same wallpaper consecutively, when the wallpaper URL list
    // contains more than one item.
    const PREVIOUS_WALLPAPER = "previous-wallpaper@new-tab-tweaker";

    // The pattern identifying plaintext image list sources.
    const LIST_SOURCE_PATTERN = /^\s*\[list\]\s*/;

    // Returns true if the given URL points to an image.
    function is_image(url)
    {
        return !LIST_SOURCE_PATTERN.test(url);
    }
    // Selects a random wallpaper image URL.
    // The list of URLs in options may contain URLs of two kinds:
    //      1. Those linking to an image directly.
    //      2. Those linking to a dynamic plain-text list of direct image URLs to choose from.
    function select_wallpaper(urls, on_success)
    {
        let previously_selected = localStorage.getItem(PREVIOUS_WALLPAPER);
        function select_random_item(items)
        {
            if (items.length === 1) { return items[0]; }
            else
            {
                let index = rng.integer_in_range(0, items.length - 1);
                if (items[index] === previously_selected)
                {
                    index = (index + 1) % items.length;
                }
                return items[index];
            }
        }

        let source = select_random_item(urls);
        if (is_image(source)) { on_success(source); }
        else
        {
            source = source.replace(LIST_SOURCE_PATTERN, '');
            // Fetch resource, and if it is plain-text, interpret it as a list of image URLs,
            // each on a new line.
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () =>
            {
                if (xhr.readyState === XMLHttpRequest.DONE)
                {
                    if (xhr.status === 200)  // success
                    {
                        const content_type = xhr.getResponseHeader("Content-Type");
                        if (!content_type.startsWith("text/plain"))
                        {
                            console.log(`Expected plaintext response from ${source},` +
                                        `got '${content_type}' instead.`);
                        }
                        else
                        {
                            on_success(select_random_item(xhr.responseText.split('\n')));
                        }
                    }
                    else { console.log(`Could not fetch resource at ${source}`); }
                }
            };
            xhr.open("GET", source);
            xhr.send();
        }
    }
    // Loads the specified image and invokes a callback when done.
    // The callback receives the loaded image as its parameter.
    function load_wallpaper(url, on_load)
    {
        DOM.wallpaper.addEventListener('load', () => on_load(DOM.wallpaper));
        DOM.wallpaper.src = url;
    }
    // Fades-in the wallpaper image over the specified duration (in seconds).
    function fade_in_wallpaper(duration)
    {
        if (duration > 0)
        {
            DOM.wallpaper.style.transition = `opacity ${duration}s ease`;

            // Allow the DOM some time to update before initiating animation,
            // otherwise it may be skipped.
            setTimeout(() =>
            {
                DOM.wallpaper.style.opacity = 1;
            }, 50);
        }
        else
        {
            DOM.wallpaper.style.opacity = 1;
        }
    }
    // Applies the specified options to the page.
    function apply_options(options)
    {
        if (!options.is_enabled || options.urls.length === 0) { return; }

        DOM.wallpaper    = new Image();
        DOM.wallpaper.id = "wallpaper";
        DOM.background.appendChild(DOM.wallpaper);

        select_wallpaper(options.urls, url =>
        {
            load_wallpaper(url, () =>
            {
                const scale_image =
                    scaling.hasOwnProperty(options.scaling) ?
                    scaling[options.scaling] : scaling.automatic;
                function update_wallpaper_scale()
                {
                    const bounds =
                    {
                        width:  window.innerWidth,
                        height: window.innerHeight
                    };
                    scale_image(DOM.wallpaper, bounds);
                }
                update_wallpaper_scale();
                window.addEventListener('resize', update_wallpaper_scale);

                fade_in_wallpaper(options.do_animate ? options.animation_duration : 0);
            });
            localStorage.setItem(PREVIOUS_WALLPAPER, url);
        });
    }

    function initialize()
    {
        DOM.background = document.getElementById('background');
    }

    define(["./rng", "./scaling"],
    function(rng_module, scaling_module)
    {
        rng     = rng_module;
        scaling = scaling_module;

        return {
            initialize: initialize,
            apply_options: apply_options
        };
    });
})();
