export const mockUser = {
  name: 'Lalit Kumar',
  email: 'lalit@example.com',
  phone: '+91 98765 43210',
  avatar: 'LK',
  addresses: [
    {
      id: 1,
      type: 'Home',
      name: 'Lalit Kumar',
      address: '42, Green Park Colony, Sector 18',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301',
      phone: '+91 98765 43210',
      isDefault: true
    },
    {
      id: 2,
      type: 'Office',
      name: 'Lalit Kumar',
      address: '5th Floor, Tower B, Cyber Hub',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122002',
      phone: '+91 98765 43210',
      isDefault: false
    }
  ],
  orders: [
    {
      id: 'FM2026001',
      date: '2026-08-12',
      status: 'delivered',
      total: 1245,
      items: 8,
      deliveryDate: '2026-08-13'
    },
    {
      id: 'FM2026002',
      date: '2026-08-10',
      status: 'delivered',
      total: 876,
      items: 5,
      deliveryDate: '2026-08-11'
    },
    {
      id: 'FM2026003',
      date: '2026-08-14',
      status: 'preparing',
      total: 2340,
      items: 12,
      deliveryDate: '2026-08-15'
    }
  ]
};

export const deliverySlots = [
  { id: 1, label: 'Express (30 min)', time: '30 minutes', price: 49, icon: '⚡' },
  { id: 2, label: 'Morning', time: '9 AM - 12 PM', price: 0, icon: '🌅' },
  { id: 3, label: 'Afternoon', time: '12 PM - 4 PM', price: 0, icon: '☀️' },
  { id: 4, label: 'Evening', time: '4 PM - 8 PM', price: 0, icon: '🌇' },
  { id: 5, label: 'Night', time: '8 PM - 11 PM', price: 19, icon: '🌙' }
];

export const paymentMethods = [
  { id: 'upi', name: 'UPI', icon: '📱', description: 'GPay, PhonePe, Paytm' },
  { id: 'card', name: 'Credit / Debit Card', icon: '💳', description: 'Visa, Mastercard, RuPay' },
  { id: 'cod', name: 'Cash on Delivery', icon: '💵', description: 'Pay when you receive' },
  { id: 'wallet', name: 'Wallet', icon: '👛', description: 'Amazon Pay, Paytm Wallet' }
];
