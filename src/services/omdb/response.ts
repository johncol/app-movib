export type BooleanString = 'True' | 'False';

export const NA = 'N/A';

export interface OMDBResponse {
  Response: BooleanString;
  Error?: string;
}
