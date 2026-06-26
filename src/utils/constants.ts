export const GITHUB_URL = 'https://github.com';
export const LAST_SEARCHED_USER_KEY = 'github-explorer-last-user';
export const THEME_KEY = 'github-explorer-theme';

export const SORT_OPTIONS = [
  { value: 'stars_desc', label: 'Mais estrelas' },
  { value: 'stars_asc', label: 'Menos estrelas' },
  { value: 'name_asc', label: 'Nome A-Z' },
  { value: 'name_desc', label: 'Nome Z-A' },
  { value: 'updated_desc', label: 'Última atualização' },
] as const;
