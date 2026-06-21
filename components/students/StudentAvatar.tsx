'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useStudentAvatar } from '@/hooks/useStudentAvatar'

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
  const avatarSrc = useStudentAvatar(id)

  return (
    <Avatar className={size}>
      <AvatarImage src={avatarSrc} alt={`${nombres} ${paterno}`} />

      <AvatarFallback>
        {nombres?.[0]}
        {paterno?.[0]}
      </AvatarFallback>
    </Avatar>
  )
}
