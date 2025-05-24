import React from 'react'

import HeroSlider from './HeroSlider'
import { Link } from 'react-router'
import AddPlantForm from './AddPlantForm'
import AddPlant from './AddPlant'
import Banner from '../components/Banner'

import PlantGrid from './PlantGrid'
import PlantCareMistakes from './PlantCareMistakes'
import BeginnerPlants from './BeginnerPlants'

const Home = () => {
  return (
    <div>
       
       {/* Features Section */}

     <Banner/>
      {/* Testimonials Section */}
      <PlantGrid/>
      <PlantCareMistakes/>
      <BeginnerPlants/>
     
      
     
      {/* Call to Action Section */}
      

    </div>
  )
}

export default Home