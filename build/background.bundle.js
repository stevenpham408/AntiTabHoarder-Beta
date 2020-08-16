/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/background.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/background.js":
/*!******************************!*\
  !*** ./src/js/background.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: C:\\\\Users\\\\STP Interlude\\\\Desktop\\\\AntiTabHoarder-Beta\\\\src\\\\js\\\\background.js: Unexpected token, expected \\\";\\\" (96:8)\\n\\n\\u001b[0m \\u001b[90m 94 | \\u001b[39m\\t\\t\\t}\\u001b[0m\\n\\u001b[0m \\u001b[90m 95 | \\u001b[39ms \\u001b[33m=\\u001b[39m current\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 96 | \\u001b[39me(tabID){\\u001b[0m\\n\\u001b[0m \\u001b[90m    | \\u001b[39m        \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 97 | \\u001b[39m\\tlet delayedTime\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 98 | \\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 99 | \\u001b[39m\\tchrome\\u001b[33m.\\u001b[39mstorage\\u001b[33m.\\u001b[39mlocal\\u001b[33m.\\u001b[39mget(\\u001b[36mnull\\u001b[39m\\u001b[33m,\\u001b[39m \\u001b[36mfunction\\u001b[39m(results){\\u001b[0m\\n    at Object.raise (C:\\\\Users\\\\STP Interlude\\\\Desktop\\\\AntiTabHoarder-Beta\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:6975:17)\\n    at Object.unexpected (C:\\\\Users\\\\STP Interlude\\\\Desktop\\\\AntiTabHoarder-Beta\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:8368:16)\\n    at Object.semicolon (C:\\\\Users\\\\STP Interlude\\\\Desktop\\\\AntiTabHoarder-Beta\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:8350:40)\\n    at Object.parseExpressionStatement (C:\\\\Users\\\\STP Interlude\\\\Desktop\\\\AntiTabHoarder-Beta\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11191:10)\\n    at Object.parseStatementContent (C:\\\\Users\\\\STP Interlude\\\\Desktop\\\\AntiTabHoarder-Beta\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:10790:19)\\n    at Object.parseStatement (C:\\\\Users\\\\STP Interlude\\\\Desktop\\\\AntiTabHoarder-Beta\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:10656:17)\\n    at Object.parseBlockOrModuleBlockBody (C:\\\\Users\\\\STP Interlude\\\\Desktop\\\\AntiTabHoarder-Beta\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11232:25)\\n    at Object.parseBlockBody (C:\\\\Users\\\\STP Interlude\\\\Desktop\\\\AntiTabHoarder-Beta\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11219:10)\\n    at Object.parseBlock (C:\\\\Users\\\\STP Interlude\\\\Desktop\\\\AntiTabHoarder-Beta\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11203:10)\\n    at Object.parseFunctionBody (C:\\\\Users\\\\STP Interlude\\\\Desktop\\\\AntiTabHoarder-Beta\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:10222:24)\\n    at Object.parseFunctionBodyAndFinish (C:\\\\Users\\\\STP Interlude\\\\Desktop\\\\AntiTabHoarder-Beta\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:10192:10)\\n    at C:\\\\Users\\\\STP Interlude\\\\Desktop\\\\AntiTabHoarder-Beta\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11364:12\\n    at Object.withTopicForbiddingContext (C:\\\\Users\\\\STP Interlude\\\\Desktop\\\\AntiTabHoarder-Beta\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:10531:14)\\n    at Object.parseFunction (C:\\\\Users\\\\STP Interlude\\\\Desktop\\\\AntiTabHoarder-Beta\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11363:10)\\n    at Object.parseFunctionExpression (C:\\\\Users\\\\STP Interlude\\\\Desktop\\\\AntiTabHoarder-Beta\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9663:17)\\n    at Object.parseExprAtom (C:\\\\Users\\\\STP Interlude\\\\Desktop\\\\AntiTabHoarder-Beta\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9576:21)\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvYmFja2dyb3VuZC5qcy5qcyIsInNvdXJjZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/js/background.js\n");

/***/ })

/******/ });