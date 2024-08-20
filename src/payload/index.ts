import 'server-only'

import configPromise from '@payload-config'
import type { BasePayload } from 'payload'
import { getPayloadHMR } from '@payloadcms/next/utilities'

let payload: BasePayload

const initializePayload = async (): Promise<BasePayload> => {
  if (!payload) {
    payload = await getPayloadHMR({
      config: configPromise,
    })
    console.log('Payload Initialized')
  }
  return payload
}

payload = await initializePayload()

export { payload }
