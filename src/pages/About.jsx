import Navbar from '../components/Navbar';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-et-green via-yellow-400 to-et-red text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h1 className="text-6xl font-bold text-center mb-6">
            About Ethiopia
          </h1>
          <p className="text-2xl text-center max-w-2xl mx-auto mb-16">
            Cradle of Mankind • Origin of Coffee • Land of Ancient Wonders
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 hover:scale-105 transition">
              <h3 className="text-3xl font-bold mb-4">🇪🇹 Cradle of Mankind</h3>
              <p className="text-lg">
                Lucy (3.2 million years old) was found here. Ethiopia is the
                origin of human beings.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 hover:scale-105 transition">
              <h3 className="text-3xl font-bold mb-4">☕ Origin of Coffee</h3>
              <p className="text-lg">
                The coffee plant was first discovered in the forests of Kaffa,
                Ethiopia.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 hover:scale-105 transition">
              <h3 className="text-3xl font-bold mb-4">🏛️ Ancient History</h3>
              <p className="text-lg">
                Home to Axum Obelisks, Lalibela Rock Churches, and one of the
                oldest Christian kingdoms.
              </p>
            </div>

            {/* More cards */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 hover:scale-105 transition">
              <h3 className="text-3xl font-bold mb-4">🏔️ Diverse Landscapes</h3>
              <p className="text-lg">
                From Simien Mountains to Danakil Depression – the hottest place
                on Earth.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 hover:scale-105 transition">
              <h3 className="text-3xl font-bold mb-4">
                🎉 Rich Culture & Festivals
              </h3>
              <p className="text-lg">
                Over 80 ethnic groups, Timkat, Meskel, and colorful traditional
                coffee ceremonies.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 hover:scale-105 transition">
              <h3 className="text-3xl font-bold mb-4">🌍 UNESCO Sites</h3>
              <p className="text-lg">
                9 UNESCO World Heritage Sites – more than most African
                countries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
