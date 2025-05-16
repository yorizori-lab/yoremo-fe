import { useState, useEffect } from 'react';
import { Sample } from '../../domain/models/sample';
import { getSamplesUseCase } from '../../lib/dependencies';

export function useSamples() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const fetchSamples = async () => {
    try {
      setLoading(true);
      const data = await getSamplesUseCase.execute();
      setSamples(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchSamples();
  }, []);
  
  return {
    samples,
    loading,
    error,
    refetch: fetchSamples
  };
} 