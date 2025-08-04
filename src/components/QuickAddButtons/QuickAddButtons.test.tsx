import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QuickAddButtons } from './QuickAddButtons'

describe('QuickAddButtons', () => {
  it('+10分、+30秒、+10秒ボタンを表示する', () => {
    render(<QuickAddButtons onAddTime={() => {}} />)
    
    expect(screen.getByRole('button', { name: '+10分' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '+30秒' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '+10秒' })).toBeInTheDocument()
  })

  it('+10分ボタンクリックで10分追加される', async () => {
    const user = userEvent.setup()
    const onAddTime = vi.fn()
    
    render(<QuickAddButtons onAddTime={onAddTime} />)
    
    await user.click(screen.getByRole('button', { name: '+10分' }))
    expect(onAddTime).toHaveBeenCalledWith(0, 10, 0)
  })

  it('+30秒ボタンクリックで30秒追加される', async () => {
    const user = userEvent.setup()
    const onAddTime = vi.fn()
    
    render(<QuickAddButtons onAddTime={onAddTime} />)
    
    await user.click(screen.getByRole('button', { name: '+30秒' }))
    expect(onAddTime).toHaveBeenCalledWith(0, 0, 30)
  })

  it('+10秒ボタンクリックで10秒追加される', async () => {
    const user = userEvent.setup()
    const onAddTime = vi.fn()
    
    render(<QuickAddButtons onAddTime={onAddTime} />)
    
    await user.click(screen.getByRole('button', { name: '+10秒' }))
    expect(onAddTime).toHaveBeenCalledWith(0, 0, 10)
  })

  it('モバイルでもタップしやすいサイズのボタンを持つ', () => {
    render(<QuickAddButtons onAddTime={() => {}} />)
    
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toHaveClass('min-h-11')
    })
  })
})