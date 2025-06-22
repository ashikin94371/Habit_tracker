import { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) setMessage('✅ Registration successful!');
      else setMessage(`❌ ${data.message || 'Error'}`);
    } catch (err) {
      setMessage('❌ Network error');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required /><br />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required /><br />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
}