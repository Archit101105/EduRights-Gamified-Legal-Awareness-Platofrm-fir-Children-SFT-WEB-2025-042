import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { User } from "lucide-react";
import { useEffect,useState } from "react";
import axios from "axios";
const data = [
  { month: "Jan", students: 5 },
  { month: "Feb", students: 8 },
  { month: "Mar", students: 12 },
  { month: "Apr", students: 15 },
  { month: "May", students: 20 },
  { month: "Jun", students: 25 },
  { month: "Jul", students: 30 },
  { month: "Aug", students: 35 },
  { month: "Sep", students: 38 },
  { month: "Oct", students: 42 },
  { month: "Nov", students: 45 },
  { month: "Dec", students: 48 },
];

export function StudentsChart() {
  const [totalStudents ,settotalStudents] = useState(0)
  useEffect(()=>{
    const fetchTotalstudents = async ()=>{
      console.log("fetching students")
      try{
        const res = await axios.get("https://legallit.onrender.com/api/users/students/count");
        
        settotalStudents(res.data.totalStudents)
      }
      catch(error){
        console.log(error)
      }
      
    }
 fetchTotalstudents(); },[])
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">Students Registered</h3>
      <div className="flex items-center gap-2 mb-4">
        <User className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{totalStudents}</span>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142 70% 45%)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(142 70% 45%)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(220 10% 46%)' }} />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(0 0% 100%)', 
                border: '1px solid hsl(220 13% 91%)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            />
            <Area
              type="monotone"
              dataKey="students"
              stroke="hsl(142 70% 45%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorStudents)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <button className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors">
        View More
      </button>
    </div>
  );
}
