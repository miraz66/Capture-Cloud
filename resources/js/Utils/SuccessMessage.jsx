import React, { useState, useEffect } from "react";

const SuccessMessage = ({ message }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [message]);

  return (
    show && (
      <div className="top-20 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-emerald-500 text-center pt-5">
        {message}
      </div>
    )
  );
};

export default SuccessMessage;
