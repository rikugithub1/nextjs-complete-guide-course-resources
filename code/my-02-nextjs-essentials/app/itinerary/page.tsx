// app/itinerary/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Plane, MapPin, Calendar, DollarSign, Clock, 
  ChevronDown, ChevronUp, ExternalLink, Download,
  Coffee, Utensils, Hotel, Camera, ShoppingBag,
  ArrowLeft, Share2, Heart, Navigation
} from 'lucide-react';

interface Activity {
  time: string;
  title: string;
  description: string;
  type: 'food' | 'activity' | 'transport' | 'accommodation';
  cost: number;
  duration: string;
  location: string;
  mapLink?: string;
  bookingLink?: string;
}

interface DayItinerary {
  day: number;
  date: string;
  title: string;
  activities: Activity[];
  totalCost: number;
}

export default function ItineraryPage() {
  const [tripData, setTripData] = useState<any>(null);
  const [expandedDays, setExpandedDays] = useState<number[]>([1]);
  const [saved, setSaved] = useState(false);

  // Generate mock itinerary based on trip data
  const generateItinerary = (data: any): DayItinerary[] => {
    if (!data) return [];
    
    const days = Math.ceil(
      (new Date(data.endDate).getTime() - new Date(data.startDate).getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;
    
    const dailyBudget = parseInt(data.budget) / days;
    const itinerary: DayItinerary[] = [];

    for (let i = 0; i < days; i++) {
      const currentDate = new Date(data.startDate);
      currentDate.setDate(currentDate.getDate() + i);
      
      const dayActivities: Activity[] = [
        {
          time: '09:00',
          title: 'Breakfast at Local Café',
          description: 'Start your day with authentic local breakfast and fresh coffee',
          type: 'food',
          cost: dailyBudget * 0.1,
          duration: '1 hour',
          location: 'City Center',
          mapLink: 'https://maps.google.com',
          bookingLink: 'https://example.com'
        },
        {
          time: '10:30',
          title: i % 2 === 0 ? 'Historical Site Tour' : 'Museum Visit',
          description: 'Explore the rich cultural heritage and history',
          type: 'activity',
          cost: dailyBudget * 0.2,
          duration: '2 hours',
          location: 'Old Town',
          mapLink: 'https://maps.google.com'
        },
        {
          time: '13:00',
          title: 'Lunch at Traditional Restaurant',
          description: 'Taste authentic local cuisine',
          type: 'food',
          cost: dailyBudget * 0.15,
          duration: '1.5 hours',
          location: 'Restaurant District',
          mapLink: 'https://maps.google.com',
          bookingLink: 'https://example.com'
        },
        {
          time: '15:00',
          title: i % 2 === 0 ? 'Market Shopping' : 'Scenic Walk',
          description: 'Experience local life and pick up souvenirs',
          type: 'activity',
          cost: dailyBudget * 0.1,
          duration: '2 hours',
          location: 'Market Square',
          mapLink: 'https://maps.google.com'
        },
        {
          time: '19:00',
          title: 'Dinner with a View',
          description: 'Enjoy sunset dinner at rooftop restaurant',
          type: 'food',
          cost: dailyBudget * 0.25,
          duration: '2 hours',
          location: 'Downtown',
          mapLink: 'https://maps.google.com',
          bookingLink: 'https://example.com'
        },
        {
          time: '22:00',
          title: 'Return to Hotel',
          description: 'Rest and prepare for tomorrow',
          type: 'accommodation',
          cost: dailyBudget * 0.2,
          duration: 'Overnight',
          location: data.accommodation === 'luxury' ? 'Luxury Hotel' : 'Hotel',
          bookingLink: 'https://example.com'
        }
      ];

      itinerary.push({
        day: i + 1,
        date: currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
        title: i === 0 ? 'Arrival & City Exploration' : i === days - 1 ? 'Last Day & Departure' : `Day ${i + 1} Adventures`,
        activities: dayActivities,
        totalCost: dayActivities.reduce((sum, act) => sum + act.cost, 0)
      });
    }

    return itinerary;
  };

  useEffect(() => {
    const data = sessionStorage.getItem('tripData');
    if (data) {
      setTripData(JSON.parse(data));
    }
  }, []);

  const itinerary = generateItinerary(tripData);
  const totalBudget = tripData ? parseInt(tripData.budget) : 0;
  const totalPlannedCost = itinerary.reduce((sum, day) => sum + day.totalCost, 0);

  const toggleDay = (day: number) => {
    setExpandedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch(type) {
      case 'food': return Utensils;
      case 'activity': return Camera;
      case 'transport': return Navigation;
      case 'accommodation': return Hotel;
    }
  };

  if (!tripData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No trip data found</h1>
          <Link href="/plan" className="text-blue-600 hover:underline">
            Plan a new trip
          </Link>
        </div>
      </div>
    );
  }

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
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSaved(!saved)}
              className={`p-2 rounded-full transition ${saved ? 'bg-red-100 text-red-600' : 'bg-white text-gray-600'}`}
            >
              <Heart className={`h-5 w-5 ${saved ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 bg-white rounded-full text-gray-600">
              <Share2 className="h-5 w-5" />
            </button>
            <button className="p-2 bg-white rounded-full text-gray-600">
              <Download className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <Link href="/plan" className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Planning</span>
        </Link>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Your {tripData.destination} Itinerary
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            {itinerary.length} days of adventure await you!
          </p>

          {/* Trip Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-blue-600 mb-2">
                <Calendar className="h-5 w-5" />
                <span className="font-semibold">Duration</span>
              </div>
              <p className="text-gray-700">{itinerary.length} Days</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-green-600 mb-2">
                <DollarSign className="h-5 w-5" />
                <span className="font-semibold">Budget</span>
              </div>
              <p className="text-gray-700">${totalBudget}</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-purple-600 mb-2">
                <MapPin className="h-5 w-5" />
                <span className="font-semibold">Destination</span>
              </div>
              <p className="text-gray-700">{tripData.destination}</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-orange-600 mb-2">
                <Clock className="h-5 w-5" />
                <span className="font-semibold">Pace</span>
              </div>
              <p className="text-gray-700 capitalize">{tripData.pace}</p>
            </div>
          </div>

          {/* Budget Breakdown */}
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Estimated Total Cost</p>
                <p className="text-2xl font-bold text-gray-800">${totalPlannedCost.toFixed(0)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Remaining Budget</p>
                <p className="text-2xl font-bold text-green-600">
                  ${(totalBudget - totalPlannedCost).toFixed(0)}
                </p>
              </div>
            </div>
            <div className="mt-4 bg-white rounded-lg h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                style={{ width: `${Math.min((totalPlannedCost / totalBudget) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Map Preview (Placeholder) */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Interactive Map</h2>
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Interactive map showing all {itinerary.reduce((sum, day) => sum + day.activities.length, 0)} locations</p>
              <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
                Open Full Map
              </button>
            </div>
          </div>
        </div>

        {/* Daily Itineraries */}
        <div className="space-y-6">
          {itinerary.map((day) => (
            <div key={day.day} className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <button
                onClick={() => toggleDay(day.day)}
                className="w-full p-8 text-left hover:bg-gray-50 transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Day {day.day}
                      </span>
                      <span className="text-gray-500">{day.date}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">{day.title}</h3>
                    <p className="text-gray-600 mt-2">
                      {day.activities.length} activities • ${day.totalCost.toFixed(0)} estimated cost
                    </p>
                  </div>
                  {expandedDays.includes(day.day) ? 
                    <ChevronUp className="h-6 w-6 text-gray-400" /> : 
                    <ChevronDown className="h-6 w-6 text-gray-400" />
                  }
                </div>
              </button>

              {expandedDays.includes(day.day) && (
                <div className="px-8 pb-8">
                  <div className="space-y-4">
                    {day.activities.map((activity, idx) => {
                      const Icon = getActivityIcon(activity.type);
                      return (
                        <div key={idx} className="flex space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                          <div className="flex-shrink-0">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              activity.type === 'food' ? 'bg-orange-100 text-orange-600' :
                              activity.type === 'activity' ? 'bg-blue-100 text-blue-600' :
                              activity.type === 'transport' ? 'bg-green-100 text-green-600' :
                              'bg-purple-100 text-purple-600'
                            }`}>
                              <Icon className="h-6 w-6" />
                            </div>
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center space-x-3 mb-1">
                                  <span className="text-sm font-semibold text-gray-500">{activity.time}</span>
                                  <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">{activity.duration}</span>
                                </div>
                                <h4 className="font-semibold text-lg text-gray-800 mb-1">{activity.title}</h4>
                                <p className="text-gray-600 text-sm mb-2">{activity.description}</p>
                                <div className="flex items-center space-x-4 text-sm">
                                  <span className="flex items-center space-x-1 text-gray-500">
                                    <MapPin className="h-4 w-4" />
                                    <span>{activity.location}</span>
                                  </span>
                                  <span className="font-semibold text-green-600">${activity.cost.toFixed(0)}</span>
                                </div>
                              </div>
                              <div className="flex flex-col space-y-2">
                                {activity.mapLink && (
                                  <a 
                                    href={activity.mapLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-white rounded-lg hover:bg-blue-50 transition text-blue-600"
                                  >
                                    <MapPin className="h-4 w-4" />
                                  </a>
                                )}
                                {activity.bookingLink && (
                                  <a 
                                    href={activity.bookingLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-white rounded-lg hover:bg-green-50 transition text-green-600"
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-12 bg-white rounded-3xl shadow-xl p-8">
          <h3 className="text-xl font-bold mb-6">Ready to book your trip?</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:shadow-lg transition">
              Book Accommodations
            </button>
            <button className="bg-white border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl hover:border-gray-400 transition">
              Export to Calendar
            </button>
            <button className="bg-white border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl hover:border-gray-400 transition">
              Share Itinerary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}