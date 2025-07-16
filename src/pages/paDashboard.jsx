import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

function PADashboard() {
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    const getUserInfo = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUserEmail(user?.email || '')
    }

    getUserInfo()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-purple-700">PA Dashboard</h1>
      <p className="mt-2">Logged in as: {userEmail}</p>
    </div>
  )
}

export default PADashboard