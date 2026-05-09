import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'antd';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-8">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-et-green mb-2">
            Welcome back, {user.full_name}!
          </h1>
          <p className="text-gray-600 mb-10">
            Your Ethiopian adventure dashboard
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="card-hover" hoverable>
              <h3 className="text-lg font-semibold">My Bookings</h3>
              <p className="text-4xl font-bold text-et-red mt-4">0</p>
              <p className="text-sm text-gray-500">No bookings yet</p>
            </Card>

            <Card className="card-hover" hoverable>
              <h3 className="text-lg font-semibold">Favorite Destinations</h3>
              <p className="text-4xl font-bold text-et-yellow mt-4">3</p>
              <p className="text-sm text-gray-500">Lalibela • Simien • Axum</p>
            </Card>

            <Card className="card-hover" hoverable>
              <h3 className="text-lg font-semibold">Next Trip</h3>
              <p className="text-sm text-gray-500 mt-8">No trip planned yet</p>
              <button className="mt-6 w-full bg-et-green text-white py-3 rounded-2xl">
                Browse Tours
              </button>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
