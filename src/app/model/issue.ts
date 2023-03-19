export interface Issue {
  issueNo: number;
  title: string;
  description:string;
  priority: 'low' | 'high';
  type: 'Feature' | 'Bug' | 'Documentation';
  completed?: Date; // Is optional because of new issues will not have this property set
}
