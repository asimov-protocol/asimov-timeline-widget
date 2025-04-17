# ASIMOV Timeline Widget

[![CI](https://github.com/asimov-protocol/asimov-timeline-widget/actions/workflows/ci.yml/badge.svg)](https://github.com/asimov-protocol/asimov-timeline-widget/actions/workflows/ci.yml)

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
      data={[]} // Provide SPARQL data
    />
  )
}

```

### Props

| Prop Name       | Type                                                                                  | Default Value        | Required? | Description                                                                                                                                                       |
|-----------------|---------------------------------------------------------------------------------------|----------------------|:--------:|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `data`    | `SparqlBinding[]`                                                                     | `undefined`         |    Yes     | Array of SPARQL bindings to parse into timeline items. If not provided or no valid date fields exist, displays "No valid timeline data found."                   |
| `className`     | `string`                                                                              | `""`                |    No     | Additional CSS class names for the timeline container                                                                                                            |
| `timelineOptions` | [`TimelineOptions`](https://visjs.github.io/vis-timeline/docs/timeline/#Styles) | `{ selectable: true }` |    No     | Additional options for [vis-timeline](https://github.com/visjs/vis-timeline), merged with default timeline options                                               |
| `onNodeClick`    | `(itemId: number \| string, event: Event) => void`                                   | `undefined`         |    No     | Callback fired on item click. Receives the item’s ID and the click event                                                                                          |

### Notes

- The `isDateLikeField` helper checks if a field is of type "literal" with a recognized date/datetime `datatype`.
- The `canAnyRowBeTimeline` helper checks if at least one row has a valid date-like field.
- The component automatically displays a fallback message if no valid timeline data is found.
- You can combine `timelineOptions` with the default options to customize the timeline (e.g., orientation, zoomable, etc.).
- For testing, refer to [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) for React test utilities and [vitest](https://vitest.dev/) for running tests.

## Styling & Customization

In addition to basic CSS classes, the Timeline Widget exposes a set of custom CSS variables that make it easy to quickly configure or theme timeline elements. By default, these variables have fallback values but can be overridden in your own stylesheet to match your desired look and feel.

### Using Custom Properties (CSS Variables)

Below is a list of commonly used variables, along with their default values:

| Variable Name                                 | Default                     | Description                                      |
|----------------------------------------------|-----------------------------|--------------------------------------------------|
| `--timeline-container-bg`                     | `#05122e`                   | Background color of the main timeline container |
| `--timeline-container-color`                  | `#f6f6f6`                   | Text color for the timeline container           |
| `--timeline-vis-timeline-bg`                  | `#05122e`                   | Background color of `.vis-timeline`             |
| `--timeline-vis-timeline-color`               | `#f6f6f6`                   | Text color of `.vis-timeline`                   |
| `--timeline-vis-timeline-border`              | `none`                      | Border style of `.vis-timeline`                 |
| `--timeline-vis-foreground-bg`                | `#05122e`                   | Foreground color of `.vis-foreground`           |
| `--timeline-vis-foreground-color`             | `#f6f6f6`                   | Text color of `.vis-foreground`                 |
| `--timeline-vis-foreground-border`            | `none`                      | Border style of `.vis-foreground`               |
| `--timeline-vis-background-bg`                | `#05122e`                   | Background color of `.vis-background`           |
| `--timeline-vis-background-color`             | `#f6f6f6`                   | Text color of `.vis-background`                 |
| `--timeline-vis-background-border`            | `none`                      | Border style of `.vis-background`               |
| `--timeline-axis-text-color`                  | `#b3b3b3`                   | Color for axis text labels                      |
| `--timeline-axis-bg`                          | `#04163c`                   | Background color for the time axis area         |
| `--timeline-item-bg`                          | `#04163c`                   | Background color for timeline items             |
| `--timeline-item-color`                       | `#f6f6f6`                   | Text color for timeline items                   |
| `--timeline-item-border`                      | `#6a7ca2`                   | Border color for timeline items                 |
| `--timeline-item-hover-border`                | `#f37021`                   | Border color on hover                           |
| `--timeline-item-selected-border`             | `#f37021`                   | Border color for a selected item                |
| `--timeline-item-selected-color`              | `#ffffff`                   | Text color for a selected item                  |
| `--timeline-item-selected-bg`                 | `#f37021`                   | Background color for a selected item            |
| `--timeline-current-time-bg`                  | `#f37021`                   | Color of the "current time" line                |

#### How to Override

To override these variables, simply define them in your own stylesheet at a higher level (e.g., your global CSS or a wrap component). For example:

```css
:root {
  --timeline-container-bg: #ffffff;         /* main timeline container background */
  --timeline-container-color: #000;         /* main text color */
  --timeline-item-bg: #fffae6;             /* item background color */
  --timeline-item-border: #ffa726;         /* item border color */
  --timeline-current-time-bg: #e91e63;     /* current time line color */
}
```

## Local Development

If you’d like to work with this repository directly, simply clone it and install its dependencies. Then, you can spin up the development server with the following commands:

```bash
git clone https://github.com/asimov-protocol/asimov-timeline-widget.git
cd asimov-timeline-widget
nvm use # optional
npm install
npm run dev
```
