
import { z } from 'zod'

export function validate(schema, data) {
  try {
    schema.parse(data)
  } catch (error) {
    throw new Error(error.errors.map(e => e.message).join(', '))
  }
}
