import React from 'react';

class Config extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="settings-title">Configurações</h1>
        <form>
          <label htmlFor="dificuldade">
            Dificuldade:
            <select
              name="dificuldade"
              id="dificuldade"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </label>
          <label htmlFor="sound">
            <select name="sound" id="sound">
              <option>On</option>
              <option>Off</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

export default Config;
