import {useState, useRef} from 'react';
import { useAdicionarParticipantes } from '../state/hook/useAdicionarParticipantes';
import { useMensagemDeerro } from '../state/hook/useMensagemDeErro';

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
            <input
            ref={inputRef} 
            value={nome}
            onChange={evento => setNome(evento.target.value)}
            type="text" 
            placeholder="Insira os nomes dos participantes"
            />
            <button disabled={!nome}>Adicionar</button>
            {mensagemDeErro && <p role="alert">{mensagemDeErro}</p>}

        </form>
    )
}

export default Formulario