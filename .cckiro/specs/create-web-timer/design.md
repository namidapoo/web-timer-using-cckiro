# Web タイマー設計書

## アーキテクチャ概要

### 技術スタック

- **フレームワーク**: React 19
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4（設定ファイル不要）
- **テスト**: Vitest + React Testing Library
- **ビルドツール**: Vite

### プロジェクト構造

```
web-timer/
├── src/
│   ├── components/
│   │   ├── Timer/
│   │   │   ├── Timer.tsx
│   │   │   └── Timer.test.tsx
│   │   ├── TimeDisplay/
│   │   │   ├── TimeDisplay.tsx
│   │   │   └── TimeDisplay.test.tsx
│   │   ├── TimeAdjuster/
│   │   │   ├── TimeAdjuster.tsx
│   │   │   └── TimeAdjuster.test.tsx
│   │   ├── QuickAddButtons/
│   │   │   ├── QuickAddButtons.tsx
│   │   │   └── QuickAddButtons.test.tsx
│   │   └── ControlButtons/
│   │       ├── ControlButtons.tsx
│   │       └── ControlButtons.test.tsx
│   ├── hooks/
│   │   ├── useTimer.ts
│   │   └── useTimer.test.ts
│   ├── utils/
│   │   ├── timeUtils.ts
│   │   └── timeUtils.test.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

## コンポーネント設計

### 1. Timer（メインコンポーネント）

**責務**: アプリケーション全体の統括

- 状態管理（時間、タイマー実行状態）
- 子コンポーネントの配置
- タイマーロジックの実行

### 2. TimeDisplay

**責務**: 時間の表示

- Props: `hours`, `minutes`, `seconds`
- HH:MM:SS 形式で表示（各 2 桁固定）
- レスポンシブ対応の大きなフォント

### 3. TimeAdjuster

**責務**: 時間の増減調整

- Props: `value`, `onIncrement`, `onDecrement`, `type`（'hours' | 'minutes' | 'seconds'）
- 各単位の上下に＋/ーボタン
- 上限・下限のバリデーション

### 4. QuickAddButtons

**責務**: クイック時間追加

- Props: `onAddTime`
- +10 分、+30 秒、+10 秒ボタン
- モバイルでもタップしやすいサイズ

### 5. ControlButtons

**責務**: タイマーの開始・クリア

- Props: `onStart`, `onClear`, `isDisabled`
- スタートボタン（0 秒時は非活性）
- クリアボタン

## 状態管理

### useTimer フック

```typescript
interface TimerState {
  hours: number;
  minutes: number;
  seconds: number;
  isRunning: boolean;
}

interface UseTimerReturn {
  time: TimerState;
  setHours: (hours: number) => void;
  setMinutes: (minutes: number) => void;
  setSeconds: (seconds: number) => void;
  addTime: (hours: number, minutes: number, seconds: number) => void;
  start: () => void;
  clear: () => void;
  isStartDisabled: boolean;
}
```

## ユーティリティ関数

### timeUtils.ts

- `formatTime(hours, minutes, seconds)`: 2 桁固定のフォーマット
- `normalizeTime(hours, minutes, seconds)`: 60 秒 →1 分などの正規化
- `getTotalSeconds(hours, minutes, seconds)`: 合計秒数の計算
- `isValidTime(hours, minutes, seconds)`: 時間の妥当性チェック

## UI/UX デザイン

### レイアウト

```
┌─────────────────────────┐
│      01 : 25 : 30       │  ← TimeDisplay
│      ▲    ▲    ▲       │  ← TimeAdjuster（増加）
│      ▼    ▼    ▼       │  ← TimeAdjuster（減少）
├─────────────────────────┤
│  +10分  +30秒  +10秒   │  ← QuickAddButtons
├─────────────────────────┤
│   スタート    クリア     │  ← ControlButtons
└─────────────────────────┘
```

### スタイリング方針

- Tailwind CSS v4 を使用（設定ファイル不要）
- すべてのスタイルは Tailwind のユーティリティクラスで実装
- index.css のみ使用（@tailwind ディレクティブを記述）
- モバイルファースト（Tailwind のレスポンシブプレフィックス使用）
- 最小タップ領域: 44x44px（min-h-11 min-w-11）
- 高コントラストで視認性を確保
- システムフォントを使用（font-sans）

### 終了通知

- **実装方法**: トースト通知
- 画面上部に 3 秒間表示
- 音声通知（オプション）
- アクセシビリティ対応（aria-live）

## テスト戦略

### 単体テスト

- 各コンポーネントの表示・動作
- カスタムフックのロジック
- ユーティリティ関数

### 統合テスト

- タイマーの開始から終了までのフロー
- 時間調整の動作確認
- エッジケース（上限値、下限値）

## パフォーマンス最適化

- React.memo による不要な再レンダリング防止
- useCallback によるイベントハンドラの最適化
- setInterval ではなく requestAnimationFrame を使用（精度向上）
