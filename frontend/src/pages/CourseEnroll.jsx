import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Sidebar from "../components/Sidebar";

const CourseEnroll = () => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [course, setCourse] = useState(null);
  // const { userId } = useParams(); // Get the userId from URL param
  const user2 = JSON.parse(localStorage.getItem("user"));
  // console.log(user2);
  const { courseId } = useParams(); // Get the courseId from URL params
  const navigate = useNavigate();
  const getUserStatus = async () => {
    const enrolledCoursesResponse = await axios.get(`/api/users/enrolled-courses/${user2.user}`);
    const enrolledCourses = enrolledCoursesResponse.data.enrolledCourses;

    // Check if the courseId exists in the enrolled courses array
    const isEnrolled = enrolledCourses.some(course => course._id === courseId);
    if (isEnrolled) {
      setIsEnrolled(true)
    }
  }
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `/api/courses/${courseId}`
        );
        setCourse(response.data.course);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };
    getUserStatus();
    // Fetch the specific course when the component mounts
    fetchCourse();
  }, []);

  const enrollCourse = async () => {
    try {
      console.log(user2.user);

      // Fetch enrolled courses of the user
      const enrolledCoursesResponse = await axios.get(`/api/users/enrolled-courses/${user2.user}`);
      const enrolledCourses = enrolledCoursesResponse.data.enrolledCourses;

      // Check if the courseId exists in the enrolled courses array
      const isEnrolled = enrolledCourses.some(course => course._id === courseId);

      if (isEnrolled) {
        // If user is already enrolled, navigate directly to course detail page
        navigate(`/coursedetail/${courseId}`);
      } else {
        // Call the signData function to get the signature
        const signature = await signData(course.title);
        console.log("Signature:", signature);

        // If not enrolled, proceed with enrollment
        const response = await axios.post("/api/users/enroll", {
          userId: user2.user, // Assuming user has a property _id
          courseId: courseId
        });

        console.log("Enrollment response:", response.data);

        // Navigate to the course detail page
        navigate(`/coursedetail/${courseId}`);
      }
    } catch (error) {
      console.error("Error signing data:", error);
    }
  };


  if (!course) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Sidebar />
      <main className="p-8  sm:ml-52 mt-16 bg-white text-black">
        <section className="grid md:grid-cols-3 gap-8 p-5 shadow-xl rounded-xl">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-sm mb-4">{course.description}</p>
            <div className="flex items-center text-sm mb-4">
              <StarIcon className="text-yellow-400 w-4 h-4" />
              <span className="ml-1">4.7 (352,834 ratings)</span>
              <span className="mx-2">·</span>
              <span>1,192,940 students</span>
            </div>
            <div className="text-sm mb-4">
              Created by
              <span className="text-violet-300"> Devin</span>
            </div>
            <div className="flex items-center text-sm mb-4">
              <span>Last updated 3/2024</span>
              <span className="mx-2">·</span>
              <span className="text-violet-300">English, Arabic, [Auto]</span>
              <span className="mx-2">·</span>
              <span>3 more</span>
            </div>
            <Button
              className="bg-violet-600 text-white py-2 px-4 rounded"
              onClick={() => navigate("/courses")}
            >
              Go Back to Courses
            </Button>

            <div className="flex space-x-2 mt-4">
              <Button
                className="border border-violet-600 text-violet-600"
                variant="outline"
              >
                Apply Coupon
              </Button>
            </div>
          </div>
          <div className="bg-white text-black shadow-xl t p-4 rounded">
            <div>
              <img
                src={course.image}
                alt="course thumbnail"
                className="object-cover h-56 shadow-xl mb-4 rounded-xl"
              />
            </div>
            <div className="text-sm">
              <div className="mb-2 flex justify-center ">

                {isEnrolled ? (
                  <Button
                    onClick={() => navigate(`/coursedetail/${courseId}`)}
                    className="bg-purple-600 hover:bg-purple-700 px-16"
                  >
                    View Course
                  </Button>
                ) : (
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 px-16"
                    onClick={enrollCourse}
                  >
                    Enroll
                  </Button>
                )}
              </div>
              <div className="mt-4">
                <div className="text-sm mb-2">This course includes:</div>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li>67 hours on-demand video</li>
                  <li>6 articles</li>
                  <li>74 downloadable resources</li>
                  <li>Access on mobile and TV</li>
                  <li>Certificate of completion</li>
                  <li>Full lifetime access</li>
                </ul>
              </div>
              <div className="mb-2">Share this course</div>
            </div>
          </div>
        </section>
        <div className="flex justify-around flex-wrap">
          <section className="mt-8 bg-white rounded-lg shadow-md p-6 w-full  max-w-xl">
            {/* <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md "> */}
            <h2 className="text-2xl font-bold mb-4">Course content</h2>
            <ul className="space-y-2">
              {course.videos.map((video, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-2 rounded hover:bg-gray-100 cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    {/* <VideoIcon className="w-6 h-6" /> */}
                    <div>
                      <p className="font-medium">{video.title}</p>
                      <p className="text-sm text-gray-600">{video.unit}unit1</p>
                    </div>
                  </div>
                  <span>{video.duration}5:00</span>
                </li>
              ))}
            </ul>
            {/* </div> */}
          </section>
          <section className="mt-8 shadow-xl rounded-xl bg-white p-6 w-full max-w-xl">
            <h2 className="text-xl font-bold mb-4">What you'll learn</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <p className="text-sm">
                  Build 10+ web development projects for your portfolio, ready
                  to apply for junior developer jobs.
                </p>
                <p className="text-sm">
                  Learn the latest technologies, including Javascript, React,
                  Node and even Web3 and DApps.
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm">
                  Be sure you're able to build your fully-fledged websites and
                  web apps fast and understand browser React Master frontend
                  development with React.
                </p>
                <p className="text-sm">
                  Learn professional developer best practices.
                </p>
              </div>
            </div>
          </section>
        </div>
        <section className="mt-8 p-7 rounded-xl shadow-xl">
          <h2 className="text-xl font-bold mb-4">Instructor</h2>
          <div className="flex items-center mb-4">
            <div className="w-24 h-24 rounded-full  mr-4">
              <img
                alt="Avatar"
                className="rounded-full"
                height="100"
                src="https://avatars.githubusercontent.com/u/266302?v=4"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width="100"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold">Devin </h3>
              <p className="text-sm">Developer and Lead Instructor</p>
              <p className="text-sm">4.7 Instructor Rating</p>
              <p className="text-sm">72,046 Reviews</p>
              <p className="text-sm">202,455 Students</p>
              <p className="text-sm">5 Courses</p>
            </div>
          </div>
          <p className="text-sm mb-4">
            I'm devin, I'm a developer with a passion for teaching. I've had the
            instructor at the London App Brewery, London's leading Programming
            Bootcamp. I've helped hundreds of thousands of students learn to
            code and change their lives by becoming developers. But most
            importantly, I realized that my greatest joy is teaching others what
            I was once desperate to learn.
          </p>
        </section>
        <section className="mt-8 shadow-xl p-7 rounded-xl">
          <h2 className="text-xl font-bold mb-4">4.7 course rating</h2>
          <p className="text-sm mb-4">366K ratings</p>
          <div className=" grid md:grid-cols-2 gap-8">
            <div className=" shadow-xl p-4 rounded-xl mb-4">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#333] mr-4" />
                <div>
                  <p className="text-sm font-bold">Akshay K.</p>
                  <p className="text-xs">2 months ago</p>
                </div>
              </div>
              <p className="text-sm mb-4">
                I really liked the build first approach in this course, very
                basically build a mini project for every section you learn. Some
                sections are quite outdated but Angela is adding constant
                updates.
              </p>
              <button className="text-violet-300 text-xs">Helpful</button>
            </div>
            <div className="shadow-xl p-4 rounded-xl mb-4">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#333] mr-4" />
                <div>
                  <p className="text-sm font-bold">Zarko N.</p>
                  <p className="text-xs">a month ago</p>
                </div>
              </div>
              <p className="text-sm mb-4">
                Great! Great! worth all the money + has frequent updates
              </p>
              <button className="text-violet-300 text-xs">Helpful</button>
            </div>
            <div className="shadow-xl p-4 rounded-xl mb-4">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#333] mr-4" />
                <div>
                  <p className="text-sm font-bold">Bijmohan</p>
                  <p className="text-xs">2 months ago</p>
                </div>
              </div>
              <p className="text-sm mb-4">
                Course is well organized and well taught. After completing this
                course your concepts on frontend and backend will be crystal
                clear. After that all depends on your practice.
              </p>
              <button className="text-violet-300 text-xs">Helpful</button>
            </div>
            <div className="shadow-xl p-4 rounded-xl mb-4">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#333] mr-4" />
                <div>
                  <p className="text-sm font-bold">Steven</p>
                  <p className="text-xs">over a month ago</p>
                </div>
              </div>
              <p className="text-sm mb-4">
                Covered basic topic of web development industry. Explained a lot
                of basic programming knowledge with easy to understand
                explanation.
              </p>
              <button className="text-violet-300 text-xs">Helpful</button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CourseEnroll;

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
