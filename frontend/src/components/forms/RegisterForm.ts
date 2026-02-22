import Component from "../Component";
import { div, form, input, label, p, span } from "../htmlElementsArtificial";
import "./styles.css";

export class RegisterForm extends Component {
  constructor() {
    super();
  }

  //? Handler to check that re-entered password matches initial password
  private handlePasswordCheck(): void {
    //? Retrieve relevant form elements on DOM
    const userPassword = (
      document.getElementById("password") as HTMLInputElement
    ).value;
    const userCheckedPassword = (
      document.getElementById("password-check") as HTMLInputElement
    ).value;
    const submitBtn = document.getElementById(
      "submit-btn",
    ) as HTMLButtonElement;
    const status = document.getElementById(
      "subtext-status",
    ) as HTMLParagraphElement;

    //? Clear status + enable submit button by default
    status.innerHTML = "";
    submitBtn.removeAttribute("disabled");

    //? If password check field empty, early return
    if (userCheckedPassword === "") return;

    //? If passwords don't match, update form status + disable submit button
    if (userPassword !== userCheckedPassword) {
      status.innerHTML = "Password does not match";
      submitBtn.setAttribute("disabled", "disabled");
    }
  }

  override render(): HTMLElement {
    return form(
      {
        class: "form form-register",
        //* Need to check if form route ID works like this on action attribute
        action: "/form:register/submit",
        method: "POST",
      },
      //? Class ID field (optional)
      div(
        {
          class: "form-field",
        },
        label(
          {
            for: "class-id",
            class: "form-label",
          },
          "Class ID:",
        ),
        input({
          type: "text",
          id: "class-id",
          name: "user_class_id",
          placeholder: "00000007",
          minlength: "8",
          maxlength: "8",
          size: "32",
          class: "form-input",
          pattern: "^[0-9]+$",
          title:
            "Class ID should only contain numbers from 1 - 9 and be 8 digits long",
        }),
        span({
          class: "validity",
        }),
      ),
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
        }),
        span({
          class: "validity",
        }),
      ),
      //? Email field (optional)
      div(
        {
          class: "form-field",
        },
        label(
          {
            for: "email",
            class: "form-label",
          },
          "Email:",
        ),
        input({
          type: "email",
          id: "email",
          name: "user_email",
          placeholder: "johndoe@example.com",
          minlength: "5",
          maxlength: "32",
          size: "32",
          class: "form-input",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
          title:
            "Email should contain a string for the local part, an '@' symbol and a valid domain.",
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
            "Password should contain a lowercase and uppercase character, a digit and a special character, and be between 8-20 characters",
          onchange: () => this.handlePasswordCheck(),
        }),
        span({
          class: "validity",
        }),
      ),
      //? Re-enter password field
      div(
        {
          class: "form-field",
        },
        label(
          {
            for: "password-check",
            class: "form-label",
          },
          "Re-enter password:",
        ),
        input({
          type: "text",
          id: "password-check",
          name: "user_password_check",
          required: true,
          placeholder: "Re-enter your password",
          minlength: "8",
          maxlength: "32",
          size: "32",
          class: "form-input",
          pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])\S{8,16}$",
          title:
            "Password should contain a lowercase and uppercase character, a digit and a special character, and be between 8-20 characters",
          onchange: () => this.handlePasswordCheck(),
        }),
        span({
          class: "validity",
        }),
        p({
          id: "subtext-status",
          class: "subtext",
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
