function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var decimal_js = require('decimal.js');

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".input-numeric {\n  display: inline-flex;\n  align-items: center;\n  color: black; }\n  .input-numeric * {\n    box-sizing: border-box; }\n  .input-numeric button,\n  .input-numeric input {\n    color: inherit;\n    font-size: inherit;\n    border: 1px solid #C0C0C0;\n    border-radius: 3px;\n    cursor: pointer; }\n    .input-numeric button:hover:not(:disabled),\n    .input-numeric input:hover:not(:disabled) {\n      border-color: #9a9a9a; }\n    .input-numeric button:disabled,\n    .input-numeric input:disabled {\n      border-color: #cdcdcd;\n      color: #C0C0C0; }\n  .input-numeric button {\n    height: 25px;\n    width: 25px;\n    padding: 0;\n    background: #E1E1E1;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none; }\n    .input-numeric button:hover:not(:disabled) {\n      background: #d9d9d9; }\n    .input-numeric button:disabled {\n      background: #eeeeee; }\n  .input-numeric button:first-of-type {\n    margin: 0 1px 0 0; }\n  .input-numeric button:last-of-type {\n    margin: 0 0 0 1px; }\n  .input-numeric input {\n    height: 25px;\n    width: 45px;\n    padding: 0 10px;\n    background: #FFFFFF;\n      text-align: center; }\n  .input-numeric input {\n    -webkit-appearance: textfield;\n       -moz-appearance: textfield;\n            appearance: textfield; }\n    .input-numeric input::-webkit-inner-spin-button, .input-numeric input::-webkit-outer-spin-button {\n      -webkit-appearance: none;\n              appearance: none; }\n";
styleInject(css);

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var propTypes = {
	value: PropTypes.number.isRequired,
	max: PropTypes.number,
	min: PropTypes.number,
	decimals: PropTypes.number,
	step: PropTypes.number,
	name: PropTypes.string,
	disabled: PropTypes.bool,
	showButtons: PropTypes.bool,
	showTrailingZeros: PropTypes.bool,
	snapToStep: PropTypes.bool,
	onBlur: PropTypes.func,
	onChange: PropTypes.func,
	onFocus: PropTypes.func
};

var defaultProps = {
	max: null,
	min: null,
	decimals: 2,
	step: 1,
	name: null,
	disabled: false,
	showButtons: true,
	showTrailingZeros: false,
	snapToStep: false,
	onBlur: null,
	onChange: null,
	onFocus: null
};

var InputNumeric = function (_Component) {
	inherits(InputNumeric, _Component);
	createClass(InputNumeric, null, [{
		key: 'applyOptions',

		/**
   * Transform value according to props:
   * - Make sure it the Decimal lies between props.min and props.max (if specified)
   * - Snap manually entered Decimals to the nearest step (if specified)
   * @param {Decimal} newValue - value to be transformed
   * @param {object} props
   */
		value: function applyOptions(newValue, props) {
			var transformedValue = newValue;

			// Make sure value is in specified range (between min and max)
			if (props.min !== null && transformedValue.lessThanOrEqualTo(props.min)) {
				// Value is min or smaller: set to min
				return new decimal_js.Decimal(props.min);
			} else if (props.max !== null && transformedValue.greaterThanOrEqualTo(props.max)) {
				// Value is max or larger: set to max
				return new decimal_js.Decimal(props.max);
			}

			// Snap to step if option is enabled
			if (props.snapToStep === true) {
				transformedValue = transformedValue.toNearest(props.step);
			}

			return transformedValue;
		}
	}]);

	function InputNumeric(props) {
		classCallCheck(this, InputNumeric);

		var _this = possibleConstructorReturn(this, (InputNumeric.__proto__ || Object.getPrototypeOf(InputNumeric)).call(this, props));

		_this.mouseDownDelay = 250; // duration until mouseDown is treated as such (instead of click)
		_this.mouseDownInterval = 75; // interval for increasing/decreasing value on mouseDown

        var value = new decimal_js.Decimal(_this.props.value);
        var disablePlusButton = this.props.value === this.props.max;
        var disableMinusButton = this.props.value === this.props.min;
		_this.state = {
			value: value, // final, validated number (Decimal)
            valueEntered: null, // unvalidated number displayed while editing input (null or String)
            disablePlusButton,
            disableMinusButton,
		};
		return _this;
	}

	/**
  * Validate programmatically changed values
  */


	createClass(InputNumeric, [{
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			// Check whether value is a number
			var newValue = void 0;
			try {
				newValue = new decimal_js.Decimal(this.props.value);
			} catch (e) {
				return;
			}

			// Only perform validation if the entered value is different than the one stored in state
			if (!newValue.equals(this.state.value)) {
				var transformedValue = InputNumeric.applyOptions(newValue, this.props);
				this.setState({
					value: transformedValue,
					valueEntered: null
				});
				if (this.props.onChange) {
					this.props.onChange(transformedValue.toNumber());
				}
			}
		}
	}, {
		key: 'onInputChange',
		value: function onInputChange(e) {
			// Temporarily save the new value entered in the input field
			this.setState({
				valueEntered: e.target.value
			});
		}
	}, {
		key: 'onInputBlur',
		value: function onInputBlur() {
			// Reset input field if value is not a number
			var valueEntered = void 0;
			try {
				valueEntered = new decimal_js.Decimal(this.state.valueEntered);
			} catch (e) {
				this.setState({
					valueEntered: null
				});
				return;
			}

			// Transform and save valueEntered according to props, execute onChange and onBlur from props
			var value = InputNumeric.applyOptions(valueEntered, this.props);
			this.setState({
				value: value,
				valueEntered: null
			});
			if (this.props.onChange) {
				this.props.onChange(value.toNumber());
			}
			if (this.props.onBlur) {
				this.props.onBlur(value.toNumber());
			}
		}
	}, {
		key: 'onInputFocus',
		value: function onInputFocus() {
			if (this.props.onFocus) {
				this.props.onFocus(this.state.value.toNumber());
			}
		}

		/**
   * Decrement the input field's value by one step (this.props.step)
   */

	}, {
		key: 'decrement',
		value: function decrement() {
			var oldValue = this.state.value;
			var newValue = void 0;
			if (oldValue.modulo(this.props.step).isZero()) {
				// If current value is divisible by step: Subtract step
				newValue = InputNumeric.applyOptions(oldValue.minus(this.props.step), this.props);
			} else {
				// If current value is not divisible by step: Round to nearest lower multiple of step
				newValue = oldValue.toNearest(this.props.step, decimal_js.Decimal.ROUND_DOWN);
            }
            var disableMinusButton = newValue.toNumber() === this.props.min;
            var disablePlusButton = newValue.toNumber() === this.props.max;
			this.setState({
				value: newValue,
                valueEntered: null,
                disableMinusButton,
                disablePlusButton
			});
			if (this.props.onChange) {
				this.props.onChange(newValue.toNumber());
			}
		}

		/**
   * Increment the input field's value by one step (this.props.step)
   */

	}, {
		key: 'increment',
		value: function increment() {
			var oldValue = this.state.value;
			var newValue = void 0;
			if (oldValue.modulo(this.props.step).isZero()) {
				// If current value is divisible by step: Add step
				newValue = InputNumeric.applyOptions(oldValue.plus(this.props.step), this.props);
			} else {
				// If current value is not divisible by step: Round to nearest higher multiple of step
				newValue = oldValue.toNearest(this.props.step, decimal_js.Decimal.ROUND_UP);
            }
            var disableMinusButton = newValue.toNumber() === this.props.min;
            var disablePlusButton = newValue.toNumber() === this.props.max;

			this.setState({
				value: newValue,
                valueEntered: null,
                disableMinusButton,
                disablePlusButton
			});
			if (this.props.onChange) {
				this.props.onChange(newValue.toNumber());
			}
		}

		/**
   * Start an interval in which the input field's value is repeatedly decremented
   */

	}, {
		key: 'startDecrement',
		value: function startDecrement() {
			var _this2 = this;

			this.decrement();
			this.timeout = setTimeout(function () {
				_this2.interval = setInterval(function () {
					_this2.decrement();
				}, _this2.mouseDownInterval);
			}, this.mouseDownDelay);
		}

		/**
   * Start an interval in which the input field's value is repeatedly incremented
   */

	}, {
		key: 'startIncrement',
		value: function startIncrement() {
			var _this3 = this;

			this.increment();
			this.timeout = setTimeout(function () {
				_this3.interval = setInterval(function () {
					_this3.increment();
				}, _this3.mouseDownInterval);
			}, this.mouseDownDelay);
		}

		/**
   * Stop the decrement/increment interval and execute the onChange() and onBlur() functions
   */

	}, {
		key: 'stop',
		value: function stop() {
			if (this.timeout || this.interval) {
				if (this.timeout) {
					clearTimeout(this.timeout);
					this.timeout = null;
				}
				if (this.interval) {
					clearInterval(this.interval);
					this.interval = null;
				}
				if (this.props.onBlur) {
					this.props.onBlur(this.state.value.toNumber());
				}
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			// Determine value to be displayed in the input field
			var displayedValue = void 0;
			if (this.state.valueEntered != null) {
				// Display entered (non-validated) value while input field is being edited
				displayedValue = this.state.valueEntered;
			} else if (this.props.showTrailingZeros === true) {
				// Add trailing zeros if option is enabled
				displayedValue = this.state.value.toFixed(this.props.decimals);
			} else {
				// Round to specified number of decimals
				displayedValue = this.state.value.toDecimalPlaces(this.props.decimals);
			}

			var decrementButton = React__default.createElement(
				'button',
				{
					type: 'button',
					disabled:  _this4.state.disableMinusButton,
					onMouseDown: function onMouseDown() {
						return _this4.startDecrement();
					},
					onMouseUp: function onMouseUp() {
						return _this4.stop();
					},
					onMouseLeave: function onMouseLeave() {
						return _this4.stop();
					},
					onTouchStart: function onTouchStart(e) {
						e.preventDefault(); // prevent onClick from being fired
						_this4.startDecrement();
					},
					onTouchEnd: function onTouchEnd(e) {
						e.preventDefault(); // prevent onClick from being fired
						_this4.stop();
					}
				},
				'\u2013'
			);
			var incrementButton = React__default.createElement(
				'button',
				{
					type: 'button',
					disabled:  _this4.state.disablePlusButton,
					onMouseDown: function onMouseDown() {
						return _this4.startIncrement();
					},
					onMouseUp: function onMouseUp() {
						return _this4.stop();
					},
					onMouseLeave: function onMouseLeave() {
						return _this4.stop();
					},
					onTouchStart: function onTouchStart(e) {
						e.preventDefault(); // prevent onClick from being fired
						_this4.startIncrement();
					},
					onTouchEnd: function onTouchEnd(e) {
						e.preventDefault(); // prevent onClick from being fired
						_this4.stop();
					}
				},
				'+'
			);

			return React__default.createElement(
				'div',
				{ className: 'input-numeric' },
				this.props.showButtons && decrementButton,
				React__default.createElement('input', {
					name: null,
					type: 'number',
					pattern: Number.isInteger(this.props.step) ? '[0-9]*' : '[0-9\.]*',
					disabled: this.props.disabled,
                    value: displayedValue,
                    readOnly: true,
					onChange: function onChange(e) {
						return _this4.onInputChange(e);
					},
					onBlur: function onBlur() {
						return _this4.onInputBlur();
					},
					onFocus: function onFocus() {
						return _this4.onInputFocus();
					},
					onKeyDown: function onKeyDown(e) {
						if (e.keyCode === 38) {
							e.preventDefault();
							if (!_this4.interval) {
								_this4.startIncrement();
							}
						} else if (e.keyCode === 40) {
							e.preventDefault();
							if (!_this4.interval) {
								_this4.startDecrement();
							}
						}
					},
					onKeyUp: function onKeyUp() {
						return _this4.stop();
					}
				}),
				this.props.showButtons && incrementButton
			);
		}
	}]);
	return InputNumeric;
}(React.Component);


InputNumeric.propTypes = propTypes;
InputNumeric.defaultProps = defaultProps;

module.exports = InputNumeric;
