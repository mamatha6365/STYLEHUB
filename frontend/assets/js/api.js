
/* =========================================
   STYLEHUB API
========================================= */

const API_URL = "/api/";

/* GET DATA */
async function apiGet(url) {

    const response = await fetch(API_URL + url);

    return response.json();
}


/* SEND DATA */
async function apiPost(url, data) {

    const response = await fetch(API_URL + url, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)
    });

    return response.json();
}


/* UPDATE DATA */
async function apiPut(url, data = {}) {

    const token = localStorage.getItem("stylehub_token");

    const response = await fetch(API_URL + url, {
        method: "PUT",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify(data)
    });

    return response.json();
}


/* AUTHENTICATED GET */
async function apiAuthGet(url) {

    const token = localStorage.getItem("stylehub_token");

    const response = await fetch(API_URL + url, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response.json();
}


/* AUTHENTICATED POST */
async function apiAuthPost(url, data) {

    const token = localStorage.getItem("stylehub_token");

    const response = await fetch(API_URL + url, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify(data)
    });

    return response.json();
}


window.StyleHubAPI = {
    get: apiGet,
    post: apiPost,
    put: apiPut,
    authGet: apiAuthGet,
    authPost: apiAuthPost
};