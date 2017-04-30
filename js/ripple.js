/*
 * This file is part of the Sonatra package.
 *
 * (c) François Pluchino <francois.pluchino@sonatra.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/*global define*/
/*global jQuery*/
/*global window*/

/**
 * @param {jQuery} $
 */
(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    /**
     * Display the ripple effect on click event.
     *
     * @param {jQuery.Event|Event} event
     *
     * @private
     */
    function onClick(event) {
        var self = event.data,
            $target = $(event.currentTarget),
            $ripple = $('> .ripple', $target),
            clearRipple = $target.data('ripple-clear'),
            size,
            duration,
            zindex;

        if (undefined !== clearRipple) {
            window.clearTimeout(clearRipple);
            $target.removeData('ripple-clear');
        }

        if (0 === $ripple.length) {
            $ripple = $('<span class="ripple"></span>');

            $target.append($ripple);
        } else {
            $target.removeClass("ripple-action");
        }

        if (!$ripple.width() && !$ripple.height()) {
            size = Math.max($target.outerWidth(), $target.outerHeight());
            $ripple.css({
                height: size,
                width: size
            });
        }

        if (null !== self.options.rippleTheme) {
            $target.addClass('ripple-' + self.options.rippleTheme);
        }

        $ripple.css({
            left: event.pageX - $target.offset().left - $ripple.width() / 2 + 'px',
            top: event.pageY - $target.offset().top - $ripple.height() / 2
        });

        zindex = parseInt($target.css('z-index'), 10);
        $target.css('z-index', isNaN(zindex) ? 0 : zindex);
        $target.addClass("ripple-action");

        duration = parseFloat($ripple.css('animation-duration')) * 1000;
        $target.data('ripple-clear', window.setTimeout(function () {
            $ripple.remove();
            $target.removeClass('ripple-action');
            $target.css('z-index', '');

            if (null !== self.options.rippleTheme) {
                $target.removeClass('ripple-' + self.options.rippleTheme);
            }
        }, duration));
    }

    // RIPPLE CLASS DEFINITION
    // =======================

    /**
     * @constructor
     *
     * @param {string|elements|object|jQuery} element
     * @param {object}                        options
     *
     * @this Ripple
     */
    var Ripple = function (element, options) {
        this.guid     = $.guid;
        this.options  = $.extend(true, {}, Ripple.DEFAULTS, options);
        this.$element = $(element);

        if ('' === this.options.rippleSelector) {
            this.options.rippleSelector = null;
        }

        this.$element.on('click.st.ripple' + this.guid, this.options.rippleSelector, this, onClick);
    },
        old;

    /**
     * Defaults options.
     *
     * @type Array
     */
    Ripple.DEFAULTS = {
        rippleSelector: null,
        rippleTheme: null
    };

    /**
     * Destroy instance.
     *
     * @this Ripple
     */
    Ripple.prototype.destroy = function () {
        var self = this,
            $targets = null !== this.options.rippleSelector ? $(this.options.rippleSelector, this.$element)
                : this.$element;

        this.$element.off('click.st.ripple' + this.guid, this.options.rippleSelector, onClick);

        $targets.each(function (index) {
            var $target = $targets.eq(index);
            $('> .ripple', $target).remove();
            $target.removeClass('ripple-action');

            if (null !== self.options.rippleTheme) {
                $target.removeClass('ripple-' + self.options.rippleTheme);
            }

            if (undefined !== $target.data('ripple-clear')) {
                window.clearTimeout($target.data('ripple-clear'));
                $target.removeData('ripple-clear');
            }
        });

        this.$element.removeData('st.ripple');
    };


    // RIPPLE PLUGIN DEFINITION
    // ========================

    function Plugin(option) {
        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {
            var $this   = $(this),
                data    = $this.data('st.ripple'),
                options = typeof option === 'object' && option;

            if (!data && option === 'destroy') {
                return;
            }

            if (!data) {
                data = new Ripple(this, options);
                $this.data('st.ripple', data);
            }

            if (typeof option === 'string') {
                data[option].apply(data, args);
            }
        });
    }

    old = $.fn.ripple;

    $.fn.ripple             = Plugin;
    $.fn.ripple.Constructor = Ripple;


    // RIPPLE NO CONFLICT
    // ==================

    $.fn.ripple.noConflict = function () {
        $.fn.ripple = old;

        return this;
    };


    // RIPPLE DATA-API
    // ===============

    $(window).on('load', function () {
        $('[data-ripple]').each(function () {
            var $this = $(this);
            Plugin.call($this, $this.data());
        });
    });

}));
