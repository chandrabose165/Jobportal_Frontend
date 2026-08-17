"use strick";
function hidden(classname) {
  document.querySelectorAll(classname).forEach((btn) => {
    btn.style.display = "none";
  });
}
hidden(".jobseeker-only");
hidden(".recruiter-only");
hidden(".admin-only");
