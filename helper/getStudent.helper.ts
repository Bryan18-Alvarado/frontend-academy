export function getStudentAvatar(id: number) {
  return `${process.env.NEXT_PUBLIC_GATEWAY_URL}/estudiantes/${id}/avatar`
}
