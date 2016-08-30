(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("ngImageCrop", [], factory);
	else if(typeof exports === 'object')
		exports["ngImageCrop"] = factory();
	else
		root["ngImageCrop"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(1);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var croppie = __webpack_require__(5);
	var EXIF = __webpack_require__(8);
	
	var MODULE_NAME = 'ngImageCrop';
	
	exports.default = MODULE_NAME;
	
	
	var _module = angular.module(MODULE_NAME, []);
	
	var ImageCropDirectiveCtrl = function () {
	  function ImageCropDirectiveCtrl($scope, $document, $element, $timeout, $window) {
	    _classCallCheck(this, ImageCropDirectiveCtrl);
	
	    this.$document = $document;
	    this.$element = $element;
	    this.$scope = $scope;
	    this.$timeout = $timeout;
	    this.$window = $window;
	    this.$window.EXIF = EXIF;
	    this.initialized = false;
	    this._initCroppie();
	  }
	
	  _createClass(ImageCropDirectiveCtrl, [{
	    key: 'saveCrop',
	    value: function saveCrop() {
	      var _this = this;
	
	      // returns a blob of the cropped image
	      this.c.result({
	        type: 'canvas',
	        quality: this.options.result.quality,
	        size: { width: this.options.result.width },
	        format: this.options.result.format
	      }).then(function (img) {
	        _this.$scope.$apply(function () {
	          var regex = /^data:[a-z]+\/[a-z]+;base64,(.+)/;
	          var base64String = regex.exec(img);
	          var croppedImage = _this._b64ToBlob(base64String[base64String.length - 1]);
	          // call apply callback
	          _this.onApply({ image: croppedImage });
	        });
	      });
	    }
	  }, {
	    key: '_bindImage',
	    value: function _bindImage() {
	      var _this2 = this;
	
	      // binds image to croppie instance
	      var reader = new FileReader();
	
	      reader.onload = function () {
	        _this2.c.bind(reader.result);
	      };
	      reader.readAsDataURL(this._originalImage);
	    }
	  }, {
	    key: '_initCroppie',
	    value: function _initCroppie() {
	      // initializes a croppie instance
	      this.c = new croppie(this.$element.find('.cropper')[0], this.options.croppie);
	      if (this._originalImage) {
	        this._bindImage();
	      }
	    }
	  }, {
	    key: '_b64ToBlob',
	    value: function _b64ToBlob(b64Data) {
	      var byteCharacters = atob(b64Data);
	      var byteArrays = [];
	      var contentType = this._originalImage.type;
	      var sliceSize = 512;
	
	      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
	        var slice = byteCharacters.slice(offset, offset + sliceSize);
	
	        var byteNumbers = new Array(slice.length);
	        for (var i = 0; i < slice.length; i++) {
	          byteNumbers[i] = slice.charCodeAt(i);
	        }
	
	        var byteArray = new Uint8Array(byteNumbers);
	
	        byteArrays.push(byteArray);
	      }
	
	      var blob = new Blob(byteArrays, { type: contentType });
	      var width = this.options.result.width;
	      var height = this.options.result.height;
	      var quality = this.options.result.quality;
	      blob.name = width + '_' + height + '_' + quality + '_' + this._originalImage.name;
	      return blob;
	    }
	  }, {
	    key: 'originalImage',
	    set: function set(value) {
	      this._originalImage = value;
	      if (this.c !== undefined) {
	        this._bindImage();
	      }
	    },
	    get: function get() {
	      return this._originalImage;
	    }
	  }]);
	
	  return ImageCropDirectiveCtrl;
	}();
	
	var ImageCropDirective = function ImageCropDirective() {
	  _classCallCheck(this, ImageCropDirective);
	
	  this.restrict = 'E';
	  this.scope = {
	    originalImage: '<',
	    options: '<',
	    onApply: '&',
	    onCancel: '&'
	  };
	  this.bindToController = true;
	  this.controller = ImageCropDirectiveCtrl;
	  this.controllerAs = '$ctrl';
	  this.template = __webpack_require__(9)();
	};
	
	_module.directive('imageCrop', function () {
	  return new ImageCropDirective();
	});
	_module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../css-loader/index.js!./croppie.css", function() {
				var newContent = require("!!./../css-loader/index.js!./croppie.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, ".croppie-container {\n\tpadding: 30px;\n}\n.croppie-container .cr-image {\n\tz-index: -1;\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\ttransform-origin: 0 0;\n    max-width: none;\n}\n\n.croppie-container .cr-boundary {\n\tposition: relative;\n\toverflow: hidden;\n\tmargin: 0 auto;\n\tz-index: 1;\n}\n\n.croppie-container .cr-viewport {\n\tposition: absolute;\n\tborder: 2px solid #fff;\n\tmargin: auto;\n\ttop: 0;\n\tbottom: 0;\n\tright: 0;\n\tleft: 0;\n    box-shadow: 0 0 2000px 2000px rgba(0, 0, 0, 0.5);\n\tz-index: 0;\n}\n.croppie-container .cr-vp-circle {\n\tborder-radius: 50%;\n}\n.croppie-container .cr-overlay {\n\tz-index: 1;\n\tposition: absolute;\n\tcursor: move;\n}\n.croppie-container .cr-slider-wrap {\n\twidth: 75%;\n\tmargin: 0 auto;\n\tmargin-top: 25px;\n\ttext-align: center;\n}\n.croppie-result {\n\tposition: relative; \n\toverflow: hidden;\n}\n.croppie-result img {\n\tposition: absolute;\n}\n.croppie-container .cr-image,\n.croppie-container .cr-overlay, \n.croppie-container .cr-viewport {\n  -webkit-transform: translateZ(0);\n  -moz-transform: translateZ(0);\n  -ms-transform: translateZ(0);\n  transform: translateZ(0);\n}\n\n/*************************************/\n/***** STYLING RANGE INPUT ***********/\n/*************************************/\n/*http://brennaobrien.com/blog/2014/05/style-input-type-range-in-every-browser.html */\n/*************************************/\n\n.cr-slider {\n    -webkit-appearance: none;/*removes default webkit styles*/\n    /*border: 1px solid white; *//*fix for FF unable to apply focus style bug */\n    width: 300px;/*required for proper track sizing in FF*/\n    max-width: 100%;\n}\n.cr-slider::-webkit-slider-runnable-track {\n    width: 100%;\n    height: 3px;\n    background: rgba(0, 0, 0, 0.5);\n    border: 0;\n    border-radius: 3px;\n}\n.cr-slider::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    border: none;\n    height: 16px;\n    width: 16px;\n    border-radius: 50%;\n    background: #ddd;\n    margin-top: -6px;\n}\n.cr-slider:focus {\n    outline: none;\n}\n/*\n.cr-slider:focus::-webkit-slider-runnable-track {\n    background: #ccc;\n}\n*/\n\n.cr-slider::-moz-range-track {\n    width: 100%;\n    height: 3px;\n    background: rgba(0, 0, 0, 0.5);\n    border: 0;\n    border-radius: 3px;\n}\n.cr-slider::-moz-range-thumb {\n    border: none;\n    height: 16px;\n    width: 16px;\n    border-radius: 50%;\n    background: #ddd;\n    margin-top: -6px;\n}\n\n/*hide the outline behind the border*/\n.cr-slider:-moz-focusring{\n    outline: 1px solid white;\n    outline-offset: -1px;\n}\n\n.cr-slider::-ms-track {\n    width: 300px;\n    height: 5px;\n    background: transparent;/*remove bg colour from the track, we'll use ms-fill-lower and ms-fill-upper instead */\n    border-color: transparent;/*leave room for the larger thumb to overflow with a transparent border */\n    border-width: 6px 0;\n    color: transparent;/*remove default tick marks*/\n}\n.cr-slider::-ms-fill-lower {\n    background: rgba(0, 0, 0, 0.5);\n    border-radius: 10px;\n}\n.cr-slider::-ms-fill-upper {\n    background: rgba(0, 0, 0, 0.5);\n    border-radius: 10px;\n}\n.cr-slider::-ms-thumb {\n    border: none;\n    height: 16px;\n    width: 16px;\n    border-radius: 50%;\n    background: #ddd;\n}\n.cr-slider:focus::-ms-fill-lower {\n    background: rgba(0, 0, 0, 0.5);\n}\n.cr-slider:focus::-ms-fill-upper {\n    background: rgba(0, 0, 0, 0.5);\n}\n/*******************************************/\n\n/***********************************/\n/* Rotation Tools */\n/***********************************/\n.cr-rotate-controls {\n    position: absolute;\n    bottom: 5px;\n    left: 5px;\n    z-index: 1;\n}\n.cr-rotate-controls button {\n    border: 0;\n    background: none;\n}\n.cr-rotate-controls i:before {\n    display: inline-block;\n    font-style: normal;\n    font-weight: 900;\n    font-size: 22px;\n}\n.cr-rotate-l i:before {\n    content: '\\21BA';\n}\n.cr-rotate-r i:before {\n    content: '\\21BB';\n}\n", ""]);
	
	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(setImmediate, __webpack_provided_window_dot_EXIF) {/*************************
	 * Croppie
	 * Copyright 2016
	 * Foliotek
	 * Version: 2.3.0
	 *************************/
	(function (root, factory) {
	    if (true) {
	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
	        // CommonJS
	        factory(exports);
	    } else {
	        // Browser globals
	        factory((root.commonJsStrict = {}));
	    }
	}(this, function (exports) {
	
	    /* Polyfills */
	    if (typeof Promise !== 'function') {
	        /*! promise-polyfill 3.1.0 */
	        !function(a){function b(a,b){return function(){a.apply(b,arguments)}}function c(a){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof a)throw new TypeError("not a function");this._state=null,this._value=null,this._deferreds=[],i(a,b(e,this),b(f,this))}function d(a){var b=this;return null===this._state?void this._deferreds.push(a):void k(function(){var c=b._state?a.onFulfilled:a.onRejected;if(null===c)return void(b._state?a.resolve:a.reject)(b._value);var d;try{d=c(b._value)}catch(e){return void a.reject(e)}a.resolve(d)})}function e(a){try{if(a===this)throw new TypeError("A promise cannot be resolved with itself.");if(a&&("object"==typeof a||"function"==typeof a)){var c=a.then;if("function"==typeof c)return void i(b(c,a),b(e,this),b(f,this))}this._state=!0,this._value=a,g.call(this)}catch(d){f.call(this,d)}}function f(a){this._state=!1,this._value=a,g.call(this)}function g(){for(var a=0,b=this._deferreds.length;b>a;a++)d.call(this,this._deferreds[a]);this._deferreds=null}function h(a,b,c,d){this.onFulfilled="function"==typeof a?a:null,this.onRejected="function"==typeof b?b:null,this.resolve=c,this.reject=d}function i(a,b,c){var d=!1;try{a(function(a){d||(d=!0,b(a))},function(a){d||(d=!0,c(a))})}catch(e){if(d)return;d=!0,c(e)}}var j=setTimeout,k="function"==typeof setImmediate&&setImmediate||function(a){j(a,1)},l=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)};c.prototype["catch"]=function(a){return this.then(null,a)},c.prototype.then=function(a,b){var e=this;return new c(function(c,f){d.call(e,new h(a,b,c,f))})},c.all=function(){var a=Array.prototype.slice.call(1===arguments.length&&l(arguments[0])?arguments[0]:arguments);return new c(function(b,c){function d(f,g){try{if(g&&("object"==typeof g||"function"==typeof g)){var h=g.then;if("function"==typeof h)return void h.call(g,function(a){d(f,a)},c)}a[f]=g,0===--e&&b(a)}catch(i){c(i)}}if(0===a.length)return b([]);for(var e=a.length,f=0;f<a.length;f++)d(f,a[f])})},c.resolve=function(a){return a&&"object"==typeof a&&a.constructor===c?a:new c(function(b){b(a)})},c.reject=function(a){return new c(function(b,c){c(a)})},c.race=function(a){return new c(function(b,c){for(var d=0,e=a.length;e>d;d++)a[d].then(b,c)})},c._setImmediateFn=function(a){k=a},"undefined"!=typeof module&&module.exports?module.exports=c:a.Promise||(a.Promise=c)}(this);
	    }
	
	    if ( typeof window.CustomEvent !== "function" ) {
	        (function(){
	            function CustomEvent ( event, params ) {
	                params = params || { bubbles: false, cancelable: false, detail: undefined };
	                var evt = document.createEvent( 'CustomEvent' );
	                evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
	                return evt;
	            }
	            CustomEvent.prototype = window.Event.prototype;
	            window.CustomEvent = CustomEvent;
	        }());
	    }
	    /* End Polyfills */
	
	    var cssPrefixes = ['Webkit', 'Moz', 'ms'],
	        emptyStyles = document.createElement('div').style,
	        CSS_TRANS_ORG,
	        CSS_TRANSFORM,
	        CSS_USERSELECT;
	
	    function vendorPrefix(prop) {
	        if (prop in emptyStyles) {
	            return prop;
	        }
	
	        var capProp = prop[0].toUpperCase() + prop.slice(1),
	            i = cssPrefixes.length;
	
	        while (i--) {
	            prop = cssPrefixes[i] + capProp;
	            if (prop in emptyStyles) {
	                return prop;
	            }
	        }
	    }
	
	    CSS_TRANSFORM = vendorPrefix('transform');
	    CSS_TRANS_ORG = vendorPrefix('transformOrigin');
	    CSS_USERSELECT = vendorPrefix('userSelect');
	
	    // Credits to : Andrew Dupont - http://andrewdupont.net/2009/08/28/deep-extending-objects-in-javascript/
	    function deepExtend(destination, source) {
	        destination = destination || {};
	        for (var property in source) {
	            if (source[property] && source[property].constructor && source[property].constructor === Object) {
	                destination[property] = destination[property] || {};
	                deepExtend(destination[property], source[property]);
	            } else {
	                destination[property] = source[property];
	            }
	        }
	        return destination;
	    }
	
	    function debounce(func, wait, immediate) {
	        var timeout;
	        return function () {
	            var context = this, args = arguments;
	            var later = function () {
	                timeout = null;
	                if (!immediate) func.apply(context, args);
	            };
	            var callNow = immediate && !timeout;
	            clearTimeout(timeout);
	            timeout = setTimeout(later, wait);
	            if (callNow) func.apply(context, args);
	        };
	    }
	
	    function dispatchChange(element) {
	        if ("createEvent" in document) {
	            var evt = document.createEvent("HTMLEvents");
	            evt.initEvent("change", false, true);
	            element.dispatchEvent(evt);
	        }
	        else {
	            element.fireEvent("onchange");
	        }
	    }
	
	    //http://jsperf.com/vanilla-css
	    function css(el, styles, val) {
	        if (typeof (styles) === 'string') {
	            var tmp = styles;
	            styles = {};
	            styles[tmp] = val;
	        }
	
	        for (var prop in styles) {
	            el.style[prop] = styles[prop];
	        }
	    }
	
	    function addClass(el, c) {
	        if (el.classList) {
	            el.classList.add(c);
	        }
	        else {
	            el.className += ' ' + c;
	        }
	    }
	
	    function removeClass(el, c) {
	        if (el.classList) {
	            el.classList.remove(c);
	        }
	        else {
	            el.className = el.className.replace(c, '');
	        }
	    }
	
	    /* Utilities */
	    function loadImage(src, imageEl) {
	        var img = imageEl || new Image(),
	            prom;
	
	        if (img.src === src) {
	            // If image source hasn't changed, return a promise that resolves immediately
	            prom = new Promise(function (resolve, reject) {
	                resolve(img);
	            });
	        } else {
	            prom = new Promise(function (resolve, reject) {
	                if (src.substring(0,4).toLowerCase() === 'http') {
	                    img.setAttribute('crossOrigin', 'anonymous');
	                }
	                img.onload = function () {
	                    setTimeout(function () {
	                        resolve(img);
	                    }, 1);
	                };
	            });
	
	            img.src = src;
	        }
	
	        img.style.opacity = 0;
	
	        return prom;
	    }
	
	    /* CSS Transform Prototype */
	    var _TRANSLATE = 'translate3d',
	        _TRANSLATE_SUFFIX = ', 0px';
	    var Transform = function (x, y, scale) {
	        this.x = parseFloat(x);
	        this.y = parseFloat(y);
	        this.scale = parseFloat(scale);
	    };
	
	    Transform.parse = function (v) {
	        if (v.style) {
	            return Transform.parse(v.style[CSS_TRANSFORM]);
	        }
	        else if (v.indexOf('matrix') > -1 || v.indexOf('none') > -1) {
	            return Transform.fromMatrix(v);
	        }
	        else {
	            return Transform.fromString(v);
	        }
	    };
	
	    Transform.fromMatrix = function (v) {
	        var vals = v.substring(7).split(',');
	        if (!vals.length || v === 'none') {
	            vals = [1, 0, 0, 1, 0, 0];
	        }
	
	        return new Transform(parseInt(vals[4], 10), parseInt(vals[5], 10), parseFloat(vals[0]));
	    };
	
	    Transform.fromString = function (v) {
	        var values = v.split(') '),
	            translate = values[0].substring(_TRANSLATE.length + 1).split(','),
	            scale = values.length > 1 ? values[1].substring(6) : 1,
	            x = translate.length > 1 ? translate[0] : 0,
	            y = translate.length > 1 ? translate[1] : 0;
	
	        return new Transform(x, y, scale);
	    };
	
	    Transform.prototype.toString = function () {
	        return _TRANSLATE + '(' + this.x + 'px, ' + this.y + 'px' + _TRANSLATE_SUFFIX + ') scale(' + this.scale + ')';
	    };
	
	    var TransformOrigin = function (el) {
	        if (!el || !el.style[CSS_TRANS_ORG]) {
	            this.x = 0;
	            this.y = 0;
	            return;
	        }
	        var css = el.style[CSS_TRANS_ORG].split(' ');
	        this.x = parseFloat(css[0]);
	        this.y = parseFloat(css[1]);
	    };
	
	    TransformOrigin.prototype.toString = function () {
	        return this.x + 'px ' + this.y + 'px';
	    };
	
	    function getExifOrientation (img, cb) {
	        if (!__webpack_provided_window_dot_EXIF) {
	            cb(0);
	        }
	
	        EXIF.getData(img, function () {
	            var orientation = EXIF.getTag(this, 'Orientation');
	            cb(orientation);
	        });
	    }
	
	    function drawCanvas(canvas, img, orientation) {
	        var width = img.width,
	            height = img.height,
	            ctx = canvas.getContext('2d');
	
	        canvas.width = img.width;
	        canvas.height = img.height;
	
	        ctx.save();
	        switch (orientation) {
	          case 2:
	             ctx.translate(width, 0);
	             ctx.scale(-1, 1);
	             break;
	
	          case 3:
	              ctx.translate(width, height);
	              ctx.rotate(180*Math.PI/180);
	              break;
	
	          case 4:
	              ctx.translate(0, height);
	              ctx.scale(1, -1);
	              break;
	
	          case 5:
	              canvas.width = height;
	              canvas.height = width;
	              ctx.rotate(90*Math.PI/180);
	              ctx.scale(1, -1);
	              break;
	
	          case 6:
	              canvas.width = height;
	              canvas.height = width;
	              ctx.rotate(90*Math.PI/180);
	              ctx.translate(0, -height);
	              break;
	
	          case 7:
	              canvas.width = height;
	              canvas.height = width;
	              ctx.rotate(-90*Math.PI/180);
	              ctx.translate(-width, height);
	              ctx.scale(1, -1);
	              break;
	
	          case 8:
	              canvas.width = height;
	              canvas.height = width;
	              ctx.translate(0, width);
	              ctx.rotate(-90*Math.PI/180);
	              break;
	        }
	        ctx.drawImage(img, 0,0, width, height);
	        ctx.restore();
	    }
	
	    /* Private Methods */
	    function _create() {
	        var self = this,
	            contClass = 'croppie-container',
	            customViewportClass = self.options.viewport.type ? 'cr-vp-' + self.options.viewport.type : null,
	            boundary, img, viewport, overlay, canvas;
	
	        self.options.useCanvas = self.options.enableOrientation || _hasExif.call(self);
	        // Properties on class
	        self.data = {};
	        self.elements = {};
	
	        // Generating Markup
	        boundary = self.elements.boundary = document.createElement('div');
	        viewport = self.elements.viewport = document.createElement('div');
	        img = self.elements.img = document.createElement('img');
	        overlay = self.elements.overlay = document.createElement('div');
	
	        if (self.options.useCanvas) {
	            self.elements.canvas = document.createElement('canvas');
	            self.elements.preview = self.elements.canvas;
	        }
	        else {
	            self.elements.preview = self.elements.img;
	        }
	
	        addClass(boundary, 'cr-boundary');
	        css(boundary, {
	            width: self.options.boundary.width + 'px',
	            height: self.options.boundary.height + 'px'
	        });
	
	        addClass(viewport, 'cr-viewport');
	        if (customViewportClass) {
	            addClass(viewport, customViewportClass);
	        }
	        css(viewport, {
	            width: self.options.viewport.width + 'px',
	            height: self.options.viewport.height + 'px'
	        });
	        viewport.setAttribute('tabindex', 0);
	
	        addClass(self.elements.preview, 'cr-image');
	        addClass(overlay, 'cr-overlay');
	
	        self.element.appendChild(boundary);
	        boundary.appendChild(self.elements.preview);
	        boundary.appendChild(viewport);
	        boundary.appendChild(overlay);
	
	        addClass(self.element, contClass);
	        if (self.options.customClass) {
	            addClass(self.element, self.options.customClass);
	        }
	
	        // Initialize drag & zoom
	        _initDraggable.call(this);
	
	        if (self.options.enableZoom) {
	            _initializeZoom.call(self);
	        }
	
	        // if (self.options.enableOrientation) {
	        //     _initRotationControls.call(self);
	        // }
	    }
	
	    function _initRotationControls () {
	        // TODO - Not a fan of these controls
	        return;
	        var self = this,
	            wrap, btnLeft, btnRight, iLeft, iRight;
	
	        wrap = document.createElement('div');
	        self.elements.orientationBtnLeft = btnLeft = document.createElement('button');
	        self.elements.orientationBtnRight = btnRight = document.createElement('button');
	
	        wrap.appendChild(btnLeft);
	        wrap.appendChild(btnRight);
	
	        iLeft = document.createElement('i');
	        iRight = document.createElement('i');
	        btnLeft.appendChild(iLeft);
	        btnRight.appendChild(iRight);
	
	        addClass(wrap, 'cr-rotate-controls');
	        addClass(btnLeft, 'cr-rotate-l');
	        addClass(btnRight, 'cr-rotate-r');
	
	        self.elements.boundary.appendChild(wrap);
	
	        btnLeft.addEventListener('click', function () {
	            self.rotate(-90);
	        });
	        btnRight.addEventListener('click', function () {
	            self.rotate(90);
	        });
	    }
	
	    function _hasExif() {
	        // todo - remove options.exif after deprecation
	        return this.options.enableExif && __webpack_provided_window_dot_EXIF;
	    }
	
	    function _setZoomerVal(v) {
	        if (this.options.enableZoom) {
	            var z = this.elements.zoomer,
	                val = fix(v, 4);
	
	            z.value = Math.max(z.min, Math.min(z.max, val));
	        }
	    }
	
	    function _initializeZoom() {
	        var self = this,
	            wrap = self.elements.zoomerWrap = document.createElement('div'),
	            zoomer = self.elements.zoomer = document.createElement('input');
	
	        addClass(wrap, 'cr-slider-wrap');
	        addClass(zoomer, 'cr-slider');
	        zoomer.type = 'range';
	        zoomer.step = '0.0001';
	        zoomer.value = 1;
	        zoomer.style.display = self.options.showZoomer ? '' : 'none';
	
	        self.element.appendChild(wrap);
	        wrap.appendChild(zoomer);
	
	        self._currentZoom = 1;
	
	        function change() {
	            _onZoom.call(self, {
	                value: parseFloat(zoomer.value),
	                origin: new TransformOrigin(self.elements.preview),
	                viewportRect: self.elements.viewport.getBoundingClientRect(),
	                transform: Transform.parse(self.elements.preview)
	            });
	        }
	
	        function scroll(ev) {
	            var delta, targetZoom;
	
	            if (ev.wheelDelta) {
	                delta = ev.wheelDelta / 1200; //wheelDelta min: -120 max: 120 // max x 10 x 2
	            } else if (ev.deltaY) {
	                delta = ev.deltaY / 1060; //deltaY min: -53 max: 53 // max x 10 x 2
	            } else if (ev.detail) {
	                delta = ev.detail / -60; //delta min: -3 max: 3 // max x 10 x 2
	            } else {
	                delta = 0;
	            }
	
	            targetZoom = self._currentZoom + delta;
	
	            ev.preventDefault();
	            _setZoomerVal.call(self, targetZoom);
	            change.call(self);
	        }
	
	        self.elements.zoomer.addEventListener('input', change);// this is being fired twice on keypress
	        self.elements.zoomer.addEventListener('change', change);
	
	        if (self.options.mouseWheelZoom) {
	            self.elements.boundary.addEventListener('mousewheel', scroll);
	            self.elements.boundary.addEventListener('DOMMouseScroll', scroll);
	        }
	    }
	
	    function _onZoom(ui) {
	        var self = this,
	            transform = ui ? ui.transform : Transform.parse(self.elements.preview),
	            vpRect = ui ? ui.viewportRect : self.elements.viewport.getBoundingClientRect(),
	            origin = ui ? ui.origin : new TransformOrigin(self.elements.preview),
	            transCss = {};
	
	        function applyCss() {
	            var transCss = {};
	            transCss[CSS_TRANSFORM] = transform.toString();
	            transCss[CSS_TRANS_ORG] = origin.toString();
	            css(self.elements.preview, transCss);
	        }
	
	        self._currentZoom = ui ? ui.value : self._currentZoom;
	        transform.scale = self._currentZoom;
	        applyCss();
	
	
	        if (self.options.enforceBoundary) {
	            var boundaries = _getVirtualBoundaries.call(self, vpRect),
	                transBoundaries = boundaries.translate,
	                oBoundaries = boundaries.origin;
	
	            if (transform.x >= transBoundaries.maxX) {
	                origin.x = oBoundaries.minX;
	                transform.x = transBoundaries.maxX;
	            }
	
	            if (transform.x <= transBoundaries.minX) {
	                origin.x = oBoundaries.maxX;
	                transform.x = transBoundaries.minX;
	            }
	
	            if (transform.y >= transBoundaries.maxY) {
	                origin.y = oBoundaries.minY;
	                transform.y = transBoundaries.maxY;
	            }
	
	            if (transform.y <= transBoundaries.minY) {
	                origin.y = oBoundaries.maxY;
	                transform.y = transBoundaries.minY;
	            }
	        }
	        applyCss();
	        _debouncedOverlay.call(self);
	        _triggerUpdate.call(self);
	    }
	
	    function _getVirtualBoundaries(viewport) {
	        var self = this,
	            scale = self._currentZoom,
	            vpWidth = viewport.width,
	            vpHeight = viewport.height,
	            centerFromBoundaryX = self.options.boundary.width / 2,
	            centerFromBoundaryY = self.options.boundary.height / 2,
	            imgRect = self.elements.preview.getBoundingClientRect(),
	            curImgWidth = imgRect.width,
	            curImgHeight = imgRect.height,
	            halfWidth = vpWidth / 2,
	            halfHeight = vpHeight / 2;
	
	        var maxX = ((halfWidth / scale) - centerFromBoundaryX) * -1;
	        var minX = maxX - ((curImgWidth * (1 / scale)) - (vpWidth * (1 / scale)));
	
	        var maxY = ((halfHeight / scale) - centerFromBoundaryY) * -1;
	        var minY = maxY - ((curImgHeight * (1 / scale)) - (vpHeight * (1 / scale)));
	
	        var originMinX = (1 / scale) * halfWidth;
	        var originMaxX = (curImgWidth * (1 / scale)) - originMinX;
	
	        var originMinY = (1 / scale) * halfHeight;
	        var originMaxY = (curImgHeight * (1 / scale)) - originMinY;
	
	        return {
	            translate: {
	                maxX: maxX,
	                minX: minX,
	                maxY: maxY,
	                minY: minY
	            },
	            origin: {
	                maxX: originMaxX,
	                minX: originMinX,
	                maxY: originMaxY,
	                minY: originMinY
	            }
	        };
	    }
	
	    function _updateCenterPoint() {
	        var self = this,
	            scale = self._currentZoom,
	            data = self.elements.preview.getBoundingClientRect(),
	            vpData = self.elements.viewport.getBoundingClientRect(),
	            transform = Transform.parse(self.elements.preview.style[CSS_TRANSFORM]),
	            pc = new TransformOrigin(self.elements.preview),
	            top = (vpData.top - data.top) + (vpData.height / 2),
	            left = (vpData.left - data.left) + (vpData.width / 2),
	            center = {},
	            adj = {};
	
	        center.y = top / scale;
	        center.x = left / scale;
	
	        adj.y = (center.y - pc.y) * (1 - scale);
	        adj.x = (center.x - pc.x) * (1 - scale);
	
	        transform.x -= adj.x;
	        transform.y -= adj.y;
	
	        var newCss = {};
	        newCss[CSS_TRANS_ORG] = center.x + 'px ' + center.y + 'px';
	        newCss[CSS_TRANSFORM] = transform.toString();
	        css(self.elements.preview, newCss);
	    }
	
	    function _initDraggable() {
	        var self = this,
	            isDragging = false,
	            originalX,
	            originalY,
	            originalDistance,
	            vpRect,
	            transform;
	
	        function assignTransformCoordinates(deltaX, deltaY) {
	            var imgRect = self.elements.preview.getBoundingClientRect(),
	                top = transform.y + deltaY,
	                left = transform.x + deltaX;
	
	            if (self.options.enforceBoundary) {
	                if (vpRect.top > imgRect.top + deltaY && vpRect.bottom < imgRect.bottom + deltaY) {
	                    transform.y = top;
	                }
	
	                if (vpRect.left > imgRect.left + deltaX && vpRect.right < imgRect.right + deltaX) {
	                    transform.x = left;
	                }
	            }
	            else {
	                transform.y = top;
	                transform.x = left;
	            }
	        }
	
	        function keyDown(ev) {
	            var LEFT_ARROW  = 37,
	                UP_ARROW    = 38,
	                RIGHT_ARROW = 39,
	                DOWN_ARROW  = 40;
	
	            if (ev.shiftKey && (ev.keyCode == UP_ARROW || ev.keyCode == DOWN_ARROW)) {
	                var zoom = 0.0;
	                if (ev.keyCode == UP_ARROW) {
	                    zoom = parseFloat(self.elements.zoomer.value, 10) + parseFloat(self.elements.zoomer.step, 10)
	                }
	                else {
	                    zoom = parseFloat(self.elements.zoomer.value, 10) - parseFloat(self.elements.zoomer.step, 10)
	                }
	                self.setZoom(zoom);
	            }
	            else if (ev.keyCode >= 37 && ev.keyCode <= 40) {
	                ev.preventDefault();
	                var movement = parseKeyDown(ev.keyCode);
	
	                transform = Transform.parse(self.elements.preview);
	                document.body.style[CSS_USERSELECT] = 'none';
	                vpRect = self.elements.viewport.getBoundingClientRect();
	                keyMove(movement);
	            };
	
	            function parseKeyDown(key) {
	                switch (key) {
	                    case LEFT_ARROW:
	                        return [1, 0];
	                    case UP_ARROW:
	                        return [0, 1];
	                    case RIGHT_ARROW:
	                        return [-1, 0];
	                    case DOWN_ARROW:
	                        return [0, -1];
	                };
	            };
	        }
	
	        function keyMove(movement) {
	            var deltaX = movement[0],
	                deltaY = movement[1],
	                newCss = {};
	
	            assignTransformCoordinates(deltaX, deltaY);
	
	            newCss[CSS_TRANSFORM] = transform.toString();
	            css(self.elements.preview, newCss);
	            _updateOverlay.call(self);
	            document.body.style[CSS_USERSELECT] = '';
	            _updateCenterPoint.call(self);
	            _triggerUpdate.call(self);
	            originalDistance = 0;
	        }
	
	        function mouseDown(ev) {
	            ev.preventDefault();
	            if (isDragging) return;
	            isDragging = true;
	            originalX = ev.pageX;
	            originalY = ev.pageY;
	
	            if (ev.touches) {
	                var touches = ev.touches[0];
	                originalX = touches.pageX;
	                originalY = touches.pageY;
	            }
	
	            transform = Transform.parse(self.elements.preview);
	            window.addEventListener('mousemove', mouseMove);
	            window.addEventListener('touchmove', mouseMove);
	            window.addEventListener('mouseup', mouseUp);
	            window.addEventListener('touchend', mouseUp);
	            document.body.style[CSS_USERSELECT] = 'none';
	            vpRect = self.elements.viewport.getBoundingClientRect();
	        }
	
	        function mouseMove(ev) {
	            ev.preventDefault();
	            var pageX = ev.pageX,
	                pageY = ev.pageY;
	
	            if (ev.touches) {
	                var touches = ev.touches[0];
	                pageX = touches.pageX;
	                pageY = touches.pageY;
	            }
	
	            var deltaX = pageX - originalX,
	                deltaY = pageY - originalY,
	                newCss = {};
	
	            if (ev.type == 'touchmove') {
	                if (ev.touches.length > 1) {
	                    var touch1 = ev.touches[0];
	                    var touch2 = ev.touches[1];
	                    var dist = Math.sqrt((touch1.pageX - touch2.pageX) * (touch1.pageX - touch2.pageX) + (touch1.pageY - touch2.pageY) * (touch1.pageY - touch2.pageY));
	
	                    if (!originalDistance) {
	                        originalDistance = dist / self._currentZoom;
	                    }
	
	                    var scale = dist / originalDistance;
	
	                    _setZoomerVal.call(self, scale);
	                    dispatchChange(self.elements.zoomer);
	                    return;
	                }
	            }
	
	            assignTransformCoordinates(deltaX, deltaY);
	
	            newCss[CSS_TRANSFORM] = transform.toString();
	            css(self.elements.preview, newCss);
	            _updateOverlay.call(self);
	            originalY = pageY;
	            originalX = pageX;
	        }
	
	        function mouseUp() {
	            isDragging = false;
	            window.removeEventListener('mousemove', mouseMove);
	            window.removeEventListener('touchmove', mouseMove);
	            window.removeEventListener('mouseup', mouseUp);
	            window.removeEventListener('touchend', mouseUp);
	            document.body.style[CSS_USERSELECT] = '';
	            _updateCenterPoint.call(self);
	            _triggerUpdate.call(self);
	            originalDistance = 0;
	        }
	
	        self.elements.overlay.addEventListener('mousedown', mouseDown);
	        self.elements.viewport.addEventListener('keydown', keyDown);
	        self.elements.overlay.addEventListener('touchstart', mouseDown);
	    }
	
	    function _updateOverlay() {
	        var self = this,
	            boundRect = self.elements.boundary.getBoundingClientRect(),
	            imgData = self.elements.preview.getBoundingClientRect();
	
	        css(self.elements.overlay, {
	            width: imgData.width + 'px',
	            height: imgData.height + 'px',
	            top: (imgData.top - boundRect.top) + 'px',
	            left: (imgData.left - boundRect.left) + 'px'
	        });
	    }
	    var _debouncedOverlay = debounce(_updateOverlay, 500);
	
	    function _triggerUpdate() {
	        var self = this,
	            data = self.get(),
	            ev; 
	
	        if (!_isVisible.call(self)) {
	            return;
	        }
	
	        self.options.update.call(self, data);
	        if (self.$) {
	            self.$(self.element).trigger('update', data)
	        }
	        else {
	            var ev;
	            if (window.CustomEvent) {
	                ev = new CustomEvent('update', { detail: data });
	            } else {
	                ev = document.createEvent('CustomEvent');
	                ev.initCustomEvent('update', true, true, data);
	            }
	
	            self.element.dispatchEvent(ev);
	        }
	    }
	
	    function _isVisible() {
	        return this.elements.preview.offsetHeight > 0 && this.elements.preview.offsetWidth > 0;
	    }
	
	    function _updatePropertiesFromImage() {
	        var self = this,
	            minZoom = 0,
	            maxZoom = 1.5,
	            initialZoom = 1,
	            cssReset = {},
	            img = self.elements.preview,
	            zoomer = self.elements.zoomer,
	            transformReset = new Transform(0, 0, initialZoom),
	            originReset = new TransformOrigin(),
	            isVisible = _isVisible.call(self),
	            imgData,
	            vpData,
	            boundaryData,
	            minW,
	            minH;
	
	        if (!isVisible || self.data.bound) {
	            // if the croppie isn't visible or it doesn't need binding
	            return;
	        }
	
	        self.data.bound = true;
	        cssReset[CSS_TRANSFORM] = transformReset.toString();
	        cssReset[CSS_TRANS_ORG] = originReset.toString();
	        cssReset['opacity'] = 1;
	        css(img, cssReset);
	
	        imgData = img.getBoundingClientRect();
	        vpData = self.elements.viewport.getBoundingClientRect();
	        boundaryData = self.elements.boundary.getBoundingClientRect();
	        self._originalImageWidth = imgData.width;
	        self._originalImageHeight = imgData.height;
	
	        if (self.options.enableZoom) {
	            if (self.options.enforceBoundary) {
	                minW = vpData.width / imgData.width;
	                minH = vpData.height / imgData.height;
	                minZoom = Math.max(minW, minH);
	            }
	
	            if (minZoom >= maxZoom) {
	                maxZoom = minZoom + 1;
	            }
	
	            zoomer.min = fix(minZoom, 4);
	            zoomer.max = fix(maxZoom, 4);
	            var defaultInitialZoom = Math.max((boundaryData.width / imgData.width), (boundaryData.height / imgData.height));
	            initialZoom = self.data.boundZoom !== null ? self.data.boundZoom : defaultInitialZoom;
	            _setZoomerVal.call(self, initialZoom);
	            dispatchChange(zoomer);
	        }
	        else {
	            self._currentZoom = initialZoom;
	        }
	        
	        transformReset.scale = self._currentZoom;
	        cssReset[CSS_TRANSFORM] = transformReset.toString();
	        css(img, cssReset);
	
	        if (self.data.points.length) {
	            _bindPoints.call(self, self.data.points);
	        }
	        else {
	            _centerImage.call(self);
	        }
	
	        _updateCenterPoint.call(self);
	        _updateOverlay.call(self);
	    }
	
	    function _bindPoints(points) {
	        if (points.length != 4) {
	            throw "Croppie - Invalid number of points supplied: " + points;
	        }
	        var self = this,
	            pointsWidth = points[2] - points[0],
	            // pointsHeight = points[3] - points[1],
	            vpData = self.elements.viewport.getBoundingClientRect(),
	            boundRect = self.elements.boundary.getBoundingClientRect(),
	            vpOffset = {
	                left: vpData.left - boundRect.left,
	                top: vpData.top - boundRect.top
	            },
	            scale = vpData.width / pointsWidth,
	            originTop = points[1],
	            originLeft = points[0],
	            transformTop = (-1 * points[1]) + vpOffset.top,
	            transformLeft = (-1 * points[0]) + vpOffset.left,
	            newCss = {};
	
	        newCss[CSS_TRANS_ORG] = originLeft + 'px ' + originTop + 'px';
	        newCss[CSS_TRANSFORM] = new Transform(transformLeft, transformTop, scale).toString();
	        css(self.elements.preview, newCss);
	
	        _setZoomerVal.call(self, scale);
	        self._currentZoom = scale;
	    }
	
	    function _centerImage() {
	        var self = this,
	            imgDim = self.elements.preview.getBoundingClientRect(),
	            vpDim = self.elements.viewport.getBoundingClientRect(),
	            boundDim = self.elements.boundary.getBoundingClientRect(),
	            vpLeft = vpDim.left - boundDim.left,
	            vpTop = vpDim.top - boundDim.top,
	            w = vpLeft - ((imgDim.width - vpDim.width) / 2),
	            h = vpTop - ((imgDim.height - vpDim.height) / 2),
	            transform = new Transform(w, h, self._currentZoom);
	
	        css(self.elements.preview, CSS_TRANSFORM, transform.toString());
	    }
	
	    function _transferImageToCanvas(customOrientation) {
	        var self = this,
	            canvas = self.elements.canvas,
	            img = self.elements.img,
	            ctx = canvas.getContext('2d'),
	            exif = _hasExif.call(self),
	            customOrientation = self.options.enableOrientation && customOrientation;
	
	        ctx.clearRect(0, 0, canvas.width, canvas.height);
	        canvas.width = img.width;
	        canvas.height = img.height;
	
	        if (exif) {
	            getExifOrientation(img, function (orientation) {
	                drawCanvas(canvas, img, parseInt(orientation));
	                if (customOrientation) {
	                    drawCanvas(canvas, img, customOrientation);
	                }
	            });
	        } else if (customOrientation) {
	            drawCanvas(canvas, img, customOrientation);
	        }
	    }
	
	    function _getHtmlResult(data) {
	        var points = data.points,
	            div = document.createElement('div'),
	            img = document.createElement('img'),
	            width = points[2] - points[0],
	            height = points[3] - points[1];
	
	        addClass(div, 'croppie-result');
	        div.appendChild(img);
	        css(img, {
	            left: (-1 * points[0]) + 'px',
	            top: (-1 * points[1]) + 'px'
	        });
	        img.src = data.url;
	        css(div, {
	            width: width + 'px',
	            height: height + 'px'
	        });
	
	        return div;
	    }
	
	    function _getCanvasResult(img, data) {
	        var points = data.points,
	            left = points[0],
	            top = points[1],
	            width = (points[2] - points[0]),
	            height = (points[3] - points[1]),
	            circle = data.circle,
	            canvas = document.createElement('canvas'),
	            ctx = canvas.getContext('2d'),
	            outWidth = width,
	            outHeight = height;
	
	        if (data.outputWidth && data.outputHeight) {
	            outWidth = data.outputWidth;
	            outHeight = data.outputHeight;
	        }
	
	        canvas.width = outWidth;
	        canvas.height = outHeight;
	
	        if (data.backgroundColor) {
	            ctx.fillStyle = data.backgroundColor;
	            ctx.fillRect(0, 0, outWidth, outHeight);
	        }
	        ctx.drawImage(img, left, top, width, height, 0, 0, outWidth, outHeight);
	        if (circle) {
	            ctx.fillStyle = '#fff';
	            ctx.globalCompositeOperation = 'destination-in';
	            ctx.beginPath();
	            ctx.arc(outWidth / 2, outHeight / 2, outWidth / 2, 0, Math.PI * 2, true);
	            ctx.closePath();
	            ctx.fill();
	        }
	        return canvas.toDataURL(data.format, data.quality);
	    }
	
	    function _bind(options, cb) {
	        var self = this,
	            url,
	            points = [],
	            zoom = null;
	
	        if (typeof (options) === 'string') {
	            url = options;
	            options = {};
	        }
	        else if (Array.isArray(options)) {
	            points = options.slice();
	        }
	        else if (typeof (options) == 'undefined' && self.data.url) { //refreshing
	            _updatePropertiesFromImage.call(self);
	            _triggerUpdate.call(self);
	            return null;
	        }
	        else {
	            url = options.url;
	            points = options.points || [];
	            zoom = typeof(options.zoom) === 'undefined' ? null : options.zoom;
	        }
	
	        self.data.bound = false;
	        self.data.url = url || self.data.url;
	        self.data.points = (points || self.data.points).map(function (p) {
	            return parseFloat(p);
	        });
	        self.data.boundZoom = zoom;
	        var prom = loadImage(url, self.elements.img);
	        prom.then(function () {
	            if (self.options.useCanvas) {
	                self.elements.img.exifdata = null;
	                _transferImageToCanvas.call(self, options.orientation || 1);
	            }
	            _updatePropertiesFromImage.call(self);
	            _triggerUpdate.call(self);
	            if (cb) {
	                cb();
	            }
	        });
	        return prom;
	    }
	
	    function fix(v, decimalPoints) {
	        return parseFloat(v).toFixed(decimalPoints || 0);
	    }
	
	    function _get() {
	        var self = this,
	            imgData = self.elements.preview.getBoundingClientRect(),
	            vpData = self.elements.viewport.getBoundingClientRect(),
	            x1 = vpData.left - imgData.left,
	            y1 = vpData.top - imgData.top,
	            widthDiff = (vpData.width - self.elements.viewport.offsetWidth) / 2,
	            heightDiff = (vpData.height - self.elements.viewport.offsetHeight) / 2,
	            x2 = x1 + self.elements.viewport.offsetWidth + widthDiff,
	            y2 = y1 + self.elements.viewport.offsetHeight + heightDiff,
	            scale = self._currentZoom;
	
	        if (scale === Infinity || isNaN(scale)) {
	            scale = 1;
	        }
	
	        var max = self.options.enforceBoundary ? 0 : Number.NEGATIVE_INFINITY;
	        x1 = Math.max(max, x1 / scale);
	        y1 = Math.max(max, y1 / scale);
	        x2 = Math.max(max, x2 / scale);
	        y2 = Math.max(max, y2 / scale);
	
	        return {
	            points: [fix(x1), fix(y1), fix(x2), fix(y2)],
	            zoom: scale
	        };
	    }
	
	    var RESULT_DEFAULTS = {
	            type: 'canvas',
	            format: 'png',
	            quality: 1
	        },
	        RESULT_FORMATS = ['jpeg', 'webp', 'png'];
	
	    function _result(options) {
	        var self = this,
	            data = _get.call(self),
	            opts = deepExtend(RESULT_DEFAULTS, deepExtend({}, options)),
	            type = (typeof (options) === 'string' ? options : (opts.type || 'viewport')),
	            size = opts.size,
	            format = opts.format,
	            quality = opts.quality,
	            backgroundColor = opts.backgroundColor,
	            circle = typeof opts.circle === 'boolean' ? opts.circle : (self.options.viewport.type === 'circle'),
	            vpRect = self.elements.viewport.getBoundingClientRect(),
	            ratio = vpRect.width / vpRect.height,
	            prom;
	
	        if (size === 'viewport') {
	            data.outputWidth = vpRect.width;
	            data.outputHeight = vpRect.height;
	        } else if (typeof size === 'object') {
	            if (size.width && size.height) {
	                data.outputWidth = size.width;
	                data.outputHeight = size.height;
	            } else if (size.width) {
	                data.outputWidth = size.width;
	                data.outputHeight = size.width / ratio;
	            } else if (size.height) {
	                data.outputWidth = size.height * ratio;
	                data.outputHeight = size.height;
	            }
	        }
	
	        if (RESULT_FORMATS.indexOf(format) > -1) {
	            data.format = 'image/' + format;
	            data.quality = quality;
	        }
	
	        data.circle = circle;
	        data.url = self.data.url;
	        data.backgroundColor = backgroundColor;
	
	        prom = new Promise(function (resolve, reject) {
	            if (type === 'canvas') {
	                resolve(_getCanvasResult.call(self, self.elements.preview, data));
	            }
	            else {
	                resolve(_getHtmlResult.call(self, data));
	            }
	        });
	        return prom;
	    }
	
	    function _refresh() {
	        _updatePropertiesFromImage.call(this);
	    }
	
	    function _rotate(deg) {
	        if (!this.options.useCanvas) {
	            throw 'Croppie: Cannot rotate without enableOrientation';
	        }
	
	        var self = this,
	            canvas = self.elements.canvas,
	            img = self.elements.img,
	            copy = document.createElement('canvas'),
	            ornt = 1;
	
	        copy.width = canvas.width;
	        copy.height = canvas.height;
	        var ctx = copy.getContext('2d');
	        ctx.drawImage(canvas, 0, 0);
	
	        if (deg === 90 || deg === -270) ornt = 6;
	        if (deg === -90 || deg === 270) ornt = 8;
	        if (deg === 180 || deg === -180) ornt = 3;
	
	        drawCanvas(canvas, copy, ornt);
	        _onZoom.call(self);
	    }
	
	    function _destroy() {
	        var self = this;
	        self.element.removeChild(self.elements.boundary);
	        removeClass(self.element, 'croppie-container');
	        if (self.options.enableZoom) {
	            self.element.removeChild(self.elements.zoomerWrap);
	        }
	        delete self.elements;
	    }
	
	    if (window.jQuery) {
	        var $ = window.jQuery;
	        $.fn.croppie = function (opts) {
	            var ot = typeof opts;
	
	            if (ot === 'string') {
	                var args = Array.prototype.slice.call(arguments, 1);
	                var singleInst = $(this).data('croppie');
	
	                if (opts === 'get') {
	                    return singleInst.get();
	                }
	                else if (opts === 'result') {
	                    return singleInst.result.apply(singleInst, args);
	                }
	                else if (opts === 'bind') {
	                    return singleInst.bind.apply(singleInst, args);
	                }
	
	                return this.each(function () {
	                    var i = $(this).data('croppie');
	                    if (!i) return;
	
	                    var method = i[opts];
	                    if ($.isFunction(method)) {
	                        method.apply(i, args);
	                        if (opts === 'destroy') {
	                            $(this).removeData('croppie');
	                        }
	                    }
	                    else {
	                        throw 'Croppie ' + opts + ' method not found';
	                    }
	                });
	            }
	            else {
	                return this.each(function () {
	                    var i = new Croppie(this, opts);
	                    i.$ = $;
	                    $(this).data('croppie', i);
	                });
	            }
	        };
	    }
	
	    function Croppie(element, opts) {
	        this.element = element;
	        this.options = deepExtend(deepExtend({}, Croppie.defaults), opts);
	
	        _create.call(this);
	        if (this.options.url) {
	            var bindOpts = {
	                url: this.options.url,
	                points: this.options.points
	            };
	            delete this.options['url'];
	            delete this.options['points'];
	            _bind.call(this, bindOpts);
	        }
	    }
	
	    Croppie.defaults = {
	        viewport: {
	            width: 100,
	            height: 100,
	            type: 'square'
	        },
	        boundary: {
	            width: 300,
	            height: 300
	        },
	        orientationControls: {
	            enabled: true,
	            leftClass: '',
	            rightClass: ''
	        },
	        customClass: '',
	        showZoomer: true,
	        enableZoom: true,
	        mouseWheelZoom: true,
	        enableExif: false,
	        enforceBoundary: true,
	        enableOrientation: false,
	        update: function () { }
	    };
	
	    deepExtend(Croppie.prototype, {
	        bind: function (options, cb) {
	            return _bind.call(this, options, cb);
	        },
	        get: function () {
	            return _get.call(this);
	        },
	        result: function (type) {
	            return _result.call(this, type);
	        },
	        refresh: function () {
	            return _refresh.call(this);
	        },
	        setZoom: function (v) {
	            _setZoomerVal.call(this, v);
	            dispatchChange(this.elements.zoomer);
	        },
	        rotate: function (deg) {
	            _rotate.call(this, deg);
	        },
	        destroy: function () {
	            return _destroy.call(this);
	        }
	    });
	
	    exports.Croppie = window.Croppie = Croppie;
	
	    if (typeof module === 'object' && !!module.exports) {
	        module.exports = Croppie;
	    }
	}));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6).setImmediate, __webpack_require__(8)))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(7).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};
	
	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);
	
	  immediateIds[id] = true;
	
	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });
	
	  return id;
	};
	
	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6).setImmediate, __webpack_require__(6).clearImmediate))

/***/ },
/* 7 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
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
	    var timeout = setTimeout(cleanUpNextTick);
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
	    clearTimeout(timeout);
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
	        setTimeout(drainQueue, 0);
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
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function() {
	
	    var debug = false;
	
	    var root = this;
	
	    var EXIF = function(obj) {
	        if (obj instanceof EXIF) return obj;
	        if (!(this instanceof EXIF)) return new EXIF(obj);
	        this.EXIFwrapped = obj;
	    };
	
	    if (true) {
	        if (typeof module !== 'undefined' && module.exports) {
	            exports = module.exports = EXIF;
	        }
	        exports.EXIF = EXIF;
	    } else {
	        root.EXIF = EXIF;
	    }
	
	    var ExifTags = EXIF.Tags = {
	
	        // version tags
	        0x9000 : "ExifVersion",             // EXIF version
	        0xA000 : "FlashpixVersion",         // Flashpix format version
	
	        // colorspace tags
	        0xA001 : "ColorSpace",              // Color space information tag
	
	        // image configuration
	        0xA002 : "PixelXDimension",         // Valid width of meaningful image
	        0xA003 : "PixelYDimension",         // Valid height of meaningful image
	        0x9101 : "ComponentsConfiguration", // Information about channels
	        0x9102 : "CompressedBitsPerPixel",  // Compressed bits per pixel
	
	        // user information
	        0x927C : "MakerNote",               // Any desired information written by the manufacturer
	        0x9286 : "UserComment",             // Comments by user
	
	        // related file
	        0xA004 : "RelatedSoundFile",        // Name of related sound file
	
	        // date and time
	        0x9003 : "DateTimeOriginal",        // Date and time when the original image was generated
	        0x9004 : "DateTimeDigitized",       // Date and time when the image was stored digitally
	        0x9290 : "SubsecTime",              // Fractions of seconds for DateTime
	        0x9291 : "SubsecTimeOriginal",      // Fractions of seconds for DateTimeOriginal
	        0x9292 : "SubsecTimeDigitized",     // Fractions of seconds for DateTimeDigitized
	
	        // picture-taking conditions
	        0x829A : "ExposureTime",            // Exposure time (in seconds)
	        0x829D : "FNumber",                 // F number
	        0x8822 : "ExposureProgram",         // Exposure program
	        0x8824 : "SpectralSensitivity",     // Spectral sensitivity
	        0x8827 : "ISOSpeedRatings",         // ISO speed rating
	        0x8828 : "OECF",                    // Optoelectric conversion factor
	        0x9201 : "ShutterSpeedValue",       // Shutter speed
	        0x9202 : "ApertureValue",           // Lens aperture
	        0x9203 : "BrightnessValue",         // Value of brightness
	        0x9204 : "ExposureBias",            // Exposure bias
	        0x9205 : "MaxApertureValue",        // Smallest F number of lens
	        0x9206 : "SubjectDistance",         // Distance to subject in meters
	        0x9207 : "MeteringMode",            // Metering mode
	        0x9208 : "LightSource",             // Kind of light source
	        0x9209 : "Flash",                   // Flash status
	        0x9214 : "SubjectArea",             // Location and area of main subject
	        0x920A : "FocalLength",             // Focal length of the lens in mm
	        0xA20B : "FlashEnergy",             // Strobe energy in BCPS
	        0xA20C : "SpatialFrequencyResponse",    //
	        0xA20E : "FocalPlaneXResolution",   // Number of pixels in width direction per FocalPlaneResolutionUnit
	        0xA20F : "FocalPlaneYResolution",   // Number of pixels in height direction per FocalPlaneResolutionUnit
	        0xA210 : "FocalPlaneResolutionUnit",    // Unit for measuring FocalPlaneXResolution and FocalPlaneYResolution
	        0xA214 : "SubjectLocation",         // Location of subject in image
	        0xA215 : "ExposureIndex",           // Exposure index selected on camera
	        0xA217 : "SensingMethod",           // Image sensor type
	        0xA300 : "FileSource",              // Image source (3 == DSC)
	        0xA301 : "SceneType",               // Scene type (1 == directly photographed)
	        0xA302 : "CFAPattern",              // Color filter array geometric pattern
	        0xA401 : "CustomRendered",          // Special processing
	        0xA402 : "ExposureMode",            // Exposure mode
	        0xA403 : "WhiteBalance",            // 1 = auto white balance, 2 = manual
	        0xA404 : "DigitalZoomRation",       // Digital zoom ratio
	        0xA405 : "FocalLengthIn35mmFilm",   // Equivalent foacl length assuming 35mm film camera (in mm)
	        0xA406 : "SceneCaptureType",        // Type of scene
	        0xA407 : "GainControl",             // Degree of overall image gain adjustment
	        0xA408 : "Contrast",                // Direction of contrast processing applied by camera
	        0xA409 : "Saturation",              // Direction of saturation processing applied by camera
	        0xA40A : "Sharpness",               // Direction of sharpness processing applied by camera
	        0xA40B : "DeviceSettingDescription",    //
	        0xA40C : "SubjectDistanceRange",    // Distance to subject
	
	        // other tags
	        0xA005 : "InteroperabilityIFDPointer",
	        0xA420 : "ImageUniqueID"            // Identifier assigned uniquely to each image
	    };
	
	    var TiffTags = EXIF.TiffTags = {
	        0x0100 : "ImageWidth",
	        0x0101 : "ImageHeight",
	        0x8769 : "ExifIFDPointer",
	        0x8825 : "GPSInfoIFDPointer",
	        0xA005 : "InteroperabilityIFDPointer",
	        0x0102 : "BitsPerSample",
	        0x0103 : "Compression",
	        0x0106 : "PhotometricInterpretation",
	        0x0112 : "Orientation",
	        0x0115 : "SamplesPerPixel",
	        0x011C : "PlanarConfiguration",
	        0x0212 : "YCbCrSubSampling",
	        0x0213 : "YCbCrPositioning",
	        0x011A : "XResolution",
	        0x011B : "YResolution",
	        0x0128 : "ResolutionUnit",
	        0x0111 : "StripOffsets",
	        0x0116 : "RowsPerStrip",
	        0x0117 : "StripByteCounts",
	        0x0201 : "JPEGInterchangeFormat",
	        0x0202 : "JPEGInterchangeFormatLength",
	        0x012D : "TransferFunction",
	        0x013E : "WhitePoint",
	        0x013F : "PrimaryChromaticities",
	        0x0211 : "YCbCrCoefficients",
	        0x0214 : "ReferenceBlackWhite",
	        0x0132 : "DateTime",
	        0x010E : "ImageDescription",
	        0x010F : "Make",
	        0x0110 : "Model",
	        0x0131 : "Software",
	        0x013B : "Artist",
	        0x8298 : "Copyright"
	    };
	
	    var GPSTags = EXIF.GPSTags = {
	        0x0000 : "GPSVersionID",
	        0x0001 : "GPSLatitudeRef",
	        0x0002 : "GPSLatitude",
	        0x0003 : "GPSLongitudeRef",
	        0x0004 : "GPSLongitude",
	        0x0005 : "GPSAltitudeRef",
	        0x0006 : "GPSAltitude",
	        0x0007 : "GPSTimeStamp",
	        0x0008 : "GPSSatellites",
	        0x0009 : "GPSStatus",
	        0x000A : "GPSMeasureMode",
	        0x000B : "GPSDOP",
	        0x000C : "GPSSpeedRef",
	        0x000D : "GPSSpeed",
	        0x000E : "GPSTrackRef",
	        0x000F : "GPSTrack",
	        0x0010 : "GPSImgDirectionRef",
	        0x0011 : "GPSImgDirection",
	        0x0012 : "GPSMapDatum",
	        0x0013 : "GPSDestLatitudeRef",
	        0x0014 : "GPSDestLatitude",
	        0x0015 : "GPSDestLongitudeRef",
	        0x0016 : "GPSDestLongitude",
	        0x0017 : "GPSDestBearingRef",
	        0x0018 : "GPSDestBearing",
	        0x0019 : "GPSDestDistanceRef",
	        0x001A : "GPSDestDistance",
	        0x001B : "GPSProcessingMethod",
	        0x001C : "GPSAreaInformation",
	        0x001D : "GPSDateStamp",
	        0x001E : "GPSDifferential"
	    };
	
	    var StringValues = EXIF.StringValues = {
	        ExposureProgram : {
	            0 : "Not defined",
	            1 : "Manual",
	            2 : "Normal program",
	            3 : "Aperture priority",
	            4 : "Shutter priority",
	            5 : "Creative program",
	            6 : "Action program",
	            7 : "Portrait mode",
	            8 : "Landscape mode"
	        },
	        MeteringMode : {
	            0 : "Unknown",
	            1 : "Average",
	            2 : "CenterWeightedAverage",
	            3 : "Spot",
	            4 : "MultiSpot",
	            5 : "Pattern",
	            6 : "Partial",
	            255 : "Other"
	        },
	        LightSource : {
	            0 : "Unknown",
	            1 : "Daylight",
	            2 : "Fluorescent",
	            3 : "Tungsten (incandescent light)",
	            4 : "Flash",
	            9 : "Fine weather",
	            10 : "Cloudy weather",
	            11 : "Shade",
	            12 : "Daylight fluorescent (D 5700 - 7100K)",
	            13 : "Day white fluorescent (N 4600 - 5400K)",
	            14 : "Cool white fluorescent (W 3900 - 4500K)",
	            15 : "White fluorescent (WW 3200 - 3700K)",
	            17 : "Standard light A",
	            18 : "Standard light B",
	            19 : "Standard light C",
	            20 : "D55",
	            21 : "D65",
	            22 : "D75",
	            23 : "D50",
	            24 : "ISO studio tungsten",
	            255 : "Other"
	        },
	        Flash : {
	            0x0000 : "Flash did not fire",
	            0x0001 : "Flash fired",
	            0x0005 : "Strobe return light not detected",
	            0x0007 : "Strobe return light detected",
	            0x0009 : "Flash fired, compulsory flash mode",
	            0x000D : "Flash fired, compulsory flash mode, return light not detected",
	            0x000F : "Flash fired, compulsory flash mode, return light detected",
	            0x0010 : "Flash did not fire, compulsory flash mode",
	            0x0018 : "Flash did not fire, auto mode",
	            0x0019 : "Flash fired, auto mode",
	            0x001D : "Flash fired, auto mode, return light not detected",
	            0x001F : "Flash fired, auto mode, return light detected",
	            0x0020 : "No flash function",
	            0x0041 : "Flash fired, red-eye reduction mode",
	            0x0045 : "Flash fired, red-eye reduction mode, return light not detected",
	            0x0047 : "Flash fired, red-eye reduction mode, return light detected",
	            0x0049 : "Flash fired, compulsory flash mode, red-eye reduction mode",
	            0x004D : "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
	            0x004F : "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
	            0x0059 : "Flash fired, auto mode, red-eye reduction mode",
	            0x005D : "Flash fired, auto mode, return light not detected, red-eye reduction mode",
	            0x005F : "Flash fired, auto mode, return light detected, red-eye reduction mode"
	        },
	        SensingMethod : {
	            1 : "Not defined",
	            2 : "One-chip color area sensor",
	            3 : "Two-chip color area sensor",
	            4 : "Three-chip color area sensor",
	            5 : "Color sequential area sensor",
	            7 : "Trilinear sensor",
	            8 : "Color sequential linear sensor"
	        },
	        SceneCaptureType : {
	            0 : "Standard",
	            1 : "Landscape",
	            2 : "Portrait",
	            3 : "Night scene"
	        },
	        SceneType : {
	            1 : "Directly photographed"
	        },
	        CustomRendered : {
	            0 : "Normal process",
	            1 : "Custom process"
	        },
	        WhiteBalance : {
	            0 : "Auto white balance",
	            1 : "Manual white balance"
	        },
	        GainControl : {
	            0 : "None",
	            1 : "Low gain up",
	            2 : "High gain up",
	            3 : "Low gain down",
	            4 : "High gain down"
	        },
	        Contrast : {
	            0 : "Normal",
	            1 : "Soft",
	            2 : "Hard"
	        },
	        Saturation : {
	            0 : "Normal",
	            1 : "Low saturation",
	            2 : "High saturation"
	        },
	        Sharpness : {
	            0 : "Normal",
	            1 : "Soft",
	            2 : "Hard"
	        },
	        SubjectDistanceRange : {
	            0 : "Unknown",
	            1 : "Macro",
	            2 : "Close view",
	            3 : "Distant view"
	        },
	        FileSource : {
	            3 : "DSC"
	        },
	
	        Components : {
	            0 : "",
	            1 : "Y",
	            2 : "Cb",
	            3 : "Cr",
	            4 : "R",
	            5 : "G",
	            6 : "B"
	        }
	    };
	
	    function addEvent(element, event, handler) {
	        if (element.addEventListener) {
	            element.addEventListener(event, handler, false);
	        } else if (element.attachEvent) {
	            element.attachEvent("on" + event, handler);
	        }
	    }
	
	    function imageHasData(img) {
	        return !!(img.exifdata);
	    }
	
	
	    function base64ToArrayBuffer(base64, contentType) {
	        contentType = contentType || base64.match(/^data\:([^\;]+)\;base64,/mi)[1] || ''; // e.g. 'data:image/jpeg;base64,...' => 'image/jpeg'
	        base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
	        var binary = atob(base64);
	        var len = binary.length;
	        var buffer = new ArrayBuffer(len);
	        var view = new Uint8Array(buffer);
	        for (var i = 0; i < len; i++) {
	            view[i] = binary.charCodeAt(i);
	        }
	        return buffer;
	    }
	
	    function objectURLToBlob(url, callback) {
	        var http = new XMLHttpRequest();
	        http.open("GET", url, true);
	        http.responseType = "blob";
	        http.onload = function(e) {
	            if (this.status == 200 || this.status === 0) {
	                callback(this.response);
	            }
	        };
	        http.send();
	    }
	
	    function getImageData(img, callback) {
	        function handleBinaryFile(binFile) {
	            var data = findEXIFinJPEG(binFile);
	            var iptcdata = findIPTCinJPEG(binFile);
	            img.exifdata = data || {};
	            img.iptcdata = iptcdata || {};
	            if (callback) {
	                callback.call(img);
	            }
	        }
	
	        if (img.src) {
	            if (/^data\:/i.test(img.src)) { // Data URI
	                var arrayBuffer = base64ToArrayBuffer(img.src);
	                handleBinaryFile(arrayBuffer);
	
	            } else if (/^blob\:/i.test(img.src)) { // Object URL
	                var fileReader = new FileReader();
	                fileReader.onload = function(e) {
	                    handleBinaryFile(e.target.result);
	                };
	                objectURLToBlob(img.src, function (blob) {
	                    fileReader.readAsArrayBuffer(blob);
	                });
	            } else {
	                var http = new XMLHttpRequest();
	                http.onload = function() {
	                    if (this.status == 200 || this.status === 0) {
	                        handleBinaryFile(http.response);
	                    } else {
	                        throw "Could not load image";
	                    }
	                    http = null;
	                };
	                http.open("GET", img.src, true);
	                http.responseType = "arraybuffer";
	                http.send(null);
	            }
	        } else if (window.FileReader && (img instanceof window.Blob || img instanceof window.File)) {
	            var fileReader = new FileReader();
	            fileReader.onload = function(e) {
	                if (debug) console.log("Got file of length " + e.target.result.byteLength);
	                handleBinaryFile(e.target.result);
	            };
	
	            fileReader.readAsArrayBuffer(img);
	        }
	    }
	
	    function findEXIFinJPEG(file) {
	        var dataView = new DataView(file);
	
	        if (debug) console.log("Got file of length " + file.byteLength);
	        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
	            if (debug) console.log("Not a valid JPEG");
	            return false; // not a valid jpeg
	        }
	
	        var offset = 2,
	            length = file.byteLength,
	            marker;
	
	        while (offset < length) {
	            if (dataView.getUint8(offset) != 0xFF) {
	                if (debug) console.log("Not a valid marker at offset " + offset + ", found: " + dataView.getUint8(offset));
	                return false; // not a valid marker, something is wrong
	            }
	
	            marker = dataView.getUint8(offset + 1);
	            if (debug) console.log(marker);
	
	            // we could implement handling for other markers here,
	            // but we're only looking for 0xFFE1 for EXIF data
	
	            if (marker == 225) {
	                if (debug) console.log("Found 0xFFE1 marker");
	
	                return readEXIFData(dataView, offset + 4, dataView.getUint16(offset + 2) - 2);
	
	                // offset += 2 + file.getShortAt(offset+2, true);
	
	            } else {
	                offset += 2 + dataView.getUint16(offset+2);
	            }
	
	        }
	
	    }
	
	    function findIPTCinJPEG(file) {
	        var dataView = new DataView(file);
	
	        if (debug) console.log("Got file of length " + file.byteLength);
	        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
	            if (debug) console.log("Not a valid JPEG");
	            return false; // not a valid jpeg
	        }
	
	        var offset = 2,
	            length = file.byteLength;
	
	
	        var isFieldSegmentStart = function(dataView, offset){
	            return (
	                dataView.getUint8(offset) === 0x38 &&
	                dataView.getUint8(offset+1) === 0x42 &&
	                dataView.getUint8(offset+2) === 0x49 &&
	                dataView.getUint8(offset+3) === 0x4D &&
	                dataView.getUint8(offset+4) === 0x04 &&
	                dataView.getUint8(offset+5) === 0x04
	            );
	        };
	
	        while (offset < length) {
	
	            if ( isFieldSegmentStart(dataView, offset )){
	
	                // Get the length of the name header (which is padded to an even number of bytes)
	                var nameHeaderLength = dataView.getUint8(offset+7);
	                if(nameHeaderLength % 2 !== 0) nameHeaderLength += 1;
	                // Check for pre photoshop 6 format
	                if(nameHeaderLength === 0) {
	                    // Always 4
	                    nameHeaderLength = 4;
	                }
	
	                var startOffset = offset + 8 + nameHeaderLength;
	                var sectionLength = dataView.getUint16(offset + 6 + nameHeaderLength);
	
	                return readIPTCData(file, startOffset, sectionLength);
	
	                break;
	
	            }
	
	
	            // Not the marker, continue searching
	            offset++;
	
	        }
	
	    }
	    var IptcFieldMap = {
	        0x78 : 'caption',
	        0x6E : 'credit',
	        0x19 : 'keywords',
	        0x37 : 'dateCreated',
	        0x50 : 'byline',
	        0x55 : 'bylineTitle',
	        0x7A : 'captionWriter',
	        0x69 : 'headline',
	        0x74 : 'copyright',
	        0x0F : 'category'
	    };
	    function readIPTCData(file, startOffset, sectionLength){
	        var dataView = new DataView(file);
	        var data = {};
	        var fieldValue, fieldName, dataSize, segmentType, segmentSize;
	        var segmentStartPos = startOffset;
	        while(segmentStartPos < startOffset+sectionLength) {
	            if(dataView.getUint8(segmentStartPos) === 0x1C && dataView.getUint8(segmentStartPos+1) === 0x02){
	                segmentType = dataView.getUint8(segmentStartPos+2);
	                if(segmentType in IptcFieldMap) {
	                    dataSize = dataView.getInt16(segmentStartPos+3);
	                    segmentSize = dataSize + 5;
	                    fieldName = IptcFieldMap[segmentType];
	                    fieldValue = getStringFromDB(dataView, segmentStartPos+5, dataSize);
	                    // Check if we already stored a value with this name
	                    if(data.hasOwnProperty(fieldName)) {
	                        // Value already stored with this name, create multivalue field
	                        if(data[fieldName] instanceof Array) {
	                            data[fieldName].push(fieldValue);
	                        }
	                        else {
	                            data[fieldName] = [data[fieldName], fieldValue];
	                        }
	                    }
	                    else {
	                        data[fieldName] = fieldValue;
	                    }
	                }
	
	            }
	            segmentStartPos++;
	        }
	        return data;
	    }
	
	
	
	    function readTags(file, tiffStart, dirStart, strings, bigEnd) {
	        var entries = file.getUint16(dirStart, !bigEnd),
	            tags = {},
	            entryOffset, tag,
	            i;
	
	        for (i=0;i<entries;i++) {
	            entryOffset = dirStart + i*12 + 2;
	            tag = strings[file.getUint16(entryOffset, !bigEnd)];
	            if (!tag && debug) console.log("Unknown tag: " + file.getUint16(entryOffset, !bigEnd));
	            tags[tag] = readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd);
	        }
	        return tags;
	    }
	
	
	    function readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd) {
	        var type = file.getUint16(entryOffset+2, !bigEnd),
	            numValues = file.getUint32(entryOffset+4, !bigEnd),
	            valueOffset = file.getUint32(entryOffset+8, !bigEnd) + tiffStart,
	            offset,
	            vals, val, n,
	            numerator, denominator;
	
	        switch (type) {
	            case 1: // byte, 8-bit unsigned int
	            case 7: // undefined, 8-bit byte, value depending on field
	                if (numValues == 1) {
	                    return file.getUint8(entryOffset + 8, !bigEnd);
	                } else {
	                    offset = numValues > 4 ? valueOffset : (entryOffset + 8);
	                    vals = [];
	                    for (n=0;n<numValues;n++) {
	                        vals[n] = file.getUint8(offset + n);
	                    }
	                    return vals;
	                }
	
	            case 2: // ascii, 8-bit byte
	                offset = numValues > 4 ? valueOffset : (entryOffset + 8);
	                return getStringFromDB(file, offset, numValues-1);
	
	            case 3: // short, 16 bit int
	                if (numValues == 1) {
	                    return file.getUint16(entryOffset + 8, !bigEnd);
	                } else {
	                    offset = numValues > 2 ? valueOffset : (entryOffset + 8);
	                    vals = [];
	                    for (n=0;n<numValues;n++) {
	                        vals[n] = file.getUint16(offset + 2*n, !bigEnd);
	                    }
	                    return vals;
	                }
	
	            case 4: // long, 32 bit int
	                if (numValues == 1) {
	                    return file.getUint32(entryOffset + 8, !bigEnd);
	                } else {
	                    vals = [];
	                    for (n=0;n<numValues;n++) {
	                        vals[n] = file.getUint32(valueOffset + 4*n, !bigEnd);
	                    }
	                    return vals;
	                }
	
	            case 5:    // rational = two long values, first is numerator, second is denominator
	                if (numValues == 1) {
	                    numerator = file.getUint32(valueOffset, !bigEnd);
	                    denominator = file.getUint32(valueOffset+4, !bigEnd);
	                    val = new Number(numerator / denominator);
	                    val.numerator = numerator;
	                    val.denominator = denominator;
	                    return val;
	                } else {
	                    vals = [];
	                    for (n=0;n<numValues;n++) {
	                        numerator = file.getUint32(valueOffset + 8*n, !bigEnd);
	                        denominator = file.getUint32(valueOffset+4 + 8*n, !bigEnd);
	                        vals[n] = new Number(numerator / denominator);
	                        vals[n].numerator = numerator;
	                        vals[n].denominator = denominator;
	                    }
	                    return vals;
	                }
	
	            case 9: // slong, 32 bit signed int
	                if (numValues == 1) {
	                    return file.getInt32(entryOffset + 8, !bigEnd);
	                } else {
	                    vals = [];
	                    for (n=0;n<numValues;n++) {
	                        vals[n] = file.getInt32(valueOffset + 4*n, !bigEnd);
	                    }
	                    return vals;
	                }
	
	            case 10: // signed rational, two slongs, first is numerator, second is denominator
	                if (numValues == 1) {
	                    return file.getInt32(valueOffset, !bigEnd) / file.getInt32(valueOffset+4, !bigEnd);
	                } else {
	                    vals = [];
	                    for (n=0;n<numValues;n++) {
	                        vals[n] = file.getInt32(valueOffset + 8*n, !bigEnd) / file.getInt32(valueOffset+4 + 8*n, !bigEnd);
	                    }
	                    return vals;
	                }
	        }
	    }
	
	    function getStringFromDB(buffer, start, length) {
	        var outstr = "";
	        for (n = start; n < start+length; n++) {
	            outstr += String.fromCharCode(buffer.getUint8(n));
	        }
	        return outstr;
	    }
	
	    function readEXIFData(file, start) {
	        if (getStringFromDB(file, start, 4) != "Exif") {
	            if (debug) console.log("Not valid EXIF data! " + getStringFromDB(file, start, 4));
	            return false;
	        }
	
	        var bigEnd,
	            tags, tag,
	            exifData, gpsData,
	            tiffOffset = start + 6;
	
	        // test for TIFF validity and endianness
	        if (file.getUint16(tiffOffset) == 0x4949) {
	            bigEnd = false;
	        } else if (file.getUint16(tiffOffset) == 0x4D4D) {
	            bigEnd = true;
	        } else {
	            if (debug) console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)");
	            return false;
	        }
	
	        if (file.getUint16(tiffOffset+2, !bigEnd) != 0x002A) {
	            if (debug) console.log("Not valid TIFF data! (no 0x002A)");
	            return false;
	        }
	
	        var firstIFDOffset = file.getUint32(tiffOffset+4, !bigEnd);
	
	        if (firstIFDOffset < 0x00000008) {
	            if (debug) console.log("Not valid TIFF data! (First offset less than 8)", file.getUint32(tiffOffset+4, !bigEnd));
	            return false;
	        }
	
	        tags = readTags(file, tiffOffset, tiffOffset + firstIFDOffset, TiffTags, bigEnd);
	
	        if (tags.ExifIFDPointer) {
	            exifData = readTags(file, tiffOffset, tiffOffset + tags.ExifIFDPointer, ExifTags, bigEnd);
	            for (tag in exifData) {
	                switch (tag) {
	                    case "LightSource" :
	                    case "Flash" :
	                    case "MeteringMode" :
	                    case "ExposureProgram" :
	                    case "SensingMethod" :
	                    case "SceneCaptureType" :
	                    case "SceneType" :
	                    case "CustomRendered" :
	                    case "WhiteBalance" :
	                    case "GainControl" :
	                    case "Contrast" :
	                    case "Saturation" :
	                    case "Sharpness" :
	                    case "SubjectDistanceRange" :
	                    case "FileSource" :
	                        exifData[tag] = StringValues[tag][exifData[tag]];
	                        break;
	
	                    case "ExifVersion" :
	                    case "FlashpixVersion" :
	                        exifData[tag] = String.fromCharCode(exifData[tag][0], exifData[tag][1], exifData[tag][2], exifData[tag][3]);
	                        break;
	
	                    case "ComponentsConfiguration" :
	                        exifData[tag] =
	                            StringValues.Components[exifData[tag][0]] +
	                            StringValues.Components[exifData[tag][1]] +
	                            StringValues.Components[exifData[tag][2]] +
	                            StringValues.Components[exifData[tag][3]];
	                        break;
	                }
	                tags[tag] = exifData[tag];
	            }
	        }
	
	        if (tags.GPSInfoIFDPointer) {
	            gpsData = readTags(file, tiffOffset, tiffOffset + tags.GPSInfoIFDPointer, GPSTags, bigEnd);
	            for (tag in gpsData) {
	                switch (tag) {
	                    case "GPSVersionID" :
	                        gpsData[tag] = gpsData[tag][0] +
	                            "." + gpsData[tag][1] +
	                            "." + gpsData[tag][2] +
	                            "." + gpsData[tag][3];
	                        break;
	                }
	                tags[tag] = gpsData[tag];
	            }
	        }
	
	        return tags;
	    }
	
	    EXIF.getData = function(img, callback) {
	        if ((img instanceof Image || img instanceof HTMLImageElement) && !img.complete) return false;
	
	        if (!imageHasData(img)) {
	            getImageData(img, callback);
	        } else {
	            if (callback) {
	                callback.call(img);
	            }
	        }
	        return true;
	    }
	
	    EXIF.getTag = function(img, tag) {
	        if (!imageHasData(img)) return;
	        return img.exifdata[tag];
	    }
	
	    EXIF.getAllTags = function(img) {
	        if (!imageHasData(img)) return {};
	        var a,
	            data = img.exifdata,
	            tags = {};
	        for (a in data) {
	            if (data.hasOwnProperty(a)) {
	                tags[a] = data[a];
	            }
	        }
	        return tags;
	    }
	
	    EXIF.pretty = function(img) {
	        if (!imageHasData(img)) return "";
	        var a,
	            data = img.exifdata,
	            strPretty = "";
	        for (a in data) {
	            if (data.hasOwnProperty(a)) {
	                if (typeof data[a] == "object") {
	                    if (data[a] instanceof Number) {
	                        strPretty += a + " : " + data[a] + " [" + data[a].numerator + "/" + data[a].denominator + "]\r\n";
	                    } else {
	                        strPretty += a + " : [" + data[a].length + " values]\r\n";
	                    }
	                } else {
	                    strPretty += a + " : " + data[a] + "\r\n";
	                }
	            }
	        }
	        return strPretty;
	    }
	
	    EXIF.readFromBinaryFile = function(file) {
	        return findEXIFinJPEG(file);
	    }
	
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	            return EXIF;
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	}.call(this));
	


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(10);
	
	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	buf.push("<div class=\"cropper\"></div><div layout=\"row\" layout-align=\"end\"><md-button ng-click=\"$ctrl.onCancel()\" class=\"md-primary\">abbrechen</md-button><span flex></span><md-button ng-click=\"$ctrl.saveCrop()\" class=\"md-accent\">anwenden</md-button></div>");;return buf.join("");
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Merge two attribute objects giving precedence
	 * to values in object `b`. Classes are special-cased
	 * allowing for arrays and merging/joining appropriately
	 * resulting in a string.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api private
	 */
	
	exports.merge = function merge(a, b) {
	  if (arguments.length === 1) {
	    var attrs = a[0];
	    for (var i = 1; i < a.length; i++) {
	      attrs = merge(attrs, a[i]);
	    }
	    return attrs;
	  }
	  var ac = a['class'];
	  var bc = b['class'];
	
	  if (ac || bc) {
	    ac = ac || [];
	    bc = bc || [];
	    if (!Array.isArray(ac)) ac = [ac];
	    if (!Array.isArray(bc)) bc = [bc];
	    a['class'] = ac.concat(bc).filter(nulls);
	  }
	
	  for (var key in b) {
	    if (key != 'class') {
	      a[key] = b[key];
	    }
	  }
	
	  return a;
	};
	
	/**
	 * Filter null `val`s.
	 *
	 * @param {*} val
	 * @return {Boolean}
	 * @api private
	 */
	
	function nulls(val) {
	  return val != null && val !== '';
	}
	
	/**
	 * join array as classes.
	 *
	 * @param {*} val
	 * @return {String}
	 */
	exports.joinClasses = joinClasses;
	function joinClasses(val) {
	  return (Array.isArray(val) ? val.map(joinClasses) :
	    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
	    [val]).filter(nulls).join(' ');
	}
	
	/**
	 * Render the given classes.
	 *
	 * @param {Array} classes
	 * @param {Array.<Boolean>} escaped
	 * @return {String}
	 */
	exports.cls = function cls(classes, escaped) {
	  var buf = [];
	  for (var i = 0; i < classes.length; i++) {
	    if (escaped && escaped[i]) {
	      buf.push(exports.escape(joinClasses([classes[i]])));
	    } else {
	      buf.push(joinClasses(classes[i]));
	    }
	  }
	  var text = joinClasses(buf);
	  if (text.length) {
	    return ' class="' + text + '"';
	  } else {
	    return '';
	  }
	};
	
	
	exports.style = function (val) {
	  if (val && typeof val === 'object') {
	    return Object.keys(val).map(function (style) {
	      return style + ':' + val[style];
	    }).join(';');
	  } else {
	    return val;
	  }
	};
	/**
	 * Render the given attribute.
	 *
	 * @param {String} key
	 * @param {String} val
	 * @param {Boolean} escaped
	 * @param {Boolean} terse
	 * @return {String}
	 */
	exports.attr = function attr(key, val, escaped, terse) {
	  if (key === 'style') {
	    val = exports.style(val);
	  }
	  if ('boolean' == typeof val || null == val) {
	    if (val) {
	      return ' ' + (terse ? key : key + '="' + key + '"');
	    } else {
	      return '';
	    }
	  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
	    if (JSON.stringify(val).indexOf('&') !== -1) {
	      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
	                   'will be escaped to `&amp;`');
	    };
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will eliminate the double quotes around dates in ' +
	                   'ISO form after 2.0.0');
	    }
	    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
	  } else if (escaped) {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + exports.escape(val) + '"';
	  } else {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + val + '"';
	  }
	};
	
	/**
	 * Render the given attributes object.
	 *
	 * @param {Object} obj
	 * @param {Object} escaped
	 * @return {String}
	 */
	exports.attrs = function attrs(obj, terse){
	  var buf = [];
	
	  var keys = Object.keys(obj);
	
	  if (keys.length) {
	    for (var i = 0; i < keys.length; ++i) {
	      var key = keys[i]
	        , val = obj[key];
	
	      if ('class' == key) {
	        if (val = joinClasses(val)) {
	          buf.push(' ' + key + '="' + val + '"');
	        }
	      } else {
	        buf.push(exports.attr(key, val, false, terse));
	      }
	    }
	  }
	
	  return buf.join('');
	};
	
	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */
	
	var jade_encode_html_rules = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;'
	};
	var jade_match_html = /[&<>"]/g;
	
	function jade_encode_char(c) {
	  return jade_encode_html_rules[c] || c;
	}
	
	exports.escape = jade_escape;
	function jade_escape(html){
	  var result = String(html).replace(jade_match_html, jade_encode_char);
	  if (result === '' + html) return html;
	  else return result;
	};
	
	/**
	 * Re-throw the given `err` in context to the
	 * the jade in `filename` at the given `lineno`.
	 *
	 * @param {Error} err
	 * @param {String} filename
	 * @param {String} lineno
	 * @api private
	 */
	
	exports.rethrow = function rethrow(err, filename, lineno, str){
	  if (!(err instanceof Error)) throw err;
	  if ((typeof window != 'undefined' || !filename) && !str) {
	    err.message += ' on line ' + lineno;
	    throw err;
	  }
	  try {
	    str = str || __webpack_require__(11).readFileSync(filename, 'utf8')
	  } catch (ex) {
	    rethrow(err, null, lineno)
	  }
	  var context = 3
	    , lines = str.split('\n')
	    , start = Math.max(lineno - context, 0)
	    , end = Math.min(lines.length, lineno + context);
	
	  // Error context
	  var context = lines.slice(start, end).map(function(line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? '  > ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');
	
	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'Jade') + ':' + lineno
	    + '\n' + context + '\n\n' + err.message;
	  throw err;
	};
	
	exports.DebugItem = function DebugItem(lineno, filename) {
	  this.lineno = lineno;
	  this.filename = filename;
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ }
/******/ ])
});
;
//# sourceMappingURL=ngImageCrop.js.map