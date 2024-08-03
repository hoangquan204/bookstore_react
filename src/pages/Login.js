import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'
import { setToken } from '../config/token'
function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        console.log(username);
        console.log(password);
    })

    const handleSubmitForm = (e) => {
        e.preventDefault()

        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        }
        fetch('http://localhost:8080/auth/log-in', options)
            .then(res => res.json())
            .then((res) => {
                if (res.result) {
                    setToken(res.result.token)
                    navigate('/')
                } else {
                    alert('Username or password is incorrect!')
                }
            })
    }

    return (
        <>
            <main className="form-login">
                <form>
                    <h1 className="h3 mb-3 fw-normal">Sign in</h1>
                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingUsername"
                            placeholder="Username"
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}
                        />
                        <label htmlFor="floatingUsername">Username</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="form-check text-start my-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue="remember-me"
                            id="flexCheckDefault"
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Remember me
                        </label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit" onClick={handleSubmitForm}>
                        Sign in
                    </button>
                </form>
            </main>
        </>
    )
}

export default Login;