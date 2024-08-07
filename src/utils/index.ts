export const tagsColor = {
  science: {
    badge:
      'text-[#10b981] bg-[#10b981]/10 border-[#10b981]/20 hover:bg-[#10b981]/10',
    dot: 'bg-[#10b981]',
  },
  math: {
    badge:
      'text-[#0ea5e9] bg-[#0ea5e9]/10 border-[#0ea5e9]/20 hover:bg-[#0ea5e9]/10',
    dot: 'bg-[#0ea5e9]',
  },
  literature: {
    badge:
      'text-[#ec4899] bg-[#ec4899]/10 border-[#ec4899]/20 hover:bg-[#ec4899]/10',
    dot: 'bg-[#ec4899]',
  },
  history: {
    badge:
      'text-[#eab308] bg-[#eab308]/10 border-[#eab308]/20 hover:bg-[#eab308]/10',
    dot: 'bg-[#eab308]',
  },
} as Record<string, Record<'badge' | 'dot', string>>;

export interface IData {
  name: string;
  public: boolean;
  active: boolean;
  regions: string[];
  tags: string[];
}

export const data: IData[] = [
  {
    name: 'Biology',
    public: true,
    active: true,
    regions: ['HS', 'MS', 'ES'],
    tags: ['science'],
  },
  {
    name: 'Chemistry',
    public: true,
    active: true,
    regions: ['HS', 'MS'],
    tags: ['science'],
  },
  {
    name: 'Physics',
    public: false,
    active: false,
    regions: ['HS'],
    tags: ['science', 'math'],
  },
  {
    name: 'Algebra',
    public: false,
    active: true,
    regions: ['HS', 'MS'],
    tags: ['math'],
  },
  {
    name: 'Geometry',
    public: true,
    active: true,
    regions: ['HS', 'MS'],
    tags: ['math'],
  },
  {
    name: 'English',
    public: false,
    active: true,
    regions: ['HS', 'MS', 'ES'],
    tags: ['literature'],
  },
  {
    name: 'World History',
    public: true,
    active: true,
    regions: ['HS'],
    tags: ['history'],
  },
  {
    name: 'American Literature',
    public: true,
    active: true,
    regions: ['HS'],
    tags: ['literature'],
  },
  {
    name: 'Calculus',
    public: true,
    active: false,
    regions: ['HS'],
    tags: ['math'],
  },
  {
    name: 'Earth Science',
    public: false,
    active: true,
    regions: ['MS', 'ES'],
    tags: ['science'],
  },
  {
    name: 'Creative Writing',
    public: false,
    active: true,
    regions: ['HS', 'MS'],
    tags: ['literature'],
  },
  {
    name: 'Ancient Civilizations',
    public: true,
    active: true,
    regions: ['MS'],
    tags: ['history'],
  },
];

export type FilterKeys = Exclude<keyof IData, 'name'>;

export interface IFilter {
  type: FilterKeys;
  values: string[];
}

export interface IField {
  label: string;
  value: string;
  options: { label: string; value: string | boolean }[];
}

export const filterFields: {
  label: string;
  value: Exclude<keyof IData, 'name'>;
  options: { label: string; value: string | boolean }[];
}[] = [
  {
    label: 'Public',
    value: 'public',
    options: [
      { label: 'true', value: true },
      { label: 'false', value: false },
    ],
  },
  {
    label: 'Active',
    value: 'active',
    options: [
      { label: 'true', value: true },
      { label: 'false', value: false },
    ],
  },
  {
    label: 'School Level',
    value: 'regions',
    options: [
      { label: 'ES', value: 'ES' },
      { label: 'MS', value: 'MS' },
      { label: 'HS', value: 'HS' },
    ],
  },
  {
    label: 'Subject Area',
    value: 'tags',
    options: [
      { label: 'Math', value: 'math' },
      { label: 'Science', value: 'science' },
      { label: 'Literature', value: 'literature' },
      { label: 'History', value: 'history' },
    ],
  },
];

export const getFilteredData = (
  arr: IData[],
  filterType: Exclude<keyof IData, 'name'>,
  val: string | boolean
) => {
  return arr.filter((el) => {
    if (typeof el[filterType] === 'boolean') {
      return el[filterType] === val;
    }
    return (el[filterType] as string[]).includes(val as string);
  });
};
