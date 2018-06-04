/*
 * This file is part of the Fxp package.
 *
 * (c) François Pluchino <francois.pluchino@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Display the ripple effect on click event.
 *
 * @param {jQuery.Event|Event} event
 */
export function onClick(event) {
    let self = event.data,
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
