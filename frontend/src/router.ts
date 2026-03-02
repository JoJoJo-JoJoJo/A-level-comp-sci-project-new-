import { h1 } from "./components/htmlElementsArtificial";
import Form from "./components/pages/Form";
import Home from "./components/pages/Home";
import RegisterLogin from "./components/pages/RegisterLogin";
import { FORM_IDS } from "./constants/constants";
import "./styles/global.css";

//? Defines components to be rendered based on current relative URL path
const routes: Record<string, HTMLElement> = {
  "/": new RegisterLogin().render(),
  "/home": new Home().render(),
  "/forms/register": new Form(FORM_IDS.REGISTER).render(),
  "/forms/login": new Form(FORM_IDS.LOGIN).render(),
  "/forms/change_password": new Form(FORM_IDS.CHANGE_PASSWORD).render(),
};

//? Helper function for navigation + when no event given
function _navigate(path: string): void {
  window.history.pushState({}, path, window.location.origin + path);
  updateContent();
}

//? Handles navigation logic for switching page components
function navigate(event: Event, path: string): void {
  //? Prevent a full page reload
  event.preventDefault();
  _navigate(path);
}

//? Updates the content on the page based on the current route, else displays error page
function updateContent(): void {
  const path = window.location.pathname;
  const root = document.getElementById("root")!;
  //! Replace 404 error h1 element with proper error display component
  root.replaceChildren(routes[path] || h1("404 - Not Found"));
}

function updateUserSidebarInfo({
  name,
  groupName,
}: {
  name: string;
  groupName: string;
}) {
  //* Worth putting data into local/session storage for later use (e.g. on page reload)
  _navigate("/home");

  const nameContainer = document.getElementById("userName")!;
  const groupContainer = document.getElementById("userGroup")!;
  const iconContainer = document.getElementById("userIcon")!;

  nameContainer.innerText = name;
  groupContainer.innerText = groupName;
  iconContainer.innerText = name.slice(0, 1).toUpperCase();
}

//? Handle browser nav (back/forward btns)
window.onpopstate = updateContent;

//? Load correct content on page load
window.onload = updateContent;

export { _navigate, navigate, updateUserSidebarInfo };
