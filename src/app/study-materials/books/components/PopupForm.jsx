
"use client";

import { useState, useEffect, useRef } from "react";
const STATE_CITY_MAP = {
  "Andhra Pradesh": [
    "Visakhapatnam", "Vijayawada", "Guntur", "Nellore",
    "Kurnool", "Rajahmundry", "Tirupati", "Kadapa"
  ],

  "Arunachal Pradesh": [
    "Itanagar", "Naharlagun", "Pasighat", "Tawang"
  ],

  "Assam": [
    "Guwahati", "Dibrugarh", "Silchar", "Jorhat",
    "Tezpur", "Nagaon"
  ],

  "Bihar": [
    "Patna", "Gaya", "Bhagalpur", "Muzaffarpur",
    "Darbhanga", "Purnia"
  ],

  "Chhattisgarh": [
    "Raipur", "Bhilai", "Durg", "Bilaspur",
    "Korba", "Raigarh"
  ],

  "Goa": [
    "Panaji", "Margao", "Vasco da Gama", "Mapusa"
  ],

  "Gujarat": [
    "Ahmedabad", "Surat", "Vadodara", "Rajkot",
    "Bhavnagar", "Jamnagar"
  ],

  "Haryana": [
    "Gurgaon", "Faridabad", "Panipat", "Ambala",
    "Hisar", "Karnal"
  ],

  "Himachal Pradesh": [
    "Shimla", "Solan", "Dharamshala", "Mandi",
    "Kullu", "Una"
  ],

  "Jharkhand": [
    "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro",
    "Hazaribagh"
  ],

  "Karnataka": [
    "Bengaluru", "Mysuru", "Mangaluru", "Hubballi",
    "Belagavi", "Shivamogga", "Davangere"
  ],

  "Kerala": [
    "Thiruvananthapuram", "Kochi", "Kozhikode",
    "Thrissur", "Kannur", "Alappuzha"
  ],

  "Madhya Pradesh": [
    "Bhopal", "Indore", "Jabalpur", "Gwalior",
    "Ujjain", "Sagar"
  ],

  "Maharashtra": [
    "Mumbai", "Pune", "Nagpur", "Nashik",
    "Thane", "Aurangabad", "Kolhapur", "Solapur"
  ],

  "Manipur": [
    "Imphal", "Thoubal", "Churachandpur"
  ],

  "Meghalaya": [
    "Shillong", "Tura", "Jowai"
  ],

  "Mizoram": [
    "Aizawl", "Lunglei", "Champhai"
  ],

  "Nagaland": [
    "Kohima", "Dimapur", "Mokokchung"
  ],

  "Odisha": [
    "Bhubaneswar", "Cuttack", "Rourkela",
    "Sambalpur", "Balasore"
  ],

  "Punjab": [
    "Chandigarh", "Ludhiana", "Amritsar",
    "Jalandhar", "Patiala", "Bathinda"
  ],

  "Rajasthan": [
    "Jaipur", "Jodhpur", "Udaipur", "Ajmer",
    "Bikaner", "Kota", "Alwar"
  ],

  "Sikkim": [
    "Gangtok", "Namchi", "Gyalshing"
  ],

  "Tamil Nadu": [
    "Chennai", "Coimbatore", "Madurai",
    "Tiruchirappalli", "Salem", "Erode",
    "Tirunelveli"
  ],

  "Telangana": [
    "Hyderabad", "Warangal", "Karimnagar",
    "Nizamabad", "Khammam", "Mahbubnagar"
  ],

  "Tripura": [
    "Agartala", "Udaipur", "Dharmanagar"
  ],

  "Uttar Pradesh": [
    "Lucknow", "Kanpur", "Noida", "Ghaziabad",
    "Agra", "Meerut", "Varanasi", "Prayagraj",
    "Bareilly", "Aligarh"
  ],

  "Uttarakhand": [
    "Dehradun", "Haridwar", "Roorkee",
    "Haldwani", "Rudrapur"
  ],

  "West Bengal": [
    "Kolkata", "Howrah", "Durgapur",
    "Asansol", "Siliguri", "Malda"
  ],

  /* ----------- UNION TERRITORIES ----------- */

  "Andaman and Nicobar Islands": [
    "Port Blair"
  ],

  "Chandigarh": [
    "Chandigarh"
  ],

  "Dadra and Nagar Haveli and Daman and Diu": [
    "Daman", "Silvassa"
  ],

  "Delhi": [
    "New Delhi", "Delhi", "Dwarka", "Rohini",
    "Saket", "Karol Bagh"
  ],

  "Jammu and Kashmir": [
    "Srinagar", "Jammu", "Anantnag", "Baramulla"
  ],

  "Ladakh": [
    "Leh", "Kargil"
  ],

  "Lakshadweep": [
    "Kavaratti"
  ],

  "Puducherry": [
    "Puducherry", "Karaikal", "Mahe", "Yanam"
  ]
};

const courses = [
  "Study Material Combo NIFT NID UCEED UG Bundle",
  "Study Material Combo NATA JEE UG Bundle",
  "Study Material Combo NIFT NID UCEED PG Bundle",
  "Study Material GATE PG Bundle",
];

const coursePrice = 3500;

// Error Message Component
const ErrorMsg = ({ msg }) =>
  msg && <p className="text-red-500 text-xs mt-1">{msg}</p>;

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  disabled,
}) => (
  <div>
    <label className="block text-xs xs:text-sm font-semibold mb-1">
      {label} *
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-lg p-2 xs:p-3 text-xs xs:text-sm focus:ring-2 ${
        error ? "focus:ring-red-500" : "focus:ring-blue-500"
      } outline-none transition-colors ${
        disabled ? "bg-gray-50 cursor-not-allowed" : ""
      }`}
    />
    <ErrorMsg msg={error} />
  </div>
);

// Custom Dropdown Component for Courses
const CustomDropdown = ({
  label,
  value,
  onChange,
  options,
  error,
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange({ target: { name: "course", value: option } });
    setIsOpen(false);
  };

  const selectedLabel = value || placeholder;

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-xs xs:text-sm font-semibold mb-1">
        {label} *
      </label>

      {/* Dropdown Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-lg p-2 xs:p-3 text-xs xs:text-sm text-left flex justify-between items-center bg-white focus:ring-2 ${
          error ? "focus:ring-red-500" : "focus:ring-blue-500"
        } outline-none transition-colors hover:border-gray-400 ${
          value ? "text-gray-900" : "text-gray-500"
        }`}
      >
        <span className="truncate pr-2">{selectedLabel}</span>
        <svg
          className={`w-3 h-3 xs:w-4 xs:h-4 text-gray-500 transition-transform shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 xs:max-h-56 sm:max-h-60 overflow-y-auto text-xs xs:text-sm">
          {options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelect(option)}
              className={`w-full text-left p-2 xs:p-3 hover:bg-gray-50 transition-colors ${
                value === option ? "bg-blue-50 text-blue-600" : "text-gray-900"
              } ${
                index !== options.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      <ErrorMsg msg={error} />
    </div>
  );
};

// Fixed Custom Select Component for State/City
const CustomSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  disabled = false,
  placeholder = "Select an option",
}) => (
  <div>
    <label className="block text-xs xs:text-sm font-semibold mb-1">
      {label} *
    </label>
    <select
      name={name} // Fixed: Added name attribute
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-lg p-2 xs:p-3 text-xs xs:text-sm focus:ring-2 ${
        error ? "focus:ring-red-500" : "focus:ring-blue-500"
      } outline-none transition-colors ${
        disabled ? "bg-gray-50 text-gray-500 cursor-not-allowed" : "bg-white"
      }`}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    <ErrorMsg msg={error} />
  </div>
);

// ==== Main Component ====
export default function EnrollmentPopup({ open, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    state: "",
    city: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const modalRef = useRef(null);

  // Get cities based on selected state
  const cityOptions = formData.state ? STATE_CITY_MAP[formData.state] : [];

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      if (modalRef.current) {
        const modal = modalRef.current;
        const rect = modal.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (rect.height > viewportHeight * 0.9) {
          modal.style.marginTop = "5vh";
          modal.style.marginBottom = "5vh";
        }
      }
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const validate = () => {
    const e = {};

    if (!formData.name.trim() || formData.name.trim().length < 2)
      e.name = "Enter valid full name";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Enter valid email";

    if (!/^[6-9]\d{9}$/.test(formData.phone))
      e.phone = "Enter valid 10-digit number";

    if (!formData.course) e.course = "Select course";

    if (!formData.state) e.state = "Select state";

    if (!formData.city) e.city = "Select city";

    return e;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    // 🔹 Name → no leading spaces, no double spaces
    if (name === "name") {
      value = value.replace(/\s+/g, " ");
      value = value.replace(/^\s/, "");
    }

    // 🔹 Email → no spaces at all
    if (name === "email") {
      value = value.replace(/\s/g, "");
    }

    // 🔹 Phone → only digits, max 10
    if (name === "phone") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }

    // 🔹 If state changes, clear city
    if (name === "state") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        city: "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length) return setErrors(err);

    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setDone(true);

    setTimeout(() => {
      setDone(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        course: "",
        state: "",
        city: "",
      });
      setErrors({});
      onClose();
    }, 2000);

    setLoading(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-start xs:items-center justify-center z-9999 p-2 xs:p-3 sm:p-4 md:p-6 overflow-y-auto"
      onClick={handleOverlayClick}
      style={{ backdropFilter: "blur(4px)" }}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg xs:rounded-xl sm:rounded-xl md:rounded-xl w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-md relative my-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-2 xs:top-3 sm:top-4 right-2 xs:right-3 sm:right-4 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xl xs:text-2xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full z-10 transition-colors cursor-pointer"
        >
          ×
        </button>

        <div className="p-4 xs:p-5 sm:p-6">
          {done ? (
            <div className="text-center py-6 xs:py-8">
              <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 xs:mb-4">
                <svg
                  className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h2 className="text-lg xs:text-xl sm:text-xl font-bold text-green-600 mb-2">
                Enrollment Successful
              </h2>
              <p className="text-gray-600 text-sm xs:text-base">
                We'll contact you shortly!
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-lg xs:text-xl sm:text-2xl font-bold mb-4 xs:mb-5 sm:mb-6 text-center text-gray-800">
                Enrollment Form
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-5">
                <InputField
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="Enter your full name"
                  disabled={loading}
                />

                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="Enter your email"
                  disabled={loading}
                />

                <InputField
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  placeholder="Enter 10-digit phone number"
                  disabled={loading}
                />

                <CustomDropdown
                  label="Select Course"
                  value={formData.course}
                  onChange={handleChange}
                  options={courses}
                  error={errors.course}
                  placeholder="Choose course"
                />

                <CustomSelect
                  label="State"
                  name="state" // Fixed: Added name prop
                  value={formData.state}
                  onChange={handleChange}
                  options={Object.keys(STATE_CITY_MAP)}
                  error={errors.state}
                  disabled={loading}
                  placeholder="Select State"
                />

                <CustomSelect
                  label="City"
                  name="city" // Fixed: Added name prop
                  value={formData.city}
                  onChange={handleChange}
                  options={cityOptions}
                  error={errors.city}
                  disabled={loading || !formData.state}
                  placeholder={
                    formData.state ? "Select City" : "Select State First"
                  }
                />

                {/* Payment Amount - shows only after course selection */}
                {formData.course && (
                  <div>
                    <label className="block text-xs xs:text-sm font-semibold mb-1">
                      Payment Amount *
                    </label>
                    <input
                      type="text"
                      value={`₹ ${coursePrice}`}
                      readOnly
                      className="w-full border border-gray-300 rounded-lg p-2 xs:p-3 text-xs xs:text-sm bg-gray-100 text-gray-700 font-semibold"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 xs:py-3 rounded-lg font-bold text-white transition-colors text-sm xs:text-base ${
                    loading
                      ? "bg-green-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 cursor-pointer"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-4 w-4 xs:h-5 xs:w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Enroll Now"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}