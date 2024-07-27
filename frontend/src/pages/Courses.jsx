import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "./Courses.css";
import { FaBookOpen, FaTrophy } from "react-icons/fa";
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "/api/users/allcourses"
        );
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    // Fetch courses when the component mounts
    fetchCourses();
  }, []);

  return (
    <>
      {/* // <div className=" bg-zinc-200 min-h-screen">
    //   <div className="container mx-auto px-4 ">
    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    //       <div className="md:col-span-1"> */}
      <Sidebar />
      {/* // </div> */}
      <div className="md:col-span-2 p-4 sm:ml-52 mt-16">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="course flex flex-col shadow-lg rounded-3xl overflow-hidden"
            >
              <img
                alt="Course thumbnail"
                height={225}
                src={course.image}
                className=" h-200 object-cover w-full"
              />
              <div className="p-4 flex-1">
                <h2 className="text-lg font-semibold">{course.title}</h2>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {course.description}{" "}
                </p>
                <p className="text-sm text-gray-500 mt-2">{course.category}</p>
                <div className="flex gap-16 mt-1">
                  <div className="flex gap-2 justify-center align-middle items-center">
                    <FaBookOpen />
                    <p className="text-sm text-gray-500 ">Modules: {course.videos.length}</p> {/* Display number of videos */}
                  </div>
                  <div className="flex gap-2 justify-center align-middle items-center">
                    <FaTrophy />
                    <p className="text-sm text-gray-500 ">Reward Pool : 2000$</p>
                  </div>
                </div>
              </div>
              <button
                className="flex items-center justify-center p-4 bg-gray-100 text-sm w-full"
                onClick={() => navigate(`/courseEnroll/${course._id}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Courses;
