import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/LandingPageNavbar'
import HeroHome from '../components/HeroHome'
import FeatureHome from '../components/FeatureHome'
import FeatureBlocks from '../components/FeatureBlocks'
import Footer from '../components/Footer'
import { useUserContext } from '../AuthContext'
import { useNavigate } from 'react-router'
import { RingLoader } from 'react-spinners'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 }
  },
  exit: {
    opacity: 0,
    transition: { ease: 'easeInOut' }
  }
}

export const Home = () => {
  const { user, isLoading } = useUserContext();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <RingLoader color="#0362e9" loading size={120} speedMultiplier={1} />
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col min-h-screen overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Navbar user={user} />
      <main className="flex-grow">
        <HeroHome />
        <FeatureHome />
        <FeatureBlocks />
      </main>
      <Footer />
    </motion.div>
  )
}