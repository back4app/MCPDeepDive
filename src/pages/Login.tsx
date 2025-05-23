
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { LoginForm } from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6">
          <LoginForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
