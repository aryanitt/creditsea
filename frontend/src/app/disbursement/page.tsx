'use client';

import { useEffect, useState } from 'react';
import apiClient from '@/lib/api-client';
import DashboardLayout from '@/components/layouts/DashboardLayout';

export default function DisbursementDashboard() {
  const [loans, setLoans] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('PENDING');
  const [confirmLoan, setConfirmLoan] = useState<any>(null);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const res = await apiClient.get('/loans');
      setLoans(res.data);
    } catch (err) {}
  };

  const handleDisburse = async () => {
    if (!confirmLoan) return;
    try {
      await apiClient.patch(`/loans/${confirmLoan._id}/disburse`);
      setConfirmLoan(null);
      fetchLoans();
    } catch (err) {
      alert('Failed to disburse');
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Disbursement Queue</h1>
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('PENDING')} 
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'PENDING' ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Pending Release
          </button>
          <button 
            onClick={() => setActiveTab('DISBURSED')} 
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'DISBURSED' ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Disbursed History
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmLoan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/30 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 m-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Confirm Disbursement</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to release funds to <span className="font-bold text-gray-900">{confirmLoan.userId?.name}</span> for the amount of <span className="font-bold text-green-600">₹{confirmLoan.principalAmount.toLocaleString()}</span>?
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setConfirmLoan(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleDisburse}
                className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
              >
                Yes, Release Funds
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loans.filter(l => activeTab === 'PENDING' ? l.status === 'SANCTIONED' : l.status !== 'SANCTIONED').length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-4 text-center text-gray-500">No loans {activeTab === 'PENDING' ? 'pending disbursement' : 'found in history'}</td></tr>
            ) : loans.filter(l => activeTab === 'PENDING' ? l.status === 'SANCTIONED' : l.status !== 'SANCTIONED').map((loan) => (
              <tr key={loan._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{loan.userId?.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(loan.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{loan.principalAmount.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                    ${loan.status === 'SANCTIONED' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${loan.status === 'DISBURSED' ? 'bg-green-100 text-green-800' : ''}
                    ${loan.status === 'CLOSED' ? 'bg-gray-100 text-gray-800' : ''}
                  `}>
                    {loan.status === 'SANCTIONED' ? 'PENDING' : loan.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {loan.status === 'SANCTIONED' ? (
                    <button onClick={() => setConfirmLoan(loan)} className="text-green-600 hover:text-green-900 bg-green-50 px-3 py-1 rounded-md">Release Funds</button>
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
