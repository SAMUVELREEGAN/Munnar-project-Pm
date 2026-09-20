import React from 'react'
import PageHero from '../Reuseable/PageHero'
import PackageSection from "../../local/OurPackage.json"
import Packages from '../Our-Package/Packages'
import VehiclePackages from '../Our-Package/VehiclePackages'
import PlacesToVisit from '../Our-Package/PlacesToVisit'

export const OurPackage = () => {
    return (
        <section className='space-y-8 lg:space-y-16' >
            <PageHero title={PackageSection?.pageTitle} description={PackageSection?.pageDescription} />
            <Packages />
            <VehiclePackages />
            <PlacesToVisit />
        </section>
    )
}
