'use client';
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

import BannerSlider from "./homePageComponents/BannerSlider";

const BookaSession = dynamic(() => import('./homePageComponents/BookaSession'), { ssr: false });
const StudyMaterials = dynamic(() => import('./homePageComponents/StudyMaterials'), { ssr: false });
const AppSection = dynamic(() => import('./homePageComponents/AppSection'), { ssr: false });
const Facility = dynamic(() => import('./homePageComponents/Facility'), { ssr: false });
const TopCourses = dynamic(() => import('./homePageComponents/TopCourses'), { ssr: false });
const TrustedPlatform = dynamic(() => import('./homePageComponents/TrustedPlatform'), { ssr: false });
const Testimonials = dynamic(() => import('./homePageComponents/Testimonials'), { ssr: false });

const fadeUpVariant = {
  hidden: { opacity: 0, },
  visible: { opacity: 1, transition: { duration: 1.5, ease: 'easeOut' } }
};

export default function Home() {
  return (
    // <div className="overflow-hidden w-full">
    //   {/* BannerSlider can stay as is */}
    //   <BannerSlider />

    //   {/* Motion Wrappers for Smooth Scroll Animation */}
    //   <motion.div
    //     variants={fadeUpVariant}
    //     initial="hidden"
    //     whileInView="visible"
    //     viewport={{ once: true, amount: 0.3 }}
    //   >
    //     <BookaSession />
    //   </motion.div>

    //   <motion.div
    //     variants={fadeUpVariant}
    //     initial="hidden"
    //     whileInView="visible"
    //     viewport={{ once: true, amount: 0.3 }}
    //   >
    //     <Facility />
    //   </motion.div>

    //   <motion.div
    //     variants={fadeUpVariant}
    //     initial="hidden"
    //     whileInView="visible"
    //     viewport={{ once: true, amount: 0.3 }}
    //   >
    //     <TopCourses />
    //   </motion.div>

    //   <motion.div
    //     variants={fadeUpVariant}
    //     initial="hidden"
    //     whileInView="visible"
    //     viewport={{ once: true, amount: 0.3 }}
    //   >
    //     <AppSection />
    //   </motion.div>

    //   <motion.div
    //     variants={fadeUpVariant}
    //     initial="hidden"
    //     whileInView="visible"
    //     viewport={{ once: true, amount: 0.3 }}
    //   >
    //     <TrustedPlatform />
    //   </motion.div>

    //   <motion.div
    //     variants={fadeUpVariant}
    //     initial="hidden"
    //     whileInView="visible"
    //     viewport={{ once: true, amount: 0.3 }}
    //   >
    //     <Testimonials />
    //   </motion.div>

    //   <motion.div
    //     variants={fadeUpVariant}
    //     initial="hidden"
    //     whileInView="visible"
    //     viewport={{ once: true, amount: 0.3 }}
    //   >
    //     <StudyMaterials />
    //   </motion.div>
    // </div>


    <div className="overflow-hidden w-full">
      {/* BannerSlider can stay as is */}
      <BannerSlider />
      <BookaSession />
      <Facility />
      <TopCourses />
      <AppSection />
      <TrustedPlatform />
      <Testimonials />
      <StudyMaterials />
    </div>
  );
}
