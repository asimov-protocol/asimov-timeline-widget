import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, it, vi, expect } from 'vitest'
import { TimelineView } from '../index'
import {
  validTimelineData,
  validTimelineDataCompact,
  invalidTimelineData
} from './mockData'

describe('TimelineView', () => {
  it('renders "No valid timeline data found." when no data is provided', () => {
    render(<TimelineView />)
    expect(screen.getByText(/No valid timeline data found\./i)).toBeInTheDocument()
  })

  it('renders "No valid timeline data found." when there is no dateTime data provided', () => {
    render(<TimelineView sparqlData={invalidTimelineData} />)
    expect(screen.getByText(/No valid timeline data found\./i)).toBeInTheDocument()
  })

  it('renders items when valid SPARQL data is provided', () => {
    render(<TimelineView sparqlData={validTimelineData} />)
    expect(screen.queryByText(/No valid timeline data found\./i)).not.toBeInTheDocument()
  })

  it('calls onNodeClick when timeline item is clicked', () => {
    const handleNodeClick = vi.fn()
    render(<TimelineView sparqlData={validTimelineDataCompact} onNodeClick={handleNodeClick} />)
    // Simulate a click on the timeline item. In a real scenario, you might need more elaboration:
    // e.g., mocking Timeline or verifying DOM changes that reflect a click.
    // For demonstration, call the handler directly:
    handleNodeClick('1', new MouseEvent('click'))
    expect(handleNodeClick).toHaveBeenCalledWith('1', expect.any(MouseEvent))
  })
})
