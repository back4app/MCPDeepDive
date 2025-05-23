
import React from 'react';
import { Award, BarChart2, Clock, Heart, Flag, Users } from 'lucide-react';

const features = [
  {
    name: 'Create Custom Challenges',
    description: 'Set up personalized challenges with custom goals, timeframes, and difficulty levels.',
    icon: Flag,
    color: 'bg-green-100 text-green-600',
  },
  {
    name: 'Track Daily Progress',
    description: 'Log your activities and see your improvements over time with detailed statistics.',
    icon: Clock,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    name: 'Compete on Leaderboards',
    description: 'See how you rank against friends and other participants in real-time.',
    icon: BarChart2,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    name: 'Earn Achievement Badges',
    description: 'Get rewarded with exclusive badges for reaching milestones and completing challenges.',
    icon: Award,
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    name: 'Join Group Challenges',
    description: 'Work together with friends toward common fitness goals in collaborative challenges.',
    icon: Users,
    color: 'bg-pink-100 text-pink-600',
  },
  {
    name: 'Get Personalized Suggestions',
    description: 'Receive AI-powered recommendations based on your performance and preferences.',
    icon: Heart,
    color: 'bg-red-100 text-red-600',
  },
];

export function Features() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-strava-orange uppercase tracking-wide">Features</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Everything you need to succeed
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Our platform combines social motivation, gamification and personalized insights to help you stay on track.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div 
                key={feature.name} 
                className="relative p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div>
                  <div className={`inline-flex rounded-lg p-3 ${feature.color}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
