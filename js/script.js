const postsTemp = [
    {
        id: 1,
        title: 'title1',
        body: "ontrairement à une opinion répandue, le Lorem Ipsum n'est pas simplement du texte aléatoire. Il trouve ses racines dans une oeuvre de la littérature latine classique datant de 45 av. J.-C.",
        userId: 1
    },
    {
        id: 2,
        title: 'title2',
        body: "ontrairement à une opinion répandue, le Lorem Ipsum n'est pas simplement du texte aléatoire. Il trouve ses racines dans une oeuvre de la littérature latine classique datant de 45 av. J.-C., le rendant vieux de 2000 ans. Un professeur du Hampden-Sydney College, en Virginie, s'est intéressé à un des mots latins les plus obscurs, consectetur, extrait d'un passage du Lorem Ipsum",
        userId: 1
    },
    {
        id: 3,
        title: 'title3',
        body: "ontrairement à une opinion répandue, le Lorem Ipsum n'est pas simplement du texte aléatoire. Il trouve ses racines dans une oeuvre de la littérature latine classique datant de 45 av. J.-C.",
        userId: 1
    },
    {
        id: 4,
        title: 'title4',
        body: "ontrairement à une opinion répandue, le Lorem Ipsum n'est pas simplement du texte aléatoire. Il trouve ses racines dans une oeuvre de la littérature latine classique datant de 45 av. J.-C., le rendant vieux de 2000 ans. Un professeur du Hampden-Sydney College, en Virginie, s'est intéressé à un des mots latins les plus obscurs, consectetur, extrait d'un passage du Lorem Ipsum",
        userId: 2
    },
    {
        id: 5,
        title: 'title5',
        body: "ontrairement à une opinion répandue, le Lorem Ipsum n'est pas simplement du texte aléatoire. Il trouve ses racines dans une oeuvre de la littérature latine classique datant de 45 av. J.-C.",
        userId: 2
    },
    {
        id: 6,
        title: 'title6',
        body: "ontrairement à une opinion répandue, le Lorem Ipsum n'est pas simplement du texte aléatoire. Il trouve ses racines dans une oeuvre de la littérature latine classique datant de 45 av. J.-C.",
        userId: 3
    },
    {
        id: 7,
        title: 'title7',
        body: "ontrairement à une opinion répandue, le Lorem Ipsum n'est pas simplement du texte aléatoire. Il trouve ses racines dans une oeuvre de la littérature latine classique datant de 45 av. J.-C., le rendant vieux de 2000 ans. Un professeur du Hampden-Sydney College, en Virginie, s'est intéressé à un des mots latins les plus obscurs, consectetur, extrait d'un passage du Lorem Ipsum",
        userId: 4
    },
    {
        id: 8,
        title: 'title8',
        body: "ontrairement à une opinion répandue, le Lorem Ipsum n'est pas simplement du texte aléatoire. Il trouve ses racines dans une oeuvre de la littérature latine classique datant de 45 av. J.-C.",
        userId: 4
    }
]

const usersList = document.querySelector(".users-list ul")
function insertPostUsers() {
    if (postsTemp) {
        postsTemp.forEach(function (post) {
            const userLink = document.createElement('li')
            userLink.classList.add('user-id')
            userLink.setAttribute('data-userId', post.userId)
            userLink.insertAdjacentText('afterbegin', `User (Name) Id: ${post.userId}`)
            usersList.insertAdjacentElement('beforeend', userLink)

            userLink.addEventListener('click', function () {
                const postsList = document.querySelector(".posts-list")
                postsList.innerHTML = '' // Vider le contenneur avant de le remplir denouveaux posts
                postsTemp.forEach(post => {
                    // I used arrow function with the Foreach to make 'this' refer to the 'clicked' link instead of 'window' object
                    if (post.userId == this.getAttribute('data-userId')) { // cant use === because they've diff. data type
                        const article = `
                                        <div class="post">
                                        <h3 class="post-title">${post.title}</h3>
                                        <p class="post-content">${post.body}</p>
                                        </div>
                                        `
                        postsList.insertAdjacentHTML('beforeend', article)
                    }
                })
            })
            // `<li class="user-id" data-userId='${post.userId}'> User (Name) Id: ${post.userId} </li>`
        })
    }
}
insertPostUsers()
