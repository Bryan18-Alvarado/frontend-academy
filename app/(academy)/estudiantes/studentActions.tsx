'use client'

import { Estudiantes } from '@/types'
import { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'
import { MoreVertical } from 'lucide-react'
import EditStudentModal from './editStudentModal'

export default function StudentActions({ student }: { student: Estudiantes }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-background border shadow-md">
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Editar
          </DropdownMenuItem>

          <DropdownMenuItem className="text-red-500">Eliminar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditStudentModal student={student} open={open} setOpen={setOpen} />
    </>
  )
}
