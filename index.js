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
    

    getPost();
    document.getElementById('mainMenu').reset();
}

let listRecentTitle = [];
//La funcion que capta los datos y muestra la imagen y el texto.
function getPost() {
    const file = document.querySelector("input[type=file]").files[0];
    let posts = JSON.parse(localStorage.getItem("posts"));
    let postsView = document.getElementById("placePost");
    var newDiv = document.createElement("div");
    var newA = document.createElement("a");
    var newElementP = document.createElement("p");
    var preview = document.createElement("img");
    var newElementTitle = document.createElement("h2");
    var elementDate = document.createElement("h5"); 

    //DATE
    let date = Date().split("GMT-0400 (hora de Venezuela)");
    let datePost = date[0].toString();

    //Variables para el post
    let textTitle = posts[posts.length-1].textTitle;
    let newPhoto = posts[posts.length-1].newPhoto;
    let textBlog = posts[posts.length-1].textBlog;

    //RECENT POST
    var newLi = document.createElement("li");
    let recentPost = document.getElementById("newRecentPost");
    listRecentTitle.push(textTitle);
    var idPost= `post${posts.length-1}`;
    newRecentPosts(newLi, recentPost, newA, idPost);

    newElementTitle.textContent = `${textTitle}`;
    newDiv = newTitle(newElementTitle, newDiv);
    elementDate.textContent = datePost;
    newDiv = newDate(datePost, elementDate, newDiv);
    
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

    newDiv.setAttribute("id", idPost);
    newDiv.classList.add("newPost");
    postsView.prepend(newDiv);
}

/* Esta función se encarga de agregar un titulo a cada publicación*/
function newTitle(newElementTitle, newDiv) {
    /* Title of the post*/
    newDiv.appendChild(newElementTitle);
    newElementTitle.classList.add("titlePost");
    return newDiv;
}

/* Función que se encarga de crear la fecha y hora en la que se publico un post */
function newDate(datePost, elementDate, newDiv) {
    newDiv.appendChild(elementDate);
    elementDate.classList.add("datePost");
    return newDiv;
}

/* Esta función se encarga de enviar la imagen si existe */
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

/* Esta función se encarga de enviar el texto si existe */
function newText(newElementP, newDiv){
    newDiv.appendChild(newElementP);
    return newDiv;
}

/* Esta función se encarga de la fecha en la que se subio el post */
function newRecentPosts(newLi, recentPost, newA, idPost){
    let reversedTitle = listRecentTitle.reverse();
    console.log(reversedTitle);
    var list = document.getElementById("newRecentPost");
    
    if(listRecentTitle.length >= 5){
        list.removeChild(list.lastChild);
    }

    newA.href = `#${idPost}`;
    newA.innerHTML = reversedTitle[0];
    newLi.appendChild(newA);
    newLi.classList.add("recentPost1");
    recentPost.prepend(newLi);
}


/*Esta función maneja la paginación*/
function paginationSize() {
    let pageNumber=1; 
    let pageSize=4;
    let postsHtml="";
    let pagination;
    let pageCont =Math.floor(posts.length/pageSize);
    function paginate(array, page_size, page_number) {
        return array.slice((page_number - 1) * page_size, page_number * page_size);
    }
    function nextPage(){
        pageNumber ++;
        showPost(pagination);
    }
    function previusPage(){
        pageNumber --;
        showNoticias(pagination);
    }
    function showPost(_posts){
        var pagination = paginate(posts,pageSize,pageNumber);
        console.log("nextPage",pagination)
        postsHtml+= pageNumber > 1  ? " <button onclick='previusPage()'>Anterior</button>":"";
        postsHtml+= pageNumber < pageCont ?(" <button onclick='nextPage()'>Siguiente</button>"):"" ;
        document.getElementById("pagination").innerHTML="";
        document.getElementById("pagination").innerHTML=postsHtml;
    }
    showPost(posts);
}