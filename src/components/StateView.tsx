'use client';

import React, { useState } from 'react';

interface StateViewProps {
  stateName: string;
  lpEntries: number[];
  onAddLp: (lpValue: number) => void;
}

const StateView: React.FC<StateViewProps> = ({ stateName, lpEntries, onAddLp }) => {
  const [newLp, setNewLp] = useState(0);

  const totalLps = lpEntries.reduce((sum, lp) => sum + lp, 0);

  const handleAdd = () => {
    if (newLp > 0) {
      onAddLp(newLp);
      setNewLp(0);
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-header d-flex justify-content-between">
        <strong>{stateName}</strong>
        <strong>Total LPs: {totalLps.toLocaleString('pt-BR')}</strong>
      </div>
      <div className="card-body">
        <div className="input-group mb-3">
          <input 
            type="number" 
            className="form-control" 
            placeholder="Adicionar LPs..." 
            value={newLp || ''}
            onChange={(e) => setNewLp(Number(e.target.value))}
          />
          <button className="btn btn-primary" type="button" onClick={handleAdd}>Adicionar</button>
        </div>
        <ul className="list-group">
          {lpEntries.map((lp, index) => (
            <li key={index} className="list-group-item">{lp.toLocaleString('pt-BR')} LPs</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StateView;
