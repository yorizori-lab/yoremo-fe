// 샘플 도메인 의존성
import { SampleRepository } from '../domain/repositories/sampleRepository';
import { SampleApiRepository } from '../infrastructure/api/repositories/sampleApiRepository';
import { GetSamplesUseCase } from '../application/use-cases/sample/getSamplesUseCase';
import { GetSampleByIdUseCase } from '../application/use-cases/sample/getSampleByIdUseCase';
import { CreateSampleUseCase } from '../application/use-cases/sample/createSampleUseCase';

// 샘플 리포지토리 인스턴스
export const sampleRepository: SampleRepository = new SampleApiRepository();

// 샘플 유스케이스 인스턴스
export const getSamplesUseCase = new GetSamplesUseCase(sampleRepository);
export const getSampleByIdUseCase = new GetSampleByIdUseCase(sampleRepository);
export const createSampleUseCase = new CreateSampleUseCase(sampleRepository);

// 추가 도메인 의존성은 여기에 추가
// export const otherRepository = ...
// export const otherUseCase = ... 