
import React from 'react';

const steps = [
  {
    id: '01',
    title: 'Create your account',
    description: 'Sign up with your email or social accounts to get started.',
  },
  {
    id: '02',
    title: 'Join or create challenges',
    description: 'Browse available challenges or create your own with custom goals.',
  },
  {
    id: '03',
    title: 'Track your progress',
    description: 'Log your daily activities and see how you\'re improving over time.',
  },
  {
    id: '04',
    title: 'Earn rewards',
    description: 'Complete challenges to earn points and unlock achievement badges.',
  },
];

export function HowItWorks() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-strava-orange">How It Works</h2>
          <p className="mt-2 text-3xl font-bold text-gray-900">Four simple steps to get started</p>
        </div>
        
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-24 left-0 right-0 h-0.5 bg-gray-100 hidden md:block" aria-hidden="true"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.id} className="relative">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-strava-orange bg-white text-strava-orange font-bold z-10">
                    {step.id}
                  </div>
                  <h3 className="mt-6 text-xl font-medium text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 text-center">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
