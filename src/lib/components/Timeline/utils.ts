/**
 * Checks if a SPARQL binding field is a date-literal based on its `datatype`.
 * Returns `true` if:
 *  - `field` exists, is an object,
 *  - `field.type === 'literal'`,
 *  - and `field.datatype` includes "date" or "dateTime",
 *  - and the value parses as a valid JavaScript Date.
 *
 * Otherwise, returns `false`.
 */
export function isDateLikeField(field: any): boolean {
  // Must exist and be an object
  if (!field || typeof field !== 'object') return false;

  // Must be a literal
  if (field.type !== 'literal') return false;

  const { value, datatype } = field;
  if (!datatype) return false;

  // Must have a datatype that indicates a date (e.g. "date", "dateTime", "gYear")
  // Adjust this list if needed for other SPARQL date/time types you want to allow.
  const isDateDatatype =
    datatype.includes('dateTime') || datatype.includes('date');

  if (!isDateDatatype) return false;

  // Try to parse the value as a Date
  const dt = new Date(value);
  return !isNaN(dt.getTime());
}

/**
 * Checks if any row in the provided bindings array has a date-like field.
 * @param {SparqlBinding[]} bindings - The array of SPARQL binding entries.
 * @returns {boolean} True if at least one row contains a date-like field.
 */
export function canAnyRowBeTimeline(bindings: SparqlBinding[]): boolean {
  return bindings.some((row) =>
    Object.values(row).some((field) => isDateLikeField(field))
  )
}

/** A single SPARQL binding entry. */

export interface SparqlBinding {
  [key: string]: {
    value: string
    type: string
    datatype?: string
  }
}
