"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  Calendar, 
  DollarSign, 
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const data = [
  { name: "Mon", appointments: 12 },
  { name: "Tue", appointments: 19 },
  { name: "Wed", appointments: 15 },
  { name: "Thu", appointments: 22 },
  { name: "Fri", appointments: 30 },
  { name: "Sat", appointments: 35 },
  { name: "Sun", appointments: 25 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard icon={<Calendar />} title="Today's Bookings" value="14" trend="+3 from yesterday" />
        <StatsCard icon={<DollarSign />} title="Weekly Revenue" value="$2,450" trend="+12% vs last week" />
        <StatsCard icon={<MessageSquare />} title="Pending Reviews" value="8" trend="Needs attention" />
        <StatsCard icon={<Users />} title="Total Clients" value="1,240" trend="+45 this month" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Appointments Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 glass p-8 rounded-3xl border border-white/5"
        >
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-xl font-accent text-gold uppercase tracking-widest">Booking Trends</h3>
             <select className="bg-black/40 border border-white/10 rounded-lg text-[10px] font-accent uppercase px-3 py-1 outline-none text-gold">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
             </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#C9A84C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#ffffff20" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#ffffff20" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #C9A84C20', borderRadius: '12px' }}
                  itemStyle={{ color: '#C9A84C' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="appointments" 
                  stroke="#C9A84C" 
                  fillOpacity={1} 
                  fill="url(#colorGold)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Live Activity Feed */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass p-8 rounded-3xl border border-white/5"
        >
           <h3 className="text-xl font-accent text-gold uppercase tracking-widest mb-8">Live Feed</h3>
           <div className="space-y-6">
              <ActivityItem icon={<CheckCircle2 className="text-green-500" />} text="Jeet confirmed Skin Fade for Robert" time="2 mins ago" />
              <ActivityItem icon={<Clock className="text-gold" />} text="New booking request from Kamaldeep" time="15 mins ago" />
              <ActivityItem icon={<XCircle className="text-red-500" />} text="Appointment cancelled by Shelley" time="1 hour ago" />
              <ActivityItem icon={<MessageSquare className="text-blue-500" />} text="New 5-star review from Dilpreet" time="3 hours ago" />
           </div>
           <button className="w-full mt-8 py-3 border border-gold/20 text-gold font-accent text-xs uppercase tracking-widest rounded-xl hover:bg-gold hover:text-black transition-all">
              View All Activity
           </button>
        </motion.div>

      </div>

      {/* Recent Appointments Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-3xl border border-white/5 overflow-hidden"
      >
         <div className="p-8 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-xl font-accent text-gold uppercase tracking-widest">Recent Appointments</h3>
            <button className="text-xs font-accent text-warm-white/40 hover:text-gold uppercase tracking-widest">View Full Schedule</button>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-white/[0.02] text-[10px] font-accent uppercase text-warm-white/40 tracking-[0.2em]">
                  <tr>
                     <th className="px-8 py-4">Client</th>
                     <th className="px-8 py-4">Service</th>
                     <th className="px-8 py-4">Barber</th>
                     <th className="px-8 py-4">Time</th>
                     <th className="px-8 py-4">Status</th>
                     <th className="px-8 py-4">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  <AppointmentRow name="Ayush Verma" service="Skin Fade + Beard" barber="Jeet" time="Today, 2:30 PM" status="confirmed" />
                  <AppointmentRow name="Robert Gilbertson" service="Regular Cut" barber="Any" time="Today, 4:00 PM" status="pending" />
                  <AppointmentRow name="Shelley Boreen" service="Haircut + Facial" barber="Jeet" time="Tomorrow, 11:00 AM" status="confirmed" />
                  <AppointmentRow name="Kamaldeep Singh" service="Beard Line Up" barber="Jeet" time="Apr 26, 1:15 PM" status="completed" />
               </tbody>
            </table>
         </div>
      </motion.div>

    </div>
  );
}

function StatsCard({ icon, title, value, trend }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="glass p-6 rounded-2xl border border-white/5 hover:border-gold/20 transition-all group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <TrendingUp size={16} className="text-green-500/40" />
      </div>
      <h4 className="text-[10px] font-accent text-warm-white/40 uppercase tracking-widest mb-1">{title}</h4>
      <div className="text-3xl font-accent text-warm-white mb-2">{value}</div>
      <p className="text-[10px] font-mono text-warm-white/20 uppercase tracking-wider">{trend}</p>
    </motion.div>
  );
}

function ActivityItem({ icon, text, time }: any) {
  return (
    <div className="flex gap-4 items-start">
       <div className="mt-1">{icon}</div>
       <div>
          <p className="text-xs text-warm-white/80 font-body leading-tight mb-1">{text}</p>
          <p className="text-[10px] font-mono text-warm-white/20 uppercase">{time}</p>
       </div>
    </div>
  );
}

function AppointmentRow({ name, service, barber, time, status }: any) {
  const statusColors: any = {
    confirmed: "bg-green-500/10 text-green-500",
    pending: "bg-gold/10 text-gold",
    completed: "bg-blue-500/10 text-blue-500",
    cancelled: "bg-red-500/10 text-red-500"
  };

  return (
    <tr className="hover:bg-white/[0.01] transition-colors group">
       <td className="px-8 py-5">
          <div className="text-sm font-accent text-warm-white uppercase tracking-wider">{name}</div>
       </td>
       <td className="px-8 py-5">
          <div className="text-xs text-warm-white/40">{service}</div>
       </td>
       <td className="px-8 py-5">
          <div className="text-xs text-warm-white/40">{barber}</div>
       </td>
       <td className="px-8 py-5">
          <div className="text-[10px] font-mono text-warm-white/40 uppercase">{time}</div>
       </td>
       <td className="px-8 py-5">
          <span className={`px-3 py-1 rounded-full text-[8px] font-accent uppercase tracking-widest ${statusColors[status]}`}>
             {status}
          </span>
       </td>
       <td className="px-8 py-5">
          <button className="text-gold opacity-0 group-hover:opacity-100 transition-opacity font-accent text-[10px] uppercase tracking-widest hover:underline">
             Details
          </button>
       </td>
    </tr>
  );
}
