import React from 'react'

import Banner from '../components/Banner'

import PlantGrid from './PlantGrid'
import PlantCareMistakes from './PlantCareMistakes'
import BeginnerPlants from './BeginnerPlants'
import Time from './Time'
// import plantAnimtion form '../../public/Animation.json'

const Home = () => {
  return (
    <div>
       
       {/* Features Section */}

     <Banner/>
      {/* Testimonials Section */}
      
      <PlantGrid/>
      <PlantCareMistakes/>
      <BeginnerPlants/>
      <Time/>
     
      
     
      {/* Call to Action Section */}
      

    </div>
  )
}

export default Home