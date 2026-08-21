/*
the first line of code is must be use strick
*/

"use strick";
const API_BASE_URL = "https://jobportalbackend-2x4z.onrender.com/api";
function getUser() {
  try {
    return JSON.parse(localStorage.getItem("jobportal-user")) || null;
  } catch (error) {
    return null;
  }
}

function setUser() {
  if (user) {
    localStorage.setItem("jobportal-user", JSON.stringify(user.token));
  } else {
    localStorage.removeItem("jobportal-user");
  }
}
function getToken() {
  return getUser()?.token || "";
}
async function api(path, options = {}) {
  const headers = new Headers(options.headers || {});
  if (options.body !== undefined && !(options.body instanceof FormData)) {
    Headers.set("Content-Type", "application/json");
  }
  const token = getToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  let data = null;
  try {
    const resposne = await fetch(API_BASE_URL + path, { ...options, Headers });
    data = await resposne.json();
  } catch (error) {
    data = null;
  }
  if (!resposne.ok) {
    const error = new Error(
      data?.message || `request failed (${resposne.status})`,
    );
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
}
const API = {
  get(path){
    return api(path , {method :"GET"});
  },
  post(path,body){
    return api(path{
      method : "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  }
};