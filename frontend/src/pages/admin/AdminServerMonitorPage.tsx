import { useEffect, useState } from 'react';
import { Activity, Cpu, HardDrive, MemoryStick, Timer, AlertTriangle, Zap } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import StatCard from '@/components/admin/StatCard';
import ChartCard from '@/components/admin/ChartCard';
import { mockServerMetrics } from '@/data/mockAdmin';
import type { ServerMetrics } from '@/types';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export default function AdminServerMonitorPage() {
  const [metrics, setMetrics] = useState<ServerMetrics>(mockServerMetrics());
  const [history, setHistory] = useState<{ t: string; cpu: number; memory: number; rt: number }[]>([]);

  useEffect(() => {
    const id = setInterval(() => {
      const m = mockServerMetrics();
      setMetrics(m);
      setHistory((prev) =>
        [...prev, { t: new Date().toLocaleTimeString(), cpu: m.cpu, memory: m.memory, rt: m.responseTime }].slice(-20)
      );
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Server Monitor</h1>
          <p className="text-sm text-muted-foreground">Live infrastructure health (updates every 2s).</p>
        </div>
        <Badge className="gap-1.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Live
        </Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Uptime" value={`${metrics.uptime}%`} icon={<Activity className="h-5 w-5" />} hint="Last 30 days" />
        <StatCard title="Avg Response" value={`${metrics.responseTime}ms`} icon={<Timer className="h-5 w-5" />} hint="API latency p95" />
        <StatCard title="Error Rate" value={`${metrics.errorRate}%`} icon={<AlertTriangle className="h-5 w-5" />} trend={{ value: metrics.errorRate > 0.8 ? 'elevated' : 'normal', positive: metrics.errorRate <= 0.8 }} />
        <StatCard title="Requests / min" value={metrics.requestsPerMin.toLocaleString()} icon={<Zap className="h-5 w-5" />} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="CPU & Memory" subtitle="Live utilization">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={history}>
              <defs>
                <linearGradient id="cpu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="mem" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="t" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} domain={[0, 100]} />
              <Tooltip />
              <Area type="monotone" dataKey="cpu" name="CPU %" stroke="#3b82f6" fill="url(#cpu)" strokeWidth={2} />
              <Area type="monotone" dataKey="memory" name="Memory %" stroke="#10b981" fill="url(#mem)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Response Time" subtitle="Milliseconds">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={history}>
              <defs>
                <linearGradient id="rt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="t" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="rt" name="Response (ms)" stroke="#f59e0b" fill="url(#rt)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <ResourceBar icon={<Cpu className="h-5 w-5" />} label="CPU Usage" value={metrics.cpu} />
        <ResourceBar icon={<MemoryStick className="h-5 w-5" />} label="Memory Usage" value={metrics.memory} />
        <ResourceBar icon={<HardDrive className="h-5 w-5" />} label="Disk Usage" value={metrics.disk} />
      </div>
    </div>
  );
}

function ResourceBar({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  const color = value > 80 ? 'text-destructive' : value > 60 ? 'text-amber-600' : 'text-emerald-600';
  return (
    <div className="rounded-lg border bg-card p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="text-muted-foreground">{icon}</span> {label}
        </div>
        <span className={`text-sm font-semibold ${color}`}>{value}%</span>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  );
}
