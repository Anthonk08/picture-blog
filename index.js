window.onload = function() {
    localStorage.clear();
    sessionStorage.clear();
};

document.getElementById('mainMenu').addEventListener('submit', savePost);

function savePost(e) {
    e.preventDefault();

    let textBlog = document.getElementById('textBlog').value;
    let newPhoto = document.getElementById('newPhoto').value;
    
    //Objeto
    const post = {
        textBlog,
        newPhoto
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

let listDate = [];
//La funcion que capta los datos y muestra la imagen y el texto.
function getPost() {
    const file = document.querySelector("input[type=file]").files[0];
    let posts = JSON.parse(localStorage.getItem("posts"));
    let postsView = document.getElementById("placePost");
    var newDiv = document.createElement("div");
    var newElementP = document.createElement("p");
    var preview = document.createElement("img");
    
    //DATE
    var newLi = document.createElement("li");
    let recentPost = document.getElementById("newRecentPost");
    let date = Date().split("GMT-0400 (hora de Venezuela)");
    let datePost = date[0].toString();
    listDate.push(datePost);
    newDate(newLi, recentPost);

    for (let i = 0; i < posts.length; i++) {
        let newPhoto = posts[i].newPhoto;
        let textBlog = posts[i].textBlog;

        if(file){
            /*Post de la imagen*/
            preview.textContent = `${newPhoto}`;
            newImage(preview, file, newDiv);
        }
        
        if(newElementP){
            /*Post del texto*/
            newElementP.textContent = `${textBlog}`;
            newText(newElementP, postsView, newDiv);
        }
    }

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
}

/* Esta función se encarga de enviar el texto si existe */
function newText(newElementP, postsView, newDiv){
    newDiv.appendChild(newElementP);
    newDiv.classList.add("newPost");
    postsView.appendChild(newDiv);
}

/* Esta función se encarga de la fecha en la que se subio el post */
function newDate(newLi, recentPost){
    console.log(listDate);
    let reversedDate = listDate.reverse();

    var list = document.getElementById("newRecentPost");
    if(listDate.length >= 5){
        list.removeChild(list.childNodes[0]);
    }

    newLi.innerHTML = reversedDate[0];
    newLi.classList.add("recentPost1");
    recentPost.appendChild(newLi);
    
}

/*Esta función maneja la paginación*/
/*
let pageNumber=1; 
let pageSize=1;
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
*/