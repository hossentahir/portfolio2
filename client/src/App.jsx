import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [healthStatus, setHealthStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const checkHealth = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('http://localhost:5000/api/health')
      if (!res.ok) throw new Error(`HTTP error status: ${res.status}`)
      const data = await res.json()
      setHealthStatus(data)
    } catch (err) {
      setError(err.message || 'Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} style={{ height: '5em', padding: '0.5em', transition: 'filter 300ms' }} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} style={{ height: '5em', padding: '0.5em', transition: 'filter 300ms' }} alt="React logo" />
        </a>
      </div>

      <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>MERN Stack Starter</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        React Client (Vite) + Express &amp; MongoDB Server
      </p>

      <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', background: '#f8fafc', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Backend Connection Status</h2>
        <button
          onClick={checkHealth}
          disabled={loading}
          style={{
            padding: '0.6rem 1.2rem',
            fontSize: '1rem',
            fontWeight: 600,
            color: '#fff',
            backgroundColor: '#3b82f6',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          {loading ? 'Checking backend...' : 'Test /api/health Endpoint'}
        </button>

        {healthStatus && (
          <div style={{ marginTop: '1.5rem', textAlign: 'left', background: '#1e293b', color: '#38bdf8', padding: '1rem', borderRadius: '8px', overflowX: 'auto' }}>
            <pre style={{ margin: 0 }}>{JSON.stringify(healthStatus, null, 2)}</pre>
          </div>
        )}

        {error && (
          <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#fef2f2', color: '#991b1b', borderRadius: '6px', border: '1px solid #fecaca' }}>
            ⚠️ {error} (Ensure Express server is running on port 5000)
          </div>
        )}
      </div>
    </div>
  )
}

export default App

