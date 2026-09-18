import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db';

export default function Historico() {
  const trocasAgua = useLiveQuery(
    () => db.trocasAgua.orderBy('data').reverse().toArray(),
    []
  );
  const trocasFiltro = useLiveQuery(
    () => db.trocasFiltro.orderBy('data').reverse().toArray(),
    []
  );

  async function apagarAgua(id?: number) {
    if (id !== undefined) await db.trocasAgua.delete(id);
  }

  async function apagarFiltro(id?: number) {
    if (id !== undefined) await db.trocasFiltro.delete(id);
  }

  return (
    <section className="historico">
      <h2>Histórico de trocas de água</h2>
      {trocasAgua?.length ? (
        <ul className="lista-historico">
          {trocasAgua.map((t) => (
            <li key={t.id}>
              <span>{t.data}</span>
              {t.litros ? <span> · {t.litros}L</span> : null}
              {t.observacoes ? <span> · {t.observacoes}</span> : null}
              <button onClick={() => apagarAgua(t.id)} aria-label="Apagar registo">
                🗑
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Ainda não há registos de trocas de água.</p>
      )}

      <h2>Histórico de trocas de filtro</h2>
      {trocasFiltro?.length ? (
        <ul className="lista-historico">
          {trocasFiltro.map((t) => (
            <li key={t.id}>
              <span>{t.data}</span>
              <span> · {t.filtro}</span>
              {t.observacoes ? <span> · {t.observacoes}</span> : null}
              <button onClick={() => apagarFiltro(t.id)} aria-label="Apagar registo">
                🗑
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Ainda não há registos de trocas de filtro.</p>
      )}
    </section>
  );
}
