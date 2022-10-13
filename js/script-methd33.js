const usersList = document.querySelector(".users-list ul")
const postsList = document.querySelector(".posts-list")

// Fetching using Async
async function fetchData(url) {
    const response = await fetch(url)
    if (response.status >= 200 && response.status < 300) {
        const result = await response.json()
        return result
    } else {
        throw Error('Fetching Data Failed.')
    }
}
// Rendering users list
async function renderUsers() {
    try {
        const users = await fetchData("https://jsonplaceholder.typicode.com/users")
        users.forEach(function (user) {
            const content = `
                            <li class="user-link" id="${user.id}">
                            ${user.name}
                            <p>${user.email}</p>
                            </li>
                            `
            usersList.insertAdjacentHTML('beforeend', content)
            const link = document.getElementById(user.id)
            link.addEventListener('click', async function () {
                let postsUrl = 'https://jsonplaceholder.typicode.com/posts/?userId=' + user.id
                const posts = await fetchData(postsUrl)
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
        })
        postsList.innerText = "Click on a user link to display his posts.."
    } catch (error) {
        postsList.innerText = error
    }

}
renderUsers()