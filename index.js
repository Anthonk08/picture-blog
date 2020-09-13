class Photo {
    constructor(imgUploader){
        this.imgUploader
    }
}

class PhotoBlog {
    addPhoto(photo){
        /*Cuadro donde estara la foto*/
        const imgPreview = document.getElementsByClassName('element');
        const element = document.createElement('div');
        element.innerHTML = `
        <img src="./${photo.imgUploader}" height="350px" width="350px">`;

    imgPreview.appendChild(element);
    }

    resetBoton(){

    }

    deletePhoto(){

    }

    showMessage(){

    }
}

/* Eventos del DOM */
document.getElementById('botons').addEventListener("click", function(event) {
    const newPhoto = document.getElementById('imgUploader').value;

    const photo = new Photo(newPhoto);
    /* Un nuevo objeto del PhotoBlog */
    const photoBlog = new PhotoBlog();

    photoBlog.addProduct(photo);
    event.preventDefault();
});
