import React from 'react'
import Navber from '../components/Navber'
import { Outlet } from 'react-router'

const AuthLayout = () => {
  return (
    <div>
        <section>
            <header>
                <Navber/>
            </header>
            <main>
                <Outlet/>
            </main>
        </section>
    </div>
  )
}

export default AuthLayout