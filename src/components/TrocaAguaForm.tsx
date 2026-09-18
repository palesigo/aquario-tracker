import { useState, type FormEvent } from 'react';
import { db } from '../db/db';

export default function TrocaAguaForm() {
  const hoje = new Date().toISOString().slice(0, 10);
  const [data, setData] = useState(hoje);
  const [litros, setLitros] = useState<string>('');
  const [observacoes, setObservacoes] = useState('');
  const [guardado, setGuardado] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await db.trocasAgua.add({
      data,
      litros: litros ? Number(litros) : undefined,
      observacoes: observacoes.trim() || undefined,
    });
    setObservacoes('');
    setLitros('');
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
  }

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <h2>Registar troca de água</h2>

      <label>
        Data
        <input type="date" value={data} onChange={(e) => setData(e.target.value)} required />
      </label>

      <label>
        Litros trocados (opcional)
        <input
          type="number"
          min="0"
          step="0.5"
          value={litros}
          onChange={(e) => setLitros(e.target.value)}
          placeholder="ex: 20"
        />
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

      <button type="submit">Guardar troca de água</button>
      {guardado && <p className="sucesso">Registo guardado!</p>}
    </form>
  );
}
