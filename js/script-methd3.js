const usersList = document.querySelector(".users-list ul")
const postsList = document.querySelector(".posts-list")

// Fetching using Async
async function fetchUsers() {
    const userUrl = "https://jsonplaceholder.typicode.com/users"
    const response = await fetch(userUrl)
    if (response.status >= 200 && response.status < 300) {
        const users = await response.json()
        renderUsers(users)
    } else {
        throw Error('Fetching Data Failed.')
    }
}
// Rendering users list
function renderUsers(users) {
    if (users) {
        users.forEach(function (user) {
            // const userLink = document.createElement('li')
            // userLink.classList.add('user-link')
            // userLink.setAttribute('id', user.id)
            // userLink.insertAdjacentText('afterbegin', user.name)

            // const email = document.createElement('P')
            // email.insertAdjacentText('afterbegin', user.email)
            // userLink.insertAdjacentElement('beforeend', email)
            // usersList.insertAdjacentElement('beforeend', userLink)
            const content = `
                            <li class="user-link" id="${user.id}">
                            ${user.name}
                            <p>${user.email}</p>
                            </li>
                            `
            usersList.insertAdjacentHTML('beforeend', content)
            // insertAdjacentElement & insertAdjacentText won't work here
        })
        postsList.innerText = "Click on a user link to display his posts.."
    }
}

fetchUsers()
    .then(function () {
        //* rendering posts related to a specific user by Fetching URL with parameter
        //* it's very important to run the following after fetchUsers() function is executed => use promise
        const lIs = document.querySelectorAll('li.user-link')
        lIs.forEach(link => {
            link.addEventListener('click', function () {
                let userId = this.id // li's "id"
                let postsUrl = 'https://jsonplaceholder.typicode.com/posts/?userId=' + userId
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