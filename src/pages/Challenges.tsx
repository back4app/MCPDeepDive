
import { useState } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Clock, Search, Filter, Lock, Unlock, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Simulated challenge data
const challengesData = [
  {
    id: 1,
    title: "10K Steps Daily",
    description: "Walk at least 10,000 steps every day for a month",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Walking",
    difficulty: "Easy",
    participants: 1248,
    duration: "30 days",
    featured: true,
    privacyType: "public",
    createdAt: "2025-04-15T10:00:00Z"
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
    featured: false,
    privacyType: "public",
    createdAt: "2025-04-10T14:30:00Z"
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
    featured: false,
    privacyType: "public",
    createdAt: "2025-04-05T08:15:00Z"
  },
  {
    id: 4,
    title: "30-Day Push-Up Challenge",
    description: "Increase your push-up count from any starting point over 30 days",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Strength",
    difficulty: "Medium",
    participants: 1823,
    duration: "30 days",
    featured: true,
    privacyType: "public",
    createdAt: "2025-04-01T16:45:00Z"
  },
  {
    id: 5,
    title: "Yoga Flow Journey",
    description: "Daily yoga sessions to improve flexibility and mindfulness",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Yoga",
    difficulty: "Easy",
    participants: 729,
    duration: "21 days",
    featured: false,
    privacyType: "private",
    createdAt: "2025-03-28T11:20:00Z"
  },
  {
    id: 6,
    title: "Mountain Biking Explorer",
    description: "Track your mountain biking adventures and earn badges for distance milestones",
    image: "https://images.unsplash.com/photo-1594807577149-3f3ee0302a0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Cycling",
    difficulty: "Hard",
    participants: 412,
    duration: "90 days",
    featured: false,
    privacyType: "private",
    createdAt: "2025-03-25T09:00:00Z"
  },
  {
    id: 7,
    title: "Team Workout Challenge",
    description: "Join with friends for this team-based workout challenge",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Strength",
    difficulty: "Medium",
    participants: 245,
    duration: "14 days",
    featured: false,
    privacyType: "private",
    createdAt: "2025-03-20T15:30:00Z"
  },
];

const Challenges = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [privacyFilter, setPrivacyFilter] = useState('all');
  const [sortOption, setSortOption] = useState('popular');

  // Filter and sort challenges based on user selections
  const filteredChallenges = challengesData
    .filter(challenge => 
      (searchTerm === '' || 
        challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter === 'all' || challenge.category === categoryFilter) &&
      (difficultyFilter === 'all' || challenge.difficulty === difficultyFilter) &&
      (privacyFilter === 'all' || challenge.privacyType === privacyFilter)
    )
    .sort((a, b) => {
      if (sortOption === 'popular') {
        return b.participants - a.participants;
      } else if (sortOption === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0;
    });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Challenges</h1>
              <p className="text-gray-600 mt-2">Find and join fitness challenges that match your goals.</p>
            </div>
            <Link to="/create-challenge">
              <Button className="strava-button">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Challenge
              </Button>
            </Link>
          </div>
          
          {/* Search and filters */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search challenges..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap md:flex-nowrap gap-2">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Running">Running</SelectItem>
                    <SelectItem value="Walking">Walking</SelectItem>
                    <SelectItem value="Cycling">Cycling</SelectItem>
                    <SelectItem value="Strength">Strength</SelectItem>
                    <SelectItem value="Yoga">Yoga</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Difficulties</SelectItem>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={privacyFilter} onValueChange={setPrivacyFilter}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Privacy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Challenge grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map((challenge) => (
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
                    <div className="flex items-center text-xs text-gray-500 gap-2">
                      {challenge.privacyType === "private" ? (
                        <Badge variant="outline" className="flex items-center gap-1 border-gray-300">
                          <Lock className="h-3 w-3" />
                          Private
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="flex items-center gap-1 border-gray-300">
                          <Unlock className="h-3 w-3" />
                          Public
                        </Badge>
                      )}
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        <span>{challenge.participants.toLocaleString()}</span>
                      </div>
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
          
          {filteredChallenges.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No challenges found</h3>
              <p className="text-gray-600 mt-1">Try adjusting your filters or search term</p>
            </div>
          )}
          
          {/* Create challenge CTA */}
          <div className="mt-12 bg-white border border-gray-200 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Can't find what you're looking for?</h3>
              <p className="text-gray-600 mt-1">Create your own challenge and invite friends to join.</p>
            </div>
            <Link to="/create-challenge" className="mt-4 md:mt-0">
              <Button className="strava-button-secondary">Create a challenge</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Challenges;
