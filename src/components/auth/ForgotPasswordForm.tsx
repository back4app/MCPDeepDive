
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Mail, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulating API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email) {
        // Reset request successful (mock)
        setIsSuccess(true);
        toast.success('Reset instructions sent to your email');
      } else {
        toast.error('Please enter your email address');
      }
    } catch (error) {
      toast.error('Request failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-bold">Forgot password?</h1>
        <p className="text-sm text-gray-500">
          Enter your email to receive password reset instructions
        </p>
      </div>
      
      {isSuccess ? (
        <div className="mt-6">
          <Alert className="bg-green-50 border-green-200">
            <AlertDescription>
              We've sent you an email with instructions to reset your password. Please check your inbox.
            </AlertDescription>
          </Alert>
          <div className="mt-4 flex justify-center">
            <Link to="/login" className="text-sm text-strava-blue hover:underline inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 mt-6">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" disabled={isLoading} className="strava-button mt-2">
                {isLoading ? 'Sending...' : 'Send reset instructions'}
                <Mail className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
          
          <div className="mt-4 text-center text-sm">
            Remembered your password?{" "}
            <Link to="/login" className="text-strava-blue hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
