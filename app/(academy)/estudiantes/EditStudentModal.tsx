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

import { updateStudentAvatar } from '@/actions/avatar'
import StudentAvatar from '@/components/students/StudentAvatar'
import { Estudiantes } from '@/types'

interface Props {
  student: Estudiantes
  open: boolean
  setOpen: (v: boolean) => void
}

export default function EditStudentModal({ student, open, setOpen }: Props) {
  const [loading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState<File | null>(null)

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

      if (avatar) {
        await updateStudentAvatar(student.id, avatar)
      }

      setOpen(false)

      window.location.reload()
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

        <div className="flex justify-center">
          <StudentAvatar
            id={student.id}
            nombres={student.nombres}
            paterno={student.paterno}
            size="h-24 w-24"
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Avatar</Label>

            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files?.[0] ?? null)}
            />
          </div>

          <div>
            <Label>Nombres</Label>

            <Input
              {...register('nombres', {
                required: true
              })}
            />

            {errors.nombres && (
              <p className="text-xs text-red-300">Este campo es requerido</p>
            )}
          </div>

          <div>
            <Label>Paterno</Label>

            <Input
              {...register('paterno', {
                required: true
              })}
            />

            {errors.paterno && (
              <p className="text-xs text-red-300">Este campo es requerido</p>
            )}
          </div>

          <div>
            <Label>Materno</Label>

            <Input
              {...register('materno', {
                required: true
              })}
            />

            {errors.materno && (
              <p className="text-xs text-red-300">Este campo es requerido</p>
            )}
          </div>

          <div>
            <Label>Dirección</Label>

            <Input
              {...register('direccion', {
                required: true
              })}
            />

            {errors.direccion && (
              <p className="text-xs text-red-300">Este campo es requerido</p>
            )}
          </div>

          <div>
            <Label>Sexo ID</Label>

            <Input
              type="number"
              {...register('sexo_id', {
                valueAsNumber: true
              })}
            />
          </div>

          <div>
            <Label>Etnia ID</Label>

            <Input
              type="number"
              {...register('etnia_id', {
                valueAsNumber: true
              })}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
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
