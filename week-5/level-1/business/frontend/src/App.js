import React from 'react'
import Business from './Business';

const App = () => {
  return (
    <div className=''>
      <Business 
        name="Sathyam"
        description="Hello I'm Sathyam."
        interests={["Coding", "Playing", "Swimming"]}
        socials={['Twitter', 'Instagram']}
      />
    </div>
  )
}

export default App; 