'use client';

import React from 'react';

interface NationalSummaryProps {
  nationalGoal: number;
  onUpdateNationalGoal: (newGoal: number) => void;
  totalLPs: number;
}

const NationalSummary: React.FC<NationalSummaryProps> = ({ nationalGoal, onUpdateNationalGoal, totalLPs }) => {
  const remaining = nationalGoal - totalLPs;
  const percentage = nationalGoal > 0 ? (totalLPs / nationalGoal) * 100 : 0;

  return (
    <div className="card">
      <div className="card-header">
        <h2>Resumo Brasil</h2>
      </div>
      <div className="card-body">
        <div className="row align-items-center text-center">
          <div className="col-lg-4 mb-3 mb-lg-0">
            <label className="form-label fw-bold">Meta Brasil (LPs)</label>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                value={nationalGoal}
                onChange={(e) => onUpdateNationalGoal(Number(e.target.value))}
              />
              <span className="input-group-text">LPs</span>
            </div>
          </div>
          <div className="col-lg-4 mb-3 mb-lg-0">
            <h5 className="mb-0">Total Alcançado: {totalLPs.toLocaleString('pt-BR')} LPs</h5>
          </div>
          <div className="col-lg-4">
            <h5 className={`mb-0 ${remaining > 0 ? 'text-danger' : 'text-success'}`}>
              Restante: {remaining.toLocaleString('pt-BR')} LPs
            </h5>
          </div>
        </div>
        <div className="progress mt-3" style={{ height: '25px' }}>
          <div
            className="progress-bar fs-6"
            role="progressbar"
            style={{ width: `${percentage}%` }}
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {percentage.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default NationalSummary;
