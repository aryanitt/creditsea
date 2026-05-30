'use client';

import { useEffect, useState } from 'react';
import apiClient from '@/lib/api-client';
import DashboardLayout from '@/components/layouts/DashboardLayout';

export default function SanctionDashboard() {
  const [loans, setLoans] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('PENDING');

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const res = await apiClient.get('/loans');
      setLoans(res.data);
    } catch (err) {}
  };

  const handleApprove = async (id: string) => {
    try {
      await apiClient.patch(`/loans/${id}/approve`);
      fetchLoans();
    } catch (err) {
      alert('Failed to approve');
    }
  };

  const handleReject = async (id: string) => {
    const reason = prompt("Enter rejection reason (mandatory):");
    if (!reason) return;
    try {
      await apiClient.patch(`/loans/${id}/reject`, { reason });
      fetchLoans();
    } catch (err) {
      alert('Failed to reject');
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Sanction Desk</h1>
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('PENDING')} 
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'PENDING' ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Pending Review
          </button>
          <button 
            onClick={() => setActiveTab('PROCESSED')} 
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'PROCESSED' ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Processed Loans
          </button>
        </div>
      </div>
      <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenure</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loans.filter(l => activeTab === 'PENDING' ? l.status === 'APPLIED' : l.status !== 'APPLIED').length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-4 text-center text-gray-500">No applications {activeTab === 'PENDING' ? 'pending review' : 'processed yet'}</td></tr>
            ) : loans.filter(l => activeTab === 'PENDING' ? l.status === 'APPLIED' : l.status !== 'APPLIED').map((loan) => (
              <tr key={loan._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{loan.userId?.name} <br/><span className="text-gray-500 font-normal">{loan.userId?.email}</span></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(loan.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{loan.principalAmount.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.tenureDays} days</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                    ${loan.status === 'APPLIED' ? 'bg-blue-100 text-blue-800' : ''}
                    ${loan.status === 'SANCTIONED' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${loan.status === 'REJECTED' ? 'bg-red-100 text-red-800' : ''}
                    ${loan.status === 'DISBURSED' ? 'bg-green-100 text-green-800' : ''}
                    ${loan.status === 'CLOSED' ? 'bg-gray-100 text-gray-800' : ''}
                  `}>
                    {loan.status === 'APPLIED' ? 'PENDING' : loan.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {loan.status === 'APPLIED' ? (
                    <div className="flex justify-end space-x-2">
                      <button onClick={() => handleApprove(loan._id)} className="text-green-600 hover:text-green-900 bg-green-50 px-3 py-1 rounded-md">Approve</button>
                      <button onClick={() => handleReject(loan._id)} className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded-md">Reject</button>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-xs uppercase tracking-wider">{loan.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
