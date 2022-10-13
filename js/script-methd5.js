const usersList = document.querySelector(".users-list ul")
const postsList = document.querySelector(".posts-list")

// Fetching API Data Function using XMLHttpRequest and Promise (AJAX)
let getData = function (url) {
    return new Promise((resolve, reject) => {
        const httpReq = new XMLHttpRequest()
        httpReq.open('get', url)
        httpReq.send()
        // Display the progress of the data received == OPTIONAL ==
        httpReq.onprogress = function (ev) {
            if (ev.lengthComputable) {
                postsList.innerText = `${ev.loaded} Byte of ${ev.total} Byte loaded!`
            } else {
                postsList.innerText = `${ev.loaded} Byte loaded!`
            }
        }
        // If the request succeded, get the result
        httpReq.onload = function () {
            if (httpReq.status >= 200 && httpReq.status < 300) {
                resolve(JSON.parse(httpReq.responseText))
            } else {
                reject(Error(httpReq.statusText))
            }
        }
    })
}
// Rendering userslist
const userUrl = "https://jsonplaceholder.typicode.com/users"
getData(userUrl).then(function (users) {
    users.forEach(function (user) {
        const content = `
                        <li class="user-link" onclick="renderUserPosts(${user.id})">
                        ${user.name}
                        <p>${user.email}</p>
                        </li>
                        `
        usersList.insertAdjacentHTML('beforeend', content)
        postsList.innerText = "Click on a user link to display his posts.."
    })
})
    .catch(err => postsList.innerText = err)

// Rendering Users Posts list, Function called from "in-line onclick event"
function renderUserPosts(userId) {
    let postsUrl = 'https://jsonplaceholder.typicode.com/posts/?userId=' + userId
    getData(postsUrl).then(posts => {
        postsList.innerHTML = '' // Vider le contenneur avant de le remplir denouveaux posts
        posts.forEach(post => {
            const article = `
            <div class="post">
            <h3 class="post-title">${post.title} (Post id: ${post.id}) (user id: ${post.userId})</h3>
            <p class="post-content">${post.body}</p>
            </div>
            `
            postsList.insertAdjacentHTML('beforeend', article)
        })
    })
}
