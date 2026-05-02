import { getAllStudents } from '@/actions'
import CreateStudentModal from './modal'

export default async function ObtenerEstudiantes() {
  const estudiantes = await getAllStudents()

  return (
    <div>
      <div>
        <h1 className="font-bold p-3">Estudiantes</h1>
        <CreateStudentModal />
        <table>
          <thead>
            <tr>
              <th className="p-3">Nombres</th>
              <th className="p-3">Paternos</th>
              <th className="p-3">Maternos</th>
              <th className="p-3">Direccion</th>
            </tr>
          </thead>

          <tbody>
            {estudiantes.map((est) => (
              <tr key={est.id} className="border-t-2">
                <td>{est.nombres}</td>
                <td>{est.paterno}</td>
                <td>{est.materno}</td>
                <td>{est.direccion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
