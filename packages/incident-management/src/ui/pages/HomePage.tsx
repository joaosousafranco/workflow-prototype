/* eslint-disable no-console */

'use client'

import { useCallback, useState } from 'react'

type Incident = {
  name?: string
  alertLevel?: number
  country?: string
}

export const HomePage = () => {
  const [incident, setIncident] = useState<Incident>({ country: 'Portugal' })

  const onCreateIncident = useCallback(async () => {
    const response = await fetch('/api/incident?tenantId=123', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(incident),
    })

    if (response.ok) {
      console.log('Incident created')
    } else {
      console.log('Error creating incident')
    }
  }, [incident])

  const onUpdateIncident = useCallback(
    (field: string, value: string | number | undefined) => {
      setIncident((prev) => ({ ...prev, [field]: value }))
    },
    [incident],
  )

  return (
    <div>
      <h1>Incident Management</h1>
      <div>
        <input
          type="text"
          placeholder="Incident Name..."
          onChange={(e) => onUpdateIncident('name', e.target.value || undefined)}
        />
        <input
          type="number"
          placeholder="Alert level..."
          onChange={(e) => onUpdateIncident('alertLevel', e.target.value || undefined)}
        />
        <select onChange={(e) => onUpdateIncident('country', e.target.value)}>
          <option>Portugal</option>
          <option>Ireland</option>
          <option>USA</option>
        </select>
        <button onClick={onCreateIncident}>Create incident</button>
      </div>
    </div>
  )
}
