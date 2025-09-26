'use client';

import React, { useState } from 'react';

interface HeaderProps {
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReset }) => {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // Formato YYYY-MM

  return (
    <header className="d-flex flex-column flex-md-row justify-content-between align-items-center p-3 bg-light rounded">
      <h1 className="h3 mb-3 mb-md-0">Meta Comum Brasil</h1>
      <div className="d-flex align-items-end">
        <div className="me-3">
          <label htmlFor="month-input" className="form-label">Mês de Apuração</label>
          <input
            id="month-input"
            type="month"
            className="form-control"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>
        <button className="btn btn-danger" onClick={onReset}>Reiniciar Apuração</button>
      </div>
    </header>
  );
};

export default Header;
