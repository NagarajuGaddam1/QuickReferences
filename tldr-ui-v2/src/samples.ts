/* tslint:disable:max-line-length*/
export const SAMPLES = [
	{
		"id": "927950ae-d035-4e91-87cb-7d5364b02bb9",
		"PostId": "06d7cd78-43db-44a4-98c4-64e895da089c",
		"Title": "IIFE (Immediately invoked function expressions)",
		"Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
		"Category": 1,
		"Tags": [
			"js",
			"iife",
			"enum",
			"anonymous",
			"immediate"
		],
		"ContentItems": [
			{
				"ContentItemId": "e38d7d79-7c7c-41ca-9b5c-6930fbf72b34",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "IIFEs are anonymous function expression that can be immediately invoked. \nAll the variables declared in this anonymous fn are local variables\nThese local variables cannot be accessed outside it - simulating block scoping.\n\nA small performance benefit of using IIFE’s is the ability to pass commonly used global objects (window, document, jQuery, etc) to an IIFE’s anonymous function, and then reference these global objects within the IIFE via a local scope. For ex -"
			},
			{
				"ContentItemId": "3dcff38d-f21d-419a-a5ff-a0eeacedff8a",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "function(window, document, $) {\n// You can now reference the window, document, and jQuery objects in a local scope\n}(window, document, window.jQuery); // The global window, document, and jQuery objects are passed into the "
			},
			{
				"ContentItemId": "d84a760d-a855-4bcc-8175-a22518d3b5c7",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Now you can freely use the $ without worrying about other library conflicts, since you passed in the global jQuery object and scoped it to the $ as a local parameter.\nThis also offers a marginal minification optimization as the name of each global object can be reduced to a single letter word.\n\nIIFEs are also a quick way of declaring ENUM types in JavaScript."
			},
			{
				"ContentItemId": "d37f858d-8509-4ed9-9464-85923efc407f",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "var a; \n(function (b){\n    b[b[\"car\"] = 0] = \"car\";\n    b[b[\"jeep\" = 1] = \"jeep\";\n})(a || (a = {}));\nconsole.log(a['car']);    //    0\nconsole.log(a.car);       //    0\nconsole.log(a[0]);        //    'car'\nconsole.log(a[a.jeep]);   //    'jeep'\n"
			},
			{
				"ContentItemId": "805480a9-90fc-4f65-ba9c-8b3e929d9451",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "The equivalent syntax can be condensed in TypeScript with the usage of ENUM, both for strings and numeric enum types."
			},
			{
				"ContentItemId": "dd5febd6-65ea-47bb-9021-d30600546bdf",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "enum a {\n    car,\n    jeep,\n}\nconsole.log(a['car']);    //    0\nconsole.log(a.car);       //    0\nconsole.log(a[0]);        //    'car'\nconsole.log(a[a.jeep]);   //    'jeep'"
			}
		],
		"State": 0,
		"CreatedOn": "2017-10-02T10:42:17.583848Z",
		"ModifiedOn": "2017-12-01T11:48:55.3255815Z",
		"Upvotes": 0,
		"Views": 252,
		"IsPublished": true,
		"IsSuspended": true,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "7a67f8f3-0491-428f-9127-7cb7d0f254c2",
		"PostId": "7a94035d-3717-44b6-8166-4b88a113199d",
		"Title": "Is the Object an Array ?",
		"Description": "We try to ascertain wherein a JavaScript object is an array.",
		"Category": 1,
		"Tags": [
			"js",
			"array"
		],
		"ContentItems": [
			{
				"ContentItemId": "22dcfd59-96f5-4815-81ca-1ae7c09e6244",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "\nvar a = new Array();\ntypeof(a)                            \"object\" \nObject.prototype.toString.call(a)    \"[object Array]\"\na instanceof Array                    true\na.constructor === Array               true\nArray.isArray(a)                      true\n\n\nvar a = [];\ntypeof(a)                            \"object\" \nObject.prototype.toString.call(a)    \"[object Array]\"\na instanceof Array                    true\na.constructor === Array               true\nArray.isArray(a)                      true"
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T12:00:48.2850342Z",
		"ModifiedOn": "2017-12-01T12:00:48.2850342Z",
		"Upvotes": 0,
		"Views": 51,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "4a7be39d-018c-4e22-b460-89765a771e1d",
		"PostId": "9517a91d-07f0-4811-abc0-f90f691bb60d",
		"Title": "Using CLOSURE for reducing number of event listeners",
		"Description": "Using CLOSURE for reducing number of event listeners",
		"Category": 1,
		"Tags": [
			"js",
			"closure",
			"higher-order"
		],
		"ContentItems": [
			{
				"ContentItemId": "dd081fcc-35f6-4ccb-832c-4b72c28b5e0c",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Scenario\nAdding 1...n number of buttons with similar characteristics and invoking their onclick listeners with any unique idenitifier \n\nSolution\nUse a closure wrapped event callback."
			},
			{
				"ContentItemId": "7ec26946-4383-4386-a523-d8ce3f494ac6",
				"Type": 1,
				"FlaskLang": 1,
				"Lang": 3,
				"Data": "<button>Button 1</button>\n<button>Button 2</button>\n<button>Button 3</button>\n.\n.\n.\n<button>Button N</button>\n\n<script>\ndocument.addEventListener('DOMContentLoaded' , function (e) {\n    var buttons = document.querySelectorAll('button'); \n    for (var i = 0; i < buttons.length; i++) {\n    var listener = (function ()\n    {\n        var index = i;\n        return function(e) {\n            console.log('Event', e);\n            alert(index);\n        }\n    })();\n    buttons[i].addEventListener('click', listener);\n  }\n}); \n</script>"
			},
			{
				"ContentItemId": "190845d1-9457-4112-b124-a02448bf8b5f",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Working Fiddle\nhttps://jsfiddle.net/re1yux6f/"
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T12:16:48.5161339Z",
		"ModifiedOn": "2017-12-01T12:32:15.1157298Z",
		"Upvotes": 0,
		"Views": 58,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "d70e151d-ca46-41cd-84c7-2524dde310d7",
		"PostId": "74257f59-a432-4cfe-9b8b-96d5d1c74257",
		"Title": "Null vs NaN vs 'undefined'",
		"Description": "Null vs Undefined vs NaN",
		"Category": 1,
		"Tags": [
			"js",
			"NaN",
			"undefined",
			"nullable",
			"null"
		],
		"ContentItems": [
			{
				"ContentItemId": "36dd3276-01e0-4591-b2a5-da668dbffc61",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "null == null                    //    true\nnull == undefined               //    true\nundefined == undefined          //    true\n\nnull == NaN                     //    false\nundefined == NaN                //    false\nNaN == NaN                      //    false\n\nnull === null                   //    true\nundefined === undefined         //    true\n\nnull === undefined              //    false\nnull === NaN                    //    false\nundefined === NaN               //    false\nNaN === NaN                     //    false"
			},
			{
				"ContentItemId": "c6ae6290-25c3-474c-93e9-b5626fc7de6b",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Working Fiddle\nhttps://jsfiddle.net/s0eb39xn/"
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T12:31:21.0609651Z",
		"ModifiedOn": "2017-12-01T12:31:52.47555Z",
		"Upvotes": 0,
		"Views": 50,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "b4b0ee78-1b0e-4be2-9ad2-6b01f7f57610",
		"PostId": "2b190d79-f653-47f8-9864-0990c0d4164c",
		"Title": "Using strict mode",
		"Description": "Using Strict Mode",
		"Category": 1,
		"Tags": [
			"js",
			"strict mode"
		],
		"ContentItems": [
			{
				"ContentItemId": "01ccad0f-0ed9-4b46-969e-b6b7846a7031",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Order of code concats are important.\nstrict + non-strict = strict\nnon-strict + strict = non-strict\n\nCannot delete non configurable  properties or objects\nConverts silent errors to throw errors\nVariables and functions declared inside of an eval() statement are no longer created in the containing scope\nImpossible to accidentally create global variables as mistyping a variable in an assignment creates a new property on the global object and continues to \"work\""
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T12:36:36.0400074Z",
		"ModifiedOn": "2017-12-01T12:36:36.0400079Z",
		"Upvotes": 0,
		"Views": 48,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "14f3788f-2140-4da3-9235-e1b871a4af1d",
		"PostId": "253601e7-3b56-42eb-a65d-02dfc8fc40e9",
		"Title": "Prime features in ES6",
		"Description": "Prime features in ES6",
		"Category": 1,
		"Tags": [
			"js",
			"es6"
		],
		"ContentItems": [
			{
				"ContentItemId": "b31b4de4-bfe9-4578-8533-24bdfa093fba",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Default Parameters as opposed to the absence of same in ES5\n\n'const' properties as opposed to defining the same as writable, configurable as false in ES5\n\nlexical 'this' instead of using self\n\nUse of '...' as SPREAD parameters  for handling parameters - equivalent to array.prototype.slice.call(null, arguments)\n\nMulti-line strings interpolation using back ticks or template literals using back ticks(` `)\n\nArrow syntax for functions\n\nClass syntax for object definitions - usage of constructors for access to life-cycle of objects\n\nDestructuring assignment directly from function return result onto a bunch of objects\n\nExport to & Import from global namespace rather than relying  on global variables\n\nSet Data Structure as opposed to property based set implementation in ES5\n\nES6 native Promise framework opposed to es5 callbacks\n\n***Proposal - Decorators for inheriting behavior and features"
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T12:43:58.7702033Z",
		"ModifiedOn": "2017-12-01T12:50:54.0530791Z",
		"Upvotes": 0,
		"Views": 48,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "363ba2cc-8cf0-40b2-9445-ebc5ddb74e55",
		"PostId": "7a16c1f4-4eb3-4dea-a1bf-a0e9c3de8a3d",
		"Title": "Getters/Setters in JavaScript",
		"Description": "Getters/Setters in JavaScript",
		"Category": 1,
		"Tags": [
			"js",
			"getter",
			"setter"
		],
		"ContentItems": [
			{
				"ContentItemId": "50a04b54-d754-4946-992d-2bde981b5912",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "var obj = {\n  a : 1,\n  get value() {\n    return this.a + 1;\n  },\n  set value(val) {\n    this.a = val;\n  }\n};\n\nconsole.log(obj.a)        //    1\nconsole.log(obj.value)    //    2    \nobj.value = 5;    \nconsole.log(obj.a)        //    5\n\nconsole.log(obj.value())  //    ERROR => NOT A FUNCTION\nobj.value(7);             //    ERROR => NOT A FUNCTION\n"
			},
			{
				"ContentItemId": "6addb9b3-8713-4eaa-93c4-5216ab08d5b6",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "TypeScript Syntax"
			},
			{
				"ContentItemId": "dd709e7a-8652-4a21-84cd-1a6aafb3c628",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "class Sample {\n  private a:number = 2;\n  get value() {\n    return this.a + 1;\n  }\n  set value(val) {\n    this.a = val;\n  }\n}\n\nlet obj = new Sample();                \nconsole.log(obj.value)    //    3    \nobj.value = 5;    \n\nconsole.log(obj.value())  //    ERROR => NOT A FUNCTION\nobj.value(7);             //    ERROR => NOT A FUNCTION\n\n"
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T13:00:52.2282507Z",
		"ModifiedOn": "2017-12-01T13:02:57.2579997Z",
		"Upvotes": 0,
		"Views": 38,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "01048d77-0a86-4429-abfa-76f8bbf11831",
		"PostId": "a2e76294-4431-442f-9423-24945b7f25a6",
		"Title": "Looking out for memory leaks in JavaScript/Angular",
		"Description": "Looking out for memory leaks in JavaScript/Angular",
		"Category": 1,
		"Tags": [
			"js",
			"angular",
			"memory"
		],
		"ContentItems": [
			{
				"ContentItemId": "6cb696e7-7650-4c20-8f21-5920d5500fba",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Garbage collector works on the Mark-N-Sweep algorithm. Anything that can be reached from some reference in root is not cleared. \n\nAccidental global variables\nAccidental polluting of 'this'\nNot using memoization effectively\nNot clearing forgotten Intervals & Timers\nNot removing orphaned event listeners before disposing off a node\nIncorrect use of Closures - sometimes also deliberately  used to identify memory leaks by adding huge data chunks to each obejct\nCircular DOM reference - fix explicitly by adding NULL reference \n\n\nIE Garbage Collection  - may be due to non-determinism (one cannot be certain when a collection will be performed)\n\n\nAngular\nUsing ngShow/ngHide instead of ngIf for large DOM manipulation\nIneffective use of $compile service \nNot using memoization in a heavy template application for large number repeatable directives. \nUsing Iframes - Bad use/design case\nNot relying on DOM virtualization wherever possible\nScopes know about their children and parent. Such references will leak almost all of the scope in the page"
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T13:06:12.8691281Z",
		"ModifiedOn": "2017-12-01T13:06:12.8691285Z",
		"Upvotes": 0,
		"Views": 35,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "4e2a0853-a184-404d-92ee-600646965b51",
		"PostId": "8a526ee8-4f5d-49d4-ae9e-42faad6dfa11",
		"Title": "Detecting conditional CSS load using js",
		"Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
		"Category": 3,
		"Tags": [
			"js",
			"css"
		],
		"ContentItems": [
			{
				"ContentItemId": "36ebd9df-64e1-4593-a07c-5485b2e18776",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Use Pseudo content which is not being used anywhere in the application. \nExample, if we were able to load and conditional CSS, then to check add the CSS"
			},
			{
				"ContentItemId": "441c5487-efaf-4245-a784-8616b48c3865",
				"Type": 1,
				"FlaskLang": 2,
				"Lang": 2,
				"Data": "@media all and (min-width: 45em) {\n    body:after {\n        content: 'widescreen';\n        display: none;\n    }\n}\n"
			},
			{
				"ContentItemId": "0a5673d0-0ae0-4b99-95ad-0bdc1382cd76",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Then in JS, use getComputedStyle. Note the usage of the second parameter"
			},
			{
				"ContentItemId": "8e4999e0-f572-4506-b341-4cf7eb7e53eb",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "var size = window.getComputedStyle(document.body,':after').getPropertyValue('content');\nif (size == 'widescreen' || size.indexOf(\"widescreen\") !=-1) \n{\n    // Load some more content.\n}\n"
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T13:09:18.2946818Z",
		"ModifiedOn": "2017-12-01T13:09:18.2946822Z",
		"Upvotes": 0,
		"Views": 34,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "e36bd4c8-31d6-4145-92c2-550c158e803e",
		"PostId": "8abf5f06-f0cd-439f-9b80-474b3204c2a4",
		"Title": "Using DocumentFragment",
		"Description": "Using DocumentFragment",
		"Category": 2,
		"Tags": [
			"html5",
			"js",
			"dom",
			"reflow",
			"DocumentFragment"
		],
		"ContentItems": [
			{
				"ContentItemId": "68ef489b-3d6d-4200-ab1e-62584fa4535c",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Minimize DOM reflows by using DocumentFragment while dynamically appending tags"
			},
			{
				"ContentItemId": "cddd2bdd-16a1-497c-8601-c86d246f3718",
				"Type": 1,
				"FlaskLang": 1,
				"Lang": 3,
				"Data": "<ul id=\"list\"></ul>"
			},
			{
				"ContentItemId": "26e7acaa-5d3a-4793-94fd-922e79ce4cf2",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "// CAUSES 10 REFLOWS\nfor(var x = 0; x < 10; x++) {\n\tvar li = document.createElement(\"li\");\n\tli.innerHTML = \"List item \" + x;\n\tlistNode.appendChild(li);\n}\n\n// CAUSES 1 REFLOW\nvar frag = document.createDocumentFragment();\nfor(var x = 0; x < 10; x++) {\n\tvar li = document.createElement(\"li\");\n\tli.innerHTML = \"List item \" + x;\n\tfrag.appendChild(li);\n}\nlistNode.appendChild(frag);"
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T13:12:06.5507856Z",
		"ModifiedOn": "2017-12-01T13:12:06.5507861Z",
		"Upvotes": 0,
		"Views": 32,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "3250be0d-ed91-4281-b4f4-c4a1d39e761a",
		"PostId": "b316d422-333b-4037-b3ad-991da3ea0c17",
		"Title": "Native BUTTON vs DIV",
		"Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
		"Category": 2,
		"Tags": [
			"js",
			"css",
			"html5",
			"button"
		],
		"ContentItems": [
			{
				"ContentItemId": "9e0fa544-87d5-4e5a-ab8c-ddd4e61fc805",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "We may need to lookout for the following issues while using a button-styled DIV instead of a native Button element\n•  Not natively focusable - Tabindex needs to be added\n•  Native action invoker CSS not defined - CSS for ACTIVE/FOCUS/HOVER need to be defined\n•  Native cursor CSS support for cursor = \"pointer\"\n•  ngDisabled needs to be implemented\n•  Keydown/keyup evenet handlers to enable activating through 'space-bar'\n•  [type=\"submit\"] native behaviour needs to be coded. \n•  Native ARIA support needs to be added via 'role' & other attributes.\n•  All the above are CSS, JS, ARIA, addtional markup dependencies\n\nCSS related issues that may come up:\n•  The browser doesn’t support CSS.\n•  The user disabled CSS for performance reasons.\n•  The user is applying a user style sheet (which trumps your rules) to improve accessibility.\n•  A networking issue caused the external CSS to be unavailable.\n•  The selector you are using is too advanced for the browser.\n•  The rules are contained in a media query and the browser doesn’t support them.\n\nJS related issues that may come up: \n•  The browser doesn’t support JavaScript.\n•  JavaScript was disabled by the user.\n•  A networking issue caused the JavaScript to be unavailable.\n•  A firewall blocked requests for JavaScript.\n•  A browser plugin blocked the JavaScript download or execution.\n•  A third-party JavaScript error caused the JavaScript program to stop.\n•  A bug in your code caused the JavaScript program to stop.\n•  The browser failed a feature detection test and exited the program early.\n•  The user is still waiting for the browser to download, parse, and execute your JavaScript program."
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T13:33:42.9225107Z",
		"ModifiedOn": "2017-12-01T13:33:42.9225113Z",
		"Upvotes": 0,
		"Views": 20,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "7d0b1f9e-c3e8-48e7-9a6d-e75ec848fcda",
		"PostId": "972a6a23-915b-4905-88be-90c92e011b5d",
		"Title": "Simple FLEX layout",
		"Description": "Simple FLEX layout",
		"Category": 4,
		"Tags": [
			"html5",
			"js",
			"css",
			"flex"
		],
		"ContentItems": [
			{
				"ContentItemId": "6b67b25c-6d44-4e35-a73e-3f49f3c16229",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "A simple flex layout with a horizontally stacked layout."
			},
			{
				"ContentItemId": "b5b1a51d-fdf4-4f92-b396-c1e81e3a50b1",
				"Type": 1,
				"FlaskLang": 1,
				"Lang": 3,
				"Data": "<div class=\"container\">\n    <div class=\"sidebar\"></div>\n    <div class=\"content\"></div>\n</div>"
			},
			{
				"ContentItemId": "09fc6d71-d486-4386-8b3e-e953f43d7270",
				"Type": 1,
				"FlaskLang": 2,
				"Lang": 2,
				"Data": ".container  {\n\tdisplay: flex;\n\tflex-flow: row;\n}\n.sidebar  {\n\tflex: initial;  // grow - intiial, shrink - initial, basis - initial\n\twidth: 300px;\n\torder: 1;\n}\n.content  {\n\tflex: 1; // grow - 1, shrink - 1, basis - 0%\n\torder: 2;\n}"
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T13:37:18.2571454Z",
		"ModifiedOn": "2017-12-01T13:37:18.2571459Z",
		"Upvotes": 0,
		"Views": 19,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "d091f541-99d6-400a-9f4d-227c235b1f68",
		"PostId": "f06072da-7a7e-49e9-975d-cb24e0a79ad3",
		"Title": "async / await",
		"Description": "async / await",
		"Category": 1,
		"Tags": [
			"js",
			"css",
			"async",
			"await"
		],
		"ContentItems": [
			{
				"ContentItemId": "e8681851-6232-43ee-bf06-4cddfa2c1d25",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "function resolveAfter2Seconds(x) {\n    return new Promise(resolve => {\n        setTimeout(() => {\n            resolve(x);\n        }, 2000);\n    });\n}\nasync function add1(x) {\n    // WAIT FOR RESULT FOR 2 seconds\n    var a = await resolveAfter2Seconds(20);\n    // WAIT FOR RESULT FOR 2 seconds - Total 4S\n    var b = await resolveAfter2Seconds(30);  \n    return x + a + b;\n}\nadd1(10).then(v => {\n    console.log(v);  // prints 60 after 4 seconds.\n});\nasync function add2(x) {\n    var p_a = resolveAfter2Seconds(20);\n    var p_b = resolveAfter2Seconds(30);\n    // WAIT CONCURRENTLYFOR RESULT FOR 2S only\n    return x + await p_a + await p_b;\n}\nadd2(10).then(v => {\n    console.log(v);  // prints 60 after 2 seconds.\n});\n"
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T13:45:44.5001091Z",
		"ModifiedOn": "2017-12-01T13:46:17.0662142Z",
		"Upvotes": 0,
		"Views": 16,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "7a863951-6ed4-4705-bce7-f1f8f755d596",
		"PostId": "8f36ae7c-9498-438c-a9cb-935b3dd01033",
		"Title": "HTTP/2 notes",
		"Description": "HTTP/2 notes",
		"Category": 1,
		"Tags": [
			"js",
			"http2"
		],
		"ContentItems": [
			{
				"ContentItemId": "94a91768-0fb5-4c3f-b825-24bad89b709c",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "One of these core improvements is called Multiplexing. \nConceptually HTTP (as mentioned earlier) transfers data across IP addresses using a single TCP connection.\n\nthe tenacious global developer community has consistently found ways around these issues through using innovative techniques such as 'image sprites' to reduce the number of HTTP requests needed for several images, into one request.\n\n\t1. Multiplexing of requests over the same TCP connections - responses can be received out of order\n\t2. Support for prirotizing requests\n\t3. No HOL blocking\n\t4. Compressed header size\n\t5. Ability of server to push without being asked for\n\nHTTP/2 breaks down the HTTP protocol communication into an exchange of binary-encoded frames, which are then mapped to messages that belong to a particular stream, all of which are multiplexed within a single TCP connection."
			},
			{
				"ContentItemId": "19e6a97c-9634-4567-a5a9-99a579788488",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": ""
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T13:49:22.0188975Z",
		"ModifiedOn": "2017-12-01T13:49:22.018898Z",
		"Upvotes": 0,
		"Views": 14,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "0ac02483-ea8d-4e60-b390-417acb35fe8b",
		"PostId": "366d98b1-919a-4c69-91a9-2bf4cdee5eea",
		"Title": "Using useCapture in onclick listeners",
		"Description": "Using useCapture in onclick listeners",
		"Category": 1,
		"Tags": [
			"js",
			"click",
			"useCapture",
			"bubble",
			"capture"
		],
		"ContentItems": [
			{
				"ContentItemId": "3eb6038c-15b8-4bee-881c-889041294628",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Simulating different combinations of useCapture among nested divs.\nuseCapture is the third parameter in the event listeners."
			},
			{
				"ContentItemId": "26b2766b-a432-4179-ad06-edfcfa342a72",
				"Type": 1,
				"FlaskLang": 1,
				"Lang": 3,
				"Data": "<div class=\"block\" id=\"l\"> \n    <div class=\"block\" id=\"2\"> \n        <div class=\"block\" id=\"3\"></div>\n    </div>\n</div>"
			},
			{
				"ContentItemId": "0adc3572-34d9-42a8-9f88-c608d9a2035e",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "var states = [false, false, false];\nvar elem1 = document.getElementById(1);\nelem1.addEventListener('click', function(e) {\n\tconsole.log(1);\n}, states[1]);\nvar elem2 = document.getElementById(2);\nelem2.addEventListener('click', function(e) {\n\tconsole.log(2);\n}, states[2]);\nvar elem3 = document.getElementById(3);\nelem3.addEventListener('click', function(e) {\n\tconsole.log(3);\n}, states[3]);"
			},
			{
				"ContentItemId": "37ad7efb-bf77-4507-8c80-51c134192996",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Below is the matrix displaying the values logged to console when the combinations were used in the order given."
			},
			{
				"ContentItemId": "bd75998e-1943-417d-afbd-f5f4b344e501",
				"Type": 1,
				"FlaskLang": 1,
				"Lang": 3,
				"Data": "Values    Click on #1    Click on #2    Click on #3\nF F F       1\t            21\t            321\nF F T\t    1\t            21 \t            321\nF T F\t    1\t            21\t            231\nT F F\t    1\t            12\t            132\nF T T\t    1\t            21\t            231\nT F T\t    1\t            12\t            132\nT T F\t    1\t            12\t            123\nT T T\t    1\t            12\t            123\n"
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T13:58:09.3741416Z",
		"ModifiedOn": "2017-12-01T13:58:09.3741421Z",
		"Upvotes": 0,
		"Views": 14,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "0a384228-4923-4fdb-8dc5-d6e4f3668fb8",
		"PostId": "f486e872-6eaa-4ebc-8217-c4579c65976e",
		"Title": "debounce in JavaScript",
		"Description": "Debounce in JavaScript",
		"Category": 1,
		"Tags": [
			"js",
			"debounce"
		],
		"ContentItems": [
			{
				"ContentItemId": "8e088eea-9cd6-45b0-8849-08227d933643",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "var debounced = function(callback, wait) {\n\tvar timeout;\n\treturn function() {\n\t\tvar context = this, args = arguments;\n\t\tvar later = function() {\n\t\t\ttimeout = null;\n\t\t\tcallback.apply(context, args);\n\t\t};\n\t\tclearTimeout(timeout);\n\t\ttimeout = setTimeout(later, wait);\n\t};\n};\n\n\n// USAGE\nvar handler = function(){\n\tconsole.log(1);\n};\nvar sct = debounced (handler, 250);\ndocument.addEventListener('scroll', sct);"
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T14:03:27.5914361Z",
		"ModifiedOn": "2017-12-01T14:03:45.7026779Z",
		"Upvotes": 0,
		"Views": 15,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "163260e6-1bb6-45d7-95e5-de62c34ad827",
		"PostId": "2b62165e-0b89-4a40-b66d-f616153319c0",
		"Title": "throttle in JavaScript",
		"Description": "throttle in JavaScript",
		"Category": 1,
		"Tags": [
			"js",
			"throttle"
		],
		"ContentItems": [
			{
				"ContentItemId": "1dd109d0-67a5-4b3c-8c53-86fba9e49c04",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "var throttle = function(callback, limit){\n\tvar timeout;\n\treturn function() {\n\t\tvar context = this, args = arguments;\n\t\tvar later = function(){\n\t\t\ttimeout = null;\n\t\t};\n\t\tif(!timeout) {\n\t\t\tcallback.apply(context, args);\n\t\t\ttimeout = setTimeout(later, limit);\n\t\t}\n\t};  \n};\n\n//USAGE\nvar handler = function(){\n\tconsole.log(1);\n};\nvar sct = throttle(handler, 250);\ndocument.addEventListener('scroll', sct);\n"
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T14:04:52.3825162Z",
		"ModifiedOn": "2017-12-01T14:04:52.3825167Z",
		"Upvotes": 0,
		"Views": 12,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "af62be72-94e8-489a-aea8-51a3d8a96a98",
		"PostId": "cc3c548f-2338-4b4d-8d3d-af7515176009",
		"Title": "A simple Promise implementation",
		"Description": "A simple Promise implementation",
		"Category": 1,
		"Tags": [
			"js",
			"promise"
		],
		"ContentItems": [
			{
				"ContentItemId": "13a1afc9-382a-4f74-9980-57d54cac30de",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "The class would look like"
			},
			{
				"ContentItemId": "9d816e44-ae3c-401b-bf85-f24af1ff7444",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "var Promise = (function (Promise) {\n\tfunction Promise(fn) {\n\t\tthis.promiseFn = fn;\n\t}\n\tPromise.prototype.then = function (success, failure) {\n\t\tvar resolve = function (data) {\n\t\t\tsuccess(data);\n\t\t};\n\t\tvar reject = function (data) {\n\t\t\tfailure(data);\n\t\t};\n\t\tthis.promiseFn(resolve, reject);\n\t}\n\treturn Promise;\n})(Promise);"
			},
			{
				"ContentItemId": "d0dc6130-abfc-4a9e-b258-6b5ae73486a5",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Let see what we were trying to mimick."
			},
			{
				"ContentItemId": "ea4f6b55-4b6d-4fa2-9e94-b6c2b9e449e5",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "var p = new Promise(function (resolve, reject) {\n\tvar xhr = new XMLHttpRequest();\n\tvar url = 'https://reqres.in/api/users';\n\txhr.open('GET', url);\n\txhr.onerror = function (e) {\n\t\treject('ERROR');\n\t}\n\txhr.onload = function (e) {\n\t\tresolve(e.target.response);\n\t}\n\txhr.send();\n});\np.then(function (data) {\n\tconsole.log('success', data);\n}, function (data) {\n\tconsole.log('failure', data);\n}); "
			},
			{
				"ContentItemId": "aab7ee75-8b46-42a6-a136-519990688703",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Working Fiddle\nhttps://jsfiddle.net/qavq32u4/"
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T14:10:16.1181022Z",
		"ModifiedOn": "2017-12-01T14:11:17.1742494Z",
		"Upvotes": 0,
		"Views": 14,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "a02f3efe-8479-42aa-a7ee-d33f3d25423a",
		"PostId": "c8d1b868-2a56-4ba7-9baf-dc2ea0a68ebf",
		"Title": "Flattening a nested array",
		"Description": "flattening a nested array",
		"Category": 1,
		"Tags": [
			"js",
			"array",
			"recursive"
		],
		"ContentItems": [
			{
				"ContentItemId": "2c92f972-1467-4d89-954e-f009d28fdd8f",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "A recursive implementation"
			},
			{
				"ContentItemId": "708e1c40-4e51-4c3b-88d5-3f0f919a4e6b",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "var arr = [\n\t1, 2, [3], [4, 5], [[6]], [7, [8], 9], [[[10]]]\n];\n\nfunction flatten_array_recursive(arr) {\n\tvar result = [];\n\tarr.forEach(function (item) {\n\t\tif (item instanceof Array) { \n\t\t\tresult = result.concat(flatten_array_recursive(item)); \n\t\t}\n\t\telse { \n\t\t\tresult.push(item); \n\t\t}\n\t});\n\treturn result;\n\n}\n\n// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nconsole.log(flatten_array_recursive([].concat(arr)));"
			},
			{
				"ContentItemId": "52e1d875-d61e-490b-8187-18c258346c0a",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "An iterative equivalent"
			},
			{
				"ContentItemId": "68612328-3c16-4fd2-a1e1-7e40fad41e8e",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "var arr = [\n\t1, 2, [3], [4, 5], [[6]], [7, [8], 9], [[[10]]]\n];\n\nfunction flatten_array_iterative(arr) {\n\tvar result = [];\n\tvar clone = arr.slice(0);\n\twhile (clone.length) {\n\t\tvar item = clone.shift();\n\t\tif (item instanceof Array) { \n\t\t\tclone = item.concat(clone); \n\t\t}\n\t\telse { \n\t\t\tresult.push(item); \n\t\t}\n\t}\n\treturn result;\n}\n\n// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nconsole.log(flatten_array_iterative([].concat(arr)));"
			},
			{
				"ContentItemId": "b9daf3e4-8621-4e0e-8cc5-901fbbb11110",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Working Fiddle\nhttps://jsfiddle.net/y759Lre8/"
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T14:16:26.1136579Z",
		"ModifiedOn": "2017-12-01T14:17:06.686903Z",
		"Upvotes": 0,
		"Views": 14,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "cadc9ec6-9904-4371-8443-ccf6ef3d548c",
		"PostId": "32b02e93-60ed-4dfc-867e-05a5c1472cd2",
		"Title": "Look & Say sequence",
		"Description": "Look & Say sequence",
		"Category": 1,
		"Tags": [
			"js",
			"look and say",
			"look  n say"
		],
		"ContentItems": [
			{
				"ContentItemId": "4bbe19e8-af6d-4a22-850a-e32b06f4fc41",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "To generate a member of the sequence from the previous member, read off the digits of the previous member, counting the number of digits in groups of the same digit. For example:\n1 is read off as \"one 1\" or 11.\n11 is read off as \"two 1s\" or 21.\n21 is read off as \"one 2, then one 1\" or 1211.\n\nTo generate a sequence we can use the following implementation"
			},
			{
				"ContentItemId": "d10173e1-8606-4231-8440-ee934b24cba0",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "function generateSequence(str) {\n\tvar temp = [];\n\tfor (var i = 0; i < str.length; i++) {\n\t\tvar last = temp[i - 1];\n\t\tif (temp[i - 1] && temp[i - 1].data == str[i])  {\n\t\t\ttemp[i - 1].len++;\n\t\t} else {\n\t\t\ttemp.push({ data: str[i], len: 1 });\n\t\t}\n\t}\n\treturn temp.map(function (i) {\n\t\treturn i.len + i.data\n\t}).join('');\n}"
			},
			{
				"ContentItemId": "166eb1b7-cbb5-43f4-9918-3d6cfcd96046",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "And then we can use memoization to call the function repeatedly"
			},
			{
				"ContentItemId": "2b57f64b-0455-462b-a0de-22e886031385",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "var process = (function () {\n\tvar cache = {};\n\treturn function (n) {\n\t\tif (n == 0) {\n\t\t\treturn '1';\n\t\t}\n\t\tif (!cache[n]) {\n\t\t\tcache[n] = generateSequence(process(n - 1));\n\t\t}\n\t\treturn cache[n];\n\t};\n})();"
			},
			{
				"ContentItemId": "013a2ccf-b346-4946-bc4c-76f9753a8054",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Calling for the first 5 numbers"
			},
			{
				"ContentItemId": "a09ba71f-8b99-4a37-b260-75ca729261da",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "for (var i = 0; i <= 5; i++) {\n\tconsole.log(i, process(i));\n}\n\n0 \"1\"\n1 \"11\"\n2 \"21\"\n3 \"1211\"\n4 \"111221\"\n5 \"2111121211\""
			},
			{
				"ContentItemId": "d6d1811c-d95a-4f01-afb7-b329b4a0d7f8",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Working Fiddle\nhttps://jsfiddle.net/gfvcv2eL/"
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T14:23:35.9056507Z",
		"ModifiedOn": "2017-12-01T14:23:35.9056513Z",
		"Upvotes": 0,
		"Views": 11,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "ef91cae9-7407-4568-826a-5149e0bde531",
		"PostId": "b34912b3-2703-4907-9f0f-3ed95e897a47",
		"Title": "A simple Emitter implementation",
		"Description": "A simple Emitter implementation",
		"Category": 1,
		"Tags": [
			"js",
			"emitter",
			"subscription"
		],
		"ContentItems": [
			{
				"ContentItemId": "cd67235a-394e-4103-a0fe-03d5e5073328",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "A simple implementation for emitter with subscription based behaviour"
			},
			{
				"ContentItemId": "1b7b7043-901e-4036-87ae-6ee09ccda4fc",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "var emitter = new Emitter();\n\n// 1. Support subscribing to events.\nsub = emitter.subscribe('event_name', callback);\nsub2 = emitter.subscribe('event_name', callback2);\n\n// 2. Support emitting events.\n// This particular example should lead to the `callback` above\n// being invoked with `foo` and `bar` as parameters.\nemitter.emit('event_name', foo, bar);\n\n// 3. Support unsubscribing existing subscriptions by releasing\n//    them.\nsub.release(); \n// `sub` is the reference returned by \n// `subscribe` above\n"
			},
			{
				"ContentItemId": "88201533-86ab-4eaa-98c3-b71a71eb1666",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Lets look at the class implementation.\nWe would rely on Closure based implementation to return aa direct reference for invoking the release functionality."
			},
			{
				"ContentItemId": "1db24223-8b6c-40bf-b3a9-ee5964dbda8d",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "function Emitter() {\n\tthis.events = {};\n}\n\nEmitter.prototype.subscribe = function (event, callback) {\n\tvar self = this;\n\tif (!self.events[event]) {\n\t\tself.events[event] = [];\n\t}\n\tvar id = Math.floor(Math.random() * 1000);\n\tvar callbackObj = { id: id, callback: callback, event: event };\n\tself.events[event].push(callbackObj);\n\tvar release = (function () {\n\t\tvar obj = callbackObj;\n\t\treturn function () {\n\t\t\tself.events[obj.event] =\n\t\t\t\tself.events[obj.event].filter(function (cb) {\n\t\t\t\t\treturn cb.id !== obj.id;\n\t\t\t\t});\n\t\t\tif (self.events[obj.event].length === 0) {\n\t\t\t\tdelete self.events[obj.event];\n\t\t\t}\n\t\t};\n\t})();\n\treturn { release };\n}\n\nEmitter.prototype.emit = function () {\n\tvar self = this;\n\tvar event = arguments[0];\n\tvar args = Array.from(arguments).splice(1);\n\tif (self.events[event] && self.events[event].length > 0) {\n\t\tself.events[event].forEach(function (cb) {\n\t\t\tcb.callback.apply(null, args);\n\t\t});\n\t}\n}"
			},
			{
				"ContentItemId": "2f2638d1-7965-4070-b929-3af4bc68e4e9",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Working Fiddle\nhttps://jsfiddle.net/k2pdeusn/"
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T16:29:15.0363508Z",
		"ModifiedOn": "2017-12-01T16:30:55.0563584Z",
		"Upvotes": 0,
		"Views": 9,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "310d6ff1-84b1-44cf-8954-5f83c1aaeac4",
		"PostId": "bdb73a8c-1bde-4b96-b941-fdcbe106a4a0",
		"Title": "Using requestAnimationFrame",
		"Description": "Using requestAnimationFrame",
		"Category": 1,
		"Tags": [
			"js",
			"rAf"
		],
		"ContentItems": [
			{
				"ContentItemId": "1ef7f354-b2d7-4df6-be04-82ad29f6a896",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Calls wrapped inside rAF are equivalent to throttling the same with a 16.67 ms duration. This is the exact length of one animation frame in modern web browsers i.e. 60 fps."
			},
			{
				"ContentItemId": "cc6ca99a-71c5-4096-993b-86ad894f7da8",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "var ticking = false;\nvar update = function () {\n\t// do something\n\tticking = false;\n};\nfunction OnScrollHandler() {\n\tif (!ticking) {\n\t\trequestAnimationFrame(update);\n\t}\n\tticking = true;\n}"
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T16:36:52.5209658Z",
		"ModifiedOn": "2017-12-01T16:36:52.5209663Z",
		"Upvotes": 0,
		"Views": 6,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "e8b61603-80ba-4104-b89b-c10c4e0f9123",
		"PostId": "3eac7cb6-6cc4-4215-ab5c-83cf68be4a62",
		"Title": "Babylonian Method",
		"Description": "Babylonian method for calculating square root of a number",
		"Category": 1,
		"Tags": [
			"js",
			"babylonian",
			"sqrt"
		],
		"ContentItems": [
			{
				"ContentItemId": "e45f2663-e8c7-4a6f-8a65-38a5255eb621",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "The approach uses an recursive approach to calculating the sqrt of an number by repeatedly lessening the guessed value until it reaches a threshold"
			},
			{
				"ContentItemId": "e0bdedd1-69a2-4023-ba22-5e6d07ddbffa",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "function sqrt(n, guess) {\n\tif (!guess)\n\t\tguess = n / 2;\n\tvar divided = n / guess;\n\tvar avg_guess = (divided + guess) / 2;\n\tif (guess === avg_guess || guess - avg_guess < 0.0000001)\n\t\treturn guess;\n\treturn sqrt(n, avg_guess);\n}\n\n//    6.000000002793968\nconsole.log(sqrt(36));"
			},
			{
				"ContentItemId": "90310e9a-a5de-4f21-a251-4990906fdae2",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Working Fiddle\nhttps://jsfiddle.net/1Lhwft94/"
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T16:44:08.0495619Z",
		"ModifiedOn": "2017-12-01T16:51:20.6515161Z",
		"Upvotes": 0,
		"Views": 8,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "685ab62b-a014-41f1-80b5-15dc1a3124b5",
		"PostId": "9334420c-7858-47ac-b0c4-06aaf4000b22",
		"Title": "Using native XHR for get & post requests",
		"Description": "Using native XHR for get & post requests",
		"Category": 1,
		"Tags": [
			"js",
			"xhr",
			"XmlHttpRequest"
		],
		"ContentItems": [
			{
				"ContentItemId": "c9adf5b0-9824-40ac-bce4-d9e3c831aeb3",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Basic GET implementation using XHR"
			},
			{
				"ContentItemId": "fbfcd27e-b757-4f79-b56c-d1e67df93e29",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "var req = new XMLHttpRequest();\nvar url = \"http://blah-blah.blah\";\nreq.open('GET', url, true);\nreq.onreadystatechange = function () {\n\tif (req.readyState === XMLHttpRequest.DONE && req.status == 200) {\n\t\tconsole.log(req.responseText);\n\t}\n}\nreq.send();"
			},
			{
				"ContentItemId": "2f8285bd-48bc-4fcb-9b6f-2c954719ba96",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Basic POST implementation using XHR"
			},
			{
				"ContentItemId": "db231127-2c52-4cc6-922e-71f91be191f6",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "var req = new XMLHttpRequest();\nvar url = \"http://blah-blah.blah\";\nreq.open('POST', url, true);\nreq.setRequestHeader(\"Content-type\", \"XXXX\");\nreq.onreadystatechange = function () {\n\tif (req.readyState === XMLHttpRequest.DONE && req.status == 200) {\n\t\tconsole.log(req.responseText);\n\t}\n}\nvar body = {};\nreq.send(body);"
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T16:50:55.8611926Z",
		"ModifiedOn": "2017-12-01T16:50:55.8611931Z",
		"Upvotes": 0,
		"Views": 6,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "06211536-95c6-41ff-92e9-36a53e62ca82",
		"PostId": "1996d37f-f43b-4499-809c-052411d9a15d",
		"Title": "Basic tooltip implementation",
		"Description": "Basic tooltip implementation in vanilla JS",
		"Category": 2,
		"Tags": [
			"html5",
			"js",
			"tooltip",
			"mouseout",
			"mousover"
		],
		"ContentItems": [
			{
				"ContentItemId": "054a98f7-d6ab-451d-aa22-488b16e5c882",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "We would be looking at a basic tooltip implementation which shows text when hovered over a div."
			},
			{
				"ContentItemId": "84518be2-5523-491e-bb96-a53439fb6c3a",
				"Type": 1,
				"FlaskLang": 1,
				"Lang": 3,
				"Data": "<div style=\"display: block; height: 1200px\"></div>\n<div data-tooltip=\"lorem ipsum\" id=\"temp\" \n    style=\"display: inline;\">\n    Hello Its me lorem ipsum dolor sit amet !\n</div>\n<div style=\"display: block; height: 800px\">\n"
			},
			{
				"ContentItemId": "833f5204-d9f8-4c13-962b-eb456a19868a",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Now lets look at the accompanying JS snippet. The ,mouseout listener is basic and removes all tooltip regardless and could be implemented better."
			},
			{
				"ContentItemId": "0c3d80f5-32d0-4fb7-bf76-5ca516b6b3ea",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "document.addEventListener('DOMContentLoaded', function () {\n\tvar elem = document.getElementById('temp');\n\telem.addEventListener('mouseover', function (e) {\n\t\tvar tooltip = e.target.getAttribute('data-tooltip');\n\t\tif (tooltip) {\n\t\t\tconsole.log(tooltip);\n\t\t\tvar tooltipElem = document.createElement('div');\n\t\t\ttooltipElem.classList.add('tooltip');\n\t\t\ttooltipElem.innerHTML += tooltip;\n\t\t\ttooltipElem.style.backgroundColor = '#000';\n\t\t\ttooltipElem.style.color = '#fff';\n\t\t\ttooltipElem.style.position = 'fixed';\n\t\t\ttooltipElem.style.opacity = 0;\n\t\t\tdocument.body.append(tooltipElem);\n\t\t\tvar clientRect = tooltipElem.getBoundingClientRect();\n\t\t\tvar holderRect = e.target.getBoundingClientRect();\n\t\t\ttooltipElem.style.top = \n\t\t\t\t(holderRect.top - clientRect.height) \n\t\t\t\t+ 'px';\n\t\t\ttooltipElem.style.left = \n\t\t\t\t(holderRect.left \n\t\t\t\t\t+ (holderRect.width / 2) \n\t\t\t\t\t- (clientRect.width / 2)) \n\t\t\t\t+ 'px';\n\t\t\ttooltipElem.style.opacity = 1;\n\t\t}\n\t});\n\telem.addEventListener('mouseout', function(e){\n\t\tvar tooltips = document.querySelectorAll('.tooltip');\n\t\tfor(var i = 0; i < tooltips.length; i++) {\n    \ttooltips[i].remove();\n    }\n  });\n});\n"
			},
			{
				"ContentItemId": "91458707-f57a-438c-8c52-c49adbed1f46",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Working Fiddle\nhttps://jsfiddle.net/6040dar5/1/"
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T17:03:09.3418615Z",
		"ModifiedOn": "2017-12-01T17:04:38.4811146Z",
		"Upvotes": 0,
		"Views": 13,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "b6cbd5a8-b9f1-4d08-842f-313814ea0b68",
		"PostId": "3dc203ee-a213-41b9-a078-4de69bd61974",
		"Title": "Forcing object creation through NEW only",
		"Description": "Forcing Object creation through NEW only",
		"Category": 1,
		"Tags": [
			"js",
			"new"
		],
		"ContentItems": [
			{
				"ContentItemId": "c3ec9b91-9fa0-45e9-8718-89697fbf82cd",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "function User(nameValue) {\n\tif (!(this instanceof User)) {\n\t\treturn new User(nameValue);\n\t}\n\tthis.name = nameValue;\n}\n\nvar a = User('hello');\nconsole.log(a);\nvar b = new User('hellow');\nconsole.log(b);"
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T17:29:01.0058425Z",
		"ModifiedOn": "2017-12-01T17:29:01.0058431Z",
		"Upvotes": 0,
		"Views": 4,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "aecde19a-a304-4e58-bf27-9214475a7bca",
		"PostId": "4b9e99e3-0fed-4cad-8ad2-b7b87e07449b",
		"Title": "Merge sort implementation",
		"Description": "Merge sort implementation",
		"Category": 1,
		"Tags": [
			"js",
			"mergesort",
			"sort",
			"array"
		],
		"ContentItems": [
			{
				"ContentItemId": "53ba1d40-9ea9-4ced-b03b-9c447408a820",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Merge Sort is a Divide and Conquer algorithm. It divides input array in two halves, calls itself for the two halves and then merges the two sorted halves. The merge() function is used for merging two halves. The merge(arr, l, m, r) is key process that assumes that arr[l..m] and arr[m+1..r] are sorted and merges the two sorted sub-arrays into one.\n\nLets look at the merge function"
			},
			{
				"ContentItemId": "d0ee2ea6-29ab-4c70-b41a-35064fae8a59",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "function merge(arr, low, mid, high) {\n\tvar low1 = low;\n\tvar low2 = mid + 1;\n\tvar i = 0;\n\tvar len = Array(high - low + 1);\n\tvar newarr = Array(len);\n\twhile (low1 <= mid && low2 <= high) {\n\t\tif (arr[low1] > arr[low2]) {\n\t\t\tnewarr[i] = arr[low2];\n\t\t\tlow2++;\n\t\t} else {\n\t\t\tnewarr[i] = arr[low1];\n\t\t\tlow1++;\n\t\t}\n\t\ti++\n\t}\n\twhile (low1 <= mid) {\n\t\tnewarr[i] = arr[low1];\n\t\ti++;\n\t\tlow1++;\n\t}\n\twhile (low2 <= high) {\n\t\tnewarr[i] = arr[low2];\n\t\ti++;\n\t\tlow2++;\n\t}\n\ti = 0;\n\tfor (var j = low; j <= high; j++) {\n\t\tarr[j] = newarr[i++];\n\t}\n}"
			},
			{
				"ContentItemId": "beaf1f53-9d75-4474-97a0-1e5fffd1dda4",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "The merge would be called recursively inside a sort method."
			},
			{
				"ContentItemId": "aeaf1cd8-f717-4044-bb35-7a0629cc03fb",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "function sort(arr, low, high) {\n\tif (low < high) {\n\t\tvar mid = Math.floor((low + high) / 2);\n\t\tsort(arr, low, mid);\n\t\tsort(arr, mid + 1, high);\n\t\tmerge(arr, low, mid, high);\n\t}\n}"
			},
			{
				"ContentItemId": "4981e297-cb6c-49ee-82c5-6b965a3d7fa0",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "The function can be called as following:"
			},
			{
				"ContentItemId": "77dde3bf-9d69-4aa5-84bb-02577ccfa272",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "var temp = [10, 45, 2, 3, 1, -1, 42, 100, 34];\nsort(temp, 0, temp.length - 1);"
			},
			{
				"ContentItemId": "1bd53c2d-6e66-4fe9-8500-66dcf4e267e2",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Working Fiddle\nhttps://jsfiddle.net/60rbf48q/"
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T17:33:22.0632366Z",
		"ModifiedOn": "2017-12-01T17:34:02.9972639Z",
		"Upvotes": 0,
		"Views": 6,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "05d932ca-bc2a-489b-908c-09edb62fa09c",
		"PostId": "23025be4-6450-40c4-9d4a-3ee918e1604c",
		"Title": "Quick sort implementation",
		"Description": "Quick sort implementation",
		"Category": 1,
		"Tags": [
			"js",
			"quicksort",
			"sort",
			"array"
		],
		"ContentItems": [
			{
				"ContentItemId": "f8dfb9e9-2fc7-4273-a140-f485d6c1bb7f",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "QuickSort is a Divide and Conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot. We are picking up the last element as the pivot. The key process in quickSort is partition(). Target of partitions is, given an array and an element x of array as pivot, put x at its correct position in sorted array and put all smaller elements (smaller than x) before x, and put all greater elements (greater than x) after x. All this should be done in linear time.\n\nLets look at the partition method."
			},
			{
				"ContentItemId": "cb5b766a-3017-4246-85e6-8de255de5d2e",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "function partition(arr, start, end) {\n\tvar pIndex = start;\n\tvar pivot = arr[end];\n\tfor (var i = start; i < end; i++) {\n\t\tif (arr[i] <= pivot) {\n\t\t\tvar temp = arr[i];\n\t\t\tarr[i] = arr[pIndex];\n\t\t\tarr[pIndex] = temp;\n\t\t\tpIndex++;\n\t\t}\n\t}\n\tvar temp = arr[pIndex];\n\tarr[pIndex] = arr[end];\n\tarr[end] = temp;\n\treturn pIndex;\n}"
			},
			{
				"ContentItemId": "2fa5fba2-6260-4879-a405-57ed72116f76",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "The method would be called once before quicksort is called recursively."
			},
			{
				"ContentItemId": "d37ded96-e262-4c92-b354-b92d171cd51c",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "function quicksort(arr, start, end) {\n\tif (start >= end)\n\t\treturn;\n\tvar pivotIndex = partition(arr, start, end);\n\tquicksort(arr, start, pivotIndex - 1);\n\tquicksort(arr, pivotIndex + 1, end);\n}"
			},
			{
				"ContentItemId": "142145aa-498f-4bd7-83bb-5b008dd3414e",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "The sorting would be called as :"
			},
			{
				"ContentItemId": "244ef268-1f1c-4a40-afdb-df37dd322dff",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "var a = [10, 1, 89, 23, 67, 11, 0, 34, 25];\nquicksort(a, 0, a.length - 1);"
			},
			{
				"ContentItemId": "f37ed69f-9003-44a8-9b15-d6d7434708ae",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Working Fiddle\nhttps://jsfiddle.net/wuc9jr8f/"
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T17:38:29.3676223Z",
		"ModifiedOn": "2017-12-01T17:43:18.3799674Z",
		"Upvotes": 0,
		"Views": 8,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "cefc833a-8153-4127-b9d4-bf4b8089ae61",
		"PostId": "3695e03e-fa3c-4cc6-b007-3a4bf1d14970",
		"Title": "Number of inversions in a sorted array",
		"Description": "Number of inversions in a sorted array",
		"Category": 1,
		"Tags": [
			"js",
			"inversion",
			"array",
			"sorted"
		],
		"ContentItems": [
			{
				"ContentItemId": "01f8b12b-7a4e-4266-b356-befbd0f5cd73",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Inversion Count for an array indicates – how far (or close) the array is from being sorted. If array is already sorted then inversion count is 0. If array is sorted in reverse order that inversion count is the maximum.Formally speaking, two elements a[i] and a[j] form an inversion \nif a[i] > a[j] and i < j.\n\nThe iterative solution would look like"
			},
			{
				"ContentItemId": "cdac4b21-2bbd-47e2-8b46-43fd08ca1993",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "function find_inv_count_iter(arr) {\n\tvar inv_count = 0;\n\tfor (var i = 0; i < arr.length - 1; i++) {\n\t\tfor (var j = i + 1; j < arr.length; j++) {\n\t\t\tif (arr[i] > arr[j]) {\n\t\t\t\tinv_count++;\n\t\t\t}\n\t\t}\n\t}\n\treturn inv_count;\n}"
			},
			{
				"ContentItemId": "720d0f98-e98e-4742-8216-394af7e76704",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "For a recursive implementation, we would be using a variant of merge-sort algo to find out the number of inversions. Here is the implementation."
			},
			{
				"ContentItemId": "c3d316d9-0760-40d0-aaf6-57213594c260",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "function mergeSort(arr, low, mid, high) {\n\tvar len = high - low + 1;\n\tvar low1 = low, low2 = mid + 1;\n\tvar temp = new Array(len);\n\tvar count = 0;\n\tvar i = 0;\n\twhile (low1 <= mid && low2 <= high) {\n\t\tif (arr[low1] <= arr[low2]) {\n\t\t\ttemp[i++] = arr[low1++];\n\t\t} else {\n\t\t\ttemp[i++] = arr[low2++];\n\t\t\tcount = count + (mid - low1 + 1);\n\t\t\t// mid - low1 + 1 gives us the length \n\t\t\t// of the part of left sub array till\n\t\t\t// that point e,g, [4, 5, 6, 1, 2, 3]\n\t\t\t// is state nd we consider 4,1 right now\n\t\t}\n\t}\n\twhile (low1 <= mid) {\n\t\ttemp[i++] = arr[low1++];\n\t}\n\twhile (low2 <= high) {\n\t\ttemp[i++] = arr[low2++];\n\t}\n\ti = 0;\n\tfor (j = low; j <= high; j++) {\n\t\tarr[j] = temp[i++];\n\t}\n\treturn count;\n}"
			},
			{
				"ContentItemId": "b8b96207-c7d8-4449-ac30-ee2d9f44ec9d",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "The method would be placed inside a recursive call as in case of sort."
			},
			{
				"ContentItemId": "9cf2eb21-ba6f-4f2c-895f-142febf19b03",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "function find_inv_count_recursive(arr, start, end) {\n\tif (typeof start === 'undefined') start = 0;\n\tif (typeof end === 'undefined') end = arr.length - 1;\n\tvar inv_count = 0;\n\tif (start < end) {\n\t\tvar mid = Math.floor((start + end) / 2);\n\t\tinv_count = find_inv_count_recursive(arr, start, mid);\n\t\tinv_count = inv_count + find_inv_count_recursive(arr, mid + 1, end);\n\t\tinv_count = inv_count + mergeSort(arr, start, mid, end);\n\t}\n\treturn inv_count;\n}"
			},
			{
				"ContentItemId": "5b7c1998-f58a-4edc-a93d-36ec92d57732",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "The function can be called as"
			},
			{
				"ContentItemId": "cec28a45-ccb7-454a-a5a6-a1ba36a9c248",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "var a = [1, 20, 6, 4, 5, 3]; \nvar b = [1, 20, 6, 4, 5, 3]; \nconsole.log(find_inv_count_recursive(a)); // 9\nconsole.log(find_inv_count_iter(b)); // 9"
			},
			{
				"ContentItemId": "5ad781c4-0515-408a-9219-d5ff2bddbce3",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Working Fiddle\nhttp://jsfiddle.net/3L1vwqqq/1/"
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T17:50:54.2265413Z",
		"ModifiedOn": "2017-12-01T17:55:08.0849255Z",
		"Upvotes": 0,
		"Views": 10,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "e81684be-5529-4739-b2c9-eea13e38a286",
		"PostId": "6eeabc70-fae4-4eb9-bf50-899675f3e46e",
		"Title": "Deep cloning for JS objects",
		"Description": "Deep cloning for JS objects",
		"Category": 1,
		"Tags": [
			"js",
			"clone"
		],
		"ContentItems": [
			{
				"ContentItemId": "e949b506-aea2-49d1-977f-d23fb774515b",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Object.assign works but fails when nested object references come into play along with array types.\n\nSo, we need to loop through properties and rely on recursion to create clones."
			},
			{
				"ContentItemId": "d786800f-ec95-4fc4-8364-387c3a9b3a69",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "function getDeepCopy(obj) {\n\tif (null == obj || 'object' !== typeof obj) {\n\t\treturn obj;\n\t}\n\tlet copy = new obj.constructor();\n\tfor (const attr in obj) {\n\t\tif (obj.hasOwnProperty(attr)) {\n\t\t\tif ((obj[attr] instanceof Object)) {\n\t\t\t\tcopy[attr] = getDeepCopy(obj[attr]);\n\t\t\t} else {\n\t\t\t\tcopy[attr] = obj[attr];\n\t\t\t}\n\t\t}\n\t}\n\treturn copy;\n}"
			},
			{
				"ContentItemId": "17ee9c51-080e-42b0-a295-fa4dfc24021e",
				"Type": 0,
				"FlaskLang": null,
				"Lang": null,
				"Data": "Working Fiddle\nhttps://jsfiddle.net/3L7scLd9/2/"
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T17:58:28.2319926Z",
		"ModifiedOn": "2017-12-01T17:58:28.2319931Z",
		"Upvotes": 0,
		"Views": 4,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "89a277de-07ce-4dc3-994f-be0715bf408e",
		"PostId": "7409bee3-622a-4b9e-a546-eb94395ed269",
		"Title": "Decoding roman numerals",
		"Description": "Decoding roman numerals",
		"Category": 1,
		"Tags": [
			"js",
			"roman"
		],
		"ContentItems": [
			{
				"ContentItemId": "c20080e6-c5d6-48c6-aee4-4c6aff308c48",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "\nvar SYMBOLS = {\n\tI: 1,\n\tV: 5,\n\tX: 10,\n\tL: 50,\n\tC: 100,\n\tD: 500,\n\tM: 1000\n};\n\nfunction decode_roman(str) {\n\tvar result = 0;\n\tfor (var i = 0; i < str.length; i++) {\n\t\tvar value = SYMBOLS[str[i]];\n\t\tif (i < str.length) {\n\t\t\tvar valueNext = SYMBOLS[str[i + 1]];\n\t\t\tif (value < valueNext) {\n\t\t\t\tresult = result - value + valueNext;\n\t\t\t\ti++;\n\t\t\t} else {\n\t\t\t\tresult = result + value;\n\t\t\t}\n\t\t}\n\t}\n\treturn result;\n}"
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T18:09:17.9066779Z",
		"ModifiedOn": "2017-12-01T18:09:17.9066785Z",
		"Upvotes": 0,
		"Views": 2,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	},
	{
		"id": "81f0ab3c-5e7d-48e2-8120-5afc67192463",
		"PostId": "87caf9a4-d846-41e6-96d3-330faca5da0b",
		"Title": "Encoding roman numerals",
		"Description": "Encoding roman numerals",
		"Category": 1,
		"Tags": [
			"js",
			"roman"
		],
		"ContentItems": [
			{
				"ContentItemId": "3f562b5d-5ade-41de-b284-72ea12b0a8d2",
				"Type": 1,
				"FlaskLang": 0,
				"Lang": 0,
				"Data": "function encode_roman(num) {\n\tif (num === 0)\n\t\treturn '';\n\telse {\n\t\tvar divisor = 1;\n\t\tvar token = '';\n\t\tif (num >= 1000) {\n\t\t\tdivisor = 1000;\n\t\t\ttoken = 'M'\n\t\t} else if (num >= 900) {\n\t\t\tdivisor = 900;\n\t\t\ttoken = 'CM'\n\t\t} else if (num >= 500) {\n\t\t\tdivisor = 500;\n\t\t\ttoken = 'D'\n\t\t} else if (num >= 400) {\n\t\t\tdivisor = 400;\n\t\t\ttoken = 'CD'\n\t\t} else if (num >= 100) {\n\t\t\tdivisor = 100;\n\t\t\ttoken = 'C'\n\t\t} else if (num >= 50) {\n\t\t\tdivisor = 50;\n\t\t\ttoken = 'L'\n\t\t} else if (num >= 40) {\n\t\t\tdivisor = 40;\n\t\t\ttoken = 'XL'\n\t\t} else if (num >= 10) {\n\t\t\tdivisor = 10;\n\t\t\ttoken = 'X'\n\t\t} else if (num >= 9) {\n\t\t\tdivisor = 9;\n\t\t\ttoken = 'IX'\n\t\t} else if (num >= 5) {\n\t\t\tdivisor = 5;\n\t\t\ttoken = 'V'\n\t\t} else if (num >= 4) {\n\t\t\tdivisor = 4;\n\t\t\ttoken = 'IV'\n\t\t} else if (num >= 1) {\n\t\t\tdivisor = 1;\n\t\t\ttoken = 'I'\n\t\t}\n\t\tvar result = '';\n\t\tvar quotient = Math.floor(num / divisor);\n\t\twhile (quotient--) {\n\t\t\tresult = result + token;\n\t\t}\n\t\treturn result + encode_roman(num % divisor);\n\t}\n}"
			}
		],
		"State": 0,
		"CreatedOn": "2017-12-01T18:10:12.0343476Z",
		"ModifiedOn": "2017-12-01T18:14:42.4736771Z",
		"Upvotes": 0,
		"Views": 4,
		"IsPublished": true,
		"IsSuspended": false,
		"Author": {
			"AuthorDocumentId": "b574caac-e968-4d81-aa92-c9cffe6fa8e8",
			"Alias": "asitparida",
			"ImgSrc": "https://avatars1.githubusercontent.com/u/5743601?v=4"
		}
	}]; 