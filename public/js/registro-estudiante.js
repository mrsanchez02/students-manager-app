const Formulario = document.querySelector('#formulario');
const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const curso = document.querySelector('#curso');
const matricula = document.querySelector('#matricula');
const nota = document.querySelector('#nota');
const errorNombre = document.querySelector('#errorNombre');
const errorMatricula = document.querySelector('#errorMatricula');
const btnSubmit = document.querySelector('#btnSubmit');

// Expresiones Regulares
const NombreExp = /^(([A-za-z]+[\s]{1}[A-za-z]+)|([A-Za-z]+))$/;
const MatriculaExp = /^\d{4}-\d{4}$/;
const CalificacinoExp = /^(([0-9][0-9]{0,1})|100)$/;

// ErrorHandler
const errorField = {
  nombre: false,
  apellido: false,
  matricula: false,
  nota: false,
};

// Almacenamieto de estudiantes.
let listadoEstudiantes = [];

// Fn Validacion de campos
const FieldValidation = (field, evt, pattern) => {
  const errorMsg = field.nextElementSibling;
  const validation = pattern.test(evt.target.value);

  if (!validation) {
    field.classList.remove('border-green-600');
    field.classList.add('border-red-600');
    errorMsg.classList.remove('hidden');
    errorField[field.name] = true;
  } else {
    field.classList.remove('border-red-600');
    field.classList.add('border-green-600');
    errorMsg.classList.add('hidden');
    errorField[field.name] = false;
  }
};

// Eventos.
nombre.addEventListener('input', (evt) =>
  FieldValidation(nombre, evt, NombreExp)
);
apellido.addEventListener('input', (evt) =>
  FieldValidation(apellido, evt, NombreExp)
);

curso.addEventListener('input', (evt) =>
  FieldValidation(curso, evt, NombreExp)
);
matricula.addEventListener('input', (evt) =>
  FieldValidation(matricula, evt, MatriculaExp)
);

nota.addEventListener('input', (evt) =>
  FieldValidation(nota, evt, CalificacinoExp)
);

class Estudiante {
  constructor(nombre, apellido, curso,matricula,nota) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.curso = curso;
    this.matricula = matricula;
    this.nota = nota;
  }
}

const agregarEstudiante = (Listado = [], nuevoEstudiante = {}) => {
  // Listado.push(nuevoEstudiante);
  fetch('https://students-manager-app-production.up.railway.app/estudiantes',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(nuevoEstudiante)
  })
  .then(res => res.json())
  .then(data => console.log(data))
  // console.log(Listado);
};

Formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  if (
    nombre.value.trim() === '' ||
    apellido.value.trim() === ''||
    curso.value.trim() === ''||
    matricula.value.trim() === '' ||
    nota.value.trim() === ''
  ) {
    alert('Favor llenar todos los campos.');
    return;
  }

  if (
    errorField.nombre ||
    errorField.apellido ||
    errorField.curso ||
    errorField.matricula ||
    errorField.nota
  ) {
    alert('Favor revisar los campos');
    return;
  }

  const nuevoEstudiante = new Estudiante(
    nombre.value,
    apellido.value,
    curso.value,
    matricula.value,
    nota.value
  );

  agregarEstudiante(listadoEstudiantes, nuevoEstudiante);
  Formulario.reset();
});