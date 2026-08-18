"use strict";
// function hidden(classname) {
//   document.querySelectorAll(classname).forEach((btn) => {
//     btn.style.display = "none";
//   });
// }
// hidden(".jobseeker-only");
// hidden(".recruiter-only");
// hidden(".admin-only");

// UI Mainuplication
function getId(id) {
  return document.getElementById(id);
}
// getting the classname
function getClassName(className) {
  return document.getElementsByClassName(ClassName);
}
// updating the class name
function settext(element, value) {
  if (!element) return;
  element.textContent =
    value === null || value === undefined ? "" : String(value);
}
// get value
function getall(element) {
  if (!element) return;
  element.textContent = value;
}
// Hidding the some button we want
function hide(element, Visible = true) {
  element.ClassList.toogle("hidden", !Visible);
}
// add the class without creation in html
function addclass(element, ClassName) {
  if (!element) return;
  element.ClassList.add(ClassName);
}
// Remove the className
function RemoveClass(element, ClassName) {
  if (!element) return;
  element.ClassList.remove(ClassName);
}
// access the element
function GetValue(element) {
  if (!element) return;
  // return element.value;
  return element?.value?.trim(); //  same like 47 line code
}
function SetValue(element, Value) {
  if (!element) return;
  // element.value = value === null || value === undefined ? "" : String(value);
  element.value = value ?? ""; //  same as like about 52 line code
}

// toogle transtion and pop the window of the appliaction the bottom right side
function toast(message, error = false) {
  const element = getId("toast");
  if (!element) return;
  settext(element, message);
  element.className = "toast toast.show toast." + (error ? "error" : "");

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    element.className = "toast";
  }, 3000);
}
// checking the status of the application
function SetStatus(element, status) {
  if (!element) return;
  element.className = "status";
  if (status) {
    element.ClassList.add("Status-" + status);
  }
  settext(element, status || "");
}
// match score of the applications
function setMatchScore(element, score) {
  if (!element) return;
  element.ClassList.remove("match-good", "match-mid", "match-low");
  if (score >= 70) {
    element.ClassList.add("match-good");
  } else if (score >= 40) {
    element.ClassList.add("match-mid");
  } else {
    element.ClassList.add("match-low");
  }
}
//  formdate the like update , delete the file or any thing

function formDate(value) {
  if (!value) return;
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// showing the page function
const pages = document.querySelectorAll(".page");
function getRoute() {
  return location.hash.replace("/^#/", "") || "/";
}
function showpages(pageName) {
  pages.forEach(() => {
    show(page, page.id === "page-" + pageName);
  });
}
async function rebder() {
  const route = getRoute();
}
