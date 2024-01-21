import { DependencyList, useCallback, useEffect, useState } from 'react'

export const useService = <T = Record<string, unknown>>(
  {
    service,
    staleData = false,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    service: () => Promise<any>
    staleData?: boolean
  },
  dependencies: DependencyList,
) => {
  const [error, setError] = useState<Error>()
  const [fetching, setFetching] = useState(false)
  const [data, setData] = useState<T>()

  const getData = useCallback(async () => {
    if (!staleData) {
      setData(undefined)
    }

    try {
      const serviceData = await service()
      setData(serviceData)
    } catch (err) {
      setError(err as Error)
    } finally {
      setFetching(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  if (error) {
    setError(undefined)
    throw error
  }

  return { data, fetching }
}
