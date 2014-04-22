/*
 * Dropit v1.0
 * http://dev7studios.com/dropit
 *
 * Copyright 2012, Dev7studios
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

;(function($) {

    $.fn.dropit = function(method) {

        var methods = {

            init : function(options) {
                this.dropit.settings = $.extend({}, this.dropit.defaults, options);
                var dropdowns = this;
                return this.each(function() {
                    var $el = $(this),
                         el = this,
                         settings = $.fn.dropit.settings;
                    
                    // Hide initial submenus     
                    $el.addClass('dropit')
                    .find('>'+ settings.triggerParentEl +':has('+ settings.submenuEl +')').addClass('dropit-trigger')
                    .find(settings.submenuEl).addClass('dropit-submenu');
                    
                    // Open on click
                    $el.on(settings.action, settings.triggerParentEl +':has('+ settings.submenuEl +') > '+ settings.triggerEl +'', function(){
                        // Close if already opened
                        if($(this).parents(settings.triggerParentEl).hasClass('dropit-open') && settings.closeOnAction) {
                            settings.beforeHide.call(this);
                            $el.find('.dropit-open').removeClass('dropit-open');
                            settings.afterHide.call(this);
                            return false;
                        }
                        // Close all other oppened dropdowns if settings.keepOpen is false
                        if(settings.keepOpen === false) {
                            dropdowns.each(function() {
                                $(this).find('.dropit-trigger').removeClass('dropit-open');
                            });
                        }
                        settings.beforeShow.call(this);
                        $(this).parents(settings.triggerParentEl).addClass('dropit-open');
                        settings.afterShow.call(this);
                        return false;
                    });
                    
                    // Close if outside click
                    $(document).on('click', function(){
                        settings.beforeHide.call(this);
                        $('.dropit-open').removeClass('dropit-open');
                        settings.afterHide.call(this);
                    });
                    
                    settings.afterLoad.call(this);
                });
            }
            
        }

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error( 'Method "' +  method + '" does not exist in dropit plugin!');
        }

    }

    $.fn.dropit.defaults = {
        keepOpen: false, // Allow multiple opened dropdowns at the same time
        action: 'click', // The open action for the trigger
        closeOnAction: false, // Whether to close dropdown on defined action event if it's opened
        submenuEl: 'ul', // The submenu element
        triggerEl: 'a', // The trigger element
        triggerParentEl: 'li', // The trigger parent element
        afterLoad: function(){}, // Triggers when plugin has loaded
        beforeShow: function(){}, // Triggers before submenu is shown
        afterShow: function(){}, // Triggers after submenu is shown
        beforeHide: function(){}, // Triggers before submenu is hidden
        afterHide: function(){} // Triggers before submenu is hidden
    }

})(jQuery);