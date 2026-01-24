import Link from "next/link";
import { useState } from "react";
import { megaMenuData } from "../ApiData/categoryApi";
import MegaMenuContent from "./MegaMenuContent";

export default function MegaMenu({ MegaMenuOpen, setMegaMenuOpen }) {
  const [activeTab, setActiveTab] = useState("onlineCourse");

  const tabMap = {
    onlineCourse: "Online Courses",
    offlineCourse: "Offline courses",
    studyMaterial: "Study Material",
    testSeries: "Test Series",
    freeResources: "Free Resources",
  };

  let allTabs = [
    { name: "Online Course", slug: "onlineCourse" },
    { name: "Offline Course", slug: "offlineCourse" },
    { name: "Study Material", slug: "studyMaterial" },
    { name: "Test Series", slug: "testSeries" },
    { name: "Free Resources", slug: "freeResources" },
  ];

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`${
        MegaMenuOpen
          ? "translate-y-0 block opacity-100 visible"
          : "invisible -translate-y-10 opacity-0 hidden"
      } absolute duration-400 bg-[#f8f8f8] transition-all ease-in-out top-[100%] left-[170px]  shadow-2xl rounded-b-[15px] w-[900px] origin-top h-[auto] z-[100] px-5 py-5 lg:block hidden text-gray-900`}
    >
      <div className="grid grid-cols-[30%_auto] gap-5">
        <div className="border-0">
          <ul>
            {allTabs.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => setActiveTab(item.slug)}
                  className={`${activeTab === item.slug ? "bg-white shadow-lg" : "bg-transparent shadow-none"} menu-tab w-full duration-300 rounded-[10px] text-[17px] text-start px-3 py-4 `}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="h-[65vh] scrollbar overflow-y-scroll">
          <MegaMenuContent
            category={tabMap[activeTab]}
            setMegaMenuOpen={setMegaMenuOpen}
          />
        </div>
      </div>
    </div>
  );
}
