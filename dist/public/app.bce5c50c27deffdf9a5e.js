webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__material_ripple__ = __webpack_require__(6);



/**
 * Base class for every Material component in this package
 * NOTE: every component should add a ref by the name of `control` to its root dom for autoInit Properties
 *
 * @export
 * @class MaterialComponent
 * @extends {Component}
 */
class MaterialComponent extends __WEBPACK_IMPORTED_MODULE_0_preact__["Component"] {
  constructor() {
    super();
    // Attributes inside this array will be check for boolean value true
    // and will be converted to mdc classes
    this._mdcProps = [];
    // This will again be used to add apt classname to the component
    this.componentName = "";
    // The final class name given to the dom
    this.classText = "";
  }
  attachRipple() {
    if (this.props.ripple && this.control) {
      __WEBPACK_IMPORTED_MODULE_1__material_ripple__["a" /* MDCRipple */].attachTo(this.control);
    }
  }
  // Build the className
  buildClassName(props) {
    this.classText = "mdc-" + this.componentName;
    for (let propKey in this.props) {
      if (this.props.hasOwnProperty(propKey)) {
        const prop = this.props[propKey];
        if (typeof prop === "boolean" && prop) {
          if (this._mdcProps.indexOf(propKey) !== -1) {
            this.classText += " mdc-" + this.componentName + "--" + propKey;
          }
        }
      }
    }
  }
  getClassName(element) {
    if (!element) {
      return "";
    }
    const attrs = (element.attributes = element.attributes || {});
    let classText = this.classText;
    if (attrs.class) {
      classText += " " + attrs.class;
    }
    if (attrs.className && attrs.className !== attrs.class) {
      classText += " " + attrs.className;
    }
    return classText;
  }
  // Components must implement this method for their specific DOM structure
  materialDom(props) {
    return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])("div", Object.assign({}, props), props.children);
  }
  render() {
    this.buildClassName();
    // Fetch a VNode
    const componentProps = this.props;
    if (componentProps.class) {
      // We delete class prop here so that any sub node's class doesn't get over-ridden from this
      delete componentProps.class;
    }
    const element = this.materialDom(componentProps);
    element.attributes = element.attributes || {};
    // Fix for className
    element.attributes.class = this.getClassName(element);
    element.attributes.className = this.getClassName(element);
    // Clean this shit of proxy attributes
    this._mdcProps.forEach(prop => {
      delete element.attributes[prop];
    });
    return element;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MaterialComponent;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @template A
 */
class MDCFoundation {
  /** @return enum{cssClasses} */
  static get cssClasses() {
    // Classes extending MDCFoundation should implement this method to return an object which exports every
    // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
    return {};
  }

  /** @return enum{strings} */
  static get strings() {
    // Classes extending MDCFoundation should implement this method to return an object which exports all
    // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
    return {};
  }

  /** @return enum{numbers} */
  static get numbers() {
    // Classes extending MDCFoundation should implement this method to return an object which exports all
    // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
    return {};
  }

  /** @return {!Object} */
  static get defaultAdapter() {
    // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
    // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
    // validation.
    return {};
  }

  /**
   * @param {A=} adapter
   */
  constructor(adapter = {}) {
    /** @protected {!A} */
    this.adapter_ = adapter;
  }

  init() {
    // Subclasses should override this method to perform initialization routines (registering events, etc.)
  }

  destroy() {
    // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
  }
}

/* harmony default export */ __webpack_exports__["a"] = (MDCFoundation);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(16);
var isBuffer = __webpack_require__(34);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__foundation__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__foundation__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__component__["a"]; });
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */







/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__foundation__ = __webpack_require__(2);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



/**
 * @template F
 */
class MDCComponent {
  /**
   * @param {!Element} root
   * @return {!MDCComponent}
   */
  static attachTo(root) {
    // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
    // returns an instantiated component with its root set to that element. Also note that in the cases of
    // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
    // from getDefaultFoundation().
    return new MDCComponent(root, new __WEBPACK_IMPORTED_MODULE_0__foundation__["a" /* default */]());
  }

  /**
   * @param {!Element} root
   * @param {F=} foundation
   * @param {...?} args
   */
  constructor(root, foundation = undefined, ...args) {
    /** @protected {!Element} */
    this.root_ = root;
    this.initialize(...args);
    // Note that we initialize foundation here and not within the constructor's default param so that
    // this.root_ is defined and can be used within the foundation class.
    /** @protected {!F} */
    this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
    this.foundation_.init();
    this.initialSyncWithDOM();
  }

  initialize(/* ...args */) {
    // Subclasses can override this to do any additional setup work that would be considered part of a
    // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
    // initialized. Any additional arguments besides root and foundation will be passed in here.
  }

  /**
   * @return {!F} foundation
   */
  getDefaultFoundation() {
    // Subclasses must override this method to return a properly configured foundation class for the
    // component.
    throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' +
      'foundation class');
  }

  initialSyncWithDOM() {
    // Subclasses should override this method if they need to perform work to synchronize with a host DOM
    // object. An example of this would be a form control wrapper that needs to synchronize its internal state
    // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
    // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
  }

  destroy() {
    // Subclasses may implement this method to release any resources / deregister any listeners they have
    // attached. An example of this might be deregistering a resize event from the window object.
    this.foundation_.destroy();
  }

  /**
   * Wrapper method to add an event listener to the component's root element. This is most useful when
   * listening for custom events.
   * @param {string} evtType
   * @param {!Function} handler
   */
  listen(evtType, handler) {
    this.root_.addEventListener(evtType, handler);
  }

  /**
   * Wrapper method to remove an event listener to the component's root element. This is most useful when
   * unlistening for custom events.
   * @param {string} evtType
   * @param {!Function} handler
   */
  unlisten(evtType, handler) {
    this.root_.removeEventListener(evtType, handler);
  }

  /**
   * Fires a cross-browser-compatible custom event from the component root of the given type,
   * with the given data.
   * @param {string} evtType
   * @param {!Object} evtData
   * @param {boolean=} shouldBubble
   */
  emit(evtType, evtData, shouldBubble = false) {
    let evt;
    if (typeof CustomEvent === 'function') {
      evt = new CustomEvent(evtType, {
        detail: evtData,
        bubbles: shouldBubble,
      });
    } else {
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(evtType, shouldBubble, false, evtData);
    }

    this.root_.dispatchEvent(evt);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (MDCComponent);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@material/base/component.js
var component = __webpack_require__(5);

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/ripple/adapter.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Ripple. Provides an interface for managing
 * - classes
 * - dom
 * - CSS variables
 * - position
 * - dimensions
 * - scroll position
 * - event handlers
 * - unbounded, active and disabled states
 *
 * Additionally, provides type information for the adapter to the Closure
 * compiler.
 *
 * Implement this adapter for your framework of choice to delegate updates to
 * the component in your framework of choice. See architecture documentation
 * for more details.
 * https://github.com/material-components/material-components-web/blob/master/docs/architecture.md
 *
 * @record
 */
class MDCRippleAdapter {
  /** @return {boolean} */
  browserSupportsCssVars() {}

  /** @return {boolean} */
  isUnbounded() {}

  /** @return {boolean} */
  isSurfaceActive() {}

  /** @return {boolean} */
  isSurfaceDisabled() {}

  /** @param {string} className */
  addClass(className) {}

  /** @param {string} className */
  removeClass(className) {}

  /**
   * @param {string} evtType
   * @param {!Function} handler
   */
  registerInteractionHandler(evtType, handler) {}

  /**
   * @param {string} evtType
   * @param {!Function} handler
   */
  deregisterInteractionHandler(evtType, handler) {}

  /**
   * @param {!Function} handler
   */
  registerResizeHandler(handler) {}

  /**
   * @param {!Function} handler
   */
  deregisterResizeHandler(handler) {}

  /**
   * @param {string} varName
   * @param {?number|string} value
   */
  updateCssVariable(varName, value) {}

  /** @return {!ClientRect} */
  computeBoundingRect() {}

  /** @return {{x: number, y: number}} */
  getWindowPageOffset() {}
}

/* harmony default export */ var adapter = (MDCRippleAdapter);

// EXTERNAL MODULE: ./node_modules/@material/base/foundation.js
var foundation = __webpack_require__(2);

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/ripple/constants.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const cssClasses = {
  // Ripple is a special case where the "root" component is really a "mixin" of sorts,
  // given that it's an 'upgrade' to an existing component. That being said it is the root
  // CSS class that all other CSS classes derive from.
  ROOT: 'mdc-ripple-upgraded',
  UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
  BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
  BG_ACTIVE_FILL: 'mdc-ripple-upgraded--background-active-fill',
  FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
  FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation',
};

const strings = {
  VAR_FG_SIZE: '--mdc-ripple-fg-size',
  VAR_LEFT: '--mdc-ripple-left',
  VAR_TOP: '--mdc-ripple-top',
  VAR_FG_SCALE: '--mdc-ripple-fg-scale',
  VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
  VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end',
};

const numbers = {
  PADDING: 10,
  INITIAL_ORIGIN_SCALE: 0.6,
  DEACTIVATION_TIMEOUT_MS: 300,
  FG_DEACTIVATION_MS: 83,
};



// EXTERNAL MODULE: ./node_modules/preact-material-components/node_modules/@material/ripple/util.js
var util = __webpack_require__(12);

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/ripple/foundation.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






/**
 * @typedef {!{
 *   isActivated: (boolean|undefined),
 *   hasDeactivationUXRun: (boolean|undefined),
 *   wasActivatedByPointer: (boolean|undefined),
 *   wasElementMadeActive: (boolean|undefined),
 *   activationStartTime: (number|undefined),
 *   activationEvent: Event,
 *   isProgrammatic: (boolean|undefined)
 * }}
 */
let ActivationStateType;

/**
 * @typedef {!{
 *   activate: (string|undefined),
 *   deactivate: (string|undefined),
 *   focus: (string|undefined),
 *   blur: (string|undefined)
 * }}
 */
let ListenerInfoType;

/**
 * @typedef {!{
 *   activate: function(!Event),
 *   deactivate: function(!Event),
 *   focus: function(),
 *   blur: function()
 * }}
 */
let ListenersType;

/**
 * @typedef {!{
 *   x: number,
 *   y: number
 * }}
 */
let PointType;

/**
 * @enum {string}
 */
const DEACTIVATION_ACTIVATION_PAIRS = {
  mouseup: 'mousedown',
  pointerup: 'pointerdown',
  touchend: 'touchstart',
  keyup: 'keydown',
  blur: 'focus',
};

/**
 * @extends {MDCFoundation<!MDCRippleAdapter>}
 */
class foundation_MDCRippleFoundation extends foundation["a" /* default */] {
  static get cssClasses() {
    return cssClasses;
  }

  static get strings() {
    return strings;
  }

  static get numbers() {
    return numbers;
  }

  static get defaultAdapter() {
    return {
      browserSupportsCssVars: () => /* boolean - cached */ {},
      isUnbounded: () => /* boolean */ {},
      isSurfaceActive: () => /* boolean */ {},
      isSurfaceDisabled: () => /* boolean */ {},
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      registerInteractionHandler: (/* evtType: string, handler: EventListener */) => {},
      deregisterInteractionHandler: (/* evtType: string, handler: EventListener */) => {},
      registerResizeHandler: (/* handler: EventListener */) => {},
      deregisterResizeHandler: (/* handler: EventListener */) => {},
      updateCssVariable: (/* varName: string, value: string */) => {},
      computeBoundingRect: () => /* ClientRect */ {},
      getWindowPageOffset: () => /* {x: number, y: number} */ {},
    };
  }

  constructor(adapter) {
    super(Object.assign(foundation_MDCRippleFoundation.defaultAdapter, adapter));

    /** @private {number} */
    this.layoutFrame_ = 0;

    /** @private {!ClientRect} */
    this.frame_ = /** @type {!ClientRect} */ ({width: 0, height: 0});

    /** @private {!ActivationStateType} */
    this.activationState_ = this.defaultActivationState_();

    /** @private {number} */
    this.xfDuration_ = 0;

    /** @private {number} */
    this.initialSize_ = 0;

    /** @private {number} */
    this.maxRadius_ = 0;

    /** @private {!Array<{ListenerInfoType}>} */
    this.listenerInfos_ = [
      {activate: 'touchstart', deactivate: 'touchend'},
      {activate: 'pointerdown', deactivate: 'pointerup'},
      {activate: 'mousedown', deactivate: 'mouseup'},
      {activate: 'keydown', deactivate: 'keyup'},
      {focus: 'focus', blur: 'blur'},
    ];

    /** @private {!ListenersType} */
    this.listeners_ = {
      activate: (e) => this.activate_(e),
      deactivate: (e) => this.deactivate_(e),
      focus: () => requestAnimationFrame(
        () => this.adapter_.addClass(foundation_MDCRippleFoundation.cssClasses.BG_FOCUSED)
      ),
      blur: () => requestAnimationFrame(
        () => this.adapter_.removeClass(foundation_MDCRippleFoundation.cssClasses.BG_FOCUSED)
      ),
    };

    /** @private {!Function} */
    this.resizeHandler_ = () => this.layout();

    /** @private {!{left: number, top:number}} */
    this.unboundedCoords_ = {
      left: 0,
      top: 0,
    };

    /** @private {number} */
    this.fgScale_ = 0;

    /** @private {number} */
    this.activationTimer_ = 0;

    /** @private {number} */
    this.fgDeactivationRemovalTimer_ = 0;

    /** @private {boolean} */
    this.activationAnimationHasEnded_ = false;

    /** @private {!Function} */
    this.activationTimerCallback_ = () => {
      this.activationAnimationHasEnded_ = true;
      this.runDeactivationUXLogicIfReady_();
    };
  }

  /**
   * We compute this property so that we are not querying information about the client
   * until the point in time where the foundation requests it. This prevents scenarios where
   * client-side feature-detection may happen too early, such as when components are rendered on the server
   * and then initialized at mount time on the client.
   * @return {boolean}
   * @private
   */
  isSupported_() {
    return this.adapter_.browserSupportsCssVars();
  }

  /**
   * @return {!ActivationStateType}
   */
  defaultActivationState_() {
    return {
      isActivated: false,
      hasDeactivationUXRun: false,
      wasActivatedByPointer: false,
      wasElementMadeActive: false,
      activationStartTime: 0,
      activationEvent: null,
      isProgrammatic: false,
    };
  }

  init() {
    if (!this.isSupported_()) {
      return;
    }
    this.addEventListeners_();

    const {ROOT, UNBOUNDED} = foundation_MDCRippleFoundation.cssClasses;
    requestAnimationFrame(() => {
      this.adapter_.addClass(ROOT);
      if (this.adapter_.isUnbounded()) {
        this.adapter_.addClass(UNBOUNDED);
      }
      this.layoutInternal_();
    });
  }

  /** @private */
  addEventListeners_() {
    this.listenerInfos_.forEach((info) => {
      Object.keys(info).forEach((k) => {
        this.adapter_.registerInteractionHandler(info[k], this.listeners_[k]);
      });
    });
    this.adapter_.registerResizeHandler(this.resizeHandler_);
  }

  /**
   * @param {Event} e
   * @private
   */
  activate_(e) {
    if (this.adapter_.isSurfaceDisabled()) {
      return;
    }

    const {activationState_: activationState} = this;
    if (activationState.isActivated) {
      return;
    }

    activationState.isActivated = true;
    activationState.isProgrammatic = e === null;
    activationState.activationEvent = e;
    activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : (
      e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'pointerdown'
    );
    activationState.activationStartTime = Date.now();

    requestAnimationFrame(() => {
      // This needs to be wrapped in an rAF call b/c web browsers
      // report active states inconsistently when they're called within
      // event handling code:
      // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
      // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
      activationState.wasElementMadeActive = (e && e.type === 'keydown') ? this.adapter_.isSurfaceActive() : true;
      if (activationState.wasElementMadeActive) {
        this.animateActivation_();
      } else {
        // Reset activation state immediately if element was not made active.
        this.activationState_ = this.defaultActivationState_();
      }
    });
  }

  /**
   * @param {?Event=} event Optional event containing position information.
   */
  activate(event = null) {
    this.activate_(event);
  }

  /** @private */
  animateActivation_() {
    const {VAR_FG_TRANSLATE_START, VAR_FG_TRANSLATE_END} = foundation_MDCRippleFoundation.strings;
    const {
      BG_ACTIVE_FILL,
      FG_DEACTIVATION,
      FG_ACTIVATION,
    } = foundation_MDCRippleFoundation.cssClasses;
    const {DEACTIVATION_TIMEOUT_MS} = foundation_MDCRippleFoundation.numbers;

    let translateStart = '';
    let translateEnd = '';

    if (!this.adapter_.isUnbounded()) {
      const {startPoint, endPoint} = this.getFgTranslationCoordinates_();
      translateStart = `${startPoint.x}px, ${startPoint.y}px`;
      translateEnd = `${endPoint.x}px, ${endPoint.y}px`;
    }

    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
    // Cancel any ongoing activation/deactivation animations
    clearTimeout(this.activationTimer_);
    clearTimeout(this.fgDeactivationRemovalTimer_);
    this.rmBoundedActivationClasses_();
    this.adapter_.removeClass(FG_DEACTIVATION);

    // Force layout in order to re-trigger the animation.
    this.adapter_.computeBoundingRect();
    this.adapter_.addClass(BG_ACTIVE_FILL);
    this.adapter_.addClass(FG_ACTIVATION);
    this.activationTimer_ = setTimeout(() => this.activationTimerCallback_(), DEACTIVATION_TIMEOUT_MS);
  }

  /**
   * @private
   * @return {{startPoint: PointType, endPoint: PointType}}
   */
  getFgTranslationCoordinates_() {
    const {activationState_: activationState} = this;
    const {activationEvent, wasActivatedByPointer} = activationState;

    let startPoint;
    if (wasActivatedByPointer) {
      startPoint = Object(util["c" /* getNormalizedEventCoords */])(
        /** @type {!Event} */ (activationEvent),
        this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect()
      );
    } else {
      startPoint = {
        x: this.frame_.width / 2,
        y: this.frame_.height / 2,
      };
    }
    // Center the element around the start point.
    startPoint = {
      x: startPoint.x - (this.initialSize_ / 2),
      y: startPoint.y - (this.initialSize_ / 2),
    };

    const endPoint = {
      x: (this.frame_.width / 2) - (this.initialSize_ / 2),
      y: (this.frame_.height / 2) - (this.initialSize_ / 2),
    };

    return {startPoint, endPoint};
  }

  /** @private */
  runDeactivationUXLogicIfReady_() {
    const {FG_DEACTIVATION} = foundation_MDCRippleFoundation.cssClasses;
    const {hasDeactivationUXRun, isActivated} = this.activationState_;
    const activationHasEnded = hasDeactivationUXRun || !isActivated;
    if (activationHasEnded && this.activationAnimationHasEnded_) {
      this.rmBoundedActivationClasses_();
      this.adapter_.addClass(FG_DEACTIVATION);
      this.fgDeactivationRemovalTimer_ = setTimeout(() => {
        this.adapter_.removeClass(FG_DEACTIVATION);
      }, numbers.FG_DEACTIVATION_MS);
    }
  }

  /** @private */
  rmBoundedActivationClasses_() {
    const {BG_ACTIVE_FILL, FG_ACTIVATION} = foundation_MDCRippleFoundation.cssClasses;
    this.adapter_.removeClass(BG_ACTIVE_FILL);
    this.adapter_.removeClass(FG_ACTIVATION);
    this.activationAnimationHasEnded_ = false;
    this.adapter_.computeBoundingRect();
  }

  /**
   * @param {Event} e
   * @private
   */
  deactivate_(e) {
    const {activationState_: activationState} = this;
    // This can happen in scenarios such as when you have a keyup event that blurs the element.
    if (!activationState.isActivated) {
      return;
    }
    // Programmatic deactivation.
    if (activationState.isProgrammatic) {
      const evtObject = null;
      const state = /** @type {!ActivationStateType} */ (Object.assign({}, activationState));
      requestAnimationFrame(() => this.animateDeactivation_(evtObject, state));
      this.activationState_ = this.defaultActivationState_();
      return;
    }

    const actualActivationType = DEACTIVATION_ACTIVATION_PAIRS[e.type];
    const expectedActivationType = activationState.activationEvent.type;
    // NOTE: Pointer events are tricky - https://patrickhlauke.github.io/touch/tests/results/
    // Essentially, what we need to do here is decouple the deactivation UX from the actual
    // deactivation state itself. This way, touch/pointer events in sequence do not trample one
    // another.
    const needsDeactivationUX = actualActivationType === expectedActivationType;
    let needsActualDeactivation = needsDeactivationUX;
    if (activationState.wasActivatedByPointer) {
      needsActualDeactivation = e.type === 'mouseup';
    }

    const state = /** @type {!ActivationStateType} */ (Object.assign({}, activationState));
    requestAnimationFrame(() => {
      if (needsDeactivationUX) {
        this.activationState_.hasDeactivationUXRun = true;
        this.animateDeactivation_(e, state);
      }

      if (needsActualDeactivation) {
        this.activationState_ = this.defaultActivationState_();
      }
    });
  }

  /**
   * @param {?Event=} event Optional event containing position information.
   */
  deactivate(event = null) {
    this.deactivate_(event);
  }

  /**
   * @param {Event} e
   * @param {!ActivationStateType} options
   * @private
   */
  animateDeactivation_(e, {wasActivatedByPointer, wasElementMadeActive}) {
    const {BG_FOCUSED} = foundation_MDCRippleFoundation.cssClasses;
    if (wasActivatedByPointer || wasElementMadeActive) {
      // Remove class left over by element being focused
      this.adapter_.removeClass(BG_FOCUSED);
      this.runDeactivationUXLogicIfReady_();
    }
  }

  destroy() {
    if (!this.isSupported_()) {
      return;
    }
    this.removeEventListeners_();

    const {ROOT, UNBOUNDED} = foundation_MDCRippleFoundation.cssClasses;
    requestAnimationFrame(() => {
      this.adapter_.removeClass(ROOT);
      this.adapter_.removeClass(UNBOUNDED);
      this.removeCssVars_();
    });
  }

  /** @private */
  removeEventListeners_() {
    this.listenerInfos_.forEach((info) => {
      Object.keys(info).forEach((k) => {
        this.adapter_.deregisterInteractionHandler(info[k], this.listeners_[k]);
      });
    });
    this.adapter_.deregisterResizeHandler(this.resizeHandler_);
  }

  /** @private */
  removeCssVars_() {
    const {strings} = foundation_MDCRippleFoundation;
    Object.keys(strings).forEach((k) => {
      if (k.indexOf('VAR_') === 0) {
        this.adapter_.updateCssVariable(strings[k], null);
      }
    });
  }

  layout() {
    if (this.layoutFrame_) {
      cancelAnimationFrame(this.layoutFrame_);
    }
    this.layoutFrame_ = requestAnimationFrame(() => {
      this.layoutInternal_();
      this.layoutFrame_ = 0;
    });
  }

  /** @private */
  layoutInternal_() {
    this.frame_ = this.adapter_.computeBoundingRect();

    const maxDim = Math.max(this.frame_.height, this.frame_.width);
    const surfaceDiameter = Math.sqrt(Math.pow(this.frame_.width, 2) + Math.pow(this.frame_.height, 2));

    // 60% of the largest dimension of the surface
    this.initialSize_ = maxDim * foundation_MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE;

    // Diameter of the surface + 10px
    this.maxRadius_ = surfaceDiameter + foundation_MDCRippleFoundation.numbers.PADDING;
    this.fgScale_ = this.maxRadius_ / this.initialSize_;
    this.xfDuration_ = 1000 * Math.sqrt(this.maxRadius_ / 1024);
    this.updateLayoutCssVars_();
  }

  /** @private */
  updateLayoutCssVars_() {
    const {
      VAR_FG_SIZE, VAR_LEFT, VAR_TOP, VAR_FG_SCALE,
    } = foundation_MDCRippleFoundation.strings;

    this.adapter_.updateCssVariable(VAR_FG_SIZE, `${this.initialSize_}px`);
    this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);

    if (this.adapter_.isUnbounded()) {
      this.unboundedCoords_ = {
        left: Math.round((this.frame_.width / 2) - (this.initialSize_ / 2)),
        top: Math.round((this.frame_.height / 2) - (this.initialSize_ / 2)),
      };

      this.adapter_.updateCssVariable(VAR_LEFT, `${this.unboundedCoords_.left}px`);
      this.adapter_.updateCssVariable(VAR_TOP, `${this.unboundedCoords_.top}px`);
    }
  }
}

/* harmony default export */ var ripple_foundation = (foundation_MDCRippleFoundation);

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/ripple/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ripple_MDCRipple; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "b", function() { return ripple_foundation; });
/* unused concated harmony import util */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return util; });
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






/**
 * @extends MDCComponent<!MDCRippleFoundation>
 */
class ripple_MDCRipple extends component["a" /* default */] {
  /** @param {...?} args */
  constructor(...args) {
    super(...args);

    /** @type {boolean} */
    this.disabled = false;

    /** @private {boolean} */
    this.unbounded_;
  }

  /**
   * @param {!Element} root
   * @param {{isUnbounded: (boolean|undefined)}=} options
   * @return {!MDCRipple}
   */
  static attachTo(root, {isUnbounded = undefined} = {}) {
    const ripple = new ripple_MDCRipple(root);
    // Only override unbounded behavior if option is explicitly specified
    if (isUnbounded !== undefined) {
      ripple.unbounded = /** @type {boolean} */ (isUnbounded);
    }
    return ripple;
  }

  /**
   * @param {!RippleCapableSurface} instance
   * @return {!MDCRippleAdapter}
   */
  static createAdapter(instance) {
    const MATCHES = util["b" /* getMatchesProperty */](HTMLElement.prototype);

    return {
      browserSupportsCssVars: () => util["d" /* supportsCssVariables */](window),
      isUnbounded: () => instance.unbounded,
      isSurfaceActive: () => instance.root_[MATCHES](':active'),
      isSurfaceDisabled: () => instance.disabled,
      addClass: (className) => instance.root_.classList.add(className),
      removeClass: (className) => instance.root_.classList.remove(className),
      registerInteractionHandler: (evtType, handler) =>
        instance.root_.addEventListener(evtType, handler, util["a" /* applyPassive */]()),
      deregisterInteractionHandler: (evtType, handler) =>
        instance.root_.removeEventListener(evtType, handler, util["a" /* applyPassive */]()),
      registerResizeHandler: (handler) => window.addEventListener('resize', handler),
      deregisterResizeHandler: (handler) => window.removeEventListener('resize', handler),
      updateCssVariable: (varName, value) => instance.root_.style.setProperty(varName, value),
      computeBoundingRect: () => instance.root_.getBoundingClientRect(),
      getWindowPageOffset: () => ({x: window.pageXOffset, y: window.pageYOffset}),
    };
  }

  /** @return {boolean} */
  get unbounded() {
    return this.unbounded_;
  }

  /** @param {boolean} unbounded */
  set unbounded(unbounded) {
    const {UNBOUNDED} = ripple_foundation.cssClasses;
    this.unbounded_ = Boolean(unbounded);
    if (this.unbounded_) {
      this.root_.classList.add(UNBOUNDED);
    } else {
      this.root_.classList.remove(UNBOUNDED);
    }
  }

  activate() {
    this.foundation_.activate();
  }

  deactivate() {
    this.foundation_.deactivate();
  }

  layout() {
    this.foundation_.layout();
  }

  /** @return {!MDCRippleFoundation} */
  getDefaultFoundation() {
    return new ripple_foundation(ripple_MDCRipple.createAdapter(this));
  }

  initialSyncWithDOM() {
    this.unbounded = 'mdcRippleIsUnbounded' in this.root_.dataset;
  }
}

/**
 * See Material Design spec for more details on when to use ripples.
 * https://material.io/guidelines/motion/choreography.html#choreography-creation
 * @record
 */
class RippleCapableSurface {}

/** @protected {!Element} */
RippleCapableSurface.prototype.root_;

/**
 * Whether or not the ripple bleeds out of the bounds of the element.
 * @type {boolean|undefined}
 */
RippleCapableSurface.prototype.unbounded;

/**
 * Whether or not the ripple is attached to a disabled component.
 * @type {boolean|undefined}
 */
RippleCapableSurface.prototype.disabled;




/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export subscribers */
/* unused harmony export getCurrentUrl */
/* unused harmony export route */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Router; });
/* unused harmony export Route */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Link; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);


var EMPTY$1 = {};

function assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	var reg = /(?:\?([^#]*))?(#.*)?$/,
		c = url.match(reg),
		matches = {},
		ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i=0; i<p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1=0; i$1<max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0)===':') {
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
				flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
				plus = ~flags.indexOf('+'),
				star = ~flags.indexOf('*'),
				val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?')<0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		}
		else if (route[i$1]!==url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default!==true && ret===false) { return false; }
	return matches;
}

function pathRankSort(a, b) {
	return (
		(a.rank < b.rank) ? 1 :
		(a.rank > b.rank) ? -1 :
		(a.index - b.index)
	);
}

// filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.
function prepareVNodeForRanking(vnode, index) {
	vnode.index = index;
	vnode.rank = rankChild(vnode);
	return vnode.attributes;
}

function segmentize(url) {
	return url.replace(/(^\/+|\/+$)/g, '').split('/');
}

function rankSegment(segment) {
	return segment.charAt(0)==':' ? (1 + '*+?'.indexOf(segment.charAt(segment.length-1))) || 4 : 5;
}

function rank(path) {
	return segmentize(path).map(rankSegment).join('');
}

function rankChild(vnode) {
	return vnode.attributes.default ? 0 : rank(vnode.attributes.path);
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function isPreactElement(node) {
	return node.__preactattr_!=null || typeof Symbol!=='undefined' && node[Symbol.for('preactattr')]!=null;
}

function setUrl(url, type) {
	if ( type === void 0 ) type='push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	}
	else if (typeof history!=='undefined' && history[type+'State']) {
		history[type+'State'](null, null, url);
	}
}


function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	}
	else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	}
	else {
		url = typeof location!=='undefined' ? location : EMPTY;
	}
	return ("" + (url.pathname || '') + (url.search || ''));
}



function route(url, replace) {
	if ( replace === void 0 ) replace=false;

	if (typeof url!=='string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}


/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i=ROUTERS.length; i--; ) {
		if (ROUTERS[i].canRoute(url)) { return true; }
	}
	return false;
}


/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i=0; i<ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url)===true) {
			didRoute = true;
		}
	}
	for (var i$1=subscribers.length; i$1--; ) {
		subscribers[i$1](url);
	}
	return didRoute;
}


function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) { return; }

	var href = node.getAttribute('href'),
		target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || (target && !target.match(/^_?self$/i))) { return; }

	// attempt to route, if no match simply cede control to browser
	return route(href);
}


function handleLinkClick(e) {
	if (e.button==0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}


function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) { e.stopImmediatePropagation(); }
		if (e.stopPropagation) { e.stopPropagation(); }
		e.preventDefault();
	}
	return false;
}


function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button!==0) { return; }

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase()==='A' && t.getAttribute('href') && isPreactElement(t)) {
			if (t.hasAttribute('native')) { return; }
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while ((t=t.parentNode));
}


var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) { return; }

	if (typeof addEventListener==='function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}


var Router = (function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if ( Component$$1 ) Router.__proto__ = Component$$1;
	Router.prototype = Object.create( Component$$1 && Component$$1.prototype );
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate (props) {
		if (props.static!==true) { return true; }
		return props.url!==this.props.url || props.onChange!==this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute (url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo (url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) { return this.canRoute(url); }

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount () {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount () {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo(("" + (location.pathname || '') + (location.search || '')));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount () {
		if (typeof this.unlisten==='function') { this.unlisten(); }
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate () {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate () {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren (children, url, invoke) {
		return children
			.filter(prepareVNodeForRanking)
			.sort(pathRankSort)
			.map( function (vnode) {
				var matches = exec(url, vnode.attributes.path, vnode.attributes);
				if (matches) {
					if (invoke !== false) {
						var newProps = { url: url, matches: matches };
						assign(newProps, matches);
						delete newProps.ref;
						delete newProps.key;
						return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["cloneElement"])(vnode, newProps);
					}
					return vnode;
				}
			}).filter(Boolean);
	};

	Router.prototype.render = function render (ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url!==previous) {
			this.previousUrl = url;
			if (typeof onChange==='function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]));

var Link = function (props) { return (
	Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('a', assign({ onClick: handleLinkClick }, props))
); };

var Route = function (props) { return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(props.component, props); };

Router.subscribers = subscribers;
Router.getCurrentUrl = getCurrentUrl;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

/* unused harmony default export */ var _unused_webpack_default_export = (Router);
//# sourceMappingURL=preact-router.es.js.map


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*global window, global*/
var util = __webpack_require__(14)
var assert = __webpack_require__(26)
var now = __webpack_require__(27)

var slice = Array.prototype.slice
var console
var times = {}

if (typeof global !== "undefined" && global.console) {
    console = global.console
} else if (typeof window !== "undefined" && window.console) {
    console = window.console
} else {
    console = {}
}

var functions = [
    [log, "log"],
    [info, "info"],
    [warn, "warn"],
    [error, "error"],
    [time, "time"],
    [timeEnd, "timeEnd"],
    [trace, "trace"],
    [dir, "dir"],
    [consoleAssert, "assert"]
]

for (var i = 0; i < functions.length; i++) {
    var tuple = functions[i]
    var f = tuple[0]
    var name = tuple[1]

    if (!console[name]) {
        console[name] = f
    }
}

module.exports = console

function log() {}

function info() {
    console.log.apply(console, arguments)
}

function warn() {
    console.log.apply(console, arguments)
}

function error() {
    console.warn.apply(console, arguments)
}

function time(label) {
    times[label] = now()
}

function timeEnd(label) {
    var time = times[label]
    if (!time) {
        throw new Error("No such label: " + label)
    }

    var duration = now() - time
    console.log(label + ": " + duration + "ms")
}

function trace() {
    var err = new Error()
    err.name = "Trace"
    err.message = util.format.apply(null, arguments)
    console.error(err.stack)
}

function dir(object) {
    console.log(util.inspect(object) + "\n")
}

function consoleAssert(expression) {
    if (!expression) {
        var arr = slice.call(arguments, 1)
        assert.ok(false, util.format.apply(null, arr))
    }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MaterialComponent__ = __webpack_require__(1);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




/**
 * @prop disabled = false
 */
class Icon extends __WEBPACK_IMPORTED_MODULE_1__MaterialComponent__["a" /* default */] {
  constructor() {
    super();
    this.componentName = "icon";
  }
  materialDom(props) {
    const classes = ["material-icons"];
    if (props.className) {
      classes.push(props.className);
    }
    return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      "i",
      _extends({}, props, { className: classes.join(",") }),
      props.children
    );
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Icon;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(3);
var normalizeHeaderName = __webpack_require__(36);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(17);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(17);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return supportsCssVariables; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return applyPassive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getMatchesProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getNormalizedEventCoords; });
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Stores result from supportsCssVariables to avoid redundant processing to detect CSS custom variable support.
 * @private {boolean|undefined}
 */
let supportsCssVariables_;

/**
 * Stores result from applyPassive to avoid redundant processing to detect passive event listener support.
 * @private {boolean|undefined}
 */
let supportsPassive_;

/**
 * @param {!Window} windowObj
 * @return {boolean}
 */
function detectEdgePseudoVarBug(windowObj) {
  // Detect versions of Edge with buggy var() support
  // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
  const document = windowObj.document;
  const node = document.createElement('div');
  node.className = 'mdc-ripple-surface--test-edge-var-bug';
  document.body.appendChild(node);

  // The bug exists if ::before style ends up propagating to the parent element.
  // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
  // but Firefox is known to support CSS custom properties correctly.
  // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
  const computedStyle = windowObj.getComputedStyle(node);
  const hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';
  node.remove();
  return hasPseudoVarBug;
}

/**
 * @param {!Window} windowObj
 * @param {boolean=} forceRefresh
 * @return {boolean|undefined}
 */

function supportsCssVariables(windowObj, forceRefresh = false) {
  if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
    return supportsCssVariables_;
  }

  const supportsFunctionPresent = windowObj.CSS && typeof windowObj.CSS.supports === 'function';
  if (!supportsFunctionPresent) {
    return;
  }

  const explicitlySupportsCssVars = windowObj.CSS.supports('--css-vars', 'yes');
  // See: https://bugs.webkit.org/show_bug.cgi?id=154669
  // See: README section on Safari
  const weAreFeatureDetectingSafari10plus = (
    windowObj.CSS.supports('(--css-vars: yes)') &&
    windowObj.CSS.supports('color', '#00000000')
  );

  if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
    supportsCssVariables_ = !detectEdgePseudoVarBug(windowObj);
  } else {
    supportsCssVariables_ = false;
  }
  return supportsCssVariables_;
}

//
/**
 * Determine whether the current browser supports passive event listeners, and if so, use them.
 * @param {!Window=} globalObj
 * @param {boolean=} forceRefresh
 * @return {boolean|{passive: boolean}}
 */
function applyPassive(globalObj = window, forceRefresh = false) {
  if (supportsPassive_ === undefined || forceRefresh) {
    let isSupported = false;
    try {
      globalObj.document.addEventListener('test', null, {get passive() {
        isSupported = true;
      }});
    } catch (e) { }

    supportsPassive_ = isSupported;
  }

  return supportsPassive_ ? {passive: true} : false;
}

/**
 * @param {!Object} HTMLElementPrototype
 * @return {!Array<string>}
 */
function getMatchesProperty(HTMLElementPrototype) {
  return [
    'webkitMatchesSelector', 'msMatchesSelector', 'matches',
  ].filter((p) => p in HTMLElementPrototype).pop();
}

/**
 * @param {!Event} ev
 * @param {!{x: number, y: number}} pageOffset
 * @param {!ClientRect} clientRect
 * @return {!{x: number, y: number}}
 */
function getNormalizedEventCoords(ev, pageOffset, clientRect) {
  const {x, y} = pageOffset;
  const documentX = x + clientRect.left;
  const documentY = y + clientRect.top;

  let normalizedX;
  let normalizedY;
  // Determine touch point relative to the ripple container.
  if (ev.type === 'touchstart') {
    normalizedX = ev.changedTouches[0].pageX - documentX;
    normalizedY = ev.changedTouches[0].pageY - documentY;
  } else {
    normalizedX = ev.pageX - documentX;
    normalizedY = ev.pageY - documentY;
  }

  return {x: normalizedX, y: normalizedY};
}




/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MaterialComponent__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Icon___ = __webpack_require__(9);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





/**
 *  @prop dense = false
 *  @prop raised = false
 *  @prop compact = false
 *  @prop disabled = false
 *  @prop unelevated = false
 *  @prop stroked = false
 */
class Button extends __WEBPACK_IMPORTED_MODULE_1__MaterialComponent__["a" /* default */] {
  constructor() {
    super();
    this.componentName = "button";
    this._mdcProps = ["dense", "raised", "compact", "unelevated", "stroked"];
  }
  componentDidMount() {
    super.attachRipple();
  }
  materialDom(props) {
    const ButtonElement = props.href ? "a" : "button";

    return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      ButtonElement,
      _extends({
        ref: control => {
          this.control = control;
        }
      }, props),
      this.props.children
    );
  }
}

class ButtonIcon extends __WEBPACK_IMPORTED_MODULE_2__Icon___["a" /* default */] {
  constructor() {
    super();
    this.componentName = "button__icon";
  }
}

Button.Icon = ButtonIcon;
/* harmony default export */ __webpack_exports__["a"] = (Button);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process, console) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(24);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(25);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10), __webpack_require__(15), __webpack_require__(8)))

/***/ }),
/* 15 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);
var settle = __webpack_require__(37);
var buildURL = __webpack_require__(39);
var parseHeaders = __webpack_require__(40);
var isURLSameOrigin = __webpack_require__(41);
var createError = __webpack_require__(18);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(42);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("production" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(43);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(38);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MaterialComponent__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Button__ = __webpack_require__(13);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





class Card extends __WEBPACK_IMPORTED_MODULE_1__MaterialComponent__["a" /* default */] {
  constructor() {
    super();
    this.componentName = "card";
    this._mdcProps = ["theme-dark"];
  }
}

class CardSection extends __WEBPACK_IMPORTED_MODULE_1__MaterialComponent__["a" /* default */] {
  constructor() {
    super();
    this.componentName = "";
  }
  materialDom(props) {
    return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      "section",
      props,
      props.children
    );
  }
}

class CardPrimary extends CardSection {
  constructor() {
    super();
    this.componentName = "card__primary";
  }
}

class CardSupportingText extends CardSection {
  constructor() {
    super();
    this.componentName = "card__supporting-text";
  }
}

class CardActions extends CardSection {
  constructor() {
    super();
    this.componentName = "card__actions";
    this._mdcProps = ["vertical"];
  }
}

class CardMedia extends CardSection {
  constructor() {
    super();
    this.componentName = "card__media";
  }
}

class CardAction extends __WEBPACK_IMPORTED_MODULE_2__Button__["a" /* default */] {
  constructor() {
    super();
    this.componentName = "card__action";
  }
  materialDom(props) {
    return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      "button",
      _extends({
        className: "mdc-button mdc-button--compact"
      }, props, {
        ref: control => {
          this.control = control;
        }
      }),
      props.children
    );
  }
}

class CardTitle extends __WEBPACK_IMPORTED_MODULE_1__MaterialComponent__["a" /* default */] {
  constructor() {
    super();
    this.componentName = "card__title";
    this._mdcProps = ["large"];
  }
  materialDom(props) {
    return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      "h1",
      props,
      props.children
    );
  }
}

class CardSubtitle extends __WEBPACK_IMPORTED_MODULE_1__MaterialComponent__["a" /* default */] {
  constructor() {
    super();
    this.componentName = "card__subtitle";
  }
  materialDom(props) {
    return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      "h2",
      props,
      props.children
    );
  }
}

class CardHorizontalBlock extends CardSection {
  constructor() {
    super();
    this.componentName = "card__horizontal-block";
  }
}

class CardMediaItem extends __WEBPACK_IMPORTED_MODULE_1__MaterialComponent__["a" /* default */] {
  constructor() {
    super();
    this.componentName = "card__media-item";
    this._mdcProps = [];
  }
  materialDom(props) {
    let className = "";
    if (props.x) {
      className = "mdc-card__media-item--" + props.x + "x";
    }
    return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])("img", _extends({ className: className }, props));
  }
}

Card.Primary = CardPrimary;
Card.SupportingText = CardSupportingText;
Card.Actions = CardActions;
Card.Action = CardAction;
Card.Media = CardMedia;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;
Card.HorizontalBlock = CardHorizontalBlock;
Card.MediaItem = CardMediaItem;

/* unused harmony default export */ var _unused_webpack_default_export = (Card);

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/preact/dist/preact.esm.js
var preact_esm = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/preact-material-components/MaterialComponent.js
var MaterialComponent = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/@material/base/index.js
var base = __webpack_require__(4);

// EXTERNAL MODULE: ./node_modules/@material/base/foundation.js
var foundation = __webpack_require__(2);

// CONCATENATED MODULE: ./node_modules/@material/toolbar/constants.js
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const cssClasses = {
  FIXED: 'mdc-toolbar--fixed',
  FIXED_LASTROW: 'mdc-toolbar--fixed-lastrow-only',
  FIXED_AT_LAST_ROW: 'mdc-toolbar--fixed-at-last-row',
  TOOLBAR_ROW_FLEXIBLE: 'mdc-toolbar--flexible',
  FLEXIBLE_DEFAULT_BEHAVIOR: 'mdc-toolbar--flexible-default-behavior',
  FLEXIBLE_MAX: 'mdc-toolbar--flexible-space-maximized',
  FLEXIBLE_MIN: 'mdc-toolbar--flexible-space-minimized',
};

const strings = {
  TITLE_SELECTOR: '.mdc-toolbar__title',
  FIRST_ROW_SELECTOR: '.mdc-toolbar__row:first-child',
  CHANGE_EVENT: 'MDCToolbar:change',
};

const numbers = {
  MAX_TITLE_SIZE: 2.125,
  MIN_TITLE_SIZE: 1.25,
  TOOLBAR_ROW_HEIGHT: 64,
  TOOLBAR_ROW_MOBILE_HEIGHT: 56,
  TOOLBAR_MOBILE_BREAKPOINT: 600,
};

// CONCATENATED MODULE: ./node_modules/@material/toolbar/foundation.js
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



class foundation_MDCToolbarFoundation extends foundation["a" /* default */] {
  static get cssClasses() {
    return cssClasses;
  }

  static get strings() {
    return strings;
  }

  static get numbers() {
    return numbers;
  }

  static get defaultAdapter() {
    return {
      hasClass: (/* className: string */) => /* boolean */ false,
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      registerScrollHandler: (/* handler: EventListener */) => {},
      deregisterScrollHandler: (/* handler: EventListener */) => {},
      registerResizeHandler: (/* handler: EventListener */) => {},
      deregisterResizeHandler: (/* handler: EventListener */) => {},
      getViewportWidth: () => /* number */ 0,
      getViewportScrollY: () => /* number */ 0,
      getOffsetHeight: () => /* number */ 0,
      getFirstRowElementOffsetHeight: () => /* number */ 0,
      notifyChange: (/* evtData: {flexibleExpansionRatio: number} */) => {},
      setStyle: (/* property: string, value: string */) => {},
      setStyleForTitleElement: (/* property: string, value: string */) => {},
      setStyleForFlexibleRowElement: (/* property: string, value: string */) => {},
      setStyleForFixedAdjustElement: (/* property: string, value: string */) => {},
    };
  }

  constructor(adapter) {
    super(Object.assign(foundation_MDCToolbarFoundation.defaultAdapter, adapter));
    this.resizeHandler_ = () => this.checkRowHeight_();
    this.scrollHandler_ = () => this.updateToolbarStyles_();
    this.checkRowHeightFrame_ = 0;
    this.scrollFrame_ = 0;
    this.executedLastChange_ = false;

    this.calculations_ = {
      toolbarRowHeight: 0,
      // Calculated Height ratio. We use ratio to calculate corresponding heights in resize event.
      toolbarRatio: 0, // The ratio of toolbar height to row height
      flexibleExpansionRatio: 0, // The ratio of flexible space height to row height
      maxTranslateYRatio: 0, // The ratio of max toolbar move up distance to row height
      scrollThresholdRatio: 0, // The ratio of max scrollTop that we should listen to to row height
      // Derived Heights based on the above key ratios.
      toolbarHeight: 0,
      flexibleExpansionHeight: 0, // Flexible row minus toolbar height (derived)
      maxTranslateYDistance: 0, // When toolbar only fix last row (derived)
      scrollThreshold: 0,
    };
    // Toolbar fixed behavior
    // If toolbar is fixed
    this.fixed_ = false;
    // If fixed is targeted only at the last row
    this.fixedLastrow_ = false;
    // Toolbar flexible behavior
    // If the first row is flexible
    this.hasFlexibleRow_ = false;
    // If use the default behavior
    this.useFlexDefaultBehavior_ = false;
  }

  init() {
    this.fixed_ = this.adapter_.hasClass(foundation_MDCToolbarFoundation.cssClasses.FIXED);
    this.fixedLastrow_ = this.adapter_.hasClass(foundation_MDCToolbarFoundation.cssClasses.FIXED_LASTROW) & this.fixed_;
    this.hasFlexibleRow_ = this.adapter_.hasClass(foundation_MDCToolbarFoundation.cssClasses.TOOLBAR_ROW_FLEXIBLE);
    if (this.hasFlexibleRow_) {
      this.useFlexDefaultBehavior_ = this.adapter_.hasClass(foundation_MDCToolbarFoundation.cssClasses.FLEXIBLE_DEFAULT_BEHAVIOR);
    }
    this.initKeyRatio_();
    this.setKeyHeights_();
    this.adapter_.registerResizeHandler(this.resizeHandler_);
    this.adapter_.registerScrollHandler(this.scrollHandler_);
  }

  destroy() {
    this.adapter_.deregisterResizeHandler(this.resizeHandler_);
    this.adapter_.deregisterScrollHandler(this.scrollHandler_);
  }

  updateAdjustElementStyles() {
    if (this.fixed_) {
      this.adapter_.setStyleForFixedAdjustElement('margin-top', `${this.calculations_.toolbarHeight}px`);
    }
  }

  getFlexibleExpansionRatio_(scrollTop) {
    // To prevent division by zero when there is no flexibleExpansionHeight
    const delta = 0.0001;
    return Math.max(0, 1 - scrollTop / (this.calculations_.flexibleExpansionHeight + delta));
  }

  checkRowHeight_() {
    cancelAnimationFrame(this.checkRowHeightFrame_);
    this.checkRowHeightFrame_ = requestAnimationFrame(() => this.setKeyHeights_());
  }

  setKeyHeights_() {
    const newToolbarRowHeight = this.getRowHeight_();
    if (newToolbarRowHeight !== this.calculations_.toolbarRowHeight) {
      this.calculations_.toolbarRowHeight = newToolbarRowHeight;
      this.calculations_.toolbarHeight = this.calculations_.toolbarRatio * this.calculations_.toolbarRowHeight;
      this.calculations_.flexibleExpansionHeight =
        this.calculations_.flexibleExpansionRatio * this.calculations_.toolbarRowHeight;
      this.calculations_.maxTranslateYDistance =
        this.calculations_.maxTranslateYRatio * this.calculations_.toolbarRowHeight;
      this.calculations_.scrollThreshold =
        this.calculations_.scrollThresholdRatio * this.calculations_.toolbarRowHeight;
      this.updateAdjustElementStyles();
      this.updateToolbarStyles_();
    }
  }

  updateToolbarStyles_() {
    cancelAnimationFrame(this.scrollFrame_);
    this.scrollFrame_ = requestAnimationFrame(() => {
      const scrollTop = this.adapter_.getViewportScrollY();
      const hasScrolledOutOfThreshold = this.scrolledOutOfThreshold_(scrollTop);

      if (hasScrolledOutOfThreshold && this.executedLastChange_) {
        return;
      }

      const flexibleExpansionRatio = this.getFlexibleExpansionRatio_(scrollTop);

      this.updateToolbarFlexibleState_(flexibleExpansionRatio);
      if (this.fixedLastrow_) {
        this.updateToolbarFixedState_(scrollTop);
      }
      if (this.hasFlexibleRow_) {
        this.updateFlexibleRowElementStyles_(flexibleExpansionRatio);
      }
      this.executedLastChange_ = hasScrolledOutOfThreshold;
      this.adapter_.notifyChange({flexibleExpansionRatio: flexibleExpansionRatio});
    });
  }

  scrolledOutOfThreshold_(scrollTop) {
    return scrollTop > this.calculations_.scrollThreshold;
  }

  initKeyRatio_() {
    const toolbarRowHeight = this.getRowHeight_();
    const firstRowMaxRatio = this.adapter_.getFirstRowElementOffsetHeight() / toolbarRowHeight;
    this.calculations_.toolbarRatio = this.adapter_.getOffsetHeight() / toolbarRowHeight;
    this.calculations_.flexibleExpansionRatio = firstRowMaxRatio - 1;
    this.calculations_.maxTranslateYRatio =
      this.fixedLastrow_ ? this.calculations_.toolbarRatio - firstRowMaxRatio : 0;
    this.calculations_.scrollThresholdRatio =
      (this.fixedLastrow_ ? this.calculations_.toolbarRatio : firstRowMaxRatio) - 1;
  }

  getRowHeight_() {
    const breakpoint = foundation_MDCToolbarFoundation.numbers.TOOLBAR_MOBILE_BREAKPOINT;
    return this.adapter_.getViewportWidth() < breakpoint ?
      foundation_MDCToolbarFoundation.numbers.TOOLBAR_ROW_MOBILE_HEIGHT : foundation_MDCToolbarFoundation.numbers.TOOLBAR_ROW_HEIGHT;
  }

  updateToolbarFlexibleState_(flexibleExpansionRatio) {
    this.adapter_.removeClass(foundation_MDCToolbarFoundation.cssClasses.FLEXIBLE_MAX);
    this.adapter_.removeClass(foundation_MDCToolbarFoundation.cssClasses.FLEXIBLE_MIN);
    if (flexibleExpansionRatio === 1) {
      this.adapter_.addClass(foundation_MDCToolbarFoundation.cssClasses.FLEXIBLE_MAX);
    } else if (flexibleExpansionRatio === 0) {
      this.adapter_.addClass(foundation_MDCToolbarFoundation.cssClasses.FLEXIBLE_MIN);
    }
  }

  updateToolbarFixedState_(scrollTop) {
    const translateDistance = Math.max(0, Math.min(
      scrollTop - this.calculations_.flexibleExpansionHeight,
      this.calculations_.maxTranslateYDistance));
    this.adapter_.setStyle('transform', `translateY(${-translateDistance}px)`);

    if (translateDistance === this.calculations_.maxTranslateYDistance) {
      this.adapter_.addClass(foundation_MDCToolbarFoundation.cssClasses.FIXED_AT_LAST_ROW);
    } else {
      this.adapter_.removeClass(foundation_MDCToolbarFoundation.cssClasses.FIXED_AT_LAST_ROW);
    }
  }

  updateFlexibleRowElementStyles_(flexibleExpansionRatio) {
    if (this.fixed_) {
      const height = this.calculations_.flexibleExpansionHeight * flexibleExpansionRatio;
      this.adapter_.setStyleForFlexibleRowElement('height',
        `${height + this.calculations_.toolbarRowHeight}px`);
    }
    if (this.useFlexDefaultBehavior_) {
      this.updateElementStylesDefaultBehavior_(flexibleExpansionRatio);
    }
  }

  updateElementStylesDefaultBehavior_(flexibleExpansionRatio) {
    const maxTitleSize = foundation_MDCToolbarFoundation.numbers.MAX_TITLE_SIZE;
    const minTitleSize = foundation_MDCToolbarFoundation.numbers.MIN_TITLE_SIZE;
    const currentTitleSize = (maxTitleSize - minTitleSize) * flexibleExpansionRatio + minTitleSize;

    this.adapter_.setStyleForTitleElement('font-size', `${currentTitleSize}rem`);
  }
}

// CONCATENATED MODULE: ./node_modules/@material/toolbar/util.js
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

let supportsPassive_;

// Determine whether the current browser supports passive event listeners, and if so, use them.
function applyPassive(globalObj = window, forceRefresh = false) {
  if (supportsPassive_ === undefined || forceRefresh) {
    let isSupported = false;
    try {
      globalObj.document.addEventListener('test', null, {get passive() {
        isSupported = true;
      }});
    } catch (e) { }

    supportsPassive_ = isSupported;
  }

  return supportsPassive_ ? {passive: true} : false;
}

// CONCATENATED MODULE: ./node_modules/@material/toolbar/index.js
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */









class toolbar_MDCToolbar extends base["a" /* MDCComponent */] {
  static attachTo(root) {
    return new toolbar_MDCToolbar(root);
  }

  get firstRowElement_() {
    return this.root_.querySelector(foundation_MDCToolbarFoundation.strings.FIRST_ROW_SELECTOR);
  }

  get titleElement_() {
    return this.root_.querySelector(foundation_MDCToolbarFoundation.strings.TITLE_SELECTOR);
  }

  set fixedAdjustElement(fixedAdjustElement) {
    this.fixedAdjustElement_ = fixedAdjustElement;
    this.foundation_.updateAdjustElementStyles();
  }

  get fixedAdjustElement() {
    return this.fixedAdjustElement_;
  }

  getDefaultFoundation() {
    return new foundation_MDCToolbarFoundation({
      hasClass: (className) => this.root_.classList.contains(className),
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      registerScrollHandler: (handler) => window.addEventListener('scroll', handler, applyPassive()),
      deregisterScrollHandler: (handler) => window.removeEventListener('scroll', handler, applyPassive()),
      registerResizeHandler: (handler) => window.addEventListener('resize', handler),
      deregisterResizeHandler: (handler) => window.removeEventListener('resize', handler),
      getViewportWidth: () => window.innerWidth,
      getViewportScrollY: () => window.pageYOffset,
      getOffsetHeight: () => this.root_.offsetHeight,
      getFirstRowElementOffsetHeight: () => this.firstRowElement_.offsetHeight,
      notifyChange: (evtData) => this.emit(foundation_MDCToolbarFoundation.strings.CHANGE_EVENT, evtData),
      setStyle: (property, value) => this.root_.style.setProperty(property, value),
      setStyleForTitleElement: (property, value) => this.titleElement_.style.setProperty(property, value),
      setStyleForFlexibleRowElement: (property, value) => this.firstRowElement_.style.setProperty(property, value),
      setStyleForFixedAdjustElement: (property, value) => {
        if (this.fixedAdjustElement) {
          this.fixedAdjustElement.style.setProperty(property, value);
        }
      },
    });
  }
}

// CONCATENATED MODULE: ./node_modules/preact-material-components/Toolbar/index.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




/**
 * @prop fixed = false
 * @prop fixed-lastrow-only = false
 * @prop waterfall = false
 * @prop flexible = false
 * @prop flexible-default-behavior = false
 */
class Toolbar_Toolbar extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "toolbar";
    this._mdcProps = ["fixed", "fixed-lastrow-only", "waterfall", "flexible", "flexible-default-behavior"];
    this._onChange = this._onChange.bind(this);
  }
  _onChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }
  componentDidMount() {
    this.MDComponent = new toolbar_MDCToolbar(this.control);
    this.MDComponent.listen("MDCToolbar:change", this._onChange);
  }
  componentWillUnmount() {
    this.MDComponent.unlisten("MDCToolbar:change", this._onChange);
    this.MDComponent.destroy && this.MDComponent.destroy();
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "header",
      _extends({
        ref: control => {
          this.control = control;
        }
      }, props),
      props.children
    );
  }
}

class ToolbarRow extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "toolbar__row";
  }
}

/**
 * @prop align-end = false
 * @prop align-start = false
 * @prop shrink-to-fit = false
 */
class Toolbar_ToolbarSection extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "toolbar__section";
    this._mdcProps = ["align-start", "align-end", "shrink-to-fit"];
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "section",
      props,
      props.children
    );
  }
}

/**
 * @prop menu = false
 */
class Toolbar_ToolbarIcon extends MaterialComponent["a" /* default */] {
  constructor(props) {
    super();
    this.componentName = "toolbar__icon";
    if (props.menu) {
      this.componentName = "toolbar__menu-icon";
    }
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "a",
      _extends({ className: "material-icons" }, props),
      props.children || "menu"
    );
  }
}

/**
 * @prop title = ''
 */
class Toolbar_ToolbarTitle extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "toolbar__title";
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "span",
      props,
      props.children
    );
  }
}

Toolbar_Toolbar.Section = Toolbar_ToolbarSection;
Toolbar_Toolbar.Icon = Toolbar_ToolbarIcon;
Toolbar_Toolbar.Title = Toolbar_ToolbarTitle;
Toolbar_Toolbar.Row = ToolbarRow;

/* harmony default export */ var preact_material_components_Toolbar = __webpack_exports__["a"] = (Toolbar_Toolbar);

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(console) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ganalytics__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_sass__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_sass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__index_sass__);
var elem,App;function init(){App=__webpack_require__(30).default,elem=Object(__WEBPACK_IMPORTED_MODULE_0_preact__["render"])(App,document.getElementById('root'),elem)}init(),navigator.serviceWorker.register('/sw.js').then(function(){console.log('Service worker registered')}).catch(function(a){console.log('Error while registering service worker ',a)}), true?('serviceWorker'in navigator&&navigator.serviceWorker.register('/sw.js'),window.ga=new __WEBPACK_IMPORTED_MODULE_1_ganalytics__["a" /* default */]('UA-XXXXXXXX-X')):(require('preact/devtools'),module.hot&&module.hot.accept('./views',init));
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(8)))

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 25 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
    return global.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = __webpack_require__(14);
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
  return function foo() {}.name === 'foo';
}());
function pToString (obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof global.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' +  name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' +
         self.operator + ' ' +
         truncate(inspect(self.expected), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') &&
             (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected;

  // If both values are instances of typed arrays, wrap their underlying
  // ArrayBuffers in a Buffer each to increase performance
  // This optimization requires the arrays to have the same type as checked by
  // Object.prototype.toString (aka pToString). Never perform binary
  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
  // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) &&
             pToString(actual) === pToString(expected) &&
             !(actual instanceof Float32Array ||
               actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer),
                   new Uint8Array(expected.buffer)) === 0;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || {actual: [], expected: []};

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b))
    return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
    return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
      return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}


// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if ((isUnwantedException &&
      userProvidedMessage &&
      expectedException(actual, expected)) ||
      isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function(err) { if (err) throw err; };

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = now

function now() {
    return new Date().getTime()
}


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var KEY = 'ga:user';
var DNT = navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack;
var UID = (localStorage[KEY] = localStorage[KEY] || Math.random() + '.' + Math.random());

// modified `obj-str`
function encode(obj) {
	var k, str='https://www.google-analytics.com/collect?v=1';
	for (k in obj) {
		if (obj[k]) {
			str += ('&' + k + '=' + encodeURIComponent(obj[k]));
		}
	}
	return str;
}

function GA(ua, opts) {
	opts = opts || {};
	this.args = Object.assign({ tid:ua, cid:UID }, opts);
	this.send('pageview');
}

GA.prototype.send = function (type, opts) {
	if (DNT) return;
	if (type === 'pageview' && !opts) {
		opts = { dl:location.href, dt:document.title };
	}
	var obj = Object.assign({ t:type }, this.args, opts, { z:Date.now() });
	new Image().src = encode(obj); // dispatch a GET
};

/* harmony default export */ __webpack_exports__["a"] = (GA);


/***/ }),
/* 29 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/preact/dist/preact.esm.js
var preact_esm = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/preact-router/dist/preact-router.es.js
var preact_router_es = __webpack_require__(7);

// EXTERNAL MODULE: ./client/src/views/pages/home.js
var home = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/preact-material-components/Toolbar/index.js + 4 modules
var Toolbar = __webpack_require__(22);

// CONCATENATED MODULE: ./client/src/views/tags/header.js
/* harmony default export */ var header = (function(){return Object(preact_esm["h"])(Toolbar["a" /* default */],{className:'toolbar'},Object(preact_esm["h"])(Toolbar["a" /* default */].Row,null,Object(preact_esm["h"])(Toolbar["a" /* default */].Section,{"align-start":!0},Object(preact_esm["h"])(Toolbar["a" /* default */].Icon,{menu:!0},'menu'),Object(preact_esm["h"])(Toolbar["a" /* default */].Title,null,'My App')),Object(preact_esm["h"])(Toolbar["a" /* default */].Section,{"align-end":!0},Object(preact_esm["h"])(Toolbar["a" /* default */].Icon,null,'more_vert'))))});
// CONCATENATED MODULE: ./client/src/views/tags/layout.js
/* harmony default export */ var layout = (function(a){return Object(preact_esm["h"])('div',{id:'app'},Object(preact_esm["h"])(header,null),Object(preact_esm["h"])('main',{id:'content'},Object(preact_esm["h"])('div',{id:'stars'}),Object(preact_esm["h"])('div',{id:'stars2'}),Object(preact_esm["h"])('div',{id:'stars3'}),a.children))});
// CONCATENATED MODULE: ./client/src/views/tags/card.js
/* harmony default export */ var card = (function(a){return Object(preact_esm["h"])("div",{className:"card"},a.children)});
// CONCATENATED MODULE: ./client/src/views/pages/article.js
/* harmony default export */ var article = (function(a){var b=a.title;return Object(preact_esm["h"])('div',{className:'page page__article'},Object(preact_esm["h"])(card,null,Object(preact_esm["h"])('h1',null,b,': ',Object(preact_esm["h"])('small',null,'A killer story')),Object(preact_esm["h"])(preact_router_es["a" /* Link */],{href:'/blog',className:'back'},'Back to Blog'),Object(preact_esm["h"])('p',null,'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam maiores necessitatibus nihil quo, cupiditate consectetur voluptatem cumque ipsum consequuntur aut repellat repellendus eligendi, placeat inventore perspiciatis dolores ipsa voluptates porro.'),Object(preact_esm["h"])('p',null,'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam maiores necessitatibus nihil quo, cupiditate consectetur voluptatem cumque ipsum consequuntur aut repellat repellendus eligendi, placeat inventore perspiciatis dolores ipsa voluptates porro.'),Object(preact_esm["h"])('p',null,'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam maiores necessitatibus nihil quo, cupiditate consectetur voluptatem cumque ipsum consequuntur aut repellat repellendus eligendi, placeat inventore perspiciatis dolores ipsa voluptates porro.'),Object(preact_esm["h"])('p',null,'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam maiores necessitatibus nihil quo, cupiditate consectetur voluptatem cumque ipsum consequuntur aut repellat repellendus eligendi, placeat inventore perspiciatis dolores ipsa voluptates porro.'),Object(preact_esm["h"])('p',null,'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam maiores necessitatibus nihil quo, cupiditate consectetur voluptatem cumque ipsum consequuntur aut repellat repellendus eligendi, placeat inventore perspiciatis dolores ipsa voluptates porro.'),Object(preact_esm["h"])('p',null,'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam maiores necessitatibus nihil quo, cupiditate consectetur voluptatem cumque ipsum consequuntur aut repellat repellendus eligendi, placeat inventore perspiciatis dolores ipsa voluptates porro.')))});
// CONCATENATED MODULE: ./client/src/views/pages/errors/404.js
/* harmony default export */ var _04 = (function(a){return Object(preact_esm["h"])('div',{className:'page page__404'},Object(preact_esm["h"])(card,null,Object(preact_esm["h"])('h1',null,'404 Page'),Object(preact_esm["h"])('p',null,'Looks like you were given a bad link ;-)'),Object(preact_esm["h"])('pre',null,a.url)))});
// CONCATENATED MODULE: ./client/src/views/pages/credit.js
var links=[{name:'lukeed/preact-starter',desc:'A Webpack2 starter for building SPA / PWA / offline front-end apps with Preact',href:'https://github.com/lukeed/preact-starter'},{name:'developit/preact',desc:'Fast 3kb React alternative with the same ES6 API. Components & Virtual DOM.',href:'https://www.npmjs.com/package/preact'},{name:'developit/preact-router',desc:'URL router for Preact.',href:'https://www.npmjs.com/package/preact-router'},{name:'webpack/webpack',desc:'A bundler for javascript and friends. Allows for code splitting & asynchronous lazy-loading.',href:'https://github.com/webpack/webpack'},{name:'zeit/now',desc:'Free (OSS) realtime global deployments',href:'https://zeit.co/now'},{name:'zeit/serve',desc:'Single-command HTTP directory listing and file serving',href:'https://github.com/zeit/serve'}];/* harmony default export */ var credit = (function(){return Object(preact_esm["h"])('div',{className:'page page__credit'},Object(preact_esm["h"])(card,null,Object(preact_esm["h"])('h1',null,'Credits:'),Object(preact_esm["h"])('p',null,'Resources used within boilerplate:')),Object(preact_esm["h"])('nav',null,links.map(function(a){return Object(preact_esm["h"])('a',{className:'card',href:a.href,target:'_blank',rel:'noopener'},Object(preact_esm["h"])('strong',null,a.name),Object(preact_esm["h"])('em',null,a.desc))})))});
// CONCATENATED MODULE: ./client/src/views/tags/card-link.js
/* harmony default export */ var card_link = (function(a){return Object(preact_esm["h"])(preact_router_es["a" /* Link */],{href:a.href,className:'card'},a.children)});
// CONCATENATED MODULE: ./client/src/views/pages/blog.js
/* harmony default export */ var blog = (function(){return Object(preact_esm["h"])('div',{className:'page page__blog'},Object(preact_esm["h"])(card,null,Object(preact_esm["h"])('h1',null,'Blog'),Object(preact_esm["h"])('p',null,'Please select an Article to read.')),Object(preact_esm["h"])('nav',null,[1,2,3,4,5,6,7,8,9,10].map(function(a){return Object(preact_esm["h"])(card_link,{href:'/blog/article'+a},Object(preact_esm["h"])('strong',null,'Article #',a),Object(preact_esm["h"])('em',null,'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore enim, natus. Beatae ducimus quasi doloremque ad quam qui dolor, architecto repellendus provident rem nostrum accusamus, magnam voluptate vel voluptas iste.'))})))});
// CONCATENATED MODULE: ./client/src/views/index.js
var onChange=function(a){return window.ga&&ga.send('pageview',{dp:a.url})};/* harmony default export */ var views = __webpack_exports__["default"] = (Object(preact_esm["h"])(layout,null,Object(preact_esm["h"])(preact_router_es["b" /* Router */],{onChange:onChange},Object(preact_esm["h"])(home["a" /* default */],{path:'/'}),Object(preact_esm["h"])(blog,{path:'/blog'}),Object(preact_esm["h"])(article,{path:'/blog/:title'}),Object(preact_esm["h"])(credit,{path:'/credit'}),Object(preact_esm["h"])(_04,{default:!0}))));

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(console) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_linkstate__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_preact_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_preact_material_components_Card__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_preact_material_components__ = __webpack_require__(52);
function _objectDestructuringEmpty(a){if(null==a)throw new TypeError('Cannot destructure undefined')}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var FriendCard=function(a){function b(){return _classCallCheck(this,b),_possibleConstructorReturn(this,a.apply(this,arguments))}return _inherits(b,a),b.prototype.render=function(a,b){var c=a.friend;return _objectDestructuringEmpty(b),Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div',null,Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div',{class:'mdl-card__title mdl-card--expand',style:{backgroundImage:'url('+c.photo+')',backgroundPosition:'center',backgroundColor:'#DADFE9'}}),Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div',{class:'mdl-card__supporting-text'},Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('h2',{class:'mdl-card__title-text'},c.firstName,' ',c.lastName),c.hobbies||c.likes?'Your friend likes '+c.hobbies+' and are passionate about '+c.likes:'Uh oh! Your friend hasn\'t revealed their interests. Check back here after sometime to see if they have submitted it.'))},b}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]),Home=function(a){function b(){_classCallCheck(this,b);var c=_possibleConstructorReturn(this,a.call(this));return c.submitDetails=function(){var a=c.getUrlParameter('id');console.log(a),!1===a||(console.log(c.state),__WEBPACK_IMPORTED_MODULE_1_axios___default.a.post('/api/users',{index:a,likes:c.state.likes,hobbies:c.state.hobbies}).then(function(){c.setState({formSubmitted:!0}),localStorage.setItem('formSubmitted',!0),c.getFriend()}).catch(function(a){console.log(a)}))},c.getFriend=function(){var a=c.getUrlParameter('id');console.log(a),!1===a||__WEBPACK_IMPORTED_MODULE_1_axios___default.a.get('/api/friend',{params:{id:a}}).then(function(a){console.log(a.data);var b=a.data;b.photo=b.photo.replace('thumb','original'),b.photo.startsWith('/people')&&(b.photo='https://people.zoho.com'+b.photo),c.setState({friend:b})}).catch(function(a){console.log(a)})},c.toggleFriend=function(){var a=c.state.showFriend;c.setState({showFriend:!a})},c.addToHome=function(){},c.getUrlParameter=function(a){var b,c,d=decodeURIComponent(window.location.search.substring(1)),e=d.split('&');for(c=0;c<e.length;c++)if(b=e[c].split('='),b[0]===a)return void 0!==b[1]&&b[1]},c.setState({friend:{},showFriend:!1,formSubmitted:localStorage.getItem('formSubmitted')}),c.getFriend(),c}return _inherits(b,a),b.prototype.render=function(a,b){var c=b.hobbies,d=b.likes,e=b.formSubmitted,f=b.friend,g=b.showFriend;return _objectDestructuringEmpty(a),Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div',{className:'page page__home'},Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div',{id:'title'},Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div',null,'X\'MAS FRIEND FINDER')),Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('br',null),Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div',{className:'mdl-layout mdl-js-layout mdl-color--grey-100'},Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('main',{className:'mdl-layout__content'},e?Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div',{class:'demo-card-square mdl-card mdl-shadow--2dp fill-width'},g?Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(FriendCard,{friend:f}):'',Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div',{class:'mdl-card__actions mdl-card--border'},Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('a',{class:'mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect',onClick:this.toggleFriend},g?'Hide Friend':'View Friend'))):Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div',{className:'mdl-card mdl-shadow--6dp fill-width'},Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div',{className:'mdl-card__title mdl-color--primary mdl-color-text--white'},Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('h2',{className:'mdl-card__title-text'},'Before we begin, kindly fill out these details about your self.')),Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div',{className:'mdl-card__supporting-text'},Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('form',{action:'#'},Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div',{className:'mdl-textfield mdl-js-textfield fill-width'},Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_5_preact_material_components__["a" /* TextField */],{className:'fill-width',placeholder:'Enter here',type:'text',value:c,onInput:Object(__WEBPACK_IMPORTED_MODULE_2_linkstate__["a" /* default */])(this,'hobbies')}),Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('label',{className:'mdl-textfield__label',for:'username'},'Things I like to do')),Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div',{className:'mdl-textfield mdl-js-textfield fill-width'},Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_5_preact_material_components__["a" /* TextField */],{className:'fill-width',placeholder:'Enter here',type:'text',value:d,onInput:Object(__WEBPACK_IMPORTED_MODULE_2_linkstate__["a" /* default */])(this,'likes')}),Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('label',{className:'mdl-textfield__label',for:'userpass'},'Things I am passionate about')))),Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div',{className:'mdl-card__actions mdl-card--border'},Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('button',{className:'mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect',onClick:this.submitDetails},'Submit'))))))},b}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);/* harmony default export */ __webpack_exports__["a"] = (Home);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(8)))

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(33);

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);
var bind = __webpack_require__(16);
var Axios = __webpack_require__(35);
var defaults = __webpack_require__(11);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(20);
axios.CancelToken = __webpack_require__(49);
axios.isCancel = __webpack_require__(19);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(50);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 34 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(11);
var utils = __webpack_require__(3);
var InterceptorManager = __webpack_require__(44);
var dispatchRequest = __webpack_require__(45);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(18);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);
var transformData = __webpack_require__(46);
var isCancel = __webpack_require__(19);
var defaults = __webpack_require__(11);
var isAbsoluteURL = __webpack_require__(47);
var combineURLs = __webpack_require__(48);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(20);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function dlv(obj, key, def, p) {
	p = 0;
	key = key.split ? key.split('.') : key;
	while (obj && p<key.length) { obj = obj[key[p++]]; }
	return obj===undefined ? def : obj;
}

/** Create an Event handler function that sets a given state property.
 *	@param {Component} component	The component whose state should be updated
 *	@param {string} key				A dot-notated key path to update in the component's state
 *	@param {string} eventPath		A dot-notated key path to the value that should be retrieved from the Event or component
 *	@returns {function} linkedStateHandler
 */
function linkState(component, key, eventPath) {
	var path = key.split('.'),
		cache = component.__lsc || (component.__lsc = {});

	return cache[key+eventPath] || (cache[key+eventPath] = function(e) {
		var t = e && e.target || this,
			state = {},
			obj = state,
			v = typeof eventPath==='string' ? dlv(e, eventPath) : t.nodeName ? (t.type.match(/^che|rad/) ? t.checked : t.value) : e,
			i = 0;
		for ( ; i<path.length-1; i++) {
			obj = obj[path[i]] || (obj[path[i]] = !i && component.state[path[i]] || {});
		}
		obj[path[i]] = v;
		component.setState(state);
	});
}

/* harmony default export */ __webpack_exports__["a"] = (linkState);
//# sourceMappingURL=linkstate.es.js.map


/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/preact-material-components/Button/index.js
var Button = __webpack_require__(13);

// EXTERNAL MODULE: ./node_modules/preact/dist/preact.esm.js
var preact_esm = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/preact-material-components/MaterialComponent.js
var MaterialComponent = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/@material/animation/index.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @typedef {{
 *   noPrefix: string,
 *   webkitPrefix: string,
 *   styleProperty: string
 * }}
 */
let VendorPropertyMapType;

/** @const {Object<string, !VendorPropertyMapType>} */
const eventTypeMap = {
  'animationstart': {
    noPrefix: 'animationstart',
    webkitPrefix: 'webkitAnimationStart',
    styleProperty: 'animation',
  },
  'animationend': {
    noPrefix: 'animationend',
    webkitPrefix: 'webkitAnimationEnd',
    styleProperty: 'animation',
  },
  'animationiteration': {
    noPrefix: 'animationiteration',
    webkitPrefix: 'webkitAnimationIteration',
    styleProperty: 'animation',
  },
  'transitionend': {
    noPrefix: 'transitionend',
    webkitPrefix: 'webkitTransitionEnd',
    styleProperty: 'transition',
  },
};

/** @const {Object<string, !VendorPropertyMapType>} */
const cssPropertyMap = {
  'animation': {
    noPrefix: 'animation',
    webkitPrefix: '-webkit-animation',
  },
  'transform': {
    noPrefix: 'transform',
    webkitPrefix: '-webkit-transform',
  },
  'transition': {
    noPrefix: 'transition',
    webkitPrefix: '-webkit-transition',
  },
};

/**
 * @param {!Object} windowObj
 * @return {boolean}
 */
function hasProperShape(windowObj) {
  return (windowObj['document'] !== undefined && typeof windowObj['document']['createElement'] === 'function');
}

/**
 * @param {string} eventType
 * @return {boolean}
 */
function eventFoundInMaps(eventType) {
  return (eventType in eventTypeMap || eventType in cssPropertyMap);
}

/**
 * @param {string} eventType
 * @param {!Object<string, !VendorPropertyMapType>} map
 * @param {!Element} el
 * @return {string}
 */
function getJavaScriptEventName(eventType, map, el) {
  return map[eventType].styleProperty in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
}

/**
 * Helper function to determine browser prefix for CSS3 animation events
 * and property names.
 * @param {!Object} windowObj
 * @param {string} eventType
 * @return {string}
 */
function getAnimationName(windowObj, eventType) {
  if (!hasProperShape(windowObj) || !eventFoundInMaps(eventType)) {
    return eventType;
  }

  const map = /** @type {!Object<string, !VendorPropertyMapType>} */ (
    eventType in eventTypeMap ? eventTypeMap : cssPropertyMap
  );
  const el = windowObj['document']['createElement']('div');
  let eventName = '';

  if (map === eventTypeMap) {
    eventName = getJavaScriptEventName(eventType, map, el);
  } else {
    eventName = map[eventType].noPrefix in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
  }

  return eventName;
}

// Public functions to access getAnimationName() for JavaScript events or CSS
// property names.

const transformStyleProperties = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'MSTransform'];

/**
 * @param {!Object} windowObj
 * @param {string} eventType
 * @return {string}
 */
function getCorrectEventName(windowObj, eventType) {
  return getAnimationName(windowObj, eventType);
}

/**
 * @param {!Object} windowObj
 * @param {string} eventType
 * @return {string}
 */
function getCorrectPropertyName(windowObj, eventType) {
  return getAnimationName(windowObj, eventType);
}



// EXTERNAL MODULE: ./node_modules/@material/base/component.js
var component = __webpack_require__(5);

// EXTERNAL MODULE: ./node_modules/preact-material-components/node_modules/@material/ripple/index.js + 3 modules
var ripple = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/selection-control/index.js
/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

/**
 * @typedef {!{
 *   checked: boolean,
 *   indeterminate: boolean,
 *   disabled: boolean,
 *   value: ?string
 * }}
 */
let MDCSelectionControlState;

/**
 * @record
 */
class MDCSelectionControl {
  /** @return {?MDCRipple} */
  get ripple() {}
}



// EXTERNAL MODULE: ./node_modules/@material/base/foundation.js
var base_foundation = __webpack_require__(2);

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/checkbox/adapter.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-unused-vars */


/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Checkbox. Provides an interface for managing
 * - classes
 * - dom
 * - event handlers
 *
 * Additionally, provides type information for the adapter to the Closure
 * compiler.
 *
 * Implement this adapter for your framework of choice to delegate updates to
 * the component in your framework of choice. See architecture documentation
 * for more details.
 * https://github.com/material-components/material-components-web/blob/master/docs/architecture.md
 *
 * @record
 */
class MDCCheckboxAdapter {
  /** @param {string} className */
  addClass(className) {}

  /** @param {string} className */
  removeClass(className) {}

  /** @param {!EventListener} handler */
  registerAnimationEndHandler(handler) {}

  /** @param {!EventListener} handler */
  deregisterAnimationEndHandler(handler) {}

  /** @param {!EventListener} handler */
  registerChangeHandler(handler) {}

  /** @param {!EventListener} handler */
  deregisterChangeHandler(handler) {}

  /** @return {!MDCSelectionControlState} */
  getNativeControl() {}

  forceLayout() {}

  /** @return {boolean} */
  isAttachedToDOM() {}
}

/* harmony default export */ var checkbox_adapter = (MDCCheckboxAdapter);

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/checkbox/constants.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @const {string} */
const ROOT = 'mdc-checkbox';

/** @enum {string} */
const cssClasses = {
  UPGRADED: 'mdc-checkbox--upgraded',
  CHECKED: 'mdc-checkbox--checked',
  INDETERMINATE: 'mdc-checkbox--indeterminate',
  DISABLED: 'mdc-checkbox--disabled',
  ANIM_UNCHECKED_CHECKED: 'mdc-checkbox--anim-unchecked-checked',
  ANIM_UNCHECKED_INDETERMINATE: 'mdc-checkbox--anim-unchecked-indeterminate',
  ANIM_CHECKED_UNCHECKED: 'mdc-checkbox--anim-checked-unchecked',
  ANIM_CHECKED_INDETERMINATE: 'mdc-checkbox--anim-checked-indeterminate',
  ANIM_INDETERMINATE_CHECKED: 'mdc-checkbox--anim-indeterminate-checked',
  ANIM_INDETERMINATE_UNCHECKED: 'mdc-checkbox--anim-indeterminate-unchecked',
};

/** @enum {string} */
const strings = {
  NATIVE_CONTROL_SELECTOR: `.${ROOT}__native-control`,
  TRANSITION_STATE_INIT: 'init',
  TRANSITION_STATE_CHECKED: 'checked',
  TRANSITION_STATE_UNCHECKED: 'unchecked',
  TRANSITION_STATE_INDETERMINATE: 'indeterminate',
};

/** @enum {number} */
const numbers = {
  ANIM_END_LATCH_MS: 100,
};



// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/checkbox/foundation.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/* eslint-disable no-unused-vars */


/* eslint-enable no-unused-vars */


/** @const {!Array<string>} */
const CB_PROTO_PROPS = ['checked', 'indeterminate'];

/**
 * @extends {MDCFoundation<!MDCCheckboxAdapter>}
 */
class foundation_MDCCheckboxFoundation extends base_foundation["a" /* default */] {
  /** @return enum {cssClasses} */
  static get cssClasses() {
    return cssClasses;
  }

  /** @return enum {strings} */
  static get strings() {
    return strings;
  }

  /** @return enum {numbers} */
  static get numbers() {
    return numbers;
  }

  /** @return {!MDCCheckboxAdapter} */
  static get defaultAdapter() {
    return /** @type {!MDCCheckboxAdapter} */ ({
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      registerAnimationEndHandler: (/* handler: EventListener */) => {},
      deregisterAnimationEndHandler: (/* handler: EventListener */) => {},
      registerChangeHandler: (/* handler: EventListener */) => {},
      deregisterChangeHandler: (/* handler: EventListener */) => {},
      getNativeControl: () => /* !MDCSelectionControlState */ {},
      forceLayout: () => {},
      isAttachedToDOM: () => /* boolean */ {},
    });
  }

  constructor(adapter) {
    super(Object.assign(foundation_MDCCheckboxFoundation.defaultAdapter, adapter));

    /** @private {string} */
    this.currentCheckState_ = strings.TRANSITION_STATE_INIT;

    /** @private {string} */
    this.currentAnimationClass_ = '';

    /** @private {number} */
    this.animEndLatchTimer_ = 0;

    this.animEndHandler_ = /** @private {!EventListener} */ (() => {
      clearTimeout(this.animEndLatchTimer_);
      this.animEndLatchTimer_ = setTimeout(() => {
        this.adapter_.removeClass(this.currentAnimationClass_);
        this.adapter_.deregisterAnimationEndHandler(this.animEndHandler_);
      }, numbers.ANIM_END_LATCH_MS);
    });

    this.changeHandler_ = /** @private {!EventListener} */ (
      () => this.transitionCheckState_());
  }

  init() {
    this.currentCheckState_ = this.determineCheckState_(this.getNativeControl_());
    this.adapter_.addClass(cssClasses.UPGRADED);
    this.adapter_.registerChangeHandler(this.changeHandler_);
    this.installPropertyChangeHooks_();
  }

  destroy() {
    this.adapter_.deregisterChangeHandler(this.changeHandler_);
    this.uninstallPropertyChangeHooks_();
  }

  /** @return {boolean} */
  isChecked() {
    return this.getNativeControl_().checked;
  }

  /** @param {boolean} checked */
  setChecked(checked) {
    this.getNativeControl_().checked = checked;
  }

  /** @return {boolean} */
  isIndeterminate() {
    return this.getNativeControl_().indeterminate;
  }

  /** @param {boolean} indeterminate */
  setIndeterminate(indeterminate) {
    this.getNativeControl_().indeterminate = indeterminate;
  }

  /** @return {boolean} */
  isDisabled() {
    return this.getNativeControl_().disabled;
  }

  /** @param {boolean} disabled */
  setDisabled(disabled) {
    this.getNativeControl_().disabled = disabled;
    if (disabled) {
      this.adapter_.addClass(cssClasses.DISABLED);
    } else {
      this.adapter_.removeClass(cssClasses.DISABLED);
    }
  }

  /** @return {?string} */
  getValue() {
    return this.getNativeControl_().value;
  }

  /** @param {?string} value */
  setValue(value) {
    this.getNativeControl_().value = value;
  }

  /** @private */
  installPropertyChangeHooks_() {
    const nativeCb = this.getNativeControl_();
    const cbProto = Object.getPrototypeOf(nativeCb);

    CB_PROTO_PROPS.forEach((controlState) => {
      const desc = Object.getOwnPropertyDescriptor(cbProto, controlState);
      // We have to check for this descriptor, since some browsers (Safari) don't support its return.
      // See: https://bugs.webkit.org/show_bug.cgi?id=49739
      if (validDescriptor(desc)) {
        const nativeCbDesc = /** @type {!ObjectPropertyDescriptor} */ ({
          get: desc.get,
          set: (state) => {
            desc.set.call(nativeCb, state);
            this.transitionCheckState_();
          },
          configurable: desc.configurable,
          enumerable: desc.enumerable,
        });
        Object.defineProperty(nativeCb, controlState, nativeCbDesc);
      }
    });
  }

  /** @private */
  uninstallPropertyChangeHooks_() {
    const nativeCb = this.getNativeControl_();
    const cbProto = Object.getPrototypeOf(nativeCb);

    CB_PROTO_PROPS.forEach((controlState) => {
      const desc = /** @type {!ObjectPropertyDescriptor} */ (
        Object.getOwnPropertyDescriptor(cbProto, controlState));
      if (validDescriptor(desc)) {
        Object.defineProperty(nativeCb, controlState, desc);
      }
    });
  }

  /** @private */
  transitionCheckState_() {
    const nativeCb = this.adapter_.getNativeControl();
    if (!nativeCb) {
      return;
    }
    const oldState = this.currentCheckState_;
    const newState = this.determineCheckState_(nativeCb);
    if (oldState === newState) {
      return;
    }

    // Check to ensure that there isn't a previously existing animation class, in case for example
    // the user interacted with the checkbox before the animation was finished.
    if (this.currentAnimationClass_.length > 0) {
      clearTimeout(this.animEndLatchTimer_);
      this.adapter_.forceLayout();
      this.adapter_.removeClass(this.currentAnimationClass_);
    }

    this.currentAnimationClass_ = this.getTransitionAnimationClass_(oldState, newState);
    this.currentCheckState_ = newState;

    // Check for parentNode so that animations are only run when the element is attached
    // to the DOM.
    if (this.adapter_.isAttachedToDOM() && this.currentAnimationClass_.length > 0) {
      this.adapter_.addClass(this.currentAnimationClass_);
      this.adapter_.registerAnimationEndHandler(this.animEndHandler_);
    }
  }

  /**
   * @param {!MDCSelectionControlState} nativeCb
   * @return {string}
   * @private
   */
  determineCheckState_(nativeCb) {
    const {
      TRANSITION_STATE_INDETERMINATE,
      TRANSITION_STATE_CHECKED,
      TRANSITION_STATE_UNCHECKED,
    } = strings;

    if (nativeCb.indeterminate) {
      return TRANSITION_STATE_INDETERMINATE;
    }
    return nativeCb.checked ? TRANSITION_STATE_CHECKED : TRANSITION_STATE_UNCHECKED;
  }

  /**
   * @param {string} oldState
   * @param {string} newState
   * @return {string}
   */
  getTransitionAnimationClass_(oldState, newState) {
    const {
      TRANSITION_STATE_INIT,
      TRANSITION_STATE_CHECKED,
      TRANSITION_STATE_UNCHECKED,
    } = strings;

    const {
      ANIM_UNCHECKED_CHECKED,
      ANIM_UNCHECKED_INDETERMINATE,
      ANIM_CHECKED_UNCHECKED,
      ANIM_CHECKED_INDETERMINATE,
      ANIM_INDETERMINATE_CHECKED,
      ANIM_INDETERMINATE_UNCHECKED,
    } = foundation_MDCCheckboxFoundation.cssClasses;

    switch (oldState) {
    case TRANSITION_STATE_INIT:
      if (newState === TRANSITION_STATE_UNCHECKED) {
        return '';
      }
    // fallthrough
    case TRANSITION_STATE_UNCHECKED:
      return newState === TRANSITION_STATE_CHECKED ? ANIM_UNCHECKED_CHECKED : ANIM_UNCHECKED_INDETERMINATE;
    case TRANSITION_STATE_CHECKED:
      return newState === TRANSITION_STATE_UNCHECKED ? ANIM_CHECKED_UNCHECKED : ANIM_CHECKED_INDETERMINATE;
    // TRANSITION_STATE_INDETERMINATE
    default:
      return newState === TRANSITION_STATE_CHECKED ?
        ANIM_INDETERMINATE_CHECKED : ANIM_INDETERMINATE_UNCHECKED;
    }
  }

  /**
   * @return {!MDCSelectionControlState}
   * @private
   */
  getNativeControl_() {
    return this.adapter_.getNativeControl() || {
      checked: false,
      indeterminate: false,
      disabled: false,
      value: null,
    };
  }
}

/**
 * @param {ObjectPropertyDescriptor|undefined} inputPropDesc
 * @return {boolean}
 */
function validDescriptor(inputPropDesc) {
  return !!inputPropDesc && typeof inputPropDesc.set === 'function';
}

/* harmony default export */ var checkbox_foundation = (foundation_MDCCheckboxFoundation);

// EXTERNAL MODULE: ./node_modules/preact-material-components/node_modules/@material/ripple/util.js
var util = __webpack_require__(12);

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/checkbox/index.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */




/**
 * @extends MDCComponent<!MDCCheckboxFoundation>
 * @implements {MDCSelectionControl}
 */
class checkbox_MDCCheckbox extends component["a" /* default */] {
  static attachTo(root) {
    return new checkbox_MDCCheckbox(root);
  }

  /**
   * Returns the state of the native control element, or null if the native control element is not present.
   * @return {?MDCSelectionControlState}
   * @private
   */
  get nativeCb_() {
    const {NATIVE_CONTROL_SELECTOR} = checkbox_foundation.strings;
    const cbEl = /** @type {?MDCSelectionControlState} */ (
      this.root_.querySelector(NATIVE_CONTROL_SELECTOR));
    return cbEl;
  }

  constructor(...args) {
    super(...args);

    /** @private {!MDCRipple} */
    this.ripple_ = this.initRipple_();
  }

  /**
   * @return {!MDCRipple}
   * @private
   */
  initRipple_() {
    const MATCHES = Object(util["b" /* getMatchesProperty */])(HTMLElement.prototype);
    const adapter = Object.assign(ripple["a" /* MDCRipple */].createAdapter(this), {
      isUnbounded: () => true,
      isSurfaceActive: () => this.nativeCb_[MATCHES](':active'),
      registerInteractionHandler: (type, handler) => this.nativeCb_.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => this.nativeCb_.removeEventListener(type, handler),
      computeBoundingRect: () => {
        const {left, top} = this.root_.getBoundingClientRect();
        const DIM = 40;
        return {
          top,
          left,
          right: left + DIM,
          bottom: top + DIM,
          width: DIM,
          height: DIM,
        };
      },
    });
    const foundation = new ripple["b" /* MDCRippleFoundation */](adapter);
    return new ripple["a" /* MDCRipple */](this.root_, foundation);
  }

  /** @return {!MDCCheckboxFoundation} */
  getDefaultFoundation() {
    return new checkbox_foundation({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      registerAnimationEndHandler:
        (handler) => this.root_.addEventListener(getCorrectEventName(window, 'animationend'), handler),
      deregisterAnimationEndHandler:
        (handler) => this.root_.removeEventListener(getCorrectEventName(window, 'animationend'), handler),
      registerChangeHandler: (handler) => this.nativeCb_.addEventListener('change', handler),
      deregisterChangeHandler: (handler) => this.nativeCb_.removeEventListener('change', handler),
      getNativeControl: () => this.nativeCb_,
      forceLayout: () => this.root_.offsetWidth,
      isAttachedToDOM: () => Boolean(this.root_.parentNode),
    });
  }

  /** @return {!MDCRipple} */
  get ripple() {
    return this.ripple_;
  }

  /** @return {boolean} */
  get checked() {
    return this.foundation_.isChecked();
  }

  /** @param {boolean} checked */
  set checked(checked) {
    this.foundation_.setChecked(checked);
  }

  /** @return {boolean} */
  get indeterminate() {
    return this.foundation_.isIndeterminate();
  }

  /** @param {boolean} indeterminate */
  set indeterminate(indeterminate) {
    this.foundation_.setIndeterminate(indeterminate);
  }

  /** @return {boolean} */
  get disabled() {
    return this.foundation_.isDisabled();
  }

  /** @param {boolean} disabled */
  set disabled(disabled) {
    this.foundation_.setDisabled(disabled);
  }

  /** @return {?string} */
  get value() {
    return this.foundation_.getValue();
  }

  /** @param {?string} value */
  set value(value) {
    this.foundation_.setValue(value);
  }

  destroy() {
    this.ripple_.destroy();
    super.destroy();
  }
}



// CONCATENATED MODULE: ./node_modules/preact-material-components/Checkbox/index.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }





/*
 * Default props for check box
 */
const defaultProps = {
  checked: false,
  indeterminate: false
};

/**
 */
class Checkbox_Checkbox extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "checkbox";
    this._mdcProps = ["disabled"];
  }
  componentDidMount() {
    this.MDComponent = new checkbox_MDCCheckbox(this.control);
    toggleCheckbox(defaultProps, this.props, this.MDComponent);
  }
  componentWillUnmount() {
    this.MDComponent.destroy && this.MDComponent.destroy();
  }
  componentWillUpdate(nextProps) {
    toggleCheckbox(this.props, nextProps, this.MDComponent);
  }
  materialDom(allprops) {
    const { className } = allprops,
          props = _objectWithoutProperties(allprops, ["className"]);
    return Object(preact_esm["h"])(
      "div",
      {
        className: "mdc-checkbox " + className,
        ref: control => {
          this.control = control;
        }
      },
      Object(preact_esm["h"])("input", _extends({
        type: "checkbox",
        className: "mdc-checkbox__native-control"
      }, props)),
      Object(preact_esm["h"])(
        "div",
        { className: "mdc-checkbox__background" },
        Object(preact_esm["h"])(
          "svg",
          {
            version: "1.1",
            className: "mdc-checkbox__checkmark",
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24"
          },
          Object(preact_esm["h"])("path", {
            className: "mdc-checkbox__checkmark__path",
            fill: "none",
            stroke: "white",
            d: "M1.73,12.91 8.1,19.28 22.79,4.59"
          })
        ),
        Object(preact_esm["h"])("div", { className: "mdc-checkbox__mixedmark" })
      )
    );
  }
}

/*
 * Function to add declarative opening/closing to drawer
 */
function toggleCheckbox(oldprops, newprops, cbox) {
  if ("checked" in oldprops && "checked" in newprops && oldprops.checked !== newprops.checked) {
    cbox.checked = newprops.checked;
  }

  if ("indeterminate" in oldprops && "indeterminate" in newprops && oldprops.indeterminate !== newprops.indeterminate) {
    cbox.indeterminate = newprops.indeterminate;
  }
}
// EXTERNAL MODULE: ./node_modules/preact-material-components/Icon/index.js
var Icon = __webpack_require__(9);

// CONCATENATED MODULE: ./node_modules/preact-material-components/Fab/index.js
var Fab__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





/**
 * @prop mini = false
 * @prop exited = false
 */
class Fab_Fab extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "fab";
    this._mdcProps = ["mini", "exited"];
  }
  componentDidMount() {
    super.attachRipple();
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "button",
      Fab__extends({}, props, { ref: control => this.control = control }),
      props.children
    );
  }
}

class FabIcon extends Icon["a" /* default */] {
  constructor() {
    super();
    this.componentName = "fab__icon";
  }
}

Fab_Fab.Icon = FabIcon;
/* harmony default export */ var preact_material_components_Fab = (Fab_Fab);
// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/icon-toggle/adapter.js
/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Icon Toggle. Provides an interface for managing
 * - classes
 * - dom
 * - inner text
 * - event handlers
 * - event dispatch
 *
 * Additionally, provides type information for the adapter to the Closure
 * compiler.
 *
 * Implement this adapter for your framework of choice to delegate updates to
 * the component in your framework of choice. See architecture documentation
 * for more details.
 * https://github.com/material-components/material-components-web/blob/master/docs/architecture.md
 *
 * @record
 */

class MDCIconToggleAdapter {
  /** @param {string} className */
  addClass(className) {}

  /** @param {string} className */
  removeClass(className) {}

  /**
   * @param {string} type
   * @param {!EventListener} handler
   */
  registerInteractionHandler(type, handler) {}

  /**
   * @param {string} type
   * @param {!EventListener} handler
   */
  deregisterInteractionHandler(type, handler) {}

  /** @param {string} text */
  setText(text) {}

  /** @return {number} */
  getTabIndex() {}

  /** @param {number} tabIndex */
  setTabIndex(tabIndex) {}

  /**
   * @param {string} name
   * @return {string}
   */
  getAttr(name) {}

  /**
   * @param {string} name
   * @param {string} value
   */
  setAttr(name, value) {}

  /** @param {string} name */
  rmAttr(name) {}

  /** @param {!IconToggleEvent} evtData */
  notifyChange(evtData) {}
}

/**
 * @typedef {!{
 *   isOn: boolean,
 * }}
 */
let IconToggleEvent;



// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/icon-toggle/constants.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */
const constants_cssClasses = {
  ROOT: 'mdc-icon-toggle',
  DISABLED: 'mdc-icon-toggle--disabled',
};

/** @enum {string} */
const constants_strings = {
  DATA_TOGGLE_ON: 'data-toggle-on',
  DATA_TOGGLE_OFF: 'data-toggle-off',
  ARIA_PRESSED: 'aria-pressed',
  ARIA_DISABLED: 'aria-disabled',
  ARIA_LABEL: 'aria-label',
  CHANGE_EVENT: 'MDCIconToggle:change',
};



// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/icon-toggle/foundation.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/* eslint-disable no-unused-vars */



/**
 * @extends {MDCFoundation<!MDCIconToggleAdapter>}
 */
class foundation_MDCIconToggleFoundation extends base_foundation["a" /* default */] {
  static get cssClasses() {
    return constants_cssClasses;
  }

  static get strings() {
    return constants_strings;
  }

  static get defaultAdapter() {
    return {
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      registerInteractionHandler: (/* type: string, handler: EventListener */) => {},
      deregisterInteractionHandler: (/* type: string, handler: EventListener */) => {},
      setText: (/* text: string */) => {},
      getTabIndex: () => /* number */ 0,
      setTabIndex: (/* tabIndex: number */) => {},
      getAttr: (/* name: string */) => /* string */ '',
      setAttr: (/* name: string, value: string */) => {},
      rmAttr: (/* name: string */) => {},
      notifyChange: (/* evtData: IconToggleEvent */) => {},
    };
  }

  constructor(adapter) {
    super(Object.assign(foundation_MDCIconToggleFoundation.defaultAdapter, adapter));

    /** @private {boolean} */
    this.on_ = false;

    /** @private {boolean} */
    this.disabled_ = false;

    /** @private {number} */
    this.savedTabIndex_ = -1;

    /** @private {?IconToggleState} */
    this.toggleOnData_ = null;

    /** @private {?IconToggleState} */
    this.toggleOffData_ = null;

    this.clickHandler_ = /** @private {!EventListener} */ (
      () => this.toggleFromEvt_());

    /** @private {boolean} */
    this.isHandlingKeydown_ = false;

    this.keydownHandler_ = /** @private {!EventListener} */ ((/** @type {!KeyboardKey} */ evt) => {
      if (isSpace(evt)) {
        this.isHandlingKeydown_ = true;
        return evt.preventDefault();
      }
    });

    this.keyupHandler_ = /** @private {!EventListener} */ ((/** @type {!KeyboardKey} */ evt) => {
      if (isSpace(evt)) {
        this.isHandlingKeydown_ = false;
        this.toggleFromEvt_();
      }
    });
  }

  init() {
    this.refreshToggleData();
    this.adapter_.registerInteractionHandler('click', this.clickHandler_);
    this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
    this.adapter_.registerInteractionHandler('keyup', this.keyupHandler_);
  }

  refreshToggleData() {
    const {DATA_TOGGLE_ON, DATA_TOGGLE_OFF} = foundation_MDCIconToggleFoundation.strings;
    this.toggleOnData_ = this.parseJsonDataAttr_(DATA_TOGGLE_ON);
    this.toggleOffData_ = this.parseJsonDataAttr_(DATA_TOGGLE_OFF);
  }

  destroy() {
    this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
    this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
    this.adapter_.deregisterInteractionHandler('keyup', this.keyupHandler_);
  }

  /** @private */
  toggleFromEvt_() {
    this.toggle();
    const {on_: isOn} = this;
    this.adapter_.notifyChange(/** @type {!IconToggleEvent} */ ({isOn}));
  }

  /** @return {boolean} */
  isOn() {
    return this.on_;
  }

  /** @param {boolean=} isOn */
  toggle(isOn = !this.on_) {
    this.on_ = isOn;

    const {ARIA_LABEL, ARIA_PRESSED} = foundation_MDCIconToggleFoundation.strings;

    if (this.on_) {
      this.adapter_.setAttr(ARIA_PRESSED, 'true');
    } else {
      this.adapter_.setAttr(ARIA_PRESSED, 'false');
    }

    const {cssClass: classToRemove} =
        this.on_ ? this.toggleOffData_ : this.toggleOnData_;

    if (classToRemove) {
      this.adapter_.removeClass(classToRemove);
    }

    const {content, label, cssClass} = this.on_ ? this.toggleOnData_ : this.toggleOffData_;

    if (cssClass) {
      this.adapter_.addClass(cssClass);
    }
    if (content) {
      this.adapter_.setText(content);
    }
    if (label) {
      this.adapter_.setAttr(ARIA_LABEL, label);
    }
  }

  /**
   * @param {string} dataAttr
   * @return {!IconToggleState}
   */
  parseJsonDataAttr_(dataAttr) {
    const val = this.adapter_.getAttr(dataAttr);
    if (!val) {
      return {};
    }
    return /** @type {!IconToggleState} */ (JSON.parse(val));
  }

  /** @return {boolean} */
  isDisabled() {
    return this.disabled_;
  }

  /** @param {boolean} isDisabled */
  setDisabled(isDisabled) {
    this.disabled_ = isDisabled;

    const {DISABLED} = foundation_MDCIconToggleFoundation.cssClasses;
    const {ARIA_DISABLED} = foundation_MDCIconToggleFoundation.strings;

    if (this.disabled_) {
      this.savedTabIndex_ = this.adapter_.getTabIndex();
      this.adapter_.setTabIndex(-1);
      this.adapter_.setAttr(ARIA_DISABLED, 'true');
      this.adapter_.addClass(DISABLED);
    } else {
      this.adapter_.setTabIndex(this.savedTabIndex_);
      this.adapter_.rmAttr(ARIA_DISABLED);
      this.adapter_.removeClass(DISABLED);
    }
  }

  /** @return {boolean} */
  isKeyboardActivated() {
    return this.isHandlingKeydown_;
  }
}

/**
 * @typedef {!{
 *   key: string,
 *   keyCode: number
 * }}
 */
let KeyboardKey;

/**
 * @param {!KeyboardKey} keyboardKey
 * @return {boolean}
 */
function isSpace(keyboardKey) {
  return keyboardKey.key === 'Space' || keyboardKey.keyCode === 32;
}


/** @record */
class IconToggleState {}

/**
 * The aria-label value of the icon toggle, or undefined if there is no aria-label.
 * @export {string|undefined}
 */
IconToggleState.prototype.label;

/**
 * The text for the icon toggle, or undefined if there is no text.
 * @export {string|undefined}
 */
IconToggleState.prototype.content;

/**
 * The CSS class to add to the icon toggle, or undefined if there is no CSS class.
 * @export {string|undefined}
 */
IconToggleState.prototype.cssClass;

/* harmony default export */ var icon_toggle_foundation = (foundation_MDCIconToggleFoundation);

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/icon-toggle/index.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





/**
 * @extends {MDCComponent<!MDCIconToggleFoundation>}
 */
class icon_toggle_MDCIconToggle extends component["a" /* default */] {
  static attachTo(root) {
    return new icon_toggle_MDCIconToggle(root);
  }

  constructor(...args) {
    super(...args);

    /** @private {!MDCRipple} */
    this.ripple_ = this.initRipple_();
  }

  /** @return {!Element} */
  get iconEl_() {
    const {'iconInnerSelector': sel} = this.root_.dataset;
    return sel ?
      /** @type {!Element} */ (this.root_.querySelector(sel)) : this.root_;
  }

  /**
   * @return {!MDCRipple}
   * @private
   */
  initRipple_() {
    const adapter = Object.assign(ripple["a" /* MDCRipple */].createAdapter(this), {
      isUnbounded: () => true,
      isSurfaceActive: () => this.foundation_.isKeyboardActivated(),
      computeBoundingRect: () => {
        const dim = 48;
        const {left, top} = this.root_.getBoundingClientRect();
        return {
          left,
          top,
          width: dim,
          height: dim,
          right: left + dim,
          bottom: left + dim,
        };
      },
    });
    const foundation = new ripple["b" /* MDCRippleFoundation */](adapter);
    return new ripple["a" /* MDCRipple */](this.root_, foundation);
  }

  destroy() {
    this.ripple_.destroy();
    super.destroy();
  }

  /** @return {!MDCIconToggleFoundation} */
  getDefaultFoundation() {
    return new icon_toggle_foundation({
      addClass: (className) => this.iconEl_.classList.add(className),
      removeClass: (className) => this.iconEl_.classList.remove(className),
      registerInteractionHandler: (type, handler) => this.root_.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => this.root_.removeEventListener(type, handler),
      setText: (text) => this.iconEl_.textContent = text,
      getTabIndex: () => /* number */ this.root_.tabIndex,
      setTabIndex: (tabIndex) => this.root_.tabIndex = tabIndex,
      getAttr: (name, value) => this.root_.getAttribute(name, value),
      setAttr: (name, value) => this.root_.setAttribute(name, value),
      rmAttr: (name) => this.root_.removeAttribute(name),
      notifyChange: (evtData) => this.emit(icon_toggle_foundation.strings.CHANGE_EVENT, evtData),
    });
  }

  initialSyncWithDOM() {
    this.on = this.root_.getAttribute(icon_toggle_foundation.strings.ARIA_PRESSED) === 'true';
    this.disabled = this.root_.getAttribute(icon_toggle_foundation.strings.ARIA_DISABLED) === 'true';
  }

  /** @return {!MDCRipple} */
  get ripple() {
    return this.ripple_;
  }

  /** @return {boolean} */
  get on() {
    return this.foundation_.isOn();
  }

  /** @param {boolean} isOn */
  set on(isOn) {
    this.foundation_.toggle(isOn);
  }

  /** @return {boolean} */
  get disabled() {
    return this.foundation_.isDisabled();
  }

  /** @param {boolean} isDisabled */
  set disabled(isDisabled) {
    this.foundation_.setDisabled(isDisabled);
  }

  refreshToggleData() {
    this.foundation_.refreshToggleData();
  }
}



// CONCATENATED MODULE: ./node_modules/preact-material-components/IconToggle/index.js
var IconToggle__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





/**
 * @prop disabled = false
 */
class IconToggle_IconToggle extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "icon-toggle";
    this._onChange = this._onChange.bind(this);
  }
  _onChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }
  componentDidMount() {
    this.MDComponent = new icon_toggle_MDCIconToggle(this.control);
    this.MDComponent.listen("MDCIconToggle:change", this._onChange);
  }
  componentWillUnmount() {
    this.MDComponent.unlisten("MDCIconToggle:change", this._onChange);
    this.MDComponent.destroy && this.MDComponent.destroy();
  }
  materialDom(props) {
    if (props["data-toggle-on"]) props["data-toggle-on"] = JSON.stringify(props["data-toggle-on"]);
    if (props["data-toggle-off"]) props["data-toggle-off"] = JSON.stringify(props["data-toggle-off"]);
    return Object(preact_esm["h"])(
      "i",
      IconToggle__extends({}, props, {
        className: "material-icons " + props.className || "",
        ref: control => {
          this.control = control;
        }
      }),
      props.children
    );
  }
}
// CONCATENATED MODULE: ./node_modules/preact-material-components/Switch/index.js
var Switch__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function Switch__objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }




/**
 * @prop disabled = false
 */
class Switch_Switch extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "switch";
    this._mdcProps = ["disabled"];
  }
  materialDom(allprops) {
    const { className } = allprops,
          props = Switch__objectWithoutProperties(allprops, ["className"]);
    return Object(preact_esm["h"])(
      "div",
      { className: className },
      Object(preact_esm["h"])("input", Switch__extends({
        type: "checkbox",
        className: "mdc-switch__native-control"
      }, props)),
      Object(preact_esm["h"])(
        "div",
        { className: "mdc-switch__background" },
        Object(preact_esm["h"])("div", { className: "mdc-switch__knob" })
      )
    );
  }
}
// EXTERNAL MODULE: ./node_modules/@material/base/index.js
var base = __webpack_require__(4);

// CONCATENATED MODULE: ./node_modules/@material/snackbar/constants.js
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const snackbar_constants_cssClasses = {
  ROOT: 'mdc-snackbar',
  TEXT: 'mdc-snackbar__text',
  ACTION_WRAPPER: 'mdc-snackbar__action-wrapper',
  ACTION_BUTTON: 'mdc-snackbar__action-button',
  ACTIVE: 'mdc-snackbar--active',
  MULTILINE: 'mdc-snackbar--multiline',
  ACTION_ON_BOTTOM: 'mdc-snackbar--action-on-bottom',
};

const snackbar_constants_strings = {
  TEXT_SELECTOR: '.mdc-snackbar__text',
  ACTION_WRAPPER_SELECTOR: '.mdc-snackbar__action-wrapper',
  ACTION_BUTTON_SELECTOR: '.mdc-snackbar__action-button',
};

const constants_numbers = {
  MESSAGE_TIMEOUT: 2750,
};

// CONCATENATED MODULE: ./node_modules/@material/snackbar/foundation.js
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




class foundation_MDCSnackbarFoundation extends base["b" /* MDCFoundation */] {
  static get cssClasses() {
    return snackbar_constants_cssClasses;
  }

  static get strings() {
    return snackbar_constants_strings;
  }

  static get defaultAdapter() {
    return {
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      setAriaHidden: () => {},
      unsetAriaHidden: () => {},
      setActionAriaHidden: () => {},
      unsetActionAriaHidden: () => {},
      setActionText: (/* actionText: string */) => {},
      setMessageText: (/* message: string */) => {},
      setFocus: () => {},
      visibilityIsHidden: () => /* boolean */ false,
      registerCapturedBlurHandler: (/* handler: EventListener */) => {},
      deregisterCapturedBlurHandler: (/* handler: EventListener */) => {},
      registerVisibilityChangeHandler: (/* handler: EventListener */) => {},
      deregisterVisibilityChangeHandler: (/* handler: EventListener */) => {},
      registerCapturedInteractionHandler: (/* evtType: string, handler: EventListener */) => {},
      deregisterCapturedInteractionHandler: (/* evtType: string, handler: EventListener */) => {},
      registerActionClickHandler: (/* handler: EventListener */) => {},
      deregisterActionClickHandler: (/* handler: EventListener */) => {},
      registerTransitionEndHandler: (/* handler: EventListener */) => {},
      deregisterTransitionEndHandler: (/* handler: EventListener */) => {},
    };
  }

  get active() {
    return this.active_;
  }

  constructor(adapter) {
    super(Object.assign(foundation_MDCSnackbarFoundation.defaultAdapter, adapter));

    this.active_ = false;
    this.actionWasClicked_ = false;
    this.dismissOnAction_ = true;
    this.firstFocus_ = true;
    this.pointerDownRecognized_ = false;
    this.snackbarHasFocus_ = false;
    this.snackbarData_ = null;
    this.queue_ = [];
    this.actionClickHandler_ = () => {
      this.actionWasClicked_ = true;
      this.invokeAction_();
    };
    this.visibilitychangeHandler_ = () => {
      clearTimeout(this.timeoutId_);
      this.snackbarHasFocus_ = true;

      if (!this.adapter_.visibilityIsHidden()) {
        setTimeout(this.cleanup_.bind(this), this.snackbarData_.timeout || constants_numbers.MESSAGE_TIMEOUT);
      }
    };
    this.interactionHandler_ = (evt) => {
      if (evt.type == 'touchstart' || evt.type == 'mousedown') {
        this.pointerDownRecognized_ = true;
      }
      this.handlePossibleTabKeyboardFocus_(evt);

      if (evt.type == 'focus') {
        this.pointerDownRecognized_ = false;
      }
    };
    this.blurHandler_ = () => {
      clearTimeout(this.timeoutId_);
      this.snackbarHasFocus_ = false;
      this.timeoutId_ = setTimeout(this.cleanup_.bind(this), this.snackbarData_.timeout || constants_numbers.MESSAGE_TIMEOUT);
    };
  }

  init() {
    this.adapter_.registerActionClickHandler(this.actionClickHandler_);
    this.adapter_.setAriaHidden();
    this.adapter_.setActionAriaHidden();
  }

  destroy() {
    this.adapter_.deregisterActionClickHandler(this.actionClickHandler_);
    this.adapter_.deregisterCapturedBlurHandler(this.blurHandler_);
    this.adapter_.deregisterVisibilityChangeHandler(this.visibilitychangeHandler_);
    ['touchstart', 'mousedown', 'focus'].forEach((evtType) => {
      this.adapter_.deregisterCapturedInteractionHandler(evtType, this.interactionHandler_);
    });
  }

  dismissesOnAction() {
    return this.dismissOnAction_;
  }

  setDismissOnAction(dismissOnAction) {
    this.dismissOnAction_ = !!dismissOnAction;
  }

  show(data) {
    if (!data) {
      throw new Error(
        'Please provide a data object with at least a message to display.');
    }
    if (!data.message) {
      throw new Error('Please provide a message to be displayed.');
    }
    if (data.actionHandler && !data.actionText) {
      throw new Error('Please provide action text with the handler.');
    }
    if (this.active) {
      this.queue_.push(data);
      return;
    }
    clearTimeout(this.timeoutId_);
    this.snackbarData_ = data;
    this.firstFocus_ = true;
    this.adapter_.registerVisibilityChangeHandler(this.visibilitychangeHandler_);
    this.adapter_.registerCapturedBlurHandler(this.blurHandler_);
    ['touchstart', 'mousedown', 'focus'].forEach((evtType) => {
      this.adapter_.registerCapturedInteractionHandler(evtType, this.interactionHandler_);
    });

    const {ACTIVE, MULTILINE, ACTION_ON_BOTTOM} = snackbar_constants_cssClasses;

    this.adapter_.setMessageText(this.snackbarData_.message);

    if (this.snackbarData_.multiline) {
      this.adapter_.addClass(MULTILINE);
      if (this.snackbarData_.actionOnBottom) {
        this.adapter_.addClass(ACTION_ON_BOTTOM);
      }
    }

    if (this.snackbarData_.actionHandler) {
      this.adapter_.setActionText(this.snackbarData_.actionText);
      this.actionHandler_ = this.snackbarData_.actionHandler;
      this.setActionHidden_(false);
    } else {
      this.setActionHidden_(true);
      this.actionHandler_ = null;
      this.adapter_.setActionText(null);
    }

    this.active_ = true;
    this.adapter_.addClass(ACTIVE);
    this.adapter_.unsetAriaHidden();

    this.timeoutId_ = setTimeout(this.cleanup_.bind(this), this.snackbarData_.timeout || constants_numbers.MESSAGE_TIMEOUT);
  }

  handlePossibleTabKeyboardFocus_() {
    const hijackFocus =
      this.firstFocus_ && !this.pointerDownRecognized_;

    if (hijackFocus) {
      this.setFocusOnAction_();
    }

    this.firstFocus_ = false;
  }

  setFocusOnAction_() {
    this.adapter_.setFocus();
    this.snackbarHasFocus_ = true;
    this.firstFocus_ = false;
  }

  invokeAction_() {
    try {
      if (!this.actionHandler_) {
        return;
      }

      this.actionHandler_();
    } finally {
      if (this.dismissOnAction_) {
        this.cleanup_();
      }
    }
  }

  cleanup_() {
    const allowDismissal = !this.snackbarHasFocus_ || this.actionWasClicked_;

    if (allowDismissal) {
      const {ACTIVE, MULTILINE, ACTION_ON_BOTTOM} = snackbar_constants_cssClasses;

      this.adapter_.removeClass(ACTIVE);

      const handler = () => {
        clearTimeout(this.timeoutId_);
        this.adapter_.deregisterTransitionEndHandler(handler);
        this.adapter_.removeClass(MULTILINE);
        this.adapter_.removeClass(ACTION_ON_BOTTOM);
        this.setActionHidden_(true);
        this.adapter_.setAriaHidden();
        this.active_ = false;
        this.snackbarHasFocus_ = false;
        this.showNext_();
      };

      this.adapter_.registerTransitionEndHandler(handler);
    }
  }

  showNext_() {
    if (!this.queue_.length) {
      return;
    }
    this.show(this.queue_.shift());
  }

  setActionHidden_(isHidden) {
    if (isHidden) {
      this.adapter_.setActionAriaHidden();
    } else {
      this.adapter_.unsetActionAriaHidden();
    }
  }
}

// CONCATENATED MODULE: ./node_modules/@material/snackbar/index.js
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */







class snackbar_MDCSnackbar extends base["a" /* MDCComponent */] {
  static attachTo(root) {
    return new snackbar_MDCSnackbar(root);
  }

  show(data) {
    this.foundation_.show(data);
  }

  getDefaultFoundation() {
    const {
      TEXT_SELECTOR,
      ACTION_BUTTON_SELECTOR,
    } = foundation_MDCSnackbarFoundation.strings;
    const getText = () => this.root_.querySelector(TEXT_SELECTOR);
    const getActionButton = () => this.root_.querySelector(ACTION_BUTTON_SELECTOR);

    /* eslint brace-style: "off" */
    return new foundation_MDCSnackbarFoundation({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      setAriaHidden: () => this.root_.setAttribute('aria-hidden', 'true'),
      unsetAriaHidden: () => this.root_.removeAttribute('aria-hidden'),
      setActionAriaHidden: () => getActionButton().setAttribute('aria-hidden', 'true'),
      unsetActionAriaHidden: () => getActionButton().removeAttribute('aria-hidden'),
      setActionText: (text) => { getActionButton().textContent = text; },
      setMessageText: (text) => { getText().textContent = text; },
      setFocus: () => getActionButton().focus(),
      visibilityIsHidden: () => document.hidden,
      registerCapturedBlurHandler: (handler) => getActionButton().addEventListener('blur', handler, true),
      deregisterCapturedBlurHandler: (handler) => getActionButton().removeEventListener('blur', handler, true),
      registerVisibilityChangeHandler: (handler) => document.addEventListener('visibilitychange', handler),
      deregisterVisibilityChangeHandler: (handler) => document.removeEventListener('visibilitychange', handler),
      registerCapturedInteractionHandler: (evt, handler) =>
        document.body.addEventListener(evt, handler, true),
      deregisterCapturedInteractionHandler: (evt, handler) =>
        document.body.removeEventListener(evt, handler, true),
      registerActionClickHandler: (handler) => getActionButton().addEventListener('click', handler),
      deregisterActionClickHandler: (handler) => getActionButton().removeEventListener('click', handler),
      registerTransitionEndHandler:
        (handler) => this.root_.addEventListener(getCorrectEventName(window, 'transitionend'), handler),
      deregisterTransitionEndHandler:
        (handler) => this.root_.removeEventListener(getCorrectEventName(window, 'transitionend'), handler),
    });
  }

  get dismissesOnAction() {
    return this.foundation_.dismissesOnAction();
  }

  set dismissesOnAction(dismissesOnAction) {
    this.foundation_.setDismissOnAction(dismissesOnAction);
  }
}

// CONCATENATED MODULE: ./node_modules/preact-material-components/Snackbar/index.js
var Snackbar__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





function shallowDiffers(a, b) {
  for (let i in a) if (!(i in b)) return true;
  for (let i in b) if (a[i] !== b[i]) return true;
  return false;
}

/**
 * dismissesOnAction = true
 */
class Snackbar_Snackbar extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "snackbar";
    this.isPureReactComponent = true;
  }
  componentDidMount() {
    this.MDComponent = snackbar_MDCSnackbar.attachTo(this.control);
    if (this.props.dismissesOnAction === undefined || this.props.dismissesOnAction === null) {
      this.MDComponent.dismissesOnAction = true;
    } else {
      this.MDComponent.dismissesOnAction = this.props.dismissesOnAction;
    }
  }
  componentWillUnmount() {
    this.MDComponent.destroy && this.MDComponent.destroy();
  }
  shouldComponentUpdate(props, state) {
    return shallowDiffers(this.props, props) || shallowDiffers(this.state, state);
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "div",
      Snackbar__extends({
        "aria-live": "assertive",
        "aria-atomic": "true",
        "aria-hidden": "true",
        ref: control => this.control = control
      }, props),
      Object(preact_esm["h"])("div", { className: "mdc-snackbar__text" }),
      Object(preact_esm["h"])(
        "div",
        { className: "mdc-snackbar__action-wrapper" },
        Object(preact_esm["h"])("button", { type: "button", className: "mdc-snackbar__action-button" })
      )
    );
  }
}
// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/radio/adapter.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-unused-vars */


/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Radio. Provides an interface for managing
 * - classes
 * - dom
 *
 * Additionally, provides type information for the adapter to the Closure
 * compiler.
 *
 * Implement this adapter for your framework of choice to delegate updates to
 * the component in your framework of choice. See architecture documentation
 * for more details.
 * https://github.com/material-components/material-components-web/blob/master/docs/architecture.md
 *
 * @record
 */
class MDCRadioAdapter {
  /** @param {string} className */
  addClass(className) {}

  /** @param {string} className */
  removeClass(className) {}

  /** @return {!MDCSelectionControlState} */
  getNativeControl() {}
}

/* harmony default export */ var radio_adapter = (MDCRadioAdapter);

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/radio/constants.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */
const radio_constants_strings = {
  NATIVE_CONTROL_SELECTOR: '.mdc-radio__native-control',
};

/** @enum {string} */
const radio_constants_cssClasses = {
  ROOT: 'mdc-radio',
  DISABLED: 'mdc-radio--disabled',
};



// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/radio/foundation.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/* eslint-disable no-unused-vars */


/* eslint-enable no-unused-vars */


/**
 * @extends {MDCFoundation<!MDCRadioAdapter>}
 */
class foundation_MDCRadioFoundation extends base_foundation["a" /* default */] {
  /** @return enum {cssClasses} */
  static get cssClasses() {
    return radio_constants_cssClasses;
  }

  /** @return enum {strings} */
  static get strings() {
    return radio_constants_strings;
  }

  /** @return {!MDCRadioAdapter} */
  static get defaultAdapter() {
    return /** @type {!MDCRadioAdapter} */ ({
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      getNativeControl: () => /* !MDCSelectionControlState */ {},
    });
  }

  /** @return {boolean} */
  isChecked() {
    return this.getNativeControl_().checked;
  }

  /** @param {boolean} checked */
  setChecked(checked) {
    this.getNativeControl_().checked = checked;
  }

  /** @return {boolean} */
  isDisabled() {
    return this.getNativeControl_().disabled;
  }

  /** @param {boolean} disabled */
  setDisabled(disabled) {
    const {DISABLED} = foundation_MDCRadioFoundation.cssClasses;
    this.getNativeControl_().disabled = disabled;
    if (disabled) {
      this.adapter_.addClass(DISABLED);
    } else {
      this.adapter_.removeClass(DISABLED);
    }
  }

  /** @return {?string} */
  getValue() {
    return this.getNativeControl_().value;
  }

  /** @param {?string} value */
  setValue(value) {
    this.getNativeControl_().value = value;
  }

  /**
   * @return {!MDCSelectionControlState}
   * @private
   */
  getNativeControl_() {
    return this.adapter_.getNativeControl() || {
      checked: false,
      disabled: false,
      value: null,
    };
  }
}

/* harmony default export */ var radio_foundation = (foundation_MDCRadioFoundation);

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/radio/index.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */



/**
 * @extends MDCComponent<!MDCRadioFoundation>
 * @implements {MDCSelectionControl}
 */
class radio_MDCRadio extends component["a" /* default */] {
  static attachTo(root) {
    return new radio_MDCRadio(root);
  }

  /** @return {boolean} */
  get checked() {
    return this.foundation_.isChecked();
  }

  /** @param {boolean} checked */
  set checked(checked) {
    this.foundation_.setChecked(checked);
  }

  /** @return {boolean} */
  get disabled() {
    return this.foundation_.isDisabled();
  }

  /** @param {boolean} disabled */
  set disabled(disabled) {
    this.foundation_.setDisabled(disabled);
  }

  /** @return {?string} */
  get value() {
    return this.foundation_.getValue();
  }

  /** @param {?string} value */
  set value(value) {
    this.foundation_.setValue(value);
  }

  /** @return {!MDCRipple} */
  get ripple() {
    return this.ripple_;
  }

  constructor(...args) {
    super(...args);

    /** @private {!MDCRipple} */
    this.ripple_ = this.initRipple_();
  }

  /**
   * @return {!MDCRipple}
   * @private
   */
  initRipple_() {
    const adapter = Object.assign(ripple["a" /* MDCRipple */].createAdapter(this), {
      isUnbounded: () => true,
      // Radio buttons technically go "active" whenever there is *any* keyboard interaction. This is not the
      // UI we desire.
      isSurfaceActive: () => false,
      registerInteractionHandler: (type, handler) => this.nativeControl_.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => this.nativeControl_.removeEventListener(type, handler),
      computeBoundingRect: () => {
        const {left, top} = this.root_.getBoundingClientRect();
        const DIM = 40;
        return {
          top,
          left,
          right: left + DIM,
          bottom: top + DIM,
          width: DIM,
          height: DIM,
        };
      },
    });
    const foundation = new ripple["b" /* MDCRippleFoundation */](adapter);
    return new ripple["a" /* MDCRipple */](this.root_, foundation);
  }

  /**
   * Returns the state of the native control element, or null if the native control element is not present.
   * @return {?MDCSelectionControlState}
   * @private
   */
  get nativeControl_() {
    const {NATIVE_CONTROL_SELECTOR} = radio_foundation.strings;
    const el = /** @type {?MDCSelectionControlState} */ (
      this.root_.querySelector(NATIVE_CONTROL_SELECTOR));
    return el;
  }

  destroy() {
    this.ripple_.destroy();
    super.destroy();
  }

  /** @return {!MDCRadioFoundation} */
  getDefaultFoundation() {
    return new radio_foundation({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      getNativeControl: () => this.root_.querySelector(radio_foundation.strings.NATIVE_CONTROL_SELECTOR),
    });
  }
}




// CONCATENATED MODULE: ./node_modules/preact-material-components/Radio/index.js
var Radio__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function Radio__objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }





/*
 * Default props for check box
 */
const Radio_defaultProps = {
  checked: false
};

/**
 * @prop mini = false
 * @prop plain = false
 */
class Radio_Radio extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "radio";
  }
  componentDidMount() {
    this.MDComponent = radio_MDCRadio.attachTo(this.control);
    toggleRadio(Radio_defaultProps, this.props, this.MDComponent);
  }
  componentWillUnmount() {
    this.MDComponent.destroy && this.MDComponent.destroy();
  }
  componentWillUpdate(nextProps) {
    toggleRadio(this.props, nextProps, this.MDComponent);
  }
  materialDom(allprops) {
    const { className } = allprops,
          props = Radio__objectWithoutProperties(allprops, ["className"]);
    return Object(preact_esm["h"])(
      "div",
      {
        className: className,
        ref: control => {
          this.control = control;
        }
      },
      Object(preact_esm["h"])("input", Radio__extends({ className: "mdc-radio__native-control", type: "radio" }, props)),
      Object(preact_esm["h"])(
        "div",
        { className: "mdc-radio__background" },
        Object(preact_esm["h"])("div", { className: "mdc-radio__outer-circle" }),
        Object(preact_esm["h"])("div", { className: "mdc-radio__inner-circle" })
      )
    );
  }
}

/*
 * Function to add declarative checked to radio
 */
function toggleRadio(oldprops, newprops, radio) {
  if ("checked" in oldprops && "checked" in newprops && oldprops.checked !== newprops.checked) {
    radio.checked = newprops.checked;
  }
}
// EXTERNAL MODULE: ./node_modules/preact-material-components/TextField/index.js
var TextField = __webpack_require__(53);

// CONCATENATED MODULE: ./node_modules/@material/menu/util.js
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @type {string|undefined} */
let storedTransformPropertyName_;

/**
 * Returns the name of the correct transform property to use on the current browser.
 * @param {!Window} globalObj
 * @param {boolean=} forceRefresh
 * @return {string}
 */
function getTransformPropertyName(globalObj, forceRefresh = false) {
  if (storedTransformPropertyName_ === undefined || forceRefresh) {
    const el = globalObj.document.createElement('div');
    const transformPropertyName = ('transform' in el.style ? 'transform' : 'webkitTransform');
    storedTransformPropertyName_ = transformPropertyName;
  }

  return storedTransformPropertyName_;
}

/**
 * Clamps a value between the minimum and the maximum, returning the clamped value.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}


/**
 * Returns the easing value to apply at time t, for a given cubic bezier curve.
 * Control points P0 and P3 are assumed to be (0,0) and (1,1), respectively.
 * Parameters are as follows:
 * - time: The current time in the animation, scaled between 0 and 1.
 * - x1: The x value of control point P1.
 * - y1: The y value of control point P1.
 * - x2: The x value of control point P2.
 * - y2: The y value of control point P2.
 * @param {number} time
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @return {number}
 */
function bezierProgress(time, x1, y1, x2, y2) {
  return getBezierCoordinate_(solvePositionFromXValue_(time, x1, x2), y1, y2);
}

/**
 * Compute a single coordinate at a position point between 0 and 1.
 * c1 and c2 are the matching coordinate on control points P1 and P2, respectively.
 * Control points P0 and P3 are assumed to be (0,0) and (1,1), respectively.
 * Adapted from https://github.com/google/closure-library/blob/master/closure/goog/math/bezier.js.
 * @param {number} t
 * @param {number} c1
 * @param {number} c2
 * @return {number}
 */
function getBezierCoordinate_(t, c1, c2) {
  // Special case start and end.
  if (t === 0 || t === 1) {
    return t;
  }

  // Step one - from 4 points to 3
  let ic0 = t * c1;
  let ic1 = c1 + t * (c2 - c1);
  const ic2 = c2 + t * (1 - c2);

  // Step two - from 3 points to 2
  ic0 += t * (ic1 - ic0);
  ic1 += t * (ic2 - ic1);

  // Final step - last point
  return ic0 + t * (ic1 - ic0);
}

/**
 * Project a point onto the Bezier curve, from a given X. Calculates the position t along the curve.
 * Adapted from https://github.com/google/closure-library/blob/master/closure/goog/math/bezier.js.
 * @param {number} xVal
 * @param {number} x1
 * @param {number} x2
 * @return {number}
 */
function solvePositionFromXValue_(xVal, x1, x2) {
  const EPSILON = 1e-6;
  const MAX_ITERATIONS = 8;

  if (xVal <= 0) {
    return 0;
  } else if (xVal >= 1) {
    return 1;
  }

  // Initial estimate of t using linear interpolation.
  let t = xVal;

  // Try gradient descent to solve for t. If it works, it is very fast.
  let tMin = 0;
  let tMax = 1;
  let value = 0;
  for (let i = 0; i < MAX_ITERATIONS; i++) {
    value = getBezierCoordinate_(t, x1, x2);
    const derivative = (getBezierCoordinate_(t + EPSILON, x1, x2) - value) / EPSILON;
    if (Math.abs(value - xVal) < EPSILON) {
      return t;
    } else if (Math.abs(derivative) < EPSILON) {
      break;
    } else {
      if (value < xVal) {
        tMin = t;
      } else {
        tMax = t;
      }
      t -= (value - xVal) / derivative;
    }
  }

  // If the gradient descent got stuck in a local minimum, e.g. because
  // the derivative was close to 0, use a Dichotomy refinement instead.
  // We limit the number of interations to 8.
  for (let i = 0; Math.abs(value - xVal) > EPSILON && i < MAX_ITERATIONS; i++) {
    if (value < xVal) {
      tMin = t;
      t = (t + tMax) / 2;
    } else {
      tMax = t;
      t = (t + tMin) / 2;
    }
    value = getBezierCoordinate_(t, x1, x2);
  }
  return t;
}



// CONCATENATED MODULE: ./node_modules/@material/menu/simple/adapter.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Simple Menu. Provides an interface for managing
 * - classes
 * - dom
 * - focus
 * - position
 * - dimensions
 * - event handlers
 *
 * Additionally, provides type information for the adapter to the Closure
 * compiler.
 *
 * Implement this adapter for your framework of choice to delegate updates to
 * the component in your framework of choice. See architecture documentation
 * for more details.
 * https://github.com/material-components/material-components-web/blob/master/docs/architecture.md
 *
 * @record
 */
class MDCSimpleMenuAdapter {
  /** @param {string} className */
  addClass(className) {}

  /** @param {string} className */
  removeClass(className) {}

  /**
   * @param {string} className
   * @return {boolean}
   */
  hasClass(className) {}

  /** @return {boolean} */
  hasNecessaryDom() {}

  /**
   * @param {EventTarget} target
   * @param {string} attributeName
   * @return {string}
   */
  getAttributeForEventTarget(target, attributeName) {}

  /** @return {{ width: number, height: number }} */
  getInnerDimensions() {}

  /** @return {boolean} */
  hasAnchor() {}

  /** @return {{width: number, height: number, top: number, right: number, bottom: number, left: number}} */
  getAnchorDimensions() {}

  /** @return {{ width: number, height: number }} */
  getWindowDimensions() {}

  /**
   * @param {number} x
   * @param {number} y
   */
  setScale(x, y) {}

  /**
   * @param {number} x
   * @param {number} y
   */
  setInnerScale(x, y) {}

  /** @return {number} */
  getNumberOfItems() {}

  /**
   * @param {string} type
   * @param {function(!Event)} handler
   */
  registerInteractionHandler(type, handler) {}

  /**
   * @param {string} type
   * @param {function(!Event)} handler
   */
  deregisterInteractionHandler(type, handler) {}

  /** @param {function(!Event)} handler */
  registerBodyClickHandler(handler) {}

  /** @param {function(!Event)} handler */
  deregisterBodyClickHandler(handler) {}

  /**
   * @param {number} index
   * @return {{top: number, height: number}}
   */
  getYParamsForItemAtIndex(index) {}

  /**
   * @param {number} index
   * @param {string|null} value
   */
  setTransitionDelayForItemAtIndex(index, value) {}

  /**
   * @param {EventTarget} target
   * @return {number}
   */
  getIndexForEventTarget(target) {}

  /** @param {{index: number}} evtData */
  notifySelected(evtData) {}

  notifyCancel() {}

  saveFocus() {}

  restoreFocus() {}

  /** @return {boolean} */
  isFocused() {}

  focus() {}

  /** @return {number} */
  getFocusedItemIndex() /* number */ {}

  /** @param {number} index */
  focusItemAtIndex(index) {}

  /** @return {boolean} */
  isRtl() {}

  /** @param {string} origin */
  setTransformOrigin(origin) {}

  /** @param {{
  *   top: (string|undefined),
  *   right: (string|undefined),
  *   bottom: (string|undefined),
  *   left: (string|undefined)
  * }} position */
  setPosition(position) {}

  /** @return {number} */
  getAccurateTime() {}
}

/* harmony default export */ var simple_adapter = (MDCSimpleMenuAdapter);

// CONCATENATED MODULE: ./node_modules/@material/menu/simple/constants.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */
const simple_constants_cssClasses = {
  ROOT: 'mdc-simple-menu',
  OPEN: 'mdc-simple-menu--open',
  ANIMATING: 'mdc-simple-menu--animating',
  TOP_RIGHT: 'mdc-simple-menu--open-from-top-right',
  BOTTOM_LEFT: 'mdc-simple-menu--open-from-bottom-left',
  BOTTOM_RIGHT: 'mdc-simple-menu--open-from-bottom-right',
};

/** @enum {string} */
const simple_constants_strings = {
  ITEMS_SELECTOR: '.mdc-simple-menu__items',
  SELECTED_EVENT: 'MDCSimpleMenu:selected',
  CANCEL_EVENT: 'MDCSimpleMenu:cancel',
  ARIA_DISABLED_ATTR: 'aria-disabled',
};

/** @enum {number} */
const simple_constants_numbers = {
  // Amount of time to wait before triggering a selected event on the menu. Note that this time
  // will most likely be bumped up once interactive lists are supported to allow for the ripple to
  // animate before closing the menu
  SELECTED_TRIGGER_DELAY: 50,
  // Total duration of the menu animation.
  TRANSITION_DURATION_MS: 300,
  // The menu starts its open animation with the X axis at this time value (0 - 1).
  TRANSITION_SCALE_ADJUSTMENT_X: 0.5,
  // The time value the menu waits until the animation starts on the Y axis (0 - 1).
  TRANSITION_SCALE_ADJUSTMENT_Y: 0.2,
  // The cubic bezier control points for the animation (cubic-bezier(0, 0, 0.2, 1)).
  TRANSITION_X1: 0,
  TRANSITION_Y1: 0,
  TRANSITION_X2: 0.2,
  TRANSITION_Y2: 1,
};



// CONCATENATED MODULE: ./node_modules/@material/menu/simple/foundation.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






/**
 * @extends {MDCFoundation<!MDCSimpleMenuAdapter>}
 */
class foundation_MDCSimpleMenuFoundation extends base_foundation["a" /* default */] {
  /** @return enum{cssClasses} */
  static get cssClasses() {
    return simple_constants_cssClasses;
  }

  /** @return enum{strings} */
  static get strings() {
    return simple_constants_strings;
  }

  /** @return enum{numbers} */
  static get numbers() {
    return simple_constants_numbers;
  }

  /**
   * {@see MDCSimpleMenuAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCSimpleMenuAdapter}
   */
  static get defaultAdapter() {
    return /** @type {!MDCSimpleMenuAdapter} */ ({
      addClass: () => {},
      removeClass: () => {},
      hasClass: () => false,
      hasNecessaryDom: () => false,
      getAttributeForEventTarget: () => {},
      getInnerDimensions: () => ({}),
      hasAnchor: () => false,
      getAnchorDimensions: () => ({}),
      getWindowDimensions: () => ({}),
      setScale: () => {},
      setInnerScale: () => {},
      getNumberOfItems: () => 0,
      registerInteractionHandler: () => {},
      deregisterInteractionHandler: () => {},
      registerBodyClickHandler: () => {},
      deregisterBodyClickHandler: () => {},
      getYParamsForItemAtIndex: () => ({}),
      setTransitionDelayForItemAtIndex: () => {},
      getIndexForEventTarget: () => 0,
      notifySelected: () => {},
      notifyCancel: () => {},
      saveFocus: () => {},
      restoreFocus: () => {},
      isFocused: () => false,
      focus: () => {},
      getFocusedItemIndex: () => -1,
      focusItemAtIndex: () => {},
      isRtl: () => false,
      setTransformOrigin: () => {},
      setPosition: () => {},
      getAccurateTime: () => 0,
    });
  }

  /** @param {!MDCSimpleMenuAdapter} adapter */
  constructor(adapter) {
    super(Object.assign(foundation_MDCSimpleMenuFoundation.defaultAdapter, adapter));

    /** @private {function(!Event)} */
    this.clickHandler_ = (evt) => this.handlePossibleSelected_(evt);
    /** @private {function(!Event)} */
    this.keydownHandler_ = (evt) => this.handleKeyboardDown_(evt);
    /** @private {function(!Event)} */
    this.keyupHandler_ = (evt) => this.handleKeyboardUp_(evt);
    /** @private {function(!Event)} */
    this.documentClickHandler_ = (evt) => {
      this.adapter_.notifyCancel();
      this.close(evt);
    };
    /** @private {boolean} */
    this.isOpen_ = false;
    /** @private {number} */
    this.startScaleX_ = 0;
    /** @private {number} */
    this.startScaleY_ = 0;
    /** @private {number} */
    this.targetScale_ = 1;
    /** @private {number} */
    this.scaleX_ = 0;
    /** @private {number} */
    this.scaleY_ = 0;
    /** @private {boolean} */
    this.running_ = false;
    /** @private {number} */
    this.selectedTriggerTimerId_ = 0;
    /** @private {number} */
    this.animationRequestId_ = 0;
    /** @private {!{ width: number, height: number }} */
    this.dimensions_;
    /** @private {number} */
    this.startTime_;
    /** @private {number} */
    this.itemHeight_;
  }

  init() {
    const {ROOT, OPEN} = foundation_MDCSimpleMenuFoundation.cssClasses;

    if (!this.adapter_.hasClass(ROOT)) {
      throw new Error(`${ROOT} class required in root element.`);
    }

    if (!this.adapter_.hasNecessaryDom()) {
      throw new Error(`Required DOM nodes missing in ${ROOT} component.`);
    }

    if (this.adapter_.hasClass(OPEN)) {
      this.isOpen_ = true;
    }

    this.adapter_.registerInteractionHandler('click', this.clickHandler_);
    this.adapter_.registerInteractionHandler('keyup', this.keyupHandler_);
    this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
  }

  destroy() {
    clearTimeout(this.selectedTriggerTimerId_);
    // Cancel any currently running animations.
    cancelAnimationFrame(this.animationRequestId_);
    this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
    this.adapter_.deregisterInteractionHandler('keyup', this.keyupHandler_);
    this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
    this.adapter_.deregisterBodyClickHandler(this.documentClickHandler_);
  }

  /**
   * Calculates transition delays for individual menu items, so that they fade in one at a time.
   * @private
   */
  applyTransitionDelays_() {
    const {BOTTOM_LEFT, BOTTOM_RIGHT} = foundation_MDCSimpleMenuFoundation.cssClasses;
    const numItems = this.adapter_.getNumberOfItems();
    const {height} = this.dimensions_;
    const transitionDuration = foundation_MDCSimpleMenuFoundation.numbers.TRANSITION_DURATION_MS / 1000;
    const start = foundation_MDCSimpleMenuFoundation.numbers.TRANSITION_SCALE_ADJUSTMENT_Y;

    for (let index = 0; index < numItems; index++) {
      const {top: itemTop, height: itemHeight} = this.adapter_.getYParamsForItemAtIndex(index);
      this.itemHeight_ = itemHeight;
      let itemDelayFraction = itemTop / height;
      if (this.adapter_.hasClass(BOTTOM_LEFT) || this.adapter_.hasClass(BOTTOM_RIGHT)) {
        itemDelayFraction = ((height - itemTop - itemHeight) / height);
      }
      const itemDelay = (start + itemDelayFraction * (1 - start)) * transitionDuration;
      // Use toFixed() here to normalize CSS unit precision across browsers
      this.adapter_.setTransitionDelayForItemAtIndex(index, `${itemDelay.toFixed(3)}s`);
    }
  }

  /**
   * Removes transition delays from menu items.
   * @private
   */
  removeTransitionDelays_() {
    const numItems = this.adapter_.getNumberOfItems();
    for (let i = 0; i < numItems; i++) {
      this.adapter_.setTransitionDelayForItemAtIndex(i, null);
    }
  }

  /**
   * Animates menu opening or closing.
   * @private
   */
  animationLoop_() {
    const time = this.adapter_.getAccurateTime();
    const {TRANSITION_DURATION_MS, TRANSITION_X1, TRANSITION_Y1, TRANSITION_X2, TRANSITION_Y2,
      TRANSITION_SCALE_ADJUSTMENT_X, TRANSITION_SCALE_ADJUSTMENT_Y} = foundation_MDCSimpleMenuFoundation.numbers;
    const currentTime = clamp((time - this.startTime_) / TRANSITION_DURATION_MS);

    // Animate X axis very slowly, so that only the Y axis animation is visible during fade-out.
    let currentTimeX = clamp(
      (currentTime - TRANSITION_SCALE_ADJUSTMENT_X) / (1 - TRANSITION_SCALE_ADJUSTMENT_X)
    );
    // No time-shifting on the Y axis when closing.
    let currentTimeY = currentTime;

    let startScaleY = this.startScaleY_;
    if (this.targetScale_ === 1) {
      // Start with the menu at the height of a single item.
      if (this.itemHeight_) {
        startScaleY = Math.max(this.itemHeight_ / this.dimensions_.height, startScaleY);
      }
      // X axis moves faster, so time-shift forward.
      currentTimeX = clamp(currentTime + TRANSITION_SCALE_ADJUSTMENT_X);
      // Y axis moves slower, so time-shift backwards and adjust speed by the difference.
      currentTimeY = clamp(
        (currentTime - TRANSITION_SCALE_ADJUSTMENT_Y) / (1 - TRANSITION_SCALE_ADJUSTMENT_Y)
      );
    }

    // Apply cubic bezier easing independently to each axis.
    const easeX = bezierProgress(currentTimeX, TRANSITION_X1, TRANSITION_Y1, TRANSITION_X2, TRANSITION_Y2);
    const easeY = bezierProgress(currentTimeY, TRANSITION_X1, TRANSITION_Y1, TRANSITION_X2, TRANSITION_Y2);

    // Calculate the scales to apply to the outer container and inner container.
    this.scaleX_ = this.startScaleX_ + (this.targetScale_ - this.startScaleX_) * easeX;
    const invScaleX = 1 / (this.scaleX_ === 0 ? 1 : this.scaleX_);
    this.scaleY_ = startScaleY + (this.targetScale_ - startScaleY) * easeY;
    const invScaleY = 1 / (this.scaleY_ === 0 ? 1 : this.scaleY_);

    // Apply scales.
    this.adapter_.setScale(this.scaleX_, this.scaleY_);
    this.adapter_.setInnerScale(invScaleX, invScaleY);

    // Stop animation when we've covered the entire 0 - 1 range of time.
    if (currentTime < 1) {
      this.animationRequestId_ = requestAnimationFrame(() => this.animationLoop_());
    } else {
      this.animationRequestId_ = 0;
      this.running_ = false;
      this.adapter_.removeClass(foundation_MDCSimpleMenuFoundation.cssClasses.ANIMATING);
    }
  }

  /**
   * Starts the open or close animation.
   * @private
   */
  animateMenu_() {
    this.startTime_ = this.adapter_.getAccurateTime();
    this.startScaleX_ = this.scaleX_;
    this.startScaleY_ = this.scaleY_;

    this.targetScale_ = this.isOpen_ ? 1 : 0;

    if (!this.running_) {
      this.running_ = true;
      this.animationRequestId_ = requestAnimationFrame(() => this.animationLoop_());
    }
  }

  /**
   * @param {?number} focusIndex
   * @private
   */
  focusOnOpen_(focusIndex) {
    if (focusIndex === null) {
      // First, try focusing the menu.
      this.adapter_.focus();
      // If that doesn't work, focus first item instead.
      if (!this.adapter_.isFocused()) {
        this.adapter_.focusItemAtIndex(0);
      }
    } else {
      this.adapter_.focusItemAtIndex(focusIndex);
    }
  }

  /**
   * Handle keys that we want to repeat on hold (tab and arrows).
   * @param {!Event} evt
   * @return {boolean}
   * @private
   */
  handleKeyboardDown_(evt) {
    // Do nothing if Alt, Ctrl or Meta are pressed.
    if (evt.altKey || evt.ctrlKey || evt.metaKey) {
      return true;
    }

    const {keyCode, key, shiftKey} = evt;
    const isTab = key === 'Tab' || keyCode === 9;
    const isArrowUp = key === 'ArrowUp' || keyCode === 38;
    const isArrowDown = key === 'ArrowDown' || keyCode === 40;
    const isSpace = key === 'Space' || keyCode === 32;

    const focusedItemIndex = this.adapter_.getFocusedItemIndex();
    const lastItemIndex = this.adapter_.getNumberOfItems() - 1;

    if (shiftKey && isTab && focusedItemIndex === 0) {
      this.adapter_.focusItemAtIndex(lastItemIndex);
      evt.preventDefault();
      return false;
    }

    if (!shiftKey && isTab && focusedItemIndex === lastItemIndex) {
      this.adapter_.focusItemAtIndex(0);
      evt.preventDefault();
      return false;
    }

    // Ensure Arrow{Up,Down} and space do not cause inadvertent scrolling
    if (isArrowUp || isArrowDown || isSpace) {
      evt.preventDefault();
    }

    if (isArrowUp) {
      if (focusedItemIndex === 0 || this.adapter_.isFocused()) {
        this.adapter_.focusItemAtIndex(lastItemIndex);
      } else {
        this.adapter_.focusItemAtIndex(focusedItemIndex - 1);
      }
    } else if (isArrowDown) {
      if (focusedItemIndex === lastItemIndex || this.adapter_.isFocused()) {
        this.adapter_.focusItemAtIndex(0);
      } else {
        this.adapter_.focusItemAtIndex(focusedItemIndex + 1);
      }
    }

    return true;
  }

  /**
   * Handle keys that we don't want to repeat on hold (Enter, Space, Escape).
   * @param {!Event} evt
   * @return {boolean}
   * @private
   */
  handleKeyboardUp_(evt) {
    // Do nothing if Alt, Ctrl or Meta are pressed.
    if (evt.altKey || evt.ctrlKey || evt.metaKey) {
      return true;
    }

    const {keyCode, key} = evt;
    const isEnter = key === 'Enter' || keyCode === 13;
    const isSpace = key === 'Space' || keyCode === 32;
    const isEscape = key === 'Escape' || keyCode === 27;

    if (isEnter || isSpace) {
      this.handlePossibleSelected_(evt);
    }

    if (isEscape) {
      this.adapter_.notifyCancel();
      this.close();
    }

    return true;
  }

  /**
   * @param {!Event} evt
   * @private
   */
  handlePossibleSelected_(evt) {
    if (this.adapter_.getAttributeForEventTarget(evt.target, simple_constants_strings.ARIA_DISABLED_ATTR) === 'true') {
      return;
    }
    const targetIndex = this.adapter_.getIndexForEventTarget(evt.target);
    if (targetIndex < 0) {
      return;
    }
    // Debounce multiple selections
    if (this.selectedTriggerTimerId_) {
      return;
    }
    this.selectedTriggerTimerId_ = setTimeout(() => {
      this.selectedTriggerTimerId_ = 0;
      this.close();
      this.adapter_.notifySelected({index: targetIndex});
    }, simple_constants_numbers.SELECTED_TRIGGER_DELAY);
  }

  /** @private */
  autoPosition_() {
    if (!this.adapter_.hasAnchor()) {
      return;
    }

    // Defaults: open from the top left.
    let vertical = 'top';
    let horizontal = 'left';

    const anchor = this.adapter_.getAnchorDimensions();
    const windowDimensions = this.adapter_.getWindowDimensions();

    const topOverflow = anchor.top + this.dimensions_.height - windowDimensions.height;
    const bottomOverflow = this.dimensions_.height - anchor.bottom;
    const extendsBeyondTopBounds = topOverflow > 0;

    if (extendsBeyondTopBounds) {
      if (bottomOverflow < topOverflow) {
        vertical = 'bottom';
      }
    }

    const leftOverflow = anchor.left + this.dimensions_.width - windowDimensions.width;
    const rightOverflow = this.dimensions_.width - anchor.right;
    const extendsBeyondLeftBounds = leftOverflow > 0;
    const extendsBeyondRightBounds = rightOverflow > 0;

    if (this.adapter_.isRtl()) {
      // In RTL, we prefer to open from the right.
      horizontal = 'right';
      if (extendsBeyondRightBounds && leftOverflow < rightOverflow) {
        horizontal = 'left';
      }
    } else if (extendsBeyondLeftBounds && rightOverflow < leftOverflow) {
      horizontal = 'right';
    }

    const position = {
      [horizontal]: '0',
      [vertical]: '0',
    };

    this.adapter_.setTransformOrigin(`${vertical} ${horizontal}`);
    this.adapter_.setPosition(position);
  }


  /**
   * Open the menu.
   * @param {{focusIndex: ?number}=} options
   */
  open({focusIndex = null} = {}) {
    this.adapter_.saveFocus();
    this.adapter_.addClass(foundation_MDCSimpleMenuFoundation.cssClasses.ANIMATING);
    this.animationRequestId_ = requestAnimationFrame(() => {
      this.dimensions_ = this.adapter_.getInnerDimensions();
      this.applyTransitionDelays_();
      this.autoPosition_();
      this.animateMenu_();
      this.adapter_.addClass(foundation_MDCSimpleMenuFoundation.cssClasses.OPEN);
      this.focusOnOpen_(focusIndex);
      this.adapter_.registerBodyClickHandler(this.documentClickHandler_);
    });
    this.isOpen_ = true;
  }

  /**
   * Closes the menu.
   * @param {Event=} evt
   */
  close(evt = null) {
    const targetIsDisabled = evt ?
      this.adapter_.getAttributeForEventTarget(evt.target, simple_constants_strings.ARIA_DISABLED_ATTR) === 'true' :
      false;

    if (targetIsDisabled) {
      return;
    }

    this.adapter_.deregisterBodyClickHandler(this.documentClickHandler_);
    this.adapter_.addClass(foundation_MDCSimpleMenuFoundation.cssClasses.ANIMATING);
    requestAnimationFrame(() => {
      this.removeTransitionDelays_();
      this.animateMenu_();
      this.adapter_.removeClass(foundation_MDCSimpleMenuFoundation.cssClasses.OPEN);
    });
    this.isOpen_ = false;
    this.adapter_.restoreFocus();
  }

  /** @return {boolean} */
  isOpen() {
    return this.isOpen_;
  }
}

/* harmony default export */ var simple_foundation = (foundation_MDCSimpleMenuFoundation);

// CONCATENATED MODULE: ./node_modules/@material/menu/simple/index.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





/**
 * @extends MDCComponent<!MDCSimpleMenuFoundation>
 */
class simple_MDCSimpleMenu extends component["a" /* default */] {
  /** @param {...?} args */
  constructor(...args) {
    super(...args);
    /** @private {!Element} */
    this.previousFocus_;
  }

  /**
   * @param {!Element} root
   * @return {!MDCSimpleMenu}
   */
  static attachTo(root) {
    return new simple_MDCSimpleMenu(root);
  }

  /** @return {boolean} */
  get open() {
    return this.foundation_.isOpen();
  }

  /** @param {boolean} value */
  set open(value) {
    if (value) {
      this.foundation_.open();
    } else {
      this.foundation_.close();
    }
  }

  /** @param {{focusIndex: ?number}=} options */
  show({focusIndex = null} = {}) {
    this.foundation_.open({focusIndex: focusIndex});
  }

  hide() {
    this.foundation_.close();
  }

  /**
   * Return the item container element inside the component.
   * @return {?Element}
   */
  get itemsContainer_() {
    return this.root_.querySelector(simple_foundation.strings.ITEMS_SELECTOR);
  }

  /**
   * Return the items within the menu. Note that this only contains the set of elements within
   * the items container that are proper list items, and not supplemental / presentational DOM
   * elements.
   * @return {!Array<!Element>}
   */
  get items() {
    const {itemsContainer_: itemsContainer} = this;
    return [].slice.call(itemsContainer.querySelectorAll('.mdc-list-item[role]'));
  }

  /** @return {!MDCSimpleMenuFoundation} */
  getDefaultFoundation() {
    return new simple_foundation({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      hasClass: (className) => this.root_.classList.contains(className),
      hasNecessaryDom: () => Boolean(this.itemsContainer_),
      getAttributeForEventTarget: (target, attributeName) => target.getAttribute(attributeName),
      getInnerDimensions: () => {
        const {itemsContainer_: itemsContainer} = this;
        return {width: itemsContainer.offsetWidth, height: itemsContainer.offsetHeight};
      },
      hasAnchor: () => this.root_.parentElement && this.root_.parentElement.classList.contains('mdc-menu-anchor'),
      getAnchorDimensions: () => this.root_.parentElement.getBoundingClientRect(),
      getWindowDimensions: () => {
        return {width: window.innerWidth, height: window.innerHeight};
      },
      setScale: (x, y) => {
        this.root_.style[getTransformPropertyName(window)] = `scale(${x}, ${y})`;
      },
      setInnerScale: (x, y) => {
        this.itemsContainer_.style[getTransformPropertyName(window)] = `scale(${x}, ${y})`;
      },
      getNumberOfItems: () => this.items.length,
      registerInteractionHandler: (type, handler) => this.root_.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => this.root_.removeEventListener(type, handler),
      registerBodyClickHandler: (handler) => document.body.addEventListener('click', handler),
      deregisterBodyClickHandler: (handler) => document.body.removeEventListener('click', handler),
      getYParamsForItemAtIndex: (index) => {
        const {offsetTop: top, offsetHeight: height} = this.items[index];
        return {top, height};
      },
      setTransitionDelayForItemAtIndex: (index, value) =>
        this.items[index].style.setProperty('transition-delay', value),
      getIndexForEventTarget: (target) => this.items.indexOf(target),
      notifySelected: (evtData) => this.emit(simple_foundation.strings.SELECTED_EVENT, {
        index: evtData.index,
        item: this.items[evtData.index],
      }),
      notifyCancel: () => this.emit(simple_foundation.strings.CANCEL_EVENT, {}),
      saveFocus: () => {
        this.previousFocus_ = document.activeElement;
      },
      restoreFocus: () => {
        if (this.previousFocus_) {
          this.previousFocus_.focus();
        }
      },
      isFocused: () => document.activeElement === this.root_,
      focus: () => this.root_.focus(),
      getFocusedItemIndex: () => this.items.indexOf(document.activeElement),
      focusItemAtIndex: (index) => this.items[index].focus(),
      isRtl: () => getComputedStyle(this.root_).getPropertyValue('direction') === 'rtl',
      setTransformOrigin: (origin) => {
        this.root_.style[`${getTransformPropertyName(window)}-origin`] = origin;
      },
      setPosition: (position) => {
        this.root_.style.left = 'left' in position ? position.left : null;
        this.root_.style.right = 'right' in position ? position.right : null;
        this.root_.style.top = 'top' in position ? position.top : null;
        this.root_.style.bottom = 'bottom' in position ? position.bottom : null;
      },
      getAccurateTime: () => window.performance.now(),
    });
  }
}



// CONCATENATED MODULE: ./node_modules/@material/menu/index.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/select/constants.js
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const select_constants_cssClasses = {
  ROOT: 'mdc-select',
  OPEN: 'mdc-select--open',
  DISABLED: 'mdc-select--disabled',
};

const select_constants_strings = {
  CHANGE_EVENT: 'MDCSelect:change',
};

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/select/foundation.js
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





const OPENER_KEYS = [
  {key: 'ArrowUp', keyCode: 38, forType: 'keydown'},
  {key: 'ArrowDown', keyCode: 40, forType: 'keydown'},
  {key: 'Space', keyCode: 32, forType: 'keyup'},
];

class foundation_MDCSelectFoundation extends base["b" /* MDCFoundation */] {
  static get cssClasses() {
    return select_constants_cssClasses;
  }

  static get strings() {
    return select_constants_strings;
  }

  static get defaultAdapter() {
    return {
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      setAttr: (/* attr: string, value: string */) => {},
      rmAttr: (/* attr: string */) => {},
      computeBoundingRect: () => /* {left: number, top: number} */ ({left: 0, top: 0}),
      registerInteractionHandler: (/* type: string, handler: EventListener */) => {},
      deregisterInteractionHandler: (/* type: string, handler: EventListener */) => {},
      focus: () => {},
      makeTabbable: () => {},
      makeUntabbable: () => {},
      getComputedStyleValue: (/* propertyName: string */) => /* string */ '',
      setStyle: (/* propertyName: string, value: string */) => {},
      create2dRenderingContext: () => /* {font: string, measureText: (string) => {width: number}} */ ({
        font: '',
        measureText: () => ({width: 0}),
      }),
      setMenuElStyle: (/* propertyName: string, value: string */) => {},
      setMenuElAttr: (/* attr: string, value: string */) => {},
      rmMenuElAttr: (/* attr: string */) => {},
      getMenuElOffsetHeight: () => /* number */ 0,
      openMenu: (/* focusIndex: number */) => {},
      isMenuOpen: () => /* boolean */ false,
      setSelectedTextContent: (/* textContent: string */) => {},
      getNumberOfOptions: () => /* number */ 0,
      getTextForOptionAtIndex: (/* index: number */) => /* string */ '',
      getValueForOptionAtIndex: (/* index: number */) => /* string */ '',
      setAttrForOptionAtIndex: (/* index: number, attr: string, value: string */) => {},
      rmAttrForOptionAtIndex: (/* index: number, attr: string */) => {},
      getOffsetTopForOptionAtIndex: (/* index: number */) => /* number */ 0,
      registerMenuInteractionHandler: (/* type: string, handler: EventListener */) => {},
      deregisterMenuInteractionHandler: (/* type: string, handler: EventListener */) => {},
      notifyChange: () => {},
      getWindowInnerHeight: () => /* number */ 0,
    };
  }

  constructor(adapter) {
    super(Object.assign(foundation_MDCSelectFoundation.defaultAdapter, adapter));
    this.ctx_ = null;
    this.selectedIndex_ = -1;
    this.disabled_ = false;
    this.displayHandler_ = (evt) => {
      evt.preventDefault();
      if (!this.adapter_.isMenuOpen()) {
        this.open_();
      }
    };
    this.displayViaKeyboardHandler_ = (evt) => this.handleDisplayViaKeyboard_(evt);
    this.selectionHandler_ = ({detail}) => {
      const {index} = detail;
      this.close_();
      if (index !== this.selectedIndex_) {
        this.setSelectedIndex(index);
        this.adapter_.notifyChange();
      }
    };
    this.cancelHandler_ = () => {
      this.close_();
    };
  }

  init() {
    this.ctx_ = this.adapter_.create2dRenderingContext();
    this.adapter_.registerInteractionHandler('click', this.displayHandler_);
    this.adapter_.registerInteractionHandler('keydown', this.displayViaKeyboardHandler_);
    this.adapter_.registerInteractionHandler('keyup', this.displayViaKeyboardHandler_);
    this.adapter_.registerMenuInteractionHandler(
      simple_foundation.strings.SELECTED_EVENT, this.selectionHandler_);
    this.adapter_.registerMenuInteractionHandler(
      simple_foundation.strings.CANCEL_EVENT, this.cancelHandler_);
    this.resize();
  }

  destroy() {
    // Drop reference to context object to prevent potential leaks
    this.ctx_ = null;
    this.adapter_.deregisterInteractionHandler('click', this.displayHandler_);
    this.adapter_.deregisterInteractionHandler('keydown', this.displayViaKeyboardHandler_);
    this.adapter_.deregisterInteractionHandler('keyup', this.displayViaKeyboardHandler_);
    this.adapter_.deregisterMenuInteractionHandler(
      simple_foundation.strings.SELECTED_EVENT, this.selectionHandler_);
    this.adapter_.deregisterMenuInteractionHandler(
      simple_foundation.strings.CANCEL_EVENT, this.cancelHandler_);
  }

  getValue() {
    return this.selectedIndex_ >= 0 ? this.adapter_.getValueForOptionAtIndex(this.selectedIndex_) : '';
  }

  getSelectedIndex() {
    return this.selectedIndex_;
  }

  setSelectedIndex(index) {
    const prevSelectedIndex = this.selectedIndex_;
    if (prevSelectedIndex >= 0) {
      this.adapter_.rmAttrForOptionAtIndex(this.selectedIndex_, 'aria-selected');
    }

    this.selectedIndex_ = index >= 0 && index < this.adapter_.getNumberOfOptions() ? index : -1;
    let selectedTextContent = '';
    if (this.selectedIndex_ >= 0) {
      selectedTextContent = this.adapter_.getTextForOptionAtIndex(this.selectedIndex_).trim();
      this.adapter_.setAttrForOptionAtIndex(this.selectedIndex_, 'aria-selected', 'true');
    }
    this.adapter_.setSelectedTextContent(selectedTextContent);
  }

  isDisabled() {
    return this.disabled_;
  }

  setDisabled(disabled) {
    const {DISABLED} = foundation_MDCSelectFoundation.cssClasses;
    this.disabled_ = disabled;
    if (this.disabled_) {
      this.adapter_.addClass(DISABLED);
      this.adapter_.setAttr('aria-disabled', 'true');
      this.adapter_.makeUntabbable();
    } else {
      this.adapter_.removeClass(DISABLED);
      this.adapter_.rmAttr('aria-disabled');
      this.adapter_.makeTabbable();
    }
  }

  resize() {
    const font = this.adapter_.getComputedStyleValue('font');
    const letterSpacing = parseFloat(this.adapter_.getComputedStyleValue('letter-spacing'));
    if (font) {
      this.ctx_.font = font;
    } else {
      const primaryFontFamily = this.adapter_.getComputedStyleValue('font-family').split(',')[0];
      const fontSize = this.adapter_.getComputedStyleValue('font-size');
      this.ctx_.font = `${fontSize} ${primaryFontFamily}`;
    }

    let maxTextLength = 0;
    for (let i = 0, l = this.adapter_.getNumberOfOptions(); i < l; i++) {
      const txt = this.adapter_.getTextForOptionAtIndex(i).trim();
      const {width} = this.ctx_.measureText(txt);
      const addedSpace = letterSpacing * txt.length;
      maxTextLength = Math.max(maxTextLength, Math.ceil(width + addedSpace));
    }
    this.adapter_.setStyle('width', `${maxTextLength}px`);
  }

  open_() {
    const {OPEN} = foundation_MDCSelectFoundation.cssClasses;
    const focusIndex = this.selectedIndex_ < 0 ? 0 : this.selectedIndex_;

    this.setMenuStylesForOpenAtIndex_(focusIndex);
    this.adapter_.addClass(OPEN);
    this.adapter_.openMenu(focusIndex);
  }

  setMenuStylesForOpenAtIndex_(index) {
    const innerHeight = this.adapter_.getWindowInnerHeight();
    const {left, top} = this.adapter_.computeBoundingRect();

    this.adapter_.setMenuElAttr('aria-hidden', 'true');
    this.adapter_.setMenuElStyle('display', 'block');
    const menuHeight = this.adapter_.getMenuElOffsetHeight();
    const itemOffsetTop = this.adapter_.getOffsetTopForOptionAtIndex(index);
    this.adapter_.setMenuElStyle('display', '');
    this.adapter_.rmMenuElAttr('aria-hidden');

    let adjustedTop = top - itemOffsetTop;
    const overflowsTop = adjustedTop < 0;
    const overflowsBottom = adjustedTop + menuHeight > innerHeight;
    if (overflowsTop) {
      adjustedTop = 0;
    } else if (overflowsBottom) {
      adjustedTop = Math.max(0, innerHeight - menuHeight);
    };

    this.adapter_.setMenuElStyle('left', `${left}px`);
    this.adapter_.setMenuElStyle('top', `${adjustedTop}px`);
    this.adapter_.setMenuElStyle('transform-origin', `center ${itemOffsetTop}px`);
  }

  close_() {
    const {OPEN} = foundation_MDCSelectFoundation.cssClasses;
    this.adapter_.removeClass(OPEN);
    this.adapter_.focus();
  }

  handleDisplayViaKeyboard_(evt) {
    // We use a hard-coded 2 instead of Event.AT_TARGET to avoid having to reference a browser
    // global.
    const EVENT_PHASE_AT_TARGET = 2;
    if (evt.eventPhase !== EVENT_PHASE_AT_TARGET) {
      return;
    }

    // Prevent pressing space down from scrolling the page
    const isSpaceDown = evt.type === 'keydown' && (evt.key === 'Space' || evt.keyCode === 32);
    if (isSpaceDown) {
      evt.preventDefault();
    }

    const isOpenerKey = OPENER_KEYS.some(({key, keyCode, forType}) => {
      return evt.type === forType && (evt.key === key || evt.keyCode === keyCode);
    });
    if (isOpenerKey) {
      this.displayHandler_(evt);
    }
  }
}


// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/select/index.js
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */








class select_MDCSelect extends base["a" /* MDCComponent */] {
  static attachTo(root) {
    return new select_MDCSelect(root);
  }

  get value() {
    return this.foundation_.getValue();
  }

  get options() {
    return this.menu_.items;
  }

  get selectedOptions() {
    return this.root_.querySelectorAll('[aria-selected]');
  }

  get selectedIndex() {
    return this.foundation_.getSelectedIndex();
  }

  set selectedIndex(selectedIndex) {
    this.foundation_.setSelectedIndex(selectedIndex);
  }

  get disabled() {
    return this.foundation_.isDisabled();
  }

  set disabled(disabled) {
    this.foundation_.setDisabled(disabled);
  }

  item(index) {
    return this.options[index] || null;
  }

  nameditem(key) {
    // NOTE: IE11 precludes us from using Array.prototype.find
    for (let i = 0, options = this.options, option; (option = options[i]); i++) {
      if (option.id === key || option.getAttribute('name') === key) {
        return option;
      }
    }
    return null;
  }

  initialize(menuFactory = (el) => new simple_MDCSimpleMenu(el)) {
    this.menuEl_ = this.root_.querySelector('.mdc-select__menu');
    this.menu_ = menuFactory(this.menuEl_);
    this.selectedText_ = this.root_.querySelector('.mdc-select__selected-text');
  }

  getDefaultFoundation() {
    return new foundation_MDCSelectFoundation({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      setAttr: (attr, value) => this.root_.setAttribute(attr, value),
      rmAttr: (attr, value) => this.root_.removeAttribute(attr, value),
      computeBoundingRect: () => this.root_.getBoundingClientRect(),
      registerInteractionHandler: (type, handler) => this.root_.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => this.root_.removeEventListener(type, handler),
      focus: () => this.root_.focus(),
      makeTabbable: () => {
        this.root_.tabIndex = 0;
      },
      makeUntabbable: () => {
        this.root_.tabIndex = -1;
      },
      getComputedStyleValue: (prop) => window.getComputedStyle(this.root_).getPropertyValue(prop),
      setStyle: (propertyName, value) => this.root_.style.setProperty(propertyName, value),
      create2dRenderingContext: () => document.createElement('canvas').getContext('2d'),
      setMenuElStyle: (propertyName, value) => this.menuEl_.style.setProperty(propertyName, value),
      setMenuElAttr: (attr, value) => this.menuEl_.setAttribute(attr, value),
      rmMenuElAttr: (attr) => this.menuEl_.removeAttribute(attr),
      getMenuElOffsetHeight: () => this.menuEl_.offsetHeight,
      openMenu: (focusIndex) => this.menu_.show({focusIndex}),
      isMenuOpen: () => this.menu_.open,
      setSelectedTextContent: (selectedTextContent) => {
        this.selectedText_.textContent = selectedTextContent;
      },
      getNumberOfOptions: () => this.options.length,
      getTextForOptionAtIndex: (index) => this.options[index].textContent,
      getValueForOptionAtIndex: (index) => this.options[index].id || this.options[index].textContent,
      setAttrForOptionAtIndex: (index, attr, value) => this.options[index].setAttribute(attr, value),
      rmAttrForOptionAtIndex: (index, attr) => this.options[index].removeAttribute(attr),
      getOffsetTopForOptionAtIndex: (index) => this.options[index].offsetTop,
      registerMenuInteractionHandler: (type, handler) => this.menu_.listen(type, handler),
      deregisterMenuInteractionHandler: (type, handler) => this.menu_.unlisten(type, handler),
      notifyChange: () => this.emit(foundation_MDCSelectFoundation.strings.CHANGE_EVENT, this),
      getWindowInnerHeight: () => window.innerHeight,
    });
  }

  initialSyncWithDOM() {
    const selectedOption = this.selectedOptions[0];
    const idx = selectedOption ? this.options.indexOf(selectedOption) : -1;
    if (idx >= 0) {
      this.selectedIndex = idx;
    }

    if (this.root_.getAttribute('aria-disabled') === 'true') {
      this.disabled = true;
    }
  }
}

// CONCATENATED MODULE: ./node_modules/preact-material-components/List/index.js
var List__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




/**
 * @prop dense = false
 * @prop two-line = false
 * @prop interactive = false
 */
class List_List extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "list";
    this._mdcProps = ["dense", "two-line"];
  }
  materialDom(props) {
    if (props.interactive) {
      return Object(preact_esm["h"])(
        "nav",
        List__extends({ ref: control => this.control = control }, props),
        props.children
      );
    }

    return Object(preact_esm["h"])(
      "ul",
      List__extends({}, props, { ref: control => this.control = control }),
      props.children
    );
  }
}

class List_ListItem extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "list-item";
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "li",
      List__extends({ role: "option" }, props, { ref: control => this.control = control }),
      props.children
    );
  }
}

class List_LinkItem extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "list-item";
  }
  componentDidMount() {
    super.attachRipple();
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "a",
      List__extends({ role: "option" }, props, { ref: control => this.control = control }),
      props.children
    );
  }
}

/**
 * @prop start-detail = true
 * @prop end-detail = false
 */
class List_ListItemIcon extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "mdc-list-item__icon";
  }
  getProxyClassName(props) {
    let classNames = [];

    // default behavior
    props["start-detail"] = props["start-detail"] || true;

    // setting class names mutually exclusive
    if (props["end-detail"]) {
      classNames.push("mdc-list-item__end-detail");
    } else if (props["start-detail"]) {
      classNames.push("mdc-list-item__start-detail");
    }
    return classNames.join(" ");
  }
  materialDom(props) {
    const className = "material-icons " + this.getProxyClassName(props);
    return Object(preact_esm["h"])(
      "i",
      List__extends({
        className: className,
        "aria-hidden": "true"
      }, props, {
        ref: control => this.control = control
      }),
      props.children
    );
  }
}

/**
 * @prop start-detail = true
 * @prop end-detail = false
 */
class List_ListItemAvatar extends List_ListItemIcon {
  constructor() {
    super();
    this.componentName = "mdc-list-item__avatar";
  }
  materialDom(props) {
    return Object(preact_esm["h"])("img", List__extends({}, props, {
      className: super.getProxyClassName(props)
    }, props, {
      ref: control => this.control = control,
      width: props.width || "56",
      height: props.height || "56",
      alt: props.alt || ""
    }));
  }
}

class List_ListDivider extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "list-divider";
    this._mdcProps = ["inset"];
  }
  materialDom(props) {
    return Object(preact_esm["h"])("li", List__extends({
      role: "separator"
    }, props, {
      ref: control => this.control = control
    }));
  }
}

class List_ListTextContainer extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "list-item__text";
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "span",
      List__extends({}, props, { ref: control => this.control = control }),
      props.children
    );
  }
}

class ListPrimaryText extends List_ListTextContainer {
  constructor() {
    super();
    this.componentName = "list-item__text__primary";
  }
}

class ListSecondaryText extends List_ListTextContainer {
  constructor() {
    super();
    this.componentName = "list-item__text__secondary";
  }
}

List_List.Item = List_ListItem;
List_List.LinkItem = List_LinkItem;
List_List.ItemIcon = List_ListItemIcon;
List_List.ItemAvatar = List_ListItemAvatar;
List_List.Divider = List_ListDivider;
List_List.TextContainer = List_ListTextContainer;
List_List.PrimaryText = ListPrimaryText;
List_List.SecondaryText = ListSecondaryText;

/* harmony default export */ var preact_material_components_List = (List_List);
// CONCATENATED MODULE: ./node_modules/preact-material-components/Select/index.js
var Select__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





class Select_Select extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "select";
    this._mdcProps = ["disabled"];
    this._changed = this._changed.bind(this);
  }
  _changed(e) {
    e = e || {};
    e.selectedIndex = e.selectedIndex || this.MDComponent.selectedIndex;
    e.selectedOptions = e.selectedOptions || this.MDComponent.selectedOptions;
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }
  componentDidMount() {
    if (!this.props.basic) {
      this.MDComponent = new select_MDCSelect(this.control);
      this.MDComponent.listen("MDCSelect:change", this._changed);
      this.updateSelection();
    }
  }
  componentWillUnmount() {
    if (!this.props.basic) {
      this.MDComponent.unlisten("MDCSelect:change", this._changed);
      this.MDComponent.destroy && this.MDComponent.destroy();
    }
  }
  updateSelection() {
    if ("selectedIndex" in this.props && this.props.selectedIndex != null && this.MDComponent) {
      this.MDComponent.selectedIndex = this.props.selectedIndex;
    }
  }
  componentDidUpdate() {
    this.updateSelection();
    if (this.MDComponent && this.MDComponent.foundation_) {
      this.MDComponent.foundation_.resize();
    }
  }
  materialDom(props) {
    if (props.basic) {
      return Object(preact_esm["h"])(
        "select",
        Select__extends({}, props, {
          ref: control => {
            this.control = control;
          }
        }),
        props.children
      );
    }

    return Object(preact_esm["h"])(
      "div",
      Select__extends({
        role: "listbox"
      }, props, {
        ref: control => {
          this.control = control;
        }
      }),
      Object(preact_esm["h"])(
        "span",
        { className: "mdc-select__selected-text" },
        props.hintText
      ),
      Object(preact_esm["h"])(
        "div",
        { className: "mdc-simple-menu mdc-select__menu" },
        Object(preact_esm["h"])(
          "ul",
          { className: "mdc-list mdc-simple-menu__items " },
          props.children
        )
      )
    );
  }
}

Select_Select.Item = preact_material_components_List.Item;

/* harmony default export */ var preact_material_components_Select = (Select_Select);
// EXTERNAL MODULE: ./node_modules/preact-material-components/Card/index.js
var Card = __webpack_require__(21);

// CONCATENATED MODULE: ./node_modules/preact-material-components/Elevation/index.js
var Elevation__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




/**
 * @prop mini = false
 * @prop plain = false
 */
class Elevation_Elevation extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "elevation";
    this._mdcProps = [];
    for (let elevationIndex = 0; elevationIndex < 25; elevationIndex++) {
      this._mdcProps.push("z" + elevationIndex);
    }
  }
  materialDom(props) {
    let className = "";
    if (props.z) {
      className = "mdc-elevation--z" + props.z;
    }
    return Object(preact_esm["h"])(
      "p",
      Elevation__extends({
        className: className
      }, props, {
        ref: control => this.control = control
      }),
      props.children
    );
  }
}
// CONCATENATED MODULE: ./node_modules/preact-material-components/FormField/index.js



/**
 * @prop mini = false
 * @prop plain = false
 */
class Formfield extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "form-field";
    this._mdcProps = ["align-end"];
  }
}
// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/dialog/constants.js
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const dialog_constants_cssClasses = {
  ROOT: 'mdc-dialog',
  OPEN: 'mdc-dialog--open',
  ANIMATING: 'mdc-dialog--animating',
  BACKDROP: 'mdc-dialog__backdrop',
  SCROLL_LOCK: 'mdc-dialog-scroll-lock',
  ACCEPT_BTN: 'mdc-dialog__footer__button--accept',
  CANCEL_BTN: 'mdc-dialog__footer__button--cancel',
};

const dialog_constants_strings = {
  OPEN_DIALOG_SELECTOR: '.mdc-dialog--open',
  DIALOG_SURFACE_SELECTOR: '.mdc-dialog__surface',
  ACCEPT_SELECTOR: '.mdc-dialog__footer__button--accept',
  ACCEPT_EVENT: 'MDCDialog:accept',
  CANCEL_EVENT: 'MDCDialog:cancel',
};

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/dialog/foundation.js
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




class foundation_MDCDialogFoundation extends base["b" /* MDCFoundation */] {
  static get cssClasses() {
    return dialog_constants_cssClasses;
  }

  static get strings() {
    return dialog_constants_strings;
  }

  static get defaultAdapter() {
    return {
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      addBodyClass: (/* className: string */) => {},
      removeBodyClass: (/* className: string */) => {},
      eventTargetHasClass: (/* target: EventTarget, className: string */) => /* boolean */ false,
      registerInteractionHandler: (/* evt: string, handler: EventListener */) => {},
      deregisterInteractionHandler: (/* evt: string, handler: EventListener */) => {},
      registerSurfaceInteractionHandler: (/* evt: string, handler: EventListener */) => {},
      deregisterSurfaceInteractionHandler: (/* evt: string, handler: EventListener */) => {},
      registerDocumentKeydownHandler: (/* handler: EventListener */) => {},
      deregisterDocumentKeydownHandler: (/* handler: EventListener */) => {},
      registerTransitionEndHandler: (/* handler: EventListener */) => {},
      deregisterTransitionEndHandler: (/* handler: EventListener */) => {},
      notifyAccept: () => {},
      notifyCancel: () => {},
      trapFocusOnSurface: () => {},
      untrapFocusOnSurface: () => {},
      isDialog: (/* el: Element */) => /* boolean */ false,
      layoutFooterRipples: () => {},
    };
  }

  constructor(adapter) {
    super(Object.assign(foundation_MDCDialogFoundation.defaultAdapter, adapter));
    this.isOpen_ = false;
    this.componentClickHandler_ = (evt) => {
      if (this.adapter_.eventTargetHasClass(evt.target, dialog_constants_cssClasses.BACKDROP)) {
        this.cancel(true);
      }
    };
    this.dialogClickHandler_ = (evt) => this.handleDialogClick_(evt);
    this.documentKeydownHandler_ = (evt) => {
      if (evt.key && evt.key === 'Escape' || evt.keyCode === 27) {
        this.cancel(true);
      }
    };
    this.transitionEndHandler_ = (evt) => this.handleTransitionEnd_(evt);
  };

  destroy() {
    // Ensure that dialog is cleaned up when destroyed
    if (this.isOpen_) {
      this.adapter_.deregisterSurfaceInteractionHandler('click', this.dialogClickHandler_);
      this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
      this.adapter_.deregisterInteractionHandler('click', this.componentClickHandler_);
      this.adapter_.untrapFocusOnSurface();
      this.adapter_.deregisterTransitionEndHandler(this.transitionEndHandler_);
      this.adapter_.removeClass(foundation_MDCDialogFoundation.cssClasses.ANIMATING);
      this.adapter_.removeClass(foundation_MDCDialogFoundation.cssClasses.OPEN);
      this.enableScroll_();
    }
  }

  open() {
    this.isOpen_ = true;
    this.disableScroll_();
    this.adapter_.registerDocumentKeydownHandler(this.documentKeydownHandler_);
    this.adapter_.registerSurfaceInteractionHandler('click', this.dialogClickHandler_);
    this.adapter_.registerInteractionHandler('click', this.componentClickHandler_);
    this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
    this.adapter_.addClass(foundation_MDCDialogFoundation.cssClasses.ANIMATING);
    this.adapter_.addClass(foundation_MDCDialogFoundation.cssClasses.OPEN);
  }

  close() {
    this.isOpen_ = false;
    this.adapter_.deregisterSurfaceInteractionHandler('click', this.dialogClickHandler_);
    this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
    this.adapter_.deregisterInteractionHandler('click', this.componentClickHandler_);
    this.adapter_.untrapFocusOnSurface();
    this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
    this.adapter_.addClass(foundation_MDCDialogFoundation.cssClasses.ANIMATING);
    this.adapter_.removeClass(foundation_MDCDialogFoundation.cssClasses.OPEN);
  }

  isOpen() {
    return this.isOpen_;
  }

  accept(shouldNotify) {
    if (shouldNotify) {
      this.adapter_.notifyAccept();
    }

    this.close();
  }

  cancel(shouldNotify) {
    if (shouldNotify) {
      this.adapter_.notifyCancel();
    }

    this.close();
  }

  handleDialogClick_(evt) {
    const {target} = evt;
    if (this.adapter_.eventTargetHasClass(target, dialog_constants_cssClasses.ACCEPT_BTN)) {
      this.accept(true);
    } else if (this.adapter_.eventTargetHasClass(target, dialog_constants_cssClasses.CANCEL_BTN)) {
      this.cancel(true);
    }
  }

  handleTransitionEnd_(evt) {
    if (this.adapter_.isDialog(evt.target)) {
      this.adapter_.deregisterTransitionEndHandler(this.transitionEndHandler_);
      this.adapter_.removeClass(foundation_MDCDialogFoundation.cssClasses.ANIMATING);
      if (this.isOpen_) {
        this.adapter_.trapFocusOnSurface();
        this.adapter_.layoutFooterRipples();
      } else {
        this.enableScroll_();
      };
    };
  };

  disableScroll_() {
    this.adapter_.addBodyClass(dialog_constants_cssClasses.SCROLL_LOCK);
  }

  enableScroll_() {
    this.adapter_.removeBodyClass(dialog_constants_cssClasses.SCROLL_LOCK);
  }
}

// EXTERNAL MODULE: ./node_modules/focus-trap/index.js
var focus_trap = __webpack_require__(55);
var focus_trap_default = /*#__PURE__*/__webpack_require__.n(focus_trap);

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/dialog/util.js
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



function createFocusTrapInstance(surfaceEl, acceptButtonEl, focusTrapFactory = focus_trap_default.a) {
  return focusTrapFactory(surfaceEl, {
    initialFocus: acceptButtonEl,
    clickOutsideDeactivates: true,
  });
}

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/dialog/index.js
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */










class dialog_MDCDialog extends base["a" /* MDCComponent */] {
  static attachTo(root) {
    return new dialog_MDCDialog(root);
  }

  get open() {
    return this.foundation_.isOpen();
  }

  get acceptButton_() {
    return this.root_.querySelector(foundation_MDCDialogFoundation.strings.ACCEPT_SELECTOR);
  }

  get dialogSurface_() {
    return this.root_.querySelector(foundation_MDCDialogFoundation.strings.DIALOG_SURFACE_SELECTOR);
  }

  initialize() {
    this.focusTrap_ = createFocusTrapInstance(this.dialogSurface_, this.acceptButton_);
    this.footerBtnRipples_ = [];

    const footerBtns = this.root_.querySelectorAll('.mdc-dialog__footer__button');
    for (let i = 0, footerBtn; footerBtn = footerBtns[i]; i++) {
      this.footerBtnRipples_.push(new ripple["a" /* MDCRipple */](footerBtn));
    }
  }

  destroy() {
    this.footerBtnRipples_.forEach((ripple) => ripple.destroy());
    super.destroy();
  }

  show() {
    this.foundation_.open();
  }

  close() {
    this.foundation_.close();
  }

  getDefaultFoundation() {
    return new foundation_MDCDialogFoundation({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      addBodyClass: (className) => document.body.classList.add(className),
      removeBodyClass: (className) => document.body.classList.remove(className),
      eventTargetHasClass: (target, className) => target.classList.contains(className),
      registerInteractionHandler: (evt, handler) => this.root_.addEventListener(evt, handler),
      deregisterInteractionHandler: (evt, handler) => this.root_.removeEventListener(evt, handler),
      registerSurfaceInteractionHandler: (evt, handler) => this.dialogSurface_.addEventListener(evt, handler),
      deregisterSurfaceInteractionHandler: (evt, handler) => this.dialogSurface_.removeEventListener(evt, handler),
      registerDocumentKeydownHandler: (handler) => document.addEventListener('keydown', handler),
      deregisterDocumentKeydownHandler: (handler) => document.removeEventListener('keydown', handler),
      registerTransitionEndHandler: (handler) => this.dialogSurface_.addEventListener('transitionend', handler),
      deregisterTransitionEndHandler: (handler) => this.dialogSurface_.removeEventListener('transitionend', handler),
      notifyAccept: () => this.emit(foundation_MDCDialogFoundation.strings.ACCEPT_EVENT),
      notifyCancel: () => this.emit(foundation_MDCDialogFoundation.strings.CANCEL_EVENT),
      trapFocusOnSurface: () => this.focusTrap_.activate(),
      untrapFocusOnSurface: () => this.focusTrap_.deactivate(),
      isDialog: (el) => el === this.dialogSurface_,
      layoutFooterRipples: () => this.footerBtnRipples_.forEach((ripple) => ripple.layout()),
    });
  }
}

// CONCATENATED MODULE: ./node_modules/preact-material-components/Dialog/index.js
var Dialog__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





/**
 */
class Dialog_Dialog extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "dialog";
    this._onAccept = this._onAccept.bind(this);
    this._onCancel = this._onCancel.bind(this);
  }
  componentDidMount() {
    this.MDComponent = new dialog_MDCDialog(this.control);
    this.MDComponent.listen("MDCDialog:accept", this._onAccept);
    this.MDComponent.listen("MDCDialog:cancel", this._onCancel);
  }
  componentWillUnmount() {
    this.MDComponent.unlisten("MDCDialog:accept", this._onAccept);
    this.MDComponent.unlisten("MDCDialog:cancel", this._onCancel);
    this.MDComponent.destroy && this.MDComponent.destroy();
  }
  _onAccept(e) {
    if (this.props.onAccept) {
      this.props.onAccept(e);
    }
  }
  _onCancel(e) {
    if (this.props.onCancel) {
      this.props.onCancel(e);
    }
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "aside",
      Dialog__extends({
        role: "alertdialog",
        ref: control => {
          this.control = control;
        }
      }, props),
      Object(preact_esm["h"])(
        "div",
        { className: "mdc-dialog__surface" },
        props.children
      ),
      Object(preact_esm["h"])("div", { className: "mdc-dialog__backdrop" })
    );
  }
}

class Dialog_DialogHeader extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "dialog__header";
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "header",
      props,
      Object(preact_esm["h"])(
        "h2",
        { className: "mdc-dialog__header__title" },
        props.children
      )
    );
  }
}

/**
 * @prop scrollable = false
 */
class Dialog_DialogBody extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "dialog__body";
    this._mdcProps = ["scrollable"];
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "section",
      props,
      props.children
    );
  }
}

class Dialog_DialogFooter extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "dialog__footer";
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "footer",
      props,
      props.children
    );
  }
}

/**
 * @prop cancel = false
 * @prop accept = false
 */
class Dialog_DialogFooterButton extends Button["a" /* default */] {
  constructor() {
    super();
    this.componentName = "dialog__footer__button";
    this._mdcProps = ["cancel", "accept"];
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "button",
      Dialog__extends({}, props, {
        className: "mdc-button",
        ref: control => {
          this.control = control;
        }
      }),
      props.children
    );
  }
}

Dialog_Dialog.Header = Dialog_DialogHeader;
Dialog_Dialog.Body = Dialog_DialogBody;
Dialog_Dialog.Footer = Dialog_DialogFooter;
Dialog_Dialog.FooterButton = Dialog_DialogFooterButton;

/* harmony default export */ var preact_material_components_Dialog = (Dialog_Dialog);
// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/drawer/slidable/constants.js
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const constants_FOCUSABLE_ELEMENTS =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), ' +
  'button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]';

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/drawer/slidable/foundation.js
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



class MDCSlidableDrawerFoundation extends base["b" /* MDCFoundation */] {
  static get defaultAdapter() {
    return {
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      hasClass: (/* className: string */) => {},
      hasNecessaryDom: () => /* boolean */ false,
      registerInteractionHandler: (/* evt: string, handler: EventListener */) => {},
      deregisterInteractionHandler: (/* evt: string, handler: EventListener */) => {},
      registerDrawerInteractionHandler: (/* evt: string, handler: EventListener */) => {},
      deregisterDrawerInteractionHandler: (/* evt: string, handler: EventListener */) => {},
      registerTransitionEndHandler: (/* handler: EventListener */) => {},
      deregisterTransitionEndHandler: (/* handler: EventListener */) => {},
      registerDocumentKeydownHandler: (/* handler: EventListener */) => {},
      deregisterDocumentKeydownHandler: (/* handler: EventListener */) => {},
      setTranslateX: (/* value: number | null */) => {},
      getFocusableElements: () => /* NodeList */ {},
      saveElementTabState: (/* el: Element */) => {},
      restoreElementTabState: (/* el: Element */) => {},
      makeElementUntabbable: (/* el: Element */) => {},
      notifyOpen: () => {},
      notifyClose: () => {},
      isRtl: () => /* boolean */ false,
      getDrawerWidth: () => /* number */ 0,
    };
  }

  constructor(adapter, rootCssClass, animatingCssClass, openCssClass) {
    super(Object.assign(MDCSlidableDrawerFoundation.defaultAdapter, adapter));

    this.rootCssClass_ = rootCssClass;
    this.animatingCssClass_ = animatingCssClass;
    this.openCssClass_ = openCssClass;

    this.transitionEndHandler_ = (evt) => this.handleTransitionEnd_(evt);

    this.inert_ = false;

    this.drawerClickHandler_ = (evt) => evt.stopPropagation();
    this.componentTouchStartHandler_ = (evt) => this.handleTouchStart_(evt);
    this.componentTouchMoveHandler_ = (evt) => this.handleTouchMove_(evt);
    this.componentTouchEndHandler_ = (evt) => this.handleTouchEnd_(evt);
    this.documentKeydownHandler_ = (evt) => {
      if (evt.key && evt.key === 'Escape' || evt.keyCode === 27) {
        this.close();
      }
    };
  }

  init() {
    const ROOT = this.rootCssClass_;
    const OPEN = this.openCssClass_;

    if (!this.adapter_.hasClass(ROOT)) {
      throw new Error(`${ROOT} class required in root element.`);
    }

    if (!this.adapter_.hasNecessaryDom()) {
      throw new Error(`Required DOM nodes missing in ${ROOT} component.`);
    }

    if (this.adapter_.hasClass(OPEN)) {
      this.isOpen_ = true;
    } else {
      this.detabinate_();
      this.isOpen_ = false;
    }

    this.adapter_.registerDrawerInteractionHandler('click', this.drawerClickHandler_);
    this.adapter_.registerDrawerInteractionHandler('touchstart', this.componentTouchStartHandler_);
    this.adapter_.registerInteractionHandler('touchmove', this.componentTouchMoveHandler_);
    this.adapter_.registerInteractionHandler('touchend', this.componentTouchEndHandler_);
  }

  destroy() {
    this.adapter_.deregisterDrawerInteractionHandler('click', this.drawerClickHandler_);
    this.adapter_.deregisterDrawerInteractionHandler('touchstart', this.componentTouchStartHandler_);
    this.adapter_.deregisterInteractionHandler('touchmove', this.componentTouchMoveHandler_);
    this.adapter_.deregisterInteractionHandler('touchend', this.componentTouchEndHandler_);
    // Deregister the document keydown handler just in case the component is destroyed while the menu is open.
    this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
  }

  open() {
    this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
    this.adapter_.registerDocumentKeydownHandler(this.documentKeydownHandler_);
    this.adapter_.addClass(this.animatingCssClass_);
    this.adapter_.addClass(this.openCssClass_);
    this.retabinate_();
    // Debounce multiple calls
    if (!this.isOpen_) {
      this.adapter_.notifyOpen();
    }
    this.isOpen_ = true;
  }

  close() {
    this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
    this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
    this.adapter_.addClass(this.animatingCssClass_);
    this.adapter_.removeClass(this.openCssClass_);
    this.detabinate_();
    // Debounce multiple calls
    if (this.isOpen_) {
      this.adapter_.notifyClose();
    }
    this.isOpen_ = false;
  }

  isOpen() {
    return this.isOpen_;
  }

  /**
   *  Render all children of the drawer inert when it's closed.
   */
  detabinate_() {
    if (this.inert_) {
      return;
    }

    const elements = this.adapter_.getFocusableElements();
    if (elements) {
      for (let i = 0; i < elements.length; i++) {
        this.adapter_.saveElementTabState(elements[i]);
        this.adapter_.makeElementUntabbable(elements[i]);
      }
    }

    this.inert_ = true;
  }

  /**
   *  Make all children of the drawer tabbable again when it's open.
   */
  retabinate_() {
    if (!this.inert_) {
      return;
    }

    const elements = this.adapter_.getFocusableElements();
    if (elements) {
      for (let i = 0; i < elements.length; i++) {
        this.adapter_.restoreElementTabState(elements[i]);
      }
    }

    this.inert_ = false;
  }

  handleTouchStart_(evt) {
    if (!this.adapter_.hasClass(this.openCssClass_)) {
      return;
    }
    if (evt.pointerType && evt.pointerType !== 'touch') {
      return;
    }

    this.direction_ = this.adapter_.isRtl() ? -1 : 1;
    this.drawerWidth_ = this.adapter_.getDrawerWidth();
    this.startX_ = evt.touches ? evt.touches[0].pageX : evt.pageX;
    this.currentX_ = this.startX_;

    this.updateRaf_ = requestAnimationFrame(this.updateDrawer_.bind(this));
  }

  handleTouchMove_(evt) {
    if (evt.pointerType && evt.pointerType !== 'touch') {
      return;
    }

    this.currentX_ = evt.touches ? evt.touches[0].pageX : evt.pageX;
  }

  handleTouchEnd_(evt) {
    if (evt.pointerType && evt.pointerType !== 'touch') {
      return;
    }

    this.prepareForTouchEnd_();

    // Did the user close the drawer by more than 50%?
    if (Math.abs(this.newPosition_ / this.drawerWidth_) >= 0.5) {
      this.close();
    } else {
      // Triggering an open here means we'll get a nice animation back to the fully open state.
      this.open();
    }
  }

  prepareForTouchEnd_() {
    cancelAnimationFrame(this.updateRaf_);
    this.adapter_.setTranslateX(null);
  }

  updateDrawer_() {
    this.updateRaf_ = requestAnimationFrame(this.updateDrawer_.bind(this));
    this.adapter_.setTranslateX(this.newPosition_);
  }

  get newPosition_() {
    let newPos = null;

    if (this.direction_ === 1) {
      newPos = Math.min(0, this.currentX_ - this.startX_);
    } else {
      newPos = Math.max(0, this.currentX_ - this.startX_);
    }

    return newPos;
  }

  isRootTransitioningEventTarget_() {
    // Classes extending MDCSlidableDrawerFoundation should implement this method to return true or false
    // if the event target is the root event target currently transitioning.
    return false;
  }

  handleTransitionEnd_(evt) {
    if (this.isRootTransitioningEventTarget_(evt.target)) {
      this.adapter_.removeClass(this.animatingCssClass_);
      this.adapter_.deregisterTransitionEndHandler(this.transitionEndHandler_);
    }
  };
}

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/drawer/slidable/index.js
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/drawer/temporary/constants.js
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



const temporary_constants_cssClasses = {
  ROOT: 'mdc-temporary-drawer',
  OPEN: 'mdc-temporary-drawer--open',
  ANIMATING: 'mdc-temporary-drawer--animating',
  SCROLL_LOCK: 'mdc-drawer-scroll-lock',
};

const temporary_constants_strings = {
  DRAWER_SELECTOR: '.mdc-temporary-drawer__drawer',
  OPACITY_VAR_NAME: '--mdc-temporary-drawer-opacity',
  FOCUSABLE_ELEMENTS: constants_FOCUSABLE_ELEMENTS,
  OPEN_EVENT: 'MDCTemporaryDrawer:open',
  CLOSE_EVENT: 'MDCTemporaryDrawer:close',
};

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/drawer/temporary/foundation.js
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




class foundation_MDCTemporaryDrawerFoundation extends MDCSlidableDrawerFoundation {
  static get cssClasses() {
    return temporary_constants_cssClasses;
  }

  static get strings() {
    return temporary_constants_strings;
  }

  static get defaultAdapter() {
    return Object.assign(MDCSlidableDrawerFoundation.defaultAdapter, {
      addBodyClass: (/* className: string */) => {},
      removeBodyClass: (/* className: string */) => {},
      isDrawer: () => false,
      updateCssVariable: (/* value: string */) => {},
    });
  }

  constructor(adapter) {
    super(
      Object.assign(foundation_MDCTemporaryDrawerFoundation.defaultAdapter, adapter),
      foundation_MDCTemporaryDrawerFoundation.cssClasses.ROOT,
      foundation_MDCTemporaryDrawerFoundation.cssClasses.ANIMATING,
      foundation_MDCTemporaryDrawerFoundation.cssClasses.OPEN);

    this.componentClickHandler_ = () => this.close();
  }

  init() {
    super.init();

    // Make browser aware of custom property being used in this element.
    // Workaround for certain types of hard-to-reproduce heisenbugs.
    this.adapter_.updateCssVariable(0);
    this.adapter_.registerInteractionHandler('click', this.componentClickHandler_);
  }

  destroy() {
    super.destroy();

    this.adapter_.deregisterInteractionHandler('click', this.componentClickHandler_);
    this.enableScroll_();
  }

  open() {
    this.disableScroll_();
    // Make sure custom property values are cleared before starting.
    this.adapter_.updateCssVariable('');

    super.open();
  }

  close() {
    // Make sure custom property values are cleared before making any changes.
    this.adapter_.updateCssVariable('');

    super.close();
  }

  prepareForTouchEnd_() {
    super.prepareForTouchEnd_();

    this.adapter_.updateCssVariable('');
  }

  updateDrawer_() {
    super.updateDrawer_();

    const newOpacity = Math.max(0, 1 + this.direction_ * (this.newPosition_ / this.drawerWidth_));
    this.adapter_.updateCssVariable(newOpacity);
  }

  isRootTransitioningEventTarget_(el) {
    return this.adapter_.isDrawer(el);
  }

  handleTransitionEnd_(evt) {
    super.handleTransitionEnd_(evt);
    if (!this.isOpen_) {
      this.enableScroll_();
    }
  };

  disableScroll_() {
    this.adapter_.addBodyClass(temporary_constants_cssClasses.SCROLL_LOCK);
  }

  enableScroll_() {
    this.adapter_.removeBodyClass(temporary_constants_cssClasses.SCROLL_LOCK);
  }
}

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/drawer/util.js
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const TAB_DATA = 'data-mdc-tabindex';
const TAB_DATA_HANDLED = 'data-mdc-tabindex-handled';

let util_storedTransformPropertyName_;
let supportsPassive_;

// Remap touch events to pointer events, if the browser doesn't support touch events.
function remapEvent(eventName, globalObj = window) {
  if (!('ontouchstart' in globalObj.document)) {
    switch (eventName) {
    case 'touchstart':
      return 'pointerdown';
    case 'touchmove':
      return 'pointermove';
    case 'touchend':
      return 'pointerup';
    default:
      return eventName;
    }
  }

  return eventName;
}

// Choose the correct transform property to use on the current browser.
function util_getTransformPropertyName(globalObj = window, forceRefresh = false) {
  if (util_storedTransformPropertyName_ === undefined || forceRefresh) {
    const el = globalObj.document.createElement('div');
    const transformPropertyName = ('transform' in el.style ? 'transform' : '-webkit-transform');
    util_storedTransformPropertyName_ = transformPropertyName;
  }

  return util_storedTransformPropertyName_;
}

// Determine whether the current browser supports CSS properties.
function supportsCssCustomProperties(globalObj = window) {
  if ('CSS' in globalObj) {
    return globalObj.CSS.supports('(--color: red)');
  }
  return false;
}

// Determine whether the current browser supports passive event listeners, and if so, use them.
function applyPassive(globalObj = window, forceRefresh = false) {
  if (supportsPassive_ === undefined || forceRefresh) {
    let isSupported = false;
    try {
      globalObj.document.addEventListener('test', null, {get passive() {
        isSupported = true;
      }});
    } catch (e) { }

    supportsPassive_ = isSupported;
  }

  return supportsPassive_ ? {passive: true} : false;
}

// Save the tab state for an element.
function saveElementTabState(el) {
  if (el.hasAttribute('tabindex')) {
    el.setAttribute(TAB_DATA, el.getAttribute('tabindex'));
  }
  el.setAttribute(TAB_DATA_HANDLED, true);
}

// Restore the tab state for an element, if it was saved.
function restoreElementTabState(el) {
  // Only modify elements we've already handled, in case anything was dynamically added since we saved state.
  if (el.hasAttribute(TAB_DATA_HANDLED)) {
    if (el.hasAttribute(TAB_DATA)) {
      el.setAttribute('tabindex', el.getAttribute(TAB_DATA));
      el.removeAttribute(TAB_DATA);
    } else {
      el.removeAttribute('tabindex');
    }
    el.removeAttribute(TAB_DATA_HANDLED);
  }
}

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/drawer/temporary/index.js
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */








class temporary_MDCTemporaryDrawer extends base["a" /* MDCComponent */] {
  static attachTo(root) {
    return new temporary_MDCTemporaryDrawer(root);
  }

  get open() {
    return this.foundation_.isOpen();
  }

  set open(value) {
    if (value) {
      this.foundation_.open();
    } else {
      this.foundation_.close();
    }
  }

  /* Return the drawer element inside the component. */
  get drawer() {
    return this.root_.querySelector(foundation_MDCTemporaryDrawerFoundation.strings.DRAWER_SELECTOR);
  }

  getDefaultFoundation() {
    const {FOCUSABLE_ELEMENTS, OPACITY_VAR_NAME} = foundation_MDCTemporaryDrawerFoundation.strings;

    return new foundation_MDCTemporaryDrawerFoundation({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      hasClass: (className) => this.root_.classList.contains(className),
      addBodyClass: (className) => document.body.classList.add(className),
      removeBodyClass: (className) => document.body.classList.remove(className),
      hasNecessaryDom: () => Boolean(this.drawer),
      registerInteractionHandler: (evt, handler) =>
        this.root_.addEventListener(remapEvent(evt), handler, applyPassive()),
      deregisterInteractionHandler: (evt, handler) =>
        this.root_.removeEventListener(remapEvent(evt), handler, applyPassive()),
      registerDrawerInteractionHandler: (evt, handler) =>
        this.drawer.addEventListener(remapEvent(evt), handler),
      deregisterDrawerInteractionHandler: (evt, handler) =>
        this.drawer.removeEventListener(remapEvent(evt), handler),
      registerTransitionEndHandler: (handler) => this.drawer.addEventListener('transitionend', handler),
      deregisterTransitionEndHandler: (handler) => this.drawer.removeEventListener('transitionend', handler),
      registerDocumentKeydownHandler: (handler) => document.addEventListener('keydown', handler),
      deregisterDocumentKeydownHandler: (handler) => document.removeEventListener('keydown', handler),
      getDrawerWidth: () => this.drawer.offsetWidth,
      setTranslateX: (value) => this.drawer.style.setProperty(
        util_getTransformPropertyName(), value === null ? null : `translateX(${value}px)`),
      updateCssVariable: (value) => {
        if (supportsCssCustomProperties()) {
          this.root_.style.setProperty(OPACITY_VAR_NAME, value);
        }
      },
      getFocusableElements: () => this.drawer.querySelectorAll(FOCUSABLE_ELEMENTS),
      saveElementTabState: (el) => saveElementTabState(el),
      restoreElementTabState: (el) => restoreElementTabState(el),
      makeElementUntabbable: (el) => el.setAttribute('tabindex', -1),
      notifyOpen: () => this.emit(foundation_MDCTemporaryDrawerFoundation.strings.OPEN_EVENT),
      notifyClose: () => this.emit(foundation_MDCTemporaryDrawerFoundation.strings.CLOSE_EVENT),
      isRtl: () => getComputedStyle(this.root_).getPropertyValue('direction') === 'rtl',
      isDrawer: (el) => el === this.drawer,
    });
  }
}

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/drawer/persistent/constants.js
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



const persistent_constants_cssClasses = {
  ROOT: 'mdc-persistent-drawer',
  OPEN: 'mdc-persistent-drawer--open',
  ANIMATING: 'mdc-persistent-drawer--animating',
};

const persistent_constants_strings = {
  DRAWER_SELECTOR: '.mdc-persistent-drawer__drawer',
  FOCUSABLE_ELEMENTS: constants_FOCUSABLE_ELEMENTS,
  OPEN_EVENT: 'MDCPersistentDrawer:open',
  CLOSE_EVENT: 'MDCPersistentDrawer:close',
};

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/drawer/persistent/foundation.js
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




class foundation_MDCPersistentDrawerFoundation extends MDCSlidableDrawerFoundation {
  static get cssClasses() {
    return persistent_constants_cssClasses;
  }

  static get strings() {
    return persistent_constants_strings;
  }

  static get defaultAdapter() {
    return Object.assign(MDCSlidableDrawerFoundation.defaultAdapter, {
      isDrawer: () => false,
    });
  }

  constructor(adapter) {
    super(
      Object.assign(foundation_MDCPersistentDrawerFoundation.defaultAdapter, adapter),
      foundation_MDCPersistentDrawerFoundation.cssClasses.ROOT,
      foundation_MDCPersistentDrawerFoundation.cssClasses.ANIMATING,
      foundation_MDCPersistentDrawerFoundation.cssClasses.OPEN);
  }

  isRootTransitioningEventTarget_(el) {
    return this.adapter_.isDrawer(el);
  }
}

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/drawer/persistent/index.js
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */








class persistent_MDCPersistentDrawer extends base["a" /* MDCComponent */] {
  static attachTo(root) {
    return new persistent_MDCPersistentDrawer(root);
  }

  get open() {
    return this.foundation_.isOpen();
  }

  set open(value) {
    if (value) {
      this.foundation_.open();
    } else {
      this.foundation_.close();
    }
  }

  // Return the drawer element inside the component.
  get drawer() {
    return this.root_.querySelector(foundation_MDCPersistentDrawerFoundation.strings.DRAWER_SELECTOR);
  }

  getDefaultFoundation() {
    const {FOCUSABLE_ELEMENTS} = foundation_MDCPersistentDrawerFoundation.strings;

    return new foundation_MDCPersistentDrawerFoundation({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      hasClass: (className) => this.root_.classList.contains(className),
      hasNecessaryDom: () => Boolean(this.drawer),
      registerInteractionHandler: (evt, handler) =>
        this.root_.addEventListener(remapEvent(evt), handler, applyPassive()),
      deregisterInteractionHandler: (evt, handler) =>
        this.root_.removeEventListener(remapEvent(evt), handler, applyPassive()),
      registerDrawerInteractionHandler: (evt, handler) =>
        this.drawer.addEventListener(remapEvent(evt), handler),
      deregisterDrawerInteractionHandler: (evt, handler) =>
        this.drawer.removeEventListener(remapEvent(evt), handler),
      registerTransitionEndHandler: (handler) =>
        this.root_.addEventListener('transitionend', handler),
      deregisterTransitionEndHandler: (handler) =>
        this.root_.removeEventListener('transitionend', handler),
      registerDocumentKeydownHandler: (handler) => document.addEventListener('keydown', handler),
      deregisterDocumentKeydownHandler: (handler) => document.removeEventListener('keydown', handler),
      getDrawerWidth: () => this.drawer.offsetWidth,
      setTranslateX: (value) => this.drawer.style.setProperty(
        util_getTransformPropertyName(), value === null ? null : `translateX(${value}px)`),
      getFocusableElements: () => this.drawer.querySelectorAll(FOCUSABLE_ELEMENTS),
      saveElementTabState: (el) => saveElementTabState(el),
      restoreElementTabState: (el) => restoreElementTabState(el),
      makeElementUntabbable: (el) => el.setAttribute('tabindex', -1),
      notifyOpen: () => this.emit(foundation_MDCPersistentDrawerFoundation.strings.OPEN_EVENT),
      notifyClose: () => this.emit(foundation_MDCPersistentDrawerFoundation.strings.CLOSE_EVENT),
      isRtl: () => getComputedStyle(this.root_).getPropertyValue('direction') === 'rtl',
      isDrawer: (el) => el === this.drawer,
    });
  }
}

// CONCATENATED MODULE: ./node_modules/preact-material-components/Drawer/index.js
var Drawer__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };







/*
 * Default props for drawers
 */
const Drawer_defaultProps = {
  open: false
};

class Drawer_TemporaryDrawer extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "temporary-drawer";
    this._open = this._open.bind(this);
    this._close = this._close.bind(this);
  }
  _open() {
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }
  _close() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
  componentDidMount() {
    this.MDComponent = temporary_MDCTemporaryDrawer.attachTo(this.control);
    this.MDComponent.listen("MDCTemporaryDrawer:open", this._open);
    this.MDComponent.listen("MDCTemporaryDrawer:close", this._close);
    toggleDrawer(Drawer_defaultProps, this.props, this.MDComponent);
  }
  componentWillUnmount() {
    this.MDComponent.unlisten("MDCTemporaryDrawer:close", this._close);
    this.MDComponent.unlisten("MDCTemporaryDrawer:open", this._open);
    this.MDComponent.destroy && this.MDComponent.destroy();
  }
  componentWillUpdate(nextProps) {
    toggleDrawer(this.props, nextProps, this.MDComponent);
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "aside",
      Drawer__extends({
        className: "mdc-typography",
        ref: control => {
          this.control = control;
        }
      }, props),
      Object(preact_esm["h"])(
        "nav",
        { className: "mdc-temporary-drawer__drawer" },
        props.children
      )
    );
  }
}

class Drawer_TemporaryDrawerHeader extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "temporary-drawer__header";
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "header",
      Drawer__extends({
        ref: control => {
          this.control = control;
        }
      }, props),
      Object(preact_esm["h"])(
        "div",
        { className: "mdc-temporary-drawer__header-content" },
        props.children
      )
    );
  }
}

class Drawer_TemporaryDrawerContent extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "temporary-drawer__content";
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "nav",
      Drawer__extends({
        className: "mdc-list",
        ref: control => {
          this.control = control;
        }
      }, props),
      props.children
    );
  }
}

/**
 * @prop spacer = false
 */
class Drawer_PermanentDrawer extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "permanent-drawer";
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "nav",
      Drawer__extends({ className: "mdc-typography" }, props),
      props.spacer && Object(preact_esm["h"])("div", { className: "mdc-permanent-drawer__toolbar-spacer" }),
      Object(preact_esm["h"])(
        "div",
        { className: "mdc-permanent-drawer__content" },
        Object(preact_esm["h"])(
          "nav",
          { className: "mdc-list" },
          props.children
        )
      )
    );
  }
}

class Drawer_PermanentDrawerHeader extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "permanent-drawer__header";
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "header",
      Drawer__extends({
        ref: control => {
          this.control = control;
        }
      }, props),
      Object(preact_esm["h"])(
        "div",
        { className: "mdc-permanent-drawer__header-content" },
        props.children
      )
    );
  }
}

class PermanentDrawerContent extends Drawer_TemporaryDrawerContent {
  constructor() {
    super();
    this.componentName = "permanent-drawer__content";
  }
}

class Drawer_PersistentDrawer extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "persistent-drawer";
    this._open = this._open.bind(this);
    this._close = this._close.bind(this);
  }
  _open() {
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }
  _close() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
  componentDidMount() {
    this.MDComponent = persistent_MDCPersistentDrawer.attachTo(this.control);
    this.MDComponent.listen("MDCPersistentDrawer:open", this._open);
    this.MDComponent.listen("MDCPersistentDrawer:close", this._close);
    toggleDrawer(Drawer_defaultProps, this.props, this.MDComponent);
  }
  componentWillUnmount() {
    this.MDComponent.unlisten("MDCPersistentDrawer:close", this._close);
    this.MDComponent.unlisten("MDCPersistentDrawer:open", this._open);
    this.MDComponent.destroy && this.MDComponent.destroy();
  }
  componentWillUpdate(nextProps) {
    toggleDrawer(this.props, nextProps, this.MDComponent);
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "aside",
      Drawer__extends({
        className: "mdc-typography",
        ref: control => {
          this.control = control;
        }
      }, props),
      Object(preact_esm["h"])("nav", { className: "mdc-persistent-drawer__drawer" })
    );
  }
}

class Drawer_PersistentDrawerHeader extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "persistent-drawer__header";
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "header",
      Drawer__extends({
        ref: control => {
          this.control = control;
        }
      }, props),
      Object(preact_esm["h"])(
        "div",
        { className: "mdc-persistent-drawer__header-content" },
        props.children
      )
    );
  }
}

class PersistentDrawerContent extends Drawer_TemporaryDrawerContent {
  constructor() {
    super();
    this.componentName = "persistent-drawer__content";
  }
}

/**
 * @prop selected = false
 */
class DrawerItem extends preact_material_components_List.LinkItem {
  constructor() {
    super();
  }
  materialDom(props) {
    const returnedNode = super.materialDom(props);
    /* Logic to add selected class */
    if (props.selected) {
      returnedNode.attributes["className"] = "mdc-temporary-drawer--selected mdc-permanent-drawer--selected";
    }
    return returnedNode;
  }
}

/*
 * Function to add declarative opening/closing to drawer
 */
function toggleDrawer(oldprops, newprops, drawer) {
  if ("open" in oldprops && "open" in newprops && oldprops.open !== newprops.open) {
    drawer.open = newprops.open;
  }
}

let Drawer = {};

Drawer.DrawerItem = DrawerItem;
Drawer.TemporaryDrawer = Drawer_TemporaryDrawer;
Drawer.TemporaryDrawerHeader = Drawer_TemporaryDrawerHeader;
Drawer.TemporaryDrawerContent = Drawer_TemporaryDrawerContent;
Drawer.PermanentDrawer = Drawer_PermanentDrawer;
Drawer.PermanentDrawerHeader = Drawer_PermanentDrawerHeader;
Drawer.PermanentDrawerContent = PermanentDrawerContent;
Drawer.PersistentDrawer = Drawer_PersistentDrawer;
Drawer.PersistentDrawerHeader = Drawer_PersistentDrawerHeader;
Drawer.PersistentDrawerContent = PersistentDrawerContent;

/* harmony default export */ var preact_material_components_Drawer = (Drawer);
// EXTERNAL MODULE: ./node_modules/preact-material-components/Toolbar/index.js + 4 modules
var Toolbar = __webpack_require__(22);

// CONCATENATED MODULE: ./node_modules/@material/linear-progress/constants.js
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const linear_progress_constants_cssClasses = {
  CLOSED_CLASS: 'mdc-linear-progress--closed',
  INDETERMINATE_CLASS: 'mdc-linear-progress--indeterminate',
  REVERSED_CLASS: 'mdc-linear-progress--reversed',
};

const linear_progress_constants_strings = {
  PRIMARY_BAR_SELECTOR: '.mdc-linear-progress__primary-bar',
  BUFFER_SELECTOR: '.mdc-linear-progress__buffer',
};

// CONCATENATED MODULE: ./node_modules/@material/linear-progress/foundation.js
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






class foundation_MDCLinearProgressFoundation extends base["b" /* MDCFoundation */] {
  static get cssClasses() {
    return linear_progress_constants_cssClasses;
  }

  static get strings() {
    return linear_progress_constants_strings;
  }

  static get defaultAdapter() {
    return {
      addClass: (/* className: string */) => {},
      getPrimaryBar: () => /* el: Element */ {},
      getBuffer: () => /* el: Element */ {},
      hasClass: (/* className: string */) => false,
      removeClass: (/* className: string */) => {},
      setStyle: (/* el: Element, styleProperty: string, value: number */) => {},
    };
  }

  constructor(adapter) {
    super(Object.assign(foundation_MDCLinearProgressFoundation.defaultAdapter, adapter));
  }

  init() {
    this.determinate_ = !this.adapter_.hasClass(linear_progress_constants_cssClasses.INDETERMINATE_CLASS);
    this.reverse_ = this.adapter_.hasClass(linear_progress_constants_cssClasses.REVERSED_CLASS);
  }

  setDeterminate(isDeterminate) {
    this.determinate_ = isDeterminate;
    if (this.determinate_) {
      this.adapter_.removeClass(linear_progress_constants_cssClasses.INDETERMINATE_CLASS);
    } else {
      this.adapter_.addClass(linear_progress_constants_cssClasses.INDETERMINATE_CLASS);
      this.setScale_(this.adapter_.getPrimaryBar(), 1);
      this.setScale_(this.adapter_.getBuffer(), 1);
    }
  }

  setProgress(value) {
    if (this.determinate_) {
      this.setScale_(this.adapter_.getPrimaryBar(), value);
    }
  }

  setBuffer(value) {
    if (this.determinate_) {
      this.setScale_(this.adapter_.getBuffer(), value);
    }
  }

  setReverse(isReversed) {
    this.reverse_ = isReversed;
    if (this.reverse_) {
      this.adapter_.addClass(linear_progress_constants_cssClasses.REVERSED_CLASS);
    } else {
      this.adapter_.removeClass(linear_progress_constants_cssClasses.REVERSED_CLASS);
    }
  }

  open() {
    this.adapter_.removeClass(linear_progress_constants_cssClasses.CLOSED_CLASS);
  }

  close() {
    this.adapter_.addClass(linear_progress_constants_cssClasses.CLOSED_CLASS);
  }

  setScale_(el, scaleValue) {
    const value = 'scaleX(' + scaleValue + ')';
    transformStyleProperties.forEach((transformStyleProperty) => {
      this.adapter_.setStyle(el, transformStyleProperty, value);
    });
  }
}

// CONCATENATED MODULE: ./node_modules/@material/linear-progress/index.js
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






class linear_progress_MDCLinearProgress extends base["a" /* MDCComponent */] {
  static attachTo(root) {
    return new linear_progress_MDCLinearProgress(root);
  }

  set determinate(value) {
    this.foundation_.setDeterminate(value);
  }

  set progress(value) {
    this.foundation_.setProgress(value);
  }

  set buffer(value) {
    this.foundation_.setBuffer(value);
  }

  set reverse(value) {
    this.foundation_.setReverse(value);
  }

  open() {
    this.foundation_.open();
  }

  close() {
    this.foundation_.close();
  }

  getDefaultFoundation() {
    return new foundation_MDCLinearProgressFoundation({
      addClass: (className) => this.root_.classList.add(className),
      getPrimaryBar: () => this.root_.querySelector(foundation_MDCLinearProgressFoundation.strings.PRIMARY_BAR_SELECTOR),
      getBuffer: () => this.root_.querySelector(foundation_MDCLinearProgressFoundation.strings.BUFFER_SELECTOR),
      hasClass: (className) => this.root_.classList.contains(className),
      removeClass: (className) => this.root_.classList.remove(className),
      setStyle: (el, styleProperty, value) => el.style[styleProperty] = value,
    });
  }
}

// CONCATENATED MODULE: ./node_modules/preact-material-components/LinearProgress/index.js
var LinearProgress__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





/**
 * @prop indeterminate = false
 * @prop reversed = false
 * @prop accent = false
 */
class LinearProgress_LinearProgress extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "linear-progress";
    this._mdcProps = ["indeterminate", "reversed"];
  }
  componentDidMount() {
    this.MDComponent = new linear_progress_MDCLinearProgress(this.control);
    updateProgress(this.props, this.MDComponent);
  }
  componentWillUnmount() {
    this.MDComponent.destroy && this.MDComponent.destroy();
  }
  componentWillUpdate(nextProps) {
    updateProgress(nextProps, this.MDComponent);
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "div",
      LinearProgress__extends({
        role: "progressbar"
      }, props, {
        ref: control => this.control = control
      }),
      Object(preact_esm["h"])("div", { className: "mdc-linear-progress__buffering-dots" }),
      Object(preact_esm["h"])("div", { className: "mdc-linear-progress__buffer" }),
      Object(preact_esm["h"])(
        "div",
        { className: "mdc-linear-progress__bar mdc-linear-progress__primary-bar" },
        Object(preact_esm["h"])("span", { className: "mdc-linear-progress__bar-inner" })
      ),
      Object(preact_esm["h"])(
        "div",
        { className: "mdc-linear-progress__bar mdc-linear-progress__secondary-bar" },
        Object(preact_esm["h"])("span", { className: "mdc-linear-progress__bar-inner" })
      )
    );
  }
}

function updateProgress(props, progressBar) {
  if (!props.indeterminate && props.progress) {
    progressBar.progress = props.progress;
  }
}
// CONCATENATED MODULE: ./node_modules/preact-material-components/LayoutGrid/index.js
var LayoutGrid__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




class LayoutGrid_LayoutGrid extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "layout-grid";
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "div",
      LayoutGrid__extends({
        ref: control => {
          this.control = control;
        }
      }, props),
      props.children
    );
  }
}

class LayoutGrid_LayoutGridInner extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "layout-grid__inner";
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "div",
      LayoutGrid__extends({
        ref: control => {
          this.control = control;
        }
      }, props),
      props.children
    );
  }
}

/**
 * @prop cols = 0
 * @prop desktopCols = 0
 * @prop tabletCols = 0
 * @prop phoneCols = 0
 * @prop order = 0
 * @prop align = ''
 */
class LayoutGrid_LayoutGridCell extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "layout-grid__cell";
    this._propsDict = {
      cols: "cols",
      desktop: "desktopCols",
      tablet: "tabletCols",
      phone: "phoneCols",
      order: "order",
      align: "align"
    };
  }
  createClassName(props) {
    const baseClass = "mdc-layout-grid__cell--";
    const classes = [];

    if (props[this._propsDict.cols]) {
      classes.push(baseClass + "span-" + props[this._propsDict.cols]);
    }

    if (props[this._propsDict.desktop]) {
      classes.push(baseClass + "span-" + props[this._propsDict.desktop] + "-desktop");
    }

    if (props[this._propsDict.tablet]) {
      classes.push(baseClass + "span-" + props[this._propsDict.tablet] + "-tablet");
    }

    if (props[this._propsDict.phone]) {
      classes.push(baseClass + "span-" + props[this._propsDict.phone] + "-phone");
    }

    if (props[this._propsDict.order]) {
      classes.push(baseClass + "order-" + props[this._propsDict.order]);
    }

    if (props[this._propsDict.align]) {
      classes.push(baseClass + "align-" + props[this._propsDict.align]);
    }

    if (props.className) {
      classes.push(props.className);
    }

    return classes.join(" ");
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "div",
      LayoutGrid__extends({}, props, {
        className: this.createClassName(props),
        ref: control => {
          this.control = control;
        }
      }),
      props.children
    );
  }
  render() {
    const element = super.render();
    // remove the extra attributes used for customising this element - keep the DOM clean
    Object.keys(this._propsDict).forEach(key => delete element.attributes[this._propsDict[key]]);
    return element;
  }
}

LayoutGrid_LayoutGrid.Cell = LayoutGrid_LayoutGridCell;
LayoutGrid_LayoutGrid.Inner = LayoutGrid_LayoutGridInner;

/* harmony default export */ var preact_material_components_LayoutGrid = (LayoutGrid_LayoutGrid);
// CONCATENATED MODULE: ./node_modules/preact-material-components/GridList/index.js
var GridList__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





const notEmptyString = val => val !== "";

/**
 * @prop tile-gutter-1 {boolean} - use 1px gutter (default is 4px)
 * @prop header-caption {boolean} - position <GridList.SecondaryTile> at top
 * @prop twoline-caption {boolean} - add spacing to <GridList.SecondaryTile> for <GridList.SupportTextTile>
 * @prop with-icon-align {"start"|"end"} - position <GridList.IconTile> at beginning or end of <GridList.SecondaryTile>
 * @prop aspect-ratio {"1x1"|"16x9"|"2x3"|"3x2"|"4x3"|"3x4"} - aspect ratio for <GridList.PrimaryTile>
 */
class GridList_GridList extends MaterialComponent["a" /* default */] {
  get validationValuesByKey() {
    return {
      "with-icon-align": ["start", "end"],
      "tile-aspect": ["1x1", "16x9", "2x3", "3x2", "4x3", "3x4"]
    };
  }

  isValidValue(validationValues, testValue) {
    return validationValues && validationValues.findIndex(val => val === testValue) >= 0;
  }

  constructor() {
    super();
    this.componentName = "grid-list";
    this._mdcProps = ["header-caption", "twoline-caption", "tile-gutter-1"];
  }
  mapClassName(propKey, props) {
    const propValue = props[propKey];
    const validationValues = this.validationValuesByKey[propKey];

    return this.isValidValue(validationValues, propValue) ? `mdc-${this.componentName}--${propKey}-${propValue}` : "";
  }
  materialDom(props) {
    const className = Object.keys(this.validationValuesByKey).map(key => {
      return this.mapClassName(key, props);
    }).filter(notEmptyString).join(" ");

    return Object(preact_esm["h"])(
      "div",
      GridList__extends({}, props, { className: className }),
      props.children
    );
  }
}

class GridList_GridListTiles extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "grid-list__tiles";
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "ul",
      props,
      props.children
    );
  }
}

class GridList_GridListTile extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "grid-tile";
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "li",
      props,
      props.children
    );
  }
}

class GridList_GridListPrimaryTile extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "grid-tile__primary";
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "div",
      props,
      props.children
    );
  }
}

class GridList_GridListPrimaryContentTile extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "grid-tile__primary-content";
  }
  materialDom(props) {
    return Object(preact_esm["h"])("img", props);
  }
}

class GridList_GridListSecondaryTile extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "grid-tile__secondary";
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "span",
      props,
      props.children
    );
  }
}

class GridList_GridListTitleTile extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "grid-tile__title";
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "span",
      props,
      props.children
    );
  }
}

class GridList_GridListSupportTextTile extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "grid-tile__support-text";
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "span",
      props,
      props.children
    );
  }
}

class GridListIconTile extends Icon["a" /* default */] {
  constructor() {
    super();
    this.componentName = "grid-tile__icon";
  }
}

GridList_GridList.Tiles = GridList_GridListTiles;
GridList_GridList.Tile = GridList_GridListTile;
GridList_GridList.PrimaryTile = GridList_GridListPrimaryTile;
GridList_GridList.PrimaryContentTile = GridList_GridListPrimaryContentTile;
GridList_GridList.SecondaryTile = GridList_GridListSecondaryTile;
GridList_GridList.TitleTile = GridList_GridListTitleTile;
GridList_GridList.SupportTextTile = GridList_GridListSupportTextTile;
GridList_GridList.IconTile = GridListIconTile;

/* harmony default export */ var preact_material_components_GridList = (GridList_GridList);
// CONCATENATED MODULE: ./node_modules/preact-material-components/Menu/index.js
var Menu__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };






/*
 * Default props for menu
 */
const Menu_defaultProps = {
  open: false
};

/**
 * @prop open = false
 */
class Menu_Menu extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "simple-menu";
    this._mdcProps = ["open", "open-from-top-left", "open-from-top-right", "open-from-bottom-left", "open-from-bottom-right"];
    this._select = this._select.bind(this);
    this._cancel = this._cancel.bind(this);
  }
  componentDidMount() {
    this.MDComponent = new simple_MDCSimpleMenu(this.control);
    this.MDComponent.listen("MDCSimpleMenu:selected", this._select);
    this.MDComponent.listen("MDCSimpleMenu:cancel", this._cancel);
    toggleMenu(Menu_defaultProps, this.props, this.MDComponent);
  }
  componentWillUnmount() {
    this.MDComponent.unlisten("MDCSimpleMenu:selected", this._select);
    this.MDComponent.unlisten("MDCSimpleMenu:cancel", this._cancel);
    this.MDComponent.destroy && this.MDComponent.destroy();
  }
  _select() {
    if (this.props.onSelect) {
      this.props.onSelect();
    }
    this._menuClosed();
  }
  _cancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
    this._menuClosed();
  }
  _menuClosed() {
    if (this.props.onMenuClosed) {
      this.props.onMenuClosed();
    }
  }
  componentWillUpdate(nextProps) {
    toggleMenu(this.props, nextProps, this.MDComponent);
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "div",
      Menu__extends({ tabindex: "-1" }, props, { ref: control => this.control = control }),
      Object(preact_esm["h"])(
        "ul",
        {
          "class": "mdc-simple-menu__items mdc-list",
          role: "menu",
          "aria-hidden": "true"
        },
        props.children
      )
    );
  }
}

class MenuAnchor extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "menu-anchor";
  }
}

/*
 * Function to add declarative opening/closing to drawer
 */
function toggleMenu(oldprops, newprops, menu) {
  if ("open" in oldprops && "open" in newprops && oldprops.open !== newprops.open) {
    menu.open = newprops.open;
  }
}

Menu_Menu.Anchor = MenuAnchor;
Menu_Menu.Item = preact_material_components_List.Item;
/* harmony default export */ var preact_material_components_Menu = (Menu_Menu);
// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/tabs/tab/constants.js
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const tab_constants_cssClasses = {
  ACTIVE: 'mdc-tab--active',
};

const tab_constants_strings = {
  SELECTED_EVENT: 'MDCTab:selected',
};

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/tabs/tab/foundation.js
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




class foundation_MDCTabFoundation extends base_foundation["a" /* default */] {
  static get cssClasses() {
    return tab_constants_cssClasses;
  }

  static get strings() {
    return tab_constants_strings;
  }

  static get defaultAdapter() {
    return {
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      registerInteractionHandler: (/* type: string, handler: EventListener */) => {},
      deregisterInteractionHandler: (/* type: string, handler: EventListener */) => {},
      getOffsetWidth: () => /* number */ 0,
      getOffsetLeft: () => /* number */ 0,
      notifySelected: () => {},
    };
  }

  constructor(adapter = {}) {
    super(Object.assign(foundation_MDCTabFoundation.defaultAdapter, adapter));

    this.computedWidth_ = 0;
    this.computedLeft_ = 0;
    this.isActive_ = false;
    this.preventDefaultOnClick_ = false;

    this.clickHandler_ = (evt) => {
      if (this.preventDefaultOnClick_) {
        evt.preventDefault();
      }
      this.adapter_.notifySelected();
    };

    this.keydownHandler_ = (evt) => {
      if (evt.key && evt.key === 'Enter' || evt.keyCode === 13) {
        this.adapter_.notifySelected();
      }
    };
  }

  init() {
    this.adapter_.registerInteractionHandler('click', this.clickHandler_);
    this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
  }

  destroy() {
    this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
    this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
  }

  getComputedWidth() {
    return this.computedWidth_;
  }

  getComputedLeft() {
    return this.computedLeft_;
  }

  isActive() {
    return this.isActive_;
  }

  setActive(isActive) {
    this.isActive_ = isActive;
    if (this.isActive_) {
      this.adapter_.addClass(tab_constants_cssClasses.ACTIVE);
    } else {
      this.adapter_.removeClass(tab_constants_cssClasses.ACTIVE);
    }
  }

  preventsDefaultOnClick() {
    return this.preventDefaultOnClick_;
  }

  setPreventDefaultOnClick(preventDefaultOnClick) {
    this.preventDefaultOnClick_ = preventDefaultOnClick;
  }

  measureSelf() {
    this.computedWidth_ = this.adapter_.getOffsetWidth();
    this.computedLeft_ = this.adapter_.getOffsetLeft();
  }
}

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/tabs/tab/index.js
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */









class tab_MDCTab extends component["a" /* default */] {
  static attachTo(root) {
    return new tab_MDCTab(root);
  }

  get computedWidth() {
    return this.foundation_.getComputedWidth();
  }

  get computedLeft() {
    return this.foundation_.getComputedLeft();
  }

  get isActive() {
    return this.foundation_.isActive();
  }

  set isActive(isActive) {
    this.foundation_.setActive(isActive);
  }

  get preventDefaultOnClick() {
    return this.foundation_.preventsDefaultOnClick();
  }

  set preventDefaultOnClick(preventDefaultOnClick) {
    this.foundation_.setPreventDefaultOnClick(preventDefaultOnClick);
  }

  constructor(...args) {
    super(...args);

    this.ripple_ = ripple["a" /* MDCRipple */].attachTo(this.root_);
  }

  destroy() {
    this.ripple_.destroy();
    super.destroy();
  }

  getDefaultFoundation() {
    return new foundation_MDCTabFoundation({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      registerInteractionHandler: (type, handler) => this.root_.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => this.root_.removeEventListener(type, handler),
      getOffsetWidth: () => this.root_.offsetWidth,
      getOffsetLeft: () => this.root_.offsetLeft,
      notifySelected: () => this.emit(foundation_MDCTabFoundation.strings.SELECTED_EVENT, {tab: this}, true),
    });
  }

  initialSyncWithDOM() {
    this.isActive = this.root_.classList.contains(tab_constants_cssClasses.ACTIVE);
  }

  measureSelf() {
    this.foundation_.measureSelf();
  }
}

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/tabs/tab-bar/constants.js
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const tab_bar_constants_cssClasses = {
  UPGRADED: 'mdc-tab-bar-upgraded',
};

const tab_bar_constants_strings = {
  TAB_SELECTOR: '.mdc-tab',
  INDICATOR_SELECTOR: '.mdc-tab-bar__indicator',
  CHANGE_EVENT: 'MDCTabBar:change',
};

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/tabs/tab-bar/foundation.js
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






class foundation_MDCTabBarFoundation extends base_foundation["a" /* default */] {
  static get cssClasses() {
    return tab_bar_constants_cssClasses;
  }

  static get strings() {
    return tab_bar_constants_strings;
  }

  static get defaultAdapter() {
    return {
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      bindOnMDCTabSelectedEvent: () => {},
      unbindOnMDCTabSelectedEvent: () => {},
      registerResizeHandler: (/* handler: EventListener */) => {},
      deregisterResizeHandler: (/* handler: EventListener */) => {},
      getOffsetWidth: () => /* number */ 0,
      setStyleForIndicator: (/* propertyName: string, value: string */) => {},
      getOffsetWidthForIndicator: () => /* number */ 0,
      notifyChange: (/* evtData: {activeTabIndex: number} */) => {},
      getNumberOfTabs: () => /* number */ 0,
      isTabActiveAtIndex: (/* index: number */) => /* boolean */ false,
      setTabActiveAtIndex: (/* index: number, isActive: true */) => {},
      isDefaultPreventedOnClickForTabAtIndex: (/* index: number */) => /* boolean */ false,
      setPreventDefaultOnClickForTabAtIndex: (/* index: number, preventDefaultOnClick: boolean */) => {},
      measureTabAtIndex: (/* index: number */) => {},
      getComputedWidthForTabAtIndex: (/* index: number */) => /* number */ 0,
      getComputedLeftForTabAtIndex: (/* index: number */) => /* number */ 0,
    };
  }

  constructor(adapter) {
    super(Object.assign(foundation_MDCTabBarFoundation.defaultAdapter, adapter));

    this.isIndicatorShown_ = false;
    this.computedWidth_ = 0;
    this.computedLeft_ = 0;
    this.activeTabIndex_ = 0;
    this.layoutFrame_ = 0;
    this.resizeHandler_ = () => this.layout();
  }

  init() {
    this.adapter_.addClass(tab_bar_constants_cssClasses.UPGRADED);
    this.adapter_.bindOnMDCTabSelectedEvent();
    this.adapter_.registerResizeHandler(this.resizeHandler_);
    const activeTabIndex = this.findActiveTabIndex_();
    if (activeTabIndex >= 0) {
      this.activeTabIndex_ = activeTabIndex;
    }
    this.layout();
  }

  destroy() {
    this.adapter_.removeClass(tab_bar_constants_cssClasses.UPGRADED);
    this.adapter_.unbindOnMDCTabSelectedEvent();
    this.adapter_.deregisterResizeHandler(this.resizeHandler_);
  }

  layoutInternal_() {
    this.forEachTabIndex_((index) => this.adapter_.measureTabAtIndex(index));
    this.computedWidth_ = this.adapter_.getOffsetWidth();
    this.layoutIndicator_();
  }

  layoutIndicator_() {
    const isIndicatorFirstRender = !this.isIndicatorShown_;

    // Ensure that indicator appears in the right position immediately for correct first render.
    if (isIndicatorFirstRender) {
      this.adapter_.setStyleForIndicator('transition', 'none');
    }

    const translateAmtForActiveTabLeft = this.adapter_.getComputedLeftForTabAtIndex(this.activeTabIndex_);
    const scaleAmtForActiveTabWidth =
      this.adapter_.getComputedWidthForTabAtIndex(this.activeTabIndex_) / this.adapter_.getOffsetWidth();

    const transformValue = `translateX(${translateAmtForActiveTabLeft}px) scale(${scaleAmtForActiveTabWidth}, 1)`;
    this.adapter_.setStyleForIndicator(getCorrectPropertyName(window, 'transform'), transformValue);

    if (isIndicatorFirstRender) {
      // Force layout so that transform styles to take effect.
      this.adapter_.getOffsetWidthForIndicator();
      this.adapter_.setStyleForIndicator('transition', '');
      this.adapter_.setStyleForIndicator('visibility', 'visible');
      this.isIndicatorShown_ = true;
    }
  }

  findActiveTabIndex_() {
    let activeTabIndex = -1;
    this.forEachTabIndex_((index) => {
      if (this.adapter_.isTabActiveAtIndex(index)) {
        activeTabIndex = index;
        return true;
      }
    });
    return activeTabIndex;
  }

  forEachTabIndex_(iterator) {
    const numTabs = this.adapter_.getNumberOfTabs();
    for (let index = 0; index < numTabs; index++) {
      const shouldBreak = iterator(index);
      if (shouldBreak) {
        break;
      }
    }
  }

  layout() {
    if (this.layoutFrame_) {
      cancelAnimationFrame(this.layoutFrame_);
    }

    this.layoutFrame_ = requestAnimationFrame(() => {
      this.layoutInternal_();
      this.layoutFrame_ = 0;
    });
  }

  switchToTabAtIndex(index, shouldNotify) {
    if (index === this.activeTabIndex_) {
      return;
    }

    if (index < 0 || index >= this.adapter_.getNumberOfTabs()) {
      throw new Error(`Out of bounds index specified for tab: ${index}`);
    }

    const prevActiveTabIndex = this.activeTabIndex_;
    this.activeTabIndex_ = index;
    requestAnimationFrame(() => {
      if (prevActiveTabIndex >= 0) {
        this.adapter_.setTabActiveAtIndex(prevActiveTabIndex, false);
      }
      this.adapter_.setTabActiveAtIndex(this.activeTabIndex_, true);
      this.layoutIndicator_();
      if (shouldNotify) {
        this.adapter_.notifyChange({activeTabIndex: this.activeTabIndex_});
      }
    });
  }

  getActiveTabIndex() {
    return this.findActiveTabIndex_();
  }
}

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/tabs/tab-bar/index.js
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */








class tab_bar_MDCTabBar extends component["a" /* default */] {
  static attachTo(root) {
    return new tab_bar_MDCTabBar(root);
  }

  get tabs() {
    return this.tabs_;
  }

  get activeTab() {
    const activeIndex = this.foundation_.getActiveTabIndex();
    return this.tabs[activeIndex];
  }

  set activeTab(tab) {
    this.setActiveTab_(tab, false);
  }

  get activeTabIndex() {
    return this.foundation_.getActiveTabIndex();
  }

  set activeTabIndex(index) {
    this.setActiveTabIndex_(index, false);
  }

  initialize(tabFactory = (el) => new tab_MDCTab(el)) {
    this.indicator_ = this.root_.querySelector(foundation_MDCTabBarFoundation.strings.INDICATOR_SELECTOR);
    this.tabs_ = this.gatherTabs_(tabFactory);
    this.tabSelectedHandler_ = ({detail}) => {
      const {tab} = detail;
      this.setActiveTab_(tab, true);
    };
  }

  getDefaultFoundation() {
    return new foundation_MDCTabBarFoundation({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      bindOnMDCTabSelectedEvent: () => this.listen(
        foundation_MDCTabFoundation.strings.SELECTED_EVENT, this.tabSelectedHandler_),
      unbindOnMDCTabSelectedEvent: () => this.unlisten(
        foundation_MDCTabFoundation.strings.SELECTED_EVENT, this.tabSelectedHandler_),
      registerResizeHandler: (handler) => window.addEventListener('resize', handler),
      deregisterResizeHandler: (handler) => window.removeEventListener('resize', handler),
      getOffsetWidth: () => this.root_.offsetWidth,
      setStyleForIndicator: (propertyName, value) => this.indicator_.style.setProperty(propertyName, value),
      getOffsetWidthForIndicator: () => this.indicator_.offsetWidth,
      notifyChange: (evtData) => this.emit(foundation_MDCTabBarFoundation.strings.CHANGE_EVENT, evtData),
      getNumberOfTabs: () => this.tabs.length,
      isTabActiveAtIndex: (index) => this.tabs[index].isActive,
      setTabActiveAtIndex: (index, isActive) => {
        this.tabs[index].isActive = isActive;
      },
      isDefaultPreventedOnClickForTabAtIndex: (index) => this.tabs[index].preventDefaultOnClick,
      setPreventDefaultOnClickForTabAtIndex: (index, preventDefaultOnClick) => {
        this.tabs[index].preventDefaultOnClick = preventDefaultOnClick;
      },
      measureTabAtIndex: (index) => this.tabs[index].measureSelf(),
      getComputedWidthForTabAtIndex: (index) => this.tabs[index].computedWidth,
      getComputedLeftForTabAtIndex: (index) => this.tabs[index].computedLeft,
    });
  }

  gatherTabs_(tabFactory) {
    const tabElements = [].slice.call(this.root_.querySelectorAll(foundation_MDCTabBarFoundation.strings.TAB_SELECTOR));
    return tabElements.map((el) => tabFactory(el));
  }

  setActiveTabIndex_(activeTabIndex, notifyChange) {
    this.foundation_.switchToTabAtIndex(activeTabIndex, notifyChange);
  }

  layout() {
    this.foundation_.layout();
  }

  setActiveTab_(activeTab, notifyChange) {
    const indexOfTab = this.tabs.indexOf(activeTab);
    if (indexOfTab < 0) {
      throw new Error('Invalid tab component given as activeTab: Tab not found within this component\'s tab list');
    }
    this.setActiveTabIndex_(indexOfTab, notifyChange);
  }
}

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/tabs/tab-bar-scroller/constants.js
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const tab_bar_scroller_constants_cssClasses = {
  INDICATOR_FORWARD: 'mdc-tab-bar-scroller__indicator--forward',
  INDICATOR_BACK: 'mdc-tab-bar-scroller__indicator--back',
  INDICATOR_ENABLED: 'mdc-tab-bar-scroller__indicator--enabled',
  TAB: 'mdc-tab',
};

const tab_bar_scroller_constants_strings = {
  FRAME_SELECTOR: '.mdc-tab-bar-scroller__scroll-frame',
  TABS_SELECTOR: '.mdc-tab-bar-scroller__scroll-frame__tabs',
  TAB_SELECTOR: '.mdc-tab',
  INDICATOR_FORWARD_SELECTOR: '.mdc-tab-bar-scroller__indicator--forward',
  INDICATOR_BACK_SELECTOR: '.mdc-tab-bar-scroller__indicator--back',
};

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/tabs/tab-bar-scroller/foundation.js
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






class foundation_MDCTabBarScrollerFoundation extends base_foundation["a" /* default */] {
  static get cssClasses() {
    return tab_bar_scroller_constants_cssClasses;
  }

  static get strings() {
    return tab_bar_scroller_constants_strings;
  }

  static get defaultAdapter() {
    return {
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      eventTargetHasClass: (/* target: EventTarget, className: string */) => /* boolean */ false,
      addClassToForwardIndicator: (/* className: string */) => {},
      removeClassFromForwardIndicator: (/* className: string */) => {},
      addClassToBackIndicator: (/* className: string */) => {},
      removeClassFromBackIndicator: (/* className: string */) => {},
      isRTL: () => /* boolean */ false,
      registerBackIndicatorClickHandler: (/* handler: EventListener */) => {},
      deregisterBackIndicatorClickHandler: (/* handler: EventListener */) => {},
      registerForwardIndicatorClickHandler: (/* handler: EventListener */) => {},
      deregisterForwardIndicatorClickHandler: (/* handler: EventListener */) => {},
      registerCapturedInteractionHandler: (/* evt: string, handler: EventListener */) => {},
      deregisterCapturedInteractionHandler: (/* evt: string, handler: EventListener */) => {},
      registerWindowResizeHandler: (/* handler: EventListener */) => {},
      deregisterWindowResizeHandler: (/* handler: EventListener */) => {},
      getNumberOfTabs: () => /* number */ 0,
      getComputedWidthForTabAtIndex: () => /* number */ 0,
      getComputedLeftForTabAtIndex: () => /* number */ 0,
      getOffsetWidthForScrollFrame: () => /* number */ 0,
      getScrollLeftForScrollFrame: () => /* number */ 0,
      setScrollLeftForScrollFrame: (/* scrollLeftAmount: number */) => {},
      getOffsetWidthForTabBar: () => /* number */ 0,
      setTransformStyleForTabBar: (/* value: string */) => {},
      getOffsetLeftForEventTarget: (/* target: EventTarget */) => /* number */ 0,
      getOffsetWidthForEventTarget: (/* target: EventTarget */) => /* number */ 0,
    };
  }

  constructor(adapter) {
    super(Object.assign(foundation_MDCTabBarScrollerFoundation.defaultAdapter, adapter));

    this.pointerDownRecognized_ = false;
    this.currentTranslateOffset_ = 0;
    this.focusedTarget_ = null;
    this.layoutFrame_ = 0;
    this.scrollFrameScrollLeft_ = 0;
    this.forwardIndicatorClickHandler_ = (evt) => this.scrollForward(evt);
    this.backIndicatorClickHandler_ = (evt) => this.scrollBack(evt);
    this.resizeHandler_ = () => this.layout();
    this.interactionHandler_ = (evt) => {
      if (evt.type == 'touchstart' || evt.type == 'mousedown') {
        this.pointerDownRecognized_ = true;
      }
      this.handlePossibleTabKeyboardFocus_(evt);

      if (evt.type == 'focus') {
        this.pointerDownRecognized_ = false;
      }
    };
  }

  init() {
    this.adapter_.registerBackIndicatorClickHandler(this.backIndicatorClickHandler_);
    this.adapter_.registerForwardIndicatorClickHandler(this.forwardIndicatorClickHandler_);
    this.adapter_.registerWindowResizeHandler(this.resizeHandler_);
    ['touchstart', 'mousedown', 'focus'].forEach((evtType) => {
      this.adapter_.registerCapturedInteractionHandler(evtType, this.interactionHandler_);
    });
    this.layout();
  }

  destroy() {
    this.adapter_.deregisterBackIndicatorClickHandler(this.backIndicatorClickHandler_);
    this.adapter_.deregisterForwardIndicatorClickHandler(this.forwardIndicatorClickHandler_);
    this.adapter_.deregisterWindowResizeHandler(this.resizeHandler_);
    ['touchstart', 'mousedown', 'focus'].forEach((evtType) => {
      this.adapter_.deregisterCapturedInteractionHandler(evtType, this.interactionHandler_);
    });
  }

  scrollBack(evt = null) {
    if (evt) {
      evt.preventDefault();
    }

    let tabWidthAccumulator = 0;
    let scrollTargetIndex = 0;

    for (let i = this.adapter_.getNumberOfTabs() - 1; i > 0; i--) {
      const tabOffsetLeft = this.adapter_.getComputedLeftForTabAtIndex(i);
      const tabBarWidthLessTabOffsetLeft = this.adapter_.getOffsetWidthForTabBar() - tabOffsetLeft;

      let tabIsNotOccluded = tabOffsetLeft > this.currentTranslateOffset_;
      if (this.isRTL_()) {
        tabIsNotOccluded = tabBarWidthLessTabOffsetLeft > this.currentTranslateOffset_;
      }

      if (tabIsNotOccluded) {
        continue;
      }

      tabWidthAccumulator += this.adapter_.getComputedWidthForTabAtIndex(i);

      const scrollTargetDetermined = tabWidthAccumulator > this.adapter_.getOffsetWidthForScrollFrame();
      if (scrollTargetDetermined) {
        scrollTargetIndex = this.isRTL_() ? i + 1 : i;
        break;
      }
    }

    this.scrollToTabAtIndex(scrollTargetIndex);
  }

  scrollForward(evt = null) {
    if (evt) {
      evt.preventDefault();
    }

    const scrollFrameOffsetWidth = this.adapter_.getOffsetWidthForScrollFrame() + this.currentTranslateOffset_;
    let scrollTargetIndex = 0;

    for (let i = 0; i < this.adapter_.getNumberOfTabs(); i++) {
      const tabOffsetLeftAndWidth =
        this.adapter_.getComputedLeftForTabAtIndex(i) + this.adapter_.getComputedWidthForTabAtIndex(i);
      let scrollTargetDetermined = tabOffsetLeftAndWidth > scrollFrameOffsetWidth;

      if (this.isRTL_()) {
        const frameOffsetAndTabWidth =
          scrollFrameOffsetWidth - this.adapter_.getComputedWidthForTabAtIndex(i);
        const tabOffsetLeftAndWidth =
          this.adapter_.getComputedLeftForTabAtIndex(i) + this.adapter_.getComputedWidthForTabAtIndex(i);
        const tabRightOffset =
          this.adapter_.getOffsetWidthForTabBar() - tabOffsetLeftAndWidth;

        scrollTargetDetermined = tabRightOffset > frameOffsetAndTabWidth;
      }

      if (scrollTargetDetermined) {
        scrollTargetIndex = i;
        break;
      }
    }

    this.scrollToTabAtIndex(scrollTargetIndex);
  }

  layout() {
    cancelAnimationFrame(this.layoutFrame_);
    this.scrollFrameScrollLeft_ = this.adapter_.getScrollLeftForScrollFrame();
    this.layoutFrame_ = requestAnimationFrame(() => this.layout_());
  }

  isRTL_() {
    return this.adapter_.isRTL();
  }

  handlePossibleTabKeyboardFocus_(evt) {
    if (!this.adapter_.eventTargetHasClass(evt.target, tab_bar_scroller_constants_cssClasses.TAB) || this.pointerDownRecognized_) {
      return;
    }

    const resetAmt = this.isRTL_() ? this.scrollFrameScrollLeft_ : 0;
    this.adapter_.setScrollLeftForScrollFrame(resetAmt);

    this.focusedTarget_ = evt.target;
    const scrollFrameWidth = this.adapter_.getOffsetWidthForScrollFrame();
    const tabBarWidth = this.adapter_.getOffsetWidthForTabBar();
    const leftEdge = this.adapter_.getOffsetLeftForEventTarget(this.focusedTarget_);
    const rightEdge = leftEdge + this.adapter_.getOffsetWidthForEventTarget(this.focusedTarget_);

    let shouldScrollBack = rightEdge <= this.currentTranslateOffset_;
    let shouldScrollForward = rightEdge > this.currentTranslateOffset_ + scrollFrameWidth;

    if (this.isRTL_()) {
      const normalizedLeftOffset = tabBarWidth - leftEdge;
      shouldScrollBack = leftEdge >= tabBarWidth - this.currentTranslateOffset_;
      shouldScrollForward = normalizedLeftOffset > scrollFrameWidth + this.currentTranslateOffset_;
    }

    if (shouldScrollForward) {
      this.scrollForward();
    } else if (shouldScrollBack) {
      this.scrollBack();
    }

    this.pointerDownRecognized_ = false;
  }

  layout_() {
    const frameWidth = this.adapter_.getOffsetWidthForScrollFrame();
    const isOverflowing = this.adapter_.getOffsetWidthForTabBar() > frameWidth;

    if (!isOverflowing) {
      this.currentTranslateOffset_ = 0;
    }

    this.shiftFrame_();
    this.updateIndicatorEnabledStates_();
  }

  scrollToTabAtIndex(index) {
    const scrollTargetOffsetLeft = this.adapter_.getComputedLeftForTabAtIndex(index);
    const scrollTargetOffsetWidth = this.adapter_.getComputedWidthForTabAtIndex(index);

    this.currentTranslateOffset_ =
      this.normalizeForRTL_(scrollTargetOffsetLeft, scrollTargetOffsetWidth);

    requestAnimationFrame(() => this.shiftFrame_());
  }

  normalizeForRTL_(left, width) {
    return this.isRTL_() ? this.adapter_.getOffsetWidthForTabBar() - (left + width) : left;
  }

  shiftFrame_() {
    const shiftAmount = this.isRTL_() ?
      this.currentTranslateOffset_ : -this.currentTranslateOffset_;

    this.adapter_.setTransformStyleForTabBar(`translateX(${shiftAmount}px)`);
    this.updateIndicatorEnabledStates_();
  }

  updateIndicatorEnabledStates_() {
    const {INDICATOR_ENABLED} = tab_bar_scroller_constants_cssClasses;
    if (this.currentTranslateOffset_ === 0) {
      this.adapter_.removeClassFromBackIndicator(INDICATOR_ENABLED);
    } else {
      this.adapter_.addClassToBackIndicator(INDICATOR_ENABLED);
    }

    const remainingTabBarWidth = this.adapter_.getOffsetWidthForTabBar() - this.currentTranslateOffset_;
    if (remainingTabBarWidth > this.adapter_.getOffsetWidthForScrollFrame()) {
      this.adapter_.addClassToForwardIndicator(INDICATOR_ENABLED);
    } else {
      this.adapter_.removeClassFromForwardIndicator(INDICATOR_ENABLED);
    }
  }
}

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/tabs/tab-bar-scroller/index.js
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */









class tab_bar_scroller_MDCTabBarScroller extends component["a" /* default */] {
  static attachTo(root) {
    return new tab_bar_scroller_MDCTabBarScroller(root);
  }

  get tabBar() {
    return this.tabBar_;
  }

  initialize(tabBarFactory = (root) => new tab_bar_MDCTabBar(root)) {
    this.scrollFrame_ = this.root_.querySelector(foundation_MDCTabBarScrollerFoundation.strings.FRAME_SELECTOR);
    this.tabBarEl_ = this.root_.querySelector(foundation_MDCTabBarScrollerFoundation.strings.TABS_SELECTOR);
    this.forwardIndicator_ = this.root_.querySelector(foundation_MDCTabBarScrollerFoundation.strings.INDICATOR_FORWARD_SELECTOR);
    this.backIndicator_ = this.root_.querySelector(foundation_MDCTabBarScrollerFoundation.strings.INDICATOR_BACK_SELECTOR);
    this.tabBar_ = tabBarFactory(this.tabBarEl_);
  }

  getDefaultFoundation() {
    return new foundation_MDCTabBarScrollerFoundation({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      eventTargetHasClass: (target, className) => target.classList.contains(className),
      addClassToForwardIndicator: (className) => this.forwardIndicator_.classList.add(className),
      removeClassFromForwardIndicator: (className) => this.forwardIndicator_.classList.remove(className),
      addClassToBackIndicator: (className) => this.backIndicator_.classList.add(className),
      removeClassFromBackIndicator: (className) => this.backIndicator_.classList.remove(className),
      isRTL: () =>
        getComputedStyle(this.root_).getPropertyValue('direction') === 'rtl',
      registerBackIndicatorClickHandler: (handler) =>
        this.backIndicator_.addEventListener('click', handler),
      deregisterBackIndicatorClickHandler: (handler) =>
        this.backIndicator_.removeEventListener('click', handler),
      registerForwardIndicatorClickHandler: (handler) =>
        this.forwardIndicator_.addEventListener('click', handler),
      deregisterForwardIndicatorClickHandler: (handler) =>
        this.forwardIndicator_.removeEventListener('click', handler),
      registerCapturedInteractionHandler: (evt, handler) =>
        this.root_.addEventListener(evt, handler, true),
      deregisterCapturedInteractionHandler: (evt, handler) =>
        this.root_.removeEventListener(evt, handler, true),
      registerWindowResizeHandler: (handler) =>
        window.addEventListener('resize', handler),
      deregisterWindowResizeHandler: (handler) =>
        window.removeEventListener('resize', handler),
      getNumberOfTabs: () => this.tabBar.tabs.length,
      getComputedWidthForTabAtIndex: (index) => this.tabBar.tabs[index].computedWidth,
      getComputedLeftForTabAtIndex: (index) => this.tabBar.tabs[index].computedLeft,
      getOffsetWidthForScrollFrame: () => this.scrollFrame_.offsetWidth,
      getScrollLeftForScrollFrame: () => this.scrollFrame_.scrollLeft,
      setScrollLeftForScrollFrame: (scrollLeftAmount) => this.scrollFrame_.scrollLeft = scrollLeftAmount,
      getOffsetWidthForTabBar: () => this.tabBarEl_.offsetWidth,
      setTransformStyleForTabBar: (value) => {
        this.tabBarEl_.style.setProperty(getCorrectPropertyName(window, 'transform'), value);
      },
      getOffsetLeftForEventTarget: (target) => target.offsetLeft,
      getOffsetWidthForEventTarget: (target) => target.offsetWidth,
    });
  }

  layout() {
    this.foundation_.layout();
  }
}

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/tabs/index.js
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





// CONCATENATED MODULE: ./node_modules/preact-material-components/Tabs/index.js
var Tabs__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function Tabs__objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }





/**
 * @prop indicator-accent = false
 * @prop icon-tab-bar = false
 * @prop icons-with-text = false
 * @prop scroller = false
 */
class Tabs_Tabs extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "tab-bar";
    this._mdcProps = ["indicator-accent", "icon-tab-bar", "icons-with-text", "scroller"];
  }
  componentDidMount() {
    this.MDComponent = new tab_bar_MDCTabBar(this.control);
  }
  componentWillUnmount() {
    this.MDComponent.destroy && this.MDComponent.destroy();
  }
  materialDom(allprops) {
    let { className } = allprops,
        props = Tabs__objectWithoutProperties(allprops, ["className"]);
    if (props.scroller) {
      className = "mdc-tab-bar-scroller__scroll-frame__tabs";
    } else {
      className = "";
    }
    return Object(preact_esm["h"])(
      "nav",
      Tabs__extends({
        className: className,
        role: "tablist"
      }, props, {
        ref: control => this.control = control
      }),
      props.children,
      Object(preact_esm["h"])("span", { "class": "mdc-tab-bar__indicator" })
    );
  }
}

class Tabs_TabBarScroller extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "tab-bar-scroller";
  }
  componentDidMount() {
    this.MDComponent = new tab_bar_scroller_MDCTabBarScroller(this.control);
  }
  componentWillUnmount() {
    this.MDComponent.destroy && this.MDComponent.destroy();
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "div",
      Tabs__extends({}, props, { ref: control => this.control = control }),
      Object(preact_esm["h"])(
        "div",
        { className: "mdc-tab-bar-scroller__indicator mdc-tab-bar-scroller__indicator--back" },
        Object(preact_esm["h"])(
          "a",
          {
            className: "mdc-tab-bar-scroller__indicator__inner material-icons",
            href: "#",
            "aria-label": "scroll back button"
          },
          "navigate_before"
        )
      ),
      Object(preact_esm["h"])(
        "div",
        { className: "mdc-tab-bar-scroller__scroll-frame" },
        props.children
      ),
      Object(preact_esm["h"])(
        "div",
        { className: "mdc-tab-bar-scroller__indicator mdc-tab-bar-scroller__indicator--forward" },
        Object(preact_esm["h"])(
          "a",
          {
            className: "mdc-tab-bar-scroller__indicator__inner material-icons",
            href: "#",
            "aria-label": "scroll forward button"
          },
          "navigate_next"
        )
      )
    );
  }
}

/**
 * @prop active = false
 */
class Tabs_Tab extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "tab";
    this._mdcProps = ["active"];
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "a",
      Tabs__extends({ role: "tab" }, props, { ref: control => this.control = control }),
      props.children
    );
  }
}

class Tabs_TabIconLabel extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "tab__icon-text";
  }
  materialDom(props) {
    return Object(preact_esm["h"])(
      "span",
      Tabs__extends({}, props, { ref: control => this.control = control }),
      props.children
    );
  }
}

Tabs_Tabs.TabBarScroller = Tabs_TabBarScroller;
Tabs_Tabs.Tab = Tabs_Tab;
Tabs_Tabs.TabIconLabel = Tabs_TabIconLabel;
/* harmony default export */ var preact_material_components_Tabs = (Tabs_Tabs);
// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/slider/constants.js
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const slider_constants_cssClasses = {
  ACTIVE: 'mdc-slider--active',
  DISABLED: 'mdc-slider--disabled',
  DISCRETE: 'mdc-slider--discrete',
  FOCUS: 'mdc-slider--focus',
  IN_TRANSIT: 'mdc-slider--in-transit',
  IS_DISCRETE: 'mdc-slider--discrete',
  HAS_TRACK_MARKER: 'mdc-slider--display-markers',
};

const slider_constants_strings = {
  TRACK_SELECTOR: '.mdc-slider__track',
  TRACK_MARKER_CONTAINER_SELECTOR: '.mdc-slider__track-marker-container',
  LAST_TRACK_MARKER_SELECTOR: '.mdc-slider__track-marker:last-child',
  THUMB_CONTAINER_SELECTOR: '.mdc-slider__thumb-container',
  PIN_VALUE_MARKER_SELECTOR: '.mdc-slider__pin-value-marker',
  ARIA_VALUEMIN: 'aria-valuemin',
  ARIA_VALUEMAX: 'aria-valuemax',
  ARIA_VALUENOW: 'aria-valuenow',
  ARIA_DISABLED: 'aria-disabled',
  STEP_DATA_ATTR: 'data-step',
  CHANGE_EVENT: 'MDCSlider:change',
  INPUT_EVENT: 'MDCSlider:input',
};

const slider_constants_numbers = {
  PAGE_FACTOR: 4,
};

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/slider/foundation.js
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 *you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






const KEY_IDS = {
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
};

// Events that can constitute the user releasing drag on a slider
const UP_EVENTS = ['mouseup', 'pointerup', 'touchend'];

class foundation_MDCSliderFoundation extends base_foundation["a" /* default */] {
  static get cssClasses() {
    return slider_constants_cssClasses;
  }

  static get strings() {
    return slider_constants_strings;
  }

  static get numbers() {
    return slider_constants_numbers;
  }

  static get defaultAdapter() {
    return {
      hasClass: (/* className: string */) => /* boolean */ false,
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      getAttribute: (/* name: string */) => /* string|null */ null,
      setAttribute: (/* name: string, value: string */) => {},
      removeAttribute: (/* name: string */) => {},
      computeBoundingRect: () => /* ClientRect */ ({
        top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0,
      }),
      getTabIndex: () => /* number */ 0,
      registerInteractionHandler: (/* type: string, handler: EventListener */) => {},
      deregisterInteractionHandler: (/* type: string, handler: EventListener */) => {},
      registerThumbContainerInteractionHandler: (/* type: string, handler: EventListener */) => {},
      deregisterThumbContainerInteractionHandler: (/* type: string, handler: EventListener */) => {},
      registerBodyInteractionHandler: (/* type: string, handler: EventListener */) => {},
      deregisterBodyInteractionHandler: (/* type: string, handler: EventListener */) => {},
      registerResizeHandler: (/* handler: EventListener */) => {},
      deregisterResizeHandler: (/* handler: EventListener */) => {},
      notifyInput: () => {},
      notifyChange: () => {},
      setThumbContainerStyleProperty: (/* propertyName: string, value: string */) => {},
      setTrackStyleProperty: (/* propertyName: string, value: string */) => {},
      setMarkerValue: (/* value: number */) => {},
      appendTrackMarkers: (/* numMarkers: number */) => {},
      removeTrackMarkers: () => {},
      setLastTrackMarkersStyleProperty: (/* propertyName: string, value: string */) => {},
      isRTL: () => /* boolean */ false,
    };
  }

  constructor(adapter = {}) {
    super(Object.assign(foundation_MDCSliderFoundation.defaultAdapter, adapter));
    this.rect_ = null;
    // We set this to NaN since we want it to be a number, but we can't use '0' or '-1'
    // because those could be valid tabindices set by the client code.
    this.savedTabIndex_ = NaN;
    this.active_ = false;
    this.inTransit_ = false;
    this.isDiscrete_ = false;
    this.hasTrackMarker_ = false;
    this.handlingThumbTargetEvt_ = false;
    this.min_ = 0;
    this.max_ = 100;
    this.step_ = 0;
    this.value_ = 0;
    this.disabled_ = false;
    this.preventFocusState_ = false;
    this.updateUIFrame_ = 0;
    this.thumbContainerPointerHandler_ = () => {
      this.handlingThumbTargetEvt_ = true;
    };
    this.mousedownHandler_ = this.createDownHandler_('mousemove');
    this.pointerdownHandler_ = this.createDownHandler_('pointermove');
    this.touchstartHandler_ = this.createDownHandler_(
      'touchmove', ({targetTouches}) => targetTouches[0].pageX);
    this.keydownHandler_ = (evt) => this.handleKeydown_(evt);
    this.focusHandler_ = () => this.handleFocus_();
    this.blurHandler_ = () => this.handleBlur_();
    this.resizeHandler_ = () => this.layout();
  }

  init() {
    this.isDiscrete_ = this.adapter_.hasClass(slider_constants_cssClasses.IS_DISCRETE);
    this.hasTrackMarker_ = this.adapter_.hasClass(slider_constants_cssClasses.HAS_TRACK_MARKER);
    this.adapter_.registerInteractionHandler('mousedown', this.mousedownHandler_);
    this.adapter_.registerInteractionHandler('pointerdown', this.pointerdownHandler_);
    this.adapter_.registerInteractionHandler('touchstart', this.touchstartHandler_);
    this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
    this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
    this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
    ['mousedown', 'pointerdown', 'touchstart'].forEach((evtName) => {
      this.adapter_.registerThumbContainerInteractionHandler(evtName, this.thumbContainerPointerHandler_);
    });
    this.adapter_.registerResizeHandler(this.resizeHandler_);
    this.layout();
    // At last step, provide a reasonable default value to discrete slider
    if (this.isDiscrete_ && this.getStep() == 0) {
      this.step_ = 1;
    }
  }

  destroy() {
    this.adapter_.deregisterInteractionHandler('mousedown', this.mousedownHandler_);
    this.adapter_.deregisterInteractionHandler('pointerdown', this.pointerdownHandler_);
    this.adapter_.deregisterInteractionHandler('touchstart', this.touchstartHandler_);
    this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
    this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
    this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);
    ['mousedown', 'pointerdown', 'touchstart'].forEach((evtName) => {
      this.adapter_.deregisterThumbContainerInteractionHandler(evtName, this.thumbContainerPointerHandler_);
    });
    this.adapter_.deregisterResizeHandler(this.resizeHandler_);
  }

  setupTrackMarker() {
    if (this.isDiscrete_ && this.hasTrackMarker_&& this.getStep() != 0) {
      const min = this.getMin();
      const max = this.getMax();
      const step = this.getStep();
      let numMarkers = (max - min) / step;

      // In case distance between max & min is indivisible to step,
      // we place the secondary to last marker proportionally at where thumb
      // could reach and place the last marker at max value
      const indivisible = Math.ceil(numMarkers) !== numMarkers;
      if (indivisible) {
        numMarkers = Math.ceil(numMarkers);
      }

      this.adapter_.removeTrackMarkers();
      this.adapter_.appendTrackMarkers(numMarkers);

      if (indivisible) {
        const lastStepRatio = (max - numMarkers * step) / step + 1;
        const flex = getCorrectPropertyName(window, 'flex');
        this.adapter_.setLastTrackMarkersStyleProperty(flex, lastStepRatio);
      }
    }
  }

  layout() {
    this.rect_ = this.adapter_.computeBoundingRect();
    this.updateUIForCurrentValue_();
  }

  getValue() {
    return this.value_;
  }

  setValue(value) {
    this.setValue_(value, false);
  }

  getMax() {
    return this.max_;
  }

  setMax(max) {
    if (max < this.min_) {
      throw new Error('Cannot set max to be less than the slider\'s minimum value');
    }
    this.max_ = max;
    this.setValue_(this.value_, false, true);
    this.adapter_.setAttribute(slider_constants_strings.ARIA_VALUEMAX, String(this.max_));
    this.setupTrackMarker();
  }

  getMin() {
    return this.min_;
  }

  setMin(min) {
    if (min > this.max_) {
      throw new Error('Cannot set min to be greater than the slider\'s maximum value');
    }
    this.min_ = min;
    this.setValue_(this.value_, false, true);
    this.adapter_.setAttribute(slider_constants_strings.ARIA_VALUEMIN, String(this.min_));
    this.setupTrackMarker();
  }

  getStep() {
    return this.step_;
  }

  setStep(step) {
    if (step < 0) {
      throw new Error('Step cannot be set to a negative number');
    }
    if (this.isDiscrete_ && (typeof(step) !== 'number' || step < 1)) {
      step = 1;
    }
    this.step_ = step;
    this.setValue_(this.value_, false, true);
    this.setupTrackMarker();
  }

  isDisabled() {
    return this.disabled_;
  }

  setDisabled(disabled) {
    this.disabled_ = disabled;
    this.toggleClass_(slider_constants_cssClasses.DISABLED, this.disabled_);
    if (this.disabled_) {
      this.savedTabIndex_ = this.adapter_.getTabIndex();
      this.adapter_.setAttribute(slider_constants_strings.ARIA_DISABLED, 'true');
      this.adapter_.removeAttribute('tabindex');
    } else {
      this.adapter_.removeAttribute(slider_constants_strings.ARIA_DISABLED);
      if (!isNaN(this.savedTabIndex_)) {
        this.adapter_.setAttribute('tabindex', String(this.savedTabIndex_));
      }
    }
  }

  createDownHandler_(moveEvt, getPageX = ({pageX}) => pageX) {
    const moveHandler = (evt) => {
      evt.preventDefault();
      this.setValueFromEvt_(evt, getPageX);
    };

    // Note: upHandler is [de]registered on ALL potential pointer-related release event types, since some browsers
    // do not always fire these consistently in pairs.
    // (See https://github.com/material-components/material-components-web/issues/1192)
    const upHandler = () => {
      this.setActive_(false);
      this.adapter_.deregisterBodyInteractionHandler(moveEvt, moveHandler);
      UP_EVENTS.forEach((type) => this.adapter_.deregisterBodyInteractionHandler(type, upHandler));
      this.adapter_.notifyChange();
    };

    const downHandler = (evt) => {
      if (this.disabled_) {
        return;
      }

      this.preventFocusState_ = true;
      this.setInTransit_(!this.handlingThumbTargetEvt_);
      this.handlingThumbTargetEvt_ = false;

      this.setActive_(true);

      this.adapter_.registerBodyInteractionHandler(moveEvt, moveHandler);
      UP_EVENTS.forEach((type) => this.adapter_.registerBodyInteractionHandler(type, upHandler));
      this.setValueFromEvt_(evt, getPageX);
    };

    return downHandler;
  }

  setValueFromEvt_(evt, getPageX) {
    const pageX = getPageX(evt);
    const value = this.computeValueFromPageX_(pageX);
    this.setValue_(value, true);
  }

  computeValueFromPageX_(pageX) {
    const {max_: max, min_: min} = this;
    const xPos = pageX - this.rect_.left;
    let pctComplete = xPos / this.rect_.width;
    if (this.adapter_.isRTL()) {
      pctComplete = 1 - pctComplete;
    }
    // Fit the percentage complete between the range [min,max]
    // by remapping from [0, 1] to [min, min+(max-min)].
    return min + pctComplete * (max - min);
  }

  handleKeydown_(evt) {
    const keyId = this.getKeyId_(evt);
    const value = this.getValueForKeyId_(keyId);
    if (isNaN(value)) {
      return;
    }

    // Prevent page from scrolling due to key presses that would normally scroll the page
    evt.preventDefault();
    this.adapter_.addClass(slider_constants_cssClasses.FOCUS);
    this.setValue_(value, true);
    this.adapter_.notifyChange();
  }

  getKeyId_(kbdEvt) {
    switch (kbdEvt.key || kbdEvt.keyCode) {
    case KEY_IDS.ARROW_LEFT:
    case 37:
      return KEY_IDS.ARROW_LEFT;
    case KEY_IDS.ARROW_RIGHT:
    case 39:
      return KEY_IDS.ARROW_RIGHT;
    case KEY_IDS.ARROW_UP:
    case 38:
      return KEY_IDS.ARROW_UP;
    case KEY_IDS.ARROW_DOWN:
    case 40:
      return KEY_IDS.ARROW_DOWN;
    case KEY_IDS.HOME:
    case 36:
      return KEY_IDS.HOME;
    case KEY_IDS.END:
    case 35:
      return KEY_IDS.END;
    case KEY_IDS.PAGE_UP:
    case 33:
      return KEY_IDS.PAGE_UP;
    case KEY_IDS.PAGE_DOWN:
    case 34:
      return KEY_IDS.PAGE_DOWN;
    default:
      // Doesn't matter
      return '';
    }
  }

  getValueForKeyId_(keyId) {
    const {max_: max, min_: min, step_: step} = this;
    let delta = step || (max - min) / 100;
    const valueNeedsToBeFlipped = this.adapter_.isRTL() && (
      keyId === KEY_IDS.ARROW_LEFT || keyId === KEY_IDS.ARROW_RIGHT
    );
    if (valueNeedsToBeFlipped) {
      delta = -delta;
    }

    switch (keyId) {
    case KEY_IDS.ARROW_LEFT:
    case KEY_IDS.ARROW_DOWN:
      return this.value_ - delta;
    case KEY_IDS.ARROW_RIGHT:
    case KEY_IDS.ARROW_UP:
      return this.value_ + delta;
    case KEY_IDS.HOME:
      return this.min_;
    case KEY_IDS.END:
      return this.max_;
    case KEY_IDS.PAGE_UP:
      return this.value_ + delta * slider_constants_numbers.PAGE_FACTOR;
    case KEY_IDS.PAGE_DOWN:
      return this.value_ - delta * slider_constants_numbers.PAGE_FACTOR;
    default:
      return NaN;
    }
  }

  handleFocus_() {
    if (this.preventFocusState_) {
      return;
    }
    this.adapter_.addClass(slider_constants_cssClasses.FOCUS);
  }

  handleBlur_() {
    this.preventFocusState_ = false;
    this.adapter_.removeClass(slider_constants_cssClasses.FOCUS);
  }

  setValue_(value, shouldFireInput, force = false) {
    if (value === this.value_ && !force) {
      return;
    }

    const {min_: min, max_: max} = this;
    const valueSetToBoundary = value === min || value === max;
    if (this.step_ && !valueSetToBoundary) {
      value = this.quantize_(value);
    }
    if (value < min) {
      value = min;
    } else if (value > max) {
      value = max;
    }
    this.value_ = value;
    this.adapter_.setAttribute(slider_constants_strings.ARIA_VALUENOW, String(this.value_));
    this.updateUIForCurrentValue_();

    if (shouldFireInput) {
      this.adapter_.notifyInput();
      if (this.isDiscrete_) {
        this.adapter_.setMarkerValue(value);
      }
    }
  }

  quantize_(value) {
    const numSteps = Math.round(value / this.step_);
    const quantizedVal = numSteps * this.step_;
    return quantizedVal;
  }

  updateUIForCurrentValue_() {
    const {max_: max, min_: min, value_: value} = this;
    const pctComplete = (value - min) / (max - min);
    let translatePx = pctComplete * this.rect_.width;
    if (this.adapter_.isRTL()) {
      translatePx = this.rect_.width - translatePx;
    }

    const transformProp = getCorrectPropertyName(window, 'transform');
    const transitionendEvtName = getCorrectEventName(window, 'transitionend');

    if (this.inTransit_) {
      const onTransitionEnd = () => {
        this.setInTransit_(false);
        this.adapter_.deregisterThumbContainerInteractionHandler(transitionendEvtName, onTransitionEnd);
      };
      this.adapter_.registerThumbContainerInteractionHandler(transitionendEvtName, onTransitionEnd);
    }

    this.updateUIFrame_ = requestAnimationFrame(() => {
      // NOTE(traviskaufman): It would be nice to use calc() here,
      // but IE cannot handle calcs in transforms correctly.
      // See: https://goo.gl/NC2itk
      // Also note that the -50% offset is used to center the slider thumb.
      this.adapter_.setThumbContainerStyleProperty(transformProp, `translateX(${translatePx}px) translateX(-50%)`);
      this.adapter_.setTrackStyleProperty(transformProp, `scaleX(${pctComplete})`);
    });
  }

  setActive_(active) {
    this.active_ = active;
    this.toggleClass_(slider_constants_cssClasses.ACTIVE, this.active_);
  }

  setInTransit_(inTransit) {
    this.inTransit_ = inTransit;
    this.toggleClass_(slider_constants_cssClasses.IN_TRANSIT, this.inTransit_);
  }

  toggleClass_(className, shouldBePresent) {
    if (shouldBePresent) {
      this.adapter_.addClass(className);
    } else {
      this.adapter_.removeClass(className);
    }
  }
}

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/slider/index.js
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */








class slider_MDCSlider extends component["a" /* default */] {
  static attachTo(root) {
    return new slider_MDCSlider(root);
  }

  get value() {
    return this.foundation_.getValue();
  }

  set value(value) {
    this.foundation_.setValue(value);
  }

  get min() {
    return this.foundation_.getMin();
  }

  set min(min) {
    this.foundation_.setMin(min);
  }

  get max() {
    return this.foundation_.getMax();
  }

  set max(max) {
    this.foundation_.setMax(max);
  }

  get step() {
    return this.foundation_.getStep();
  }

  set step(step) {
    this.foundation_.setStep(step);
  }

  get disabled() {
    return this.foundation_.isDisabled();
  }

  set disabled(disabled) {
    this.foundation_.setDisabled(disabled);
  }

  initialize() {
    this.thumbContainer_ = this.root_.querySelector(slider_constants_strings.THUMB_CONTAINER_SELECTOR);
    this.track_ = this.root_.querySelector(slider_constants_strings.TRACK_SELECTOR);
    this.pinValueMarker_ = this.root_.querySelector(slider_constants_strings.PIN_VALUE_MARKER_SELECTOR);
    this.trackMarkerContainer_ = this.root_.querySelector(slider_constants_strings.TRACK_MARKER_CONTAINER_SELECTOR);
  }

  getDefaultFoundation() {
    return new foundation_MDCSliderFoundation({
      hasClass: (className) => this.root_.classList.contains(className),
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      getAttribute: (name) => this.root_.getAttribute(name),
      setAttribute: (name, value) => this.root_.setAttribute(name, value),
      removeAttribute: (name) => this.root_.removeAttribute(name),
      computeBoundingRect: () => this.root_.getBoundingClientRect(),
      getTabIndex: () => this.root_.tabIndex,
      registerInteractionHandler: (type, handler) => {
        this.root_.addEventListener(type, handler);
      },
      deregisterInteractionHandler: (type, handler) => {
        this.root_.removeEventListener(type, handler);
      },
      registerThumbContainerInteractionHandler: (type, handler) => {
        this.thumbContainer_.addEventListener(type, handler);
      },
      deregisterThumbContainerInteractionHandler: (type, handler) => {
        this.thumbContainer_.removeEventListener(type, handler);
      },
      registerBodyInteractionHandler: (type, handler) => {
        document.body.addEventListener(type, handler);
      },
      deregisterBodyInteractionHandler: (type, handler) => {
        document.body.removeEventListener(type, handler);
      },
      registerResizeHandler: (handler) => {
        window.addEventListener('resize', handler);
      },
      deregisterResizeHandler: (handler) => {
        window.removeEventListener('resize', handler);
      },
      notifyInput: () => {
        this.emit(slider_constants_strings.INPUT_EVENT, this);
      },
      notifyChange: () => {
        this.emit(slider_constants_strings.CHANGE_EVENT, this);
      },
      setThumbContainerStyleProperty: (propertyName, value) => {
        this.thumbContainer_.style.setProperty(propertyName, value);
      },
      setTrackStyleProperty: (propertyName, value) => {
        this.track_.style.setProperty(propertyName, value);
      },
      setMarkerValue: (value) => {
        this.pinValueMarker_.innerText = value;
      },
      appendTrackMarkers: (numMarkers) => {
        const frag = document.createDocumentFragment();
        for (let i = 0; i < numMarkers; i++) {
          const marker = document.createElement('div');
          marker.classList.add('mdc-slider__track-marker');
          frag.appendChild(marker);
        }
        this.trackMarkerContainer_.appendChild(frag);
      },
      removeTrackMarkers: () => {
        while (this.trackMarkerContainer_.firstChild) {
          this.trackMarkerContainer_.removeChild(this.trackMarkerContainer_.firstChild);
        }
      },
      setLastTrackMarkersStyleProperty: (propertyName, value) => {
        // We remove and append new nodes, thus, the last track marker must be dynamically found.
        const lastTrackMarker = this.root_.querySelector(slider_constants_strings.LAST_TRACK_MARKER_SELECTOR);
        lastTrackMarker.style.setProperty(propertyName, value);
      },
      isRTL: () => getComputedStyle(this.root_).direction === 'rtl',
    });
  }

  initialSyncWithDOM() {
    const origValueNow = parseFloat(this.root_.getAttribute(slider_constants_strings.ARIA_VALUENOW));
    this.min = parseFloat(this.root_.getAttribute(slider_constants_strings.ARIA_VALUEMIN)) || this.min;
    this.max = parseFloat(this.root_.getAttribute(slider_constants_strings.ARIA_VALUEMAX)) || this.max;
    this.step = parseFloat(this.root_.getAttribute(slider_constants_strings.STEP_DATA_ATTR)) || this.step;
    this.value = origValueNow || this.value;
    this.disabled = (
      this.root_.hasAttribute(slider_constants_strings.ARIA_DISABLED) &&
      this.root_.getAttribute(slider_constants_strings.ARIA_DISABLED) !== 'false'
    );
    this.foundation_.setupTrackMarker();
  }

  layout() {
    this.foundation_.layout();
  }

  stepUp(amount = (this.step || 1)) {
    this.value += amount;
  }

  stepDown(amount = (this.step || 1)) {
    this.value -= amount;
  }
}

// CONCATENATED MODULE: ./node_modules/preact-material-components/Slider/index.js
var Slider__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function Slider__objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }





/**
 * @prop disabled = false
 */
class Slider_Slider extends MaterialComponent["a" /* default */] {
  constructor() {
    super();
    this.componentName = "slider";
    this._mdcProps = ["discrete"];
    this._onChange = this._onChange.bind(this);
    this._onInput = this._onInput.bind(this);
  }
  _onChange() {
    if (this.props.onChange) {
      this.props.onChange(this.MDComponent.value);
    }
  }
  _onInput() {
    if (this.props.onInput) {
      this.props.onInput(this.MDComponent.value);
    }
  }
  componentDidMount() {
    this.MDComponent = new slider_MDCSlider(this.base);
    this.MDComponent.listen("MDCSlider:change", this._onChange);
    this.MDComponent.listen("MDCSlider:input", this._onInput);
    this.setValue(); // set initial value programatically because of error if min is greater than initial max
  }
  componentWillUnmount() {
    this.MDComponent.unlisten("MDCSlider:change", this._onChange);
    this.MDComponent.unlisten("MDCSlider:input", this._onInput);
    this.MDComponent.destroy && this.MDComponent.destroy();
  }
  setValue(props = this.props) {
    const { disabled = false, min = 0, max = 100, value, step } = props;
    if (this.MDComponent) {
      if (min > this.MDComponent.max) {
        this.MDComponent.max = max;
        this.MDComponent.min = min;
      } else {
        this.MDComponent.min = min;
        this.MDComponent.max = max;
      }

      this.MDComponent.value = value;
      this.MDComponent.disabled = disabled;
      this.MDComponent.step = step;
    }
  }

  materialDom(allprops) {
    const { tabindex = 0 } = allprops,
          props = Slider__objectWithoutProperties(allprops, ["tabindex"]);

    this.setValue(allprops);
    return Object(preact_esm["h"])(
      "div",
      Slider__extends({
        tabindex: tabindex,
        role: "slider",
        "aria-label": "Select Value"
      }, props),
      Object(preact_esm["h"])(
        "div",
        { "class": "mdc-slider__track-container" },
        Object(preact_esm["h"])("div", { "class": "mdc-slider__track" })
      ),
      Object(preact_esm["h"])(
        "div",
        { "class": "mdc-slider__thumb-container" },
        props.discrete && Object(preact_esm["h"])(
          "div",
          { "class": "mdc-slider__pin" },
          Object(preact_esm["h"])("span", { "class": "mdc-slider__pin-value-marker" })
        ),
        Object(preact_esm["h"])(
          "svg",
          { "class": "mdc-slider__thumb", width: "21", height: "21" },
          Object(preact_esm["h"])("circle", { cx: "10.5", cy: "10.5", r: "7.875" })
        ),
        Object(preact_esm["h"])("div", { "class": "mdc-slider__focus-ring" })
      )
    );
  }
}
// CONCATENATED MODULE: ./node_modules/preact-material-components/index.js
/* unused concated harmony import Button */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return Button["a" /* default */]; });
/* unused concated harmony import Checkbox */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return Checkbox_Checkbox; });
/* unused concated harmony import Fab */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return preact_material_components_Fab; });
/* unused concated harmony import Switch */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return Switch_Switch; });
/* unused concated harmony import Snackbar */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return Snackbar_Snackbar; });
/* unused concated harmony import Icon */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return Icon["a" /* default */]; });
/* unused concated harmony import IconToggle */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return IconToggle_IconToggle; });
/* unused concated harmony import Radio */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return Radio_Radio; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "a", function() { return TextField["a" /* default */]; });
/* unused concated harmony import Select */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return preact_material_components_Select; });
/* unused concated harmony import Card */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return /* unused reexport */undefined; });
/* unused concated harmony import Elevation */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return Elevation_Elevation; });
/* unused concated harmony import FormField */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return Formfield; });
/* unused concated harmony import Dialog */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return preact_material_components_Dialog; });
/* unused concated harmony import LinearProgress */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return LinearProgress_LinearProgress; });
/* unused concated harmony import List */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return preact_material_components_List; });
/* unused concated harmony import Drawer */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return preact_material_components_Drawer; });
/* unused concated harmony import Menu */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return preact_material_components_Menu; });
/* unused concated harmony import Toolbar */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return Toolbar["a" /* default */]; });
/* unused concated harmony import LayoutGrid */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return preact_material_components_LayoutGrid; });
/* unused concated harmony import GridList */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return preact_material_components_GridList; });
/* unused concated harmony import Tabs */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return preact_material_components_Tabs; });
/* unused concated harmony import Slider */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return Slider_Slider; });



























/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(console) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MaterialComponent__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__material_textfield__ = __webpack_require__(54);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }





/**
 * @prop persistent = false
 * @prop validation-msg = false
 */
class Helptext extends __WEBPACK_IMPORTED_MODULE_1__MaterialComponent__["a" /* default */] {
  constructor() {
    super();
    this.componentName = "text-field-helptext";
    this._mdcProps = ["persistent", "validation-msg"];
  }
  materialDom(props) {
    return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      "p",
      _extends({}, props, { "aria-hidden": "true" }),
      props.children
    );
  }
}

class Label extends __WEBPACK_IMPORTED_MODULE_1__MaterialComponent__["a" /* default */] {
  constructor() {
    super();
    this.componentName = "text-field__label";
  }
  materialDom(props) {
    return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      "label",
      props,
      props.children
    );
  }
}

const defaultProps = {
  valid: true
};

/**
 * @prop fullwidth = false
 * @prop textarea = false
 * @prop dense = false
 * @prop disabled = false
 * @prop box = false
 * @prop type = 'text'
 * @prop value = ''
 * @prop label = ''
 */
class TextFieldInput extends __WEBPACK_IMPORTED_MODULE_1__MaterialComponent__["a" /* default */] {
  constructor() {
    super();
    this.componentName = "text-field";
    this._mdcProps = ["fullwidth", "textarea", "dense", "disabled", "box"];
    this.state = {
      showFloatingLabel: false
    };
  }
  componentDidMount() {
    this.setState({
      showFloatingLabel: true
    }, () => {
      this.MDComponent = new __WEBPACK_IMPORTED_MODULE_2__material_textfield__["a" /* MDCTextField */](this.control);
      this.props.onInit && this.props.onInit(this.MDComponent);
      setValid(defaultProps, this.props, this.MDComponent);
    });
  }
  componentWillUpdate(nextProps) {
    setValid(this.props, nextProps, this.MDComponent);
  }
  componentWillUnmount() {
    this.MDComponent && this.MDComponent.destroy && this.MDComponent.destroy();
  }
  materialDom(allprops) {
    let { className } = allprops,
        props = _objectWithoutProperties(allprops, ["className"]);

    if ("value" in props && this.state.showFloatingLabel) {
      className = [className, "mdc-text-field--upgraded"].join(" ");
    }
    if (props.label && props.fullwidth) {
      console.log('Passing a "label" prop is not supported when using a "fullwidth" text field.');
    }

    return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      "div",
      { className: className, ref: control => this.control = control },
      props.textarea ? Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])("textarea", _extends({ className: "mdc-text-field__input" }, props)) : Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])("input", _extends({
        type: props.type || "text",
        className: "mdc-text-field__input"
      }, props)),
      props.label && this.state.showFloatingLabel && Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        Label,
        { "for": props.id },
        props.label
      ),
      props.textarea ? "" : Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])("div", { "class": "mdc-text-field__bottom-line" })
    );
  }
}

/**
 * @prop fullwidth = false
 * @prop textarea = false
 * @prop dense = false
 * @prop disabled = false
 * @prop box = false
 * @prop type = 'text'
 * @prop value = ''
 * @prop label = ''
 * @prop helptext = ''
 * @prop helptextPersistent = false
 * @prop helptextValidationMsg = false
 */
class TextField extends __WEBPACK_IMPORTED_MODULE_0_preact__["Component"] {
  constructor() {
    super();
    this.id = TextField.uid();
    this.state = {
      showFloatingLabel: false
    };
  }

  componentDidMount() {
    this.setState({
      showFloatingLabel: true
    });
  }

  static uid() {
    if (!this.uidCounter) {
      this.uidCounter = 0;
    }
    return ++this.uidCounter;
  }

  render(allprops, { showFloatingLabel }) {
    const {
      className,
      helptextPersistent,
      helptextValidationMsg
    } = allprops,
          props = _objectWithoutProperties(allprops, ["className", "helptextPersistent", "helptextValidationMsg"]);
    const showDiv = props.helptext || props.label && !showFloatingLabel;

    if (showDiv && !props.id) {
      props.id = "tf-" + this.id;
    }

    // Helper text
    const helptextProps = {
      persistent: helptextPersistent,
      "validation-msg": helptextValidationMsg
    };

    return showDiv ? Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      "div",
      { className: className },
      props.label && !showFloatingLabel && Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        "label",
        { "for": props.id },
        props.cssLabel || `${props.label}: `
      ),
      Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(TextFieldInput, _extends({}, props, {
        onInit: MDComponent => {
          this.MDComponent = MDComponent;
        },
        "aria-controls": props.helptext && props.id + "-helptext"
      })),
      props.helptext && Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        Helptext,
        _extends({ id: props.id + "-helptext" }, helptextProps),
        props.helptext
      )
    ) : Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(TextFieldInput, _extends({}, props, {
      className: className,
      onInit: MDComponent => {
        this.MDComponent = MDComponent;
      }
    }));
  }
}

function setValid(oldprops, newprops, textfield) {
  if ("valid" in oldprops && "valid" in newprops && oldprops.valid !== newprops.valid) {
    textfield.valid = newprops.valid;
  }
}

TextField.Helptext = Helptext;

/* harmony default export */ __webpack_exports__["a"] = (TextField);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(8)))

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@material/base/component.js
var component = __webpack_require__(5);

// EXTERNAL MODULE: ./node_modules/preact-material-components/node_modules/@material/ripple/index.js + 3 modules
var ripple = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/textfield/constants.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */
const strings = {
  ARIA_HIDDEN: 'aria-hidden',
  ROLE: 'role',
  INPUT_SELECTOR: '.mdc-text-field__input',
  LABEL_SELECTOR: '.mdc-text-field__label',
  ICON_SELECTOR: '.mdc-text-field__icon',
  ICON_EVENT: 'MDCTextField:icon',
  BOTTOM_LINE_SELECTOR: '.mdc-text-field__bottom-line',
};

/** @enum {string} */
const cssClasses = {
  ROOT: 'mdc-text-field',
  UPGRADED: 'mdc-text-field--upgraded',
  DISABLED: 'mdc-text-field--disabled',
  FOCUSED: 'mdc-text-field--focused',
  INVALID: 'mdc-text-field--invalid',
  HELPTEXT_PERSISTENT: 'mdc-text-field-helptext--persistent',
  HELPTEXT_VALIDATION_MSG: 'mdc-text-field-helptext--validation-msg',
  LABEL_FLOAT_ABOVE: 'mdc-text-field__label--float-above',
  LABEL_SHAKE: 'mdc-text-field__label--shake',
  BOX: 'mdc-text-field--box',
  TEXT_FIELD_ICON: 'mdc-text-field__icon',
  TEXTAREA: 'mdc-text-field--textarea',
  BOTTOM_LINE_ACTIVE: 'mdc-text-field__bottom-line--active',
};



// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/textfield/adapter.js
/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * @typedef {{
 *   value: string,
 *   disabled: boolean,
 *   badInput: boolean,
 *   checkValidity: (function(): boolean)
 * }}
 */
let NativeInputType;

/**
 * Adapter for MDC Text Field.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the Text Field into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */
class MDCTextFieldAdapter {
  /**
   * Adds a class to the root Element.
   * @param {string} className
   */
  addClass(className) {}

  /**
   * Removes a class from the root Element.
   * @param {string} className
   */
  removeClass(className) {}

  /**
   * Adds a class to the label Element. We recommend you add a conditional
   * check here, and in removeClassFromLabel for whether or not the label is
   * present so that the JS component could be used with text fields that don't
   * require a label, such as the full-width text field.
   * @param {string} className
   */
  addClassToLabel(className) {}

  /**
   * Removes a class from the label Element.
   * @param {string} className
   */
  removeClassFromLabel(className) {}

  /**
   * Sets an attribute on the icon Element.
   * @param {string} name
   * @param {string} value
   */
  setIconAttr(name, value) {}

  /**
   * Returns true if classname exists for a given target element.
   * @param {?EventTarget} target
   * @param {string} className
   * @return {boolean}
   */
  eventTargetHasClass(target, className) {}

  /**
   * Registers an event handler on the root element for a given event.
   * @param {string} type
   * @param {function(!Event): undefined} handler
   */
  registerTextFieldInteractionHandler(type, handler) {}

  /**
   * Deregisters an event handler on the root element for a given event.
   * @param {string} type
   * @param {function(!Event): undefined} handler
   */
  deregisterTextFieldInteractionHandler(type, handler) {}

  /**
   * Emits a custom event "MDCTextField:icon" denoting a user has clicked the icon.
   */
  notifyIconAction() {}

  /**
   * Adds a class to the bottom line element.
   * @param {string} className
   */
  addClassToBottomLine(className) {}

  /**
   * Removes a class from the bottom line element.
   * @param {string} className
   */
  removeClassFromBottomLine(className) {}

  /**
   * Adds a class to the help text element. Note that in our code we check for
   * whether or not we have a help text element and if we don't, we simply
   * return.
   * @param {string} className
   */
  addClassToHelptext(className) {}

  /**
   * Removes a class from the help text element.
   * @param {string} className
   */
  removeClassFromHelptext(className) {}

  /**
   * Returns whether or not the help text element contains the given class.
   * @param {string} className
   * @return {boolean}
   */
  helptextHasClass(className) {}

  /**
   * Registers an event listener on the native input element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */
  registerInputInteractionHandler(evtType, handler) {}

  /**
   * Deregisters an event listener on the native input element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */
  deregisterInputInteractionHandler(evtType, handler) {}

  /**
   * Registers an event listener on the bottom line element for a "transitionend" event.
   * @param {function(!Event): undefined} handler
   */
  registerTransitionEndHandler(handler) {}

  /**
   * Deregisters an event listener on the bottom line element for a "transitionend" event.
   * @param {function(!Event): undefined} handler
   */
  deregisterTransitionEndHandler(handler) {}

  /**
   * Sets an attribute with a given value on the bottom line element.
   * @param {string} attr
   * @param {string} value
   */
  setBottomLineAttr(attr, value) {}

  /**
   * Sets an attribute with a given value on the help text element.
   * @param {string} name
   * @param {string} value
   */
  setHelptextAttr(name, value) {}

  /**
   * Removes an attribute from the help text element.
   * @param {string} name
   */
  removeHelptextAttr(name) {}

  /**
   * Returns an object representing the native text input element, with a
   * similar API shape. The object returned should include the value, disabled
   * and badInput properties, as well as the checkValidity() function. We never
   * alter the value within our code, however we do update the disabled
   * property, so if you choose to duck-type the return value for this method
   * in your implementation it's important to keep this in mind. Also note that
   * this method can return null, which the foundation will handle gracefully.
   * @return {?Element|?NativeInputType}
   */
  getNativeInput() {}
}



// EXTERNAL MODULE: ./node_modules/@material/base/foundation.js
var foundation = __webpack_require__(2);

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/textfield/foundation.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






/**
 * @extends {MDCFoundation<!MDCTextFieldAdapter>}
 * @final
 */
class foundation_MDCTextFieldFoundation extends foundation["a" /* default */] {
  /** @return enum {string} */
  static get cssClasses() {
    return cssClasses;
  }

  /** @return enum {string} */
  static get strings() {
    return strings;
  }

  /**
   * {@see MDCTextFieldAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCTextFieldAdapter}
   */
  static get defaultAdapter() {
    return /** @type {!MDCTextFieldAdapter} */ ({
      addClass: () => {},
      removeClass: () => {},
      addClassToLabel: () => {},
      removeClassFromLabel: () => {},
      setIconAttr: () => {},
      eventTargetHasClass: () => {},
      registerTextFieldInteractionHandler: () => {},
      deregisterTextFieldInteractionHandler: () => {},
      notifyIconAction: () => {},
      addClassToBottomLine: () => {},
      removeClassFromBottomLine: () => {},
      addClassToHelptext: () => {},
      removeClassFromHelptext: () => {},
      helptextHasClass: () => false,
      registerInputInteractionHandler: () => {},
      deregisterInputInteractionHandler: () => {},
      registerTransitionEndHandler: () => {},
      deregisterTransitionEndHandler: () => {},
      setBottomLineAttr: () => {},
      setHelptextAttr: () => {},
      removeHelptextAttr: () => {},
      getNativeInput: () => {},
    });
  }

  /**
   * @param {!MDCTextFieldAdapter=} adapter
   */
  constructor(adapter = /** @type {!MDCTextFieldAdapter} */ ({})) {
    super(Object.assign(foundation_MDCTextFieldFoundation.defaultAdapter, adapter));

    /** @private {boolean} */
    this.isFocused_ = false;
    /** @private {boolean} */
    this.receivedUserInput_ = false;
    /** @private {boolean} */
    this.useCustomValidityChecking_ = false;
    /** @private {function(): undefined} */
    this.inputFocusHandler_ = () => this.activateFocus();
    /** @private {function(): undefined} */
    this.inputBlurHandler_ = () => this.deactivateFocus();
    /** @private {function(): undefined} */
    this.inputInputHandler_ = () => this.autoCompleteFocus();
    /** @private {function(!Event): undefined} */
    this.setPointerXOffset_ = (evt) => this.animateBottomLine(evt);
    /** @private {function(!Event): undefined} */
    this.textFieldInteractionHandler_ = (evt) => this.handleTextFieldInteraction(evt);
    /** @private {function(!Event): undefined} */
    this.transitionEndHandler_ = (evt) => this.handleBottomLineAnimationEnd(evt);
  }

  init() {
    this.adapter_.addClass(foundation_MDCTextFieldFoundation.cssClasses.UPGRADED);
    // Ensure label does not collide with any pre-filled value.
    if (this.getNativeInput_().value) {
      this.adapter_.addClassToLabel(foundation_MDCTextFieldFoundation.cssClasses.LABEL_FLOAT_ABOVE);
    }

    this.adapter_.registerInputInteractionHandler('focus', this.inputFocusHandler_);
    this.adapter_.registerInputInteractionHandler('blur', this.inputBlurHandler_);
    this.adapter_.registerInputInteractionHandler('input', this.inputInputHandler_);
    ['mousedown', 'touchstart'].forEach((evtType) => {
      this.adapter_.registerInputInteractionHandler(evtType, this.setPointerXOffset_);
    });
    ['click', 'keydown'].forEach((evtType) => {
      this.adapter_.registerTextFieldInteractionHandler(evtType, this.textFieldInteractionHandler_);
    });
    this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
  }

  destroy() {
    this.adapter_.removeClass(foundation_MDCTextFieldFoundation.cssClasses.UPGRADED);
    this.adapter_.deregisterInputInteractionHandler('focus', this.inputFocusHandler_);
    this.adapter_.deregisterInputInteractionHandler('blur', this.inputBlurHandler_);
    this.adapter_.deregisterInputInteractionHandler('input', this.inputInputHandler_);
    ['mousedown', 'touchstart'].forEach((evtType) => {
      this.adapter_.deregisterInputInteractionHandler(evtType, this.setPointerXOffset_);
    });
    ['click', 'keydown'].forEach((evtType) => {
      this.adapter_.deregisterTextFieldInteractionHandler(evtType, this.textFieldInteractionHandler_);
    });
    this.adapter_.deregisterTransitionEndHandler(this.transitionEndHandler_);
  }

  /**
   * Handles all user interactions with the Text Field.
   * @param {!Event} evt
   */
  handleTextFieldInteraction(evt) {
    if (this.adapter_.getNativeInput().disabled) {
      return;
    }

    this.receivedUserInput_ = true;

    const {target, type} = evt;
    const {TEXT_FIELD_ICON} = foundation_MDCTextFieldFoundation.cssClasses;
    const targetIsIcon = this.adapter_.eventTargetHasClass(target, TEXT_FIELD_ICON);
    const eventTriggersNotification = type === 'click' || evt.key === 'Enter' || evt.keyCode === 13;

    if (targetIsIcon && eventTriggersNotification) {
      this.adapter_.notifyIconAction();
    }
  }

  /**
   * Activates the text field focus state.
   */
  activateFocus() {
    const {BOTTOM_LINE_ACTIVE, FOCUSED, LABEL_FLOAT_ABOVE, LABEL_SHAKE} = foundation_MDCTextFieldFoundation.cssClasses;
    this.adapter_.addClass(FOCUSED);
    this.adapter_.addClassToBottomLine(BOTTOM_LINE_ACTIVE);
    this.adapter_.addClassToLabel(LABEL_FLOAT_ABOVE);
    this.adapter_.removeClassFromLabel(LABEL_SHAKE);
    this.showHelptext_();
    this.isFocused_ = true;
  }

  /**
   * Animates the bottom line out from the user's click location.
   * @param {!Event} evt
   */
  animateBottomLine(evt) {
    const targetClientRect = evt.target.getBoundingClientRect();
    const evtCoords = {x: evt.clientX, y: evt.clientY};
    const normalizedX = evtCoords.x - targetClientRect.left;
    const attributeString =
      `transform-origin: ${normalizedX}px center`;

    this.adapter_.setBottomLineAttr('style', attributeString);
  }

  /**
   * Activates the Text Field's focus state in cases when the input value
   * changes without user input (e.g. programatically).
   */
  autoCompleteFocus() {
    if (!this.receivedUserInput_) {
      this.activateFocus();
    }
  }

  /**
   * Makes the help text visible to screen readers.
   * @private
   */
  showHelptext_() {
    const {ARIA_HIDDEN} = foundation_MDCTextFieldFoundation.strings;
    this.adapter_.removeHelptextAttr(ARIA_HIDDEN);
  }

  /**
   * Executes when the bottom line's transition animation ends, performing
   * actions that must wait for animations to finish.
   * @param {!Event} evt
   */
  handleBottomLineAnimationEnd(evt) {
    const {BOTTOM_LINE_ACTIVE} = foundation_MDCTextFieldFoundation.cssClasses;

    // We need to wait for the bottom line to be entirely transparent
    // before removing the class. If we do not, we see the line start to
    // scale down before disappearing
    if (evt.propertyName === 'opacity' && !this.isFocused_) {
      this.adapter_.removeClassFromBottomLine(BOTTOM_LINE_ACTIVE);
    }
  }

  /**
   * Deactives the Text Field's focus state.
   */
  deactivateFocus() {
    const {FOCUSED, LABEL_FLOAT_ABOVE, LABEL_SHAKE} = foundation_MDCTextFieldFoundation.cssClasses;
    const input = this.getNativeInput_();

    this.isFocused_ = false;
    this.adapter_.removeClass(FOCUSED);
    this.adapter_.removeClassFromLabel(LABEL_SHAKE);

    if (!input.value && !this.isBadInput_()) {
      this.adapter_.removeClassFromLabel(LABEL_FLOAT_ABOVE);
      this.receivedUserInput_ = false;
    }

    if (!this.useCustomValidityChecking_) {
      this.changeValidity_(input.checkValidity());
    }
  }

  /**
   * Updates the Text Field's valid state based on the supplied validity.
   * @param {boolean} isValid
   * @private
   */
  changeValidity_(isValid) {
    const {INVALID, LABEL_SHAKE} = foundation_MDCTextFieldFoundation.cssClasses;
    if (isValid) {
      this.adapter_.removeClass(INVALID);
    } else {
      this.adapter_.addClassToLabel(LABEL_SHAKE);
      this.adapter_.addClass(INVALID);
    }
    this.updateHelptext_(isValid);
  }

  /**
   * Updates the state of the Text Field's help text based on validity and
   * the Text Field's options.
   * @param {boolean} isValid
   */
  updateHelptext_(isValid) {
    const {HELPTEXT_PERSISTENT, HELPTEXT_VALIDATION_MSG} = foundation_MDCTextFieldFoundation.cssClasses;
    const {ROLE} = foundation_MDCTextFieldFoundation.strings;
    const helptextIsPersistent = this.adapter_.helptextHasClass(HELPTEXT_PERSISTENT);
    const helptextIsValidationMsg = this.adapter_.helptextHasClass(HELPTEXT_VALIDATION_MSG);
    const validationMsgNeedsDisplay = helptextIsValidationMsg && !isValid;

    if (validationMsgNeedsDisplay) {
      this.adapter_.setHelptextAttr(ROLE, 'alert');
    } else {
      this.adapter_.removeHelptextAttr(ROLE);
    }

    if (helptextIsPersistent || validationMsgNeedsDisplay) {
      return;
    }
    this.hideHelptext_();
  }

  /**
   * Hides the help text from screen readers.
   * @private
   */
  hideHelptext_() {
    const {ARIA_HIDDEN} = foundation_MDCTextFieldFoundation.strings;
    this.adapter_.setHelptextAttr(ARIA_HIDDEN, 'true');
  }

  /**
   * @return {boolean} True if the Text Field input fails validity checks.
   * @private
   */
  isBadInput_() {
    const input = this.getNativeInput_();
    return input.validity ? input.validity.badInput : input.badInput;
  }

  /**
   * @return {boolean} True if the Text Field is disabled.
   */
  isDisabled() {
    return this.getNativeInput_().disabled;
  }

  /**
   * @param {boolean} disabled Sets the text-field disabled or enabled.
   */
  setDisabled(disabled) {
    const {DISABLED} = foundation_MDCTextFieldFoundation.cssClasses;
    this.getNativeInput_().disabled = disabled;
    if (disabled) {
      this.adapter_.addClass(DISABLED);
      this.adapter_.setIconAttr('tabindex', '-1');
    } else {
      this.adapter_.removeClass(DISABLED);
      this.adapter_.setIconAttr('tabindex', '0');
    }
  }

  /**
   * @return {!Element|!NativeInputType} The native text input from the
   * host environment, or a dummy if none exists.
   * @private
   */
  getNativeInput_() {
    return this.adapter_.getNativeInput() ||
    /** @type {!NativeInputType} */ ({
      checkValidity: () => true,
      value: '',
      disabled: false,
      badInput: false,
    });
  }

  /**
   * @param {boolean} isValid Sets the validity state of the Text Field.
   */
  setValid(isValid) {
    this.useCustomValidityChecking_ = true;
    this.changeValidity_(isValid);
  }
}

/* harmony default export */ var textfield_foundation = (foundation_MDCTextFieldFoundation);

// CONCATENATED MODULE: ./node_modules/preact-material-components/node_modules/@material/textfield/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return textfield_MDCTextField; });
/* unused concated harmony import MDCTextFieldFoundation */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return textfield_foundation; });
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */








/**
 * @extends {MDCComponent<!MDCTextFieldFoundation>}
 * @final
 */
class textfield_MDCTextField extends component["a" /* default */] {
  /**
   * @param {...?} args
   */
  constructor(...args) {
    super(...args);
    /** @private {?Element} */
    this.input_;
    /** @private {?Element} */
    this.label_;
    /** @type {?Element} */
    this.helptextElement;
    /** @type {?MDCRipple} */
    this.ripple;
    /** @private {?Element} */
    this.bottomLine_;
    /** @private {?Element} */
    this.icon_;
  }

  /**
   * @param {!Element} root
   * @return {!MDCTextField}
   */
  static attachTo(root) {
    return new textfield_MDCTextField(root);
  }

  /**
   * @param {(function(!Element): !MDCRipple)=} rippleFactory A function which
   * creates a new MDCRipple.
   */
  initialize(rippleFactory = (el) => new ripple["a" /* MDCRipple */](el)) {
    this.input_ = this.root_.querySelector(strings.INPUT_SELECTOR);
    this.label_ = this.root_.querySelector(strings.LABEL_SELECTOR);
    this.helptextElement = null;
    this.ripple = null;
    if (this.input_.hasAttribute('aria-controls')) {
      this.helptextElement = document.getElementById(this.input_.getAttribute('aria-controls'));
    }
    if (this.root_.classList.contains(cssClasses.BOX)) {
      this.ripple = rippleFactory(this.root_);
    };
    if (!this.root_.classList.contains(cssClasses.TEXTAREA)) {
      this.bottomLine_ = this.root_.querySelector(strings.BOTTOM_LINE_SELECTOR);
    };
    if (!this.root_.classList.contains(cssClasses.TEXT_FIELD_ICON)) {
      this.icon_ = this.root_.querySelector(strings.ICON_SELECTOR);
    };
  }

  destroy() {
    if (this.ripple) {
      this.ripple.destroy();
    }
    super.destroy();
  }

  /**
   * Initiliazes the Text Field's internal state based on the environment's
   * state.
   */
  initialSyncWithDom() {
    this.disabled = this.input_.disabled;
  }

  /**
   * @return {boolean} True if the Text Field is disabled.
   */
  get disabled() {
    return this.foundation_.isDisabled();
  }

  /**
   * @param {boolean} disabled Sets the Text Field disabled or enabled.
   */
  set disabled(disabled) {
    this.foundation_.setDisabled(disabled);
  }

  /**
   * @param {boolean} valid Sets the Text Field valid or invalid.
   */
  set valid(valid) {
    this.foundation_.setValid(valid);
  }

  /**
   * @return {!MDCTextFieldFoundation}
   */
  getDefaultFoundation() {
    return new textfield_foundation(/** @type {!MDCTextFieldAdapter} */ (Object.assign({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      addClassToLabel: (className) => {
        const label = this.label_;
        if (label) {
          label.classList.add(className);
        }
      },
      removeClassFromLabel: (className) => {
        const label = this.label_;
        if (label) {
          label.classList.remove(className);
        }
      },
      eventTargetHasClass: (target, className) => target.classList.contains(className),
      registerTextFieldInteractionHandler: (evtType, handler) => this.root_.addEventListener(evtType, handler),
      deregisterTextFieldInteractionHandler: (evtType, handler) => this.root_.removeEventListener(evtType, handler),
      notifyIconAction: () => this.emit(textfield_foundation.strings.ICON_EVENT, {}),
    },
    this.getInputAdapterMethods_(),
    this.getHelptextAdapterMethods_(),
    this.getBottomLineAdapterMethods_(),
    this.getIconAdapterMethods_())));
  }

  /**
   * @return {!{
   *   setIconAttr: function(string, string): undefined,
   * }}
   */
  getIconAdapterMethods_() {
    return {
      setIconAttr: (name, value) => {
        if (this.icon_) {
          this.icon_.setAttribute(name, value);
        }
      },
    };
  }

  /**
   * @return {!{
   *   addClassToBottomLine: function(string): undefined,
   *   removeClassFromBottomLine: function(string): undefined,
   *   setBottomLineAttr: function(string, string): undefined,
   *   registerTransitionEndHandler: function(function()): undefined,
   *   deregisterTransitionEndHandler: function(function()): undefined,
   * }}
   */
  getBottomLineAdapterMethods_() {
    return {
      addClassToBottomLine: (className) => {
        if (this.bottomLine_) {
          this.bottomLine_.classList.add(className);
        }
      },
      removeClassFromBottomLine: (className) => {
        if (this.bottomLine_) {
          this.bottomLine_.classList.remove(className);
        }
      },
      setBottomLineAttr: (attr, value) => {
        if (this.bottomLine_) {
          this.bottomLine_.setAttribute(attr, value);
        }
      },
      registerTransitionEndHandler: (handler) => {
        if (this.bottomLine_) {
          this.bottomLine_.addEventListener('transitionend', handler);
        }
      },
      deregisterTransitionEndHandler: (handler) => {
        if (this.bottomLine_) {
          this.bottomLine_.removeEventListener('transitionend', handler);
        }
      },
    };
  }

  /**
   * @return {!{
   *   registerInputInteractionHandler: function(string, function()): undefined,
   *   deregisterInputInteractionHandler: function(string, function()): undefined,
   *   getNativeInput: function(): ?Element,
   * }}
   */
  getInputAdapterMethods_() {
    return {
      registerInputInteractionHandler: (evtType, handler) => this.input_.addEventListener(evtType, handler),
      deregisterInputInteractionHandler: (evtType, handler) => this.input_.removeEventListener(evtType, handler),
      getNativeInput: () => this.input_,
    };
  }

  /**
   * @return {!{
   *   addClassToHelptext: function(string): undefined,
   *   removeClassFromHelptext: function(string): undefined,
   *   helptextHasClass: function(string): boolean,
   *   setHelptextAttr: function(string, string): undefined,
   *   removeHelptextAttr: function(string): undefined,
   * }}
   */
  getHelptextAdapterMethods_() {
    return {
      addClassToHelptext: (className) => {
        if (this.helptextElement) {
          this.helptextElement.classList.add(className);
        }
      },
      removeClassFromHelptext: (className) => {
        if (this.helptextElement) {
          this.helptextElement.classList.remove(className);
        }
      },
      helptextHasClass: (className) => {
        if (!this.helptextElement) {
          return false;
        }
        return this.helptextElement.classList.contains(className);
      },
      setHelptextAttr: (name, value) => {
        if (this.helptextElement) {
          this.helptextElement.setAttribute(name, value);
        }
      },
      removeHelptextAttr: (name) => {
        if (this.helptextElement) {
          this.helptextElement.removeAttribute(name);
        }
      },
    };
  }
}




/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var tabbable = __webpack_require__(56);

var listeningFocusTrap = null;

function focusTrap(element, userOptions) {
  var tabbableNodes = [];
  var firstTabbableNode = null;
  var lastTabbableNode = null;
  var nodeFocusedBeforeActivation = null;
  var active = false;
  var paused = false;
  var tabEvent = null;

  var container = (typeof element === 'string')
    ? document.querySelector(element)
    : element;

  var config = userOptions || {};
  config.returnFocusOnDeactivate = (userOptions && userOptions.returnFocusOnDeactivate !== undefined)
    ? userOptions.returnFocusOnDeactivate
    : true;
  config.escapeDeactivates = (userOptions && userOptions.escapeDeactivates !== undefined)
    ? userOptions.escapeDeactivates
    : true;

  var trap = {
    activate: activate,
    deactivate: deactivate,
    pause: pause,
    unpause: unpause,
  };

  return trap;

  function activate(activateOptions) {
    if (active) return;

    var defaultedActivateOptions = {
      onActivate: (activateOptions && activateOptions.onActivate !== undefined)
        ? activateOptions.onActivate
        : config.onActivate,
    };

    active = true;
    paused = false;
    nodeFocusedBeforeActivation = document.activeElement;

    if (defaultedActivateOptions.onActivate) {
      defaultedActivateOptions.onActivate();
    }

    addListeners();
    return trap;
  }

  function deactivate(deactivateOptions) {
    if (!active) return;

    var defaultedDeactivateOptions = {
      returnFocus: (deactivateOptions && deactivateOptions.returnFocus !== undefined)
        ? deactivateOptions.returnFocus
        : config.returnFocusOnDeactivate,
      onDeactivate: (deactivateOptions && deactivateOptions.onDeactivate !== undefined)
        ? deactivateOptions.onDeactivate
        : config.onDeactivate,
    };

    removeListeners();

    if (defaultedDeactivateOptions.onDeactivate) {
      defaultedDeactivateOptions.onDeactivate();
    }

    if (defaultedDeactivateOptions.returnFocus) {
      setTimeout(function () {
        tryFocus(nodeFocusedBeforeActivation);
      }, 0);
    }

    active = false;
    paused = false;
    return this;
  }

  function pause() {
    if (paused || !active) return;
    paused = true;
    removeListeners();
  }

  function unpause() {
    if (!paused || !active) return;
    paused = false;
    addListeners();
  }

  function addListeners() {
    if (!active) return;

    // There can be only one listening focus trap at a time
    if (listeningFocusTrap) {
      listeningFocusTrap.pause();
    }
    listeningFocusTrap = trap;

    updateTabbableNodes();
    tryFocus(firstFocusNode());
    document.addEventListener('focus', checkFocus, true);
    document.addEventListener('click', checkClick, true);
    document.addEventListener('mousedown', checkPointerDown, true);
    document.addEventListener('touchstart', checkPointerDown, true);
    document.addEventListener('keydown', checkKey, true);

    return trap;
  }

  function removeListeners() {
    if (!active || listeningFocusTrap !== trap) return;

    document.removeEventListener('focus', checkFocus, true);
    document.removeEventListener('click', checkClick, true);
    document.removeEventListener('mousedown', checkPointerDown, true);
    document.removeEventListener('touchstart', checkPointerDown, true);
    document.removeEventListener('keydown', checkKey, true);

    listeningFocusTrap = null;

    return trap;
  }

  function getNodeForOption(optionName) {
    var optionValue = config[optionName];
    var node = optionValue;
    if (!optionValue) {
      return null;
    }
    if (typeof optionValue === 'string') {
      node = document.querySelector(optionValue);
      if (!node) {
        throw new Error('`' + optionName + '` refers to no known node');
      }
    }
    if (typeof optionValue === 'function') {
      node = optionValue();
      if (!node) {
        throw new Error('`' + optionName + '` did not return a node');
      }
    }
    return node;
  }

  function firstFocusNode() {
    var node;
    if (getNodeForOption('initialFocus') !== null) {
      node = getNodeForOption('initialFocus');
    } else if (container.contains(document.activeElement)) {
      node = document.activeElement;
    } else {
      node = tabbableNodes[0] || getNodeForOption('fallbackFocus');
    }

    if (!node) {
      throw new Error('You can\'t have a focus-trap without at least one focusable element');
    }

    return node;
  }

  // This needs to be done on mousedown and touchstart instead of click
  // so that it precedes the focus event
  function checkPointerDown(e) {
    if (config.clickOutsideDeactivates && !container.contains(e.target)) {
      deactivate({ returnFocus: false });
    }
  }

  function checkClick(e) {
    if (config.clickOutsideDeactivates) return;
    if (container.contains(e.target)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
  }

  function checkFocus(e) {
    if (container.contains(e.target)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    // Checking for a blur method here resolves a Firefox issue (#15)
    if (typeof e.target.blur === 'function') e.target.blur();

    if (tabEvent) {
      readjustFocus(tabEvent);
    }
  }

  function checkKey(e) {
    if (e.key === 'Tab' || e.keyCode === 9) {
      handleTab(e);
    }

    if (config.escapeDeactivates !== false && isEscapeEvent(e)) {
      deactivate();
    }
  }

  function handleTab(e) {
    updateTabbableNodes();

    if (e.target.hasAttribute('tabindex') && Number(e.target.getAttribute('tabindex')) < 0) {
      return tabEvent = e;
    }

    e.preventDefault();
    var currentFocusIndex = tabbableNodes.indexOf(e.target);

    if (e.shiftKey) {
      if (e.target === firstTabbableNode || tabbableNodes.indexOf(e.target) === -1) {
        return tryFocus(lastTabbableNode);
      }
      return tryFocus(tabbableNodes[currentFocusIndex - 1]);
    }

    if (e.target === lastTabbableNode) return tryFocus(firstTabbableNode);

    tryFocus(tabbableNodes[currentFocusIndex + 1]);
  }

  function updateTabbableNodes() {
    tabbableNodes = tabbable(container);
    firstTabbableNode = tabbableNodes[0];
    lastTabbableNode = tabbableNodes[tabbableNodes.length - 1];
  }

  function readjustFocus(e) {
    if (e.shiftKey) return tryFocus(lastTabbableNode);

    tryFocus(firstTabbableNode);
  }
}

function isEscapeEvent(e) {
  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
}

function tryFocus(node) {
  if (!node || !node.focus) return;
  if (node === document.activeElement)  return;

  node.focus();
  if (node.tagName.toLowerCase() === 'input') {
    node.select();
  }
}

module.exports = focusTrap;


/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = function(el, options) {
  options = options || {};

  var elementDocument = el.ownerDocument || el;
  var basicTabbables = [];
  var orderedTabbables = [];

  // A node is "available" if
  // - it's computed style
  var isUnavailable = createIsUnavailable(elementDocument);

  var candidateSelectors = [
    'input',
    'select',
    'a[href]',
    'textarea',
    'button',
    '[tabindex]',
  ];

  var candidates = el.querySelectorAll(candidateSelectors);

  if (options.includeContainer) {
    var matches = Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

    if (
      candidateSelectors.some(function(candidateSelector) {
        return matches.call(el, candidateSelector);
      })
    ) {
      candidates = Array.prototype.slice.apply(candidates);
      candidates.unshift(el);
    }
  }

  var candidate, candidateIndex;
  for (var i = 0, l = candidates.length; i < l; i++) {
    candidate = candidates[i];
    candidateIndex = parseInt(candidate.getAttribute('tabindex'), 10) || candidate.tabIndex;

    if (
      candidateIndex < 0
      || (candidate.tagName === 'INPUT' && candidate.type === 'hidden')
      || candidate.disabled
      || isUnavailable(candidate, elementDocument)
    ) {
      continue;
    }

    if (candidateIndex === 0) {
      basicTabbables.push(candidate);
    } else {
      orderedTabbables.push({
        index: i,
        tabIndex: candidateIndex,
        node: candidate,
      });
    }
  }

  var tabbableNodes = orderedTabbables
    .sort(function(a, b) {
      return a.tabIndex === b.tabIndex ? a.index - b.index : a.tabIndex - b.tabIndex;
    })
    .map(function(a) {
      return a.node
    });

  Array.prototype.push.apply(tabbableNodes, basicTabbables);

  return tabbableNodes;
}

function createIsUnavailable(elementDocument) {
  // Node cache must be refreshed on every check, in case
  // the content of the element has changed
  var isOffCache = [];

  // "off" means `display: none;`, as opposed to "hidden",
  // which means `visibility: hidden;`. getComputedStyle
  // accurately reflects visiblity in context but not
  // "off" state, so we need to recursively check parents.

  function isOff(node, nodeComputedStyle) {
    if (node === elementDocument.documentElement) return false;

    // Find the cached node (Array.prototype.find not available in IE9)
    for (var i = 0, length = isOffCache.length; i < length; i++) {
      if (isOffCache[i][0] === node) return isOffCache[i][1];
    }

    nodeComputedStyle = nodeComputedStyle || elementDocument.defaultView.getComputedStyle(node);

    var result = false;

    if (nodeComputedStyle.display === 'none') {
      result = true;
    } else if (node.parentNode) {
      result = isOff(node.parentNode);
    }

    isOffCache.push([node, result]);

    return result;
  }

  return function isUnavailable(node) {
    if (node === elementDocument.documentElement) return false;

    var computedStyle = elementDocument.defaultView.getComputedStyle(node);

    if (isOff(node, computedStyle)) return true;

    return computedStyle.visibility === 'hidden';
  }
}


/***/ })
],[23]);