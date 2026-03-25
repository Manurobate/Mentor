export const initLevels = [
  { name: 'Primaire' },
  { name: 'Collège' },
  { name: 'Lycée' },
  { name: 'Université' },
];

export const initSubjects = [
  { name: 'Français', levelId: 1 },
  { name: 'Mathématiques', levelId: 1 },
  { name: 'Sciences', levelId: 1 },

  // { name: 'Français', levelId: 2 },
  // { name: 'Mathématiques', levelId: 2 },
  { name: 'Histoire-Geographie', levelId: 2 },
  { name: 'SVT', levelId: 2 },
  { name: 'Sport', levelId: 2 },
  // { name: 'Physique-Chimie', levelId: 2 },

  { name: 'Philosophie', levelId: 3 },
  // { name: 'Mathématiques', levelId: 3 },
  { name: 'SES', levelId: 3 },
  { name: 'Physique-Chimie', levelId: 3 },
  { name: 'HGGSP', levelId: 3 },

  { name: 'Informatique', levelId: 4 },
  { name: 'Droit', levelId: 4 },
  { name: 'Economie', levelId: 4 },
  { name: 'Médecine', levelId: 4 },
];

export const formatStringToSql = (str: string | undefined | null): string =>
  str ? `'${str.replace(/'/g, "''")}'` : 'NULL';
