import { db } from '../db/db';
import type { TrocaAgua, TrocaFiltro } from '../types';

interface Backup {
  versao: number;
  exportadoEm: string;
  trocasAgua: TrocaAgua[];
  trocasFiltro: TrocaFiltro[];
}

export async function exportarJSON(): Promise<void> {
  const trocasAgua = await db.trocasAgua.toArray();
  const trocasFiltro = await db.trocasFiltro.toArray();
  const backup: Backup = {
    versao: 1,
    exportadoEm: new Date().toISOString(),
    trocasAgua,
    trocasFiltro,
  };
  descarregarFicheiro(
    JSON.stringify(backup, null, 2),
    `aquario-backup-${new Date().toISOString().slice(0, 10)}.json`,
    'application/json'
  );
}

export async function exportarCSV(): Promise<void> {
  const trocasAgua = await db.trocasAgua.toArray();
  const trocasFiltro = await db.trocasFiltro.toArray();

  const linhasAgua = [
    'tipo,data,litros,observacoes',
    ...trocasAgua.map(
      (t) => `agua,${t.data},${t.litros ?? ''},"${(t.observacoes ?? '').replace(/"/g, '""')}"`
    ),
  ];
  const linhasFiltro = [
    'tipo,data,filtro,observacoes',
    ...trocasFiltro.map(
      (t) => `filtro,${t.data},${t.filtro},"${(t.observacoes ?? '').replace(/"/g, '""')}"`
    ),
  ];

  const csv = [...linhasAgua, '', ...linhasFiltro].join('\n');
  descarregarFicheiro(csv, `aquario-backup-${new Date().toISOString().slice(0, 10)}.csv`, 'text/csv');
}

export async function importarJSON(ficheiro: File): Promise<void> {
  const texto = await ficheiro.text();
  const backup = JSON.parse(texto) as Backup;

  if (!backup.trocasAgua || !backup.trocasFiltro) {
    throw new Error('Ficheiro de backup inválido.');
  }

  await db.transaction('rw', db.trocasAgua, db.trocasFiltro, async () => {
    await db.trocasAgua.clear();
    await db.trocasFiltro.clear();
    await db.trocasAgua.bulkAdd(backup.trocasAgua.map(({ id, ...resto }) => resto));
    await db.trocasFiltro.bulkAdd(backup.trocasFiltro.map(({ id, ...resto }) => resto));
  });
}

function descarregarFicheiro(conteudo: string, nome: string, tipo: string) {
  const blob = new Blob([conteudo], { type: tipo });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nome;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
