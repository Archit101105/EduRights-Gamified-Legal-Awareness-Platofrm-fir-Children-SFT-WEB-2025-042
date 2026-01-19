import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function StudentModuleDetails() {
  const { moduleId } = useParams();
  const [module, setModule] = useState(null);

  useEffect(() => {
    axios.get(`https://legallit.onrender.com/api/modules/${moduleId}`)
      .then(res => setModule(res.data.module));
  }, []);

  const handleBuy = async () => {
    await axios.post("https://legallit.onrender.com/api/users/buy", {
      moduleId
    });
    alert("Module Purchased ");
  };

  if (!module) return null;

  return (
    <DashboardLayout>
      <div
        className="p-8 rounded-xl"
        style={{ backgroundColor:"white" }}
      >
        <div className="flex gap-6 items-center">


          <div>
            <h1 className="text-3xl font-bold">
              {module.title}
            </h1>
            <p className="mt-2">
              {module.description}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="font-semibold text-lg">
            What you’ll learn
          </h2>
          <ul className="list-disc ml-6 mt-2">
            {module.learning_summary.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div>
            ⏱ {module.time_estimate_minutes} minutes  
            <br />
            🎖 Bonus XP: {module.completion_bonus_xp}
          </div>

          <button
            onClick={handleBuy}
            className="px-6 py-3 bg-black text-white rounded-xl"
          >
            Buy / Enroll
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
