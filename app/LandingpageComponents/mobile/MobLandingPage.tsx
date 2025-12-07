import React from 'react'
import AdverTiseSectionMobile from '../Intro/Mobile/AdverTiseSectionMobile';
import MobHero from '../Intro/Mobile/MobHero';
import MobProjectIntro from '../Intro/Mobile/MobProjectIntro';
import MobServicesIntro from '../Intro/Mobile/MobServicesIntro';
import MobIndustryIntro from '../Intro/Mobile/MobIndustryIntro';
import MobAboutUsIntro from '../Intro/Mobile/MobAboutUsIntro';
import MobNewsIntro from '../Intro/Mobile/MobPressreleaseIntro';

const MobLandingPage = () => {
    return (
        <div>
            <MobHero />
            <MobProjectIntro />
            <MobServicesIntro />
            <MobNewsIntro />
            <MobIndustryIntro />
            <MobAboutUsIntro />
            <AdverTiseSectionMobile />
        </div>
    )
}

export default MobLandingPage