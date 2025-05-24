import React from 'react'

import { Outlet } from 'react-router'
import Navber from '../components/Navber'
import Footer from '../components/Footer'
import Home from './Home'
import HeroSlider from './HeroSlider'
import { useNavigation } from 'react-router'
import Lodding from '../components/Lodding'

const Roots = () => {
  const {state} = useNavigation()
  return (
    <div>
        <Navber/>
       {state == "loading"? <Lodding/> : <Outlet/> }
        
        <Footer/>
    </div>
  )
}

export default Roots