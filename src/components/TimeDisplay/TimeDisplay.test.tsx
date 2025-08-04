import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TimeDisplay } from './TimeDisplay'

describe('TimeDisplay', () => {
  it('時間を HH:MM:SS 形式で表示する', () => {
    render(<TimeDisplay hours={1} minutes={25} seconds={30} />)
    
    expect(screen.getByText('01:25:30')).toBeInTheDocument()
  })

  it('各単位が2桁固定で表示される', () => {
    render(<TimeDisplay hours={0} minutes={5} seconds={9} />)
    
    expect(screen.getByText('00:05:09')).toBeInTheDocument()
  })

  it('23:59:59も正しく表示される', () => {
    render(<TimeDisplay hours={23} minutes={59} seconds={59} />)
    
    expect(screen.getByText('23:59:59')).toBeInTheDocument()
  })

  it('アクセシビリティ対応のrole属性を持つ', () => {
    render(<TimeDisplay hours={10} minutes={20} seconds={30} />)
    
    const timeDisplay = screen.getByRole('timer')
    expect(timeDisplay).toBeInTheDocument()
    expect(timeDisplay).toHaveAttribute('aria-label', 'Timer: 10 hours 20 minutes 30 seconds')
  })

  it('レスポンシブ対応の大きなフォントで表示される', () => {
    render(<TimeDisplay hours={12} minutes={34} seconds={56} />)
    
    const timeDisplay = screen.getByText('12:34:56')
    expect(timeDisplay).toHaveClass('text-6xl')
    expect(timeDisplay).toHaveClass('md:text-8xl')
  })
})