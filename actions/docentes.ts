'use server'

import { Docentes } from '@/types'

const DOCENTES_URL = `${process.env.GATEWAY_URL}`

export async function getAllDocentes(): Promise<Docentes[]> {
  const response = await fetch(`${DOCENTES_URL}/docentes`, {
    cache: 'no-store'
  })

  if (!response.ok) {
    throw new Error('Error al obtener los docentes')
  }

  const data = await response.json()

  if (Array.isArray(data?.data)) return data.data
  console.error('error al obtener la data:', data)
  return []
}

export async function getOneDocente(id: number) {
  const response = await fetch(`${DOCENTES_URL}/docentes/${id}`, {
    cache: 'no-store'
  })

  if (!response.ok) {
    throw new Error('Error al obtener docente')
  }

  const data = await response.json()
  return data.data
}

export async function createDocente(docente: Partial<Docentes>) {
  const response = await fetch(`${DOCENTES_URL}/docentes`, {
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(docente)
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error('Error al crear docente')
  }

  return data
}

export async function updateDocente(id: number, docente: Partial<Docentes>) {
  const response = await fetch(`${DOCENTES_URL}/docentes/${id}`, {
    cache: 'no-store',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(docente)
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error('Error al actualizar docente')
  }
  return data
}

export async function deleteDocente(id: number) {
  const response = await fetch(`${DOCENTES_URL}/docentes/${id}`, {
    cache: 'no-store',
    method: 'DELETE'
  })

  if (!response.ok) {
    throw new Error('Error al eliminar docente')
  }

  return true
}
