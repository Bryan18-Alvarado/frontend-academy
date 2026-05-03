'use client'

import { Docentes } from '@/types'
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

import { deleteDocente } from '@/actions/docentes'
import { Button } from '@/components/ui/button'
import EditDocenteModal from './EditDocentesModal'
import ViewDocenteModal from './ViewDocenteModal'

export default function DocenteActions({ docente }: { docente: Docentes }) {
  const [open, setOpen] = useState(false)
  const [openView, setOpenView] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: '¿Deseas eliminar el siguiente docente?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ef4444'
    })

    if (!result.isConfirmed) return

    try {
      await deleteDocente(docente.id)

      await Swal.fire({
        title: 'Eliminado',
        text: 'El docente fue eliminado exitosamente',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      })

      router.refresh()
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar el docente',
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

      <EditDocenteModal docente={docente} open={open} setOpen={setOpen} />

      <ViewDocenteModal
        docente={docente}
        open={openView}
        setOpen={setOpenView}
      />
    </>
  )
}
