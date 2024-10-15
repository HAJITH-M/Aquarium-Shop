import React from 'react'
import SwipeCards from '../Components/Cards/SwipeCards'
import Carousel from '../Components/CarouselSection/Carousel'
import Categories from '../Components/demo'
import CategorySwipeCards from '../Components/Cards/CategorySwipeCards'
import HeroSection from '../Components/HeroSection/HeroSection'

const HomePage = () => {
  return (
    <>
    <HeroSection/>
    <SwipeCards/>
    <Carousel/>
    <CategorySwipeCards/>
    </>
  )
}

export default HomePage