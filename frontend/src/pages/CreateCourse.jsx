import { DashboardLayout } from "../components/layout/DashboardLayout";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateCourse() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    badge_title: "",
    badge_icon: "",
    time_estimate_minutes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "https://legallit.onrender.com/api/admin/modules",
        {
          ...form,
          learning_summary: [],
        }
      );

      const moduleId = res.data.module._id;

      alert("Course created successfully");

      
      navigate(`/admin/modules/${moduleId}/levels`);
    } catch (error) {
      console.error(error);
      alert("Failed to create course");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-xl">
        <h1 className="text-2xl font-bold mb-4">Create New Course</h1>

        <input
          name="title"
          placeholder="Course Title"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          name="badge_title"
          placeholder="Badge Title"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          name="badge_icon"
          placeholder="Badge Icon URL"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          name="time_estimate_minutes"
          placeholder="Time (minutes)"
          type="number"
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          Create Course & Add Levels
        </button>
      </div>
    </DashboardLayout>
  );
}

export default CreateCourse;
