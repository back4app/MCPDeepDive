
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    content: "This platform has completely changed my workout routine. The challenges keep me motivated, and the social aspect makes fitness fun again!",
    author: "Sarah Johnson",
    role: "Marathon Runner",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    content: "I've tried many fitness apps, but this one stands out. The leaderboards drive my competitive side, and I've made real progress in just a few weeks.",
    author: "Michael Chen",
    role: "CrossFit Enthusiast",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    content: "The badges and achievements system is addictive! I've found myself going for 'just one more workout' more times than I can count.",
    author: "Emma Rodriguez",
    role: "Yoga Instructor",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
];

export function Testimonials() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-base font-semibold text-strava-orange">Testimonials</h2>
          <h3 className="mt-2 text-3xl font-bold text-gray-900">What our community is saying</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="relative bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="mt-4 text-gray-600">"{testimonial.content}"</p>
              
              <div className="mt-6 flex items-center">
                <img 
                  className="h-10 w-10 rounded-full" 
                  src={testimonial.avatar} 
                  alt={`Avatar of ${testimonial.author}`} 
                />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">{testimonial.author}</h4>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
