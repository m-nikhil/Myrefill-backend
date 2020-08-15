export interface PostgresQueryFailedError {
  stack?: string;
  message: string;
  name: string;
  length: number;
  code: number;
  severity: string;
  detail: string;
  hint: string;
  position: string;
  internalPosition: string;
  interalQuery: string;
  where: string;
  schema: string;
  table: string;
  column: string;
  dataType: string;
  constraint: string;
  file: string;
  line: number;
  routine: string;
  query: string;
  parameters: string;
}
