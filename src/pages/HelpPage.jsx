import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare, PhoneCall, Mail, Search } from 'lucide-react';
import { Toast } from '../components/common/Toast';

export const HelpPage = () => {
  const [activeCategory, setActiveCategory] = useState('orders');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', text: 'Hello! I am FOODLY Support Assistant. How can I help you today?' }
  ]);
  const [toastMsg, setToastMsg] = useState('');

  const faqCategories = [
    { id: 'orders', name: 'Order Issues' },
    { id: 'payments', name: 'Payments & Refunds' },
    { id: 'account', name: 'Account & Profile' },
    { id: 'delivery', name: 'Delivery Executive' },
    { id: 'membership', name: 'Foodly One' }
  ];

  const faqs = {
    orders: [
      {
        q: "What if my food order is delayed?",
        a: "We strive to deliver every order within 25-35 minutes. You can track your rider's real-time position on the Order Tracking screen. If the delay exceeds 15 minutes past estimated time, our support team automatically initiates a ₹50 delay credit."
      },
      {
        q: "Can I cancel my order after placing it?",
        a: "Order cancellation is available within 60 seconds of placing your order directly from the Orders tab. After 60 seconds, the restaurant begins cooking your meal, so cancellation charges may apply."
      },
      {
        q: "An item was missing or incorrect in my delivered food.",
        a: "We sincerely apologize! Please go to your Orders tab, tap 'Need Help' on the order, select the missing item, and upload a photo. We will immediately process a refund or send a fresh replacement."
      }
    ],
    payments: [
      {
        q: "How long does a refund take for failed payments or order cancellations?",
        a: "UPI refunds are processed instantly back to your bank account or UPI VPA within 15-30 minutes. Credit/Debit card refunds reflect in 3-5 business days."
      },
      {
        q: "My payment was deducted but order was not confirmed.",
        a: "Do not worry! If an order fails after payment deduction, your bank automatically reverses the amount within 2 hours. You can also chat with our support agent to verify payment status."
      },
      {
        q: "How do I apply coupon codes?",
        a: "On the Cart screen before payment, click 'Apply Coupon'. Select from available offers or type code like FOODLY50 and tap Apply."
      }
    ],
    account: [
      {
        q: "How do I update my mobile number or delivery address?",
        a: "Go to your Profile tab. You can add new home or work addresses, set default address, or edit your email and profile details."
      },
      {
        q: "Is my personal data and payment information safe?",
        a: "Yes, FOODLY uses 256-bit SSL encryption and strict PCI-DSS compliant payment gateways. We never store CVV or card PINs."
      }
    ],
    delivery: [
      {
        q: "How do I contact my delivery executive?",
        a: "Once your order status changes to 'Out for Delivery', a 'Call Partner' button appears on your active order screen with direct contact info."
      },
      {
        q: "Is no-contact delivery available?",
        a: "Yes! You can add delivery instructions during checkout like 'Leave order at security desk / door'."
      }
    ],
    membership: [
      {
        q: "What benefits do I get with FOODLY One?",
        a: "FOODLY One members enjoy Unlimited Free Delivery on orders above ₹149, extra 10% discounts on top restaurants, and priority customer support."
      }
    ]
  };

  const currentFaqs = faqs[activeCategory] || faqs.orders;

  const filteredFaqs = searchQuery.trim()
    ? Object.values(faqs).flat().filter(item =>
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentFaqs;

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userText = chatMessage;
    setChatHistory(prev => [...prev, { sender: 'user', text: userText }]);
    setChatMessage('');

    setTimeout(() => {
      setChatHistory(prev => [
        ...prev,
        { sender: 'bot', text: `Thanks for messaging us regarding "${userText}". Our customer support executive is looking into your account and will reply shortly.` }
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {toastMsg && <Toast message={toastMsg} type="info" onClose={() => setToastMsg('')} />}

      {/* Hero Banner */}
      <div className="bg-gray-900 text-white py-10 px-4 sm:px-6 lg:px-8 mb-8 shadow-sm">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center mx-auto text-white shadow-xs">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h1 className="text-xl sm:text-3xl font-semibold tracking-tight">
            How can we help you?
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 font-normal max-w-lg mx-auto">
            Search our knowledge base or chat with our 24/7 customer support team
          </p>

          {/* Search Box */}
          <div className="relative max-w-xl mx-auto pt-2">
            <Search className="w-4 h-4 absolute left-4 top-4.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search help articles, refunds, delivery issues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-xs font-normal text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors shadow-inner"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 space-y-7">
        
        {/* Quick Contact Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => setIsChatOpen(true)}
            className="p-4 bg-white rounded-3xl border border-gray-100 shadow-2xs hover:shadow-sm transition-all flex items-center gap-3.5 text-left cursor-pointer group"
          >
            <div className="p-2.5 bg-orange-100 text-orange-600 rounded-2xl group-hover:scale-105 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-gray-800">Live Support Chat</div>
              <div className="text-xs text-gray-500 font-normal">Average response &lt; 2 mins</div>
            </div>
          </button>

          <a
            href="tel:18001234567"
            className="p-4 bg-white rounded-3xl border border-gray-100 shadow-2xs hover:shadow-sm transition-all flex items-center gap-3.5 text-left cursor-pointer group"
          >
            <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-2xl group-hover:scale-105 transition-transform">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-gray-800">Toll Free Helpline</div>
              <div className="text-xs text-gray-500 font-normal">1800-FOODLY-CARE</div>
            </div>
          </a>

          <a
            href="mailto:support@foodly.com"
            className="p-4 bg-white rounded-3xl border border-gray-100 shadow-2xs hover:shadow-sm transition-all flex items-center gap-3.5 text-left cursor-pointer group"
          >
            <div className="p-2.5 bg-blue-100 text-blue-600 rounded-2xl group-hover:scale-105 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-gray-800">Email Support</div>
              <div className="text-xs text-gray-500 font-normal">support@foodly.com</div>
            </div>
          </a>
        </div>

        {/* FAQs Section */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs space-y-5">
          <h2 className="text-lg font-semibold text-gray-800">Frequently Asked Questions</h2>

          {/* Category Tabs */}
          {!searchQuery && (
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1" style={{ scrollbarWidth: 'none' }}>
              {faqCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenFaqIndex(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-orange-500 text-white shadow-2xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}

          {/* Accordion List */}
          <div className="space-y-2.5">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full p-3.5 text-left flex items-center justify-between font-semibold text-xs sm:text-sm text-gray-800 bg-gray-50/50 hover:bg-gray-100 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-orange-500" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>

                  {isOpen && (
                    <div className="p-3.5 text-xs text-gray-600 leading-relaxed bg-white border-t border-gray-100 font-normal">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Live Chat Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden flex flex-col h-[500px]">
            <div className="p-4 bg-orange-500 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                <div>
                  <div className="font-semibold text-sm">FOODLY Support Chat</div>
                  <div className="text-[10px] text-white/80 font-normal">Online 24/7</div>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-white/80 hover:text-white font-medium text-xs">
                CLOSE
              </button>
            </div>

            <div className="p-4 flex-1 overflow-y-auto space-y-3 bg-gray-50 text-xs">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl font-normal ${
                      msg.sender === 'user'
                        ? 'bg-orange-500 text-white rounded-br-none'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-2xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="p-3 bg-white border-t border-gray-100 flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-100 rounded-xl text-xs font-normal focus:outline-none focus:bg-white border border-gray-200"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-xl text-xs hover:bg-orange-600 cursor-pointer"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
