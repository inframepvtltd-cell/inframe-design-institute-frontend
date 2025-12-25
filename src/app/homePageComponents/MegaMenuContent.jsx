import Link from "next/link";
import { megaMenuData } from "../ApiData/categoryApi";

export default function MegaMenuContent({ category, setMegaMenuOpen }) {
  const categoryData = megaMenuData.find(
    (item) => item.parentCategory === category
  );

  if (!categoryData) return null;

  return (
    <div className="p-0">
      {categoryData.subCategory.map((sub, idx) => (
        <div key={idx} className="w-full h-auto mb-5">
          <div className="grid grid-cols-2 gap-5 w-full px-4">
            {sub.courses.map((course, courseIdx) => (
              <Link
                key={courseIdx}
                href={`/${categoryData.parentCategory
                  .toLowerCase()
                  .replace(/[^a-zA-Z0-9]/g, "-")}/${course
                    .toLowerCase()
                    .replace(/[^a-zA-Z0-9+]/g, "-")}`}
              >
                <button
                  onClick={() => setMegaMenuOpen(false)}
                  className="w-full text-left bg-white shadow-md border-[1px] hover:border-black border-gray-200 transition-all ease-in-out duration-300 cursor-pointer rounded-xl px-4 py-4 text-[15px] font-medium capitalize"
                >
                  {course}
                </button>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
