import { useState,useEffect } from 'react';
import { ethers } from 'ethers';
import { 
  FaWallet, FaLeaf, FaUserCircle, FaBars, FaTimes, 
  FaCloudRain, FaTemperatureHigh, FaTint, FaUmbrella,
  FaUsers, FaInfoCircle, FaSignInAlt, FaChartLine
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

declare global {
  interface Window {
    ethereum?: any;
  }
}

type WalletInfo = {
  address: string | null;
  balance: string | null;
};

type NavItem = {
  id: string;
  label: string;
  icon: JSX.Element;
  content: JSX.Element;
};
async function loadBlockChainData() {
  try {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const balance = await provider.getBalance(accounts[0]);

      console.log('Accounts:', accounts);
      console.log('Balance:', ethers.formatEther(balance));
    } else {
      console.error('Ethereum provider not found. Please install MetaMask.');
    }
  } catch (error) {
    console.error('Error loading blockchain data:', error);
  }
}
export default function AgrosurancePlatform() {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [walletInfo, setWalletInfo] = useState<WalletInfo>({
    address: null,
    balance: null,
  });
  const [isConnected, setIsConnected] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const[provider,setProvider]=useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        const balance = await provider.getBalance(accounts[0]);

        setWalletInfo({
          address: `${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`,
          balance: ethers.formatEther(balance).substring(0, 5),
        });

        setIsConnected(true);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  const navItems: NavItem[] = [
    {
      id: 'about',
      label: 'About Us',
      icon: <FaInfoCircle className="mr-2" />,
      content: <AboutSection />
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <FaChartLine className="mr-2" />,
      content: <DashboardSection />
    },
    {
      id: 'policies',
      label: 'Policies',
      icon: <FaUmbrella className="mr-2" />,
      content: <PoliciesSection />
    },
   
    {
      id: 'signup',
      label: 'Sign Up',
      icon: <FaSignInAlt className="mr-2" />,
      content: <SignUpSection connectWallet={connectWallet} />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-green-700 to-green-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo and main nav */}
            <div className="flex items-center">
              <motion.div whileHover={{ rotate: 15 }} className="flex items-center">
                <FaLeaf className="h-8 w-8 text-green-300" />
                <span className="ml-2 text-xl font-bold">Agrosurance</span>
              </motion.div>

              <div className="hidden md:block ml-10">
                <div className="flex space-x-4">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        activeSection === item.id ? 'bg-green-700' : 'hover:bg-green-700'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.icon}
                      {item.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Wallet connection */}
            <div className="flex items-center">
              {isConnected ? (
                <motion.div
                  className="hidden md:flex items-center space-x-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="bg-green-700 px-3 py-1 rounded-full text-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    {walletInfo.balance} ETH
                  </motion.div>
                  <motion.div
                    className="flex items-center bg-green-900 px-3 py-1 rounded-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    <FaUserCircle className="mr-2" />
                    <span>{walletInfo.address}</span>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.button
                  onClick={connectWallet}
                  className="hidden cursor-pointer md:flex items-center bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaWallet className="mr-2" />
                  Connect Wallet
                </motion.button>
              )}

              {/* Mobile menu button */}
              <motion.button
                onClick={toggleMenu}
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-700 focus:outline-none"
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-green-800"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                      activeSection === item.id ? 'bg-green-700' : 'hover:bg-green-700'
                    }`}
                    whileHover={{ x: 5 }}
                  >
                    {item.icon}
                    {item.label}
                  </motion.button>
                ))}
                {isConnected ? (
                  <motion.div
                    className="pt-4 pb-2 border-t border-green-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex items-center px-3 py-2 text-sm">
                      <FaUserCircle className="mr-2" />
                      <span className="truncate">{walletInfo.address}</span>
                    </div>
                    <div className="px-3 py-1 text-sm">Balance: {walletInfo.balance} ETH</div>
                  </motion.div>
                ) : (
                  <motion.button
                    onClick={connectWallet}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                    whileHover={{ scale: 1.02 }}
                  >
                    <FaWallet className="mr-2" />
                    Connect Wallet
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.find(item => item.id === activeSection)?.content}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FaLeaf className="mr-2" />
                Agrosurance
              </h3>
              <p className="text-green-200">
                Decentralized crop protection powered by blockchain technology.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navItems.map(item => (
                  <li key={item.id}>
                    <button 
                      onClick={() => handleNavClick(item.id)}
                      className="text-green-200 hover:text-white flex items-center"
                    >
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-green-200">support@agrosurance.io</p>
              <p className="text-green-200 mt-2">Farmers DAO, Decentralized</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-green-800 text-center text-green-300">
            <p>© {new Date().getFullYear()} Agrosurance. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


function AboutSection() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <div className="text-center mb-8">
          <motion.div 
            className="flex items-center justify-center mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <FaLeaf className="text-green-600 text-4xl mr-3" />
            <h1 className="text-3xl font-bold text-green-800">Agrosurance</h1>
          </motion.div>
          <p className="text-xl text-gray-700">
            Revolutionizing Agricultural Insurance Through Blockchain Technology
          </p>
        </div>

        <div className="prose max-w-none text-gray-700">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Our Mission</h2>
          <p>
            At Agrosurance, we're committed to protecting farmers against nature's unpredictability. 
            Our platform provides automated insurance coverage for:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Natural Disasters (Floods, Droughts, Cyclones, Storms)</li>
            <li>Crop Yield Reduction</li>
            <li>Extreme Weather Events</li>
            <li>Pest Outbreaks</li>
          </ul>
        </div>
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-semibold text-green-800 mb-6">How We Protect Your Crops</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              icon: <FaLeaf className="text-green-600 text-3xl mb-3" />,
              title: "1. Policy Creation",
              description: "Customize coverage based on crop type, location, and risk factors"
            },
            {
              icon: <FaCloudRain className="text-blue-600 text-3xl mb-3" />,
              title: "2. Real-Time Monitoring",
              description: "24/7 tracking using satellite data and IoT sensors"
            },
            {
              icon: <FaUmbrella className="text-yellow-600 text-3xl mb-3" />,
              title: "3. Automatic Claims",
              description: "Smart contracts trigger payouts when thresholds are breached"
            },
            {
              icon: <FaWallet className="text-purple-600 text-3xl mb-3" />,
              title: "4. Instant Payouts",
              description: "Receive funds directly in your crypto wallet within minutes"
            }
          ].map((step, index) => (
            <motion.div
              key={step.title}
              className="bg-gray-50 p-4 rounded-lg text-center"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              {step.icon}
              <h3 className="font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Technology Stack */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-semibold text-green-800 mb-6">Our Technology</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">Smart Contracts</h3>
            <p className="text-gray-600">
              Self-executing insurance policies stored on the Ethereum blockchain. 
              Terms are transparent and unchangeable once deployed.
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Data Oracles</h3>
            <p className="text-gray-600">
              Integrates real-time data from trusted sources:
              <ul className="list-disc pl-5 mt-2">
                <li>India Meteorological Department</li>
                <li>NASA Earth Observatory</li>
                <li>Local IoT Sensors</li>
              </ul>
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">Mobile Access</h3>
            <p className="text-gray-600">
              Farmer-friendly mobile interface with SMS alerts and 
              multilingual support for rural accessibility.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-semibold text-green-800 mb-6">Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Abhishek Sharma",
              role: "Co-Founder & CTO",
              bio: "Blockchain architect with 10+ years in fintech solutions",
              expertise: "Smart Contracts, DeFi Systems"
            },
            {
              name: "Utkarsh Saxena",
              role: "Head of Agriculture",
              bio: "Agricultural economist and former FAO consultant",
              expertise: "Crop Risk Modeling"
            },
            {
              name: "Sharad",
              role: "Lead Developer",
              bio: "Full-stack developer specializing in Web3 applications",
              expertise: "DApp Development"
            }
          ].map((member, index) => (
            <motion.div
              key={member.name}
              className="bg-gray-50 p-4 rounded-lg"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              <div className="flex items-center mb-3">
                <div className="h-12 w-12 bg-green-200 rounded-full flex items-center justify-center text-green-800 font-bold mr-3">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-green-600 text-sm">{member.role}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-2">{member.bio}</p>
              <div className="bg-green-100 px-2 py-1 rounded text-xs text-green-800">
                {member.expertise}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Partnerships */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-semibold text-green-800 mb-6">Trusted Partners</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
          {['ISRO', 'IMD', 'UN FAO', 'ETH Foundation'].map((partner, index) => (
            <motion.div
              key={partner}
              className="bg-gray-100 p-4 rounded-lg text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 + index * 0.1 }}
            >
              <span className="font-medium text-gray-700">{partner}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center py-8"
      >
        <h3 className="text-xl font-semibold text-green-800 mb-4">
          Ready to Protect Your Crops?
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium"
        >
          Get Started Now
        </motion.button>
      </motion.div>
    </div>
  );
}

// Dashboard Section Component
function DashboardSection() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
          <FaChartLine className="mr-2" />
          Farm Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">Active Policies</h3>
            <p className="text-3xl font-bold">2</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Total Coverage</h3>
            <p className="text-3xl font-bold">8 ETH</p>
          </div>
        </div>
      </motion.div>

      <WeatherSection />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
          <FaUmbrella className="mr-2" />
          Recent Policies
        </h2>
        <PolicySection />
      </motion.div>
    </div>
  );
}
// Policies Section Component
function PoliciesSection() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-bold text-green-800 mb-2">Available Insurance Plans</h2>
        <p className="text-gray-600 mb-6">
          Protect your crops with our decentralized insurance policies. Premiums are calculated
          based on your location, crop type, and historical weather patterns.
        </p>
        <PolicySection expanded />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <h3 className="text-xl font-semibold text-green-800 mb-4">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <FaLeaf className="text-green-600 text-2xl mb-3" />,
              title: "Select Your Crop",
              description: "Choose from our range of supported crops and coverage options"
            },
            {
              icon: <FaCloudRain className="text-blue-600 text-2xl mb-3" />,
              title: "Set Parameters",
              description: "Define the weather conditions that trigger your policy"
            },
            {
              icon: <FaWallet className="text-yellow-600 text-2xl mb-3" />,
              title: "Secure Coverage",
              description: "Pay your premium and get protected instantly"
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-gray-50 p-4 rounded-lg"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className="text-center">
                {item.icon}
                <h4 className="font-medium text-gray-800">{item.title}</h4>
                <p className="text-gray-600 text-sm mt-2">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}


// Sign Up Section Component
function SignUpSection({ connectWallet }: { connectWallet: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    farmLocation: '',
    cropType: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    connectWallet();
  };

  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Join Agrosurance</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Farm Location</label>
            <input
              type="text"
              name="farmLocation"
              value={formData.farmLocation}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Crop Type</label>
            <select
              name="cropType"
              value={formData.cropType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="">Select a crop</option>
              <option value="Wheat">Wheat</option>
              <option value="Rice">Rice</option>
              <option value="Corn">Corn</option>
              <option value="Soybean">Soybean</option>
              <option value="Cotton">Cotton</option>
            </select>
          </div>
          
          <motion.button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaWallet className="mr-2" />
            Sign Up & Connect Wallet
          </motion.button>
        </form>
        
        <p className="text-gray-600 text-sm mt-4 text-center">
          Already have an account? <button className="text-green-600 font-medium">Sign In</button>
        </p>
      </motion.div>
    </div>
  );
}

// Weather Section Component (reused from previous implementation)
function WeatherSection() {
  const weatherData = [
    { icon: <FaTemperatureHigh />, title: 'Temperature', value: '28°C', trend: '↑' },
    { icon: <FaCloudRain />, title: 'Rainfall', value: '2.5mm', trend: '↓' },
    { icon: <FaTint />, title: 'Soil Moisture', value: '65%', trend: '→' },
  ];

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <FaCloudRain className="mr-2" />
        Current Weather Conditions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {weatherData.map((item, index) => (
          <motion.div
            key={item.title}
            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <div className="flex items-center text-gray-500 mb-2">
              {item.icon}
              <h3 className="ml-2 text-sm font-medium">{item.title}</h3>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">{item.value}</span>
              <span className="ml-2 text-sm font-medium text-gray-500">{item.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Policy Section Component (reused from previous implementation)
function PolicySection({ expanded = false }) {
  const policies = [
    { cropType: 'Wheat', coverage: '5 ETH', premium: '0.5 ETH', status: 'Active' },
    { cropType: 'Rice', coverage: '3 ETH', premium: '0.3 ETH', status: 'Pending' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Crop Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Coverage
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Premium
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {policies.map((policy, index) => (
            <motion.tr
              key={policy.cropType}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="hover:bg-gray-50"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {policy.cropType}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {policy.coverage}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {policy.premium}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  policy.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {policy.status}
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}