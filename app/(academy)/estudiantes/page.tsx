import { getAllStudents } from '@/actions'
import CreateStudentModal from './modal'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

export default async function ObtenerEstudiantes() {
  const estudiantes = await getAllStudents()

  return (
    <div className="p-8 min-h-screen bg-background">
      <div className="max-w-6xl mx-auto bg-card rounded-2xl border shadow-sm">
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h1 className="text-2xl font-semibold tracking-tight">Estudiantes</h1>
          <CreateStudentModal />
        </div>

        <div className="px-6 py-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombres</TableHead>
                <TableHead>Paterno</TableHead>
                <TableHead>Materno</TableHead>
                <TableHead>Dirección</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {estudiantes.map((est) => (
                <TableRow
                  key={est.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="py-4 font-medium">
                    {est.nombres}
                  </TableCell>

                  <TableCell className="py-4 text-muted-foreground">
                    {est.paterno}
                  </TableCell>

                  <TableCell className="py-4 text-muted-foreground">
                    {est.materno}
                  </TableCell>

                  <TableCell className="py-4 text-muted-foreground">
                    {est.direccion}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
