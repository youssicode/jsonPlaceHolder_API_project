const usersList = document.querySelector(".users-list ul")
function insertPosts(posts) {
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

                // rendering posts related to a specific user by looping on entire posts (main fetch response)
                userLink.addEventListener('click', function () {
                    const postsList = document.querySelector(".posts-list")
                    postsList.innerHTML = '' // Vider le contenneur avant de le remplir denouveaux posts
                    posts.forEach(post => {
                        // I used arrow function with the Foreach to make 'this' refer to the 'clicked' link instead of 'window' object
                        if (post.userId == this.getAttribute('data-userId')) { // cant use === because they've diff. data type
                            const article = `
                                            <div class="post">
                                            <h3 class="post-title">${post.title} (id: ${post.id})</h3>
                                            <p class="post-content">${post.body}</p>
                                            </div>
                                            `
                            postsList.insertAdjacentHTML('beforeend', article)
                        }
                    })
                })
            }
        })
    }
}
// Fetching using Promise
fetch("https://jsonplaceholder.typicode.com/posts/")
    .then(respose => respose.json())
    .then(json => insertPosts(json))
    .catch(err => console.log(err))