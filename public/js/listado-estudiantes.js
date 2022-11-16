const results = document.querySelector('#results');
const deleteModal = document.querySelector('#deleteModal');

const FetchData = () => {
  // const URI = 'https://students-manager-app-production.up.railway.app/estudiantes'
  const URI = "http://localhost:3030/estudiantes"
  
  fetch(URI)
  .then(res => res.json())
  .then(data => DisplayStudentList(data))
  .catch(err=> console.log(err))
}

const DisplayStudentList = (studentList = [] ) =>{
  results.innerHTML = ''

  studentList.forEach(student => {
    results.innerHTML += /*html*/`
    <tr>
      <td class="p-2 whitespace-nowrap">
          <div class="flex items-center">
              <div class="font-medium text-gray-800">${student.nombre} ${student.apellido}</div>
          </div>
      </td>
      <td class="p-2 whitespace-nowrap">
          <div class="text-left">${student.curso}</div>
      </td>
      <td class="p-2 whitespace-nowrap">
          <div class="text-left font-medium text-green-500">${student.matricula}</div>
      </td>
      <td class="p-2 whitespace-nowrap">
          <div class="text-lg text-center">${student.nota}</div>
      </td>
      <td class="p-2 whitespace-nowrap">
          <div class="text-lg text-center">
            <button class="font-medium text-red-400 hover:text-red-600" data-matricula=${student._id} >Eliminar</button>
          </div>
      </td>
    </tr>
    `
    let btnEliminar = document.querySelectorAll('button');
    btnEliminar.forEach(el=>{
      el.addEventListener('click',()=> deleteStudent(el.dataset.matricula))
    })
  });
}

const deleteStudent = (id) => {
  // const URI = 'https://students-manager-app-production.up.railway.app/estudiantes'
  const URI = "http://localhost:3030/estudiantes"
  confirmAction();
  // fetch(`${URI}/${id}`,{
  //   method: 'DELETE',
  // })
  // .then(res => res.json())
  // .catch(err => console.log(err))
  // .finally(()=> FetchData())
}

FetchData()

const confirmAction = () => {
  deleteModal.classList.remove('hidden')
  // deleteModal.classList.remove('hidden')
}