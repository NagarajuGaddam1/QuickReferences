/* tslint:disable:max-line-length*/
export const Posts = [{
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
}];
