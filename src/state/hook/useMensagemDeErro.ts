import {useRecoilValue} from 'recoil'
import { erroState } from "../atom"

export const useMensagemDeerro = () => {
    const mensagem = useRecoilValue(erroState)
    return mensagem;
}