import {useState, useRef} from 'react';
import { useAdicionarParticipantes } from '../state/hook/useAdicionarParticipantes';
import { useMensagemDeerro } from '../state/hook/useMensagemDeErro';
import './Formulario.css'


const Formulario = () => {

    const [nome, setNome] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const adicionarNaLista = useAdicionarParticipantes()

    const mensagemDeErro = useMensagemDeerro()

    const adicionarParticipantes = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        adicionarNaLista(nome)
        setNome('')
        inputRef.current?.focus()
    }

    return (
        <form onSubmit={adicionarParticipantes}>
            <div className="grupo-input-btn">
            <input
            ref={inputRef} 
            value={nome}
            onChange={evento => setNome(evento.target.value)}
            type="text" 
            placeholder="Insira os nomes dos participantes"
            />
            <button disabled={!nome}>Adicionar</button>
            {mensagemDeErro && <p className="alerta erro" role="alert">{mensagemDeErro}</p>}
            </div>
        </form>
    )
}

export default Formulario