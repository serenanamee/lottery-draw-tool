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
      "20250105130027413",
      "20250105130067941",
      "20250105130123588",
      "20250105130157932",
      "20250105130214857"
    ],
    // 現金 1 萬得獎者
    '現金 1 萬': [
      "20250105130256789",
      "20250105130313466",
      "20250105130368024",
      "20250105140421257",
      "20250105150453489",
      "20250105140527791",
      "20250105140560423",
      "20250105130619384",
      "20250105132658926",
      "20250105131702371"
    ],
    // 現金 6000 得獎者
    '現金 6000': [
      "20250105130207457",
      "20250105132733135",
      "20250105418005197",
      "20250105934493096",
      "20250105184228156",
      "20250105131358700",
      "20250105803186405",
      "20250105829914430",
      "20250105889305167",
      "20250105424652615",
      "20250105902568122",
      "20250105626068800",
      "20250105380781070",
      "20250105968697260",
      "20250105775690107",
      "20250105656351853",
      "20250105674233516",
      "20250105126452669",
      "20250105081390825",
      "20250105198923477"
    ],
    // 現金 2000 得獎者
    '現金 2000': [
      "20250105140744210",
      "20250105130607255",
      "20250105131254780",
      "20250105131419935",
      "20250105133910371",
      "20250105140551861",
      "20250105141635448",
      "20250105130417924",
      "20250105133959717",
      "20250105135040284",
      "20250105133633435",
      "20250105135422958",
      "20250105143204432",
      "20250105141663572",
      "20250105131748824",
      "20250105141795309",
      "20250105131874260",
      "20250105151893075",
      "20250105151911243",
      "20250105131953382"
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
          <div className="space-y-3">
            {prizes.map((prize, index) => (
              <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-600 font-medium flex-1">{prize.name}</span>
                <input
                  type="number"
                  value={prize.quantity}
                  onChange={(e) => {
                    const newPrizes = [...prizes];
                    newPrizes[index].quantity = parseInt(e.target.value) || 0;
                    setPrizes(newPrizes);
                  }}
                  className="w-24 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  placeholder="名額"
                />
                <span className="text-gray-500">名</span>
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