export function getUserInitials(name: string, lastname: string) {
  if (!name || !lastname) {
    return null
  }

  return `${name.charAt(0).toUpperCase()}${lastname.charAt(0).toUpperCase()}`
}
