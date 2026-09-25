import React from 'react';
import PackageSection from "../../local/OurPackage.json";
import Packages from '../Our-Package/Packages';
import VehiclePackages from '../Our-Package/VehiclePackages';
import PlacesToVisit from '../Our-Package/PlacesToVisit';
import TrustBanner from '../Our-Package/TrustBanner';
import PageHero from '../Reuseable/PageHero';
import Subscribe from '../Home-page/Subscribe';

export const OurPackage = () => {
    return (
        <div className="space-y-6 sm:space-y-10 lg:space-y-16 pb-8 sm:pb-12">
            <PageHero
                title={PackageSection?.pageTitle}
                description={PackageSection?.pageDescription}
            />
            <Packages />
            <VehiclePackages />
            <PlacesToVisit />
            <TrustBanner />
            <Subscribe />
        </div>
    );
};
