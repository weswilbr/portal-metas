'use client';

import React from 'react';
import StateView from './StateView';
import { RegionData } from '../types';

interface RegionViewProps {
  regionData: Omit<RegionData, 'goal'>;
  onAddLp: (stateName: string, lpValue: number) => void;
  nationalGoal: number;
}

const RegionView: React.FC<RegionViewProps> = ({ regionData, onAddLp, nationalGoal }) => {
  const totalLpsInRegion = regionData.states.reduce((sum, state) => 
    sum + state.lpEntries.reduce((s, lp) => s + lp, 0), 
  0);

  // Calcula a contribuição percentual da região para a meta nacional
  const percentage = nationalGoal > 0 ? (totalLpsInRegion / nationalGoal) * 100 : 0;

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`heading-${regionData.name}`}>
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${regionData.name}`} aria-expanded="false" aria-controls={`collapse-${regionData.name}`}>
          <div className="w-100 d-flex flex-column flex-md-row justify-content-md-between align-items-center pe-md-3">
            <strong className="mb-2 mb-md-0">{regionData.name}</strong>
            <div className="d-flex flex-column flex-md-row align-items-center">
              <span className="me-md-3">Total da Região: {totalLpsInRegion.toLocaleString('pt-BR')} LPs</span>
              <span>Contribuição: {percentage.toFixed(2)}%</span>
            </div>
          </div>
        </button>
      </h2>
      <div id={`collapse-${regionData.name}`} className="accordion-collapse collapse" aria-labelledby={`heading-${regionData.name}`} data-bs-parent="#regions-accordion">
        <div className="accordion-body">
          {regionData.states.map(state => (
            <StateView 
              key={state.name}
              stateName={state.name}
              lpEntries={state.lpEntries}
              onAddLp={(lpValue) => onAddLp(state.name, lpValue)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegionView;