import React from 'react';

type PaymentRequest = {
  status: string;
  paymentType: string;
  date: string;
  amount: string;
  requestStatus: 'Declined' | 'Approved' | 'Pending';
};

const PaymentRequestsPage: React.FC = () => {
  const paymentData: PaymentRequest[] = [
    {
      status: 'ServiceInit Time',
      paymentType: '4l',
      date: '16 March, 2025',
      amount: '860.000 total',
      requestStatus: 'Pending'
    },
    {
      status: 'Start Build',
      paymentType: 'Services',
      date: '18 March, 2025',
      amount: '860.000 total',
      requestStatus: 'Approved'
    },
    {
      status: 'WorkedInit Time',
      paymentType: 'Cancel',
      date: '18 March, 2025',
      amount: '860.000 total',
      requestStatus: 'Declined'
    },
    {
      status: 'Target Code',
      paymentType: 'Services',
      date: '19 March, 2025',
      amount: '970.000 total',
      requestStatus: 'Approved'
    },
    {
      status: 'StartRite',
      paymentType: 'Cancel',
      date: '19 March, 2025',
      amount: '960.000 total',
      requestStatus: 'Approved'
    },
    {
      status: 'Target Code',
      paymentType: 'Services',
      date: '19 March, 2025',
      amount: '970.000 total',
      requestStatus: 'Pending'
    },
    {
      status: 'StartRite',
      paymentType: 'Cancel',
      date: '16 March, 2025',
      amount: '960.000 total',
      requestStatus: 'Declined'
    },
    {
      status: 'Target Code',
      paymentType: '4l',
      date: '16 March, 2025',
      amount: '970.000 total',
      requestStatus: 'Approved'
    }
  ];

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Declined':
        return 'bg-blue-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Payment Requests</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
  
        <table className="min-w-full divide-y divide-gray-200">
    
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          

          <tbody className="bg-white divide-y divide-gray-200">
            {paymentData.map((payment, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.status}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.paymentType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(payment.requestStatus)}`}>
                    {payment.requestStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentRequestsPage;