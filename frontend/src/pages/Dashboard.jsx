import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StudentsChart } from "@/components/dashboard/StudentsChart";
import { TimeDataChart } from "@/components/dashboard/TimeDataChart";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const res = await axios.get("https://legallit.onrender.com/api/modules");
      setModules(res.data.modules);
    } catch (error) {
      console.error("Failed to fetch modules", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Dashboard
        </h1>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <StudentsChart />
          <TimeDataChart />
        </div>

        {/* Courses */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            Modules
          </h2>

          <Link
            to="/create-course"
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-medium flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            NEW Module
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module) => (
            <CourseCard
              key={module._id}
              id={module._id}
              title={module.title}
              image={module.badge_icon}
              enrolled={0}
              sales={0}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
