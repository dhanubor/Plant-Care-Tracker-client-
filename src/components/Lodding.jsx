import React from 'react'
import animation from '../../public/Animation.json'
import Lottie from 'lottie-react'

const Lodding = () => {
  return (
    <div className='min-h-screen flex justify-center items-center'>
        <Lottie
          animationData={animation}
          loop={true}
          className='w-64 h-64'
          style={{ width: '100%', height: '100%' }}
        />

    </div>
  )
}

export default Lodding