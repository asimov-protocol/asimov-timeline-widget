import React, { useEffect, useRef, useCallback } from 'react'
import { DataSet } from 'vis-data'
import { Timeline, TimelineOptions, TimelineItem } from 'vis-timeline/esnext'
import { type SparqlBinding, canAnyRowBeTimeline, isDateLikeField } from './utils'
import 'vis-timeline/styles/vis-timeline-graph2d.min.css'
import './style.css'

/**
 * TimelineViewProps describes all configurable properties for the TimelineView.
 *
 * @property {SparqlBinding[]} data      An array of SPARQL bindings to parse into timeline items.
 * @property {string} [className]              Optional CSS classes for styling the timeline container.
 * @property {TimelineOptions} [timelineOptions] Additional options for vis-timeline (e.g., selectable, orientation).
 * @property {(itemId: number | string, event: Event) => void} [onNodeClick]
 *                                             Optional callback fired when a timeline item is clicked.
 *                                             Receives the item’s ID and the click event.
 */
export interface TimelineViewProps {
  data?: SparqlBinding[]
  className?: string
  timelineOptions?: TimelineOptions
  onNodeClick?: (itemId: number | string, event: Event) => void
}

/**
 * A modular timeline component that transforms SPARQL data into vis-timeline items,
 * allowing timeline customization and item-click handling.
 */
export const TimelineView: React.FC<TimelineViewProps> = ({
  data,
  className = '',
  timelineOptions,
  onNodeClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  // Convert SPARQL bindings to timeline items
  const transformBindingsToVisItems = useCallback((bindings: SparqlBinding[]): TimelineItem[] => {
    return bindings
      .map((row, index) => {
        // Find a date-like field (used for 'start')
        const dateField = Object.values(row).find((field) => isDateLikeField(field))
        if (!dateField) return null

        let dateValue: Date
        if (/^\d{4}$/.test(dateField.value)) {
          dateValue = new Date(`${dateField.value}-01-01`)
        } else {
          dateValue = new Date(dateField.value)
        }
        if (isNaN(dateValue.getTime())) return null

        // Instead of relying on a "title" key, grab the first literal field that isn't a date
        const possibleTitleField = Object.values(row).find(
          (field) => field.type === 'literal' && !isDateLikeField(field)
        )
        const title = possibleTitleField?.value || '(No title)'

        return {
          id: index + 1,
          content: title,
          start: dateValue,
        } as TimelineItem
      })
      .filter((item): item is TimelineItem => item !== null)
  }, [])

  useEffect(() => {
    const bindings = data ?? []
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
  }, [data, timelineOptions, onNodeClick, transformBindingsToVisItems])

  if (!data?.length || !canAnyRowBeTimeline(data)) {
    return <div className="text-center">No valid timeline data found.</div>
  }

  return <div ref={containerRef} className={`timeline-container ${className}`} />
}
