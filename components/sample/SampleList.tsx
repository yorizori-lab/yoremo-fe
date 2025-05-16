'use client';

import { useSamples } from '../../presentation/hooks/useSamples';

export function SampleList() {
  const { samples, loading, error, refetch } = useSamples();
  
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error.message}</div>;
  
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">샘플 목록</h2>
      <button 
        onClick={() => refetch()}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
      >
        새로고침
      </button>
      
      {samples.length === 0 ? (
        <p>표시할 샘플이 없습니다.</p>
      ) : (
        <ul className="space-y-2">
          {samples.map(sample => (
            <li key={sample.id} className="p-4 border rounded">
              <h3 className="font-semibold">{sample.name}</h3>
              <p>{sample.description}</p>
              <p className="text-sm text-gray-500">
                생성일: {new Date(sample.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 