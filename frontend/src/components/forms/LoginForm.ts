import Component from "../Component";
import { div, form, input, label, span } from "../htmlElementsArtificial";
import "./styles.css";

export class LoginForm extends Component {
  constructor() {
    super();
  }

  override render(): HTMLElement {
    return form(
      {
        class: "form form-login",
        //* Need to check if form route ID works like this on action attribute
        action: "/form:login/submit",
        method: "POST",
      },
      //? Name field
      div(
        {
          class: "form-field",
        },
        label(
          {
            for: "name",
            class: "form-label",
          },
          "Name:",
        ),
        input({
          type: "text",
          id: "name",
          name: "user_name",
          required: true,
          placeholder: "John Doe",
          class: "form-input",
          //* Is this minlength?
          minlength: "2",
          maxlength: "32",
          size: "32",
          pattern: "^([a-zA-Z\s]+){2,32}$",
          title:
            "Valid names are alphabetic and between 2 and 32 characters long.",
          autocomplete: true,
        }),
        span({
          class: "validity",
        }),
      ),
      //? Password field
      div(
        {
          class: "form-field",
        },
        label(
          {
            for: "password",
            class: "form-label",
          },
          "Password:",
        ),
        input({
          type: "text",
          id: "password",
          name: "user_password",
          required: true,
          placeholder: "Choose a password",
          minlength: "8",
          maxlength: "32",
          size: "32",
          class: "form-input",
          pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])\S{8,32}$",
          title:
            "Valid passwords contain a lowercase and uppercase character, a digit and a special character, and be between 8-20 characters.",
        }),
        span({
          class: "validity",
        }),
      ),
      //? Form submit button
      input({
        type: "submit",
        id: "submit-btn",
        name: "form_submit_button",
        value: "Submit",
      }),
    );
  }
}
