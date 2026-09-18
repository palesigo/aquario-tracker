import { useRef, useState } from 'react';
import { exportarJSON, exportarCSV, importarJSON } from '../utils/export';

export default function Backup() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [mensagem, setMensagem] = useState<string | null>(null);

  async function handleImportar(e: React.ChangeEvent<HTMLInputElement>) {
    const ficheiro = e.target.files?.[0];
    if (!ficheiro) return;

    const confirmar = window.confirm(
      'Importar vai substituir todos os registos atuais pelos do ficheiro. Continuar?'
    );
    if (!confirmar) {
      e.target.value = '';
      return;
    }

    try {
      await importarJSON(ficheiro);
      setMensagem('Backup importado com sucesso.');
    } catch (err) {
      setMensagem('Erro ao importar: ficheiro inválido.');
    } finally {
      e.target.value = '';
      setTimeout(() => setMensagem(null), 3000);
    }
  }

  return (
    <section className="backup">
      <h2>Backup e exportação</h2>
      <p>Os dados ficam guardados apenas neste dispositivo. Faz backups regulares.</p>

      <div className="acoes-backup">
        <button onClick={() => exportarJSON()}>Exportar JSON</button>
        <button onClick={() => exportarCSV()}>Exportar CSV</button>
        <button onClick={() => inputRef.current?.click()}>Importar backup (JSON)</button>
        <input
          ref={inputRef}
          type="file"
          accept="application/json"
          onChange={handleImportar}
          hidden
        />
      </div>

      {mensagem && <p className="sucesso">{mensagem}</p>}
    </section>
  );
}
