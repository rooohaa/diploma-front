const emailRule = (value: string) => {
  return /^\S+@\S+$/.test(value) ? null : "Invalid email"
}

const passwordRule = (password: string) => {
  return password.length > 6 ? null : "Invalid password"
}

const requiredRule = (value: string) => {
  return value.trim() !== "" ? null : "Required field"
}

const dateRule = (value: Date | string | null) => {
  return value ? null : "Required field"
}

export { emailRule, passwordRule, requiredRule, dateRule }
