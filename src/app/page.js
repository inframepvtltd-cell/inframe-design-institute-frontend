'use client';
// import BannerSlider from "./homePageComponents/BannerSlider";
import Facility from "./homePageComponents/Facility";
// import BookaSession from "./homePageComponents/BookaSession";
import TopCourses from "./homePageComponents/TopCourses";
import Testimonials from "./homePageComponents/Testimonials";
import AppSection from "./homePageComponents/AppSection";
import TrustedPlatform from "./homePageComponents/TrustedPlatform";
import StudyMaterials from "./homePageComponents/StudyMaterials";
import dynamic from "next/dynamic";
const BannerSlider = dynamic(() => import('./homePageComponents/BannerSlider'), { ssr: false });

const BookaSession = dynamic(() => import('./homePageComponents/BookaSession'), { ssr: false });

export default function Home() {

  return (
    <div className="overflow-hidden w-full">
      <BannerSlider />
      <BookaSession />
      <Facility />
      <TopCourses />
      <AppSection />
      <TrustedPlatform />
      {/* <Testimonials /> */}
      <StudyMaterials />
    </div>
  );
}
