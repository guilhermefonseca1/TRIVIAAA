import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const token = {
  "response_code":0,
  "response_message":"Token Generated Successfully!",
  "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6",
};

afterEach((() => jest.clearAllMocks));

describe('Testando o componente <Login />', () => {
  it('Testando o formulario de login', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(token),
      });
    renderWithRouterAndRedux(<App />);
    
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByRole('button', { name: 'Play' });

    expect(inputName && inputEmail && buttonPlay).toBeInTheDocument();

    userEvent.type(inputName, 'nickName');
    userEvent.type(inputEmail, 'alguem@alguem.com');
    userEvent.click(buttonPlay);
    
    expect(fetch).toHaveBeenCalled();
  });
  it('Testando o botão de Settings da pagina de login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
    
    const buttonSettings = screen.getByRole('button', { name: 'Settings' });
    expect(buttonSettings).toBeInTheDocument();
    userEvent.click(buttonSettings);

    expect(history.location.pathname).toBe('/config');
  });
});
