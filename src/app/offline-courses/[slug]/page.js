import axios from "axios";
import OfflineCoursePage from "./OfflineCoursePage";



export async function generateMetadata({ params }) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const slug = params.slug.replace(/[^a-zA-Z0-9 ]/g, " ");

  try {
    const response = await axios.get(`${apiBaseUrl}/meta-data/fetch-offline/${slug}`,);
    const data = response.data.courseData;
    console.log(response.data);


    return {
      title: data.courseMetaTitle || "Offline Course | EduPlatform",
      description:
        data.courseMetaDescription || "Explore our offline courses and boost your skills.",
    };
  } catch (error) {
    return {
      title: "Offline Course | EduPlatform",
      description: "Explore our offline courses and boost your skills.",
    };
  }
}

export default function OfflineCourse() {
  return (
    <>
      <OfflineCoursePage />
    </>
  );
}
