import axios from "axios";
import FreeResClient from "./FreeResClient";

const apibaseurl = process.env.NEXT_PUBLIC_API_URL;

async function getPageMetadata() {
  try {
    const res = await axios.get(
      `${apibaseurl}/free-resources/page-content-view`,
    );
    console.log("my console", res.data);

    if (res.data.status == 1 && res.data.result) {
      return {
        title:
          res.data.result[0].metaTitle ||
          "Free Resources | Inframe Design Institute",
        description:
          res.data.result[0].metaDescription ||
          "Explore free resources for students and professionals.",
      };
    }
    return {
      title: "Free Resources | Inframe Design Institute",
      description: "Explore free resources for students and professionals.",
    };
  } catch (error) {
    console.error(error);
    return {
      title: "Free Resources | Inframe Design Institute",
      description: "Explore free resources for students and professionals.",
    };
  }
}

export default async function Page() {
  const meta = await getPageMetadata();

  return (
    <>
      <head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </head>
      <FreeResClient />
    </>
  );
}
