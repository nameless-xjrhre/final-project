import { useEffect, useState } from 'react'
import * as React from 'react'
import { Client, createClient, Provider as UrqlProvider } from 'urql'

export function UrqlClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [client, setClient] = useState<Client | null>(null)

  useEffect(() => {
    const setupUrql = async () => {
      setClient(
        createClient({
          url: 'http://localhost:4000/graphql',
          requestPolicy: 'cache-first',
        }),
      )
    }
    setupUrql()
  }, [])

  return client ? <UrqlProvider value={client}>{children}</UrqlProvider> : null
}
