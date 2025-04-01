import { useEffect, useState } from "react";
import {
  FaBatteryEmpty,
  FaBatteryQuarter,
  FaBatteryThreeQuarters,
  FaBatteryFull,
  FaBatteryHalf,
} from "react-icons/fa";

const Loader = () => {
  const [currentIcon, setCurrentIcon] = useState(0);
  const icons = [
    <FaBatteryEmpty />,
    <FaBatteryQuarter />,
    <FaBatteryThreeQuarters />,
    <FaBatteryHalf />,
    <FaBatteryFull />,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-5xl ">{icons[currentIcon]}</div>
    </div>
  );
};

export default Loader;
