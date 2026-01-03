// app/api/generate-itinerary/route.ts
import { NextRequest, NextResponse } from 'next/server';

// This is a mock API route. In production, you would integrate with OpenAI, Claude, or another AI service
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      destination, 
      startDate, 
      endDate, 
      budget, 
      travelers, 
      selectedInterests, 
      accommodation, 
      pace 
    } = body;

    // Calculate number of days
    const days = Math.ceil(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;
    
    const dailyBudget = parseInt(budget) / days;

    // In production, you would call an AI service here
    // For example, with OpenAI:
    /*
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a travel planning assistant. Create a detailed ${days}-day itinerary for ${destination} 
                   with a budget of $${budget} for ${travelers} travelers. 
                   Interests include: ${selectedInterests.join(', ')}. 
                   Accommodation preference: ${accommodation}. 
                   Travel pace: ${pace}.
                   Return a structured JSON response with daily activities, costs, and recommendations.`
        },
        {
          role: "user",
          content: "Generate the itinerary"
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const aiResponse = JSON.parse(completion.choices[0].message.content);
    */

    // Mock response for demonstration
    const itinerary = generateMockItinerary(
      days, 
      dailyBudget, 
      destination, 
      selectedInterests, 
      accommodation,
      pace
    );

    return NextResponse.json({
      success: true,
      itinerary,
      metadata: {
        totalDays: days,
        totalBudget: parseInt(budget),
        dailyBudget,
        destination,
        travelers
      }
    });
  } catch (error) {
    console.error('Error generating itinerary:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate itinerary' },
      { status: 500 }
    );
  }
}

function generateMockItinerary(
  days: number, 
  dailyBudget: number, 
  destination: string,
  interests: string[],
  accommodation: string,
  pace: string
) {
  const itinerary = [];
  
  // Activity templates based on interests
  const activityTemplates = {
    culture: [
      { name: 'Historical Museum Visit', cost: 0.15, duration: '2 hours' },
      { name: 'Art Gallery Tour', cost: 0.12, duration: '1.5 hours' },
      { name: 'Traditional Performance', cost: 0.18, duration: '2 hours' }
    ],
    nature: [
      { name: 'National Park Hike', cost: 0.1, duration: '3 hours' },
      { name: 'Botanical Gardens', cost: 0.08, duration: '2 hours' },
      { name: 'Scenic Viewpoint', cost: 0.05, duration: '1 hour' }
    ],
    food: [
      { name: 'Local Food Market Tour', cost: 0.2, duration: '2 hours' },
      { name: 'Cooking Class', cost: 0.25, duration: '3 hours' },
      { name: 'Restaurant Hopping', cost: 0.3, duration: '3 hours' }
    ],
    beach: [
      { name: 'Beach Day', cost: 0.05, duration: '4 hours' },
      { name: 'Water Sports', cost: 0.3, duration: '2 hours' },
      { name: 'Sunset Cruise', cost: 0.25, duration: '2 hours' }
    ],
    adventure: [
      { name: 'Zip-lining', cost: 0.35, duration: '3 hours' },
      { name: 'Rock Climbing', cost: 0.3, duration: '2 hours' },
      { name: 'Mountain Biking', cost: 0.25, duration: '3 hours' }
    ]
  };

  // Determine activities per day based on pace
  const activitiesPerDay = pace === 'packed' ? 6 : pace === 'moderate' ? 4 : 3;

  for (let i = 0; i < days; i++) {
    const dayActivities = [];
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + i);
    
    // Select activities based on interests
    let selectedActivities = [];
    interests.forEach(interest => {
      if (activityTemplates[interest as keyof typeof activityTemplates]) {
        selectedActivities.push(...activityTemplates[interest as keyof typeof activityTemplates]);
      }
    });
    
    // If no specific interests, use default activities
    if (selectedActivities.length === 0) {
      selectedActivities = activityTemplates.culture;
    }
    
    // Generate day schedule
    const times = ['09:00', '11:00', '14:00', '16:00', '19:00', '21:00'];
    
    for (let j = 0; j < Math.min(activitiesPerDay, times.length); j++) {
      const activity = selectedActivities[j % selectedActivities.length];
      dayActivities.push({
        time: times[j],
        title: activity.name,
        description: `Experience the best of ${destination}`,
        type: j === 2 || j === 4 ? 'food' : 'activity',
        cost: dailyBudget * activity.cost,
        duration: activity.duration,
        location: `${destination} City Center`,
        tips: 'Book in advance for better prices'
      });
    }
    
    // Add accommodation
    dayActivities.push({
      time: '22:00',
      title: accommodation === 'luxury' ? 'Luxury Hotel' : accommodation === 'budget' ? 'Hostel' : 'Hotel',
      description: 'Rest for the night',
      type: 'accommodation',
      cost: dailyBudget * 0.3,
      duration: 'Overnight',
      location: `${destination} Downtown`
    });
    
    itinerary.push({
      day: i + 1,
      date: currentDate.toISOString().split('T')[0],
      title: i === 0 ? 'Arrival Day' : i === days - 1 ? 'Departure Day' : `Exploring ${destination}`,
      activities: dayActivities,
      totalCost: dayActivities.reduce((sum, act) => sum + act.cost, 0),
      weather: { temp: 22, condition: 'Partly Cloudy' },
      tips: [
        'Start early to avoid crowds',
        'Keep hydrated throughout the day',
        'Have local emergency numbers saved'
      ]
    });
  }
  
  return itinerary;
}