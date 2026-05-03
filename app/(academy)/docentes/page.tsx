import { getAllDocentes } from '@/actions/docentes'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import CreateDocenteModal from './CreateDocentesModal'

export default async function GetAllDocentes() {
  const docentes = await getAllDocentes()

  return (
    <div className="p-8 min-h-screen bg-background">
      <div className="max-w-6xl mx-auto bg-card rounded-2xl border shadow-sm">
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h1 className="text-2xl font-semibold tracking-tight">Docentes</h1>
          <CreateDocenteModal />
        </div>

        <div className="px-6 py-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombres</TableHead>
                <TableHead>Apellidos</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Dirección</TableHead>
                <TableHead>Cedula</TableHead>
                <TableHead>Telefono</TableHead>
                <TableHead>Etnia ID</TableHead>
                <TableHead>Cargo ID</TableHead>
                <TableHead>Sexo ID</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {docentes.map((doc) => (
                <TableRow
                  key={doc.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="py-4 font-medium">
                    {doc.nombres}
                  </TableCell>

                  <TableCell className="py-4 text-muted-foreground">
                    {doc.apellidos}
                  </TableCell>

                  <TableCell className="py-4 text-muted-foreground">
                    {doc.email}
                  </TableCell>
                  <TableCell className="py-4 text-muted-foreground">
                    {doc.direccion}
                  </TableCell>

                  <TableCell className="py-4 text-muted-foreground">
                    {doc.cedula}
                  </TableCell>
                  <TableCell className="py-4 text-muted-foreground">
                    {doc.telefono}
                  </TableCell>
                  <TableCell className="py-4 text-muted-foreground">
                    {doc.etnia_id}
                  </TableCell>
                  <TableCell className="py-4 text-muted-foreground">
                    {doc.cargo_id}
                  </TableCell>
                  <TableCell className="py-4 text-muted-foreground">
                    {doc.sexo_id}
                  </TableCell>
                  <TableCell>
                    {/* <StudentActions student={est} />{' '} */}
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
