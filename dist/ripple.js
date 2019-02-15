var FxpRipple = (function (exports, $$1) {
  'use strict';

  $$1 = $$1 && $$1.hasOwnProperty('default') ? $$1['default'] : $$1;

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  /**
   * Define the class as Jquery plugin.
   *
   * @param {String}      pluginName  The name of jquery plugin defined in $.fn
   * @param {String}      dataName    The key name of jquery data
   * @param {function}    ClassName   The class name
   * @param {boolean}     [shorthand] Check if the shorthand of jquery plugin must be added
   * @param {String|null} dataApiAttr The DOM data attribute selector name to init the jquery plugin with Data API, NULL to disable
   * @param {String}      removeName  The method name to remove the plugin data
   */

  function pluginify (pluginName, dataName, ClassName) {
    var shorthand = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var dataApiAttr = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var removeName = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'destroy';
    var old = $$1.fn[pluginName];

    $$1.fn[pluginName] = function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var resFunc, resList;
      resList = this.each(function (i, element) {
        var $this = $$1(element),
            data = $this.data(dataName);

        if (!data) {
          data = new ClassName(element, _typeof(options) === 'object' ? options : {});
          $this.data(dataName, data);
        }

        if (typeof options === 'string' && data) {
          if (data[options]) {
            resFunc = data[options].apply(data, args);
            resFunc = resFunc !== data ? resFunc : undefined;
          } else if (data.constructor[options]) {
            resFunc = data.constructor[options].apply(data, args);
            resFunc = resFunc !== data ? resFunc : undefined;
          }

          if (options === removeName) {
            $this.removeData(dataName);
          }
        }
      });
      return 1 === resList.length && undefined !== resFunc ? resFunc : resList;
    };

    $$1.fn[pluginName].Constructor = ClassName; // Shorthand

    if (shorthand) {
      $$1[pluginName] = function (options) {
        return $$1({})[pluginName](options);
      };
    } // No conflict


    $$1.fn[pluginName].noConflict = function () {
      return $$1.fn[pluginName] = old;
    }; // Data API


    if (null !== dataApiAttr) {
      $$1(window).on('load', function () {
        $$1(dataApiAttr).each(function () {
          var $this = $$1(this);
          $$1.fn[pluginName].call($this, $this.data());
        });
      });
    }
  }

  var DEFAULT_OPTIONS = {};
  /**
   * Base class for plugin.
   */

  var BasePlugin =
  /*#__PURE__*/
  function () {
    /**
     * Constructor.
     *
     * @param {HTMLElement} element The DOM element
     * @param {object}      options The options
     */
    function BasePlugin(element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, BasePlugin);

      this.guid = $$1.guid;
      this.options = $$1.extend(true, {}, this.constructor.defaultOptions, options);
      this.$element = $$1(element);
    }
    /**
     * Destroy the instance.
     */


    _createClass(BasePlugin, [{
      key: "destroy",
      value: function destroy() {
        var self = this;
        Object.keys(self).forEach(function (key) {
          delete self[key];
        });
      }
      /**
       * Set the default options.
       * The new values are merged with the existing values.
       *
       * @param {object} options
       */

    }], [{
      key: "defaultOptions",
      set: function set(options) {
        DEFAULT_OPTIONS[this.name] = $$1.extend(true, {}, DEFAULT_OPTIONS[this.name], options);
      }
      /**
       * Get the default options.
       *
       * @return {object}
       */
      ,
      get: function get() {
        if (undefined === DEFAULT_OPTIONS[this.name]) {
          DEFAULT_OPTIONS[this.name] = {};
        }

        return DEFAULT_OPTIONS[this.name];
      }
    }]);

    return BasePlugin;
  }();

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

  /**
   * Ripple class.
   */

  var Ripple =
  /*#__PURE__*/
  function (_BasePlugin) {
    _inherits(Ripple, _BasePlugin);

    /**
     * Constructor.
     *
     * @param {HTMLElement} element The DOM element
     * @param {object}      options The options
     */
    function Ripple(element) {
      var _this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Ripple);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Ripple).call(this, element, options));

      if ('' === _this.options.rippleSelector) {
        _this.options.rippleSelector = null;
      }

      _this.$element.on('click.fxp.ripple' + _this.guid, _this.options.rippleSelector, _assertThisInitialized(_assertThisInitialized(_this)), onClick);

      return _this;
    }
    /**
     * Destroy the instance.
     */


    _createClass(Ripple, [{
      key: "destroy",
      value: function destroy() {
        var self = this,
            $targets = null !== this.options.rippleSelector ? $$1(this.options.rippleSelector, this.$element) : this.$element;
        this.$element.off('click.fxp.ripple' + this.guid, this.options.rippleSelector, onClick);
        $targets.each(function (index) {
          var $target = $targets.eq(index);
          $$1('> .ripple', $target).remove();
          $target.removeClass('ripple-action');

          if (null !== self.options.rippleTheme) {
            $target.removeClass('ripple-' + self.options.rippleTheme);
          }

          if (undefined !== $target.data('ripple-clear')) {
            window.clearTimeout($target.data('ripple-clear'));
            $target.removeData('ripple-clear');
          }
        });

        _get(_getPrototypeOf(Ripple.prototype), "destroy", this).call(this);
      }
    }]);

    return Ripple;
  }(BasePlugin);
  Ripple.defaultOptions = {
    rippleSelector: null,
    rippleTheme: null
  };
  pluginify('ripple', 'fxp.ripple', Ripple, true, '[data-ripple]');

  exports.default = Ripple;

  return exports;

}({}, jQuery));
