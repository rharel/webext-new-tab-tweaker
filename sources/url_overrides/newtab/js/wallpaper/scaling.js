(function()
{
    // No scaling, image is centered.
    function do_not_scale(image)
    {
        image.className    = "";
        image.style.width  = `${image.naturalWidth}px`;
        image.style.height = `${image.naturalHeight}px`;
    }

    // Scales the image so that it fits tightly in the specified bounds.
    function fit(image, bounds)
    {
        const bounds_aspect_ratio = bounds.width       / bounds.height,
              image_aspect_ratio  = image.naturalWidth / image.naturalHeight;

        if (bounds_aspect_ratio >
            image_aspect_ratio) { image.className = "tall"; }
        else                    { image.className = "wide"; }
    }
    // Scales the image so that it fills the specified bounds.
    function fill(image, bounds)
    {
        const bounds_aspect_ratio = bounds.width       / bounds.height,
              image_aspect_ratio  = image.naturalWidth / image.naturalHeight;

        if (bounds_aspect_ratio >
            image_aspect_ratio) { image.className = "wide"; }
        else                    { image.className = "tall"; }
    }

    // If the difference between the wallpaper's and screen's aspect ratios is less than this, then
    // they should be considered 'close enough' to each other to use fill-scaling.
    const ASPECT_RATIO_SIMILARITY_THRESHOLD = 0.5;
    // If a fit/fill scaling would cause the image to be enlarged by more than this factor,
    // then it is best to use no scaling at all.
    const MAXIMUM_SCALING_THRESHOLD = 1.5;

    // Chooses the best method based on the relation between image dimensions and the specified
    // bounds.
    function auto_scale(image, bounds)
    {
        const aspect_ratio_difference = Math.abs(
            (bounds.width       / bounds.height      ) -
            (image.naturalWidth / image.naturalHeight)
        );
        if (aspect_ratio_difference <
            ASPECT_RATIO_SIMILARITY_THRESHOLD) { fill(image, bounds); }
        else                                   { fit(image, bounds);  }

        const scaling_factor = image.className === "wide" ?
                               bounds.width  / image.naturalWidth :
                               bounds.height / image.naturalHeight;
        if (scaling_factor > MAXIMUM_SCALING_THRESHOLD)
        {
            do_not_scale(image);
        }
    }

    define({
        none:      do_not_scale,
        fit:       fit,
        fill:      fill,
        automatic: auto_scale
    });
})();
