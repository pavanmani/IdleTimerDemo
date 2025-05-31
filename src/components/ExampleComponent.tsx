import React, { useEffect } from 'react';
import { useComponentIdleTimer } from '../hooks/useComponentIdleTimer';

interface ExampleComponentProps {
  userId?: string;
  // Add other props as needed
}

const ExampleComponent: React.FC<ExampleComponentProps> = ({ userId }) => {
  const { setAsActive } = useComponentIdleTimer('example-component', {
    onPreLogout: async (): Promise<void> => {
      console.log('Example component: Pre-logout activities');
      // Show component-specific warning
      // Save draft data
      // Perform any component-specific pre-logout tasks
      
      // Example: Save draft form data
      const draftData = getDraftFormData();
      if (draftData) {
        await saveDraftToServer(draftData);
      }
    },
    onLogout: async (): Promise<void> => {
      console.log('Example component: Logout activities');
      // Save component-specific data
      await saveComponentData();
    }
  });

  useEffect(() => {
    // Set this component as active when it mounts or becomes visible
    setAsActive();
  }, [setAsActive]);

  const saveComponentData = async (): Promise<void> => {
    // Save component-specific data
    // This could be form data, user interactions, etc.
    try {
      const componentData = {
        userId,
        timestamp: new Date().toISOString(),
        // Add other component-specific data
      };
      
      // Make API call to save data
      await fetch('/api/save-component-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(componentData),
      });
    } catch (error) {
      console.error('Failed to save component data:', error);
    }
  };

  const getDraftFormData = (): any => {
    // Get any unsaved form data
    return null; // Implement based on your needs
  };

  const saveDraftToServer = async (draftData: any): Promise<void> => {
    // Save draft data to server
    try {
      await fetch('/api/save-draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(draftData),
      });
    } catch (error) {
      console.error('Failed to save draft:', error);
    }
  };

  return (
    <div>
      <h1>Example Component</h1>
      <p>User ID: {userId}</p>
      {/* Component content */}
    </div>
  );
};

export default ExampleComponent;