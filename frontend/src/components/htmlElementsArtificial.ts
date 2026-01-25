import Component from "./Component";
import { GlobalAttributes } from "./component_types/GlobalAttributes";
import { HTMLElementFunction } from "./component_types/HTMLElementFunction";
import { createElement } from "./createElement";

export type ElementDefinition =
  | GlobalAttributes
  | string
  | HTMLElement
  | Component;

export const div: HTMLElementFunction = (
  ...args: Array<ElementDefinition>
): HTMLElement => createElement("div", ...args);

export const ul: HTMLElementFunction = (
  ...args: Array<ElementDefinition>
): HTMLElement => createElement("ul", ...args);

export const header: HTMLElementFunction = (
  ...args: Array<ElementDefinition>
): HTMLElement => createElement("header", ...args);

export const h1: HTMLElementFunction = (
  ...args: Array<ElementDefinition>
): HTMLElement => createElement("h1", ...args);

export const h2: HTMLElementFunction = (
  ...args: Array<ElementDefinition>
): HTMLElement => createElement("h2", ...args);
