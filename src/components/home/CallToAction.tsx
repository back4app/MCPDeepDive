
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Award, ChevronRight } from 'lucide-react';

export function CallToAction() {
  return (
    <div className="bg-strava-orange">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center mb-4">
              <Award className="h-8 w-8 text-white" />
              <div className="ml-4 text-sm font-semibold text-white/80 uppercase tracking-wide">
                Join our community today
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to take your fitness journey to the next level?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Create an account now to join challenges, track your progress, and connect with fitness enthusiasts just like you.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/signup">
                <Button className="w-full sm:w-auto bg-white text-strava-orange hover:bg-gray-100 border-white text-base py-6 px-8">
                  Get started for free
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/challenges">
                <Button variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white/10 text-base py-6 px-8">
                  Browse challenges
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            <div className="relative mx-auto w-full max-w-md">
              <div className="aspect-w-4 aspect-h-3 relative rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" 
                  alt="People running together" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-white rounded-lg p-4 shadow-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-gray-900">Summer Run Club</h3>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>🏃‍♀️ 1.2k participants</span>
                      <span className="mx-2">•</span>
                      <span>🔥 3 days left</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -left-4 -bottom-8 bg-white rounded-lg shadow-lg p-4 w-48">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                      alt="Avatar" 
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      New Badge Earned!
                    </p>
                    <p className="text-xs text-gray-500">
                      "Early Bird Runner"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
