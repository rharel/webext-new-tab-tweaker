(function()
{
    define({
       setup: function()
       {
           const listeners = [];
           return {
               add:    function(listener) { listeners.push(listener);                  },
               notify: function()         { listeners.forEach(listener => listener()); }
           }
       }
    });
})();
