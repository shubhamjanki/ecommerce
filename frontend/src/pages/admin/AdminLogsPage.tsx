import { useState } from 'react';
import AdminDataTable, { type Column } from '@/components/admin/AdminDataTable';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockLogs } from '@/data/mockAdmin';
import type { SystemLog, LogSeverity } from '@/types';

const severityColor: Record<LogSeverity, string> = {
  info: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
  warning: 'bg-amber-100 text-amber-700 hover:bg-amber-100',
  error: 'bg-rose-100 text-rose-700 hover:bg-rose-100',
};

export default function AdminLogsPage() {
  const [rows] = useState<SystemLog[]>(mockLogs);
  const [search, setSearch] = useState('');
  const [severity, setSeverity] = useState('all');
  const [type, setType] = useState('all');

  const filtered = rows.filter((l) => {
    const matchSearch =
      !search ||
      (l.actor + l.action + l.message).toLowerCase().includes(search.toLowerCase());
    const matchSeverity = severity === 'all' || l.severity === severity;
    const matchType = type === 'all' || l.action === type;
    return matchSearch && matchSeverity && matchType;
  });

  const actionTypes = Array.from(new Set(rows.map((r) => r.action)));

  const columns: Column<SystemLog>[] = [
    { key: 'timestamp', header: 'Timestamp', cell: (l) => <span className="text-xs text-muted-foreground">{new Date(l.timestamp).toLocaleString()}</span> },
    { key: 'actor', header: 'Actor', cell: (l) => <span className="font-medium">{l.actor}</span> },
    { key: 'action', header: 'Action', cell: (l) => <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{l.action}</code> },
    { key: 'resource', header: 'Resource', cell: (l) => l.resource },
    {
      key: 'severity',
      header: 'Severity',
      cell: (l) => <Badge variant="outline" className={severityColor[l.severity]}>{l.severity}</Badge>,
    },
    { key: 'status', header: 'Status', cell: (l) => <span className={l.status === 'success' ? 'text-emerald-600' : 'text-destructive'}>{l.status}</span> },
    { key: 'message', header: 'Message', className: 'max-w-xs', cell: (l) => <span className="line-clamp-1 text-xs text-muted-foreground">{l.message}</span> },
  ];

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">System Logs</h1>
        <p className="text-sm text-muted-foreground">Audit trail of system and user activity.</p>
      </div>
      <AdminDataTable
        columns={columns}
        rows={filtered}
        searchValue={search}
        onSearch={setSearch}
        searchPlaceholder="Search logs…"
        toolbar={
          <div className="flex gap-2">
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Action type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All actions</SelectItem>
                {actionTypes.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={severity} onValueChange={setSeverity}>
              <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All severities</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
      />
    </div>
  );
}
