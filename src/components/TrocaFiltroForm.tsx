import { useState, type FormEvent } from 'react';
import { db } from '../db/db';
import { TIPOS_FILTRO, type TipoFiltro } from '../types';

export default function TrocaFiltroForm() {
  const hoje = new Date().toISOString().slice(0, 10);
  const [data, setData] = useState(hoje);
  const [filtro, setFiltro] = useState<TipoFiltro>('Bio Clear');
  const [observacoes, setObservacoes] = useState('');
  const [guardado, setGuardado] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await db.trocasFiltro.add({
      data,
      filtro,
      observacoes: observacoes.trim() || undefined,
    });
    setObservacoes('');
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
  }

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <h2>Registar troca de filtro</h2>

      <label>
        Data
        <input type="date" value={data} onChange={(e) => setData(e.target.value)} required />
      </label>

      <label>
        Filtro trocado
        <select value={filtro} onChange={(e) => setFiltro(e.target.value as TipoFiltro)}>
          {TIPOS_FILTRO.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
      </label>

      <label>
        Observações (opcional)
        <textarea
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
          rows={3}
          placeholder="Notas sobre a troca..."
        />
      </label>

      <button type="submit">Guardar troca de filtro</button>
      {guardado && <p className="sucesso">Registo guardado!</p>}
    </form>
  );
}
