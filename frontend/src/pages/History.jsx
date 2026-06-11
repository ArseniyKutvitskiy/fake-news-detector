import { useState, useEffect } from 'react';
import { api } from '../services/api';

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const response = await api.get('/results');
      setHistory(response.data);
    } catch (error) {
      console.error('Ошибка при получении истории:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/results/${id}`);
      setHistory(history.filter(item => item.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    }
  };

  if (loading) return <p className="text-center">Загрузка истории...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">История проверок</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {history.length === 0 ? (
            <li className="px-6 py-4 text-gray-500">История проверок пуста.</li>
          ) : (
            history.map((record) => (
              <li key={record.id} className="px-6 py-4 flex justify-between items-center hover:bg-gray-50">
                <div className="flex-1 pr-4">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {record.input_text}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Дата: {new Date(record.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${record.prediction === 'Fake' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {record.prediction === 'Fake' ? 'Фейк' : 'Правда'} ({(record.confidence * 100).toFixed(1)}%)
                  </span>
                  <button onClick={() => handleDelete(record.id)} className="text-red-500 hover:text-red-700 text-sm font-medium">
                    Удалить
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default History;
