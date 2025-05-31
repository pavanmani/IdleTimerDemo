import React, { useState } from 'react';
import { useIdleActions } from '../hooks/useIdleActions';

const ProfilePage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const { idleState, isWarning } = useIdleActions({
    onWarning: async () => {
      console.log('Profile: 5 minutes warning triggered');
      // Auto-save form data
      await saveProfileDraft(formData);
      // Show profile-specific message
      alert('Your profile changes have been auto-saved due to inactivity warning.');
    },
    onIdle: async () => {
      console.log('Profile: Idle logout triggered');
      // Final save before logout
      await saveProfileData(formData);
    }
  });

  const saveProfileDraft = async (data: typeof formData): Promise<void> => {
    console.log('Saving profile draft...', data);
    // API call to save draft
  };

  const saveProfileData = async (data: typeof formData): Promise<void> => {
    console.log('Saving profile data before logout...', data);
    // API call to save data
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      
      {/* Idle state indicator */}
      <div className="mb-4 p-2 rounded bg-gray-100">
        <span className="font-semibold">Idle State: </span>
        <span className={`px-2 py-1 rounded text-sm ${
          isWarning ? 'bg-yellow-200 text-yellow-800' : 
          'bg-green-200 text-green-800'
        }`}>
          {idleState}
        </span>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-2 border rounded"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full p-2 border rounded"
            placeholder="Enter your email"
          />
        </div>
        <button 
          type="button" 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;