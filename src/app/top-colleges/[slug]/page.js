"use client";
import { AllCollegesData } from "@/app/ApiData/CollegeApi";
import { useParams } from "next/navigation";

export default function TopColleges() {
  let slug = useParams().slug;
  const title = useParams().slug.replaceAll("-", " ");

  const specificCategoryData = AllCollegesData.filter(
    (item) => item.category === slug
  )[0];
  console.log(specificCategoryData);

  return (
    <>
      <h3 className="px-6 bg-white text-gray-900 lg:text-[35px] text-[25px]  border-b-6 border-white font-bold capitalize py-5 relative z-40">
        top colleges of {title}
      </h3>

      {specificCategoryData?.collegeData.map((item, index) => {
        return (
          <div key={index}>
            <div
              style={{ backgroundImage: `url(${item.collegeImage})` }}
              className="w-full h-[60vh] bg-cover bg-center bg-fixed relative "
            >
              {/* <div className="w-[100%] h-[100%] absolute top-0 left-0 bg-[rgba(0,0,0,0.3)]"></div> */}
              <div className="bg-white text-black px-5 lg:text-[35px]  text-[22px] font-bold absolute bottom-24 py-[15px] z-40">
                {" "}
                {item.collegeName}
              </div>
            </div>
            <div className="max-w-[1320px] my-[40px] mx-auto  lg:px-6 px-3 lg:p-0 p-3">
              <p className="text-[18px] ">{item.collegesDescription}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}
