'use client';

import { useState } from 'react';

interface Keyword {
  id: number;
  keyword: string;
  position: number;
  volume: number;
  difficulty: number;
}

export default function SEOKeywordsManager() {
  const [keywords, setKeywords] = useState<Keyword[]>([
    { id: 1, keyword: 'industrial property for sale', position: 5, volume: 1200, difficulty: 45 },
    { id: 2, keyword: 'MIDC plots', position: 3, volume: 800, difficulty: 35 },
    { id: 3, keyword: 'industrial shed for rent', position: 7, volume: 650, difficulty: 40 },
    { id: 4, keyword: 'warehouse for sale', position: 4, volume: 900, difficulty: 38 },
  ]);

  const [newKeyword, setNewKeyword] = useState('');

  const addKeyword = () => {
    if (newKeyword.trim()) {
      const newId = Math.max(...keywords.map(k => k.id)) + 1;
      setKeywords([...keywords, {
        id: newId,
        keyword: newKeyword,
        position: 0,
        volume: 0,
        difficulty: 0
      }]);
      setNewKeyword('');
    }
  };

  const removeKeyword = (id: number) => {
    setKeywords(keywords.filter(k => k.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Keywords Manager</h2>
      
      {/* Add new keyword */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
          placeholder="Add new keyword"
          className="flex-1 rounded-md border border-gray-300 px-3 py-2"
        />
        <button
          onClick={addKeyword}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* Keywords table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keyword</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {keywords.map((keyword) => (
              <tr key={keyword.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{keyword.keyword}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{keyword.position}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{keyword.volume}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{keyword.difficulty}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button
                    onClick={() => removeKeyword(keyword.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
