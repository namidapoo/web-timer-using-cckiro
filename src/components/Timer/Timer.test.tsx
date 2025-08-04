import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Timer } from './Timer'

describe('Timer', () => {
  it('初期状態で00:00:00を表示する', () => {
    render(<Timer />)
    expect(screen.getByText('00:00:00')).toBeInTheDocument()
  })

  it('すべての必要なコンポーネントを表示する', () => {
    render(<Timer />)
    
    // タイトル
    expect(screen.getByText('Web Timer')).toBeInTheDocument()
    
    // 時間表示
    expect(screen.getByRole('timer')).toBeInTheDocument()
    
    // 調整ボタン（時・分・秒それぞれ2つずつ）
    expect(screen.getAllByRole('button', { name: /increase/i })).toHaveLength(3)
    expect(screen.getAllByRole('button', { name: /decrease/i })).toHaveLength(3)
    
    // クイック追加ボタン
    expect(screen.getByRole('button', { name: '+10分' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '+30秒' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '+10秒' })).toBeInTheDocument()
    
    // コントロールボタン
    expect(screen.getByRole('button', { name: 'スタート' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'クリア' })).toBeInTheDocument()
  })

  it('初期状態でスタートボタンは無効', () => {
    render(<Timer />)
    
    const startButton = screen.getByRole('button', { name: 'スタート' })
    expect(startButton).toBeDisabled()
  })
})