import React, { useState } from 'react';
import { Download, RefreshCw, Gift, Plus, Trash2 } from 'lucide-react';

const LotteryApp = () => {
  const [prizes, setPrizes] = useState([
    { name: '', quantity: 1 }
  ]);
  
  const [participants, setParticipants] = useState('');
  const [results, setResults] = useState([]);
  const [drawn, setDrawn] = useState(false);

  const addPrize = () => {
    setPrizes([...prizes, { name: '', quantity: 1 }]);
  };

  const removePrize = (index) => {
    setPrizes(prizes.filter((_, i) => i !== index));
  };

  const drawWinners = () => {
    const participantList = participants
      .split('\n')
      .map(p => p.trim())
      .filter(p => p !== '');

    if (participantList.length === 0) {
      alert('請輸入參與者名單');
      return;
    }

    if (prizes.some(prize => !prize.name.trim())) {
      alert('請填寫所有獎項名稱');
      return;
    }

    const totalPrizes = prizes.reduce((sum, prize) => sum + prize.quantity, 0);
    if (participantList.length < totalPrizes) {
      alert('參與者人數不足以分配所有獎項');
      return;
    }

    const newResults = [];
    let remainingParticipants = [...participantList];

    for (const prize of prizes) {
      for (let i = 0; i < prize.quantity; i++) {
        if (remainingParticipants.length === 0) break;
        const randomIndex = Math.floor(Math.random() * remainingParticipants.length);
        const winner = remainingParticipants[randomIndex];
        remainingParticipants.splice(randomIndex, 1);
        newResults.push({ winner, prize: prize.name });
      }
    }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-2">🎊 抽獎小工具</h1>
          <p className="text-red-500">簡單易用的抽獎系統</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-red-800 flex items-center gap-2">
            <Gift className="text-red-500" size={24} />
            獎項設定
          </h2>
          <div className="space-y-3">
            {prizes.map((prize, index) => (
              <div key={index} className="flex items-center gap-3 bg-red-50 p-3 rounded-lg">
                <input
                  type="text"
                  value={prize.name}
                  onChange={(e) => {
                    const newPrizes = [...prizes];
                    newPrizes[index].name = e.target.value;
                    setPrizes(newPrizes);
                  }}
                  className="flex-1 p-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="獎項名稱"
                />
                <input
                  type="number"
                  value={prize.quantity}
                  onChange={(e) => {
                    const newPrizes = [...prizes];
                    newPrizes[index].quantity = parseInt(e.target.value) || 0;
                    setPrizes(newPrizes);
                  }}
                  className="w-24 p-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  min="1"
                  placeholder="名額"
                />
                <span className="text-red-500">名</span>
                <button
                  onClick={() => removePrize(index)}
                  className="p-2 text-red-500 hover:text-red-700 focus:outline-none"
                  disabled={prizes.length === 1}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            <button
              onClick={addPrize}
              className="w-full p-3 border-2 border-dashed border-red-200 rounded-lg text-red-500 hover:bg-red-50 flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              新增獎項
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">參與者名單</h2>
          <textarea
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            className="w-full h-[32rem] p-4 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="請輸入參與者名單，每行一個號碼"
          />
        </div>

        <div className="flex gap-4 flex-wrap">
          <button
            onClick={drawWinners}
            className="flex-1 md:flex-none px-6 py-3 bg-red-200 text-red-700 rounded-lg hover:bg-red-300 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw size={20} />
            抽獎
          </button>
          {drawn && (
            <button
              onClick={exportToCSV}
              className="flex-1 md:flex-none px-6 py-3 bg-red-200 text-red-700 rounded-lg hover:bg-red-300 transition-colors flex items-center justify-center gap-2"
            >
              <Download size={20} />
              匯出CSV
            </button>
          )}
        </div>

        {drawn && (
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4 overflow-x-auto">
            <h2 className="text-xl font-semibold text-gray-800">抽獎結果</h2>
            <table className="w-full">
              <thead className="bg-red-50">
                <tr>
                  <th className="p-3 text-left text-red-600 font-semibold rounded-tl-lg">獲獎者</th>
                  <th className="p-3 text-left text-red-600 font-semibold rounded-tr-lg">獎項</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index} className="border-t border-red-100 hover:bg-red-50 transition-colors">
                    <td className="p-3 text-red-800">{result.winner}</td>
                    <td className="p-3 text-red-800">{result.prize}</td>
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