document.getElementById('contenido').addEventListener('submit', savePost);

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
    document.getElementById('contenido').reset();
}


//Funcion del Post con imagen y texto
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
        
            let reader = new FileReader();
            reader.onload = function() {
            preview.src = reader.result;
            };
        
            reader.readAsDataURL(file);
            newDiv.appendChild(preview);
        }
        
        if(newElementP){
            /*Post del texto*/
            newElementP.textContent = `${textBlog}`;
            newDiv.appendChild(newElementP);
            newDiv.classList.add("post");
            postsView.appendChild(newDiv);
        }
    }

}

savePost();
