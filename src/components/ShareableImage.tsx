'use client';

import React from 'react';
import { RegionData } from '@/types';

interface ShareableImageProps {
  regions: Omit<RegionData, 'goal'>[];
  nationalGoal: number;
  totalLPs: number;
}

const ShareableImage: React.FC<ShareableImageProps> = React.forwardRef(({ regions, nationalGoal, totalLPs }, ref) => {
  const percentage = nationalGoal > 0 ? (totalLPs / nationalGoal) * 100 : 0;

  const regionColors = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'];

  // A fonte Inter precisa ser importada no layout principal para funcionar aqui
  const font = `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`;

  return (
    // @ts-expect-error: O `ref` é encaminhado via React.forwardRef, mas o TypeScript precisa de uma anotação explícita aqui.
    <div ref={ref} style={{ width: '800px', background: 'linear-gradient(135deg, #ffffff, #e6e9f0)', padding: '40px', fontFamily: font, color: '#343a40', border: '1px solid #dee2e6', borderRadius: '12px' }}>
      <div style={{ textAlign: 'center', borderBottom: '1px solid #dee2e6', paddingBottom: '20px', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '48px', margin: 0, color: '#212529', fontWeight: 700 }}>Meta Comum Brasil</h1>
        <p style={{ fontSize: '24px', margin: '10px 0 0', color: '#6c757d' }}>Apuração de LPs</p>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '32px', margin: 0, fontWeight: 600 }}>Meta Geral: {nationalGoal.toLocaleString('pt-BR')} LPs</h2>
        <h3 style={{ fontSize: '28px', margin: '10px 0', color: '#2a9d8f', fontWeight: 700 }}>Total Alcançado: {totalLPs.toLocaleString('pt-BR')} LPs ({percentage.toFixed(2)}%)</h3>
      </div>

      <div>
        <h3 style={{ fontSize: '28px', textAlign: 'center', marginBottom: '20px', color: '#495057' }}>Contribuição por Região</h3>
        {regions.map((region, index) => {
          const totalLpsInRegion = region.states.reduce((sum, state) => sum + state.lpEntries.reduce((s, lp) => s + lp, 0), 0);
          const contributionPercentage = nationalGoal > 0 ? (totalLpsInRegion / nationalGoal) * 100 : 0;
          return (
            <div key={region.name} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <div style={{ width: '120px', fontSize: '20px', fontWeight: 'bold', color: regionColors[index] }}>{region.name}</div>
              <div style={{ flex: 1, marginLeft: '20px' }}>
                <div style={{ backgroundColor: '#e9ecef', borderRadius: '50px' }}>
                  <div style={{ width: `${contributionPercentage}%`, backgroundColor: regionColors[index], padding: '10px 0', borderRadius: '50px', textAlign: 'right' }}>
                  </div>
                </div>
              </div>
              <div style={{ width: '220px', textAlign: 'right', fontSize: '18px', fontWeight: 'bold', color: '#495057' }}>
                {totalLpsInRegion.toLocaleString('pt-BR')} LPs ({contributionPercentage.toFixed(2)}%)
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

ShareableImage.displayName = 'ShareableImage';
export default ShareableImage;