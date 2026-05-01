'use server'
import { Estudiantes } from '@/types'

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

export async function deleteStudent(id: number): Promise<Estudiantes> {
  const response = await fetch(`${URL}/estudiantes/${id}`, {
    method: 'DELETE'
  })

  return response.json()
}
