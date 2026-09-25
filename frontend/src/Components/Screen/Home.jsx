import React from 'react'
import HeroSection from '../Home-page/HeroSection'
import Services from '../Home-page/Services'
import PickupProcess from '../Home-page/PickupProcess'
import Vehicles from '../Home-page/Vehicles'
import WhyChooseUs from '../Home-page/WhyChooseUs'
import Features from '../Home-page/Features'
import Testimonials from '../Home-page/Testimonials'
import HomeSection from "../../local/HomePage.json"
import Subscribe from "../Home-page/Subscribe"

export const Home = () => {


    return (
        <div className='space-y-8 sm:space-y-12 lg:space-y-20 pb-8 sm:pb-12' >
            <HeroSection HeroContent={HomeSection?.homePage?.heroSection} />
            <Services OurTourPackages={HomeSection?.homePage?.OurTourPackages} />
            <PickupProcess StepCard={HomeSection?.scheduleSection} />
            <Vehicles VehiclePackages={HomeSection?.VehiclePackages} />
            <WhyChooseUs whyChooseUs={HomeSection?.whyChooseUs} />
            <Features accessibilitySection={HomeSection?.accessibilitySection} />
            <Testimonials />
            <Subscribe />
        </div>
    )
}
