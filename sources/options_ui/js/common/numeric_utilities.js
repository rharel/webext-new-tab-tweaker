(function()
{
    // Clamps a value to an interval [min, max].
    function clamp(value, min, max)
    {
        return Math.min(Math.max(value, min), max);
    }
    define({ clamp: clamp });
})();
