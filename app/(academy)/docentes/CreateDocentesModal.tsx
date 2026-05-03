'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { createDocente } from '@/actions/docentes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Docentes } from '@/types'
import { useRouter } from 'next/navigation'

export default function CreateDocenteModal() {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Docentes>()

  const onSubmit = async (data: Docentes) => {
    try {
      setLoading(true)
      await createDocente(data)

      router.refresh()
      reset()
      setOpen(false)
    } catch (error) {
      console.error('Error al crear docente:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Agregar docente</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-card border shadow-xl max-h-[90vh] overflow-y-auto">
        {' '}
        <DialogHeader>
          <DialogTitle>Crear Docente</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Nombres</Label>
              <Input {...register('nombres', { required: true })} />
              {errors.nombres && (
                <p className="text-xs text-red-300">Campo requerido</p>
              )}
            </div>

            <div className="space-y-1">
              <Label>Apellidos</Label>
              <Input {...register('apellidos', { required: true })} />
              {errors.apellidos && (
                <p className="text-xs text-red-300">Campo requerido</p>
              )}
            </div>

            <div className="space-y-1">
              <Label>Email</Label>
              <Input type="email" {...register('email', { required: true })} />
              {errors.email && (
                <p className="text-xs text-red-300">Campo requerido</p>
              )}
            </div>

            <div className="space-y-1">
              <Label>Teléfono</Label>
              <Input {...register('telefono', { required: true })} />
              {errors.telefono && (
                <p className="text-xs text-red-300">Campo requerido</p>
              )}
            </div>

            <div className="space-y-1 sm:col-span-2">
              <Label>Dirección</Label>
              <Input {...register('direccion', { required: true })} />
              {errors.direccion && (
                <p className="text-xs text-red-300">Campo requerido</p>
              )}
            </div>

            <div className="space-y-1">
              <Label>Cédula</Label>
              <Input {...register('cedula', { required: true })} />
              {errors.cedula && (
                <p className="text-xs text-red-300">Campo requerido</p>
              )}
            </div>

            <div className="space-y-1">
              <Label>Sexo ID</Label>
              <Input
                type="number"
                {...register('sexo_id', {
                  required: true,
                  valueAsNumber: true
                })}
              />
              {errors.sexo_id && (
                <p className="text-xs text-red-300">Campo requerido</p>
              )}
            </div>

            <div className="space-y-1">
              <Label>Etnia ID</Label>
              <Input
                type="number"
                {...register('etnia_id', {
                  required: true,
                  valueAsNumber: true
                })}
              />
              {errors.etnia_id && (
                <p className="text-xs text-red-300">Campo requerido</p>
              )}
            </div>

            <div className="space-y-1">
              <Label>Cargo ID</Label>
              <Input
                type="number"
                {...register('cargo_id', {
                  required: true,
                  valueAsNumber: true
                })}
              />
              {errors.cargo_id && (
                <p className="text-xs text-red-300">Campo requerido</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>

            <Button type="submit">{loading ? 'Guardando...' : 'Crear'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
