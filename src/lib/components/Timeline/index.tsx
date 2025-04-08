import React, { useEffect, useRef, useCallback } from 'react'
import { DataSet } from 'vis-data'
import { Timeline, TimelineOptions, TimelineItem } from 'vis-timeline/esnext'
import { canAnyRowBeTimeline, SparqlBinding } from './utils'
import 'vis-timeline/styles/vis-timeline-graph2d.min.css'
import '../../../style.css'

/**
 * TimelineViewProps describes all configurable properties for the TimelineView.
 *
 * @property {SparqlBinding[]} sparqlData      An array of SPARQL bindings to parse into timeline items.
 * @property {string} [className]              Optional CSS classes for styling the timeline container.
 * @property {TimelineOptions} [timelineOptions] Additional options for vis-timeline (e.g., selectable, orientation).
 * @property {(itemId: number | string, event: Event) => void} [onNodeClick]
 *                                             Optional callback fired when a timeline item is clicked.
 *                                             Receives the item’s ID and the click event.
 */
export interface TimelineViewProps {
  sparqlData?: SparqlBinding[]
  className?: string
  timelineOptions?: TimelineOptions
  onNodeClick?: (itemId: number | string, event: Event) => void
}

/**
 * A modular timeline component that transforms SPARQL data into vis-timeline items,
 * allowing timeline customization and item-click handling.
 */
export const TimelineView: React.FC<TimelineViewProps> = ({
  sparqlData,
  className = '',
  timelineOptions,
  onNodeClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  // Helper to detect if a SPARQL field is date-like.
  function isDateLikeField(field: any): boolean {
    if (!field || typeof field !== 'object') return false
    if (field.type !== 'literal') return false
    const { value, datatype } = field
    if (!datatype) return false
    const isDateDatatype = datatype.includes('dateTime') || datatype.includes('date')
    if (!isDateDatatype) return false
    const dt = new Date(value)
    return !isNaN(dt.getTime())
  }

  // Convert SPARQL bindings to timeline items
  const transformBindingsToVisItems = useCallback((bindings: SparqlBinding[]): TimelineItem[] => {
    return bindings
      .map((row, index) => {
        const dateField = Object.values(row).find((field) => isDateLikeField(field))
        if (!dateField) return null

        let dateValue: Date
        if (/^\d{4}$/.test(dateField.value)) {
          dateValue = new Date(`${dateField.value}-01-01`)
        } else {
          dateValue = new Date(dateField.value)
        }
        if (isNaN(dateValue.getTime())) return null

        const title = row.title?.value || '(No title)'
        return {
          id: index + 1,
          content: title,
          start: dateValue,
        } as TimelineItem
      })
      .filter((item): item is TimelineItem => item !== null)
  }, [])

  useEffect(() => {
    const bindings = sparqlData ?? []
    const items = transformBindingsToVisItems(bindings)

    if (!items.length || !containerRef.current) return

    const dataSet = new DataSet(items)
    const defaultOptions: TimelineOptions = { selectable: true }
    const mergedOptions: TimelineOptions = { ...defaultOptions, ...timelineOptions }

    const timelineInstance = new Timeline(containerRef.current, dataSet as any, mergedOptions)

    // Listen for item clicks
    timelineInstance.on('click', (props) => {
      if (props.item && onNodeClick) {
        onNodeClick(props.item, props.event)
      }
    })

    return () => {
      timelineInstance.destroy()
    }
  }, [sparqlData, timelineOptions, onNodeClick, transformBindingsToVisItems])

  if (!sparqlData?.length || !canAnyRowBeTimeline(sparqlData)) {
    return <div className="text-center">No valid timeline data found.</div>
  }

  return <div ref={containerRef} className={`timeline-container ${className}`} />
}
