import axios from "axios";
import OnlineCoursePage from "./OnlineCoursePage";



export async function generateMetadata({ params }) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const slug = params.slug.replace(/[^a-zA-Z0-9 ]/g, " ");

  try {
    const response = await axios.get(`${apiBaseUrl}/meta-data/fetch-online/${slug}`,);
    console.log(response)

    const data = response.data.courseData;
    console.log(response.data);


    return {
      title: data.courseMetaTitle || "Online Course | EduPlatform",
      description:
        data.courseMetaDescription || "Explore our online courses and boost your skills.",
    };
  } catch (error) {
    return {
      title: "Online Course | EduPlatform",
      description: "Explore our online courses and boost your skills.",
    };
  }
}


export default function OnlineCourse() {
  return (
    <>
      <OnlineCoursePage />
    </>
  );
}
