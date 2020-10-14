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

//La funcion que capta los datos y muestra la imagen y el texto.
function getPost() {
    const file = document.querySelector("input[type=file]").files[0];
    let posts = JSON.parse(localStorage.getItem("posts"));
    let postsView = document.getElementById("placePost");
    var newDiv = document.createElement("div");

    var newElementP = document.createElement("p");
    var preview = document.createElement("img");
    
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

/*Esta función se encarga de enviar la imagen si existe*/
function newImage(preview, file, newDiv){
    /*Post de la imagen*/
    let reader = new FileReader();
    reader.onload = function() {
        preview.src = reader.result;
    };
        
    reader.readAsDataURL(file);
    newDiv.appendChild(preview);
}

/*Esta función se encarga de enviar el texto si existe*/
function newText(newElementP, postsView, newDiv){
    newDiv.appendChild(newElementP);
    newDiv.classList.add("newPost");
    postsView.appendChild(newDiv);
}

