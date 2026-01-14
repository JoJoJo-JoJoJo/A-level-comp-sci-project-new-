// This class is a base class to be extended from - I didn't want to add a framework to the project so I am using a style of component inspired by https://www.divotion.com/blog/creating-js-components-without-a-framework

let id = 0;

abstract class Component {
  protected state: any;
  protected componentId: string;

  constructor() {
    this.componentId = (id++).toString();
    this.render = new Proxy(this.render, this.renderHandler);
  }

  protected setState(state: object) {
    this.state = new Proxy(state, this.fieldHandler);
  }

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

  fieldHandler: ProxyHandler<any> = {
    set: (target, thisProp, value) => {
      // stuff
      // temp return
      return false;
    },
  };

  abstract render(): HTMLElement | Array<HTMLElement>;
}
