const usersList = document.querySelector(".users-list ul")
const postsList = document.querySelector(".posts-list")

// Fetching API Data using XMLHttpRequest
const httpReq = new XMLHttpRequest()
const userUrl = "https://jsonplaceholder.typicode.com/users"
httpReq.open('get', userUrl)
httpReq.send()
// Display the progress of the data received
httpReq.onprogress = function (ev) {
    if (ev.lengthComputable) {
        postsList.innerText = `${ev.loaded} Byte of ${ev.total} Byte loaded!`
    } else {
        postsList.innerText = `${ev.loaded} Byte loaded!`
    }
}

const reqResult = new Promise((resolve, reject) => {
    httpReq.onload = function () {
        if (httpReq.status >= 200 && httpReq.status < 300) {
            resolve(JSON.parse(httpReq.responseText))
        } else {
            reject(Error(httpReq.statusText))
        }
    }
})

reqResult.then((users) => {
    // Rendering users list
    if (users) {
        users.forEach(function (user) {
            const content = `
                            <li class="user-link" id="${user.id}">
                            ${user.name}
                            <p>${user.email}</p>
                            </li>
                            `
            usersList.insertAdjacentHTML('beforeend', content)
            // insertAdjacentElement & insertAdjacentText won't work here
        })
        // postsList.innerText = "Click on a user link to display his posts.."
    }
})
    .then(function () {
        //* rendering posts related to a specific user by Fetching URL with parameter
        //* it's very important to run the following after fetchUsers() function is executed => use promise
        const lIs = document.querySelectorAll('li.user-link')
        lIs.forEach(link => {
            link.addEventListener('click', function () {
                let userId = this.id // li's "id"
                let postsUrl = 'https://jsonplaceholde.typicode.com/posts/?userId=' + userId
                async function renderUserPosts() {
                    const response = await fetch(postsUrl)
                    const posts = await response.json()
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
                }
                renderUserPosts()
            })
        })
    })
    .catch(err => postsList.innerText = err)