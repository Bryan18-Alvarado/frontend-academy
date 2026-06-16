'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getStudentAvatar } from '@/helper/getStudent.helper'

interface Props {
  id: number
  nombres: string
  paterno: string
  size?: string
}

export default function StudentAvatar({
  id,
  nombres,
  paterno,
  size = 'h-20 w-20'
}: Props) {
  return (
    <Avatar className={size}>
      <AvatarImage src={getStudentAvatar(id)} alt={`${nombres} ${paterno}`} />

      <AvatarFallback>
        {nombres[0]}
        {paterno[0]}
      </AvatarFallback>
    </Avatar>
  )
}
