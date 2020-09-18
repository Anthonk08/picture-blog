document.getElementById('contenido').addEventListener('submit', savePost);

function savePost(e) {
    let textBlog = document.getElementById('textBlog').value;
    let newPhoto = document.getElementById('newPhoto').value;
    
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
    const file = document.querySelector("input[type=file]").files[0];
    let posts = JSON.parse(localStorage.getItem("posts"));
    let postsView = document.getElementById("thePost");
    var newElementP = document.createElement("p");
    var preview = document.createElement("img");
    
    for (let i = 0; i < posts.length; i++) {
      let textBlog = posts[i].textBlog;
      let newPhoto = posts[i].newPhoto;
      
      /*Post de la imagen*/
      preview.textContent = `${newPhoto}`;
      postsView.appendChild(preview);
      
      let reader = new FileReader();
      reader.onload = function() {
        preview.src = reader.result;
      };
      
      reader.readAsDataURL(file);

      /*Post del texto*/
      newElementP.textContent = `${textBlog}`;
      postsView.appendChild(newElementP);
    }
  }
  savePost()
