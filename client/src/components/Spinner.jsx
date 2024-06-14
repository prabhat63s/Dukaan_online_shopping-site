import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Spin } from "antd";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div>
          <Spin size="large" />
        </div>
      </div>
    </>
  );
};

export default Spinner;
