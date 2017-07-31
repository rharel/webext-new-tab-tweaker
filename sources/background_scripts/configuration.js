NTT.Configuration = {};

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
		const Ordering     = NTT.Ordering;
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

	NTT.Configuration.Version =
	{
		CURRENT: create(1, 6, 0, 3),
		HAS_RELEASE_NOTES: false,

		create:    create,
		is_valid:  is_valid,
		compare:   compare,
		as_string: as_string
	};
}
// Storage layout:
{
	const Version = NTT.Configuration.Version;

	// Enumerates possible tab behaviors.
	const TabBehavior =
	{
		// Redirection to a specified URL.
		Redirect: "redirect",

		// Display of a custom page with user-specified background color and wallpaper image.
		DisplayCustomPage: "display-custom-page"
	};
	NTT.Configuration.TabBehavior = TabBehavior;

	// Enumerates option-ui themes.
	const Theme =
	{
		Light: "light",
		Dark:  "dark"
	};
	NTT.Configuration.Theme = Theme;

	// The default configuration.
	NTT.Configuration.create_default = function()
	{
		return {
			version: Version.create(Version.CURRENT.major, Version.CURRENT.minor),

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
						is_enabled: false,

						urls: [],

						do_animate: true,
						animation_duration: 1.5
					}
				}
			},
			options_ui:
			{
				theme: Theme.Light
			}
		};
	}
}
// Updates:
{
	const Version   = NTT.Configuration.Version;
	const migration =
	{
		"1.4": cfg =>  // migrates 1.4 to 1.5
		{
			cfg.version = Version.create(1, 5);

			const page = cfg.new_tab.custom_page;
			const bg   = page.background;
			const wp   = page.wallpaper;

			bg.do_animate         = bg.animation_duration > 0;
			bg.animation_duration = Math.max(bg.animation_duration, 0.1);

			wp.do_animate         = wp.animation_duration > 0;
			wp.animation_duration = Math.max(wp.animation_duration, 0.1);

			cfg.options_ui = { theme: NTT.Configuration.Theme.Light };
		}
	};
	// Updates the configuration object layout.
	function update(cfg)
	{
		let version_string = Version.as_string(cfg.version, false, false);
		while (migration.hasOwnProperty(version_string))
		{
			migration[version_string](cfg);
			version_string = Version.as_string(cfg.version, false, false);
		}
		cfg.version = Version.create(
			Version.CURRENT.major,
			Version.CURRENT.minor
		);

		return cfg;
	}
	NTT.Configuration.update = update;
}
// Read/write:
{
	// The key to the configuration object in local storage.
	const KEY = "configuration@new-tab-tweaker";
	const storage = browser.storage.local;

	// Loads the configuration from storage asynchronously (returns a promise).
	//
	// Note: If no configuration object is detected, returns one with default values.
	function load()
	{
		return storage.get(KEY).then(item =>
		{
			if (item.hasOwnProperty(KEY)) { return item[KEY];                          }
			else                          { return NTT.Configuration.create_default(); }
		});
	}
	// Saves a configuration to storage asynchronously (returns a promise).
	function save(cfg)
	{
		const item = {};
		item[KEY] = cfg;

		return storage.set(item);
	}

	NTT.Configuration.Storage =
	{
		KEY: KEY,

		load: load,
		save: save
	};
}
// Runtime event hookups:
{
	const Configuration = NTT.Configuration,
		  Storage       = NTT.Configuration.Storage;

	browser.runtime.onInstalled.addListener(details =>
	{
		if (details.reason === "install")
		{
			Storage.save(Configuration.create_default());
		}
		else if (details.reason === "update")
		{
			Storage.load().then(cfg =>
			{
				const Version  = NTT.Configuration.Version;

				if (Version.HAS_RELEASE_NOTES && cfg.notification.new_features)
				{
					const v = Version.CURRENT;
					browser.tabs.create({
						url: "https://rharel.github.io/webext-new-tab-tweaker/release-notes/" +
						     `${v.major}-${v.minor}/` +
						     `${v.major}-${v.minor}-${v.patch}${v.beta > 0 ? `b${v.beta}` : ""}.html`,
						active: true
					});
				}
				Storage.save(Configuration.update(cfg));
			});
		}
	});
}
