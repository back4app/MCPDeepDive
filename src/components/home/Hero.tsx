
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Activity, Award, Users } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-strava-grayLight rounded-bl-[80px] opacity-50"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className="pt-16 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <span className="inline-flex items-center text-sm font-semibold bg-strava-orange/10 text-strava-orange rounded-full px-3 py-1">
                  <Activity className="h-4 w-4 mr-1" />
                  Fitness Challenges 2025
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                <span className="block">Achieve your</span>
                <span className="block text-strava-orange">fitness goals together</span>
              </h1>
              
              <p className="mt-6 text-lg text-gray-600 max-w-3xl">
                Create, join, and track fitness challenges with friends. Compete on leaderboards,
                earn badges, and get personalized suggestions based on your performance.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <Link to="/signup">
                  <Button className="w-full sm:w-auto strava-button text-base py-6 px-8">
                    Get started 
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                
                <Link to="/challenges">
                  <Button variant="outline" className="w-full sm:w-auto text-base py-6 px-8">
                    Explore challenges
                  </Button>
                </Link>
              </div>
              
              <div className="pt-4 grid grid-cols-3 gap-4">
                <div className="text-center md:text-left">
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-500">Active challenges</div>
                </div>
                
                <div className="text-center md:text-left">
                  <div className="text-2xl font-bold text-gray-900">15k+</div>
                  <div className="text-sm text-gray-500">Community members</div>
                </div>
                
                <div className="text-center md:text-left">
                  <div className="text-2xl font-bold text-gray-900">30+</div>
                  <div className="text-sm text-gray-500">Unique badges</div>
                </div>
              </div>
            </div>
            
            <div className="relative hidden md:block">
              <div className="relative h-[500px] w-[400px] mx-auto">
                <div className="absolute top-0 right-0 h-80 w-64 rounded-xl bg-strava-orange/10 transform rotate-6 shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
                    alt="Running challenge" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 h-80 w-64 rounded-xl bg-strava-blue/10 transform -rotate-6 shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1434596922112-19c563067271?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
                    alt="Cycling challenge" 
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
