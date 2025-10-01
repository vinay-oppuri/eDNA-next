export type View =
  | 'global-overview'
  | 'datasets'
  | 'queries'
  | 'review'
  | 'settings'
  | `dataset-${string}`;

export interface Dataset {
  id: string;
  name: string;
  createdAt: Date;
}
