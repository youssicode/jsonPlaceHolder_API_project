const usersList = document.querySelector(".users-list ul")
const postsList = document.querySelector(".posts-list")

function renderUsers(posts) {
    if (posts) {
        let usersfound = []
        posts.forEach(function (post) {
            if (!usersfound.includes(post.userId)) {
                const userLink = document.createElement('li')
                userLink.classList.add('user-id')
                userLink.setAttribute('data-userId', post.userId)
                userLink.insertAdjacentText('afterbegin', `User (Name) Id: ${post.userId}`)
                usersList.insertAdjacentElement('beforeend', userLink)
                usersfound.push(post.userId)
            }
        })
        postsList.innerText = "Click on a user link to display his posts.."
    }
}

// Fetching using Async
async function renderPosts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/")
    if (response.status == 200) {
        const posts = await response.json()
        renderUsers(posts)
    } else {
        throw Error('Fetching Data Failed.')
    }
}
renderPosts().then(function () {
    //* rendering posts related to a specific user by Fetching URL with parameter
    //* it's very important to run the following after renderPosts() function is executed => use promise 
    const userLink = document.querySelectorAll(".user-id")
    userLink.forEach(link => {
        link.addEventListener('click', function () {
            let id = this.getAttribute('data-userId')
            let url = 'https://jsonplaceholder.typicode.com/posts/?userId=' + id
            async function renderUserPosts() {
                const response = await fetch(url)
                const posts = await response.json()
                postsList.innerHTML = '' // Vider le contenneur avant de le remplir denouveaux posts
                posts.forEach(post => {
                    const article = `
                                        <div class="post">
                                        <h3 class="post-title">${post.title} (id: ${post.id})</h3>
                                        <p class="post-content">${post.body}</p>
                                        </div>
                                        `
                    postsList.insertAdjacentHTML('beforeend', article)
                })
            }
            renderUserPosts()
        })
    })
}).catch(err => postsList.innerText = err)