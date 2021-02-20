const listaCursos = document.querySelector('#lista-cursos');
const listaCarrito = document.querySelector('#lista-carrito tbody');
let arrayCarrito = [];
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const carr = document.querySelector('#carrito');

listaCursos.addEventListener('click', (e)=>{
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        let info = e.target.parentElement.parentElement;
        infoCurso(info);
    }
});
// recuperar informacion del curso
function infoCurso (curso){
    const objcurso = {
        id : curso.querySelector('a').getAttribute('data-id'),
        img: curso.querySelector('img').src,
        nombre: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
    }
    //mantenemos lo que tiene el carrito y adjuntamos objetos nuevos
    if(validar(objcurso.id)){
        return;
    }else{
        arrayCarrito = [...arrayCarrito, objcurso];
        pintarHtml();
    }
    // console.log(arrayCarrito);
}
// dibujamos en el html del carrito 
function pintarHtml(){
    lpHtml(); 
    arrayCarrito.forEach(curso=>{
        let {nombre, img, precio, id} = curso;
        let row = document.createElement('tr');
        row.innerHTML =  `
            <td><img src="${img}" width="100"></td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td><a class="borrar-curso" href="#" data-id="${id}">X</a></td>
            `;  
        listaCarrito.appendChild(row);
    });
}
//Limpiar html

function lpHtml(){
    while(listaCarrito.firstChild){
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
}

//capturando el id en html para eliminar
carr.addEventListener('click', (e)=>{
    if(e.target.classList.contains('borrar-curso')){
       let id = e.target.getAttribute('data-id');
       eliminarCurso(id);
    }
});

//eliminar curso del carrito
function eliminarCurso(id){
    arrayCarrito = arrayCarrito.filter(carrito => carrito.id != id);
    pintarHtml();
}

//vaciar carrito 
vaciarCarrito.addEventListener('click', (e)=>{
    e.preventDefault();
    arrayCarrito = [];
    lpHtml();
});

//validar cursos en carrito
function validar(id){
    let bandera = false
    arrayCarrito.forEach(curso =>{
        if(id === curso.id){
            bandera = true;
        }
    });
    return bandera;

}