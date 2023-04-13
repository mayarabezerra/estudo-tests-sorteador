import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Formulario from "./Formulario";
import {RecoilRoot} from "recoil";

describe('comportamento do Formulario.tsx' , () => {
    test('quando o input está vazio, novos participantes não podem ser adicionados', () => {
        render(<RecoilRoot>
            <Formulario />
        </RecoilRoot>)
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        const botao = screen.getByRole('button')
        expect(input).toBeInTheDocument();
        expect(botao).toBeDisabled();
    })
    
    test('adicionar um participante caso exista um nome preenchido', () => {
        render(<RecoilRoot>
            <Formulario />
        </RecoilRoot>)
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        const botao = screen.getByRole('button')
        //inserir um valor no input
        fireEvent.change(input, {
            target: {
                value: 'Ana'
            }
        })
        //clicar no botão de submeter
        fireEvent.click(botao);
        //garantir que o input esteja com o foco ativo 
        expect(input).toHaveFocus();
        //garantir que o input não tenha um valor
        expect(botao).toHaveValue("")
    })
    
    test('nomes duplicados não podem ser adicionados na lista', () => {
        render(<RecoilRoot>
            <Formulario />
        </RecoilRoot>)
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        const botao = screen.getByRole('button')
        fireEvent.change(input, {
            target: {
                value: 'Ana'
            }
        })
        fireEvent.click(botao);
        fireEvent.change(input, {
            target: {
                value: 'Ana'
            }
        })
        fireEvent.click(botao);
    
        const mensagemDeErro = screen.getByRole('alert');
        expect(mensagemDeErro.textContent).toBe('Nomes duplicados não são permitidos')
    })
    
    test('a mensgaem de erro deve sumir após os timers', () => {
        jest.useFakeTimers()
    
        render(<RecoilRoot>
            <Formulario />
        </RecoilRoot>)
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        const botao = screen.getByRole('button')
        fireEvent.change(input, {
            target: {
                value: 'Ana'
            }
        })
        fireEvent.click(botao);
        fireEvent.change(input, {
            target: {
                value: 'Ana'
            }
        })
        fireEvent.click(botao);
        let mensagemDeErro = screen.queryByRole('alert');
        expect(mensagemDeErro).toBeInTheDocument();
        act(() => {
            jest.runAllTimers()
          });
        mensagemDeErro = screen.queryByRole('alert');
        expect(mensagemDeErro).toBeNull()
    })
})
