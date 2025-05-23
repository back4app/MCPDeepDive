
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShareAchievement } from '@/components/social/ShareAchievement';
import { User, Users, Award, Activity, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Achievement {
  id: string;
  title: string;
  description: string;
  dateEarned: Date;
  imageUrl?: string;
}

interface UserStats {
  activeChallenges: number;
  completedChallenges: number;
  totalDistance: number;
  totalTime: number;
  followers: number;
  following: number;
}

export default function Profile() {
  const { toast } = useToast();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [stats, setStats] = useState<UserStats>({
    activeChallenges: 0,
    completedChallenges: 0,
    totalDistance: 0,
    totalTime: 0,
    followers: 0,
    following: 0
  });
  
  useEffect(() => {
    // Simulating data fetch
    const mockAchievements: Achievement[] = [
      {
        id: '1',
        title: 'Early Bird',
        description: 'Completed 5 morning workouts',
        dateEarned: new Date('2023-06-18'),
        imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: '2',
        title: 'Marathon Finisher',
        description: 'Completed your first marathon challenge',
        dateEarned: new Date('2023-05-05'),
        imageUrl: 'https://images.unsplash.com/photo-1460400408855-36abd76648b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: '3',
        title: '50 Mile Club',
        description: 'Logged a total of 50 miles',
        dateEarned: new Date('2023-04-28')
      }
    ];
    
    const mockStats: UserStats = {
      activeChallenges: 3,
      completedChallenges: 7,
      totalDistance: 153.4,
      totalTime: 2160, // minutes
      followers: 28,
      following: 36
    };
    
    setAchievements(mockAchievements);
    setStats(mockStats);
  }, []);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };
  
  return (
    <>
      <Navbar />
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-strava-orange/80 to-strava-blue/80 h-32"></div>
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16">
              <div className="flex flex-col items-center md:items-start md:flex-row md:space-x-5">
                <Avatar className="w-28 h-28 border-4 border-white shadow-lg">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User Profile" />
                  <AvatarFallback className="text-4xl">JD</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left mt-4 md:mt-0">
                  <h1 className="text-2xl font-bold">John Doe</h1>
                  <p className="text-gray-600">@johndoe • Boston, MA</p>
                  <p className="text-gray-600 mt-1">Running enthusiast, trying to stay fit!</p>
                </div>
              </div>
              <div className="mt-6 md:mt-0 flex justify-center md:justify-start space-x-3">
                <Button variant="outline" size="sm">
                  <Settings className="mr-1 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Active Challenges</p>
                <p className="text-xl font-bold">{stats.activeChallenges}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-xl font-bold">{stats.completedChallenges}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Followers</p>
                <p className="text-xl font-bold">{stats.followers}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Following</p>
                <p className="text-xl font-bold">{stats.following}</p>
              </div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="achievements" className="mt-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-3 mb-4">
            <TabsTrigger value="achievements">
              <Award className="mr-1 h-4 w-4" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="activities">
              <Activity className="mr-1 h-4 w-4" />
              Activities
            </TabsTrigger>
            <TabsTrigger value="friends">
              <Users className="mr-1 h-4 w-4" />
              Friends
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="achievements">
            <h2 className="text-xl font-bold mb-4">Your Achievements</h2>
            
            {achievements.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Award className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">No achievements yet</h3>
                <p className="text-gray-500 mt-2">
                  Complete challenges to earn achievements
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <Card key={achievement.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <Badge className="mb-2">Achievement</Badge>
                        <span className="text-sm text-gray-500">{formatDate(achievement.dateEarned)}</span>
                      </div>
                      <CardTitle className="text-lg">{achievement.title}</CardTitle>
                      <CardDescription>{achievement.description}</CardDescription>
                    </CardHeader>
                    {achievement.imageUrl && (
                      <CardContent>
                        <div className="bg-gray-100 rounded-md overflow-hidden">
                          <img 
                            src={achievement.imageUrl}
                            alt={achievement.title}
                            className="w-full object-cover h-32"
                          />
                        </div>
                      </CardContent>
                    )}
                    <CardFooter>
                      <ShareAchievement 
                        title={achievement.title}
                        description={achievement.description}
                        imageUrl={achievement.imageUrl}
                      />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="activities">
            <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Weekly Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Total Distance</p>
                      <p className="text-2xl font-bold">{stats.totalDistance} mi</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Time</p>
                      <p className="text-2xl font-bold">{formatTime(stats.totalTime)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <Activity className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">Activity details coming soon</h3>
                <p className="text-gray-500 mt-2">
                  Track your activities to see them here
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="friends">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Network</h2>
              <Button variant="outline" size="sm" asChild>
                <a href="/friends">View All</a>
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between text-center">
                  <div>
                    <p className="text-2xl font-bold">{stats.followers}</p>
                    <p className="text-gray-500">Followers</p>
                  </div>
                  <Separator orientation="vertical" />
                  <div>
                    <p className="text-2xl font-bold">{stats.following}</p>
                    <p className="text-gray-500">Following</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/friends">
                    <Users className="mr-1 h-4 w-4" />
                    Manage Friends
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
