import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../context/FormContext';
import Layout from '../components/Layout';
import DocumentUpload from '../components/DocumentUpload';
import { PaperClipIcon } from '@heroicons/react/solid';

const ApplicationForm: React.FC = () => {
  const { formData, setFormData, formProgress, setFormProgress } = useContext(FormContext);
  const [step, setStep] = useState(1);

  const [showSaveAlert, setShowSaveAlert] = useState(false); // State for success alert
  const [showSaveDraftAlert, setShowSaveDraftAlert] = useState(false); // State for success draft alert

  const navigate = useNavigate ();

  useEffect(() => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(value => value !== '').length;
    const progress = filledFields === 0 ? 0 : (filledFields / totalFields) * 100;
    setFormProgress(progress);
  }, [formData, setFormProgress]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const totalSteps = 3; // Adjust based on your form steps

  const handleNext = () => {
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Show alert
    setShowSaveAlert(true);

    // Hide alert after 3 seconds
    setTimeout(() => {
      setShowSaveAlert(false);
      navigate('/dashboard');
    }, 3000);

    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleSaveDraft = () => {

    setShowSaveDraftAlert(true);
    // Save draft to context and redirect to dashboard
    // Hide alert after 3 seconds
    setTimeout(() => {
      setShowSaveDraftAlert(false);
      navigate('/dashboard');
    }, 3000);

    console.log('Draft saved:', formData);
  };

  const getProgressWidth = () => {
    return `${formProgress}%`;
  };

  const isSubmitDisabled = Object.values(formData).every(value => value === '');

  const calculateFormProgress = () => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter((value) => value !== "").length;
    return Math.round((filledFields / totalFields) * 100);
  };
  return (
    <Layout>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          Application Form
          <div className="text-right text-sm font-medium text-gray-600">
            Step {step} of {totalSteps} | {calculateFormProgress()}% Completed
          </div>
        </h2>
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: getProgressWidth() }}></div>
          </div>
          <div className="flex justify-between text-sm font-medium text-gray-600">
            <span className={step === 1 ? 'text-blue-500' : ''}>Step 1</span>
            <span className={step === 2 ? 'text-blue-500' : ''}>Step 2</span>
            <span className={step === 3 ? 'text-blue-500' : ''}>Step 3</span>
          </div>
        </div>
        {step === 1 && (
          <div>
            <h3 className="text-xl mb-4">Step 1: Personal Information</h3>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-900">
                  First name
                </label>
                <div className="mt-2">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-900">
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="gender" className="block text-sm font-medium text-gray-900">
                  Gender
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="gender"
                    name="gender"
                    autoComplete="gender"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-900">
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    id="streetAddress"
                    name="streetAddress"
                    type="text"
                    autoComplete="street-address"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={formData.streetAddress}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="city" className="block text-sm font-medium text-gray-900">
                  City
                </label>
                <div className="mt-2">
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="region" className="block text-sm font-medium text-gray-900">
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    id="region"
                    name="region"
                    type="text"
                    autoComplete="address-level1"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={formData.region}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-900">
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    autoComplete="postal-code"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="country" className="block text-sm font-medium text-gray-900">
                  Country
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <option value="">Select Country</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Mexico">Mexico</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-full">
                <label className="block mb-2">Upload KYC Documents (PDF only)</label>
                <DocumentUpload />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button onClick={handleSaveDraft} className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600">
                Save Draft
              </button>
              <button onClick={handleNext} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Next
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h3 className="text-xl mb-4">Step 2: Education Information</h3>
            <div className="mb-4">
              <label className="block mb-2 text-gray-900">Highest Qualification</label>
              <input
                type="text"
                name="highestQualification"
                value={formData.highestQualification}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-900">University/College</label>
              <input
                type="text"
                name="university"
                value={formData.university}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-900">Year of Graduation</label>
              <input
                type="text"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-900">Upload Certificates (PDF only)</label>
              <DocumentUpload />
            </div>
            <div className="flex justify-between mt-4">
              <button onClick={handleSaveDraft} className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600">
                Save Draft
              </button>
              <button onClick={handlePrev} className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600">
                Previous
              </button>
              <button onClick={handleNext} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Next
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h3 className="text-xl mb-4">Step 3: Preview</h3>
            <div>
              <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium text-gray-900">Full name</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{formData.firstName} {formData.lastName}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium text-gray-900">Email address</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{formData.email}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium text-gray-900">Gender</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{formData.gender}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium text-gray-900">Street Address</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{formData.streetAddress}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium text-gray-900">City</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{formData.city}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium text-gray-900">State / Province</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{formData.region}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium text-gray-900">ZIP / Postal Code</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{formData.postalCode}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium text-gray-900">Country</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{formData.country}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium text-gray-900">Highest Qualification</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{formData.highestQualification}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium text-gray-900">University/College</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{formData.university}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium text-gray-900">Year of Graduation</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{formData.graduationYear}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium text-gray-900">Attachments</dt>
                    <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                        <li className="flex items-center justify-between py-4 pr-5 pl-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <PaperClipIcon aria-hidden="true" className="h-5 w-5 shrink-0 text-gray-400" />
                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                              <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                              <span className="shrink-0 text-gray-400">2.4mb</span>
                            </div>
                          </div>
                          <div className="ml-4 shrink-0">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                              Download
                            </a>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-4 pr-5 pl-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <PaperClipIcon aria-hidden="true" className="h-5 w-5 shrink-0 text-gray-400" />
                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                              <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                              <span className="shrink-0 text-gray-400">4.5mb</span>
                            </div>
                          </div>
                          <div className="ml-4 shrink-0">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                              Download
                            </a>
                          </div>
                        </li>
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button onClick={handleSaveDraft} className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600">
                Save Draft
              </button>
              <button onClick={handlePrev} className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600">
                Previous
              </button>
              <button disabled={isSubmitDisabled} onClick={handleSubmit} className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
      {showSaveAlert && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-lg shadow-md transition-opacity duration-500">
          Application saved successfully!
        </div>
      )}
      {showSaveDraftAlert && (
        <div className="fixed bottom-4 right-4 bg-yellow-500 text-white p-3 rounded-lg shadow-md transition-opacity duration-500">
          Application Form Draft successfully!
        </div>
      )}
    </Layout>
  );
};

export default ApplicationForm;