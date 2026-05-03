'use client'

import { Estudiantes } from '@/types'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface Props {
  student: Estudiantes
  open: boolean
  setOpen: (v: boolean) => void
}

export default function ViewStudentModal({ student, open, setOpen }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg bg-background border shadow-xl backdrop-blur-none">
        {' '}
        <DialogHeader>
          <DialogTitle>Detalle del estudiante</DialogTitle>
          <DialogDescription>
            Información general del estudiante
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Nombres</p>
            <p className="font-medium">{student.nombres}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Paterno</p>
            <p className="font-medium">{student.paterno}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Materno</p>
            <p className="font-medium">{student.materno}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Dirección</p>
            <p className="font-medium">{student.direccion}</p>
          </div>
        </div>
        <Separator />
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Sexo</span>
            <Badge variant="secondary">{student.sexo_id}</Badge>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Etnia</span>
            <Badge variant="secondary">{student.etnia_id}</Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
