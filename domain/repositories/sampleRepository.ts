import { Sample } from '../models/sample';

export interface SampleRepository {
  getAll(): Promise<Sample[]>;
  getById(id: string): Promise<Sample | null>;
  create(sample: Sample): Promise<Sample>;
  update(id: string, sample: Sample): Promise<Sample>;
  delete(id: string): Promise<boolean>;
} 