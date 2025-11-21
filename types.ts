export interface ComponentInfo {
  name: string;
  description: string;
  workflowRole: string;
  analogy: string;
}

export interface AnalysisResult {
  deviceName: string;
  summary: string;
  components: ComponentInfo[];
}

export interface AppState {
  status: 'idle' | 'analyzing' | 'generating' | 'complete' | 'error';
  originalImage: string | null; // base64
  generatedImage: string | null; // base64
  analysis: AnalysisResult | null;
  error: string | null;
}