(function()
{
    define(["animation_options"],
    function(animation_options)
    {
        return animation_options.setup_from_ids(
            'do-animate-bg-color',         // activation checkbox
            'bg-color-animation-duration'  // duration input
        );
    });
})();
