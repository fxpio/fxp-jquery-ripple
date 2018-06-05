/*
 * This file is part of the Fxp package.
 *
 * (c) François Pluchino <francois.pluchino@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import pluginify from '@fxp/jquery-pluginify';
import BasePlugin from '@fxp/jquery-pluginify/js/plugin';
import {onClick} from "./utils/events";
import $ from "jquery";

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
export default class Ripple extends BasePlugin
{
    /**
     * Constructor.
     *
     * @param {HTMLElement} element The DOM element
     * @param {object}      options The options
     */
    constructor(element, options = {}) {
        super(element, $.extend(true, {}, DEFAULTS, options));

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

        super.destroy();
    }
}

pluginify('ripple', 'fxp.ripple', Ripple, true, '[data-ripple]');
