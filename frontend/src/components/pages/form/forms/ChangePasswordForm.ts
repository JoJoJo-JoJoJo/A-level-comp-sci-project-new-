import { _navigate } from "../../../../router";
import { getFromSessionStorage } from "../../../../utils/sessionStorage";
import Component from "../../../Component";
import {
  div,
  form,
  input,
  label,
  p,
  span,
} from "../../../htmlElementsArtificial";
import "./styles.css";

export class ChangePasswordForm extends Component {
  constructor() {
    super();
  }

  //* Will probably need a custom form submit handler since used ID needed to identify user changing password on backend

  //? Handler to check that re-entered password matches initial password
  private handlePasswordCheck(): void {
    //? Retrieve relevant form elements on DOM
    const userPassword = (
      document.getElementById("new-password") as HTMLInputElement
    ).value;
    const userCheckedPassword = (
      document.getElementById("new-password-check") as HTMLInputElement
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
        class: "form form-change-password",
        id: "formChangePassword",
        //* Need to check if form route ID works like this on action attribute
        action: "/form:change_password/submit",
        method: "PUT",
        onsubmit: async (e: SubmitEvent) => {
          //? Prevent default browser behavior
          e.preventDefault();

          const changePasswordForm = document.getElementById(
            "formChangePassword",
          )! as HTMLFormElement;

          //? Collect form data
          //! Terrible practice to use the type any but I don't want to fix the type right now
          const formData = new URLSearchParams(
            new FormData(changePasswordForm) as any,
          );

          const userId = getFromSessionStorage<number>("userId");
          if (userId === null) return;

          formData.append("user_id", JSON.stringify(userId));

          console.log(formData.toString());

          try {
            //? POST user's form data to server + wait for response
            const res = await fetch(
              "http://localhost:3000/forms/user/update/password",
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData,
              },
            );

            if (!res.ok) {
              console.error("Server responded with error code: " + res.status);
            }

            //? Navigate to home page
            _navigate("/home");
          } catch (err) {
            console.error(err);
          }
        },
      },
      //? New password field
      div(
        {
          class: "form-field",
        },
        label(
          {
            for: "new-password",
            class: "form-label",
          },
          "New password:",
        ),
        input({
          type: "text",
          id: "new-password",
          name: "user_password",
          required: true,
          placeholder: "Choose a password",
          minlength: "8",
          maxlength: "32",
          size: "32",
          class: "form-input",
          pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,32}$",
          title:
            "Password should contain a lowercase and uppercase character, a digit and a special character, and be between 8-32 characters",
          onchange: () => this.handlePasswordCheck(),
        }),
        span({
          class: "validity",
        }),
      ),
      //? Re-enter new password field
      div(
        {
          class: "form-field",
        },
        label(
          {
            for: "new-password-check",
            class: "form-label",
          },
          "Re-enter password:",
        ),
        input({
          type: "text",
          id: "new-password-check",
          name: "user_password_check",
          required: true,
          placeholder: "Re-enter your password",
          minlength: "8",
          maxlength: "32",
          size: "32",
          class: "form-input",
          pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,32}$",
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
