// app/plan/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Plane, MapPin, Calendar, DollarSign, Heart, Mountain, 
  Utensils, Building, Trees, Waves, Camera, Music,
  ArrowRight, Loader2, Plus, X
} from 'lucide-react';

const interests = [
  { id: 'culture', label: 'Culture', icon: Building },
  { id: 'nature', label: 'Nature', icon: Trees },
  { id: 'beach', label: 'Beach', icon: Waves },
  { id: 'adventure', label: 'Adventure', icon: Mountain },
  { id: 'food', label: 'Food', icon: Utensils },
  { id: 'photography', label: 'Photography', icon: Camera },
  { id: 'nightlife', label: 'Nightlife', icon: Music },
  { id: 'shopping', label: 'Shopping', icon: Heart },
];

export default function PlanTripPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    travelers: '1',
    selectedInterests: [] as string[],
    accommodation: 'hotel',
    pace: 'moderate'
  });

  const toggleInterest = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedInterests: prev.selectedInterests.includes(interestId)
        ? prev.selectedInterests.filter(id => id !== interestId)
        : [...prev.selectedInterests, interestId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Store form data in sessionStorage for the itinerary page
      sessionStorage.setItem('tripData', JSON.stringify(formData));
      router.push('/itinerary');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Plane className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TravelAI
            </span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Plan Your Perfect Trip
          </h1>
          <p className="text-xl text-gray-600">
            Tell us about your dream vacation and let AI handle the rest
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          {/* Destination */}
          <div className="mb-8">
            <label className="flex items-center space-x-2 text-lg font-semibold text-gray-700 mb-3">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span>Where do you want to go?</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Tokyo, Japan"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={formData.destination}
              onChange={(e) => setFormData({...formData, destination: e.target.value})}
            />
          </div>

          {/* Dates */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="flex items-center space-x-2 text-lg font-semibold text-gray-700 mb-3">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span>Start Date</span>
              </label>
              <input
                type="date"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              />
            </div>
            <div>
              <label className="flex items-center space-x-2 text-lg font-semibold text-gray-700 mb-3">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span>End Date</span>
              </label>
              <input
                type="date"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              />
            </div>
          </div>

          {/* Budget and Travelers */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="flex items-center space-x-2 text-lg font-semibold text-gray-700 mb-3">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <span>Total Budget (USD)</span>
              </label>
              <input
                type="number"
                required
                placeholder="e.g., 3000"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
              />
            </div>
            <div>
              <label className="text-lg font-semibold text-gray-700 mb-3 block">
                Number of Travelers
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={formData.travelers}
                onChange={(e) => setFormData({...formData, travelers: e.target.value})}
              >
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="5+">5+ People</option>
              </select>
            </div>
          </div>

          {/* Interests */}
          <div className="mb-8">
            <label className="text-lg font-semibold text-gray-700 mb-3 block">
              What are your interests? (Select all that apply)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {interests.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleInterest(id)}
                  className={`p-3 rounded-xl border-2 transition flex flex-col items-center space-y-2 ${
                    formData.selectedInterests.includes(id)
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Accommodation Type */}
          <div className="mb-8">
            <label className="text-lg font-semibold text-gray-700 mb-3 block">
              Preferred Accommodation
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'budget', label: 'Budget' },
                { value: 'hotel', label: 'Hotel' },
                { value: 'luxury', label: 'Luxury' }
              ].map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFormData({...formData, accommodation: value})}
                  className={`py-3 px-4 rounded-xl border-2 transition font-medium ${
                    formData.accommodation === value
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Travel Pace */}
          <div className="mb-10">
            <label className="text-lg font-semibold text-gray-700 mb-3 block">
              Travel Pace
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'relaxed', label: 'Relaxed', desc: 'Few activities' },
                { value: 'moderate', label: 'Moderate', desc: 'Balanced' },
                { value: 'packed', label: 'Packed', desc: 'Many activities' }
              ].map(({ value, label, desc }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFormData({...formData, pace: value})}
                  className={`py-3 px-4 rounded-xl border-2 transition ${
                    formData.pace === value
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{label}</div>
                  <div className="text-xs mt-1 opacity-70">{desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || formData.selectedInterests.length === 0}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Creating Your Itinerary...</span>
              </>
            ) : (
              <>
                <span>Generate AI Itinerary</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}