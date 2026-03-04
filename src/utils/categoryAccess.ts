export type CategoryId = 1 | 2 | 3 | 4 | 5;

export const CATEGORY_LABELS: Record<CategoryId, string> = {
  1: '一般',
  2: '大学・研究所',
  3: '企業',
  4: '医者',
  5: '管理者',
};

export const BOARD_LABELS: Record<CategoryId, string> = {
  1: '一般掲示板',
  2: '大学・研究所掲示板',
  3: '企業掲示板',
  4: '医者掲示板',
  5: '管理者掲示板',
};

const CATEGORY_NAME_TO_ID: Record<string, CategoryId> = {
  '一般': 1,
  '大学・研究所': 2,
  '企業': 3,
  '医者': 4,
  '管理者': 5,
  'General': 1,
  'Academic': 2,
  'Corporate': 3,
  'Medical': 4,
  'Admin': 5,
  'Administrator': 5,
};

export const ALL_CATEGORY_IDS: CategoryId[] = [1, 2, 3, 4, 5];

export const isCategoryId = (value: number): value is CategoryId =>
  value >= 1 && value <= 5;

export const parseCategoryId = (value: unknown): CategoryId | null => {
  const numeric = Number(value);
  if (!Number.isInteger(numeric)) return null;
  return isCategoryId(numeric) ? numeric : null;
};

export const resolveUserCategoryId = (data: Record<string, unknown>): CategoryId | null => {
  const categoryId = parseCategoryId(data.category_id);
  if (categoryId) return categoryId;

  const categoryName = String(data.category ?? '').trim();
  return CATEGORY_NAME_TO_ID[categoryName] ?? null;
};

export const getAccessibleCategoryIds = (userCategoryId: CategoryId | null | undefined): CategoryId[] => {
  if (userCategoryId === 5) {
    return [...ALL_CATEGORY_IDS];
  }
  if (userCategoryId === 2 || userCategoryId === 3 || userCategoryId === 4) {
    return [1, userCategoryId];
  }
  return [1];
};

export const canAccessCategory = (targetCategoryId: CategoryId, userCategoryId: CategoryId | null | undefined): boolean =>
  getAccessibleCategoryIds(userCategoryId).includes(targetCategoryId);
