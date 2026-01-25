import { ElementDefinition } from "../htmlElementsArtificial";

export interface HTMLElementFunction {
  (...args: Array<ElementDefinition>): HTMLElement;
}
