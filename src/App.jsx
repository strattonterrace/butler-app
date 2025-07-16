import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

import Login from './pages/login'
import UserDashboard from './pages/userDashboard'
import PaDashboard from './pages/paDashboard'

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <Router>
      <Routes>
        {!session ? (
          <Route path="*" element={<Login />} />
        ) : (
          <>
            <Route path="/" element={<Navigate to="/dashboard/user" />} />
            <Route path="/dashboard/user" element={<UserDashboard />} />
            <Route path="/dashboard/pa" element={<paDashboard />} />
          </>
        )}
      </Routes>
    </Router>
  )
}

export default App