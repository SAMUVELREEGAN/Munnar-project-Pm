import React from 'react'
import PageHero from '../Reuseable/PageHero'
import ContentSection from '../Reuseable/ContentSection'
import UseCases from '../Home-page/UseCases'
import AboutSection from "../../local/aboutPage.json"
import Subscribe from '../Home-page/Subscribe'


export const About = () => {
    return (
        <div className='space-y-6 sm:space-y-10 lg:space-y-16 pb-8 sm:pb-12'>
            <PageHero title={AboutSection?.heroSection?.title} description={AboutSection?.heroSection?.description} />
            <ContentSection
                title={AboutSection?.CompanySection?.title}
                image={AboutSection?.CompanySection?.image}
                imageAlt={AboutSection?.CompanySection?.imageAlt}
                paragraphs={AboutSection?.CompanySection?.paragraphs}
            />
            <ContentSection
                title={AboutSection?.bookingSection?.title}
                image={AboutSection?.bookingSection?.image}
                imageAlt={AboutSection?.bookingSection?.imageAlt}
                paragraphs={AboutSection?.bookingSection?.paragraphs}
                imagePosition="left"
            />
            <UseCases
                title={AboutSection?.useCasesSection?.title}
                paragraphs={AboutSection?.useCasesSection?.leftParagraphs}
                rightCards={AboutSection?.useCasesSection?.rightCards}
            />
            <Subscribe />
        </div>
    )
}
