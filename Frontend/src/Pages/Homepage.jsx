import React from 'react'
import HeroSection from '../Components/Herosection'
import HowItWorksSection from '../Components/HowItsWorkSection'
import WhyWiShareSection from '../Components/FeatureSection'
import {Helmet} from 'react-helmet-async'
export const Homepage = () => {
  return (
    <>
    <Helmet>
        <title>Home</title>
        <meta name="description" content="WiShare allows you to share files instantly on your local network without the need for internet. Experience fast, secure, and private file sharing with WiShare." />
      </Helmet>
      <HeroSection />
      <section id="features">
        <WhyWiShareSection />
      </section>
      <section id="how-it-works">
        <HowItWorksSection />
      </section>
    </>
  )
}