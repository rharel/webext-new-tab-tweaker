(function() {
    // Set in define().
    let configuration, rng;

    // This will contain DOM elements proceeding a call to initialize().
    const DOM =
    {
        background: null,
        wallpaper:  null,

        customize_page_button: null
    };
    // The storage key associated with the URL of the last picked wallpaper.
    //
    // It is used to avoid displaying the same wallpaper consecutively, when the wallpaper URL list
    // contains more than one item.
    const PREVIOUS_WALLPAPER = "previous-wallpaper@new-tab-tweaker";

    // Fades-in the background color over the specified duration (in seconds).
    function fade_in_background(color, duration)
    {
        if (duration > 0)
        {
            DOM.background.style.transition =
                `background-color ${duration}s ease`;

            // Allow the DOM some time to update before initiating animation,
            // otherwise it may be skipped.
            setTimeout(() =>
            {
                DOM.background.style.backgroundColor = color;
            }, 50);
        }
        else
        {
            DOM.background.style.backgroundColor = color;
        }
    }

    // Returns true if the given URL points to an image.
    function is_image(url)
    {
        return url.startsWith("data:") ||
               /\.(bmp|gif|jpg|jpeg|png|svg)$/.test(url);
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

        const source = select_random_item(urls);
        if (is_image(source)) { on_success(source); }
        else
        {
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
                        if (content_type !== "text/plain")
                        {
                            console.log(`Expected text/plain response from ${source},` +
                                        `got ${content_type} instead.`);
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
    // Re-sizes the wallpaper image so that it is as large possible without exceeding the current
    // window's bounds.
    function fit_wallpaper_to_window()
    {
        const window_aspect_ratio    = window.innerWidth / window.innerHeight;
        const wallpaper_aspect_ratio = DOM.wallpaper.naturalWidth / DOM.wallpaper.naturalHeight;

        if (window_aspect_ratio > wallpaper_aspect_ratio)
        {
            DOM.wallpaper.classList.remove('wide');
            DOM.wallpaper.classList.add('tall');
        }
        else
        {
            DOM.wallpaper.classList.remove('tall');
            DOM.wallpaper.classList.add('wide');
        }
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

    // Applies the specified configuration to the page.
    function apply_options(options)
    {
        const TabBehavior = configuration.TabBehavior;

        if (options.new_tab.behavior === TabBehavior.Redirect &&
            options.new_tab.redirect.url !== window.location)
        {
            let url = options.new_tab.redirect.url;

            if (!url.startsWith("http://") &&
                !url.startsWith("https://"))
            {
                url = `http://${url}`
            }

            window.location.replace(url);
        }
        else if (options.new_tab.behavior === TabBehavior.DisplayCustomPage)
        {
            const bg = options.new_tab.custom_page.background;
            fade_in_background(bg.color, bg.do_animate ? bg.animation_duration : 0);

            const wp = options.new_tab.custom_page.wallpaper;
            if (!wp.is_enabled || wp.urls.length === 0) { return; }

            DOM.wallpaper = new Image();
            DOM.wallpaper.id  = "wallpaper";
            DOM.wallpaper.src = "/icons/main_128.png";
            DOM.background.appendChild(DOM.wallpaper);

            select_wallpaper(wp.urls, url =>
            {
                load_wallpaper(url, () =>
                {
                    fit_wallpaper_to_window();
                    fade_in_wallpaper(wp.do_animate ? wp.animation_duration : 0);

                    window.addEventListener('resize', () =>
                    {
                        fit_wallpaper_to_window();
                    });
                });
                localStorage.setItem(PREVIOUS_WALLPAPER, url);
            });
        }
    }
    function initialize()
    {
        DOM.background = document.getElementById('background');
        DOM.wallpaper  = document.getElementById('wallpaper');

        configuration.storage.load().then(apply_options);

        DOM.customize_page_button = document.getElementById('customize-button');
        DOM.customize_page_button.addEventListener('click', () =>
        {
            browser.runtime.openOptionsPage();
        });
    }

    requirejs.config(
    {
        paths:
        {
            "common": "../../../common/js",
        }
    });
    define(
    [
        "common/after_page_load",
        "common/configuration",

        "./rng"
    ],
    function(after_page_load,
             configuration_module,
             rng_module)
    {
        configuration = configuration_module;
        rng           = rng_module;

        after_page_load.do(initialize);
    });
})();
