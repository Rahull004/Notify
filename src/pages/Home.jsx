import React from 'react'
import Navbar from '../components/LandingPageNavbar'
import HeroHome from '../components/HeroHome'
import FeatureHome from '../components/FeatureHome'
import FeatureBlocks from '../components/FeatureBlocks'
import Footer from '../components/Footer'
import { useUserContext } from '../AuthContext'
import { useNavigate } from 'react-router'
import { RingLoader } from 'react-spinners'

export const Home = () => {
  const { user, isLoading } = useUserContext();
  const navigate = useNavigate()

  if (user.fullname!=="" && !isLoading) {
    navigate("/allnotes");
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <RingLoader color="#0362e9" loading size={120} speedMultiplier={1} />.
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/* Site header */}
      <Navbar />
      {/*  Page content */}
      <main className="flex-grow">
        {/* Page sections */}
      <HeroHome />
      <FeatureHome />
      <FeatureBlocks />

      </main>

      {/* Site footer */}
      <Footer />

    </div>
  )
}
