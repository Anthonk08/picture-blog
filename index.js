document.getElementById('contenido').addEventListener('submit', savePost);

/*Función para la imagen*/
/*
function preview(e)
{
	if(e.files && e.files[0])
	{
		// Comprobamos que sea un formato de imagen
		if (e.files[0].type.match('image.*')) {
 
			// Inicializamos un FileReader. permite que las aplicaciones web lean 
			// ficheros (o información en buffer) almacenados en el cliente de forma
			// asíncrona
			var reader=new FileReader();
 
			// El evento onload se ejecuta cada vez que se ha leido el archivo
			// correctamente
			reader.onload=function(e) {
				document.getElementById("placePostImage").innerHTML="<img src='"+e.target.result+"' width= 800px height= 400px>";
			}
		}else{
 
			// El formato del archivo no es una imagen
			document.getElementById("placePostImage").innerHTML="No es un formato de imagen";
		}
	}
}
*/

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
    let posts = JSON.parse(localStorage.getItem('posts'));
    let postsView = document.getElementById('placePost');

    postsView.innerHTML = '';

    for(let i = 0; i < posts.length; i++) {
        let textBlog = posts[i].textBlog;
        let newPhoto = posts[i].newPhoto;
        
        if(newPhoto.type.match('image.*')){
            let reader = new FileReader();
    
            reader.onload=function(newPhoto) {
                console.log(newPhoto.target.result)
                /*
                postsView.innerHTML += `<div>
                    <img src='"+${newPhoto}.target.result+"' width= 800px height= 400px>
                    <p id="photoParagraph">${textBlog}</p>
                </div>`
                */
            }
        }
        
        
        /*
        postsView.innerHTML += `<div>
        <img src="${newPhoto}" alt="examplePhoto" width= 800px height= 400px>
        <p id="photoParagraph">${textBlog}</p>
        </div>`
        */
    }
}

getPost();
