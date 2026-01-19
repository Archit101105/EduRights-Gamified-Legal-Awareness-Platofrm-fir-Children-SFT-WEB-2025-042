import { useEffect, useState } from "react";
import axios from "axios";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [allModules, setAllModules] = useState([]);
  const [enrolledModules, setEnrolledModules] = useState([]);

  useEffect(() => {
    fetchAllModules();
    fetchEnrolledModules();
  }, []);

 
  const fetchAllModules = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/modules");
      setAllModules(res.data.modules);
    } catch (error) {
      console.error("Failed to fetch modules", error);
    }
  };


  const fetchEnrolledModules = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/users/my-modules",
      {
        params: {
          userId: user._id
        }
      }
    );

    setEnrolledModules(res.data.modules);
  } catch (error) {
    console.error("Failed to fetch enrolled modules", error);
  }
};

 
 const handleBuy = async (e, moduleId) => {
  e.stopPropagation();

  try {
    await axios.post("http://localhost:5000/api/users/buy", {
      userId: user._id,
      moduleId,
    });

    alert("Module purchased successfully ");
    fetchEnrolledModules();
  } catch (error) {
    alert("Already purchased or failed");
  }
};



  const isEnrolled = (moduleId) =>
    enrolledModules.some((m) => m._id === moduleId);

  return (
    <DashboardLayout>
      <div className="p-8 animate-fade-in">
        {/* Welcome */}
        <h1 className="text-3xl font-bold mb-2">
          Welcome, {user?.name} 👋
        </h1>
        <p className="text-muted-foreground mb-8">
          Continue learning and explore new courses
        </p>

        {/* ENROLLED COURSES */}
        <h2 className="text-xl font-semibold mb-4">
          My Courses
        </h2>

        {enrolledModules.length === 0 ? (
          <p className="text-muted-foreground mb-8">
            You haven’t enrolled in any courses yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {enrolledModules.map((module) => (
              <div
                key={module._id}
                onClick={() =>
                  navigate(`/student/modules/${module._id}`)
                }
                className="cursor-pointer bg-card border rounded-xl overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={module.badge_icon}
                  className="h-40 w-full object-cover"
                />

                <div className="p-4">
                  <h3 className="font-semibold text-lg">
                    {module.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Enrolled ✅
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AVAILABLE COURSES */}
        <h2 className="text-xl font-semibold mb-4">
          Available Courses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allModules
            .filter((m) => !isEnrolled(m._id))
            .map((module) => (
              <div
                key={module._id}
                onClick={() =>
                  navigate(`/student/modules/${module._id}`)
                }
                className="cursor-pointer bg-card border rounded-xl overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={module.badge_icon}
                  className="h-40 w-full object-cover"
                />

                <div className="p-4">
                  <h3 className="font-semibold text-lg">
                    {module.title}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {module.description}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm">
                      ⏱ {module.time_estimate_minutes} min
                    </span>

                    <button
                      onClick={(e) =>
                        handleBuy(e, module._id)
                      }
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90"
                    >
                      Buy / Enroll
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {allModules.length === enrolledModules.length && (
            <p className="text-muted-foreground">
              You have enrolled in all available courses 🎉
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default StudentDashboard;
