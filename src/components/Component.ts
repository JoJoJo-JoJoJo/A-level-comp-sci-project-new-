//? This class is a base class to be extended from - I didn't want to add a framework to the project so I am using a style of component notation inspired by https://www.divotion.com/blog/creating-js-components-without-a-framework, from which the code for this class and the attribute types are taken from https://github.com/TomRaaff/tr-utilities-lib/tree/main/freeze/js-components

let id = 0;

export default abstract class Component {
  protected state: any;
  protected componentId: string;

  constructor() {
    this.componentId = (id++).toString();
    this.render = new Proxy(this.render, this.renderHandler);
  }

  protected setState(state: object) {
    this.state = new Proxy(state, this.fieldHandler);
  }

  //
  renderHandler: ProxyHandler<any> = {
    apply: (target, thisArg, argArr) => {
      const newComponent = target.apply(thisArg, ...argArr) as HTMLElement;
      newComponent.dataset.componentId = this.componentId;

      const oldComponent = document.querySelector(
        `[data-component-id="${this.componentId}"]`
      );
      oldComponent?.replaceWith(newComponent);
      return newComponent;
    },
  };

  // I don't want to block the state being changed, but I do want to re-render on a state change --> target [[Set]] internal method
  fieldHandler: ProxyHandler<any> = {
    set: (target: any, prop: string | symbol, value: any): boolean => {
      target[prop] = value;
      this.render();
      return true;
    },
  };

  isComponent(): boolean {
    return true;
  }

  abstract render(): HTMLElement | Array<HTMLElement>;
}
