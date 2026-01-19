import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DollarSign, TrendingUp, ShoppingCart, Users } from "lucide-react";
import { useState,useEffect } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import axios from "axios"

const salesData = [
  { month: "Jan", sales: 1200 },
  { month: "Feb", sales: 1900 },
  { month: "Mar", sales: 1500 },
  { month: "Apr", sales: 2100 },
  { month: "May", sales: 2400 },
  { month: "Jun", sales: 1800 },
];

const recentSales = [
  { id: 1, course: "Introduction to Design", student: "John Smith", amount: 49, date: "2024-01-15" },
  { id: 2, course: "Advanced Marketing", student: "Sarah Johnson", amount: 79, date: "2024-01-14" },
  { id: 3, course: "Web Development", student: "Mike Wilson", amount: 99, date: "2024-01-13" },
];

export default function Sales() {

  const [totalStudents ,settotalStudents] = useState(0)
  useEffect(()=>{
    const fetchstudents = async ()=>{
      try{
        console.log("Fetching students")
        const res = await axios.get("https://legallit.onrender.com/api/users/students/count")
        settotalStudents(res.data.totalStudents)
        console.log(totalStudents)
      }
      catch(error){
        console.log(error)
      }
    }
 fetchstudents(); },[])
  return (
    <DashboardLayout>
      <div className="p-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground mb-8">Sales</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-foreground">$12,450</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-chart-green/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-chart-green" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Growth</p>
                <p className="text-2xl font-bold text-foreground">+24%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Sales</p>
                <p className="text-2xl font-bold text-foreground">156</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Customers</p>
                <p className="text-2xl font-bold text-foreground">{totalStudents}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Chart */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-6">Monthly Sales</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(0 0% 100%)', 
                      border: '1px solid hsl(220 13% 91%)',
                      borderRadius: '8px'
                    }}
                    formatter={(value) => [`$${value}`, 'Sales']}
                  />
                  <Bar dataKey="sales" fill="hsl(24 95% 53%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Sales */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-6">Recent Sales</h3>
            <div className="space-y-4">
              {recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-foreground">{sale.course}</p>
                    <p className="text-sm text-muted-foreground">{sale.student}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">${sale.amount}</p>
                    <p className="text-xs text-muted-foreground">{sale.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
