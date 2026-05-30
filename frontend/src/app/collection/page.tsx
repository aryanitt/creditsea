'use client';

import { useEffect, useState } from 'react';
import apiClient from '@/lib/api-client';
import DashboardLayout from '@/components/layouts/DashboardLayout';

export default function CollectionDashboard() {
  const [loans, setLoans] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('ACTIVE');
  const [selectedLoan, setSelectedLoan] = useState<any>(null);
  const [utrNumber, setUtrNumber] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const res = await apiClient.get('/loans');
      setLoans(res.data);
    } catch (err) {}
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLoan) return;
    try {
      await apiClient.post('/payments', {
        loanId: selectedLoan._id,
        utrNumber,
        amount: Number(amount),
        paymentDate: new Date().toISOString()
      });
      alert('Payment recorded successfully');
      setUtrNumber('');
      setAmount('');
      setSelectedLoan(null);
      fetchLoans();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Payment failed');
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Collection Module</h1>
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => { setActiveTab('ACTIVE'); setSelectedLoan(null); }} 
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'ACTIVE' ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Active Loans
          </button>
          <button 
            onClick={() => { setActiveTab('CLOSED'); setSelectedLoan(null); }} 
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'CLOSED' ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Closed Accounts
          </button>
        </div>
      </div>
      
      {selectedLoan && (
        <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-indigo-200">
          <h2 className="text-lg font-bold mb-4">Record Payment for {selectedLoan.userId?.name}</h2>
          <form onSubmit={handlePayment} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Outstanding Balance</label>
                <input type="text" disabled value={`₹${selectedLoan.outstandingBalance.toLocaleString()}`} className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm sm:text-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Amount (₹)</label>
                <input type="number" required max={selectedLoan.outstandingBalance} value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">UTR Number (Unique)</label>
                <input type="text" required value={utrNumber} onChange={(e) => setUtrNumber(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button type="button" onClick={() => setSelectedLoan(null)} className="px-4 py-2 border rounded-md text-sm font-medium">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">Record Payment</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outstanding</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Paid</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loans.filter(l => activeTab === 'ACTIVE' ? l.status === 'DISBURSED' : l.status === 'CLOSED').length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-4 text-center text-gray-500">No {activeTab === 'ACTIVE' ? 'active loans pending collection' : 'closed accounts found'}</td></tr>
            ) : loans.filter(l => activeTab === 'ACTIVE' ? l.status === 'DISBURSED' : l.status === 'CLOSED').map((loan) => (
              <tr key={loan._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{loan.userId?.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(loan.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">₹{loan.outstandingBalance.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">₹{loan.totalPaid.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${loan.status === 'CLOSED' ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'}`}>
                    {loan.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {loan.status === 'DISBURSED' ? (
                    <button onClick={() => setSelectedLoan(loan)} className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded-md">Record Payment</button>
                  ) : (
                    <span className="text-gray-400 text-xs uppercase tracking-wider">Settled</span>
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
