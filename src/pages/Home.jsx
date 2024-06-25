import React from 'react'
import Navbar from '../components/Navbar'
import HeroHome from '../components/HeroHome'
import FeatureHome from '../components/FeatureHome'
import FeatureBlocks from '../components/FeatureBlocks'
import Footer from '../components/Footer'
import { useUserContext } from '../AuthContext'
import { useNavigate } from 'react-router'

export const Home = () => {
  const { user, isLoading } = useUserContext();
  const navigate = useNavigate()

  if (user) {
    navigate("/allnotes");
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
