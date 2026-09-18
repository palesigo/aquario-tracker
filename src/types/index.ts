// Tipos de filtro suportados. Existem 2 unidades de Bio Carb no aquário,
// por isso são tratados como itens distintos para saber qual trocar a seguir.
export type TipoFiltro = 'Bio Clear' | 'Bio Carb 1' | 'Bio Carb 2';

export const TIPOS_FILTRO: TipoFiltro[] = ['Bio Clear', 'Bio Carb 1', 'Bio Carb 2'];

export interface TrocaAgua {
  id?: number;
  data: string; // formato ISO (yyyy-mm-dd)
  litros?: number;
  observacoes?: string;
}

export interface TrocaFiltro {
  id?: number;
  data: string; // formato ISO (yyyy-mm-dd)
  filtro: TipoFiltro;
  observacoes?: string;
}
