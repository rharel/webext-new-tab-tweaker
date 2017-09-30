(function()
{
    // Set in define().
    let Ordering;

    const configuration = {};

    // Version operations:
    {
        // Creates a new version identifier.
        function create(major, minor = 0, patch = 0, beta = 0)
        {
            return {
                major: major,
                minor: minor,
                patch: patch,
                beta : beta
            };
        }

        // Returns true iff the specified object is a (non-strict) positive integer.
        function is_positive_integer(obj)
        {
            return Number.isInteger(obj) && obj >= 0;
        }
        // Returns true iff the specified object is a valid version identifier.
        function is_valid(obj)
        {
            return (
                is_positive_integer(obj.major) &&
                is_positive_integer(obj.minor) &&
                is_positive_integer(obj.patch) &&
                is_positive_integer(obj.beta)
            );
        }

        // Returns an Ordering relating two version identifiers.
        function compare(a, b)
        {
            const components_a = [a.major, a.minor, a.patch, a.beta],
                  components_b = [b.major, b.minor, b.patch, b.beta];

            for (let i = 0; i < 4; ++i)
            {
                const component_a = components_a[i],
                      component_b = components_b[i];

                if      (component_a > component_b) { return Ordering.Greater; }
                else if (component_a < component_b) { return Ordering.Less;    }
            }
            return Ordering.Equal;
        }

        // Builds a string representation of the specified version identifier.
        function as_string(id, include_patch = true, include_beta = true)
        {
            let result = `${id.major}.${id.minor}`;

            if (include_patch)                { result += `.${id.patch}`; }
            if (include_beta && id.beta > 0)  { result += `b${id.beta}`;  }

            return result;
        }

        configuration.version =
        {
            CURRENT: create(1, 7, 0, 3),
            HAS_RELEASE_NOTES: false,

            create:    create,
            is_valid:  is_valid,
            compare:   compare,
            as_string: as_string
        };
    }
    // Storage layout:
    {
        const version = configuration.version;

        // Enumerates possible tab behaviors.
        const TabBehavior =
        {
            // Redirection to a specified URL.
            Redirect: "redirect",

            // Display of a custom page with user-specified background color and wallpaper image.
            DisplayCustomPage: "display-custom-page"
        };
        configuration.TabBehavior = TabBehavior;

        // Enumerates option-ui themes.
        const Theme =
        {
            Light: "light",
            Dark:  "dark"
        };
        configuration.Theme = Theme;

        // Enumerates (wallpaper) scaling methods.
        const Scaling =
        {
            // Chooses the best method based on the dimensions of the image vs. those of the screen.
            Automatic: "automatic",

            // Tightly fit inside bounds.
            Fit: "fit",

            // Fill bounds.
            Fill: "fill",

            // No scaling.
            None: "none",
        };
        configuration.Scaling = Scaling;

        // Enumerates top site visibility conditions.
        const TopSitesVisibility =
        {
            // Show always.
            Show: "show-always",

            // Show only after the user indicates so.
            ShowOnRequest: "show-on-request",

            // Hide always.
            Hide: "hide-always"
        };
        configuration.TopSitesVisibility = TopSitesVisibility;

        // The default configuration.
        configuration.create_default = function()
        {
            return {
                version: version.create(version.CURRENT.major, version.CURRENT.minor),

                notification:
                {
                    new_features: true
                },
                new_tab:
                {
                    behavior: TabBehavior.DisplayCustomPage,

                    redirect:
                    {
                        url: ""
                    },
                    custom_page:
                    {
                        background:
                        {
                            color: "#2d2d2d",

                            do_animate: true,
                            animation_duration: 0.5
                        },
                        wallpaper:
                        {
                            is_enabled: true,

                            urls: ["https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Pleiades_large.jpg/1280px-Pleiades_large.jpg"],

                            scaling: Scaling.Automatic,
                            do_animate: true,
                            animation_duration: 1.5
                        },
                        top_sites:
                        {
                            visibility: TopSitesVisibility.ShowOnRequest
                        }
                    }
                },
                options_ui:
                {
                    theme: Theme.Light
                }
            };
        };
    }
    // Updates:
    {
        const version   = configuration.version;
        const migration =
        {
            "1.4": cfg =>  // migrates 1.4 to 1.5
            {
                cfg.version = version.create(1, 5);

                const page = cfg.new_tab.custom_page;
                const bg   = page.background;
                const wp   = page.wallpaper;

                bg.do_animate         = bg.animation_duration > 0;
                bg.animation_duration = Math.max(bg.animation_duration, 0.1);

                wp.do_animate         = wp.animation_duration > 0;
                wp.animation_duration = Math.max(wp.animation_duration, 0.1);

                cfg.options_ui = { theme: configuration.Theme.Light };
            },
            "1.5": cfg => // migrates 1.5 to 1.6
            {
                cfg.version = version.create(1, 6);

                cfg.new_tab.custom_page.wallpaper.scaling = configuration.Scaling.Fit;
            },
            "1.6": cfg => // migrates 1.6 to 1.7
            {
                cfg.version = version.create(1, 7);

                cfg.new_tab.custom_page.top_sites.visibility =
                    configuration.TopSitesVisibility.ShowOnRequest;
            }
        };
        // Updates the configuration object layout.
        configuration.update = function(cfg)
        {
            let version_string = version.as_string(cfg.version, false, false);
            while (migration.hasOwnProperty(version_string))
            {
                migration[version_string](cfg);
                version_string = version.as_string(cfg.version, false, false);
            }
            cfg.version = version.create(
                version.CURRENT.major,
                version.CURRENT.minor
            );

            return cfg;
        };
    }
    // Read/write:
    {
        // The key to the configuration object in local storage.
        const KEY = "configuration@new-tab-tweaker";

        // Loads the configuration from storage asynchronously (returns a promise).
        //
        // Note: If no configuration object is detected, returns one with default values.
        function load()
        {
            return browser.storage.local.get(KEY).then(item =>
            {
                if (item.hasOwnProperty(KEY)) { return item[KEY];                      }
                else                          { return configuration.create_default(); }
            });
        }
        // Saves a configuration to storage asynchronously (returns a promise).
        function save(cfg)
        {
            const item = {};
            item[KEY] = cfg;

            return browser.storage.local.set(item);
        }

        configuration.storage =
        {
            KEY: KEY,

            load: load,
            save: save
        };
    }
    
    define(["./ordering"],
    function(ordering)
    {
        Ordering = ordering;

        return configuration;
    });
})();
