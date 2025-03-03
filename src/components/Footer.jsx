import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Footer() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const socialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <footer>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">

        {/* <div className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none bottom-0.5 -mb-[322px]" aria-hidden="true">
        <svg width="1760" height="576" viewBox="0 0 1760 518" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-02">
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g transform="translate(0 -3)" fill="url(#illustration-02)" fillRule="evenodd">
            <circle cx="1630" cy="128" r="128" />
            <circle cx="178" cy="481" r="40" />
          </g>
        </svg>
      </div> */}

        <div
          className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none"
          aria-hidden="true"
        >
          <svg
            width="1360"
            height="578"
            viewBox="0 0 1360 578"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
                id="illustration-01"
              >
                <stop stopColor="#FFF" offset="0%" />
                <stop stopColor="#EAEAEA" offset="77.402%" />
                <stop stopColor="#DFDFDF" offset="100%" />
              </linearGradient>
            </defs>
            <g fill="url(#illustration-01)" fillRule="evenodd">
              <circle cx="1200" cy="485" r="75" />
              <circle cx="155" cy="485" r="75" />
              <circle cx="325" cy="485" r="75" />
              <circle cx="1035" cy="485" r="75" />
            </g>
          </svg>
        </div>

        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={socialVariants}
          className="flex flex-col justify-center items-center my-4 py-4 md:py-8 border-y-2 border-gray-200 "
        >
          <motion.div 
            variants={itemVariants}
            className="text-sm mr-4 mb-3"
          >
            <motion.h1 
              className="bg-clip-text text-center mb-3 text-transparent bg-gradient-to-r from-blue-500 to-teal-400 text-5xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Notify
            </motion.h1>
            <p className="text-center text-black/90 p-1"> 2024 Notify. All rights reserved</p>
          </motion.div>

          <motion.ul 
            variants={socialVariants}
            className="flex justify-center items-center mb-4 md:order-1 md:ml-4 md:mb-0"
          >
            {[
              {
                name: "Twitter",
                icon: "M24 11.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H8c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z",
                link: "#"
              },
              {
                name: "Github",
                icon: "M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z",
                link: "https://github.com/Rahull004/Notify",
                target: "_blank"
              },
              {
                name: "Facebook",
                icon: "M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z",
                link: "#"
              }
            ].map((social, index) => (
              <motion.li 
                key={index}
                variants={itemVariants}
                className={index > 0 ? "ml-4" : ""}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={social.link}
                  className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out"
                  aria-label={social.name}
                  target={social.target}
                >
                  <svg
                    className="w-8 h-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d={social.icon} />
                  </svg>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
