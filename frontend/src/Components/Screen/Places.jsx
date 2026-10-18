import React from 'react'
import PlacesToVisit from '../Our-Package/PlacesToVisit'
import PageHero from '../Reuseable/PageHero'
import Subscribe from '../Home-page/Subscribe'
import SEO from '../SEO/SEO'
import { SEO_CONFIG } from '../../utils/seoConfig'

export const Places = () => {
    return (
        <>
            <SEO
                title={SEO_CONFIG.places.title}
                description={SEO_CONFIG.places.description}
                canonicalUrl={SEO_CONFIG.places.canonicalUrl}
                schema={SEO_CONFIG.places.schema}
            />
            <div className="space-y-10 sm:space-y-16 lg:space-y-24 pb-16 sm:pb-20">
                <PageHero
                    title="Top Places to Visit in Munnar"
                    description="Explore the most scenic tourist attractions, sprawling tea plantations, national parks, and waterfalls in Munnar with our comfortable sightseeing cabs."
                />
                <PlacesToVisit />
                <Subscribe />
            </div>
        </>
    )
}
