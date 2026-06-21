export function getStudentAvatar(id: number, ts?: number) {
  return `${process.env.NEXT_PUBLIC_GATEWAY_URL}/estudiantes/${id}/avatar?ts=${ts ?? Date.now()}`
}
