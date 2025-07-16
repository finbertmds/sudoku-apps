// whatsNew/classic.ts

import {WhatsNewEntry} from '@sudoku/shared-types';

export const WHATS_NEW_CLASSIC: WhatsNewEntry[] = [
  {
    version: '0.0.2',
    changes: [
      {
        title: {
          en: 'Smart Memo Filtering',
          vi: 'Lọc số ghi chú thông minh',
          ja: 'スマートメモフィルタリング',
        },
        description: {
          en: 'Only show memo numbers that are valid in the selected cell based on the current board.',
          vi: 'Chỉ hiển thị số ghi chú hợp lệ theo hàng, cột và khung 3x3 dựa trên bảng hiện tại.',
          ja: '現在の盤面に基づいて、選択されたセルに有効な数字のみをメモとして表示します。',
        },
      },
    ],
  },
];
