import React from 'react'
import PageHero from '../Reuseable/PageHero'
import ContentSection from '../Reuseable/ContentSection'
import UseCases from '../Home-page/UseCases'
import AboutSection from "../../local/aboutPage.json"
import Subscribe from '../Home-page/Subscribe'

export const About = () => {
    return (
        <div className='space-y-10 sm:space-y-16 lg:space-y-24 pb-16 sm:pb-20'>
            <PageHero title={AboutSection?.heroSection?.title} description={AboutSection?.heroSection?.description} />
            <ContentSection
                title={AboutSection?.CompanySection?.title}
                image={AboutSection?.CompanySection?.image}
                imageAlt={AboutSection?.CompanySection?.imageAlt}
                paragraphs={AboutSection?.CompanySection?.paragraphs}
            />
            <UseCases
                title={AboutSection?.useCasesSection?.title}
                paragraphs={AboutSection?.useCasesSection?.leftParagraphs}
                rightCards={AboutSection?.useCasesSection?.rightCards}
            />
            <ContentSection
                title={AboutSection?.bookingSection?.title}
                image={AboutSection?.bookingSection?.image}
                imageAlt={AboutSection?.bookingSection?.imageAlt}
                paragraphs={AboutSection?.bookingSection?.paragraphs}
                imagePosition="left"
            />
            <ContentSection
                title={AboutSection?.visionSection?.title}
                image={AboutSection?.visionSection?.image}
                imageAlt={AboutSection?.visionSection?.imageAlt}
                paragraphs={AboutSection?.visionSection?.paragraphs}
            />
            <Subscribe />
        </div>
    )
}
