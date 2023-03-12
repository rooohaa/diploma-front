const emailRule = (value: string) => {
  return /^\S+@\S+$/.test(value) ? null : "Invalid email"
}

const passwordRule = (password: string) => {
  return password.length > 6 ? null : "Invalid password"
}

export { emailRule, passwordRule }
