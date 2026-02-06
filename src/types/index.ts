export interface Visit {
  ip: string;
  date: string;
}

export interface VisitCounterData {
  visits?: Visit[];
}

export interface ResponseVisitWithData {
  data: VisitCounterData;
}
