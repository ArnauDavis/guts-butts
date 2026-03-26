import { useState } from 'react'
import { supabase } from '../../utils/supabaseClient.js'

function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('testing1@test.com')
  const [password, setPassword] = useState('Testing1')

const handleLogin = async (e) => {
  e.preventDefault()
  setLoading(true)

  // 1. Always try to SIGN IN first
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (signInError) {
    // 2. If it fails because the user doesn't exist, TRY TO SIGN UP
    // Note: 'Invalid login credentials' is the error for "User not found" OR "Wrong Password"
    if (signInError.message === 'Invalid login credentials') {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (signUpError) {
        // 3. If they actually DO exist and you just got the password wrong
        if (signUpError.message.includes("already registered")) {
          alert("This email is already registered. Check your password!")
        } else {
          alert(signUpError.message)
        }
      } else {
        alert('Account created! Welcome to Gutz.')
      }
    } else {
      // Handle other errors (like rate limits or server issues)
      alert(signInError.message)
    }
  }

  setLoading(false)
}

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base-100">
      
      {/* Background Decor: Giant Blurred "GUTS" Text */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
        <h1 className="text-[20vw] font-black italic uppercase text-primary/10 blur-3xl rotate-12 leading-none">
          Gutz
        </h1>
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Floating Glass Card */}
        <div className="glass border border-white/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] rounded-[40px] p-10 backdrop-blur-3xl bg-base-100/30">
          
          <div className="mb-10">
            <h2 className="text-4xl font-black italic tracking-tighter uppercase text-primary leading-none">
              Enter <br/> 
              <span className="text-base-content">The Arena</span>
            </h2>
            <div className="h-1 w-12 bg-accent mt-4 rounded-full shadow-[0_0_10px_oklch(var(--a))]"></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            {/* Email Input */}
            <div className="relative group">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent border-b-2 border-white/10 py-3 outline-none focus:border-primary transition-all text-lg font-medium placeholder:opacity-30"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary group-focus-within:w-full transition-all duration-500"></div>
            </div>

            {/* Password Input */}
            <div className="relative group">
              <input
                type="password"
                placeholder="Create Password"
                className="w-full bg-transparent border-b-2 border-white/10 py-3 outline-none focus:border-primary transition-all text-lg font-medium placeholder:opacity-30"
                value={password}
                required
                minLength={6}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary group-focus-within:w-full transition-all duration-500"></div>
            </div>

            <button
              disabled={loading}
              className="group relative w-full h-14 bg-primary text-primary-content font-black uppercase italic tracking-widest rounded-xl overflow-hidden shadow-[0_10px_20px_-5px_rgba(var(--p),0.4)] hover:scale-[1.02] active:scale-95 transition-all"
            >
              <span className="relative z-10">
                {loading ? 'Processing...' : 'Enter Now'}
              </span>
              {/* Button Shine Effect */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            </button>
          </form>

          <div className="mt-12 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-bold opacity-30">
            <span>Secure Access</span>
            <div className="h-px flex-1 mx-4 bg-white/10"></div>
            <span>Instant Login</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth