// app/page.tsx
import Link from 'next/link';
import { Plane, MapPin, Calendar, DollarSign, Sparkles } from 'lucide-react';
// import '@/components'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Plane className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TravelAI
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/plan" className="text-gray-600 hover:text-gray-900 transition">
              Plan Trip
            </Link>
            <Link href="/saved" className="text-gray-600 hover:text-gray-900 transition">
              Saved Trips
            </Link>
            <Link 
              href="/plan" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold">AI-Powered Travel Planning</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Your Perfect Trip,
            <br />Planned in Seconds
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Tell us your budget and interests, and our AI will create a personalized daily itinerary 
            complete with maps, booking links, and local recommendations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/plan"
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Start Planning</span>
              <Plane className="h-5 w-5 group-hover:translate-x-1 transition" />
            </Link>
            <button className="bg-white text-gray-700 px-8 py-4 rounded-full text-lg font-semibold border border-gray-200 hover:border-gray-300 hover:shadow-lg transition">
              Watch Demo
            </button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {['No Planning Stress', 'Save Hours', 'Local Insights', 'Budget Optimized'].map((feature) => (
              <span key={feature} className="bg-white px-4 py-2 rounded-full text-sm text-gray-700 shadow-md">
                ✨ {feature}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
            <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <DollarSign className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Budget-Smart Planning</h3>
            <p className="text-gray-600">
              Set your budget and we'll maximize every dollar with smart recommendations and cost breakdowns.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
            <div className="bg-purple-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <MapPin className="h-7 w-7 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Interactive Maps</h3>
            <p className="text-gray-600">
              Visual itineraries with all locations mapped out, including travel times and routes.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
            <div className="bg-green-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <Calendar className="h-7 w-7 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Day-by-Day Itinerary</h3>
            <p className="text-gray-600">
              Perfectly timed daily schedules with activities, meals, and rest periods balanced.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Trips Planned</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">180+</div>
              <div className="text-blue-100">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9⭐</div>
              <div className="text-blue-100">User Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Plane className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-bold text-gray-800">TravelAI</span>
          </div>
          <div className="text-gray-600 text-sm">
            © 2024 TravelAI. Making travel planning effortless.
          </div>
        </div>
      </footer>
    </div>
  );
}