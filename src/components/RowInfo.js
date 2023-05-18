import React from "react";

const InfoRow = ({ label, text, isWhite = false }) => {
  return (
    <div
      className={`px-4 py-2.5 grid grid-cols-2 gap-4 sm:px-6 ${
        // Alternate rows have different colors in table
        !isWhite
          ? "bg-amazon_blue text-white"
          : "bg-yellow-400 text-star-primary"
      }`}
    >
      <dt className="text-sm font-medium">{label}</dt>
      <dd className="text-sm font-semibold capitalize ">{text}</dd>
    </div>
  );
};

export default InfoRow;
