"use strict";
// console.log(document);

// function hideButtons(classname){
//     document.querySelectorAll(classname).forEach((btn) => {
//         btn.style.display = "none";
//     });
// }
// hideButtons(".jobseeker-only");
// hideButtons(".admin-only");
// hideButtons(".recruiter-only");
function get(id) {
  return document.getElementById(id);
}

function getall(className) {
  return document.getElementsByClassName(className);
}

function setText(element, value) {
  if (!element) return;
  element.textcontent =
    value === null || value === undefined ? "" : String(value);
  // element.textcontent = value !===null || value !== undefined ? String(value);
}

function show(element, visible = true) {
  if (!element) return;
  element.classList.toggle("hidden", !visible);
}

function addclass(element, className) {
  if (!element) return;
  element.classlist.add(className);
}

function removeclass(element, className) {
  if (!element) return;
  element.classlist.remove(className);
}

function toggleclass(element, className) {
  if (!element) return;
  element.classlist.toggle(className);
}

function getvalue(element) {
  if (!element) return;
  // return element.value;
  return element?.value?.trim();
}

function setvalue(element, value) {
  if (!element) return;
  // element.value = value === null || value === undefined ? "" : String(value);
  element.value = value ?? "";
}

// 1.Start

function toast(message, error = false) {
  const element = get("toast");
  if (!element) return;
  setText(element, message);
  element.className = "toast toast.show toast." + (error ? "error" : "");

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    element.className = "toast";
  }, 3000);

  // console.log(element);
}
// toast("Login successfull");

// part 1 end

// part 2 start
function setStatus(element, status) {
  if (!element) return;
  element.className = "status";
  if (status) {
    element.classlist.add("status-" + status);
  }
  setText(element.status || "");
}

function setMatchScore(element, score) {
  if (!element) return;
  element.classlist.remove("match-good", "match-mid", "match-low");
  if (score >= 70) {
    element.classlist.add("match-good");
  } else if (score >= 40) {
    element.classlist.add("match-mid");
  } else {
    element.classlist.add("match-low");
  }
}

function formateDate(value) {
  if (!value) return;
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// part 2. End

// part 3.start
//routing react router || redux

const pages = document.querySelectorAll(".page");

function getRoute() {
  return location.hash.replace(/^#/, "") || "/";
}

function showPages(pageName) {
  pages.forEach((page) => {
    show(page, page.id === "page-" + pageName);
  });
}

async function render() {
  const route = getRoute();
  // console.log(route);
  if (route === "/" || route === "home") {
    showPages("home");
    return;
  }

  if (route === "/login") {
    showPages("login");
    return;
  }

  if (route === "/register") {
    showPages("register");
    return;
  }
  if (route === "/jobs") {
    showPages("jobs");
    return;
  }
  if (route === "/my-applications") {
    showPages("my-applications");
    return;
  }
  if (route === "/my-jobs") {
    showPages("my-jobs");
    return;
  }
  if (route === "/post-job") {
    showPages("post-job");
    return;
  }
  if (route === "/admin/users") {
    showPages("admin/users");
    return;
  }
}

window.addEventListener("hashchange", render);

// save the user to the localstorage
// get the user from the localstorage

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("jobportal-user")) || null;
  } catch (error) {
    // toast("user not found", true);
    return null;
  }
}
// localStorage
function SetUser(user) {
  if (user) {
    localStorage.setItem("jobportal-user", JSON.stringify(user.token));
  } else {
    localStorage.removeItem("jobportal-user");
  }
}
// part 4
function getToken() {
  return getUser()?.token || "";
}
function isLoggedIn() {
  return !!getUser();
}
function requiredLogin() {
  if (!isLoggedIn()) {
    location.hash = "#/login";
    toast("please login first", true);
    return false;
  }
  return true;
}

// required the role to specific

function requiredRole(role) {
  const user = getUser();
  if (!user) {
    location.hash = "#login";
    toast("please login First", true);
    return false;
  }
  if (user.role !== role) {
    location.hash = "#/";
    toast("you don't have access to this page", true);
    return false;
  }
  return true;
}
// part no 5
// name , email , phone ,  password , skills , role

function setupRegister() {
  const form = get("register-form");
  if (!form) return;
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    // console.log("testing code");
    const data = Object.fromEntries(new FormData(form));
    try {
      console.log(data);
      const user = await API.post("/auth/register", data);
      SetUser(user);
      toast("Account created successfully");
      form.reset();
      location.hash = "#/dashboard";
    } catch (error) {
      toast(error.message, true);
    }
  });
}

// login form

function setupLogin() {
  const form = get("login-form");
  if (!form) return;
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    // console.log("testing code");
    const data = Object.fromEntries(new FormData(form));
    try {
      console.log(data);
      const user = await API.post("/auth/login", data);
      SetUser(user);
      toast("Login successfully");
      form.reset();
      location.hash = "#/dashboard";
    } catch (error) {
      toast(error.message, true);
    }
  });
}
setupRegister();
setupLogin();
