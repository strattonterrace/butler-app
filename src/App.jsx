import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'




function App() {
  const [status, setStatus] = useState('⏳ Connecting to Supabase...')

  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase.from('test_table').select('*')
      if (error) {
        console.error(error)
        setStatus('❌ Supabase is connected, but no table found (expected right now)')
      } else {
        setStatus('✅ Supabase connection SUCCESS')
      }
    }

    testConnection()
  }, [])

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold text-blue-600">{status}</h1>
    </div>
  )
}

export default App