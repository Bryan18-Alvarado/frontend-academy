'use client'

import { getStudentAvatar } from '@/helper/getStudent.helper'
import { useEffect, useState } from 'react'

const DEFAULT_AVATAR = '/beethoven.jpg'

export function useStudentAvatar(id: number) {
  const [src, setSrc] = useState(DEFAULT_AVATAR)

  useEffect(() => {
    const url = getStudentAvatar(id)

    const img = new Image()

    img.onload = () => setSrc(url)
    img.onerror = () => setSrc(DEFAULT_AVATAR)

    img.src = url
  }, [id])

  return src
}
