import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ControlButtons } from './ControlButtons'

describe('ControlButtons', () => {
  it('スタートボタンとクリアボタンを表示する', () => {
    render(
      <ControlButtons
        onStart={() => {}}
        onClear={() => {}}
        isDisabled={false}
      />
    )
    
    expect(screen.getByRole('button', { name: 'スタート' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'クリア' })).toBeInTheDocument()
  })

  it('スタートボタンクリックでonStartが呼ばれる', async () => {
    const user = userEvent.setup()
    const onStart = vi.fn()
    
    render(
      <ControlButtons
        onStart={onStart}
        onClear={() => {}}
        isDisabled={false}
      />
    )
    
    await user.click(screen.getByRole('button', { name: 'スタート' }))
    expect(onStart).toHaveBeenCalledOnce()
  })

  it('クリアボタンクリックでonClearが呼ばれる', async () => {
    const user = userEvent.setup()
    const onClear = vi.fn()
    
    render(
      <ControlButtons
        onStart={() => {}}
        onClear={onClear}
        isDisabled={false}
      />
    )
    
    await user.click(screen.getByRole('button', { name: 'クリア' }))
    expect(onClear).toHaveBeenCalledOnce()
  })

  it('isDisabledがtrueの時、スタートボタンが無効になる', () => {
    render(
      <ControlButtons
        onStart={() => {}}
        onClear={() => {}}
        isDisabled={true}
      />
    )
    
    const startButton = screen.getByRole('button', { name: 'スタート' })
    expect(startButton).toBeDisabled()
  })

  it('isDisabledがtrueでも、クリアボタンは有効のまま', () => {
    render(
      <ControlButtons
        onStart={() => {}}
        onClear={() => {}}
        isDisabled={true}
      />
    )
    
    const clearButton = screen.getByRole('button', { name: 'クリア' })
    expect(clearButton).not.toBeDisabled()
  })

  it('無効時のスタートボタンは視覚的に区別できる', () => {
    render(
      <ControlButtons
        onStart={() => {}}
        onClear={() => {}}
        isDisabled={true}
      />
    )
    
    const startButton = screen.getByRole('button', { name: 'スタート' })
    expect(startButton).toHaveClass('opacity-50', 'cursor-not-allowed')
  })
})