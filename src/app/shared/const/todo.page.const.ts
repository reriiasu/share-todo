export const todoPageConst = {
  /** 最小年 */
  minYear: '2021',

  mode: {
    view: 'view',
    create: 'create',
    edit: 'edit',
  },

  format: {
    free: 'free',
    bulletPoint: 'bulletPoint',
  },
} as const;

export type Mode = typeof todoPageConst.mode[keyof typeof todoPageConst.mode];
export type Format = typeof todoPageConst.format[keyof typeof todoPageConst.format];
