# ASIMOV Timeline Widget

A modular React component that transforms SPARQL data into [vis-timeline](https://github.com/visjs/vis-timeline) items, allowing timeline customization and item-click handling.

> **Note:** This package isn’t published to npm. You can install it directly from GitHub.

![Timeline](https://github.com/user-attachments/assets/a8c6c9ff-ab6e-4936-927f-352e01cabb9b)


### Installation from GitHub

```bash
npm install --save git+https://github.com/asimov-protocol/asimov-timeline-widget.git
```

### Basic Usage

```tsx
import React from 'react'
import { TimelineView } from 'asimov-timeline-widget'
import 'asimov-timeline-widget/dist/asimov-timeline-widget.css'

export function MyTimeline() {
  return (
    <TimelineView
      sparqlData={[]} // Provide SPARQL data
    />
  )
}

```

### Props

| Prop Name       | Type                                                                                  | Default Value        | Required? | Description                                                                                                                                                       |
|-----------------|---------------------------------------------------------------------------------------|----------------------|:--------:|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `sparqlData`    | `SparqlBinding[]`                                                                     | `undefined`         |    Yes     | Array of SPARQL bindings to parse into timeline items. If not provided or no valid date fields exist, displays "No valid timeline data found."                   |
| `className`     | `string`                                                                              | `""`                |    No     | Additional CSS class names for the timeline container                                                                                                            |
| `timelineOptions` | [`TimelineOptions`](https://github.com/visjs/vis-timeline/blob/master/docs/timeline.md#Configuration_Options) | `{ selectable: true }` |    No     | Additional options for [vis-timeline](https://github.com/visjs/vis-timeline), merged with default timeline options                                               |
| `onNodeClick`    | `(itemId: number \| string, event: Event) => void`                                   | `undefined`         |    No     | Callback fired on item click. Receives the item’s ID and the click event                                                                                          |

### Notes

- The `isDateLikeField` helper checks if a field is of type "literal" with a recognized date/datetime `datatype`.
- The `canAnyRowBeTimeline` helper checks if at least one row has a valid date-like field.
- The component automatically displays a fallback message if no valid timeline data is found.
- You can combine `timelineOptions` with the default options to customize the timeline (e.g., orientation, zoomable, etc.).
- For testing, refer to [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) for React test utilities and [vitest](https://vitest.dev/) for running tests.
