import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function CompanyLoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setPending(true);
    setError('');
    try {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.message);
      }
      // navigate to dashboard if you use a router
      // e.g., useNavigate()('/dashboard')
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 360 }}>
      <h3>Company Login</h3>
      <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit" disabled={pending}>{pending ? 'Logging in...' : 'Login'}</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
}
