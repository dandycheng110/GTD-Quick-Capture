// =============================================================================
// App.jsx — 頂層元件
// AppProvider 包住 CaptureBar + InboxView
// =============================================================================

import { AppProvider } from './context/AppContext.jsx';
import CaptureBar from './components/CaptureBar.jsx';
import InboxView from './components/InboxView.jsx';

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col">
        <CaptureBar />
        <main className="flex-1">
          <InboxView />
        </main>
        <footer className="py-4 text-center text-xs text-slate/60">
          GTD Quick Capture v0.1 · 成育典 · React 期末專題
        </footer>
      </div>
    </AppProvider>
  );
}
