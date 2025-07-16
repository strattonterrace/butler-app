import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      setError(signInError.message)
      return
    }

    const userEmail = signInData.session.user.email

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('email', userEmail)
      .single()

    if (userError) {
      setError('Could not fetch user role.')
      return
    }

    if (userData.role === 'pa') {
      navigate('/dashboard/pa')
    } else {
      navigate('/dashboard/user')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Log In
        </button>
      </form>
    </div>
  )
}

export default Login