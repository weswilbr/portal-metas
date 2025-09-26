'use client';

import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import Header from '@/components/Header';
import NationalSummary from '@/components/NationalSummary';
import RegionView from '@/components/RegionView';
import GoalChart from '@/components/GoalChart';
import ShareableImage from '@/components/ShareableImage';
import { RegionData } from '@/types';

const initialRegions: Omit<RegionData, 'goal'>[] = [
    { name: 'Norte', states: [{ name: 'Acre', lpEntries: [] }, { name: 'Amapá', lpEntries: [] }, { name: 'Amazonas', lpEntries: [] }, { name: 'Pará', lpEntries: [] }, { name: 'Rondônia', lpEntries: [] }, { name: 'Roraima', lpEntries: [] }, { name: 'Tocantins', lpEntries: [] }] },
    { name: 'Nordeste', states: [{ name: 'Alagoas', lpEntries: [] }, { name: 'Bahia', lpEntries: [] }, { name: 'Ceará', lpEntries: [] }, { name: 'Maranhão', lpEntries: [] }, { name: 'Paraíba', lpEntries: [] }, { name: 'Pernambuco', lpEntries: [] }, { name: 'Piauí', lpEntries: [] }, { name: 'Rio Grande do Norte', lpEntries: [] }, { name: 'Sergipe', lpEntries: [] }] },
    { name: 'Centro-Oeste', states: [{ name: 'Distrito Federal', lpEntries: [] }, { name: 'Goiás', lpEntries: [] }, { name: 'Mato Grosso', lpEntries: [] }, { name: 'Mato Grosso do Sul', lpEntries: [] }] },
    { name: 'Sudeste', states: [{ name: 'Espírito Santo', lpEntries: [] }, { name: 'Minas Gerais', lpEntries: [] }, { name: 'Rio de Janeiro', lpEntries: [] }, { name: 'São Paulo', lpEntries: [] }] },
    { name: 'Sul', states: [{ name: 'Paraná', lpEntries: [] }, { name: 'Rio Grande do Sul', lpEntries: [] }, { name: 'Santa Catarina', lpEntries: [] }] },
];

const defaultNationalGoal = 1200000;

// Função auxiliar para carregar do localStorage de forma segura no cliente
const loadFromLocalStorage = (key: string, defaultValue: any) => {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.error(`Erro ao carregar ${key} do localStorage:`, error);
    return defaultValue;
  }
};

export default function Home() {
  const [regions, setRegions] = useState<Omit<RegionData, 'goal'>[]>(() => loadFromLocalStorage('regionsData', initialRegions));
  const [nationalGoal, setNationalGoal] = useState<number>(() => loadFromLocalStorage('nationalGoalData', defaultNationalGoal));
  const [isSharing, setIsSharing] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  // Salvar dados no localStorage sempre que mudarem
  useEffect(() => {
    localStorage.setItem('regionsData', JSON.stringify(regions));
  }, [regions]);

  useEffect(() => {
    localStorage.setItem('nationalGoalData', JSON.stringify(nationalGoal));
  }, [nationalGoal]);

  const handleAddLp = (stateName: string, lpValue: number) => {
    setRegions(prevRegions => prevRegions.map(region => ({ ...region, states: region.states.map(state => state.name === stateName ? { ...state, lpEntries: [...state.lpEntries, lpValue] } : state) })));
  };

  const handleReset = () => {
    if (window.confirm("Tem certeza que deseja reiniciar todos os dados? Os LPs inseridos serão perdidos.")) {
      setRegions(initialRegions);
      setNationalGoal(defaultNationalGoal);
    }
  };

  const handleShare = async () => {
    if (!imageRef.current) return;
    setIsSharing(true);
    try {
      const canvas = await html2canvas(imageRef.current, { scale: 3 });
      if (navigator.share && navigator.canShare) {
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          const file = new File([blob], 'apuracao-metas.png', { type: 'image/png' });
          try {
            await navigator.share({ files: [file], title: 'Apuração de Metas', text: 'Confira o resultado da nossa apuração de metas!' });
          } catch (err) { console.error("Erro ao compartilhar:", err); }
        }, 'image/png');
      } else {
        const link = document.createElement('a');
        link.download = 'apuracao-metas.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    } catch (err) { console.error("Erro ao gerar imagem:", err); }
    setIsSharing(false);
  };

  const totalLPs = regions.reduce((total, region) => total + region.states.reduce((regionTotal, state) => regionTotal + state.lpEntries.reduce((stateTotal, lp) => stateTotal + lp, 0), 0), 0);

  return (
    <>
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
          <ShareableImage ref={imageRef} regions={regions} nationalGoal={nationalGoal} totalLPs={totalLPs} />
      </div>

      <div className="container py-4">
        <Header onReset={handleReset} />

        <main>
          <div className="my-4">
            <NationalSummary nationalGoal={nationalGoal} onUpdateNationalGoal={setNationalGoal} totalLPs={totalLPs} />
          </div>

          <div className="text-center mb-4">
            <button className="btn btn-primary btn-lg" onClick={handleShare} disabled={isSharing}>
              {isSharing ? 'Gerando Imagem...' : 'Compartilhar Resultado'}
            </button>
          </div>

          <div className="accordion" id="regions-accordion">
            {regions.map((region) => (
              <RegionView key={region.name} regionData={region} onAddLp={handleAddLp} nationalGoal={nationalGoal} />
            ))}
          </div>

          <div className="my-4">
            <GoalChart regions={regions} nationalGoal={nationalGoal} />
          </div>
        </main>

        <footer className="text-center mt-5">
          <p>&copy; {new Date().getFullYear()} Apuração de Metas</p>
        </footer>
      </div>
    </>
  );
}