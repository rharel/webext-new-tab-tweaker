(function()
{
    // Scales the image so that it fits tightly in the specified bounds.
    function fit(image, bounds)
    {
        const bounds_aspect_ratio = bounds.width       / bounds.height;
        const image_aspect_ratio  = image.naturalWidth / image.naturalHeight;

        if (bounds_aspect_ratio > image_aspect_ratio)
        {
            image.classList.remove('wide');
            image.classList.add('tall');
        }
        else
        {
            image.classList.remove('tall');
            image.classList.add('wide');
        }
    }
    // Scales the image so that it fills the specified bounds.
    function fill(image, bounds)
    {
        const bounds_aspect_ratio = bounds.width       / bounds.height;
        const image_aspect_ratio  = image.naturalWidth / image.naturalHeight;

        if (bounds_aspect_ratio > image_aspect_ratio)
        {
            image.classList.remove('tall');
            image.classList.add('wide');
        }
        else
        {
            image.classList.remove('wide');
            image.classList.add('tall');
        }
    }

    define({ fit: fit, fill: fill });
})();
