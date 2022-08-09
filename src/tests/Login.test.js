import { screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../App";
import Login from '../Pages/Login';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import testeToken from './testeToken/testeToken';


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

    const labelEmail = screen.getByLabelText('Email:');
    const labelName = screen.getByLabelText('Name:');

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

})
describe('Testa se na página de login há data-test', () => {
  window.fetch = jest.fn(async () => ({
    json: async () => testeToken,
  }))

  it('Verifica se há o data-test: input-player-name na página de Login', () => { 
    renderWithRouterAndRedux(<Login />);
    const name = screen.getByTestId('input-player-name');

    expect(name).toBeDefined()
  })
})

