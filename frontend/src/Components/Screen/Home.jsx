import React from 'react'
import HeroSection from '../Home-page/HeroSection'
import RouteCategories from '../Home-page/RouteCategories'
import Features from '../Home-page/Features'
import TopPlaces from '../Home-page/TopPlaces'
import Vehicles from '../Home-page/Vehicles'
import Testimonials from '../Home-page/Testimonials'
import Subscribe from '../Home-page/Subscribe'
import HomeSection from "../../local/HomePage.json"

export const Home = () => {
    return (
        <div className='space-y-14 sm:space-y-20 lg:space-y-28 pb-16 sm:pb-20' >
            <HeroSection HeroContent={HomeSection?.homePage?.heroSection} />
            <RouteCategories data={HomeSection?.routeCategories} />
            <Features accessibilitySection={HomeSection?.accessibilitySection || HomeSection?.premiumServices} />
            <TopPlaces data={HomeSection?.topPlacesSection} />
            <Vehicles VehiclePackages={HomeSection?.VehiclePackages} />
            <Testimonials />
            <Subscribe />
        </div>
    )
}
