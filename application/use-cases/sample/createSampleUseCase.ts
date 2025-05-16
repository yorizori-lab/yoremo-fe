import { Sample } from '../../../domain/models/sample';
import { SampleRepository } from '../../../domain/repositories/sampleRepository';

export class CreateSampleUseCase {
  constructor(private sampleRepository: SampleRepository) {}
  
  async execute(sample: Omit<Sample, 'id' | 'createdAt' | 'updatedAt'>): Promise<Sample> {
    // API에서 id와 타임스탬프를 생성하는 경우를 가정
    const newSample = {
      ...sample,
      id: '', // 서버에서 생성
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as Sample;
    
    return this.sampleRepository.create(newSample);
  }
} 