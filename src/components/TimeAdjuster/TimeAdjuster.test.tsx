import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TimeAdjuster } from './TimeAdjuster'

describe('TimeAdjuster', () => {
  it('現在の値と＋/ーボタンを表示する', () => {
    render(
      <TimeAdjuster
        value={10}
        onIncrement={() => {}}
        onDecrement={() => {}}
        type="minutes"
      />
    )
    
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /increase minutes/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /decrease minutes/i })).toBeInTheDocument()
  })

  it('＋ボタンクリックでonIncrementが呼ばれる', async () => {
    const user = userEvent.setup()
    const onIncrement = vi.fn()
    
    render(
      <TimeAdjuster
        value={5}
        onIncrement={onIncrement}
        onDecrement={() => {}}
        type="seconds"
      />
    )
    
    await user.click(screen.getByRole('button', { name: /increase seconds/i }))
    expect(onIncrement).toHaveBeenCalledOnce()
  })

  it('ーボタンクリックでonDecrementが呼ばれる', async () => {
    const user = userEvent.setup()
    const onDecrement = vi.fn()
    
    render(
      <TimeAdjuster
        value={5}
        onIncrement={() => {}}
        onDecrement={onDecrement}
        type="hours"
      />
    )
    
    await user.click(screen.getByRole('button', { name: /decrease hours/i }))
    expect(onDecrement).toHaveBeenCalledOnce()
  })

  it('2桁固定で値を表示する', () => {
    render(
      <TimeAdjuster
        value={5}
        onIncrement={() => {}}
        onDecrement={() => {}}
        type="minutes"
      />
    )
    
    expect(screen.getByText('05')).toBeInTheDocument()
  })

  it('タップしやすいサイズのボタンを持つ', () => {
    render(
      <TimeAdjuster
        value={0}
        onIncrement={() => {}}
        onDecrement={() => {}}
        type="seconds"
      />
    )
    
    const increaseButton = screen.getByRole('button', { name: /increase seconds/i })
    const decreaseButton = screen.getByRole('button', { name: /decrease seconds/i })
    
    expect(increaseButton).toHaveClass('min-h-11', 'min-w-11')
    expect(decreaseButton).toHaveClass('min-h-11', 'min-w-11')
  })
})