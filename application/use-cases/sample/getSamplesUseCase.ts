import { Sample } from '../../../domain/models/sample';
import { SampleRepository } from '../../../domain/repositories/sampleRepository';

export class GetSamplesUseCase {
  constructor(private sampleRepository: SampleRepository) {}
  
  async execute(): Promise<Sample[]> {
    return this.sampleRepository.getAll();
  }
} 