(function()
{
    define({
        // Executes a target function after page load.
        do: function(target)
        {
            if (document.readyState === "complete") { target(); }
            else { window.addEventListener("load", target); }
        }
    });
})();
