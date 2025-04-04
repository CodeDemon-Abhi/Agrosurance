import { useState } from 'react';
import { ethers } from 'ethers';
import { FaWallet, FaLeaf, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

type WalletInfo = {
  address: string | null;
  balance: string | null;
};

type NavItem = {
  id: string;
  label: string;
  content: JSX.Element;
};

export default function NavbarWithContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [walletInfo, setWalletInfo] = useState<WalletInfo>({
    address: null,
    balance: null
  });
  const [isConnected, setIsConnected] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      content: (
        <>
          <WeatherSection />
          <PolicySection />
        </>
      )
    },
    {
      id: 'policies',
      label: 'Policies',
      content: (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Available Policies</h2>
          <PolicySection expanded />
        </div>
      )
    },
    {
      id: 'claims',
      label: 'Claims',
      content: (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-green-800 mb-4">File a Claim</h2>
          <p className="text-gray-700">
            Submit your insurance claim with supporting evidence. Our decentralized
            verification system will process your request automatically.
          </p>
        </div>
      )
    },
    {
      id: 'governance',
      label: 'Governance',
      content: (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Community Governance</h2>
          <p className="text-gray-700">
            Participate in platform decisions through our DAO. Vote on policy changes,
            claim approvals, and system upgrades.
          </p>
        </div>
      )
    }
  ];

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const balance = await provider.getBalance(accounts[0]);
        
        setWalletInfo({
          address: `${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`,
          balance: ethers.formatEther(balance).substring(0, 5)
        });
        
        setIsConnected(true);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  const activeContent = navItems.find(item => item.id === activeSection)?.content;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-green-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo and main nav */}
            <div className="flex items-center">
              <motion.div 
                whileHover={{ rotate: 15 }}
                className="flex items-center"
              >
                <FaLeaf className="h-8 w-8 text-green-300" />
                <span className="ml-2 text-xl font-bold">Agrosurance</span>
              </motion.div>
              
              <div className="hidden md:block ml-10">
                <div className="flex space-x-4">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        activeSection === item.id ? 'bg-green-700' : 'hover:bg-green-700'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Wallet and mobile menu button */}
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
                {isMenuOpen ? (
                  <FaTimes className="h-6 w-6" />
                ) : (
                  <FaBars className="h-6 w-6" />
                )}
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
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                      activeSection === item.id ? 'bg-green-700' : 'hover:bg-green-700'
                    }`}
                    whileHover={{ x: 5 }}
                  >
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
                    <div className="px-3 py-1 text-sm">
                      Balance: {walletInfo.balance} ETH
                    </div>
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
            {activeContent}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function WeatherSection() {
  const [weatherData, setWeatherData] = useState([
    { title: "Temperature", value: "28°C", trend: "↑" },
    { title: "Rainfall", value: "2.5mm", trend: "↓" },
    { title: "Soil Moisture", value: "65%", trend: "→" }
  ]);

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md p-6 mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Current Weather Conditions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {weatherData.map((item, index) => (
          <motion.div
            key={item.title}
            className="bg-gray-50 rounded-lg p-4"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <h3 className="text-sm font-medium text-gray-500">{item.title}</h3>
            <div className="flex items-center mt-2">
              <span className="text-2xl font-bold text-gray-900">{item.value}</span>
              <span className="ml-2 text-sm font-medium text-gray-500">{item.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function PolicySection({ expanded = false }) {
  const policies = [
    { cropType: "Wheat", coverage: "5 ETH", premium: "0.5 ETH", status: "Active" },
    { cropType: "Rice", coverage: "3 ETH", premium: "0.3 ETH", status: "Pending" }
  ];

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: expanded ? 0 : 0.4 }}
    >
      {!expanded && <h2 className="text-2xl font-semibold mb-4">Your Active Policies</h2>}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
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
                transition={{ delay: 0.5 + index * 0.1 }}
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
                  <motion.span 
                    className={`font-medium ${
                      policy.status === 'Active' ? 'text-green-600' : 'text-yellow-600'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {policy.status}
                  </motion.span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}