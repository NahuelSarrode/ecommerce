const carrito = document.querySelector('#carrito');
const carritoContainer = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let listadoDeCursos = [];

listenersBuffer();

// eventListerners list 
function listenersBuffer(e) {
  listaCursos.addEventListener('click', agregarCurso); 

  carrito.addEventListener('click', eliminarCurso);

  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function vaciarCarrito(e) {
  listadoDeCursos = [];

  cleanHtml();
}

function eliminarCurso(e) {
  if (e.target.classList.contains('borrar-curso')) {
    const data_id = e.target.getAttribute('data-id');

    listadoDeCursos = listadoDeCursos.filter(element => element.id !== data_id);

    cursoToHtml();
  }
}

function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains('agregar-carrito')) {
    const parent = e.target.parentElement.parentElement; 
    leerDatosCurso(parent);
  }
}

function leerDatosCurso(element) {
  const data = {
    img: element.querySelector('img').src,
    titulo: element.querySelector('h4').textContent,
    precio: element.querySelector('.precio span').textContent,
    id: element.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  }

  const exist = listadoDeCursos.some(curso => curso.id === data.id); 
  if (exist) {
    // modifico la cantidad
    const courses = listadoDeCursos.map(curso => {
      if (curso.id === data.id) {
        curso.cantidad++;
        return curso;
      }

      return curso;
    })

    listadoDeCursos = [...courses];
  } else {
    // agrego el curso al carrito. 
    listadoDeCursos = [...listadoDeCursos, data]; 
    console.log(listadoDeCursos); 
  }

  cursoToHtml();
}

function cursoToHtml() {
  // limpio el carrito. 
  cleanHtml();

  // recorrer el arreglo de cursos. 
  listadoDeCursos.forEach(curso => {
    const {img, titulo, precio, cantidad, id} = curso;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td> <img src=${img} width="100"</td>
      <td> ${titulo} </td>
      <td> ${precio} </td>
      <td> ${cantidad} </td>
      <td> 
        <a href="#" class="borrar-curso" data-id="${id}" > X </a> 
      </td>
    `;
    // agregar cada uno de los elementos al carrito.
    carritoContainer.appendChild(row);
  });
};

function cleanHtml() {
  while(carritoContainer.firstChild) {
    carritoContainer.removeChild(carritoContainer.firstChild);
  }
};