import React from 'react'
import PageHero from '../Reuseable/PageHero'
import Contact from '../Contact-page/Contact'
import ContactUsSection from "../../local/ContactPage.json"

export const ContactUs = () => {
    return (
        <div className="space-y-6 sm:space-y-10 pb-16 sm:pb-20">
            <PageHero
                title={ContactUsSection?.heroSection?.title}
                description={ContactUsSection?.heroSection?.description}
            />
            <Contact
                infoTitle={ContactUsSection?.contactSection?.infoTitle}
                infoText={ContactUsSection?.contactSection?.infoText}
                contacts={ContactUsSection?.contactSection?.contacts}
                socialsTitle={ContactUsSection?.contactSection?.socialsTitle}
                socials={ContactUsSection?.contactSection?.socials}
                formBadge={ContactUsSection?.contactSection?.formBadge}
                formTitle={ContactUsSection?.contactSection?.formTitle}
                formText={ContactUsSection?.contactSection?.formText}
                services={ContactUsSection?.contactSection?.services}
            />
        </div>
    )
}
