'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { RegionData } from '@/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

interface GoalChartProps {
  regions: Omit<RegionData, 'goal'>[];
  nationalGoal: number;
}

const GoalChart: React.FC<GoalChartProps> = ({ regions, nationalGoal }) => {

  const colors = [
    '#264653',
    '#2a9d8f',
    '#e9c46a',
    '#f4a261',
    '#e76f51',
  ];

  const data = {
    labels: regions.map((r) => r.name),
    datasets: [
      {
        label: '% de Contribuição para a Meta Geral',
        data: regions.map((region) => {
          const totalLpsInRegion = region.states.reduce((sum, state) => 
            sum + state.lpEntries.reduce((s, lp) => s + lp, 0), 
          0);
          // Calcula a contribuição percentual da região para a meta nacional
          return nationalGoal > 0 ? (totalLpsInRegion / nationalGoal) * 100 : 0;
        }),
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Contribuição por Região para a Meta Geral (%)',
        font: {
          size: 18,
        }
      },
      datalabels: {
        anchor: 'end' as const,
        align: 'top' as const,
        formatter: (value: number) => {
          return value.toFixed(2) + '%';
        },
        font: {
          weight: 'bold' as const,
        },
        color: '#444',
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        }
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="card">
      <div className="card-body">
        <div style={{ height: '400px' }}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default GoalChart;
