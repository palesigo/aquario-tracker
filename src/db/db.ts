import Dexie, { type Table } from 'dexie';
import type { TrocaAgua, TrocaFiltro } from '../types';

export class AquarioDB extends Dexie {
  trocasAgua!: Table<TrocaAgua, number>;
  trocasFiltro!: Table<TrocaFiltro, number>;

  constructor() {
    super('AquarioTrackerDB');
    this.version(1).stores({
      trocasAgua: '++id, data',
      trocasFiltro: '++id, data, filtro',
    });
  }
}

export const db = new AquarioDB();
