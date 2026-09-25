import React from 'react'
import PlacesToVisit from '../Our-Package/PlacesToVisit'
import Subscribe from '../Home-page/Subscribe'

export const Places = () => {
    return (
        <div className="space-y-10 sm:space-y-16 lg:space-y-24 pb-16 sm:pb-20 pt-4">
            <PlacesToVisit />
            <Subscribe />
        </div>
    )
}
