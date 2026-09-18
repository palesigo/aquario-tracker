import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db';
import { TIPOS_FILTRO } from '../types';

function diasDesde(dataISO: string): number {
  const d1 = new Date(dataISO);
  const d2 = new Date();
  return Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
}

export default function PainelEstado() {
  const trocasAgua = useLiveQuery(
    () => db.trocasAgua.orderBy('data').reverse().toArray(),
    []
  );
  const trocasFiltro = useLiveQuery(() => db.trocasFiltro.toArray(), []);

  if (!trocasAgua || !trocasFiltro) return null;

  const ultimaTrocaAgua = trocasAgua[0] ?? null;

  const ultimaPorFiltro = TIPOS_FILTRO.map((tipo) => {
    const registosDoTipo = trocasFiltro
      .filter((t) => t.filtro === tipo)
      .sort((a, b) => b.data.localeCompare(a.data));
    return { tipo, ultima: registosDoTipo[0] ?? null };
  });

  return (
    <section className="status-filtros">
      <h2>Estado do aquário</h2>

      <div className="status-agua">
        <strong>Última troca de água:</strong>{' '}
        {ultimaTrocaAgua
          ? `${ultimaTrocaAgua.data} (há ${diasDesde(ultimaTrocaAgua.data)} dias)`
          : 'Nunca registada'}
      </div>

      <table>
        <thead>
          <tr>
            <th>Filtro</th>
            <th>Última troca</th>
            <th>Dias desde a troca</th>
          </tr>
        </thead>
        <tbody>
          {ultimaPorFiltro.map(({ tipo, ultima }) => (
            <tr key={tipo}>
              <td>{tipo}</td>
              <td>{ultima ? ultima.data : 'Nunca trocado'}</td>
              <td>{ultima ? diasDesde(ultima.data) : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
