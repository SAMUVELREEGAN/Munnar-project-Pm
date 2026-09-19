import React from 'react'
import PageHero from '../Reuseable/PageHero'
import ContentSection from '../Reuseable/ContentSection'
import UseCases from '../Home-page/UseCases'
import AboutSection from "../../local/aboutPage.json"


export const About = () => {

    return (
        <section>
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

            />
            <UseCases
                title={AboutSection?.useCasesSection?.title}
                paragraphs={AboutSection?.useCasesSection?.leftParagraphs}
                rightCards={AboutSection?.useCasesSection?.rightCards}
            />
        </section>
    )
}
