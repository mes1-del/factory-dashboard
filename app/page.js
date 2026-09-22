'use client';

import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Dashboard() {
  const { data, error, isLoading } = useSWR('/api/dashboard', fetcher, {
    refreshInterval: 10000, 
  });

  if (isLoading) return <div className="p-10 text-center font-bold text-lg">Loading Factory Master Dashboard...</div>;
  if (error || !data) return <div className="p-10 text-red-500 font-bold">Error loading dashboard data. Please check environment variables.</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">🏭 Factory Master Dashboard</h1>
        <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
          Live Updates • Sync: {data.updatedAt}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        <KPICard title="Sales Rows" value={data.sales?.length ? data.sales.length - 1 : 0} color="bg-blue-500" />
        <KPICard title="Production Rows" value={data.production?.length ? data.production.length - 1 : 0} color="bg-green-500" />
        <KPICard title="Moulding Rows" value={data.moulding?.length ? data.moulding.length - 1 : 0} color="bg-purple-500" />
        <KPICard title="Dispatch Rows" value={data.dispatch?.length ? data.dispatch.length - 1 : 0} color="bg-amber-500" />
        <KPICard title="Purchase Rows" value={data.purchase?.length ? data.purchase.length - 1 : 0} color="bg-red-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DataTable title="Recent Sales Data" data={data.sales} />
        <DataTable title="Recent Production Data" data={data.production} />
        <DataTable title="Recent Moulding Data" data={data.moulding} />
        <DataTable title="Recent Dispatch Status" data={data.dispatch} />
        <DataTable title="Recent Purchase Orders" data={data.purchase} />
      </div>
    </div>
  );
}

function KPICard({ title, value, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <div className="flex items-center justify-between mt-2">
        <h2 className="text-2xl font-bold text-gray-800">{value} Entries</h2>
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
      </div>
    </div>
  );
}

function DataTable({ title, data }) {
  if (!data || data.length === 0) return null;
  const headers = data[0] || [];
  const rows = data.slice(1, 6) || [];

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
      <h3 className="font-bold text-lg text-gray-800 mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-50 border-b">
              {headers.map((h, i) => (
                <th key={i} className="p-2 font-semibold text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className="border-b hover:bg-gray-50">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="p-2 text-gray-700">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
