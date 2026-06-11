import { useState, useEffect } from 'react';
import { api } from '../services/api';

function Statistics() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Ошибка получения статистики:', error);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <p className="text-center">Загрузка панели статистики...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Статистика системы</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm uppercase font-semibold tracking-wider">Всего проверок</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total_checks}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
          <h3 className="text-gray-500 text-sm uppercase font-semibold tracking-wider">Найдено Фейков</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.fake_count}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm uppercase font-semibold tracking-wider">Найдено Правды</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.real_count}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
          <h3 className="text-gray-500 text-sm uppercase font-semibold tracking-wider">Ср. уверенность ИИ</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{(stats.average_confidence * 100).toFixed(1)}%</p>
        </div>

      </div>
    </div>
  );
}

export default Statistics;
