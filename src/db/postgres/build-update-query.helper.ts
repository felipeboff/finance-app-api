export function buildUpdateQuery(
  table: string,
  idField: string,
  data: unknown,
): { query: string; values: unknown[] } {
  const entries = Object.entries(data as Record<string, unknown>);
  const fields: string[] = [];
  const values: unknown[] = [];
  let index = 1;

  for (const [key, value] of entries) {
    if (key !== idField) {
      fields.push(`${key} = $${index++}`);
      values.push(value);
    }
  }

  values.push((data as Record<string, unknown>)[idField]);
  const setClause = fields.join(", ");
  const query = `UPDATE ${table} SET ${setClause} WHERE ${idField} = $${index} RETURNING *`;

  return { query, values };
}
