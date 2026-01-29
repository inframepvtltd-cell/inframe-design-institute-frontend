import axios from "axios";
import StudyMaterialPage from "../StudyMaterialPage";

// export async function generateMetadata({ params }) {
//   const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
//   const slug = params.slug;

//   try {
//     const response = await axios.get(
//       `${apiBaseUrl}/meta-data/fetch-study-material/${slug}`
//     );
//     console.log('response', response)

//     const data = response.data?.status == 1 ? response.data.materialData : {};
//     return {
//       title: data?.metaTitle || "Study Materials | Inframe Design Institute",
//       description: data?.metaDescription || "Explore our study materials and boost your skills.",
//     };

//   } catch (error) {
//     console.error("Error fetching meta data:", error.message);
//     return {
//       title: "Study Materials | Inframe Design Institute",
//       description: "Explore our study materials and boost your skills.",
//     };
//   }
// }


export default function Page() {

  return (
    <StudyMaterialPage />
  )
}
