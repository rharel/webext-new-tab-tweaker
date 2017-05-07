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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * Enumerates potential ordering between two items.
 */
module.exports = exports =
{
	Greater: 1,
	Less: -1,
	Equal: 0
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Ordering = __webpack_require__(0);

/**
 * The configuration object's layout version.
 */
const CURRENT =
{
	major: 1,
	minor: 0,
	patch: 2
};
/**
 * Determines whether the specified object represents a valid version
 * object.
 *
 * @param obj
 *        The object to test.
 * @returns
 *        True iff the object is a valid version object.
 */
function is_valid(obj)
{
	/**
	 * Determines whether the specified object is a (non-strict) positive
	 * integer.
	 *
	 * @param obj
	 *        The object to test.
	 * @returns
	 *        True iff the object is a (non-strict) positive integer.
	 */
	function is_positive_integer(obj)
	{
		return Number.isInteger(obj) && obj >= 0;
	}
	return (
		is_positive_integer(obj.major) &&
		is_positive_integer(obj.minor) &&
		is_positive_integer(obj.patch)
	);
}
/**
 * Determines whether one version is greater, lesser, or equal than/to
 * another.
 *
 * @param first
 * 		The first version object.
 * @param second
 * 		The second version object.
 * @returns
 * 		An ordering descriptor with relation to 'first' and 'second'.
 */
function compare(first, second)
{
	const
		parts_of_first = [first.major, first.minor, first.patch],
		parts_of_second = [second.major, second.minor, second.patch];

	for (let i = 0; i < 3; ++i)
	{
		const
			first_part = parts_of_first[i],
			second_part = parts_of_second[i];

		if (first_part > second_part)
		{
			return Ordering.Greater;
		}
		else if (first_part < second_part)
		{
			return Ordering.Less;
		}
	}
	return Ordering.Equal;
}
/**
 * Represent the specified version as a string.
 *
 * @param version
 * 		The version object to represent.
 * @returns
 *		A human-readable string representing the specified version.
 */
function as_string(version)
{
	return `${version.major}.${version.minor}.${version.patch}`;
}

module.exports = exports =
{
	CURRENT: CURRENT,

	is_valid: is_valid,
	compare: compare,
	as_string: as_string
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Version = __webpack_require__(1);

/**
 * Enumerates possible tab behaviors.
 */
const TabBehavior =
{
	/**
	 * The tab redirects the browser to a specified URL.
	 */
	Redirect: "redirect",
	/**
	 * The tab displays a customized page.
	 */
	DisplayCustomPage: "display-custom-page"
};
/**
 * Enumerates possible image sources.
 */
const ImageURL =
{
	/**
	 * There is no image.
	 */
	None: "none",
	/**
	 * The URL points directly to the image file.
	 */
	Direct: "direct"
};

/**
 * The default configuration layout.
 */
const DEFAULT =
{
	version: Version.CURRENT,

	notification:
	{
		new_features: true
	},
	new_tab:
	{
		behavior: TabBehavior.DisplayCustomPage,

		redirect:
		{
			url: ""
		},
		custom_page:
		{
			background:
			{
				color: "#ffffff",
				animation_duration: 2
			},
			wallpaper:
			{
				source: ImageURL.None,
				url: "",
				animation_duration: 3
			}
		}
	}
};

module.exports = exports =
{
	TabBehavior: TabBehavior,
	ImageURL: ImageURL,

	DEFAULT: DEFAULT
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Version = __webpack_require__(1);
const DEFAULT_CONFIGURATION = __webpack_require__(2).DEFAULT;

/**
 * The key to the configuration object in local storage.
 */
const KEY = "configuration@new-tab-tweaker";
/**
 * The extension's local storage
 */
const LocalStorage =
	browser !== undefined ?
		browser.storage.local :
		null;

/**
 * Loads the configuration from local storage asynchronously.
 *
 * @returns
 *      A promise which yields a configuration object when fulfilled.
 */
function load()
{
	if (LocalStorage === null)
	{
		return DEFAULT_CONFIGURATION;
	}
	else
	{
		return LocalStorage.get(KEY).then(item =>
		{
			if (item.hasOwnProperty(KEY))
			{
				return item[KEY];
			}
			else
			{
				return DEFAULT_CONFIGURATION;
			}
		});
	}
}
/**
 * Saves a configuration to local storage asynchronously.
 *
 * @param cfg
 *      The configuration to save.
 * @returns
 *      A promise.
 */
function save(cfg)
{
	if (LocalStorage === null)
	{
		return Promise.reject();
	}
	else
	{
		const item = {};
		item[KEY] = cfg;

		return LocalStorage.set(item);
	}
}

module.exports = exports =
{
	KEY: KEY,

	load: load,
	save: save
};


/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = exports =
{
	Version: __webpack_require__(1),
	Layout: __webpack_require__(2),
	Storage: __webpack_require__(3)
};
if (window !== undefined)
{
	if (window.NTT === undefined) { window.NTT = {}; }
	window.NTT.Configuration = exports;
}


/***/ })
/******/ ]);