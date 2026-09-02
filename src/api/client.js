import axios from 'axios';

const api = axios.create({
  baseURL: 'https://prop-qa-backend.vercel.app',
  headers: { 'Content-Type': 'application/json' }
});

export function getResults(boardId) {
  return api.get('/api/results', { params: { boardId } }).then(r => r.data);
}

export function updateResult(boardId, testId, payload) {
  return api.put(`/api/results/${encodeURIComponent(testId)}`, { boardId, ...payload }).then(r => r.data);
}

export function resetResults(boardId, testIds) {
  const body = testIds ? { boardId, testIds } : { boardId };
  return api.post('/api/results/reset', body).then(r => r.data);
}
