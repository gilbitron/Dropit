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
                return this.each(function() {
                    var $el = $(this),
                         el = this,
                         settings = $.fn.dropit.settings;
                    
                    // Hide initial submenus     
                    $el.addClass('dropit')
                    .find('>'+ settings.triggerParentEl +':has('+ settings.submenuEl +')').addClass('dropit-trigger')
                    .find(settings.submenuEl).addClass('dropit-submenu').hide();
                    
                    // Open on click
                    $el.on(settings.action, settings.triggerParentEl +':has('+ settings.submenuEl +') > '+ settings.triggerEl +'', function(){
                        if($(this).parents(settings.triggerParentEl).hasClass('dropit-open')) {
                            hide_menu(el, settings);
                            return false;
                        }
                        position_menu($el, settings.align);
                        settings.beforeHide.call(this);
                        $('.dropit-open').removeClass('dropit-open').find('.dropit-submenu').hide();
                        settings.afterHide.call(this);
                        settings.beforeShow.call(this);
                        $(this).parents(settings.triggerParentEl).addClass('dropit-open').find(settings.submenuEl).show();
                        settings.afterShow.call(this);
                        return false;
                    });
                    
                    // Close if outside click
                    $(document).on('click', function(){
                        settings.beforeHide.call(this);
                        $('.dropit-open').removeClass('dropit-open').find('.dropit-submenu').hide();
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
        action:          'click',       // The open action for the trigger
        submenuEl:       'ul',          // The submenu element
        triggerEl:       'a',           // The trigger element
        triggerParentEl: 'li',          // The trigger parent element
        align:           'left',        // alignment of menu relative to trigger
        afterLoad:       function(){},  // Triggers when plugin has loaded
        beforeShow:      function(){},  // Triggers before submenu is shown
        afterShow:       function(){},  // Triggers after submenu is shown
        beforeHide:      function(){},  // Triggers before submenu is hidden
        afterHide:       function(){}   // Triggers before submenu is hidden
    }

    $.fn.dropit.settings = {}

    function hide_menu ( el, settings ) {
        settings.beforeHide.call(el);
        $(el).find('.dropit-open').removeClass('dropit-open').find('.dropit-submenu').hide();
        settings.afterHide.call(el);
    };

    function position_menu ( $obj, alignment ) {
        var trigger_width = $obj.find('.dropit-trigger').outerWidth();
        var menu_width    = $obj.find('.dropit-submenu').outerWidth();
        $obj.find('.dropit-submenu').css('top', $obj.find('dropit-trigger').outerHeight() + 'px');
        switch (alignment) {
            case 'right':
                $obj.find('.dropit-submenu').css('left', (trigger_width - menu_width) + 'px');
                break;
            case 'left':
                $obj.find('.dropit-submenu').css('left', '0px');
                break;
            case 'center':
                $obj.find('.dropit-submenu').css('left', Math.floor((trigger_width - menu_width) / 2) + 'px');
                break;
        };
    };

})(jQuery);
