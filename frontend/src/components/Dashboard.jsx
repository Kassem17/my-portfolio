import { useState, useEffect } from "react";
import {
  Users,
  UserCheck,
  Globe,
  Clock,
  Search,
  Download,
  Laptop,
  MapPin,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  RefreshCw
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [overview, setOverview] = useState({
    totalVisitors: 1240,
    uniqueVisitors: 890,
    totalPageViews: 3420,
    avgTimeSpent: "2m 15s"
  });
  const [statistics, setStatistics] = useState({
    pageViewsByDay: [
      { date: "Mon", views: 240 },
      { date: "Tue", views: 320 },
      { date: "Wed", views: 450 },
      { date: "Thu", views: 380 },
      { date: "Fri", views: 520 },
      { date: "Sat", views: 610 },
      { date: "Sun", views: 490 }
    ],
    deviceBreakdown: [
      { name: "Desktop", value: 65 },
      { name: "Mobile", value: 30 },
      { name: "Tablet", value: 5 }
    ]
  });
  const [visitorsData, setVisitorsData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] p-6 sm:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--color-border)] pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Portfolio Analytics</h1>
            <p className="text-[var(--color-text-muted)] text-sm mt-1">
              Overview of site visitors and engagement metrics
            </p>
          </div>
        </header>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bento-card p-5 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)] uppercase font-semibold">Total Visitors</p>
              <h3 className="text-2xl font-bold mt-1">{overview.totalVisitors}</h3>
            </div>
          </div>

          <div className="bento-card p-5 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)] uppercase font-semibold">Unique Visitors</p>
              <h3 className="text-2xl font-bold mt-1">{overview.uniqueVisitors}</h3>
            </div>
          </div>

          <div className="bento-card p-5 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)] uppercase font-semibold">Page Views</p>
              <h3 className="text-2xl font-bold mt-1">{overview.totalPageViews}</h3>
            </div>
          </div>

          <div className="bento-card p-5 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)] uppercase font-semibold">Avg. Duration</p>
              <h3 className="text-2xl font-bold mt-1">{overview.avgTimeSpent}</h3>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bento-card p-6 rounded-2xl lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Traffic Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={statistics.pageViewsByDay}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="date" stroke="currentColor" opacity={0.5} />
                  <YAxis stroke="currentColor" opacity={0.5} />
                  <Tooltip />
                  <Area type="monotone" dataKey="views" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bento-card p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-4">Devices</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statistics.deviceBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {statistics.deviceBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
