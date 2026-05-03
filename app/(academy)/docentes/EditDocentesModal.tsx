'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

import { updateDocente } from '@/actions/docentes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Docentes } from '@/types'

interface Props {
  docente: Docentes
  open: boolean
  setOpen: (v: boolean) => void
}

export default function EditDocenteModal({ docente, open, setOpen }: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Docentes>()

  useEffect(() => {
    reset(docente)
  }, [docente, reset])

  const onSubmit = async (data: Docentes) => {
    try {
      setLoading(true)
      await updateDocente(docente.id, data)

      router.refresh()
      setOpen(false)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg bg-card border shadow-xl">
        <DialogHeader>
          <DialogTitle>Editar docente</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label>Nombres</Label>
              <Input {...register('nombres', { required: true })} />
              {errors.nombres && (
                <p className="text-xs text-red-300">Campo requerido</p>
              )}
            </div>

            <div>
              <Label>Apellidos</Label>
              <Input {...register('apellidos', { required: true })} />
              {errors.apellidos && (
                <p className="text-xs text-red-300">Campo requerido</p>
              )}
            </div>

            <div>
              <Label>Email</Label>
              <Input type="email" {...register('email', { required: true })} />
              {errors.email && (
                <p className="text-xs text-red-300">Campo requerido</p>
              )}
            </div>

            <div>
              <Label>Teléfono</Label>
              <Input
                type="number"
                {...register('telefono', { required: true })}
              />
              {errors.telefono && (
                <p className="text-xs text-red-300">Campo requerido</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <Label>Dirección</Label>
              <Input {...register('direccion', { required: true })} />
              {errors.direccion && (
                <p className="text-xs text-red-300">Campo requerido</p>
              )}
            </div>

            <div>
              <Label>Cédula</Label>
              <Input {...register('cedula', { required: true })} />
              {errors.cedula && (
                <p className="text-xs text-red-300">Campo requerido</p>
              )}
            </div>

            <div>
              <Label>Sexo ID</Label>
              <Input
                type="number"
                {...register('sexo_id', {
                  required: true,
                  valueAsNumber: true
                })}
              />
            </div>

            <div>
              <Label>Etnia ID</Label>
              <Input
                type="number"
                {...register('etnia_id', {
                  required: true,
                  valueAsNumber: true
                })}
              />
            </div>

            <div>
              <Label>Cargo ID</Label>
              <Input
                type="number"
                {...register('cargo_id', {
                  required: true,
                  valueAsNumber: true
                })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" onClick={() => setOpen(false)}>
              Cancelar
            </Button>

            <Button type="submit" disabled={loading}>
              {loading ? 'Actualizando...' : 'Actualizar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
