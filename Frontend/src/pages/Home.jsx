import { Link } from "react-router-dom";
import { ArrowRight, Clock, Users, ShieldCheck, Activity } from "lucide-react";

const FeatureCard = ({ icon, title, description, delay }) => (
  <div className={`card p-8 animate-fade-in ${delay} hover:-translate-y-2 transition-transform duration-300`}>
    <div className="bg-primary-100 dark:bg-primary-900/50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-primary-600 dark:text-primary-400">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-80px)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-white dark:from-dark-bg dark:to-dark-card -z-10"></div>
        <div className="container mx-auto px-6 max-w-7xl relative">
          <div className="text-center max-w-4xl mx-auto z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 font-semibold mb-8 animate-fade-in">
              <Activity className="w-5 h-5" />
              <span>The Smart Way to Wait</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-primary-800 dark:from-white dark:to-primary-400 animate-fade-in delay-100">
              Transform Your Queue Experience
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto animate-fade-in delay-200">
              Say goodbye to overcrowded waiting rooms and endless physical lines. Book online, track your token, and save time with QueueEase.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-300">
              <Link to="/signup" className="btn btn-primary text-lg !px-8 !py-4 flex justify-center items-center gap-2 group">
                Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/login" className="btn btn-secondary text-lg !px-8 !py-4 flex justify-center items-center">
                Track My Token
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-dark-bg">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose QueueEase?</h2>
            <p className="text-gray-600 dark:text-gray-400">Powered by innovation, built for efficiency.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Clock className="w-8 h-8" />}
              title="Save Precious Time"
              description="Join the queue from anywhere. We calculate estimated waiting times so you can arrive right when your service is ready."
              delay="delay-100"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Less Overcrowding"
              description="Keep lobbies organized and clear by managing user intake digitally, ensuring a smoother service environment."
              delay="delay-200"
            />
            <FeatureCard
              icon={<ShieldCheck className="w-8 h-8" />}
              title="Seamless & Secure"
              description="Built on robust architecture. Admins get ultimate control and analytics, while users enjoy complete token privacy."
              delay="delay-300"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
