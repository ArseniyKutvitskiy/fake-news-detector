import { useState } from 'react';
import { api } from '../services/api';

function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (text.trim().length < 10) {
      setError('Пожалуйста, введите минимум 10 символов.');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const response = await api.post('/analyze', { text });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Произошла ошибка при анализе текста.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Анализ новостной статьи</h1>
      <p className="text-gray-600 mb-6">Вставьте текст новости ниже, чтобы определить её подлинность с помощью ИИ модели.</p>
      
      <textarea
        className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm resize-none"
        placeholder="Вставьте текст новости сюда..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      
      {error && <p className="text-red-500 mt-2">{error}</p>}
      
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? 'ИИ анализирует текст...' : 'Проверить статью'}
      </button>

      {result && (
        <div className={`mt-8 p-6 rounded-lg border shadow-sm ${result.prediction === 'Fake' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            Вердикт: <span className={result.prediction === 'Fake' ? 'text-red-600' : 'text-green-600'}>
              {result.prediction === 'Fake' ? 'Фейк / Ложь' : 'Реальная новость'}
            </span>
          </h2>
          <p className="text-lg text-gray-700">
            Уверенность модели: <strong>{(result.confidence * 100).toFixed(2)}%</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;
