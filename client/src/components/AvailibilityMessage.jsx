import React from "react";

const AvailabilityMessage = ({ value }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        {value ? (
          <p className="text-white text-lg font-bold">
            No {value} available today!
          </p>
        ) : (
          <p className="text-gray-800 text-lg font-medium">
            No data available today!
          </p>
        )}
      </div>
    </div>
  );
};

export default AvailabilityMessage;
