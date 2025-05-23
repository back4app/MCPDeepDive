
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Bell, Activity, Users, Award, Calendar, X } from 'lucide-react';
import { Navbar } from '@/components/navigation/Navbar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Notification types
type NotificationType = 'challenge' | 'friend' | 'achievement' | 'reminder';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  imageUrl?: string;
  actionUrl?: string;
}

export default function Notifications() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<NotificationType | 'all'>('all');
  
  // Simulate fetching notifications
  useEffect(() => {
    // This would be replaced with actual API call or LiveQuery subscription
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'challenge',
        title: 'New Challenge Available',
        description: '30-Day Running Challenge has been created. Join now!',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
        read: false,
        actionUrl: '/challenge/123'
      },
      {
        id: '2',
        type: 'friend',
        title: 'Friend Request',
        description: 'Jane Smith wants to connect with you',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: true,
        imageUrl: 'https://github.com/shadcn.png'
      },
      {
        id: '3',
        type: 'achievement',
        title: 'Badge Unlocked!',
        description: 'You\'ve earned the "Early Bird" badge for completing 5 morning workouts',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
        read: false
      },
      {
        id: '4',
        type: 'reminder',
        title: 'Challenge Ending Soon',
        description: 'Your "Marathon Training" challenge ends in 2 days',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        read: false,
        actionUrl: '/challenge/456'
      },
      {
        id: '5',
        type: 'friend',
        title: 'Progress Update',
        description: 'Alex Johnson completed their daily goal in the Cycling Challenge',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 30), // 30 hours ago
        read: true,
        imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80'
      },
    ];
    
    setNotifications(mockNotifications);
    
    // Simulate real-time notification
    const timer = setTimeout(() => {
      const newNotification: Notification = {
        id: '6',
        type: 'achievement', // Explicitly using NotificationType
        title: 'New Achievement!',
        description: 'You reached 50% of your monthly goal',
        timestamp: new Date(),
        read: false
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      
      toast({
        title: "New Achievement!",
        description: "You reached 50% of your monthly goal",
      });
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [toast]);
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };
  
  const getFilteredNotifications = () => {
    return filter === 'all' 
      ? notifications 
      : notifications.filter(notification => notification.type === filter);
  };
  
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'challenge':
        return <Activity className="h-5 w-5 text-strava-orange" />;
      case 'friend':
        return <Users className="h-5 w-5 text-strava-blue" />;
      case 'achievement':
        return <Award className="h-5 w-5 text-yellow-500" />;
      case 'reminder':
        return <Calendar className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };
  
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);
    
    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return `${diffDays}d ago`;
    }
  };
  
  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <>
      <Navbar />
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="h-6 w-6" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">{unreadCount}</Badge>
            )}
          </h1>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark all as read
          </Button>
        </div>
        
        <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
          <div className="p-4 border-b flex gap-2 overflow-x-auto">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className="whitespace-nowrap"
            >
              All
            </Button>
            <Button 
              variant={filter === 'challenge' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('challenge')}
              className="whitespace-nowrap"
            >
              <Activity className="mr-1 h-4 w-4" />
              Challenges
            </Button>
            <Button 
              variant={filter === 'friend' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('friend')}
              className="whitespace-nowrap"
            >
              <Users className="mr-1 h-4 w-4" />
              Friends
            </Button>
            <Button 
              variant={filter === 'achievement' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('achievement')}
              className="whitespace-nowrap"
            >
              <Award className="mr-1 h-4 w-4" />
              Achievements
            </Button>
            <Button 
              variant={filter === 'reminder' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('reminder')}
              className="whitespace-nowrap"
            >
              <Calendar className="mr-1 h-4 w-4" />
              Reminders
            </Button>
          </div>
          
          {getFilteredNotifications().length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Bell className="mx-auto h-12 w-12 opacity-20 mb-3" />
              <p className="text-lg font-medium">No notifications</p>
              <p>When you have new notifications, they'll appear here</p>
            </div>
          ) : (
            <div className="divide-y">
              {getFilteredNotifications().map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 flex items-start gap-3 ${!notification.read ? 'bg-blue-50 hover:bg-blue-50/80' : ''}`}
                >
                  <div className="shrink-0">
                    {notification.imageUrl ? (
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={notification.imageUrl} alt="Avatar" />
                        <AvatarFallback>
                          {getNotificationIcon(notification.type)}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        {getNotificationIcon(notification.type)}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`text-sm font-medium ${!notification.read ? 'font-bold' : ''}`}>{notification.title}</h3>
                        <p className="text-sm text-gray-600">{notification.description}</p>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {formatTime(notification.timestamp)}
                      </span>
                    </div>
                    
                    <div className="mt-2 flex gap-3">
                      {notification.actionUrl && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 text-xs"
                          onClick={() => markAsRead(notification.id)}
                          asChild
                        >
                          <a href={notification.actionUrl}>View Details</a>
                        </Button>
                      )}
                      
                      {!notification.read && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 text-xs"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-8 w-8 p-0" 
                    onClick={() => deleteNotification(notification.id)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="font-medium mb-2">Notification Settings</h2>
          <Separator className="my-2" />
          <p className="text-sm text-gray-600">
            Configure your notification preferences to control which alerts you receive.
          </p>
          <Button variant="outline" size="sm" className="mt-3">
            Manage Settings
          </Button>
        </div>
      </div>
    </>
  );
}
