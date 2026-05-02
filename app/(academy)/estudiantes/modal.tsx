'use client'

import { createStudent } from '@/actions'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface FormData {
  nombres: string
  paterno: string
  materno: string
  direccion: string
  sexo_id: number
  etnia_id: number
}

export default function CreateStudentModal() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

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
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
      >
        + Nuevo
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in"
            onClick={() => setOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6 animate-in zoom-in-95 fade-in duration-200">
            <h2 className="text-xl font-semibold mb-4 text-black">
              Crear Estudiante
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  placeholder="Nombres"
                  {...register('nombres', { required: true })}
                  className="w-full border rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.nombres && (
                  <span className="text-xs text-red-500">Campo requerido</span>
                )}
              </div>

              <div>
                <input
                  placeholder="paterno"
                  {...register('paterno', { required: true })}
                  className="w-full border rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.paterno && (
                  <span className="text-xs text-red-500">Campo requerido</span>
                )}
              </div>

              <div>
                <input
                  placeholder="materno"
                  {...register('materno', { required: true })}
                  className="w-full border rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.materno && (
                  <span className="text-xs text-red-500">Campo requerido</span>
                )}
              </div>

              <div>
                <input
                  placeholder="Dirección"
                  {...register('direccion', { required: true })}
                  className="w-full border rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.direccion && (
                  <span className="text-xs text-red-500">Campo requerido</span>
                )}
              </div>

              <div>
                <input
                  type="number"
                  placeholder="Sexo ID"
                  {...register('sexo_id', {
                    required: true,
                    valueAsNumber: true
                  })}
                  className="w-full border rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.sexo_id && (
                  <span className="text-xs text-red-500">Campo requerido</span>
                )}
              </div>

              <div>
                <input
                  type="number"
                  placeholder="Etnia ID"
                  {...register('etnia_id', {
                    required: true,
                    valueAsNumber: true
                  })}
                  className="w-full border rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.etnia_id && (
                  <span className="text-xs text-red-500">Campo requerido</span>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 text-sm bg-red-500 border rounded-md hover:bg-red-700 transition"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-black text-white px-4 py-2 text-sm rounded-md hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading ? 'Guardando...' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
