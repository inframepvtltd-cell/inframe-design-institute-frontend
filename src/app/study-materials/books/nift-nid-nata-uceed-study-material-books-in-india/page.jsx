import { BuyNowCards } from "../components/BuyNowCards";
import { FAQs } from "../components/FAQ";
import { Footer } from "../components/Footer";
import { GalleryBooksImages } from "../components/GalleryBooksImages";
import { HeaderOffer } from "../components/HederOffer";
import { HeroBanner1 } from "../components/HeroBanner1";
import { HeroBanner2 } from "../components/HeroBanner2";
import { StudyMaterialFeatures } from "../components/StudyMaterialFeatures";
import { SuccessStories } from "../components/SuccessStories";
import { WhyInFrame } from "../components/WhyInframe";
import YoutubeSection from "../components/YoutubeSection";

// /study-material/books/nift-nid-nata-uceed-study-material-books-in-india
// /study-material/notes/slugghgh

export default function Home() {
    return (
        <>
            <HeaderOffer />
            <HeroBanner1 />
            <YoutubeSection />
            <BuyNowCards />
            <WhyInFrame />
            <HeroBanner2 />
            <GalleryBooksImages />
            <StudyMaterialFeatures />
            {/* <Testimonials /> */}
            <SuccessStories />
            <FAQs />
            <Footer />
            {/* <BottomEnrollFooter /> */}
        </>
    );
}