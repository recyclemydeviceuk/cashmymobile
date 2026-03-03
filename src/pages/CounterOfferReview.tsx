import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, Package, Calendar, PoundSterling, AlertCircle, Loader2, MessageCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import * as counterOfferApi from '../api/counterOffers';

export default function CounterOfferReview() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [counterOffer, setCounterOffer] = useState<any>(null);
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState('');
  const [showDeclineForm, setShowDeclineForm] = useState(false);
  const [declineFeedback, setDeclineFeedback] = useState('');
  const [success, setSuccess] = useState<'accepted' | 'declined' | null>(null);

  useEffect(() => {
    fetchCounterOffer();
  }, [token]);

  const fetchCounterOffer = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await counterOfferApi.getCounterOfferByToken(token!);
      console.log('Counter offer API response:', response);
      
      // Handle both response structures
      const counterOfferData = response.data?.counterOffer || response.counterOffer;
      const orderData = response.data?.counterOffer?.orderId || response.counterOffer?.orderId;
      
      if (counterOfferData) {
        setCounterOffer(counterOfferData);
        setOrder(orderData);
      } else {
        setError(response.message || 'Counter offer not found');
      }
    } catch (err: any) {
      console.error('Error fetching counter offer:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load counter offer');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async () => {
    try {
      setSubmitting(true);
      await counterOfferApi.acceptCounterOffer(token!);
      setSuccess('accepted');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to accept counter offer');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDecline = async () => {
    if (!window.confirm('Are you sure you want to decline this counter offer? Your order will be cancelled and your device will be returned.')) {
      return;
    }

    try {
      setSubmitting(true);
      await counterOfferApi.declineCounterOffer(token!, declineFeedback);
      setSuccess('declined');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to decline counter offer');
    } finally {
      setSubmitting(false);
    }
  };

  const isExpired = counterOffer && new Date() > new Date(counterOffer.expiresAt);
  const expiryDate = counterOffer ? new Date(counterOffer.expiresAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-red-600" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !counterOffer) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center">
            <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Counter Offer Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'This counter offer link is invalid or has expired.'}</p>
            <button
              onClick={() => navigate('/')}
              className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all"
            >
              Go to Homepage
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-2xl w-full">
            <div className={`${success === 'accepted' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'} border rounded-2xl p-8 text-center`}>
              {success === 'accepted' ? (
                <>
                  <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">Counter Offer Accepted!</h1>
                  <p className="text-gray-600 text-lg mb-6">
                    Thank you for accepting our revised offer of <strong>£{counterOffer.revisedPrice.toFixed(2)}</strong>
                  </p>
                  <div className="bg-white rounded-xl p-6 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Next Steps:</h3>
                    <ul className="text-left text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span>We will process your order with the new agreed price</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span>You'll receive payment confirmation when the order is completed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span>Funds will be transferred within 3-5 business days</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => navigate('/')}
                    className="bg-red-600 text-white px-8 py-3 rounded-xl hover:bg-red-700 transition-all font-semibold"
                  >
                    Back to Homepage
                  </button>
                </>
              ) : (
                <>
                  <XCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">Counter Offer Declined</h1>
                  <p className="text-gray-600 text-lg mb-6">
                    We understand your decision. Your order has been cancelled and your device will be returned to you.
                  </p>
                  <div className="bg-white rounded-xl p-6 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">What Happens Next:</h3>
                    <ul className="text-left text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 mt-1">•</span>
                        <span>Your device will be prepared for return shipping</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 mt-1">•</span>
                        <span>You'll receive tracking information once shipped</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 mt-1">•</span>
                        <span>Please allow 5-7 business days for delivery</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                    <a
                      href="https://wa.me/447742692367"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all font-semibold"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Discuss on WhatsApp
                    </a>
                    <button
                      onClick={() => navigate('/')}
                      className="bg-red-600 text-white px-8 py-3 rounded-xl hover:bg-red-700 transition-all font-semibold"
                    >
                      Back to Homepage
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (counterOffer.status !== 'PENDING' || isExpired) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center">
            <AlertCircle className="w-16 h-16 text-amber-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isExpired ? 'Counter Offer Expired' : 'Already Responded'}
            </h1>
            <p className="text-gray-600 mb-6">
              {isExpired 
                ? 'This counter offer has expired and is no longer available.'
                : 'You have already responded to this counter offer.'}
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all"
            >
              Go to Homepage
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <div className="flex-1 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-center text-white mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Counter Offer Received</h1>
            <p className="text-lg opacity-95">Order #{counterOffer.orderNumber}</p>
          </div>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Order Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Customer</p>
                <p className="font-semibold text-gray-900">{order.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Device</p>
                <p className="font-semibold text-gray-900">{order.deviceName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-900">{order.customerEmail}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Created</p>
                <p className="font-semibold text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Action Required Box */}
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-bold text-green-800 mb-2 text-center">
              Action Required - Review Within 7 Days
            </h2>
            <p className="text-green-700 text-center">
              Please review and respond to this offer to proceed with your order
            </p>
          </div>

          {/* Price Comparison */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Original Offer</p>
                <p className="text-3xl font-bold text-gray-700 flex items-center justify-center gap-1">
                  <PoundSterling className="w-7 h-7" />
                  {counterOffer.originalPrice.toFixed(2)}
                </p>
              </div>
              <div className="text-center border-l-2 border-amber-300">
                <p className="text-sm text-green-700 mb-2 font-semibold">Revised Offer</p>
                <p className="text-3xl font-bold text-green-600 flex items-center justify-center gap-1">
                  <PoundSterling className="w-7 h-7" />
                  {counterOffer.revisedPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Reason */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-3">Reason for Adjustment:</h3>
            <p className="text-gray-700 leading-relaxed">{counterOffer.reason}</p>
          </div>

          {/* Device Images */}
          {counterOffer.deviceImages?.length > 0 && (
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4">Device Images ({counterOffer.deviceImages.length})</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {counterOffer.deviceImages.map((img: any, idx: number) => (
                  <img
                    key={idx}
                    src={img.url}
                    alt={`Device ${idx + 1}`}
                    className="w-full h-40 object-cover rounded-lg border border-gray-200"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Expiry Warning */}
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 mb-8 text-center">
            <p className="text-red-700 font-semibold flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              This offer expires on {expiryDate}
            </p>
          </div>

          {/* Action Buttons */}
          {!showDeclineForm ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleAccept}
                disabled={submitting}
                className="bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition-all font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                Accept Offer
              </button>
              <button
                onClick={() => setShowDeclineForm(true)}
                disabled={submitting}
                className="bg-white border-2 border-red-600 text-red-600 px-8 py-4 rounded-xl hover:bg-red-50 transition-all font-bold text-lg flex items-center justify-center gap-2"
              >
                <XCircle className="w-5 h-5" />
                Decline Offer
              </button>
            </div>
          ) : (
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Declining Counter Offer</h3>
              <p className="text-gray-600 text-sm mb-4">
                Please let us know why you are declining this offer (optional)
              </p>
              <textarea
                value={declineFeedback}
                onChange={(e) => setDeclineFeedback(e.target.value)}
                placeholder="Your feedback (optional)..."
                rows={4}
                className="w-full border border-gray-300 rounded-xl p-3 mb-4 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleDecline}
                  disabled={submitting}
                  className="flex-1 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <XCircle className="w-5 h-5" />}
                  Confirm Decline
                </button>
                <button
                  onClick={() => setShowDeclineForm(false)}
                  disabled={submitting}
                  className="px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
}
