(function()
{
    define(["common_ui/animation_options"],
    function(animation_options)
    {
        return animation_options.setup_from_ids(
            'do-animate-wallpaper',         // activation checkbox
            'wallpaper-animation-duration'  // duration input
        );
    });
})();