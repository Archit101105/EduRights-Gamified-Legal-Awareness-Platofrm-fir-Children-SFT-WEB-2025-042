import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Users, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        "https://legallit.onrender.com/api/admin/students"
      );
      setStudents(res.data.students);
    } catch (error) {
      console.error("Failed to fetch students", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this student?")) return;

    try {
      await axios.delete(
        `https://legallit.onrender.com/api/admin/students/${id}`
      );

      // remove from UI instantly
      setStudents((prev) => prev.filter((s) => s._id !== id));
    } catch (error) {
      console.error("Failed to delete student", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Students</h1>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search students..."
              className="pl-10 pr-4 py-2 border border-border rounded-lg bg-card"
            />
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="py-4 px-6 text-left">Name</th>
                <th className="py-4 px-6 text-left">Email</th>
                <th className="py-4 px-6 text-left">Courses Enrolled</th>
                <th className="py-4 px-6 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr
                  key={student._id}
                  className="border-b border-border hover:bg-muted/30"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium">
                        {student.name}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-6 text-muted-foreground">
                    {student.email}
                  </td>

                  <td className="py-4 px-6">
                    {student.enrolled}
                  </td>

                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="flex items-center gap-2 text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {students.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-muted-foreground">
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
