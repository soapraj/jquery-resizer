// jQuery Resizer Plugin
// Supports vertical resizing of DIV elements
// 05/01/2014
// by Raghunandan Balachandran

(function($) {

    $.fn.resizer = function(method) {
        var currentElement;

        var methods = {

            init : function(options) {
                this.resizer.settings = $.extend({}, this.resizer.defaults, options);
                return this.each(function() {
                    // reference to the jQuery version of the current DOM element
                    currentElement = $(this).find(".resize-handle");

                    if(!currentElement.length){
                        currentElement = $("<div class='resize-handle'></div>").appendTo($(this));
                    }
                    $(currentElement).mousedown(function(event){
                        event.preventDefault();
                        currentElement = $(this);
                        $(this).data("resize-data", {
                            "startY" : event.pageY,
                            "startHeight" : $(currentElement).parent().height()
                        });
                        $(document).on('mousemove.resize', helpers.mouseMoveHandler);
                        $(document).on('mouseup.resize', helpers.mouseUpHandler);
                    });
                });
            }
        }

        var helpers = {
            mouseMoveHandler: function (event) {
                event.preventDefault();
                var newHeight = $(currentElement).data("resize-data").startHeight + (event.pageY - $(currentElement).data("resize-data").startY);
                $(currentElement).parent().css("height", newHeight + "px");
            },

            mouseUpHandler: function (event) {
                currentElement = null;
                $(document).off('mousemove.resize', helpers.mouseMoveHandler);
                $(document).off('mouseup.resize', helpers.mouseUpHandler);
            }
        }

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error( 'Method "' +  method + '" does not exist in resizer plugin!');
        }

    }

    $.fn.resizer.defaults = {
        foo: 'bar'
    }

    $.fn.resizer.settings = {}

})(jQuery);
