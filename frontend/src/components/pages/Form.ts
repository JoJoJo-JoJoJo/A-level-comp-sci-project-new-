import { FORM_IDS } from "../../constants/constants";
import Component from "../Component";
import { ChangePasswordForm } from "../forms/ChangePasswordForm";
import { LoginForm } from "../forms/LoginForm";
import { RegisterForm } from "../forms/RegisterForm";
import { div } from "../htmlElementsArtificial";

export default class Form extends Component {
  constructor(formId: string) {
    super();

    //? Set form ID in state
    this.setState({
      formId,
    });
  }

  override render(): HTMLElement {
    let form: HTMLElement | null = null;

    //? Determine form component to load based on given ID
    switch (this.state.formId) {
      case FORM_IDS.REGISTER:
        form = new RegisterForm().render();
        break;
      case FORM_IDS.LOGIN:
        form = new LoginForm().render();
        break;
      case FORM_IDS.CHANGE_PASSWORD:
        form = new ChangePasswordForm().render();
        break;
    }

    //* Content updating for routing handles errors so can coerce type here
    return div(
      {
        class: "form-page-wrapper",
        id: "formPageWrapper",
      },
      form as HTMLElement,
    );
  }
}
