/*
 * This file is part of the Fxp package.
 *
 * (c) François Pluchino <francois.pluchino@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import pluginify from '@fxp/jquery-pluginify';
import {onClick} from "./utils/events";

/**
 * Defaults options.
 */
const DEFAULTS = {
    rippleSelector: null,
    rippleTheme: null
};

/**
 * Ripple class.
 */
export default class Ripple
{
    /**
     * Constructor.
     *
     * @param {HTMLElement} element The DOM element
     * @param {object}      options The options
     */
    constructor(element, options = {}) {
        this.guid     = $.guid;
        this.options  = $.extend(true, {}, DEFAULTS, options);
        this.$element = $(element);

        if ('' === this.options.rippleSelector) {
            this.options.rippleSelector = null;
        }

        this.$element.on('click.fxp.ripple' + this.guid, this.options.rippleSelector, this, onClick);
    }

    /**
     * Destroy the instance.
     */
    destroy() {
        let self = this,
            $targets = null !== this.options.rippleSelector ? $(this.options.rippleSelector, this.$element)
                : this.$element;

        this.$element.off('click.fxp.ripple' + this.guid, this.options.rippleSelector, onClick);

        $targets.each(function (index) {
            let $target = $targets.eq(index);
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

        this.$element.removeData('fxp.ripple');
    }
}

pluginify('ripple', 'fxp.ripple', Ripple, true, '[data-ripple]');
