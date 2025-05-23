
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, ChevronRight, Trophy } from 'lucide-react';

// Simulated challenge data
const challenges = [
  {
    id: 1,
    title: "10K Steps Daily",
    description: "Walk at least 10,000 steps every day for a month",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Walking",
    difficulty: "Easy",
    participants: 1248,
    duration: "30 days",
    featured: true
  },
  {
    id: 2,
    title: "Summer Body Challenge",
    description: "Complete daily strength workouts to get ready for summer",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Strength",
    difficulty: "Medium",
    participants: 856,
    duration: "60 days",
    featured: false
  },
  {
    id: 3,
    title: "Marathon Prep",
    description: "Progressive running program to prepare for a full marathon",
    image: "https://images.unsplash.com/photo-1510593568701-403e83a2a3e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Running",
    difficulty: "Hard",
    participants: 642,
    duration: "16 weeks",
    featured: false
  }
];

export function ChallengeShowcase() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-base font-semibold text-strava-orange">Featured Challenges</h2>
            <h3 className="mt-2 text-3xl font-bold text-gray-900">Popular right now</h3>
          </div>
          <Link to="/challenges" className="text-strava-orange hover:text-strava-orangeDark font-medium flex items-center">
            View all
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="challenge-card group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={challenge.image} 
                  alt={challenge.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <Badge 
                    className={`
                      ${challenge.difficulty === 'Easy' ? 'bg-green-500' : 
                        challenge.difficulty === 'Medium' ? 'bg-yellow-500' : 
                        'bg-red-500'} 
                      text-white hover:opacity-90`
                    }
                  >
                    {challenge.difficulty}
                  </Badge>
                </div>
                {challenge.featured && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-strava-orange text-white">
                      <Trophy className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="outline" className="bg-gray-100 text-gray-600">
                    {challenge.category}
                  </Badge>
                  <div className="flex items-center text-xs text-gray-500">
                    <Users className="h-3 w-3 mr-1" />
                    <span>{challenge.participants.toLocaleString()} participants</span>
                  </div>
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">{challenge.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{challenge.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{challenge.duration}</span>
                  </div>
                  <Link to={`/challenge/${challenge.id}`}>
                    <Button size="sm" className="strava-button">
                      View details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
