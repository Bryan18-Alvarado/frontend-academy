'use server'
import { Estudiantes } from '@/types'
import { revalidatePath } from 'next/cache'

const URL = `${process.env.GATEWAY_URL}`

export async function getAllStudents(): Promise<Estudiantes[]> {
  const response = await fetch(`${URL}/estudiantes`, {
    cache: 'no-store'
  })

  if (!response.ok) {
    throw new Error('Error al obtener los estudiantes')
  }

  const data = await response.json()

  if (Array.isArray(data?.data)) return data.data
  console.error('error al obtener la data:', data)
  return []
}
export async function getOneStudent(id: number) {
  const response = await fetch(`${URL}/estudiantes/${id}`, {
    cache: 'no-store'
  })

  if (!response.ok) {
    throw new Error('Error al obtener estudiante')
  }

  const data = await response.json()
  return data.data
}

export async function createStudent(student: Partial<Estudiantes>) {
  const response = await fetch(`${URL}/estudiantes`, {
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(student)
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error('Error al crear estudiante')
  }

  revalidatePath('/estudiantes')

  return data
}

export async function updateStudent(id: number, student: Partial<Estudiantes>) {
  const response = await fetch(`${URL}/estudiantes/${id}`, {
    cache: 'no-store',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(student)
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error('Error al actualizar estudiante')
  }

  revalidatePath('/estudiantes')

  return data
}

export async function deleteStudent(id: number) {
  const response = await fetch(`${URL}/estudiantes/${id}`, {
    cache: 'no-store',
    method: 'DELETE'
  })

  if (!response.ok) {
    throw new Error('Error al eliminar estudiante')
  }

  revalidatePath('/estudiantes')

  return true
}
