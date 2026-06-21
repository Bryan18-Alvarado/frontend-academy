'use server'

import { revalidatePath } from 'next/cache'

const URL = process.env.GATEWAY_URL

export async function createStudentAvatar(studentId: number, file: File) {
  const formData = new FormData()

  formData.append('model_id', String(studentId))
  formData.append('file', file)

  const response = await fetch(`${URL}/files`, {
    method: 'POST',
    body: formData
  })

  if (!response.ok) {
    throw new Error('Error al crear avatar')
  }

  revalidatePath('/estudiantes')

  return response.json()
}

export async function updateStudentAvatar(studentId: number, file: File) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${URL}/estudiantes/${studentId}/avatar`, {
    method: 'PUT',
    body: formData
  })

  const text = await response.text()

  if (!response.ok) {
    throw new Error(text)
  }

  revalidatePath('/estudiantes')

  return JSON.parse(text)
}

export async function deleteStudentAvatar(studentId: number) {
  const response = await fetch(`${URL}/files/${studentId}/avatar`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    throw new Error('Error al eliminar avatar')
  }

  revalidatePath('/estudiantes')

  return response.json()
}
