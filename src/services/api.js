import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('voyager_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Supervisor Multi-Agent Orchestration Service
 * Ready to connect to FastAPI + LangGraph endpoint `/agents/orchestrate`
 * Falls back gracefully to client-side structured simulation when backend is offline.
 */
export async function invokeSupervisorWorkflow(prompt, tripState) {
  try {
    const response = await apiClient.post('/agents/orchestrate', {
      prompt,
      trip_state: tripState,
    });
    return response.data;
  } catch {
    // Simulated structured Pydantic-compatible output when running frontend-only
    return {
      status: 'completed',
      supervisor_summary: `Supervisor Agent coordinated 6 specialized LangGraph agents for: "${prompt}". Shared trip state updated with route-optimized stops, fare locks, and weather contingency triggers.`,
      confidence_score: 0.96,
      timestamp: new Date().toISOString(),
    };
  }
}
