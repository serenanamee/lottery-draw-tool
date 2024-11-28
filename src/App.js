import React, { useState } from 'react';
import { Trash2, Download, RefreshCw, Plus, Gift } from 'lucide-react';

const LotteryApp = () => {
  const [prizes, setPrizes] = useState([
    { name: '現金 10000', quantity: 5 }
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
      .map(({ winner, prize }) => `${winner},${prize}`)
      .join('\n');
    
    const blob = new Blob([`獲獎者,獎項\n${csvContent}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `抽獎結果-${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const addPrize = () => {
    setPrizes([...prizes, { name: '', quantity: 1 }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 標題 */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">🎲 抽獎小工具</h1>
          <p className="text-gray-600">簡單易用的抽獎系統</p>
        </div>

        {/* 獎項設定 */}
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Gift className="text-blue-500" size={24} />
              獎項設定
            </h2>
            <button
              onClick={addPrize}
              className="px-4 py-2 bg-blue-200 text-blue-700 rounded-lg hover:bg-blue-300 transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              新增獎項
            </button>
          </div>
          
          <div className="space-y-3">
            {prizes.map((prize, index) => (
              <div key={index} className="flex gap-3 items-center">
                <input
                  type="text"
                  value={prize.name}
                  onChange={(e) => handlePrizeChange(index, 'name', e.target.value)}
                  className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="獎項名稱"
                />
                <input
                  type="number"
                  value={prize.quantity}
                  onChange={(e) => handlePrizeChange(index, 'quantity', e.target.value)}
                  className="w-24 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                />
                <button
                  onClick={() => handleDeletePrize(index)}
                  className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 參與者名單 */}
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">參與者名單</h2>
          <textarea
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            className="w-full h-[32rem] p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="請輸入參與者名單，每行一個名單"
          />
        </div>

        {/* 操作按鈕 */}
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={drawWinners}
            className="flex-1 md:flex-none px-6 py-3 bg-blue-200 text-blue-700 rounded-lg hover:bg-blue-300 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw size={20} />
            抽獎
          </button>
          {drawn && (
            <button
              onClick={exportToCSV}
              className="flex-1 md:flex-none px-6 py-3 bg-blue-200 text-blue-700 rounded-lg hover:bg-blue-300 transition-colors flex items-center justify-center gap-2"
            >
              <Download size={20} />
              匯出CSV
            </button>
          )}
        </div>

        {/* 抽獎結果 */}
        {drawn && (
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4 overflow-x-auto">
            <h2 className="text-xl font-semibold text-gray-800">抽獎結果</h2>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left text-gray-600 font-semibold rounded-tl-lg">獲獎者</th>
                  <th className="p-3 text-left text-gray-600 font-semibold rounded-tr-lg">獎項</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-3 text-gray-800">{result.winner}</td>
                    <td className="p-3 text-gray-800">{result.prize}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LotteryApp;