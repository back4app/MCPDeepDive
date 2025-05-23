
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, Users, Search, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface Friend {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  isFollowing: boolean;
  activeChallenge?: string;
  recentAchievement?: string;
}

interface FriendRequest {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  sentAt: Date;
}

export default function Friends() {
  const { toast } = useToast();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [suggestions, setSuggestions] = useState<Friend[]>([]);
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    // Simulate fetching friends data
    const mockFriends: Friend[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        username: 'sarahj',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        isFollowing: true,
        activeChallenge: '30-Day Running Challenge',
        recentAchievement: 'Completed 5K run milestone'
      },
      {
        id: '2',
        name: 'Mike Peterson',
        username: 'mikep',
        avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        isFollowing: true,
        activeChallenge: 'Weight Loss Journey',
      }
    ];
    
    const mockSuggestions: Friend[] = [
      {
        id: '3',
        name: 'Emily Davis',
        username: 'emilyd',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        isFollowing: false
      },
      {
        id: '4',
        name: 'Alex Turner',
        username: 'alext',
        avatarUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        isFollowing: false
      },
      {
        id: '5',
        name: 'Jessica Wilson',
        username: 'jessw',
        avatarUrl: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        isFollowing: false
      }
    ];
    
    const mockRequests: FriendRequest[] = [
      {
        id: '6',
        name: 'David Brown',
        username: 'davidb',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        sentAt: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
      }
    ];
    
    setFriends(mockFriends);
    setSuggestions(mockSuggestions);
    setRequests(mockRequests);
  }, []);
  
  const handleFollowToggle = (id: string, isCurrentlyFollowing: boolean) => {
    if (isCurrentlyFollowing) {
      // Unfollow logic
      setFriends(friends.filter(friend => friend.id !== id));
      setSuggestions([...suggestions, ...friends.filter(friend => friend.id === id).map(f => ({ ...f, isFollowing: false }))]);
      toast({
        title: "Unfollowed",
        description: "You are no longer following this user",
      });
    } else {
      // Follow logic
      const personToFollow = suggestions.find(s => s.id === id);
      if (personToFollow) {
        setSuggestions(suggestions.filter(s => s.id !== id));
        setFriends([...friends, { ...personToFollow, isFollowing: true }]);
        toast({
          title: "Following",
          description: `You are now following ${personToFollow.name}`,
        });
      }
    }
  };
  
  const handleAcceptRequest = (id: string) => {
    const request = requests.find(r => r.id === id);
    if (request) {
      setRequests(requests.filter(r => r.id !== id));
      setFriends([...friends, {
        id: request.id,
        name: request.name,
        username: request.username,
        avatarUrl: request.avatarUrl,
        isFollowing: true
      }]);
      toast({
        title: "Friend Request Accepted",
        description: `You and ${request.name} are now connected`,
      });
    }
  };
  
  const handleDeclineRequest = (id: string) => {
    setRequests(requests.filter(r => r.id !== id));
    toast({
      description: "Friend request declined",
    });
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Search Results",
        description: `Showing results for "${searchQuery}"`,
      });
      // In a real app, you would fetch search results from the API
    }
  };
  
  const filteredFriends = searchQuery
    ? friends.filter(friend => 
        friend.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        friend.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : friends;
  
  return (
    <>
      <Navbar />
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Users className="h-6 w-6" />
          Friends & Community
        </h1>
        
        <div className="mb-6">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for friends by name or username"
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        
        <Tabs defaultValue="friends" className="mb-6">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="friends">Following</TabsTrigger>
            <TabsTrigger value="requests">
              Requests
              {requests.length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {requests.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="discover">Discover</TabsTrigger>
          </TabsList>
          
          <TabsContent value="friends" className="space-y-4">
            {filteredFriends.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">No friends yet</h3>
                <p className="text-gray-500 mt-2">
                  Check out the Discover tab to find people to follow
                </p>
              </div>
            ) : (
              filteredFriends.map((friend) => (
                <Card key={friend.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={friend.avatarUrl} alt={friend.name} />
                        <AvatarFallback>{friend.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{friend.name}</h3>
                        <p className="text-sm text-gray-500">@{friend.username}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFollowToggle(friend.id, true)}
                    >
                      Unfollow
                    </Button>
                  </div>
                  
                  {(friend.activeChallenge || friend.recentAchievement) && (
                    <>
                      <Separator className="my-3" />
                      <div className="mt-3 text-sm">
                        {friend.activeChallenge && (
                          <div className="flex items-center gap-1 text-gray-600">
                            <Activity className="h-4 w-4 text-strava-orange" />
                            <span>Currently active in: {friend.activeChallenge}</span>
                          </div>
                        )}
                        {friend.recentAchievement && (
                          <div className="flex items-center gap-1 text-gray-600 mt-1">
                            <span>🏆 Recently achieved: {friend.recentAchievement}</span>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </Card>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="requests">
            {requests.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <UserPlus className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">No pending requests</h3>
                <p className="text-gray-500 mt-2">
                  When someone wants to connect, you'll see it here
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {requests.map((request) => (
                  <Card key={request.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={request.avatarUrl} alt={request.name} />
                          <AvatarFallback>{request.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{request.name}</h3>
                          <p className="text-sm text-gray-500">@{request.username}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeclineRequest(request.id)}
                        >
                          Decline
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleAcceptRequest(request.id)}
                        >
                          Accept
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="discover">
            <div className="space-y-4">
              {suggestions.map((person) => (
                <Card key={person.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={person.avatarUrl} alt={person.name} />
                        <AvatarFallback>{person.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{person.name}</h3>
                        <p className="text-sm text-gray-500">@{person.username}</p>
                      </div>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => handleFollowToggle(person.id, false)}
                    >
                      <UserPlus className="mr-1 h-4 w-4" />
                      Follow
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
