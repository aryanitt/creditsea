'use client';

import { useEffect, useState } from 'react';
import apiClient from '@/lib/api-client';
import DashboardLayout from '@/components/layouts/DashboardLayout';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loans, setLoans] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [analyticsRes, loansRes] = await Promise.all([
        apiClient.get('/dashboard/analytics'),
        apiClient.get('/loans')
      ]);
      setAnalytics(analyticsRes.data);
      setLoans(loansRes.data);
    } catch (err) {}
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    if (!window.confirm(`Are you sure you want to forcefully change this loan's status to ${newStatus}?`)) return;
    try {
      await apiClient.patch(`/loans/${id}/status`, { status: newStatus });
      fetchData(); // refresh data
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  if (!analytics) return <DashboardLayout><p>Loading analytics...</p></DashboardLayout>;

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Total Applications</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.totalApplications}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Sanctioned Loans</p>
          <p className="text-3xl font-bold text-indigo-600 mt-2">{analytics.sanctionedLoans}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Disbursed Loans</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{analytics.disbursedLoans}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Closed Loans</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.closedLoans}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Collection Rate</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{analytics.collectionRate}%</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Total Outstanding</p>
          <p className="text-3xl font-bold text-red-600 mt-2">₹{analytics.totalOutstanding.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Total Collected</p>
          <p className="text-3xl font-bold text-green-600 mt-2">₹{analytics.totalPaid.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Rejected Applications</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{analytics.rejectedLoans}</p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Loan Master Control</h2>
        <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outstanding</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Edit Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loans.map((loan) => (
                <tr key={loan._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{loan.userId?.name} <br/><span className="text-gray-500 font-normal">{loan.userId?.email}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(loan.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{loan.principalAmount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{loan.outstandingBalance.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                      ${loan.status === 'APPLIED' ? 'bg-blue-100 text-blue-800' : ''}
                      ${loan.status === 'SANCTIONED' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${loan.status === 'REJECTED' ? 'bg-red-100 text-red-800' : ''}
                      ${loan.status === 'DISBURSED' ? 'bg-green-100 text-green-800' : ''}
                      ${loan.status === 'CLOSED' ? 'bg-gray-100 text-gray-800' : ''}
                    `}>
                      {loan.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <select 
                      value={loan.status} 
                      onChange={(e) => handleStatusChange(loan._id, e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    >
                      <option value="DRAFT">DRAFT</option>
                      <option value="APPLIED">APPLIED</option>
                      <option value="SANCTIONED">SANCTIONED</option>
                      <option value="REJECTED">REJECTED</option>
                      <option value="DISBURSED">DISBURSED</option>
                      <option value="CLOSED">CLOSED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
