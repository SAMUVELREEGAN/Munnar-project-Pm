import React from 'react'
import PageHero from '../Reuseable/PageHero'
import PackageSection from "../../local/OurPackage.json"
import Packages from '../Our-Package/Packages'
import VehiclePackages from '../Our-Package/VehiclePackages'

export const OurPackage = () => {
    return (
        <section>
            <PageHero title={PackageSection?.pageTitle} description={PackageSection?.pageDescription} />
            <Packages />
            <VehiclePackages />
        </section>
    )
}
