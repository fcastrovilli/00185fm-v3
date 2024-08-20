import 'server-only'

import configPromise from '@payload-config'
import type { BasePayload } from 'payload'
import { getPayloadHMR } from '@payloadcms/next/utilities'

let payload: BasePayload = await getPayloadHMR({
  config: configPromise,
})

export { payload }
