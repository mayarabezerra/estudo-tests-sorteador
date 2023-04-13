import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Formulario from "./Formulario";
import {RecoilRoot} from "recoil";


test('quando o input está vazio, novos participantes não podem ser adicionados', () => {
    render(<Formulario />)
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