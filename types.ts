export interface ComponentInfo {
  name: string;
  description: string;
  workflowRole: string;
  analogy: string;
  scientificPrinciple: string;
}

export interface AnalysisResult {
  deviceName: string;
  summary: string;
  components: ComponentInfo[];
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  originalImage: string;
  generatedImage: string;
  analysis: AnalysisResult;
}

export interface AppState {
  status: 'idle' | 'analyzing' | 'generating' | 'complete' | 'error' | 'history';
  originalImage: string | null; // base64
  generatedImage: string | null; // base64
  analysis: AnalysisResult | null;
  error: string | null;
  history: HistoryItem[];
}