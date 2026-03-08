import { updateUserSidebarInfo } from "../../router";
import { setToSessionStorage } from "../../utils/sessionStorage";
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
        id: "formLogin",
        //* Need to check if form route ID works like this on action attribute
        onsubmit: async (e: SubmitEvent) => {
          //? Prevent default browser behavior
          e.preventDefault();

          const loginForm = document.getElementById(
            "formLogin",
          )! as HTMLFormElement;

          //? Collect form data
          //! Terrible practice to use the type any but I don't want to fix the type right now
          const formData = new URLSearchParams(new FormData(loginForm) as any);

          console.log(formData.toString());

          try {
            //? POST user's form data to server + wait for response
            const res = await fetch("http://localhost:3000/forms/user/login", {
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

            //? If no match, clear password field + refill name field
            if (!data.isMatch) {
              const nameField = document.getElementById(
                "loginName",
              )! as HTMLInputElement;
              const passwordField = document.getElementById(
                "loginPassword",
              )! as HTMLInputElement;

              nameField.value = data.name || "";
              passwordField.value = "";
              return;
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
          id: "loginName",
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
          id: "loginPassword",
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
        }),
        span({
          class: "validity",
        }),
      ),
      //? Form submit button
      input({
        type: "submit",
        id: "loginSubmitBtn",
        name: "form_submit_button",
        value: "Submit",
      }),
    );
  }
}
