import { useState } from 'react';
import TrocaAguaForm from './components/TrocaAguaForm';
import TrocaFiltroForm from './components/TrocaFiltroForm';
import PainelEstado from './components/PainelEstado';
import Historico from './components/Historico';
import Backup from './components/Backup';
import './App.css';

type Aba = 'agua' | 'filtro' | 'historico' | 'backup';

export default function App() {
  const [aba, setAba] = useState<Aba>('agua');

  return (
    <div className="app">
      <header>
        <h1>🐠 Aquário Tracker</h1>
      </header>

      <PainelEstado />

      <nav className="tabs">
        <button className={aba === 'agua' ? 'ativo' : ''} onClick={() => setAba('agua')}>
          Água
        </button>
        <button className={aba === 'filtro' ? 'ativo' : ''} onClick={() => setAba('filtro')}>
          Filtro
        </button>
        <button className={aba === 'historico' ? 'ativo' : ''} onClick={() => setAba('historico')}>
          Histórico
        </button>
        <button className={aba === 'backup' ? 'ativo' : ''} onClick={() => setAba('backup')}>
          Backup
        </button>
      </nav>

      <main>
        {aba === 'agua' && <TrocaAguaForm />}
        {aba === 'filtro' && <TrocaFiltroForm />}
        {aba === 'historico' && <Historico />}
        {aba === 'backup' && <Backup />}
      </main>
    </div>
  );
}
