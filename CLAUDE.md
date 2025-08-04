# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## コマンド

### 開発

```bash
# 開発サーバーの起動
bun dev

# ビルド（TypeScriptの型チェック付き）
bun run build

# Lintの実行
bun lint

# ビルドしたアプリのプレビュー
bun preview
```

### テスト（Vitest セットアップ後）

```bash
# 全テストの実行
bun run test

# ウォッチモードでテスト
bun run test:watch

# 単一ファイルのテスト
bun run test src/utils/timeUtils.test.ts

# カバレッジ付きテスト
bun run test:coverage
```

## プロジェクト構造とアーキテクチャ

### 技術スタック

- **フレームワーク**: React 19 with TypeScript
- **ビルドツール**: Vite (SWC 使用)
- **スタイリング**: Tailwind CSS v4（設定ファイル不要）
- **テスト**: Vitest + React Testing Library（要セットアップ）
- **パッケージマネージャー**: bun（bun.lock が存在）

### Web タイマー実装計画

プロジェクトは`.cckiro/specs/create-web-timer/`に spec-driven development の文書があり、以下の実装計画に従って開発を進める：

1. **TDD アプローチ**: Red-Green-Refactor サイクルを厳守
2. **実装順序**:
   - ユーティリティ関数（timeUtils）
   - カスタムフック（useTimer）
   - 下位コンポーネントから上位へ（TimeDisplay → TimeAdjuster → QuickAddButtons → ControlButtons → Timer）
3. **タイマーロジック**: setInterval ではなく requestAnimationFrame を使用して精度を向上

### ディレクトリ構造（設計）

```
src/
├── components/
│   ├── Timer/          # メインコンポーネント
│   ├── TimeDisplay/    # 時間表示（HH:MM:SS）
│   ├── TimeAdjuster/   # +/-ボタンで時間調整
│   ├── QuickAddButtons/ # +10分、+30秒、+10秒ボタン
│   └── ControlButtons/ # スタート/クリアボタン
├── hooks/
│   └── useTimer.ts     # タイマーロジック
├── utils/
│   └── timeUtils.ts    # 時間フォーマット、正規化など
└── index.css           # Tailwindディレクティブのみ
```

### 重要な設計決定

- **状態管理**: useTimer カスタムフックで一元管理
- **スタイリング**: Tailwind ユーティリティクラスのみ使用（CSS Modules 不使用）
- **タップ領域**: モバイル対応のため最小 44x44px（min-h-11 min-w-11）
- **終了通知**: トースト通知で実装（アクセシビリティ対応）

## コーディング規約

- 型安全性を重視（any の使用禁止）
- const を優先使用（let は必要な場合のみ）
- 非破壊的操作を優先
- 日本語でのコミットメッセージ（Conventional Commits 形式）
  ```
  feat: 新機能の追加
  fix: バグ修正
  docs: ドキュメントの更新
  test: テストの追加・修正
  refactor: リファクタリング
  chore: ビルドプロセスや補助ツールの変更
  ```
