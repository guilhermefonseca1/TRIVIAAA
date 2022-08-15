import { screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import React from "react";
import App from '../App';
import questionsResponse from './mockGame/questionsResponse';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import Game from "../Pages/Game";
import asks from '../Redux/Reducer/asks';


const USUARIO = {
    player: {
        name: 'Grupo 35',
        assertions: 0,
        score: 0,
        gravatarEmail: 'grupo@35.com',
     }
    };
      

describe('Testando as configurações do componente Game', () => {

    it('Testando texto, click e testid do botão Next na página Game', async () => {
        renderWithRouterAndRedux(<Game />, USUARIO, '/game');

      
        
       const buttonNext = screen.getByRole('button', { name: /Next/i});
       expect(buttonNext).toBeInTheDocument()
       
       
    //    const btnNext = screen.getByTestId('btn-play')
    //    expect(btnNext).toBeInTheDocument()
    //    userEvent.click(btnNext)

    });
    
//     it('Testando click na alternativa corret e errrada na página Game', async () => {
//         renderWithRouterAndRedux(<App />, '/game');

//         jest.useFakeTimers();
//         global.fetch = jest.fn(() => Promise.resolve({
//             json: () => Promise.resolve(questionsResponseResponse),
//         }));
        
//        const correctAnswer = await screen.findByTestId('correct-answer');
//        jest.runAllTimers();

//        expect(correctAnswer).toBeDisabled()
//        userEvent.click(correctAnswer)

//     });
// });

// describe('Testando as configurações do componente Game', () => {
// it('Testando click na alternativa correta e errrada na página Game', async () => {
//     jest.spyOn(global, 'fetch').mockResolvedValue({
//         json: jest.fn().mockResolvedValue(questionsResponseResponse),
//     });
//     renderWithRouterAndRedux(<App />, USUARIO, '/game');

    
//    const questionCategory = await screen.findByTestId('question-category');

//    expect(questionCategory).toBeInTheDocument();

   
// });
// });


// beforeEach(async () => {




//     global.fetch = jest.fn().mockResolvedValue({
   
   
//       json: jest.fn().mockResolvedValue(questionsResponse)
   
   
//     });
   
   
//     renderWithRouterAndRedux(<Game />,
   
   
//       USUARIO,
   
   
//       "/game"
   
   
//     )
   
   
//     await waitFor(() => expect(global.fetch).toHaveBeenCalled());
   
   
//    })
   
   
//    const { results } = questionsResponse;
   
   
   
   
   
   
   
//    describe.only('Desenvolva testes para atingir 90% de cobertura da tela de Jogo', () => {
   
   
//     test('se tem gravatar, player name e score', () => {
   
   
//       const gravatar = screen.getByTestId('header-profile-picture');
   
   
//       const playerName = screen.getByTestId('header-player-name');
   
   
//       const Score = screen.getByTestId('header-score');
   
   
//       expect(gravatar).toBeInTheDocument();
   
   
//       expect(playerName).toBeInTheDocument();
   
   
//       expect(Score).toBeInTheDocument();
   
   
//     });
});




