'use client'

import { createStudent } from '@/actions'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface FormData {
  nombres: string
  paterno: string
  materno: string
  direccion: string
  sexo_id: number
  etnia_id: number
}

export default function CreateStudentModal() {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      await createStudent(data)
      reset()
      setOpen(false)
    } catch (error) {
      console.error('Error al crear estudiante:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Agregar estudiantes</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-card border shadow-xl">
        <DialogHeader>
          <DialogTitle>Crear Estudiante</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <Label>Nombres</Label>
            <Input {...register('nombres', { required: true })} />
            {errors.nombres && (
              <p className="text-xs text-red-300">Campo requerido</p>
            )}
          </div>

          <div className="space-y-1">
            <Label>Paterno</Label>
            <Input {...register('paterno', { required: true })} />
            {errors.paterno && (
              <p className="text-xs text-red-300">Campo requerido</p>
            )}
          </div>

          <div className="space-y-1">
            <Label>Materno</Label>
            <Input {...register('materno', { required: true })} />
            {errors.materno && (
              <p className="text-xs text-red-300">Campo requerido</p>
            )}
          </div>

          <div className="space-y-1">
            <Label>Dirección</Label>
            <Input {...register('direccion', { required: true })} />
            {errors.direccion && (
              <p className="text-xs text-red-300">Campo requerido</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Sexo id</Label>
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
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>

            <Button type="submit" disabled={loading}>
              {loading ? 'Guardando...' : 'Crear'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
