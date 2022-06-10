import { useEffect, useState } from 'react'
import * as React from 'react'
import { Client, createClient, Provider } from 'urql'

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

  return client ? <Provider value={client}>{children}</Provider> : null
}

export function UrqlProvider({ children }: { children: React.ReactNode }) {
  return <UrqlClientProvider>{children}</UrqlClientProvider>
}
