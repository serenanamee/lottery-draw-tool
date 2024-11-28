import React, { useState } from 'react';
import { Trash2, Download, RefreshCw } from 'lucide-react';

const LotteryApp = () => {
  const [prizes, setPrizes] = useState([
    { name: '頭獎', quantity: 1 },
    { name: '二獎', quantity: 2 },
    { name: '再接再厲', quantity: 10 }
  ]);
  const [participants, setParticipants] = useState('');
  const [results, setResults] = useState([]);
  const [drawn, setDrawn] = useState(false);

  const handlePrizeChange = (index, field, value) => {
    const newPrizes = [...prizes];
    newPrizes[index][field] = field === 'quantity' ? parseInt(value) || 0 : value;
    setPrizes(newPrizes);
  };

  const handleDeletePrize = (index) => {
    setPrizes(prizes.filter((_, i) => i !== index));
  };

  const drawWinners = () => {
    const participantList = participants.split('\n').filter(p => p.trim());
    if (participantList.length === 0) return;

    let availableParticipants = [...participantList];
    let newResults = [];

    prizes.forEach(prize => {
      for (let i = 0; i < prize.quantity; i++) {
        if (availableParticipants.length === 0) break;
        
        const winnerIndex = Math.floor(Math.random() * availableParticipants.length);
        const winner = availableParticipants[winnerIndex];
        
        newResults.push({
          id: `#${Date.now()}${Math.floor(Math.random() * 10000)}`,
          winner,
          prize: prize.name
        });
        
        availableParticipants.splice(winnerIndex, 1);
      }
    });

    setResults(newResults);
    setDrawn(true);
  };

  const exportToCSV = () => {
    const csvContent = results
      .map(({ id, winner, prize }) => `${id},${winner},${prize}`)
      .join('\n');
    
    const blob = new Blob([`ID,Winner,Prize\n${csvContent}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lottery-results-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-bold">獎項設定</h2>
        {prizes.map((prize, index) => (
          <div key={index} className="flex gap-4 items-center">
            <input
              type="text"
              value={prize.name}
              onChange={(e) => handlePrizeChange(index, 'name', e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="獎項名稱"
            />
            <input
              type="number"
              value={prize.quantity}
              onChange={(e) => handlePrizeChange(index, 'quantity', e.target.value)}
              className="w-24 p-2 border rounded"
              min="1"
            />
            <button
              onClick={() => handleDeletePrize(index)}
              className="p-2 text-red-500 hover:bg-red-50 rounded"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">參與者名單</h2>
        <textarea
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
          className="w-full h-48 p-2 border rounded"
          placeholder="請輸入參與者名單，每行一個名單"
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={drawWinners}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
        >
          <RefreshCw size={20} />
          抽獎
        </button>
        {drawn && (
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2"
          >
            <Download size={20} />
            匯出CSV
          </button>
        )}
      </div>

      {drawn && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">抽獎結果</h2>
          <div className="border rounded">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 text-left">ID</th>
                  <th className="p-2 text-left">獲獎者</th>
                  <th className="p-2 text-left">獎項</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2">{result.id}</td>
                    <td className="p-2">{result.winner}</td>
                    <td className="p-2">{result.prize}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default LotteryApp;