<<<<<<< HEAD
import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
=======
import { screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../App";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
>>>>>>> 7a17e0afffc35e41b2689699a16dc97d0aa40532

const token = {
  "response_code":0,
  "response_message":"Token Generated Successfully!",
  "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6",
};
<<<<<<< HEAD

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
=======
const { store } = renderWithRouterAndRedux(<Login />);

jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue({ token }),
  });


describe('Testando as configurações do componente Login', () => {
    it('Testando se a página de login renderiza corretamente', () => {

      const testeRender = renderWithRouterAndRedux(<App />);
      
      const inputPlayerName = screen.getByTestId('input-player-name');
      const inputGravatarEmail = screen.getByTestId('input-gravatar-email');
      const buttonPlay = screen.getByRole('button', { name: 'Play'});
      const buttonConfiguracoes = screen.getByRole('button', { name: 'Configurações'})

      expect(inputPlayerName).toBeInTheDocument();
      expect(inputGravatarEmail).toBeInTheDocument();
      expect(buttonPlay).toBeInTheDocument();
      expect(buttonConfiguracoes).toBeInTheDocument();
    
        const { pathname } = testeRender.history.location;
        expect(pathname).toBe('/');
      });

    it('Testando se os botões dos componentes redirecionam corretamente', () => {
    
    renderWithRouterAndRedux(<App />);
    // const { pathname } = renderGame.history.location;
    // expect(pathname).toBe('/game');

    const inputPlayerName = screen.getByTestId('input-player-name');
    const inputGravatarEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');
  
    expect(btnPlay).toBeDisabled();

    userEvent.type(inputPlayerName, 'Nome');
    expect(btnPlay).toBeDisabled();

    userEvent.type(inputGravatarEmail, 'trivia@trybe.com');
    expect(btnPlay).not.toBeDisabled();

  });

  it('Testando os botões de configurações e Play', () => {
    renderWithRouterAndRedux(<App />);

    const buttonConfiguracoes = screen.getByRole('button', { name: 'Configurações'});
    const buttonClickPlay = screen.getByRole('button', { name: 'Play'});
    
    userEvent.click(buttonConfiguracoes);
    userEvent.click(buttonClickPlay);

    const buttonTextConfiguracoes = screen.getByText(/Configurações/i);
    expect(buttonTextConfiguracoes).toBeInTheDocument();
  })

  it('Testando os textos da página de login', () => {
    renderWithRouterAndRedux(<App />);

    // const suaVez = screen.getByText(/SUA VEZ/i);
    const labelEmail = screen.getByLabelText('Email:');
    const labelName = screen.getByLabelText('Name:');

    // expect(suaVez).toBeInTheDocument();
    expect(labelEmail).toBeInTheDocument();
    expect(labelName).toBeInTheDocument();

  })

  it('Teste se o input funciona', async() => {
    renderWithRouterAndRedux(<App />);

    const inputPlayerName = screen.getByTestId('input-player-name');
    const inputGravatarEmail = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByRole('button', { name: 'Play'});

    userEvent.type(inputPlayerName, 'nome');
    userEvent.type(inputGravatarEmail, 'email');
    expect(inputPlayerName).toHaveValue('nome');
    expect(inputGravatarEmail).toHaveValue('email');

    userEvent.click(buttonPlay);

    const getPlayerName = screen.getByText('nome');
    const email = screen.getByText('email');

    expect(getPlayerName && email).toBeInTheDocument();

  })

  // it('login', () => {
  //   renderWithRouterAndRedux(<App />);

  //   const testeToken = JSON.parse(localStorage.getItem('token'));

  //   expect(testeToken).toBeDefined();
  //   expect(storageToken).toBe(mockToken["token"]);



  })
>>>>>>> 7a17e0afffc35e41b2689699a16dc97d0aa40532
