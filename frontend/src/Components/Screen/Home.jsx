import React from 'react'
import HeroSection from '../Home-page/HeroSection'
import Services from '../Home-page/Services'
import PickupProcess from '../Home-page/PickupProcess'
import Vehicles from '../Home-page/Vehicles'
import WhyChooseUs from '../Home-page/WhyChooseUs'
import Features from '../Home-page/Features'
import HomeSection from "../../local/HomePage.json"

export const Home = () => {


    return (
        <section>
            <HeroSection HeroContent={HomeSection?.homePage?.heroSection} />
            <Services OurTourPackages={HomeSection?.homePage?.OurTourPackages} />
            <PickupProcess StepCard={HomeSection?.scheduleSection} />
            <Vehicles VehiclePackages={HomeSection?.VehiclePackages} />
            <WhyChooseUs />
            <Features />
        </section>
    )
}
