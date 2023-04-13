import {useState, useRef} from 'react';
import { useAdicionarParticipantes } from '../state/hook/useAdicionarParticipantes';

const Formulario = () => {

    const [nome, setNome] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const adicionarNaLista = useAdicionarParticipantes()

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
        </form>
    )
}

export default Formulario