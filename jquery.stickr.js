/*
 *  Stickr.js - v1.0.0
 *  Contained Sticky Scrolling jQuery Plugin.
 *  http://banago.github.io/Stickr.js/
 *
 *  @author Baki Goxhaj
 *  @license MIT License
 */
;(function ( $, window, document, undefined ) {

	"use strict";

		// Create the defaults once
		var pluginName = "stickr",
			defaults = {
        		easing: 'swing',
        		duration: 500,
        		closeButton: false,
        		closeChar: 'ⓧ',
        		closeTop: 0,
        		closeRight: 0,
        		closest: null,
        		offsetTop: 0,
        		offsetBottom: 0,
        		queue: false
            };

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
				init: function () {
                				  
                	var s = this.settings,
                	    el = $(this.element),
                	    namespace = el.prop('id').replace('-','') || 'stickr',
                	    parentEl = s.closest ? el.closest(s.closest) : el.parent(),
                	    relativeOffset = (el.offset().top - parentEl.offset().top) - s.offsetTop;
                	
                    el.css('position', 'relative');           		                	
                	
                  	if(s.closeButton === true)
                	{
                		el.append('<a class="close">' + s.closeChar + '</a>');
                		el.find('.close').css({ 'position': 'absolute', 'top': s.closeTop + 'px', 'right': s.closeTop + 'px' });
                		
                		el.find('.close').on('click', function() {
                			el.animate({ top: "0px" }, { queue: s.queue, easing: s.easing, duration: s.duration });
                			$(window).off('scroll.' + namespace);
                			$(this).remove();
                		});
                	}

                    $(window).on('scroll.' + namespace, function(e) 
                    {
                        if($(window).scrollTop() > (parentEl.offset().top + relativeOffset) && ((parentEl.height() + parentEl.position().top) + s.offsetBottom) > ($(window).scrollTop() + el.height()))
                        {
                            if ( s.duration === 0 ) 
                            {
                                el.css( 'top', ($(window).scrollTop() - (parentEl.offset().top + relativeOffset)) + "px" );
                            }
                            else 
                            {
                            	el.animate({ top: ($(window).scrollTop() - (parentEl.offset().top + relativeOffset)) + "px" }, { queue: s.queue, easing: s.easing, duration: s.duration });
                            }
                        }
                        else if($(window).scrollTop() < parentEl.offset().top)
                        {
                            el.animate({ top: "0px" }, { queue: s.queue, easing: s.easing, duration: s.duration });
                        }
                	});
				}
		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
		};

})( jQuery, window, document );
