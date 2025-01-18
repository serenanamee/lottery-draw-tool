import React, { useState } from 'react';
import { Download, RefreshCw, Gift } from 'lucide-react';

const LotteryApp = () => {
  // 獎項資訊狀態
  const [prizes, setPrizes] = useState([
    { name: '現金 2 萬', quantity: 5 },
    { name: '現金 1 萬', quantity: 10 },
    { name: '現金 6000', quantity: 20 },
    { name: '現金 2000', quantity: 20 }
  ]);
  
  // 預設得獎者名單
  const predefinedWinners = {
    // 現金 2 萬得獎者
    '現金 2 萬': [
      "#20250113134577421",
      "#20250113169453969",
      "#20250113132401348",
      "#20250113111006757",
      "#20250113126332336"
    ],
    // 現金 1 萬得獎者
    '現金 1 萬': [
      "#20250113144076981",
      "#20250113102863490",
      "#20250113168779213",
      "#20250113129596022",
      "#20250113131240823",
      "#20250113131757304",
      "#20250113160009616",
      "#20250113147510242",
      "#20250113122161631",
      "#20250113136621010"
    ],
    // 現金 6000 得獎者
    '現金 6000': [
      "#20250113145816714",
      "#20250113136685823",
      "#20250113152825774",
      "#20250113156771455",
      "#20250113126216362",
      "#20250113112523971",
      "#20250113149361052",
      "#20250113138820940",
      "#20250113155142449",
      "#20250113130353278",
      "#20250113105478508",
      "#20250113136090482",
      "#20250113121856487",
      "#20250113106749926",
      "#20250113122846145",
      "#20250113126531674",
      "#20250113150405384",
      "#20250113146255093",
      "#20250113122982621",
      "#20250113138523470"

    ],
    // 現金 2000 得獎者
    '現金 2000': [
      "#20250113131600210",
      "#20250113144706944",
      "#20250113145801613",
      "#20250113150324274",
      "#20250113150413897",
      "#20250113152731121",
      "#20250113155453173",
      "#20250113141606246",
      "#20250113154249745",
      "#20250113145313195",
      "#20250113135543803",
      "#20250113133126890",
      "#20250113130458212",
      "#20250113130644510",
      "#20250113133621349",
      "#20250113143627395",
      "#20250113142891241",
      "#20250113152095466",
      "#20250113162248453",
      "#20250113154167388"
    ]
  };

  const [participants, setParticipants] = useState('');
  const [results, setResults] = useState([]);
  const [drawn, setDrawn] = useState(false);

  const drawWinners = () => {
    const newResults = [];

    // 為每個獎項使用對應的預設得獎者
    prizes.forEach(prize => {
      const winners = predefinedWinners[prize.name] || [];
      winners.forEach(winner => {
        newResults.push({
          winner,
          prize: prize.name
        });
      });
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 標題 */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-2">🎊 抽獎小工具</h1>
          <p className="text-red-500">簡單易用的抽獎系統</p>
        </div>

        {/* 獎項資訊 */}
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-red-800 flex items-center gap-2">
            <Gift className="text-red-500" size={24} />
            獎項設定
          </h2>
          <div className="space-y-3">
            {prizes.map((prize, index) => (
              <div key={index} className="flex items-center gap-3 bg-red-50 p-3 rounded-lg">
                <span className="text-red-600 font-medium flex-1">{prize.name}</span>
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
            className="w-full h-[32rem] p-4 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="請輸入參與者名單，每行一個名單"
          />
        </div>

        {/* 操作按鈕 */}
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

        {/* 抽獎結果 */}
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