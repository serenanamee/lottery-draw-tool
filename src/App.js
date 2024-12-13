import React, { useState } from 'react';
import { Download, RefreshCw, Gift } from 'lucide-react';

const LotteryApp = () => {
  // 獎項資訊狀態
  const [prize, setPrize] = useState({
    name: 'V-Lift全能高頻熱波美容儀',
    quantity: 2
  });
  
  // 預設得獎者名單
  const predefinedWinners = [
    "#20241213135855987",
    "#20241213154117823"
  ];

  const [participants, setParticipants] = useState('');
  const [results, setResults] = useState([]);
  const [drawn, setDrawn] = useState(false);

  const handlePrizeChange = (field, value) => {
    setPrize(prev => ({
      ...prev,
      [field]: field === 'quantity' ? parseInt(value) || 0 : value
    }));
  };

  const drawWinners = () => {
    // 直接使用預設得獎者名單
    const newResults = predefinedWinners.map(winner => ({
      winner,
      prize: prize.name
    }));

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 標題 */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">🎲 抽獎小工具</h1>
          <p className="text-gray-600">簡單易用的抽獎系統</p>
        </div>

        {/* 獎項資訊 */}
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Gift className="text-blue-500" size={24} />
            獎項設定
          </h2>
          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={prize.name}
              onChange={(e) => handlePrizeChange('name', e.target.value)}
              className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="獎項名稱"
            />
            <input
              type="number"
              value={prize.quantity}
              onChange={(e) => handlePrizeChange('quantity', e.target.value)}
              className="w-24 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="1"
              placeholder="名額"
            />
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