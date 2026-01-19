import { DashboardLayout } from "../components/layout/DashboardLayout";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function CreateLevels() {
  const { moduleId } = useParams();

  const [level, setLevel] = useState({
    level_number: "",
    title: "",
    xp_reward: "",
    difficulty: "EASY",
  });

  const handleChange = (e) => {
    setLevel({ ...level, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("https://legallit.onrender.com/api/admin/levels", {
        ...level,
        module_id: moduleId,
      });

      alert("Level added");

      
      setLevel({
        level_number: "",
        title: "",
        xp_reward: "",
        difficulty: "EASY",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to add level");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-xl">
        <h1 className="text-2xl font-bold mb-4">
          Add Levels to Course
        </h1>

        <input
          name="level_number"
          placeholder="Level Number (1,2,3...)"
          type="number"
          onChange={handleChange}
          value={level.level_number}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          name="title"
          placeholder="Level Title"
          onChange={handleChange}
          value={level.title}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="xp_reward"
          placeholder="Points"
          type="number"
          onChange={handleChange}
          value={level.xp_reward}
          className="w-full mb-3 p-2 border rounded"
        />

        <select
          name="difficulty"
          onChange={handleChange}
          value={level.difficulty}
          className="w-full mb-3 p-2 border rounded"
        >
          <option value="EASY">Easy</option>
          <option value="MEDIUM">Medium</option>
          <option value="HARD">Hard</option>
        </select>

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          Add Level
        </button>
      </div>
    </DashboardLayout>
  );
}

export default CreateLevels;
