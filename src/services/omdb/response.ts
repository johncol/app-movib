export type BooleanString = 'True' | 'False';

export interface OMDBResponse {
  Response: BooleanString;
  Error?: string;
}
