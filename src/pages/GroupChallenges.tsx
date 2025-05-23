
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Users, Calendar, Clock, Plus, Share2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

interface Friend {
  id: string;
  name: string;
  avatarUrl: string;
  selected?: boolean;
}

interface GroupChallenge {
  id: string;
  title: string;
  description: string;
  category: string;
  startDate: Date;
  endDate: Date;
  participants: Friend[];
  createdBy: Friend;
  progress: number;
  isJoined: boolean;
}

export default function GroupChallenges() {
  const { toast } = useToast();
  const [challenges, setChallenges] = useState<GroupChallenge[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    startDate: '',
    endDate: '',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  useEffect(() => {
    // Simulate fetching group challenges
    const mockChallenges: GroupChallenge[] = [
      {
        id: '1',
        title: 'Summer Running Club',
        description: 'Let\'s hit 100 miles together this summer!',
        category: 'Running',
        startDate: new Date('2023-06-01'),
        endDate: new Date('2023-08-31'),
        participants: [
          {
            id: '1',
            name: 'Sarah Johnson',
            avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
          },
          {
            id: '2',
            name: 'Mike Peterson',
            avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
          }
        ],
        createdBy: {
          id: '1',
          name: 'Sarah Johnson',
          avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
        },
        progress: 65,
        isJoined: true
      },
      {
        id: '2',
        title: 'Yoga 30 Day Challenge',
        description: 'Daily practice for mental clarity and physical strength.',
        category: 'Yoga',
        startDate: new Date('2023-07-15'),
        endDate: new Date('2023-08-15'),
        participants: [
          {
            id: '3',
            name: 'Emily Davis',
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
          },
          {
            id: '4',
            name: 'Alex Turner',
            avatarUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
          },
          {
            id: '5',
            name: 'Jessica Wilson',
            avatarUrl: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
          }
        ],
        createdBy: {
          id: '3',
          name: 'Emily Davis',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
        },
        progress: 40,
        isJoined: false
      }
    ];
    
    // Simulate fetching friends for invites
    const mockFriends: Friend[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        selected: false
      },
      {
        id: '2',
        name: 'Mike Peterson',
        avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        selected: false
      },
      {
        id: '3',
        name: 'Emily Davis',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        selected: false
      },
      {
        id: '4',
        name: 'Alex Turner',
        avatarUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        selected: false
      },
      {
        id: '5',
        name: 'Jessica Wilson',
        avatarUrl: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        selected: false
      },
    ];
    
    setChallenges(mockChallenges);
    setFriends(mockFriends);
  }, []);
  
  const handleJoinChallenge = (id: string) => {
    setChallenges(challenges.map(challenge => 
      challenge.id === id ? { ...challenge, isJoined: true } : challenge
    ));
    
    toast({
      title: "Challenge Joined!",
      description: "You've successfully joined the group challenge",
    });
  };
  
  const handleLeaveChallenge = (id: string) => {
    setChallenges(challenges.map(challenge => 
      challenge.id === id ? { ...challenge, isJoined: false } : challenge
    ));
    
    toast({
      description: "You've left the challenge",
    });
  };
  
  const handleFriendSelection = (id: string) => {
    setFriends(friends.map(friend => 
      friend.id === id ? { ...friend, selected: !friend.selected } : friend
    ));
    
    const friend = friends.find(f => f.id === id);
    if (friend) {
      if (friend.selected) {
        setSelectedFriends(selectedFriends.filter(f => f.id !== id));
      } else {
        setSelectedFriends([...selectedFriends, { ...friend, selected: true }]);
      }
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  };
  
  const handleSelectChange = (value: string) => {
    setFormData({...formData, category: value});
  };
  
  const handleCreateChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.description || !formData.category || !formData.startDate || !formData.endDate) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Create new challenge
    const newChallenge: GroupChallenge = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      participants: [
        // Current user would be added here
        ...selectedFriends
      ],
      createdBy: {
        id: 'current-user',
        name: 'You',
        avatarUrl: 'https://github.com/shadcn.png'
      },
      progress: 0,
      isJoined: true
    };
    
    setChallenges([newChallenge, ...challenges]);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      category: '',
      startDate: '',
      endDate: '',
    });
    setSelectedFriends([]);
    setFriends(friends.map(friend => ({ ...friend, selected: false })));
    setIsDialogOpen(false);
    
    toast({
      title: "Challenge Created!",
      description: "Your group challenge has been created successfully",
    });
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const shareChallenge = (challenge: GroupChallenge) => {
    // In a real app, this would open a share dialog with proper web share API
    // For now, we'll just show a toast
    toast({
      title: "Challenge Shared",
      description: `${challenge.title} has been shared`,
    });
  };
  
  return (
    <>
      <Navbar />
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6" />
            Group Challenges
          </h1>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-1 h-4 w-4" />
                Create Challenge
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleCreateChallenge}>
                <DialogHeader>
                  <DialogTitle>Create Group Challenge</DialogTitle>
                  <DialogDescription>
                    Create a new challenge and invite friends to join you on this journey.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 my-6">
                  <div>
                    <Label htmlFor="title">Challenge Name</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Name your challenge"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your challenge"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Running">Running</SelectItem>
                        <SelectItem value="Cycling">Cycling</SelectItem>
                        <SelectItem value="Swimming">Swimming</SelectItem>
                        <SelectItem value="Weight Loss">Weight Loss</SelectItem>
                        <SelectItem value="Yoga">Yoga</SelectItem>
                        <SelectItem value="Meditation">Meditation</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Invite Friends</Label>
                    <ScrollArea className="h-[180px] border rounded-md p-2">
                      <div className="space-y-2">
                        {friends.map((friend) => (
                          <div key={friend.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`friend-${friend.id}`}
                              checked={friend.selected}
                              onCheckedChange={() => handleFriendSelection(friend.id)}
                            />
                            <div className="flex items-center flex-1">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={friend.avatarUrl} alt={friend.name} />
                                <AvatarFallback>{friend.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <Label
                                htmlFor={`friend-${friend.id}`}
                                className="cursor-pointer flex-1"
                              >
                                {friend.name}
                              </Label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Challenge</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenges.length === 0 ? (
            <div className="col-span-full text-center bg-gray-50 rounded-lg p-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium">No group challenges</h3>
              <p className="text-gray-500 mt-2">
                Create a challenge and invite your friends to participate
              </p>
              <Button className="mt-4" onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-1 h-4 w-4" />
                Create Your First Challenge
              </Button>
            </div>
          ) : (
            challenges.map((challenge) => (
              <Card key={challenge.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant="outline" className="mb-2">{challenge.category}</Badge>
                      <CardTitle className="text-lg">{challenge.title}</CardTitle>
                      <CardDescription>{challenge.description}</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => shareChallenge(challenge)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm gap-4 mb-3">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4 text-gray-500" />
                      <span>{formatDate(challenge.startDate)} - {formatDate(challenge.endDate)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-strava-orange h-2 rounded-full" 
                        style={{ width: `${challenge.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm mb-2">Participants</p>
                    <div className="flex -space-x-2 overflow-hidden">
                      {challenge.participants.map((participant, index) => (
                        <Avatar key={participant.id} className="border-2 border-background">
                          <AvatarImage src={participant.avatarUrl} alt={participant.name} />
                          <AvatarFallback>{participant.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      ))}
                      {challenge.participants.length > 3 && (
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 border-2 border-background text-xs font-medium">
                          +{challenge.participants.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  {challenge.isJoined ? (
                    <Button 
                      variant="outline" 
                      onClick={() => handleLeaveChallenge(challenge.id)}
                      className="w-full"
                    >
                      Leave Challenge
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleJoinChallenge(challenge.id)}
                      className="w-full"
                    >
                      Join Challenge
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  );
}
