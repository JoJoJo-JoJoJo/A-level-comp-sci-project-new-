import { updateUserSidebarInfo } from "../../router";
import { setToSessionStorage } from "../../utils/sessionStorage";
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
        id: "formRegister",
        onsubmit: async (e: SubmitEvent) => {
          //? Prevent default browser behavior
          e.preventDefault();

          const registerForm = document.getElementById(
            "formRegister",
          )! as HTMLFormElement;

          //? Collect form data
          //! Terrible practice to use the type any but I don't want to fix the type right now
          const formData = new URLSearchParams(
            new FormData(registerForm) as any,
          );

          console.log(formData.toString());

          try {
            //? POST user's form data to server + wait for response
            const res = await fetch("http://localhost:3000/forms/user/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: formData,
            });

            if (!res.ok) {
              console.error("Server responded with error code: " + res.status);
            }

            const data = await res.json();

            if (typeof data.userId === "string") {
              setToSessionStorage<number>("userId", +data.userId);
            }

            if (
              typeof data.name !== "string" ||
              typeof data.groupName !== "string"
            ) {
              console.error(
                "Typeof user's name and/or group name should be a string",
              );
            }

            //? Navigate to home page + update user info on sidebar
            updateUserSidebarInfo(data);
          } catch (err) {
            console.error(err);
          }
        },
      },
      //? Group ID field (optional)
      div(
        {
          class: "form-field",
        },
        label(
          {
            for: "group-id",
            class: "form-label",
          },
          "Class ID:",
        ),
        input({
          type: "text",
          id: "group-id",
          name: "user_group_id",
          placeholder: "1234567",
          minlength: "1",
          size: "32",
          class: "form-input",
          pattern: "^[0-9]+$",
          title: "Group ID should only contain numbers from 1 - 9",
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
          minlength: "2",
          maxlength: "32",
          size: "32",
          pattern: "^([a-zA-Z ]+){2,32}$",
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
          pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,32}$",
          title:
            "Password should contain a lowercase and uppercase character, a digit and a special character, and be between 8-32 characters",
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
