import { Sample } from '../../../domain/models/sample';
import { SampleRepository } from '../../../domain/repositories/sampleRepository';

export class GetSampleByIdUseCase {
  constructor(private sampleRepository: SampleRepository) {}
  
  async execute(id: string): Promise<Sample | null> {
    return this.sampleRepository.getById(id);
  }
} 