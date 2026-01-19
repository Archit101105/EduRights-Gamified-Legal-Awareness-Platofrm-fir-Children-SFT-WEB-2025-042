import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

function ModuleDetails() {
  const { moduleId } = useParams();
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const [levels, setLevels] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchLevels();
    if (isAdmin) {
      fetchEnrolledStudents();
    }
  }, [isAdmin]);

  const fetchLevels = async () => {
    try {
      const res = await axios.get(
        `https://legallit.onrender.com/api/levels/${moduleId}`
      );
      setLevels(res.data.levels);
    } catch (error) {
      console.error("Failed to fetch levels", error);
    }
  };

  const fetchEnrolledStudents = async () => {
    try {
      const res = await axios.get(
        `https://legallit.onrender.com/api/admin/modules/${moduleId}/enrollments`
      );
      setStudents(res.data.students);
    } catch (error) {
      console.error("Failed to fetch enrolled students", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 space-y-10">

        {/* LEVELS */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Levels</h1>

            {isAdmin && (
              <Link
                to={`/admin/modules/${moduleId}/levels`}
                className="px-4 py-2 bg-primary text-white rounded"
              >
                Add Level
              </Link>
            )}
          </div>

          <div className="grid gap-4">
            {levels.map((level) => (
              <div
                key={level._id}
                className="p-4 border rounded-lg bg-card"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">
                      Level {level.level_number}: {level.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Difficulty: {level.difficulty}
                    </p>
                  </div>
                  <span className="text-sm">
                    {level.xp_reward} XP
                  </span>
                </div>
              </div>
            ))}

            {levels.length === 0 && (
              <p className="text-muted-foreground">
                No levels added yet.
              </p>
            )}
          </div>
        </div>

        {/* ADMIN: ENROLLED STUDENTS */}
        {isAdmin && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Enrolled Students ({students.length})
            </h2>

            {students.length === 0 ? (
              <p className="text-muted-foreground">
                No students enrolled yet.
              </p>
            ) : (
              <div className="bg-card border rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4">Name</th>
                      <th className="text-left p-4">Email</th>
                      <th className="text-left p-4">Purchased On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s) => (
                      <tr
                        key={s._id}
                        className="border-t"
                      >
                        <td className="p-4">{s.name}</td>
                        <td className="p-4 text-muted-foreground">
                          {s.email}
                        </td>
                        <td className="p-4 text-sm">
                          {new Date(s.purchased_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

export default ModuleDetails;
