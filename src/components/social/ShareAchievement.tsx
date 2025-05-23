
import { useState } from 'react';
import { Share2, Twitter, Facebook, Linkedin, Link as LinkIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface ShareAchievementProps {
  title: string;
  description: string;
  imageUrl?: string;
}

export function ShareAchievement({ title, description, imageUrl }: ShareAchievementProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  
  const shareUrl = window.location.href;
  
  const shareMessage = `I just achieved "${title}": ${description} 💪 #FitnessChallengeHub`;
  
  const handleShare = () => {
    // Try to use the Web Share API if available
    if (navigator.share) {
      navigator
        .share({
          title: `${title} Achievement`,
          text: shareMessage,
          url: shareUrl,
        })
        .then(() => {
          toast({
            description: "Successfully shared your achievement!",
          });
          setIsOpen(false);
        })
        .catch((error) => {
          console.error('Error sharing:', error);
        });
    } else {
      // If Web Share API is not available, just open the dialog
      setIsOpen(true);
    }
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({
      description: "Link copied to clipboard!",
    });
  };
  
  const handleSocialShare = (platform: string) => {
    let shareLink = '';
    
    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareMessage)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        break;
    }
    
    if (shareLink) {
      window.open(shareLink, '_blank', 'noopener,noreferrer');
      toast({
        description: `Shared on ${platform.charAt(0).toUpperCase() + platform.slice(1)}`,
      });
    }
  };
  
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center"
        onClick={handleShare}
      >
        <Share2 className="mr-1 h-4 w-4" />
        Share Achievement
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share achievement</DialogTitle>
            <DialogDescription>
              Share your achievement with friends and followers
            </DialogDescription>
          </DialogHeader>
          
          {imageUrl && (
            <div className="mb-4 bg-gray-100 rounded-md overflow-hidden">
              <img 
                src={imageUrl}
                alt={title}
                className="w-full object-cover max-h-40"
              />
            </div>
          )}
          
          <div className="mb-4">
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between">
              <div className="grid grid-cols-3 gap-2 flex-1">
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center justify-center h-16 p-2"
                  onClick={() => handleSocialShare('twitter')}
                >
                  <Twitter className="h-6 w-6 mb-1" />
                  <span className="text-xs">Twitter</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center justify-center h-16 p-2"
                  onClick={() => handleSocialShare('facebook')}
                >
                  <Facebook className="h-6 w-6 mb-1" />
                  <span className="text-xs">Facebook</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center justify-center h-16 p-2"
                  onClick={() => handleSocialShare('linkedin')}
                >
                  <Linkedin className="h-6 w-6 mb-1" />
                  <span className="text-xs">LinkedIn</span>
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Input
                readOnly
                value={shareUrl}
                className="flex-1"
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleCopyLink}
              >
                <LinkIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
