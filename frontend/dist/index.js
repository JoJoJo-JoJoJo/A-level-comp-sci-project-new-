/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Component.ts"
/*!*************************************!*\
  !*** ./src/components/Component.ts ***!
  \*************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
let id = 0;
class Component {
    state;
    componentId;
    constructor() {
        this.componentId = (id++).toString();
        this.render = new Proxy(this.render, this.renderHandler);
    }
    setState(state) {
        this.state = new Proxy(state, this.fieldHandler);
    }
    renderHandler = {
        apply: (target, thisArg, argArr) => {
            const newComponent = target.apply(thisArg, ...argArr);
            newComponent.dataset.componentId = this.componentId;
            const oldComponent = document.querySelector(`[data-component-id="${this.componentId}"]`);
            oldComponent?.replaceWith(newComponent);
            return newComponent;
        },
    };
    fieldHandler = {
        set: (target, prop, value) => {
            console.log("Changing state");
            target[prop] = value;
            this.render();
            return true;
        },
    };
    isComponent() {
        return true;
    }
}
exports["default"] = Component;


/***/ },

/***/ "./src/components/createElement.ts"
/*!*****************************************!*\
  !*** ./src/components/createElement.ts ***!
  \*****************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createElement = createElement;
function isStringOrHTMLElementOrComponent(arg) {
    return (arg !== undefined &&
        (arg instanceof HTMLElement ||
            typeof arg === "string" ||
            "isComponent" in arg));
}
function assignAttributes(htmlElement, attr) {
    attr.forEach(([key, val]) => {
        if (typeof val === "boolean") {
            htmlElement[key] = val;
            return;
        }
        if (typeof val === "string") {
            htmlElement.setAttribute(key, val);
        }
    });
}
function assignEventListeners(htmlElement, events) {
    events.forEach(([key, val]) => {
        htmlElement.addEventListener(key.slice(2), val);
    });
}
function createElement(type, ...args) {
    const element = document.createElement(type);
    const attributes = args.find((arg) => !isStringOrHTMLElementOrComponent(arg));
    const innerContent = args.filter(isStringOrHTMLElementOrComponent);
    if (attributes) {
        const attr = Object.entries(attributes).filter(([key]) => !key.startsWith("on"));
        const events = Object.entries(attributes).filter(([key]) => key.startsWith("on"));
        assignAttributes(element, attr);
        assignEventListeners(element, events);
    }
    if (innerContent) {
        innerContent.forEach((child) => {
            if (typeof child !== "string" && "isComponent" in child) {
                const rendered = child.render();
                if (Array.isArray(rendered)) {
                    element.append(...rendered);
                }
                else {
                    element.append(rendered);
                }
            }
            else {
                element.append(child);
            }
        });
    }
    return element;
}


/***/ },

/***/ "./src/components/generic/Btn.ts"
/*!***************************************!*\
  !*** ./src/components/generic/Btn.ts ***!
  \***************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NavBtn = void 0;
const Component_1 = __importDefault(__webpack_require__(/*! ../Component */ "./src/components/Component.ts"));
const htmlElementsArtificial_1 = __webpack_require__(/*! ../htmlElementsArtificial */ "./src/components/htmlElementsArtificial.ts");
class Btn extends Component_1.default {
    constructor(classes, text, onclick) {
        super();
        this.setState({
            classes,
            text,
            onclick,
        });
    }
    render() {
        return (0, htmlElementsArtificial_1.button)({
            class: "btn " + this.state.classes,
            onclick: this.state.onclick,
        }, (0, htmlElementsArtificial_1.p)({
            class: "btn-text",
        }, this.state.text));
    }
}
exports["default"] = Btn;
class NavBtn extends Btn {
    constructor(classes, href, text, onclick) {
        super(classes, text, onclick);
        this.setState({
            classes,
            href,
            text,
            onclick,
        });
    }
    render() {
        return (0, htmlElementsArtificial_1.a)({
            class: "btn-link",
            onclick: this.state.onclick,
            href: this.state.href,
        }, (0, htmlElementsArtificial_1.button)({
            class: "btn " + this.state.classes,
        }, (0, htmlElementsArtificial_1.p)({
            class: "btn-text",
        }, this.state.text)));
    }
}
exports.NavBtn = NavBtn;


/***/ },

/***/ "./src/components/htmlElementsArtificial.ts"
/*!**************************************************!*\
  !*** ./src/components/htmlElementsArtificial.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.span = exports.input = exports.label = exports.form = exports.time = exports.dialog = exports.button = exports.nav = exports.section = exports.aside = exports.p = exports.h2 = exports.h1 = exports.header = exports.a = exports.li = exports.ul = exports.div = void 0;
const createElement_1 = __webpack_require__(/*! ./createElement */ "./src/components/createElement.ts");
const div = (...args) => (0, createElement_1.createElement)("div", ...args);
exports.div = div;
const ul = (...args) => (0, createElement_1.createElement)("ul", ...args);
exports.ul = ul;
const li = (...args) => (0, createElement_1.createElement)("li", ...args);
exports.li = li;
const a = (...args) => (0, createElement_1.createElement)("a", ...args);
exports.a = a;
const header = (...args) => (0, createElement_1.createElement)("header", ...args);
exports.header = header;
const h1 = (...args) => (0, createElement_1.createElement)("h1", ...args);
exports.h1 = h1;
const h2 = (...args) => (0, createElement_1.createElement)("h2", ...args);
exports.h2 = h2;
const p = (...args) => (0, createElement_1.createElement)("p", ...args);
exports.p = p;
const aside = (...args) => (0, createElement_1.createElement)("aside", ...args);
exports.aside = aside;
const section = (...args) => (0, createElement_1.createElement)("section", ...args);
exports.section = section;
const nav = (...args) => (0, createElement_1.createElement)("nav", ...args);
exports.nav = nav;
const button = (...args) => (0, createElement_1.createElement)("button", ...args);
exports.button = button;
const dialog = (...args) => (0, createElement_1.createElement)("dialog", ...args);
exports.dialog = dialog;
const time = (...args) => (0, createElement_1.createElement)("time", ...args);
exports.time = time;
const form = (...args) => (0, createElement_1.createElement)("form", ...args);
exports.form = form;
const label = (...args) => (0, createElement_1.createElement)("label", ...args);
exports.label = label;
const input = (...args) => (0, createElement_1.createElement)("input", ...args);
exports.input = input;
const span = (...args) => (0, createElement_1.createElement)("span", ...args);
exports.span = span;


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!***********************!*\
  !*** ./src/router.ts ***!
  \***********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const Btn_1 = __webpack_require__(/*! ./components/generic/Btn */ "./src/components/generic/Btn.ts");
const htmlElementsArtificial_1 = __webpack_require__(/*! ./components/htmlElementsArtificial */ "./src/components/htmlElementsArtificial.ts");
__webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../styles/global.css'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const registerBtn = new Btn_1.NavBtn("", "/forms/register", "Register", (e) => navigate(e, "/forms/register"));
const loginBtn = new Btn_1.NavBtn("", "/forms/login", "Login", (e) => navigate(e, "/forms/login"));
const routes = {
    "/": (0, htmlElementsArtificial_1.div)({
        class: "index-page-wrapper",
        id: "indexPageWrapper",
    }, registerBtn.render(), loginBtn.render()),
    "/home": (0, htmlElementsArtificial_1.h1)("home"),
    "/forms/register": (0, htmlElementsArtificial_1.h1)("form - register"),
    "/forms/login": (0, htmlElementsArtificial_1.h1)("form - login"),
    "/forms/change_password": (0, htmlElementsArtificial_1.h1)("form - change password"),
};
function navigate(event, path) {
    event.preventDefault();
    window.history.pushState({}, path, window.location.origin + path);
    updateContent();
}
function updateContent() {
    const path = window.location.pathname;
    const root = document.getElementById("root");
    root.replaceChildren(routes[path] || (0, htmlElementsArtificial_1.h1)("404 - Not Found"));
}
window.onpopstate = updateContent;
window.onload = updateContent;

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUM5RCxDQUFDO0FBR0QsTUFBTSxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQUM7QUFHbEMsTUFBTSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcm9udGVuZC8uL3NyYy9jb21wb25lbnRzL0NvbXBvbmVudC50cyIsIndlYnBhY2s6Ly9mcm9udGVuZC8uL3NyYy9jb21wb25lbnRzL2NyZWF0ZUVsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9zcmMvY29tcG9uZW50cy9nZW5lcmljL0J0bi50cyIsIndlYnBhY2s6Ly9mcm9udGVuZC8uL3NyYy9jb21wb25lbnRzL2h0bWxFbGVtZW50c0FydGlmaWNpYWwudHMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9zcmMvcm91dGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vPyBUaGlzIGNsYXNzIGlzIGEgYmFzZSBjbGFzcyB0byBiZSBleHRlbmRlZCBmcm9tIC0gSSBkaWRuJ3Qgd2FudCB0byBhZGQgYSBmcmFtZXdvcmsgdG8gdGhlIHByb2plY3Qgc28gSSBhbSB1c2luZyBhIHN0eWxlIG9mIGNvbXBvbmVudCBub3RhdGlvbiBpbnNwaXJlZCBieSBodHRwczovL3d3dy5kaXZvdGlvbi5jb20vYmxvZy9jcmVhdGluZy1qcy1jb21wb25lbnRzLXdpdGhvdXQtYS1mcmFtZXdvcmtcclxuXHJcbmxldCBpZCA9IDA7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBDb21wb25lbnQge1xyXG4gIHByb3RlY3RlZCBzdGF0ZTogYW55O1xyXG4gIHByb3RlY3RlZCBjb21wb25lbnRJZDogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8vPyBBc3NpZ25zIGVhY2ggY29tcG9uZW50IGFuIGlkIHNvIGl0IGlzIG1vcmUgZWFzaWx5IGZvdW5kIG9uIHRoZSBET00gZm9yIHJlLXJlbmRlcnMsIHN0YXRlIGNoYW5nZXMsIGV0Yy5cclxuICAgIHRoaXMuY29tcG9uZW50SWQgPSAoaWQrKykudG9TdHJpbmcoKTtcclxuICAgIHRoaXMucmVuZGVyID0gbmV3IFByb3h5KHRoaXMucmVuZGVyLCB0aGlzLnJlbmRlckhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgLy8/IFRoaXMgbWV0aG9kIHNldHMgc3RhdGUgdGhhdCBpcyBwZXJzaXN0ZWQgYWNyb3NzIHJlLXJlbmRlcnMgdGhyb3VnaCB0aGUgdXNlIG9mIFByb3h5IG9iamVjdHNcclxuICBwcm90ZWN0ZWQgc2V0U3RhdGUoc3RhdGU6IG9iamVjdCkge1xyXG4gICAgdGhpcy5zdGF0ZSA9IG5ldyBQcm94eShzdGF0ZSwgdGhpcy5maWVsZEhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgLy8/IFRoaXMgaGFuZGxlciBpcyB1c2VkIHRvIHRyYXAgZnVuY3Rpb24gY2FsbHMgb2YgdGhlIHJlbmRlciBtZXRob2QgYW5kIHJlLWFzc2lnbiB0aGUgb2xkIGNvbXBvbmVudCdzIGlkIHRvIHRoZSBuZXcgY29tcG9uZW50IC0tPiB0YXJnZXQgW1tDYWxsXV0gaW50ZXJuYWwgbWV0aG9kXHJcbiAgcmVuZGVySGFuZGxlcjogUHJveHlIYW5kbGVyPGFueT4gPSB7XHJcbiAgICBhcHBseTogKHRhcmdldCwgdGhpc0FyZywgYXJnQXJyKSA9PiB7XHJcbiAgICAgIGNvbnN0IG5ld0NvbXBvbmVudCA9IHRhcmdldC5hcHBseSh0aGlzQXJnLCAuLi5hcmdBcnIpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICBuZXdDb21wb25lbnQuZGF0YXNldC5jb21wb25lbnRJZCA9IHRoaXMuY29tcG9uZW50SWQ7XHJcblxyXG4gICAgICBjb25zdCBvbGRDb21wb25lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgIGBbZGF0YS1jb21wb25lbnQtaWQ9XCIke3RoaXMuY29tcG9uZW50SWR9XCJdYCxcclxuICAgICAgKTtcclxuICAgICAgb2xkQ29tcG9uZW50Py5yZXBsYWNlV2l0aChuZXdDb21wb25lbnQpO1xyXG4gICAgICByZXR1cm4gbmV3Q29tcG9uZW50O1xyXG4gICAgfSxcclxuICB9O1xyXG5cclxuICAvLz8gVGhpcyBoYW5kbGVyIGNhdXNlcyBhIHJlLXJlbmRlciBvZiB0aGUgdGFyZ2V0IGNvbXBvbmVudCB3aGlsc3QgcHJlc2VydmluZyBpdHMgc3RhdGUgLS0+IHRhcmdldCBbW1NldF1dIGludGVybmFsIG1ldGhvZFxyXG4gIGZpZWxkSGFuZGxlcjogUHJveHlIYW5kbGVyPGFueT4gPSB7XHJcbiAgICBzZXQ6ICh0YXJnZXQ6IGFueSwgcHJvcDogc3RyaW5nIHwgc3ltYm9sLCB2YWx1ZTogYW55KTogYm9vbGVhbiA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiQ2hhbmdpbmcgc3RhdGVcIik7XHJcbiAgICAgIHRhcmdldFtwcm9wXSA9IHZhbHVlO1xyXG4gICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgLy8/IFRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gaWRlbnRpZnkgYW5kIGRpc3Rpbmd1aXNoIGNvbXBvbmVudHMgKGkuZS4gY2hpbGRyZW4gb2YgdGhpcyBjbGFzcykgdGhyb3VnaG91dCB0aGUgY29kZWJhc2VcclxuICBpc0NvbXBvbmVudCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgYWJzdHJhY3QgcmVuZGVyKCk6IEhUTUxFbGVtZW50IHwgQXJyYXk8SFRNTEVsZW1lbnQ+O1xyXG59XHJcbiIsIi8vIFRoaXMgZmlsZSBjb250YWlucyB0aGUgY29yZSBsb2dpYyBhbmQgZnVuY3Rpb25hbGl0eSBvZiBidWlsZGluZyBvdXQgdGhlIEhUTUwgZWxlbWVudHNcclxuXHJcbmltcG9ydCBDb21wb25lbnQgZnJvbSBcIi4vQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEV2ZW50SGFuZGxlckF0dHJpYnV0ZXMgfSBmcm9tIFwiLi9jb21wb25lbnRfdHlwZXMvRXZlbnRIYW5kbGVyQXR0cmlidXRlc1wiO1xyXG5pbXBvcnQgeyBHbG9iYWxBdHRyaWJ1dGVzIH0gZnJvbSBcIi4vY29tcG9uZW50X3R5cGVzL0dsb2JhbEF0dHJpYnV0ZXNcIjtcclxuaW1wb3J0IHsgRWxlbWVudERlZmluaXRpb24gfSBmcm9tIFwiLi9odG1sRWxlbWVudHNBcnRpZmljaWFsXCI7XHJcblxyXG50eXBlIEF0dHJpYnV0ZSA9IFtrZXlvZiBHbG9iYWxBdHRyaWJ1dGVzLCBhbnldO1xyXG50eXBlIEV2ZW50QXR0cmlidXRlID0gW2tleW9mIEV2ZW50SGFuZGxlckF0dHJpYnV0ZXMgfCBzdHJpbmcsIEZ1bmN0aW9uXTtcclxuXHJcbi8vPyBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIGdpdmVuIGFyZ3VtZW50IGlzIGEgc3RyaW5nLCBhIEhUTUwgZWxlbWVudCBvciBhIGNvbXBvbmVudFxyXG5mdW5jdGlvbiBpc1N0cmluZ09ySFRNTEVsZW1lbnRPckNvbXBvbmVudChhcmc6IEVsZW1lbnREZWZpbml0aW9uKTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIChcclxuICAgIGFyZyAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAoYXJnIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgfHxcclxuICAgICAgdHlwZW9mIGFyZyA9PT0gXCJzdHJpbmdcIiB8fFxyXG4gICAgICBcImlzQ29tcG9uZW50XCIgaW4gYXJnKVxyXG4gICk7XHJcbn1cclxuXHJcbi8vPyBBc3NpZ25zIGh0bWwgYXR0cmlidXRlKHMpIHRvIGEgZ2l2ZW4gZWxlbWVudFxyXG5mdW5jdGlvbiBhc3NpZ25BdHRyaWJ1dGVzKGh0bWxFbGVtZW50OiBhbnksIGF0dHI6IEFycmF5PEF0dHJpYnV0ZT4pIHtcclxuICBhdHRyLmZvckVhY2goKFtrZXksIHZhbF0pID0+IHtcclxuICAgIGlmICh0eXBlb2YgdmFsID09PSBcImJvb2xlYW5cIikge1xyXG4gICAgICBodG1sRWxlbWVudFtrZXldID0gdmFsO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICBodG1sRWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWwpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG4vLz8gQXNzaWducyBldmVudCBsaXN0ZW5lcihzKSB0byBhIGdpdmVuIGVsZW1lbnRcclxuZnVuY3Rpb24gYXNzaWduRXZlbnRMaXN0ZW5lcnMoXHJcbiAgaHRtbEVsZW1lbnQ6IGFueSxcclxuICBldmVudHM6IEFycmF5PEV2ZW50QXR0cmlidXRlPixcclxuKTogdm9pZCB7XHJcbiAgZXZlbnRzLmZvckVhY2goKFtrZXksIHZhbF0pID0+IHtcclxuICAgIC8vPyBBbGwgZXZlbnQgaGFuZGxlciBhdHRyaWJ1dGVzIG9uIGh0bWwgdXNlIHRoZSBub3RhdGlvbiBcIm9uPGV2ZW50PlwiLCBzbyBJIGNhbiBleHRyYWN0IHRoZSBldmVudCBuYW1lIGluIHRoZSBzYW1lIHdheSBjb25zaXN0ZW50bHlcclxuICAgIGh0bWxFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoa2V5LnNsaWNlKDIpLCB2YWwpO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vLz8gQ3JlYXRlcyBhIHNwZWNpZmljIHR5cGUgb2YgaHRtbCBlbGVtZW50IHdpdGggc3BlY2lmaWVkIGF0dHJpYnV0ZXMgYW5kL29yIGV2ZW50IGxpc3RlbmVyc1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0eXBlOiBzdHJpbmcsIC4uLmFyZ3M6IEFycmF5PEVsZW1lbnREZWZpbml0aW9uPikge1xyXG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xyXG5cclxuICBjb25zdCBhdHRyaWJ1dGVzID0gYXJncy5maW5kKFxyXG4gICAgKGFyZykgPT4gIWlzU3RyaW5nT3JIVE1MRWxlbWVudE9yQ29tcG9uZW50KGFyZyksXHJcbiAgKSBhcyBHbG9iYWxBdHRyaWJ1dGVzO1xyXG5cclxuICBjb25zdCBpbm5lckNvbnRlbnQgPSBhcmdzLmZpbHRlcihpc1N0cmluZ09ySFRNTEVsZW1lbnRPckNvbXBvbmVudCkgYXMgQXJyYXk8XHJcbiAgICBzdHJpbmcgfCBIVE1MRWxlbWVudCB8IENvbXBvbmVudFxyXG4gID47XHJcblxyXG4gIGlmIChhdHRyaWJ1dGVzKSB7XHJcbiAgICAvLz8gU2VwYXJhdGUgb3V0IHRoZSBldmVudCBsaXN0ZW5lcnMgYW5kIGF0dHJpYnV0ZXMgc28gSSBjYW4gYXNzaWduIHRoZW0gc2VwYXJhdGVseVxyXG4gICAgY29uc3QgYXR0ciA9IE9iamVjdC5lbnRyaWVzKGF0dHJpYnV0ZXMpLmZpbHRlcihcclxuICAgICAgKFtrZXldKSA9PiAha2V5LnN0YXJ0c1dpdGgoXCJvblwiKSxcclxuICAgICkgYXMgQXJyYXk8QXR0cmlidXRlPjtcclxuICAgIGNvbnN0IGV2ZW50cyA9IE9iamVjdC5lbnRyaWVzKGF0dHJpYnV0ZXMpLmZpbHRlcigoW2tleV0pID0+XHJcbiAgICAgIGtleS5zdGFydHNXaXRoKFwib25cIiksXHJcbiAgICApIGFzIEFycmF5PEV2ZW50QXR0cmlidXRlPjtcclxuXHJcbiAgICAvLz8gQXNzaWduIHRoZSBhdHRyaWJ1dGVzIGFuZCBldmVudCBsaXN0ZW5lcnNcclxuICAgIGFzc2lnbkF0dHJpYnV0ZXMoZWxlbWVudCwgYXR0cik7XHJcbiAgICBhc3NpZ25FdmVudExpc3RlbmVycyhlbGVtZW50LCBldmVudHMpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGlubmVyQ29udGVudCkge1xyXG4gICAgaW5uZXJDb250ZW50LmZvckVhY2goKGNoaWxkKSA9PiB7XHJcbiAgICAgIGlmICh0eXBlb2YgY2hpbGQgIT09IFwic3RyaW5nXCIgJiYgXCJpc0NvbXBvbmVudFwiIGluIGNoaWxkKSB7XHJcbiAgICAgICAgY29uc3QgcmVuZGVyZWQgPSBjaGlsZC5yZW5kZXIoKTtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZW5kZXJlZCkpIHtcclxuICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKC4uLnJlbmRlcmVkKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZWxlbWVudC5hcHBlbmQocmVuZGVyZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBlbGVtZW50LmFwcGVuZChjaGlsZCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGVsZW1lbnQ7XHJcbn1cclxuIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiLi4vQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IGEsIGJ1dHRvbiwgcCB9IGZyb20gXCIuLi9odG1sRWxlbWVudHNBcnRpZmljaWFsXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdG4gZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKGNsYXNzZXM6IHN0cmluZywgdGV4dDogc3RyaW5nLCBvbmNsaWNrOiAoZTogRXZlbnQpID0+IHZvaWQpIHtcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGNsYXNzZXMsXHJcbiAgICAgIHRleHQsXHJcbiAgICAgIG9uY2xpY2ssXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG92ZXJyaWRlIHJlbmRlcigpOiBIVE1MRWxlbWVudCB7XHJcbiAgICByZXR1cm4gYnV0dG9uKFxyXG4gICAgICB7XHJcbiAgICAgICAgY2xhc3M6IFwiYnRuIFwiICsgdGhpcy5zdGF0ZS5jbGFzc2VzLFxyXG4gICAgICAgIG9uY2xpY2s6IHRoaXMuc3RhdGUub25jbGljayxcclxuICAgICAgfSxcclxuICAgICAgcChcclxuICAgICAgICB7XHJcbiAgICAgICAgICBjbGFzczogXCJidG4tdGV4dFwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGhpcy5zdGF0ZS50ZXh0LFxyXG4gICAgICApLFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBOYXZCdG4gZXh0ZW5kcyBCdG4ge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgY2xhc3Nlczogc3RyaW5nLFxyXG4gICAgaHJlZjogc3RyaW5nLFxyXG4gICAgdGV4dDogc3RyaW5nLFxyXG4gICAgb25jbGljazogKGU6IEV2ZW50KSA9PiB2b2lkLFxyXG4gICkge1xyXG4gICAgc3VwZXIoY2xhc3NlcywgdGV4dCwgb25jbGljayk7XHJcblxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGNsYXNzZXMsXHJcbiAgICAgIGhyZWYsXHJcbiAgICAgIHRleHQsXHJcbiAgICAgIG9uY2xpY2ssXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG92ZXJyaWRlIHJlbmRlcigpOiBIVE1MRWxlbWVudCB7XHJcbiAgICByZXR1cm4gYShcclxuICAgICAge1xyXG4gICAgICAgIGNsYXNzOiBcImJ0bi1saW5rXCIsXHJcbiAgICAgICAgb25jbGljazogdGhpcy5zdGF0ZS5vbmNsaWNrLFxyXG4gICAgICAgIGhyZWY6IHRoaXMuc3RhdGUuaHJlZixcclxuICAgICAgfSxcclxuICAgICAgYnV0dG9uKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGNsYXNzOiBcImJ0biBcIiArIHRoaXMuc3RhdGUuY2xhc3NlcyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHAoXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGNsYXNzOiBcImJ0bi10ZXh0XCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgdGhpcy5zdGF0ZS50ZXh0LFxyXG4gICAgICAgICksXHJcbiAgICAgICksXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gXCIuL0NvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBHbG9iYWxBdHRyaWJ1dGVzIH0gZnJvbSBcIi4vY29tcG9uZW50X3R5cGVzL0dsb2JhbEF0dHJpYnV0ZXNcIjtcclxuaW1wb3J0IHsgSFRNTEVsZW1lbnRGdW5jdGlvbiB9IGZyb20gXCIuL2NvbXBvbmVudF90eXBlcy9IVE1MRWxlbWVudEZ1bmN0aW9uXCI7XHJcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwiLi9jcmVhdGVFbGVtZW50XCI7XHJcblxyXG5leHBvcnQgdHlwZSBFbGVtZW50RGVmaW5pdGlvbiA9XHJcbiAgfCBHbG9iYWxBdHRyaWJ1dGVzXHJcbiAgfCBzdHJpbmdcclxuICB8IEhUTUxFbGVtZW50XHJcbiAgfCBDb21wb25lbnQ7XHJcblxyXG5leHBvcnQgY29uc3QgZGl2OiBIVE1MRWxlbWVudEZ1bmN0aW9uID0gKFxyXG4gIC4uLmFyZ3M6IEFycmF5PEVsZW1lbnREZWZpbml0aW9uPlxyXG4pOiBIVE1MRWxlbWVudCA9PiBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIC4uLmFyZ3MpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHVsOiBIVE1MRWxlbWVudEZ1bmN0aW9uID0gKFxyXG4gIC4uLmFyZ3M6IEFycmF5PEVsZW1lbnREZWZpbml0aW9uPlxyXG4pOiBIVE1MRWxlbWVudCA9PiBjcmVhdGVFbGVtZW50KFwidWxcIiwgLi4uYXJncyk7XHJcblxyXG5leHBvcnQgY29uc3QgbGk6IEhUTUxFbGVtZW50RnVuY3Rpb24gPSAoXHJcbiAgLi4uYXJnczogQXJyYXk8RWxlbWVudERlZmluaXRpb24+XHJcbik6IEhUTUxFbGVtZW50ID0+IGNyZWF0ZUVsZW1lbnQoXCJsaVwiLCAuLi5hcmdzKTtcclxuXHJcbmV4cG9ydCBjb25zdCBhOiBIVE1MRWxlbWVudEZ1bmN0aW9uID0gKFxyXG4gIC4uLmFyZ3M6IEFycmF5PEVsZW1lbnREZWZpbml0aW9uPlxyXG4pOiBIVE1MRWxlbWVudCA9PiBjcmVhdGVFbGVtZW50KFwiYVwiLCAuLi5hcmdzKTtcclxuXHJcbmV4cG9ydCBjb25zdCBoZWFkZXI6IEhUTUxFbGVtZW50RnVuY3Rpb24gPSAoXHJcbiAgLi4uYXJnczogQXJyYXk8RWxlbWVudERlZmluaXRpb24+XHJcbik6IEhUTUxFbGVtZW50ID0+IGNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIiwgLi4uYXJncyk7XHJcblxyXG5leHBvcnQgY29uc3QgaDE6IEhUTUxFbGVtZW50RnVuY3Rpb24gPSAoXHJcbiAgLi4uYXJnczogQXJyYXk8RWxlbWVudERlZmluaXRpb24+XHJcbik6IEhUTUxFbGVtZW50ID0+IGNyZWF0ZUVsZW1lbnQoXCJoMVwiLCAuLi5hcmdzKTtcclxuXHJcbmV4cG9ydCBjb25zdCBoMjogSFRNTEVsZW1lbnRGdW5jdGlvbiA9IChcclxuICAuLi5hcmdzOiBBcnJheTxFbGVtZW50RGVmaW5pdGlvbj5cclxuKTogSFRNTEVsZW1lbnQgPT4gY3JlYXRlRWxlbWVudChcImgyXCIsIC4uLmFyZ3MpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHA6IEhUTUxFbGVtZW50RnVuY3Rpb24gPSAoXHJcbiAgLi4uYXJnczogQXJyYXk8RWxlbWVudERlZmluaXRpb24+XHJcbik6IEhUTUxFbGVtZW50ID0+IGNyZWF0ZUVsZW1lbnQoXCJwXCIsIC4uLmFyZ3MpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGFzaWRlOiBIVE1MRWxlbWVudEZ1bmN0aW9uID0gKFxyXG4gIC4uLmFyZ3M6IEFycmF5PEVsZW1lbnREZWZpbml0aW9uPlxyXG4pOiBIVE1MRWxlbWVudCA9PiBjcmVhdGVFbGVtZW50KFwiYXNpZGVcIiwgLi4uYXJncyk7XHJcblxyXG5leHBvcnQgY29uc3Qgc2VjdGlvbjogSFRNTEVsZW1lbnRGdW5jdGlvbiA9IChcclxuICAuLi5hcmdzOiBBcnJheTxFbGVtZW50RGVmaW5pdGlvbj5cclxuKTogSFRNTEVsZW1lbnQgPT4gY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIiwgLi4uYXJncyk7XHJcblxyXG5leHBvcnQgY29uc3QgbmF2OiBIVE1MRWxlbWVudEZ1bmN0aW9uID0gKFxyXG4gIC4uLmFyZ3M6IEFycmF5PEVsZW1lbnREZWZpbml0aW9uPlxyXG4pOiBIVE1MRWxlbWVudCA9PiBjcmVhdGVFbGVtZW50KFwibmF2XCIsIC4uLmFyZ3MpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGJ1dHRvbjogSFRNTEVsZW1lbnRGdW5jdGlvbiA9IChcclxuICAuLi5hcmdzOiBBcnJheTxFbGVtZW50RGVmaW5pdGlvbj5cclxuKTogSFRNTEVsZW1lbnQgPT4gY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCAuLi5hcmdzKTtcclxuXHJcbmV4cG9ydCBjb25zdCBkaWFsb2c6IEhUTUxFbGVtZW50RnVuY3Rpb24gPSAoXHJcbiAgLi4uYXJnczogQXJyYXk8RWxlbWVudERlZmluaXRpb24+XHJcbik6IEhUTUxFbGVtZW50ID0+IGNyZWF0ZUVsZW1lbnQoXCJkaWFsb2dcIiwgLi4uYXJncyk7XHJcblxyXG5leHBvcnQgY29uc3QgdGltZTogSFRNTEVsZW1lbnRGdW5jdGlvbiA9IChcclxuICAuLi5hcmdzOiBBcnJheTxFbGVtZW50RGVmaW5pdGlvbj5cclxuKTogSFRNTEVsZW1lbnQgPT4gY3JlYXRlRWxlbWVudChcInRpbWVcIiwgLi4uYXJncyk7XHJcblxyXG5leHBvcnQgY29uc3QgZm9ybTogSFRNTEVsZW1lbnRGdW5jdGlvbiA9IChcclxuICAuLi5hcmdzOiBBcnJheTxFbGVtZW50RGVmaW5pdGlvbj5cclxuKTogSFRNTEVsZW1lbnQgPT4gY3JlYXRlRWxlbWVudChcImZvcm1cIiwgLi4uYXJncyk7XHJcblxyXG5leHBvcnQgY29uc3QgbGFiZWw6IEhUTUxFbGVtZW50RnVuY3Rpb24gPSAoXHJcbiAgLi4uYXJnczogQXJyYXk8RWxlbWVudERlZmluaXRpb24+XHJcbik6IEhUTUxFbGVtZW50ID0+IGNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCAuLi5hcmdzKTtcclxuXHJcbmV4cG9ydCBjb25zdCBpbnB1dDogSFRNTEVsZW1lbnRGdW5jdGlvbiA9IChcclxuICAuLi5hcmdzOiBBcnJheTxFbGVtZW50RGVmaW5pdGlvbj5cclxuKTogSFRNTEVsZW1lbnQgPT4gY3JlYXRlRWxlbWVudChcImlucHV0XCIsIC4uLmFyZ3MpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHNwYW46IEhUTUxFbGVtZW50RnVuY3Rpb24gPSAoXHJcbiAgLi4uYXJnczogQXJyYXk8RWxlbWVudERlZmluaXRpb24+XHJcbik6IEhUTUxFbGVtZW50ID0+IGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIC4uLmFyZ3MpO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBleGlzdHMgKGRldmVsb3BtZW50IG9ubHkpXG5cdGlmIChfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQgeyBOYXZCdG4gfSBmcm9tIFwiLi9jb21wb25lbnRzL2dlbmVyaWMvQnRuXCI7XHJcbmltcG9ydCB7IGRpdiwgaDEgfSBmcm9tIFwiLi9jb21wb25lbnRzL2h0bWxFbGVtZW50c0FydGlmaWNpYWxcIjtcclxuaW1wb3J0IFwiLi4vc3R5bGVzL2dsb2JhbC5jc3NcIjtcclxuXHJcbmNvbnN0IHJlZ2lzdGVyQnRuID0gbmV3IE5hdkJ0bihcIlwiLCBcIi9mb3Jtcy9yZWdpc3RlclwiLCBcIlJlZ2lzdGVyXCIsIChlOiBFdmVudCkgPT5cclxuICBuYXZpZ2F0ZShlLCBcIi9mb3Jtcy9yZWdpc3RlclwiKSxcclxuKTtcclxuY29uc3QgbG9naW5CdG4gPSBuZXcgTmF2QnRuKFwiXCIsIFwiL2Zvcm1zL2xvZ2luXCIsIFwiTG9naW5cIiwgKGU6IEV2ZW50KSA9PlxyXG4gIG5hdmlnYXRlKGUsIFwiL2Zvcm1zL2xvZ2luXCIpLFxyXG4pO1xyXG5cclxuLy8hIFRlbXAgcm91dGVzIG9iamVjdCB1bnRpbCBwYWdlcyBzb3J0ZWRcclxuY29uc3Qgcm91dGVzOiBSZWNvcmQ8c3RyaW5nLCBIVE1MRWxlbWVudD4gPSB7XHJcbiAgXCIvXCI6IGRpdihcclxuICAgIHtcclxuICAgICAgY2xhc3M6IFwiaW5kZXgtcGFnZS13cmFwcGVyXCIsXHJcbiAgICAgIGlkOiBcImluZGV4UGFnZVdyYXBwZXJcIixcclxuICAgIH0sXHJcbiAgICByZWdpc3RlckJ0bi5yZW5kZXIoKSxcclxuICAgIGxvZ2luQnRuLnJlbmRlcigpLFxyXG4gICksXHJcbiAgXCIvaG9tZVwiOiBoMShcImhvbWVcIiksXHJcbiAgXCIvZm9ybXMvcmVnaXN0ZXJcIjogaDEoXCJmb3JtIC0gcmVnaXN0ZXJcIiksXHJcbiAgXCIvZm9ybXMvbG9naW5cIjogaDEoXCJmb3JtIC0gbG9naW5cIiksXHJcbiAgXCIvZm9ybXMvY2hhbmdlX3Bhc3N3b3JkXCI6IGgxKFwiZm9ybSAtIGNoYW5nZSBwYXNzd29yZFwiKSxcclxufTtcclxuXHJcbmZ1bmN0aW9uIG5hdmlnYXRlKGV2ZW50OiBFdmVudCwgcGF0aDogc3RyaW5nKTogdm9pZCB7XHJcbiAgLy8/IFByZXZlbnQgYSBmdWxsIHBhZ2UgcmVsb2FkXHJcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe30sIHBhdGgsIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyBwYXRoKTtcclxuICB1cGRhdGVDb250ZW50KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUNvbnRlbnQoKTogdm9pZCB7XHJcbiAgY29uc3QgcGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcclxuICAvLyEgVkVSWSBURU1QIGNvZGUgYXMgZGVtb1xyXG4gIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIikhO1xyXG4gIHJvb3QucmVwbGFjZUNoaWxkcmVuKHJvdXRlc1twYXRoXSB8fCBoMShcIjQwNCAtIE5vdCBGb3VuZFwiKSk7XHJcbn1cclxuXHJcbi8vPyBIYW5kbGUgYnJvd3NlciBuYXYgKGJhY2svZm9yd2FyZCBidG5zKVxyXG53aW5kb3cub25wb3BzdGF0ZSA9IHVwZGF0ZUNvbnRlbnQ7XHJcblxyXG4vLz8gTG9hZCBjb3JyZWN0IGNvbnRlbnQgb24gcGFnZSBsb2FkXHJcbndpbmRvdy5vbmxvYWQgPSB1cGRhdGVDb250ZW50O1xyXG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9