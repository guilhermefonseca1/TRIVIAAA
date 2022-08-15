import React, { Component } from 'react';
import '../Style/Settings.css';

class Settings extends Component {
  render() {
    return (
      <div className="settings">
        <h1
          className="set-title"
          data-testid="settings-title"
        >
          Configurações!

        </h1>
      </div>
    );
  }
}
export default Settings;
