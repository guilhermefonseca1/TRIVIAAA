import React from "react";
import { screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import Feedback from '../Pages/Feedback';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from '../App';

const USUARIO_WELL_DONE = {
    player: {
        name: 'Grupo 35',
        assertions: 4,
        score: 20,
        gravatarEmail: 'grupo@35.com',
    }
};

const USUARIO_COULD_BE_BETTER = {
    player: {
        name: 'Grupo 35',
        assertions: 2,
        score: 10,
        gravatarEmail: 'grupo@35.com',
    }
};

const WELL_DONE = 'Well Done!';
const COULD_BE_BETTER = 'Could be better...';

describe('Testando as configurações do componente Feedback', () => {
    it('Testando textos e testids da página de feedback', () => {
        renderWithRouterAndRedux(<Feedback />);
      
      const feedbackText = screen.getByTestId('feedback-text');
      const feedbackTotalScore = screen.getByTestId('feedback-total-score');
      const feedbackTotalQuestion = screen.getByTestId('feedback-total-question');
     

      expect(feedbackText).toBeInTheDocument();
        expect(feedbackTotalScore).toBeInTheDocument();
          expect(feedbackTotalQuestion).toBeInTheDocument();
        
    });
    it('Testando os botões da página de Feedback', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        
        history.push('/feedback');
        
        const buttonPlayAgain = screen.getByRole('button', { name: 'Play Again'});
        const btnPlayAgainTestId = screen.getByTestId('btn-play-again');

        userEvent.click(buttonPlayAgain);
        expect(btnPlayAgainTestId).toBeDefined();
    
    });
    it('Testando o botão de ranking', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        
        history.push('/feedback');
        
        const buttonRanking = screen.getByRole('button', { name: 'Ranking'});
        const btnRankingTestId = screen.getByTestId('btn-ranking');

        userEvent.click(buttonRanking);
        expect(btnRankingTestId).toBeDefined();
    
    });
    it('Testando se a página de Feedback renderiza quando há três ou mais acertos', () => {
        renderWithRouterAndRedux(<App />, USUARIO_WELL_DONE, '/feedback');
        
        const feedBackPositive = screen.getByTestId('feedback-text');
        
        expect(feedBackPositive).toHaveTextContent(WELL_DONE);
    });
    
    it('Testando se a página de Feedback renderiza quando há menos de três acertos', () => {
        renderWithRouterAndRedux(<App />, USUARIO_COULD_BE_BETTER, '/feedback');

        const feedBackNegative = screen.getByTestId('feedback-text');
        console.log(feedBackNegative.innerHTML)
       
        expect(feedBackNegative).toHaveTextContent(COULD_BE_BETTER);
    });
}); 