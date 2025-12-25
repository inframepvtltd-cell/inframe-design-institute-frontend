"use client";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { megaMenuData } from "../ApiData/categoryApi";
import axios from "axios";
import Swal from "sweetalert2";

export default function EnquiryForm({ setEnquiryModel, enquiryModel }) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  // Form states
  const [enquiryName, setEnquiryName] = useState("");
  const [enquiryEmail, setEnquiryEmail] = useState("");
  const [enquiryPhone, setEnquiryPhone] = useState("");
  const [enquiryState, setEnquiryState] = useState("");
  const [enquiryCity, setEnquiryCity] = useState("");
  const [enquiryProgram, setEnquiryProgram] = useState("");
  const [enquiryCourse, setEnquiryCourse] = useState("");

  // Dynamic data
  const [allStates, setAllStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [courseOptions, setCourseOptions] = useState([]);
  const [citiesForSelectedState, setCitiesForSelectedState] = useState([]);


  // Fetch all states from backend
  const fetchAllStates = () => {
    axios
      .get(`${apiBaseUrl}/enquiry/state-view`)
      .then((res) => res.data)
      .then((data) => {
        setAllStates(data.enquiryStateData || []);
      })
      .catch((err) => console.error("State fetch error:", err));
  };

  // Handle state selection and fetch cities
  const handleState = (e) => {
    const selectedId = e.target.value;
    setEnquiryState(selectedId);

    axios
      .get(`${apiBaseUrl}/enquiry/view-places`)
      .then((res) => res.data)
      .then((data) => {
        // Filter all cities where city.state._id === selectedId
        const filteredCities = data.cityRes
          .filter(city => city.state._id === selectedId)
          .map(city => city.cityName);

        setCitiesForSelectedState(filteredCities);
      })
      .catch((err) => console.error("City fetch error:", err));
  };



  // Handle program -> course mapping
  const handleProgramChange = (e) => {
    const selected = e.target.value;
    setSelectedProgram(selected);
    setEnquiryProgram(selected);

    const selectedData = megaMenuData.find(
      (item) => item.parentCategory === selected
    );
    const allCourses =
      selectedData?.subCategory.flatMap((subCat) => subCat.courses) || [];
    setCourseOptions(allCourses);
  };

  // Form submission
  const enquiryAdd = (e) => {
    e.preventDefault();
    const allData = {
      enquiryName,
      enquiryEmail,
      enquiryPhone,
      enquiryState,
      enquiryCity,
      enquiryProgram,
      enquiryCourse,
    };

    axios
      .post(`${apiBaseUrl}/enquiry/add`, allData)
      .then((res) => res.data)
      .then((finalRes) => {

        try {
          if (finalRes.status == 1) {
            setEnquiryName('');
            setEnquiryEmail('');
            setEnquiryPhone('');
            setEnquiryState('');
            setEnquiryCity('');
            setEnquiryProgram('');
            setEnquiryCourse('');
            setSelectedProgram('');
            setCourseOptions([]);
            setCitiesForSelectedState([]);
            setEnquiryModel(false)
            Swal.fire({
              title: 'Enquiry Received !',
              text: "We'll get back to you soon",
              color: 'black',
              icon: 'success',
              background: 'white',
              iconColor: 'black',
              confirmButtonColor: 'black',
            })
          }
        }

        catch (error) {
          Swal.fire({
            title: 'Something went wrong !',
            text: "try again later",
            color: 'black',
            icon: 'warning',
            background: 'white',
            iconColor: 'black',
            confirmButtonColor: 'black',
          })
        }
      })

  };

  useEffect(() => {
    fetchAllStates();
  }, []);

  return (
    <form
      onSubmit={enquiryAdd}
      className={`${enquiryModel ? "right-0" : "-right-full"
        } space-y-5 lg:w-[30%] sm:w-[60%] w-[80%] h-[100vh] z-40 flex-1 fixed top-0 duration-700  py-7 px-7 text-gray-900 bg-white`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-[30px] font-[500]">Enquiry now</h2>
        <span
          onClick={() => setEnquiryModel(false)}
          className="cursor-pointer hover:bg-gray-900 hover:text-white p-[4px] rounded-[10px] text-gray-600 duration-300 text-[25px] border-2 border-gray-100 hover:border-transparent"
        >
          <IoClose />
        </span>
      </div>

      <input
        value={enquiryName}
        onChange={(e) => setEnquiryName(e.target.value)}
        required
        className="border border-gray-300 w-full rounded-[5px] px-3 lg:py-[15px] py-[10px]" 
        placeholder="Enter Your Name"
        type="text"
      />

      <input
        value={enquiryEmail}
        onChange={(e) => setEnquiryEmail(e.target.value)}
        required
        className="border border-gray-300 w-full rounded-[5px] px-3 lg:py-[15px] py-[10px]" 
        placeholder="Enter Your Email"
        type="email"
      />

      <input
        value={enquiryPhone}
        onChange={(e) => setEnquiryPhone(e.target.value)}
        required
        className="border border-gray-300 w-full rounded-[5px] px-3 lg:py-[15px] py-[10px]" 
        placeholder="Enter Your Phone Number"
        type="number"
      />

      {/* State Dropdown */}
      <select
        value={enquiryState}
        onChange={handleState}
        required
        className="border border-gray-300 w-full rounded-[5px] px-3 lg:py-[15px] py-[10px]  text-gray-500"
      >
        <option value="">Select your state</option>
        {allStates.map((item, index) => (
          <option onClick={() => setSelectedState(item._id)} key={index} value={item._id}>
            {item.stateName}
          </option>
        ))}
      </select>

      {/* City Dropdown */}
      <select
        value={enquiryCity}
        onChange={(e) => setEnquiryCity(e.target.value)}
        required
        disabled={citiesForSelectedState.length === 0}
        className="border border-gray-300 w-full rounded-[5px] px-3 lg:py-[15px] py-[10px]  text-gray-500"
      >
        <option value=""> {selectedState ? "Select City" : "Select State first"}</option>
        {citiesForSelectedState.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>


      {/* Program Dropdown */}
      <select
        onChange={handleProgramChange}
        value={selectedProgram}
        required
        className="border border-gray-300 w-full rounded-[5px] px-3 lg:py-[15px] py-[10px]  text-gray-500"
      >
        <option value="">Select Program</option>
        {megaMenuData.map((item, index) => (
          <option key={index} value={item.parentCategory}>
            {item.parentCategory}
          </option>
        ))}
      </select>

      {/* Course Dropdown */}
      <select
        value={enquiryCourse}
        onChange={(e) => setEnquiryCourse(e.target.value)}
        disabled={!selectedProgram}
        required
        className="border border-gray-300 w-full rounded-[5px] px-3 lg:py-[15px] py-[10px]  text-gray-500"
      >
        <option value="">
          {selectedProgram ? "Select Course" : "Select Program first"}
        </option>
        {courseOptions.map((course, index) => (
          <option key={index} value={course}>
            {course}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full rounded-[5px] font-semibold py-3 text-white bg-gray-900 hover:bg-white hover:text-gray-900 border-2 hover:border-gray-900"
      >
        Enquiry Now
      </button>
    </form>
  );
}
