import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

let sdkInstance = null;

const initSDK = (config) => {
  sdkInstance = new SDK(config);
  return sdkInstance;
};

const getSDKInstance = () => sdkInstance;

class SDK {
  constructor(config) {
    this.config = config;
  }

  login(username, password) {
    return new Promise((resolve, reject) => {
      // Simulate async SDK login
      setTimeout(() => {
        if (username === 'user' && password === 'pass') {
          resolve({ success: true });
        } else {
          reject({ success: false, message: 'Invalid credentials' });
        }
      }, 1000);
    });
  }
}

const LoginPage = ({ onLoginSuccess, onLoginError, sdkConfig }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (sdkConfig) {
      initSDK(sdkConfig);
    }
  }, [sdkConfig]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    const sdk = getSDKInstance();
    if (!sdk) {
      setError('SDK is not initialized');
      return;
    }

    try {
      const response = await sdk.login(username, password);
      if (response.success) {
        onLoginSuccess();
      } else {
        setError('Login failed');
        onLoginError(response.message);
      }
    } catch (err) {
      setError('An error occurred');
      onLoginError(err.message);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

LoginPage.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
  onLoginError: PropTypes.func.isRequired,
  sdkConfig: PropTypes.object
}
export default LoginPage;
