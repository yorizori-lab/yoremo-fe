import { Sample } from '../../../domain/models/sample';
import { SampleRepository } from '../../../domain/repositories/sampleRepository';
import { fetchApi, fetchAuthApi } from '../httpClient';

export class SampleApiRepository implements SampleRepository {
  private endpoint = '/samples';

  async getAll(): Promise<Sample[]> {
    return fetchApi<Sample[]>(this.endpoint);
  }
  
  async getById(id: string): Promise<Sample | null> {
    return fetchApi<Sample>(`${this.endpoint}/${id}`);
  }
  
  async create(sample: Sample): Promise<Sample> {
    // 인증이 필요한 요청은 fetchAuthApi 사용
    return fetchAuthApi<Sample>(this.endpoint, {
      method: 'POST',
      body: JSON.stringify(sample),
    });
  }
  
  async update(id: string, sample: Sample): Promise<Sample> {
    return fetchAuthApi<Sample>(`${this.endpoint}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(sample),
    });
  }
  
  async delete(id: string): Promise<boolean> {
    await fetchAuthApi(`${this.endpoint}/${id}`, { method: 'DELETE' });
    return true;
  }
}