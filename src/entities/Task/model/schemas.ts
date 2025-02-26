import { z } from 'zod'

import { stringRequiredSchema } from 'shared/model'

export const taskFormSchema = z.object({
  title: stringRequiredSchema
})

export type FormValues = z.infer<typeof taskFormSchema>
