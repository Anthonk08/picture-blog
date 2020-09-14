document.getElementById('contenido').addEventListener('submit', savePost);

function savePost(e) {
    let textBlog = document.getElementById('textBlog').value;
    let newPhoto = document.getElementById('newPhoto').value;
    console.log(newPhoto);

    const post = {
        textBlog,
        newPhoto
    };

    if (localStorage.getItem('posts') === null){
        let posts = [];
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
    }else {
        let posts = JSON.parse(localStorage.getItem('posts'));
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    getPost();
    document.getElementById('contenido').reset();
    e.preventDefault();
}

function getPost() {
    let posts = JSON.parse(localStorage.getItem('posts'));
    let postsView = document.getElementById('element');

    postsView.innerHTML = '';

    for(let i = 0; i < posts.length; i++) {
        let textBlog = posts[i].textBlog;
        let newPhoto = posts[i].newPhoto;

        postsView.innerHTML += `<img src="${newPhoto}" alt="examplePhoto" width= 800px height= 400px>
        <p id="photoParagraph">${textBlog}</p>
        `
    }
}

getPost();
