import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {ItemsListPage} from "./pages/ItemsListPage";
import {AdminPage} from "./pages/AdminPage";
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/admin" exact>
                    <AdminPage />
                </Route>
                <Route path="/items" exact>
                    <ItemsListPage />
                </Route>
                <Redirect to="/items" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/login" exact>
                <AuthPage />
            </Route>
            <Redirect to="/login" />
        </Switch>
    )
}