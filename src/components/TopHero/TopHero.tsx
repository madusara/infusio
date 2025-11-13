import React from 'react'
import Image from 'next/image';

const TopHero = () => {
  return (
    <div className="relative w-full" style={{ height: 'calc(100vh - 180px)' }}>
        <Image 
          src="/assets/images/chai-banner-1.jpg" 
          alt="Top Hero" 
          fill
          className="object-cover"
        />
    </div>
  )
}

export default TopHero