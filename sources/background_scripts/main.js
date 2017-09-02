requirejs.config(
{
    paths:
    {
        "common": "common/js",
    }
});
requirejs(["background_scripts/image_context_menu"]);

browser.runtime.onInstalled.addListener(details =>
{
    requirejs(["common/configuration"], configuration =>
    {
        const storage = configuration.storage;

        if (details.reason === "install")
        {
            storage.save(configuration.create_default());
        }
        else if (details.reason === "update")
        {
            storage.load().then(options =>
            {
                const version  = configuration.version;

                if (version.HAS_RELEASE_NOTES && options.notification.new_features)
                {
                    const v = version.CURRENT;
                    browser.tabs.create({
                        url: "https://rharel.github.io/webext-new-tab-tweaker/release-notes/" +
                             `${v.major}-${v.minor}/` +
                             `${v.major}-${v.minor}-${v.patch}${v.beta > 0 ? `b${v.beta}` : ""}.html`,
                        active: true
                    });
                }
                storage.save(configuration.update(options));
            });
        }
    });
});
