import {createContext} from 'react'

export const RoleAdmin = 'admin'
export const RoleUser = 'user'

function noop() {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    role: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
})

