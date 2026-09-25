import React from 'react';
import PackageSection from "../../local/OurPackage.json";
import Packages from '../Our-Package/Packages';
import VehiclePackages from '../Our-Package/VehiclePackages';
import PageHero from '../Reuseable/PageHero';
import Subscribe from '../Home-page/Subscribe';

export const OurPackage = () => {
    return (
        <div className="space-y-10 sm:space-y-16 lg:space-y-24 pb-16 sm:pb-20">
            <PageHero
                title={PackageSection?.pageTitle}
                description={PackageSection?.pageDescription}
            />
            <Packages />
            <VehiclePackages />
            <Subscribe />
        </div>
    );
};
