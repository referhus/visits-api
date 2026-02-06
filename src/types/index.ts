export interface VisitCounterData {
  'visit-counter'?: {
    count: number;
  }[];
}

export interface ResponseVisitWithData {
  data: VisitCounterData;
}
