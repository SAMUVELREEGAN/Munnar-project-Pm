import React from 'react';
import PackageSection from "../../local/OurPackage.json";
import Packages from '../Our-Package/Packages';
import VehiclePackages from '../Our-Package/VehiclePackages';
import PlacesToVisit from '../Our-Package/PlacesToVisit';
import TrustBanner from '../Our-Package/TrustBanner';
import PageHero from '../Reuseable/PageHero';

export const OurPackage = () => {
    return (
        <div className="space-y-6 lg:space-y-12 pb-12">
            <PageHero
                title={PackageSection?.pageTitle}
                description={PackageSection?.pageDescription}
            />
            <Packages />
            <VehiclePackages />
            <PlacesToVisit />
            <TrustBanner />
        </div>
    );
};
