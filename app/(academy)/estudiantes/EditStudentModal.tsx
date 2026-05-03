'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { updateStudent } from '@/actions'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Estudiantes } from '@/types'

interface Props {
  student: Estudiantes
  open: boolean
  setOpen: (v: boolean) => void
}

export default function EditStudentModal({ student, open, setOpen }: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Estudiantes>()

  useEffect(() => {
    reset(student)
  }, [student, reset])

  const onSubmit = async (data: Estudiantes) => {
    try {
      setLoading(true)
      await updateStudent(student.id, data)

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
      <DialogContent className="sm:max-w-md bg-card border shadow-xl">
        <DialogHeader>
          <DialogTitle>Editar estudiante</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Nombres</Label>
            <Input {...register('nombres', { required: true })} />
            {errors.nombres && (
              <p className="text-xs text-red-300">Este campo es requerido</p>
            )}
          </div>

          <div>
            <Label>Paterno</Label>
            <Input {...register('paterno', { required: true })} />
            {errors.paterno && (
              <p className="text-xs text-red-300">Este campo es requerido</p>
            )}
          </div>

          <div>
            <Label>Materno</Label>
            <Input {...register('materno', { required: true })} />
            {errors.materno && (
              <p className="text-xs text-red-300">Este campo es requerido</p>
            )}
          </div>

          <div>
            <Label>Dirección</Label>
            <Input {...register('direccion', { required: true })} />
            {errors.direccion && (
              <p className="text-xs text-red-300">Este campo es requerido</p>
            )}
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
