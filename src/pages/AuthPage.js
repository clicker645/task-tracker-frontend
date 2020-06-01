import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError } = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const authHandler = async () => {
        try {
            const data = await request('/auth/login', 'POST', {...form})
            auth.login(data.accessToken, data._id, data.role)
        } catch (e) {}
    }

    return (
        <div className="row">
           <div className="col s6 offset-s3">
               <h1>Task Tracker</h1>
               <div className="card blue darken-1">
                   <div className="card-content white-text">
                       <span className="card-title">Auth</span>
                       <div>

                           <div className="input-field">
                               <input id="email" type="email" name="email" className="yellow-input"
                                      onChange={changeHandler}
                               />
                                   <label htmlFor="email">Email</label>
                           </div>

                           <div className="input-field">
                               <input id="password" type="password" name="password" className="yellow-input"
                                      onChange={changeHandler}
                               />
                               <label htmlFor="email">Password</label>
                           </div>

                       </div>
                   </div>
                   <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            onClick={authHandler}
                            disabled={loading}
                        >
                            Login</button>
                   </div>
               </div>
           </div>
        </div>
    )
}