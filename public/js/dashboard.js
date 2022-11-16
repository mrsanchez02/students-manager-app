const totalEstudiantes = document.querySelector('#totalEstudiantes');
const totalSobresalientes = document.querySelector('#totalSobresalientes');

const URI = "http://localhost:3030/estudiantes"
// const URI = 'https://students-manager-app-production.up.railway.app/estudiantes'

fetch(URI)
.then(res => res.json())
.then(data => {
  RenderTotalEstudiantes(data)
  RenderTotalSobreSalientes(data)
})
.catch(err=> console.log(err))

const RenderTotalEstudiantes = (data = []) => {
  totalEstudiantes.textContent = data.length
}

const RenderTotalSobreSalientes = (data = []) => {
  let sobresalientes = data.filter(student => student.nota >= 95 )
  totalSobresalientes.textContent = sobresalientes.length
}