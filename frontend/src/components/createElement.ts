// This file contains the core logic and functionality of building out the HTML elements

import Component from "./Component";
import { EventHandlerAttributes } from "./component_types/EventHandlerAttributes";
import { GlobalAttributes } from "./component_types/GlobalAttributes";
import { ElementDefinition } from "./htmlElementsArtificial";

type Attribute = [keyof GlobalAttributes, any];
type EventAttribute = [keyof EventHandlerAttributes | string, Function];

//? Determines whether the given argument is a string, a HTML element or a component
function isStringOrHTMLElementOrComponent(arg: ElementDefinition): boolean {
  return (
    arg !== undefined &&
    (arg instanceof HTMLElement ||
      typeof arg === "string" ||
      "isComponent" in arg)
  );
}

//? Assigns html attribute(s) to a given element
function assignAttributes(htmlElement: any, attr: Array<Attribute>) {
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

//? Assigns event listener(s) to a given element
function assignEventListeners(
  htmlElement: any,
  events: Array<EventAttribute>,
): void {
  events.forEach(([key, val]) => {
    //? All event handler attributes on html use the notation "on<event>", so I can extract the event name in the same way consistently
    htmlElement.addEventListener(key.slice(2), val);
  });
}

//? Creates a specific type of html element with specified attributes and/or event listeners
export function createElement(type: string, ...args: Array<ElementDefinition>) {
  const element = document.createElement(type);

  const attributes = args.find(
    (arg) => !isStringOrHTMLElementOrComponent(arg),
  ) as GlobalAttributes;

  const innerContent = args.filter(isStringOrHTMLElementOrComponent) as Array<
    string | HTMLElement | Component
  >;

  if (attributes) {
    //? Separate out the event listeners and attributes so I can assign them separately
    const attr = Object.entries(attributes).filter(
      ([key]) => !key.startsWith("on"),
    ) as Array<Attribute>;
    const events = Object.entries(attributes).filter(([key]) =>
      key.startsWith("on"),
    ) as Array<EventAttribute>;

    //? Assign the attributes and event listeners
    assignAttributes(element, attr);
    assignEventListeners(element, events);
  }

  if (innerContent) {
    innerContent.forEach((child) => {
      if (typeof child !== "string" && "isComponent" in child) {
        const rendered = child.render();
        if (Array.isArray(rendered)) {
          element.append(...rendered);
        } else {
          element.append(rendered);
        }
      } else {
        element.append(child);
      }
    });
  }

  return element;
}
