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

export const li: HTMLElementFunction = (
  ...args: Array<ElementDefinition>
): HTMLElement => createElement("li", ...args);

export const a: HTMLElementFunction = (
  ...args: Array<ElementDefinition>
): HTMLElement => createElement("a", ...args);

export const header: HTMLElementFunction = (
  ...args: Array<ElementDefinition>
): HTMLElement => createElement("header", ...args);

export const h1: HTMLElementFunction = (
  ...args: Array<ElementDefinition>
): HTMLElement => createElement("h1", ...args);

export const h2: HTMLElementFunction = (
  ...args: Array<ElementDefinition>
): HTMLElement => createElement("h2", ...args);

export const p: HTMLElementFunction = (
  ...args: Array<ElementDefinition>
): HTMLElement => createElement("p", ...args);

export const aside: HTMLElementFunction = (
  ...args: Array<ElementDefinition>
): HTMLElement => createElement("aside", ...args);

export const section: HTMLElementFunction = (
  ...args: Array<ElementDefinition>
): HTMLElement => createElement("section", ...args);

export const nav: HTMLElementFunction = (
  ...args: Array<ElementDefinition>
): HTMLElement => createElement("nav", ...args);

export const button: HTMLElementFunction = (
  ...args: Array<ElementDefinition>
): HTMLElement => createElement("button", ...args);

export const dialog: HTMLElementFunction = (
  ...args: Array<ElementDefinition>
): HTMLElement => createElement("dialog", ...args);

export const time: HTMLElementFunction = (
  ...args: Array<ElementDefinition>
): HTMLElement => createElement("time", ...args);

export const form: HTMLElementFunction = (
  ...args: Array<ElementDefinition>
): HTMLElement => createElement("form", ...args);

export const label: HTMLElementFunction = (
  ...args: Array<ElementDefinition>
): HTMLElement => createElement("label", ...args);

export const input: HTMLElementFunction = (
  ...args: Array<ElementDefinition>
): HTMLElement => createElement("input", ...args);

export const span: HTMLElementFunction = (
  ...args: Array<ElementDefinition>
): HTMLElement => createElement("span", ...args);
