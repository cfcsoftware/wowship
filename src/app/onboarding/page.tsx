"use client";
import React, { useState, useEffect, FC } from 'react';
import { tenantAuthHandler } from '@/utils/tenantAuthHandler';
import {
  Sparkles,
  CheckCircle,
  Package,
  FileText,
  Rocket,
  ArrowRight,
  Loader,
  Settings,
  LucideIcon,
} from 'lucide-react';

// Define the steps of the onboarding process
type OnboardingStep = 'greeting' | 'consent' | 'warehouse' | 'animation' | 'done';

const onboardingSteps: { id: OnboardingStep; name: string; icon: LucideIcon }[] = [
  { id: 'greeting', name: 'Welcome', icon: Sparkles },
  { id: 'consent', name: 'Consent', icon: FileText },
  { id: 'warehouse', name: 'Warehouse', icon: Package },
  { id: 'animation', name: 'Finalizing', icon: Settings },
  { id: 'done', name: 'Ready', icon: Rocket },
];

const OnboardingPage: FC = () => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('greeting');
  const [stepToRender, setStepToRender] = useState<OnboardingStep>('greeting');
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [showPolicyModal, setShowPolicyModal] = useState<boolean>(false);
  const [showFinalModal, setShowFinalModal] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [warehouseData, setWarehouseData] = useState({
    phone: '',
    city: '',
    name: '',
    pin: '',
    address: '',
    country: '',
    email: '',
    registered_name: '',
    return_address: '',
    return_pin: '',
    return_city: '',
    return_state: '',
    return_country: '',
    state: '',
  });

  // Animation state
  const [animationProgress, setAnimationProgress] = useState<number>(0);
  const [animationText, setAnimationText] = useState<string>('Initializing account setup...');

  // Transition effect
  useEffect(() => {
    setIsAnimating(true);
    const timeout = setTimeout(() => {
      setStepToRender(currentStep);
      setIsAnimating(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [currentStep]);

  // Handle initial greeting transition
  useEffect(() => {
    if (currentStep === 'greeting') {
      const timeout = setTimeout(() => {
        setCurrentStep('consent');
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [currentStep]);

  // Animation step logic
  useEffect(() => {
    if (currentStep === 'animation') {
      const animationSteps = [
        { progress: 20, text: 'Inlining the internal setup...' },
        { progress: 50, text: 'Configuring your profile...' },
        { progress: 75, text: 'Connecting your wallet...' },
        { progress: 100, text: 'Getting your system ready!' },
      ];

      const animate = (stepIndex: number) => {
        if (stepIndex < animationSteps.length) {
          const { progress, text } = animationSteps[stepIndex];
          setTimeout(() => {
            setAnimationProgress(progress);
            setAnimationText(text);
            setTimeout(() => {
              animate(stepIndex + 1);
            }, 2000);
          }, stepIndex === 0 ? 500 : 2500);
        } else {
          setTimeout(() => {
            setCurrentStep('done');
          }, 1000);
        }
      };
      animate(0);
    }
  }, [currentStep]);

  // Final screen logic: show modal and redirect
  useEffect(() => {
    if (currentStep === 'done') {
      setShowFinalModal(true);
    }
  }, [currentStep]);

  useEffect(() => {
    if (showFinalModal) {
      const redirectTimeout = setTimeout(() => {
        window.location.href = '/dashboard';
      }, 3000); // Redirect after 3 seconds
      return () => clearTimeout(redirectTimeout);
    }
  }, [showFinalModal]);

  // Handlers for navigation
  const handleNext = () => {
    const steps: OnboardingStep[] = ['greeting', 'consent', 'warehouse', 'animation', 'done'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const renderContent = () => {
    switch (stepToRender) {
      case 'greeting':
        return (
          <div className="flex flex-col items-center p-8 w-full max-w-lg text-center transform transition-transform duration-500 scale-100">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-orange-600 mb-4 animate-pulse">
              Welcome aboard!
            </h1>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              We Ovoship Welcomes you.
            </h2>
            <p className="text-gray-500 text-lg sm:text-xl font-light mb-2">
              Express shipping world wide
            </p>
            <p className="text-gray-500 text-base sm:text-lg">
              Your journey into modern supply chain management begins now. We are excited to have you!
            </p>
          </div>
        );

      case 'consent':
        return (
          <div className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-xl w-full max-w-lg transform transition-transform duration-500 scale-100">
            <Sparkles size={48} className="text-orange-600 mb-4 animate-pulse" />
            <h1 className="text-3xl font-bold mb-2 text-gray-800 text-center">Terms & Conditions</h1>
            <p className="text-gray-500 text-center mb-8">
              Please review and accept our policies to continue your setup.
            </p>
            <div className="flex items-center mb-6 w-full">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="form-checkbox h-5 w-5 text-orange-600 rounded-lg focus:ring-2 focus:ring-orange-500 transition-all"
              />
              <label htmlFor="terms" className="ml-3 text-gray-700 select-none">
                I agree to the
                <button
                  onClick={() => setShowPolicyModal(true)}
                  className="text-orange-600 font-semibold ml-1 hover:underline transition-all"
                >
                  Terms and Conditions
                </button>
                .
              </label>
            </div>
            <button
              onClick={handleNext}
              disabled={!acceptedTerms}
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                acceptedTerms
                  ? 'bg-orange-600 text-white hover:bg-orange-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue
              <ArrowRight size={18} className="inline ml-2" />
            </button>
          </div>
        );

      case 'warehouse':
        const handleWarehouseSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const payload = {
            registered_warehouse_name: warehouseData.registered_name,
            name: warehouseData.name,
            address: warehouseData.address,
            pin: warehouseData.pin,
            city: warehouseData.city,
            state: warehouseData.state,
            country: warehouseData.country,
            phone: warehouseData.phone,
            email: warehouseData.email,
            return_address: warehouseData.return_address,
            return_pin: warehouseData.return_pin,
            return_city: warehouseData.return_city,
            return_state: warehouseData.return_state,
            return_country: warehouseData.return_country,
          };

          try {
            const data = await tenantAuthHandler('/api/v1/warehouse/add-warehouse', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            });

            // Assuming tenantAuthHandler returns parsed JSON on success and throws on error
            console.log('Warehouse details', data);
            // alert('Warehouse added successfully');
            handleNext();
            
          } catch (error) {
            console.error('Error submitting warehouse data:', error);
            const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
            alert(message);
          }
        };
        return (
          <div className="flex flex-col p-8 bg-white rounded-2xl shadow-xl w-full max-w-4xl transform transition-transform duration-500 scale-100">
            <Package size={48} className="text-orange-600 mb-4 self-center" />
            <h1 className="text-3xl font-bold mb-2 text-gray-800 text-center">Add Your First Warehouse</h1>
            <p className="text-gray-500 text-center mb-8">
              This information is crucial for managing your inventory and shipments.
            </p>
            <div className="overflow-y-auto max-h-[60vh] pr-4">
              <form onSubmit={handleWarehouseSubmit} className="space-y-6 w-full">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-1">Warehouse Name</label>
                    <input
                      type="text"
                      value={warehouseData.name}
                      onChange={(e) => setWarehouseData({ ...warehouseData, name: e.target.value })}
                      className="w-full p-3 border-b-2 border-gray-300 bg-gray-50 focus:border-orange-500 focus:outline-none transition-all rounded-lg"
                      placeholder="e.g., Main Distribution Center"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Registered Name</label>
                    <input
                      type="text"
                      value={warehouseData.registered_name}
                      onChange={(e) => setWarehouseData({ ...warehouseData, registered_name: e.target.value })}
                      className="w-full p-3 border-b-2 border-gray-300 bg-gray-50 focus:border-orange-500 focus:outline-none transition-all rounded-lg"
                      placeholder="e.g., Your Company Inc."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={warehouseData.email}
                      onChange={(e) => setWarehouseData({ ...warehouseData, email: e.target.value })}
                      className="w-full p-3 border-b-2 border-gray-300 bg-gray-50 focus:border-orange-500 focus:outline-none transition-all rounded-lg"
                      placeholder="e.g., contact@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={warehouseData.phone}
                      onChange={(e) => setWarehouseData({ ...warehouseData, phone: e.target.value })}
                      className="w-full p-3 border-b-2 border-gray-300 bg-gray-50 focus:border-orange-500 focus:outline-none transition-all rounded-lg"
                      placeholder="e.g., 9999999999"
                      required
                    />
                  </div>
                  <div className="md:col-span-4">
                    <label className="block text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      value={warehouseData.address}
                      onChange={(e) => setWarehouseData({ ...warehouseData, address: e.target.value })}
                      className="w-full p-3 border-b-2 border-gray-300 bg-gray-50 focus:border-orange-500 focus:outline-none transition-all rounded-lg"
                      placeholder="e.g., 123 Supply Chain Rd"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      value={warehouseData.city}
                      onChange={(e) => setWarehouseData({ ...warehouseData, city: e.target.value })}
                      className="w-full p-3 border-b-2 border-gray-300 bg-gray-50 focus:border-orange-500 focus:outline-none transition-all rounded-lg"
                      placeholder="e.g., Kota"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      value={warehouseData.state}
                      onChange={(e) => setWarehouseData({ ...warehouseData, state: e.target.value })}
                      className="w-full p-3 border-b-2 border-gray-300 bg-gray-50 focus:border-orange-500 focus:outline-none transition-all rounded-lg"
                      placeholder="e.g., Rajasthan"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Pincode</label>
                    <input
                      type="text"
                      value={warehouseData.pin}
                      onChange={(e) => setWarehouseData({ ...warehouseData, pin: e.target.value })}
                      className="w-full p-3 border-b-2 border-gray-300 bg-gray-50 focus:border-orange-500 focus:outline-none transition-all rounded-lg"
                      placeholder="e.g., 110042"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Country</label>
                    <input
                      type="text"
                      value={warehouseData.country}
                      onChange={(e) => setWarehouseData({ ...warehouseData, country: e.target.value })}
                      className="w-full p-3 border-b-2 border-gray-300 bg-gray-50 focus:border-orange-500 focus:outline-none transition-all rounded-lg"
                      placeholder="e.g., India"
                      required
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Return Address</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="md:col-span-4">
                    <label className="block text-gray-700 mb-1">Return Address</label>
                    <input
                      type="text"
                      value={warehouseData.return_address}
                      onChange={(e) => setWarehouseData({ ...warehouseData, return_address: e.target.value })}
                      className="w-full p-3 border-b-2 border-gray-300 bg-gray-50 focus:border-orange-500 focus:outline-none transition-all rounded-lg"
                      placeholder="e.g., 456 Return Avenue"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Return City</label>
                    <input
                      type="text"
                      value={warehouseData.return_city}
                      onChange={(e) => setWarehouseData({ ...warehouseData, return_city: e.target.value })}
                      className="w-full p-3 border-b-2 border-gray-300 bg-gray-50 focus:border-orange-500 focus:outline-none transition-all rounded-lg"
                      placeholder="e.g., Kota"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Return State</label>
                    <input
                      type="text"
                      value={warehouseData.return_state}
                      onChange={(e) => setWarehouseData({ ...warehouseData, return_state: e.target.value })}
                      className="w-full p-3 border-b-2 border-gray-300 bg-gray-50 focus:border-orange-500 focus:outline-none transition-all rounded-lg"
                      placeholder="e.g., Delhi"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Return Pincode</label>
                    <input
                      type="text"
                      value={warehouseData.return_pin}
                      onChange={(e) => setWarehouseData({ ...warehouseData, return_pin: e.target.value })}
                      className="w-full p-3 border-b-2 border-gray-300 bg-gray-50 focus:border-orange-500 focus:outline-none transition-all rounded-lg"
                      placeholder="e.g., 110042"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Return Country</label>
                    <input
                      type="text"
                      value={warehouseData.return_country}
                      onChange={(e) => setWarehouseData({ ...warehouseData, return_country: e.target.value })}
                      className="w-full p-3 border-b-2 border-gray-300 bg-gray-50 focus:border-orange-500 focus:outline-none transition-all rounded-lg"
                      placeholder="e.g., India"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-all duration-300 mt-6 sticky bottom-0"
                >
                  Save and Continue
                </button>
              </form>
            </div>
          </div>
        );

      case 'animation':
        const dashoffset = 2 * Math.PI * 40 * (1 - animationProgress / 100);
        return (
          <div className="relative flex flex-col items-center justify-center p-8 w-full max-w-lg">
            <div className="relative w-40 h-40 mb-6 flex items-center justify-center">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle
                  className="text-gray-200"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="80"
                  cy="80"
                />
                <circle
                  className="text-orange-600 transition-all duration-1000 ease-in-out"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="80"
                  cy="80"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 2 * Math.PI * 40,
                    strokeDashoffset: dashoffset,
                  }}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <Loader size={64} className="text-orange-600 animate-spin" />
                <div className="absolute text-2xl font-bold text-gray-800 -bottom-10">
                  {animationProgress}%
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">
              Account Setup
            </h1>
            <p className="text-gray-500 mb-6 text-center transition-opacity duration-500" style={{ opacity: animationProgress > 0 ? 1 : 0 }}>
              {animationText}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-orange-600 h-2.5 rounded-full transition-all duration-2000 ease-in-out"
                style={{ width: `${animationProgress}%` }}
              ></div>
            </div>
          </div>
        );

      case 'done':
        return null;
      default:
        return null;
    }
  };

  const renderProgressBar = () => {
    const activeStepIndex = onboardingSteps.findIndex(step => step.id === currentStep);
    return (
      <div className="hidden lg:flex flex-col items-start pr-12 lg:w-96">
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-2 bg-gray-200 rounded-full"></div>
          <div
            className="absolute left-6 top-0 bottom-0 w-2 bg-orange-600 rounded-full transition-all duration-500 ease-in-out"
            style={{ height: `${(activeStepIndex / (onboardingSteps.length - 1)) * 100}%` }}
          ></div>
          {onboardingSteps.map((step, index) => (
            <div key={index} className="flex items-center space-x-4 mb-12 relative z-10">
              <div className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-500 ${
                activeStepIndex >= index ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {activeStepIndex > index ? <CheckCircle size={24} /> : <step.icon size={24} />}
              </div>
              <span className={`text-2xl font-semibold transition-all duration-500 ${
                activeStepIndex >= index ? 'text-gray-800 font-bold' : 'text-gray-400'
              }`}>
                {step.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-center items-center p-4 lg:p-12 font-inter antialiased">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center lg:space-x-12">
        {renderProgressBar()}
        <div className={`relative transition-opacity duration-500 ease-in-out w-full flex-grow flex justify-center ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <div className="relative w-full flex flex-col items-center">
            {renderContent()}
          </div>
        </div>
      </div>
      {/* Privacy Policy Modal */}
      {showPolicyModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full max-h-[90vh] flex flex-col transition-all duration-300 transform scale-95 opacity-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <FileText size={24} className="mr-2 text-orange-600" />
                Privacy Policy & Terms
              </h2>
              <button
                onClick={() => setShowPolicyModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-all"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            <div className="overflow-y-auto pr-4 text-gray-700 leading-relaxed">
              <p className="mb-4">
                <strong>1. Introduction</strong>
                <br />
                Welcome to Ovoshipai. This Privacy Policy outlines our commitment to protecting the privacy of your data and information. By using our services, you consent to the collection, use, and disclosure of your information as described in this policy.
              </p>
              <p className="mb-4">
                <strong>2. Information We Collect</strong>
                <br />
                We collect information to provide and improve our services. This includes personal information you provide directly, such as your name, email address, and company details, as well as data related to your use of our platform.
              </p>
              <p className="mb-4">
                <strong>3. How We Use Your Information</strong>
                <br />
                Your information is used to provide, maintain, and improve our services, process transactions, communicate with you, and ensure the security of our platform. We may also use your data for internal analysis and to develop new features.
              </p>
              <p className="mb-4">
                <strong>4. Data Security</strong>
                <br />
                We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
              <p className="mb-4">
                <strong>5. Changes to This Policy</strong>
                <br />
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
              </p>
              <p>
                <strong>6. Contact Us</strong>
                <br />
                If you have any questions about this Privacy Policy, please contact us.
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowPolicyModal(false)}
                className="py-2 px-6 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Final Pop-up Modal */}
      {showFinalModal && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center transition-all duration-300 transform scale-95 opacity-100">
            <CheckCircle size={64} className="text-green-500 mx-auto mb-4 animate-bounce" />
            <h1 className="text-3xl font-bold mb-2 text-gray-800">Hurray!! you are online.</h1>
            <p className="text-gray-500 mb-6">
              Get started your shipping.
            </p>
            <p className="text-gray-400 text-sm">
              Redirecting you to the dashboard in 3 seconds...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingPage;
