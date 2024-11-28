# 🎲 Lucky Draw Tool | 抽獎小工具

A simple and efficient lucky draw tool built with React.js | 使用 React.js 建立的簡單高效抽獎工具

## ✨ Features | 功能特點

- 🎯 Multiple prize tiers management | 多獎項層級管理
- 📋 Batch participant import | 批量參與者導入
- 🎲 Fair random drawing | 公平随機抽獎
- 📊 CSV export for results | 結果導出為 CSV
- 🔄 Unique ID generation | 唯一ID生成
- 🌐 Bilingual support (English/中文) | 雙語支持

## 🚀 Quick Start | 快速開始

### Prerequisites | 前置要求

```bash
node.js >= 14.0.0
npm >= 6.0.0
```

### Installation | 安裝

1. Clone the repository | 克隆儲存庫
```bash
git clone https://github.com/your-username/lucky-draw-tool.git
cd lucky-draw-tool
```

2. Install dependencies | 安裝依賴
```bash
npm install
```

3. Start the development server | 啟動開發服務器
```bash
npm start
```

4. Build for production | 構建生產版本
```bash
npm run build
```

## 💡 Usage | 使用方法

1. Configure Prizes | 設置獎項
   - Set prize names and quantities | 設置獎項名稱和數量
   - Add or remove prize tiers as needed | 根據需要添加或刪除獎項層級

2. Import Participants | 導入參與者
   - Enter one participant per line | 每行輸入一個參與者
   - Format: Name PhoneNumber | 格式：姓名 電話號碼
   - Example | 例如:
     ```
     李小易 09xx123456
     陳小姐 09xx456789
     林小姐 09xx987654
     ```

3. Draw Winners | 抽獎
   - Click "抽獎" button to start | 點擊"抽獎"按鈕開始
   - System will randomly select winners | 系統將隨機選擇獲獎者
   - Each participant can only win once | 每個參與者只能中獎一次

4. Export Results | 導出結果
   - Click "匯出CSV" to download results | 點擊"匯出CSV"下載結果
   - Results include unique IDs | 結果包含唯一ID

## 🔧 Configuration | 配置

The application can be configured through environment variables | 可以通過環境變量配置應用程序:

```env
REACT_APP_MAX_WINNERS=1000  # Maximum number of winners | 最大獲獎者數量
REACT_APP_LOCALE=zh-TW      # Default language | 默認語言
```

## 🤝 Contributing | 貢獻

1. Fork the project | 復刻專案
2. Create your feature branch | 創建功能分支
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes | 提交更改
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch | 推送到分支
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request | 開啟拉取請求

## 📝 License | 許可證

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
本項目基於 MIT 許可證開源 - 查看 [LICENSE](LICENSE) 文件了解更多詳情。

## 📬 Contact | 聯繫

Your Name - [@your_twitter](https://twitter.com/your_twitter) - email@example.com

Project Link: [https://github.com/your-username/lucky-draw-tool](https://github.com/your-username/lucky-draw-tool)