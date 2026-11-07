// whatsNew/classic.ts

import {WhatsNewRelease} from '@sudoku/shared-types';

export const WHATS_NEW_CLASSIC: WhatsNewRelease[] = [
  {
    versions: {android: '0.0.5', ios: '0.0.5'},
    changes: [
      {
        platforms: ['android'],
        title: {
          en: 'Android 16 Support',
          vi: 'Hỗ trợ Android 16',
          ja: 'Android 16対応',
        },
        description: {
          en: 'Updated the app for Android 16 compatibility.',
          vi: 'Cập nhật ứng dụng để tương thích với Android 16.',
          ja: 'Android 16に対応しました。',
        },
      },
    ],
  },
  {
    versions: {android: '0.0.3', ios: '0.0.3', web: '0.0.3'},
    changes: [
      {
        title: {
          en: 'Resume Unfinished Game',
          vi: 'Tiếp tục ván cũ',
          ja: '未完了ゲームを再開',
        },
        description: {
          en: 'Continue playing the unfinished game.',
          vi: 'Tiếp tục chơi ván chưa hoàn thành.',
          ja: '未完了ゲームを再開します。',
        },
      },
    ],
  },
  {
    versions: {android: '0.0.2', ios: '0.0.2', web: '0.0.2'},
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
  {
    versions: {android: '0.0.1', ios: '0.0.1', web: '0.0.1'},
    changes: [
      {
        title: {
          en: 'Multiple local players',
          vi: 'Nhiều người chơi tại chỗ',
          ja: '複数のローカルプレイヤー',
        },
        description: {
          en: 'Create and manage different players locally, with separate game logs and stats for each.',
          vi: 'Tạo và quản lý nhiều người chơi khác nhau trên máy, mỗi người có thống kê và lịch sử chơi riêng.',
          ja: '端末内で複数のプレイヤーを作成・管理でき、各プレイヤーごとの統計や履歴も保存されます。',
        },
      },
      {
        title: {
          en: 'Leaderboard & ratings',
          vi: 'Bảng xếp hạng và đánh giá',
          ja: 'ランキングと評価機能',
        },
        description: {
          en: 'Compare players on your device using local leaderboard and performance ratings.',
          vi: 'So sánh người chơi trên thiết bị bằng bảng xếp hạng và đánh giá thành tích.',
          ja: '端末内のプレイヤー同士をランキングとパフォーマンス評価で比較できます。',
        },
      },
      {
        title: {
          en: 'Game history viewer',
          vi: 'Xem lịch sử trò chơi',
          ja: 'ゲーム履歴の表示',
        },
        description: {
          en: 'Review all your past games with detailed stats and performance insights.',
          vi: 'Xem lại tất cả các trò chơi đã chơi cùng với thống kê chi tiết và đánh giá kết quả.',
          ja: 'これまでにプレイしたすべてのゲームを詳細な統計とともに確認できます。',
        },
      },
    ],
  },
];
