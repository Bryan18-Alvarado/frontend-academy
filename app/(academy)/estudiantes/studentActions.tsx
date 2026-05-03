'use client'

import { Estudiantes } from '@/types'
import { MoreVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Swal from 'sweetalert2'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { deleteStudent } from '@/actions'
import { Button } from '@/components/ui/button'
import EditStudentModal from './EditStudentModal'
import ViewStudentModal from './ViewStudentModal'

export default function StudentActions({ student }: { student: Estudiantes }) {
  const [open, setOpen] = useState(false)
  const [openView, setOpenView] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: '¿Deseas eliminar el siguiente estudiante?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ef4444'
    })

    if (!result.isConfirmed) return

    try {
      await deleteStudent(student.id)

      await Swal.fire({
        title: 'Eliminado',
        text: 'El estudiante fue eliminado exitosamente',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      })

      router.refresh()
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar el estudiante',
        icon: 'error'
      })
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-background border shadow-md">
          <DropdownMenuItem onClick={() => setOpenView(true)}>
            Ver
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Editar
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleDelete} className="text-red-500">
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditStudentModal student={student} open={open} setOpen={setOpen} />
      <ViewStudentModal
        student={student}
        open={openView}
        setOpen={setOpenView}
      />
    </>
  )
}
