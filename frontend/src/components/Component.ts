//? This class is a base class to be extended from - I didn't want to add a framework to the project so I am using a style of component notation inspired by https://www.divotion.com/blog/creating-js-components-without-a-framework

let id = 0;

export default abstract class Component {
  protected state: any;
  protected componentId: string;

  constructor() {
    //? Assigns each component an id so it is more easily found on the DOM for re-renders, state changes, etc.
    this.componentId = (id++).toString();
    this.render = new Proxy(this.render, this.renderHandler);
  }

  //? This method sets state that is persisted across re-renders through the use of Proxy objects
  protected setState(state: object) {
    this.state = new Proxy(state, this.fieldHandler);
  }

  //? This handler is used to trap function calls of the render method and re-assign the old component's id to the new component --> target [[Call]] internal method
  renderHandler: ProxyHandler<any> = {
    apply: (target, thisArg, argArr) => {
      const newComponent = target.apply(thisArg, ...argArr) as HTMLElement;
      newComponent.dataset.componentId = this.componentId;

      const oldComponent = document.querySelector(
        `[data-component-id="${this.componentId}"]`,
      );
      oldComponent?.replaceWith(newComponent);
      return newComponent;
    },
  };

  //? This handler causes a re-render of the target component whilst preserving its state --> target [[Set]] internal method
  fieldHandler: ProxyHandler<any> = {
    set: (target: any, prop: string | symbol, value: any): boolean => {
      target[prop] = value;
      this.render();
      return true;
    },
  };

  //? This method is used to identify and distinguish components (i.e. children of this class) throughout the codebase
  isComponent(): boolean {
    return true;
  }

  abstract render(): HTMLElement | Array<HTMLElement>;
}
