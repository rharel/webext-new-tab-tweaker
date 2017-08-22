(function()
{
    define({
       setup: function()
       {
           const listeners = [];
           function add(listener)
           {
               listeners.push(listener);
           }
           function notify()
           {
               listeners.forEach(listener => listener());
           }
           return {
               add:    add,//function(listener) { listeners.push(listener);                  },
               notify: notify,//function()         { listeners.forEach(listener => listener()); }
           }
       }
    });
})();
