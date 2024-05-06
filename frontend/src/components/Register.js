import React, { useState } from 'react';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Add more state variables as needed for additional form fields

    function handleRegister(event) {
        event.preventDefault();
        const data = { email, password };

        fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Registration Success:', data);
            // Handle actions post-registration like redirection or display success message
        })
        .catch(error => {
            console.error('Registration Error:', error);
        });
    }

    return (
        <form onSubmit={handleRegister}>
            <h2>Register</h2>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
