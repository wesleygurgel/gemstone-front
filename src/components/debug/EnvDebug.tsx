import React from 'react';
import { getEnv } from '../../utils/env';

/**
 * Debug component to display environment variables
 * Only use this component during development
 */
const EnvDebug: React.FC = () => {
  const env = getEnv();
  
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4 text-sm">
      <h2 className="text-lg font-bold mb-2">Environment Variables</h2>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(env).map(([key, value]) => (
          <React.Fragment key={key}>
            <div className="font-medium">{key}:</div>
            <div className="font-mono">{String(value)}</div>
          </React.Fragment>
        ))}
      </div>
      <div className="mt-4 text-xs text-gray-500">
        Note: This component should only be used during development.
      </div>
    </div>
  );
};

export default EnvDebug;