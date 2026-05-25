// =============================================================================
// InboxView.jsx — Inbox 收件匣視圖（v0.1 簡版）
// 列出 inbox 項目、能刪除、處理空狀態
// =============================================================================

import { Trash2, Inbox } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { ACTIONS, CATEGORIES } from '../context/reducer.js';

function formatRelative(ts) {
  const diff = Date.now() - ts;
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return '剛剛';
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} 分鐘前`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} 小時前`;
  const day = Math.floor(hr / 24);
  return `${day} 天前`;
}

export default function InboxView() {
  const { state, dispatch } = useApp();

  const inboxItems = state.items
    .filter(it => it.category === CATEGORIES.INBOX)
    .sort((a, b) => b.createdAt - a.createdAt);

  // 空狀態：好的 UX 一定要處理，不能讓使用者看到空白頁
  if (inboxItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate">
        <Inbox size={48} strokeWidth={1.5} className="mb-4 opacity-40" />
        <p className="text-lg mb-2">Inbox 空空如也</p>
        <p className="text-sm opacity-70">在上方輸入框打字，按 Enter 送出</p>
        <p className="text-xs opacity-50 mt-1">提示：按 N 快速聚焦輸入框</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-xl font-bold text-ink flex items-center gap-2">
          <Inbox size={20} className="text-moss" />
          Inbox
        </h2>
        <span className="text-sm text-slate">{inboxItems.length} 項待處理</span>
      </div>

      <ul className="space-y-2">
        {inboxItems.map(item => (
          <li
            key={item.id}
            className="group flex items-start gap-3 p-3 bg-white border border-slate/15
                       rounded-lg hover:border-moss/40 hover:shadow-sm transition-all"
          >
            <div className="flex-1 min-w-0">
              <p className="text-ink break-words">{item.content}</p>
              <p className="text-xs text-slate mt-1">{formatRelative(item.createdAt)}</p>
            </div>
            <button
              onClick={() => {
                if (confirm('確定刪除？')) {
                  dispatch({ type: ACTIONS.DELETE, payload: item.id });
                }
              }}
              className="opacity-0 group-hover:opacity-100 p-2 text-slate
                         hover:text-rust hover:bg-rust/10 rounded transition-all"
              aria-label="刪除"
            >
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
