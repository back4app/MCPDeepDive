
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, Clock, Trophy, Calendar, BarChart, CheckCircle, PlusCircle } from 'lucide-react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

// Simulated challenge data - in a real app this would come from an API
const challengesData = [
  {
    id: 1,
    title: "10K Steps Daily",
    description: "Walk at least 10,000 steps every day for a month",
    longDescription: "This challenge is designed to help you build a consistent walking habit. Walking 10,000 steps daily can improve cardiovascular health, boost energy levels, and help with weight management. The goal is simple - reach 10,000 steps each day for 30 consecutive days.",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Walking",
    difficulty: "Easy",
    participants: 1248,
    duration: "30 days",
    startDate: "June 1, 2025",
    endDate: "June 30, 2025",
    rules: [
      "Record at least 10,000 steps daily",
      "Steps must be tracked using a fitness device or app",
      "Complete all 30 days to earn the achievement badge"
    ],
    featured: true
  },
  {
    id: 2,
    title: "Summer Body Challenge",
    description: "Complete daily strength workouts to get ready for summer",
    longDescription: "This 60-day program combines strength training, cardio, and nutrition guidance to help you achieve your summer fitness goals. The workouts progressively increase in intensity, ensuring continued progress throughout the challenge.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Strength",
    difficulty: "Medium",
    participants: 856,
    duration: "60 days",
    startDate: "May 1, 2025",
    endDate: "June 30, 2025",
    rules: [
      "Complete all prescribed workouts each week",
      "Track your progress with before/after photos (optional)",
      "Participate in the community forum for support"
    ],
    featured: false
  },
  {
    id: 3,
    title: "Marathon Prep",
    description: "Progressive running program to prepare for a full marathon",
    longDescription: "This comprehensive 16-week marathon training plan will take you from your current running level to marathon-ready. It includes a mix of short runs, long runs, speed work, and rest days to gradually build your endurance and prepare your body for the 26.2-mile challenge.",
    image: "https://images.unsplash.com/photo-1510593568701-403e83a2a3e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Running",
    difficulty: "Hard",
    participants: 642,
    duration: "16 weeks",
    startDate: "February 15, 2025",
    endDate: "June 5, 2025",
    rules: [
      "Follow the weekly training schedule",
      "Log all runs in the challenge tracker",
      "Participate in at least one group training run (virtual or in-person)"
    ],
    featured: false
  },
  {
    id: 4,
    title: "30-Day Push-Up Challenge",
    description: "Increase your push-up count from any starting point over 30 days",
    longDescription: "This challenge helps you progressively increase your push-up capacity over 30 days. Whether you can do 1 push-up or 50, this program scales to your ability and helps you build upper body strength and endurance through consistent practice.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Strength",
    difficulty: "Medium",
    participants: 1823,
    duration: "30 days",
    startDate: "June 1, 2025",
    endDate: "June 30, 2025",
    rules: [
      "Complete the daily push-up target",
      "Modified push-ups are acceptable if needed",
      "Record your progress in the challenge tracker daily"
    ],
    featured: true
  },
  {
    id: 5,
    title: "Yoga Flow Journey",
    description: "Daily yoga sessions to improve flexibility and mindfulness",
    longDescription: "This 21-day yoga challenge introduces a variety of yoga styles and flows to help improve your flexibility, strength, and mindfulness. Each day features a different 20-30 minute session suitable for all levels, from complete beginners to experienced practitioners.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Yoga",
    difficulty: "Easy",
    participants: 729,
    duration: "21 days",
    startDate: "May 10, 2025",
    endDate: "May 31, 2025",
    rules: [
      "Complete each daily yoga session",
      "Modifications are encouraged for comfort and safety",
      "Take at least one weekly reflection on your practice"
    ],
    featured: false
  },
  {
    id: 6,
    title: "Mountain Biking Explorer",
    description: "Track your mountain biking adventures and earn badges for distance milestones",
    longDescription: "This challenge encourages you to explore new mountain biking trails and accumulate riding distance over 90 days. Set your own distance goals and earn digital badges for hitting milestones. The challenge emphasizes both adventure and consistency in your mountain biking practice.",
    image: "https://images.unsplash.com/photo-1594807577149-3f3ee0302a0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Cycling",
    difficulty: "Hard",
    participants: 412,
    duration: "90 days",
    startDate: "April 1, 2025",
    endDate: "June 30, 2025",
    rules: [
      "Log each mountain biking session",
      "Minimum ride length: 5 miles",
      "Submit at least one photo from each new trail you explore"
    ],
    featured: false
  },
];

const ChallengeDetails = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    // Simulating API call with setTimeout
    const timer = setTimeout(() => {
      const foundChallenge = challengesData.find(c => c.id === Number(id));
      setChallenge(foundChallenge || null);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  const handleJoinChallenge = () => {
    // In a real app, this would make an API call to join the challenge
    toast.success("You've successfully joined the challenge!");
    setJoined(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="h-96 flex items-center justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-6 w-48 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 w-64 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Challenge Not Found</h2>
              <p className="text-gray-600 mb-8">The challenge you're looking for doesn't exist or has been removed.</p>
              <Link to="/challenges">
                <Button>Back to Challenges</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <Link to="/challenges" className="inline-flex items-center text-strava-orange hover:text-strava-orangeDark mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Challenges
          </Link>

          {/* Challenge Header */}
          <div className="relative h-80 rounded-xl overflow-hidden mb-8">
            <img 
              src={challenge.image} 
              alt={challenge.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <div className="flex flex-wrap gap-2 mb-4">
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
                <Badge variant="outline" className="bg-white/90 text-gray-800">
                  {challenge.category}
                </Badge>
                {challenge.featured && (
                  <Badge className="bg-strava-orange text-white">
                    <Trophy className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{challenge.title}</h1>
              <p className="text-white/90 text-lg">{challenge.description}</p>
            </div>
          </div>

          {/* Challenge Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Main Content */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">About This Challenge</h2>
                <p className="text-gray-700 mb-6">{challenge.longDescription}</p>

                <h3 className="text-xl font-semibold mb-3">Challenge Rules</h3>
                <ul className="list-disc pl-6 mb-6">
                  {challenge.rules.map((rule: string, index: number) => (
                    <li key={index} className="text-gray-700 mb-2">{rule}</li>
                  ))}
                </ul>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-strava-orange mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Duration</div>
                      <div className="font-medium">{challenge.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-strava-orange mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Start Date</div>
                      <div className="font-medium">{challenge.startDate}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-strava-orange mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">End Date</div>
                      <div className="font-medium">{challenge.endDate}</div>
                    </div>
                  </div>
                </div>

                {joined && (
                  <div className="mt-8 border-t pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold">Your Progress</h3>
                      <Link to={`/challenge/${id}/log-progress`}>
                        <Button className="bg-purple-600 hover:bg-purple-700">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Log Today's Progress
                        </Button>
                      </Link>
                    </div>
                    <div className="mb-2 flex justify-between items-center">
                      <span className="text-sm font-medium">2 days completed</span>
                      <span className="text-sm text-gray-500">
                        {challenge.duration === "30 days" ? "7%" : challenge.duration === "60 days" ? "3%" : "4%"} Complete
                      </span>
                    </div>
                    <Progress value={challenge.duration === "30 days" ? 7 : challenge.duration === "60 days" ? 3 : 4} className="h-2 mb-6" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center">
                            <CheckCircle className="h-10 w-10 text-green-500 mr-4" />
                            <div>
                              <h4 className="font-medium">Last Activity</h4>
                              <p className="text-sm text-gray-500">Yesterday at 8:34 AM</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center">
                            <BarChart className="h-10 w-10 text-blue-500 mr-4" />
                            <div>
                              <h4 className="font-medium">Next Goal</h4>
                              <p className="text-sm text-gray-500">Complete 5 consecutive days</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              {/* Sidebar */}
              <div className="sticky top-6">
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Users className="h-5 w-5 mr-2 text-gray-500" />
                        <span className="font-medium">{challenge.participants.toLocaleString()} participants</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-gray-500" />
                        <span className="font-medium">{challenge.duration}</span>
                      </div>
                    </div>
                    <div className="text-center">
                      {!joined ? (
                        <Button 
                          className="w-full strava-button text-lg py-6" 
                          onClick={handleJoinChallenge}
                        >
                          Join Challenge
                        </Button>
                      ) : (
                        <>
                          <Button 
                            className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-6 mb-4" 
                            disabled
                          >
                            <CheckCircle className="h-5 w-5 mr-2" />
                            Challenge Joined
                          </Button>
                          <Link to={`/challenge/${id}/log-progress`} className="w-full">
                            <Button className="w-full bg-purple-600 hover:bg-purple-700">
                              <PlusCircle className="h-4 w-4 mr-2" />
                              Log Today's Progress
                            </Button>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-semibold text-lg mb-4">Leaderboard Preview</h3>
                    <div className="space-y-3">
                      {[...Array(5)].map((_, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3 font-medium text-sm">
                            {index + 1}
                          </div>
                          <div className="w-8 h-8 rounded-full bg-blue-100 mr-3"></div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">User {Math.floor(Math.random() * 999)}</div>
                            <div className="text-xs text-gray-500">
                              {Math.floor(Math.random() * 30) + 1} days completed
                            </div>
                          </div>
                          {index === 0 && (
                            <Trophy className="h-5 w-5 text-yellow-500" />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <Link to="/leaderboards">
                        <Button variant="outline" className="w-full">
                          View Full Leaderboard
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChallengeDetails;
