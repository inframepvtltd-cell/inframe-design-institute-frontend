'use client';
import dynamic from "next/dynamic";

import BannerSlider from "./homePageComponents/BannerSlider";

const BookaSession = dynamic(() => import('./homePageComponents/BookaSession'), { ssr: false });
const StudyMaterials = dynamic(() => import('./homePageComponents/StudyMaterials'), { ssr: false });
const AppSection = dynamic(() => import('./homePageComponents/AppSection'), { ssr: false });
const Facility = dynamic(() => import('./homePageComponents/Facility'), { ssr: false });
const TopCourses = dynamic(() => import('./homePageComponents/TopCourses'), { ssr: false });
const TrustedPlatform = dynamic(() => import('./homePageComponents/TrustedPlatform'), { ssr: false });
const Testimonials = dynamic(() => import('./homePageComponents/Testimonials'), { ssr: false });


export default function Home() {
  return (

    <div className="overflow-hidden w-full">
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
