'use client'

import { Docentes } from '@/types'

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
  docente: Docentes
  open: boolean
  setOpen: (v: boolean) => void
}

export default function ViewDocenteModal({ docente, open, setOpen }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg bg-background border shadow-xl backdrop-blur-none">
        {' '}
        <DialogHeader>
          <DialogTitle>Detalle del docente</DialogTitle>
          <DialogDescription>Información general del docente</DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Nombres</p>
            <p className="font-medium">{docente.nombres}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Apellidos</p>
            <p className="font-medium">{docente.apellidos}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Email</p>
            <p className="font-medium">{docente.email}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Teléfono</p>
            <p className="font-medium">{docente.telefono}</p>
          </div>

          <div className="col-span-2">
            <p className="text-muted-foreground">Dirección</p>
            <p className="font-medium">{docente.direccion}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Cédula</p>
            <p className="font-medium">{docente.cedula}</p>
          </div>
        </div>
        <Separator />
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Sexo</span>
            <Badge variant="secondary">{docente.sexo_id}</Badge>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Etnia</span>
            <Badge variant="secondary">{docente.etnia_id}</Badge>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Cargo</span>
            <Badge variant="secondary">{docente.cargo_id}</Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
