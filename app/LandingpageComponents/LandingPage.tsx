import React from 'react'
import HeroSection from './Intro/Hero';
import ProjectIntro from './Intro/ProjectIntro';
import Services from './Intro/ServicesIntro';
import NewsIntro from './Intro/pressReleaseIntro';
import AboutUsIntro from './Intro/AboutUsIntro';
import AdvertiseSection from './Intro/AdvertiseSection';
import IndustryIntro from './Intro/IndustryIntro';

const LandingPage = () => {
    return (
        <div>
            <HeroSection />
            <ProjectIntro />
            <Services />
            <NewsIntro />
            <IndustryIntro />
            <AboutUsIntro />
            <AdvertiseSection />
        </div>
    )
}

export default LandingPage