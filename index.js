window.onload = function() {
    localStorage.clear();
    sessionStorage.clear();
};

document.getElementById('mainMenu').addEventListener('submit', savePost);

function savePost(e) {
    e.preventDefault();

    let textTitle =  document.getElementById('textTitle').value;
    let textBlog = document.getElementById('textBlog').value;
    let newPhoto = document.getElementById('newPhoto').value;

    if(!textTitle){
        /*Post of Title*/
        alert("Falta el titulo");
        return ;   
    }
    
    //Objeto
    const post = {
        textBlog,
        newPhoto,
        textTitle
    };

    if (!localStorage.getItem('posts')){
        //Arreglo
        let posts = [];
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
    }else {
        let posts = JSON.parse(localStorage.getItem('posts'));
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
    }
    
    //pagination(posts);
    getPost();
    document.getElementById('mainMenu').reset();
}

let listRecentTitle = [];
//La funcion que capta los datos y muestra la imagen y el texto.
function getPost() {
    const file = document.querySelector("input[type=file]").files[0];
    let posts = JSON.parse(localStorage.getItem("posts"));
    let postsView = document.getElementById("placePost");
    let newDiv = document.createElement("div");
    const newA = document.createElement("a");
    const newElementP = document.createElement("p");
    const preview = document.createElement("img");
    const newElementTitle = document.createElement("h2");
    const elementDate = document.createElement("h5"); 

    //DATE
    const date = Date().split("GMT-0400 (hora de Venezuela)");
    let datePost = date[0].toString();

    //Variables para el post
    let textTitle = posts[posts.length-1].textTitle;
    let newPhoto = posts[posts.length-1].newPhoto;
    let textBlog = posts[posts.length-1].textBlog;

    //RECENT POST
    const newLi = document.createElement("li");
    const recentPost = document.getElementById("newRecentPost");
    listRecentTitle.push(textTitle);
    let idPost= `post${posts.length-1}`;
    newRecentPosts(newLi, recentPost, newA, idPost);

    newElementTitle.textContent = `${textTitle}`;
    newDiv = newTitle(newElementTitle, newDiv);
    elementDate.textContent = datePost;
    newDiv = newDate(datePost, elementDate, newDiv);
    
    //Función para determinar las partes del POST: imagen y el parrafo
    partsOfPost(file, textBlog, newPhoto, preview, newDiv, newElementP, textBlog);

    newDiv.setAttribute("id", idPost);
    newDiv.classList.add("newPost");
    postsView.prepend(newDiv);
}

//Función para determinar las partes del POST
function partsOfPost(file, textBlog, newPhoto, preview, newDiv, newElementP, textBlog) {
    if(file){
        /*Post de la imagen*/
        preview.textContent = `${newPhoto}`;
        newDiv = newImage(preview, file, newDiv);
    }
    
    if(textBlog){
        /*Post del texto*/
        newElementP.textContent = `${textBlog}`;
        newDiv = newText(newElementP, newDiv);
    }
}

//Esta función se encarga de agregar un titulo a cada publicación
function newTitle(newElementTitle, newDiv) {
    /* Title of the post*/
    newDiv.appendChild(newElementTitle);
    newElementTitle.classList.add("titlePost");
    return newDiv;
}

//Función que se encarga de crear la fecha y hora en la que se publico un post
function newDate(datePost, elementDate, newDiv) {
    newDiv.appendChild(elementDate);
    elementDate.classList.add("datePost");
    return newDiv;
}

//Esta función se encarga de enviar la imagen si existe 
function newImage(preview, file, newDiv){
    /*Post de la imagen*/
    let reader = new FileReader();
    reader.onload = function() {
        preview.src = reader.result;
    };  
    reader.readAsDataURL(file);
    newDiv.appendChild(preview);

    return newDiv;
}

//Esta función se encarga de enviar el texto si existe
function newText(newElementP, newDiv){
    newDiv.appendChild(newElementP);
    return newDiv;
}

//Esta función se encarga de la fecha en la que se subio el post 
function newRecentPosts(newLi, recentPost, newA, idPost){
    let reversedTitle = listRecentTitle.reverse();
    const list = document.getElementById("newRecentPost");
    
    if(listRecentTitle.length >= 5){
        list.removeChild(list.lastChild);
    }

    newA.href = `#${idPost}`;
    newA.innerHTML = reversedTitle[0];
    newLi.appendChild(newA);
    newLi.classList.add("recentPost1");
    recentPost.prepend(newLi);
}

//Funcion de los comentarios de cada POST
function commentPost(){
    
}


/*Esta función maneja la paginación*/
/*
function pagination(posts) {
    let state = {
        'querySet': posts,
        'page': 1,
        'rows': 4,
    }

    function paginationSize(querySet, page, row){
        let trimStart = (page - 1) * rows;
        let trimEnd = trimStart + rows;
                                                                                                               
    }
}
*/