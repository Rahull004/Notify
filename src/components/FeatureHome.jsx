import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ai from "/ai.jpeg";
import notes1 from "/notes1.jpeg";
import comm from "/comm.jpeg";

const tabContentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2, ease: "easeInOut" }
  }
};

function FeatureHome() {
  const [tab, setTab] = useState(1);
  const images = [notes1, ai, comm];

  return (
    <section className="relative">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <motion.h2
              className="h2 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              Explore Notify
            </motion.h2>
          </div>

          <div className="md:grid md:grid-cols-12 md:gap-6">
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6">
              {/* Tabs buttons */}
              <div className="mb-8 md:mb-0">
                {[1, 2, 3].map((tabIndex) => (
                  <motion.div
                    key={tabIndex}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 cursor-pointer ${tab !== tabIndex
                      ? "bg-white shadow-md hover:shadow-lg"
                      : "bg-gray-100 border-transparent"
                      }`}
                    onClick={() => setTab(tabIndex)}
                  >
                    {/* Tab content */}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1">
              <AnimatePresence mode='wait'>
                <motion.div
                  key={tab}
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="relative flex flex-col text-center lg:text-right"
                >
                  <img
                    className="rounded-xl shadow-xl"
                    src={images[tab - 1]}
                    alt="Feature"
                    style={{
                      margin: '160px 0px 0px 50px',
                      height: '400px',
                      objectFit: 'cover'
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureHome;