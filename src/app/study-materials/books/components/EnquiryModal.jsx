"use client";
import FranchiseEnquiryForm from "./EnquiryForm";

export const EnquiryModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Stop close when clicking inside modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto relative p-4 sm:p-6"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl font-bold"
        >
          ✕
        </button>

        {/* Form */}
        <FranchiseEnquiryForm />
      </div>
    </div>
  );
}
