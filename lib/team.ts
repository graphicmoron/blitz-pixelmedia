export interface Skill {
  name: string;
  icon: string;
}

export interface TeamMember {
  id: string;
  name: string;
  username: string;
  role: string;
  image: string;
  /** Short line under the name on the detail page. */
  tagline: string;
  skills: Skill[];
  /** Photos orbiting the portrait on the detail page. Falls back to
   *  DEFAULT_GALLERY — swap in real project stills per person. */
  gallery?: string[];
}

/** Placeholder stock photography for the orbiting arc. */
export const DEFAULT_GALLERY: string[] = [
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429',
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9',
  'https://images.unsplash.com/photo-1494548162494-384bba4ab999',
  'https://images.unsplash.com/photo-1483347756197-71ef80e95f73',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23',
  'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
  'https://images.unsplash.com/photo-1439066615861-d1af74d74000',
  'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d',
  'https://images.unsplash.com/photo-1444927714506-8492d94b4e3d',
];

export const TEAM: TeamMember[] = [
  {
    id: '01',
    name: 'Manvaditya Singh',
    username: 'manavaditya',
    role: 'Motion Designer',
    image: '/team/manavadityasingh.jpeg',
    tagline: 'Motion, rhythm and timing',
    skills: [
      { name: 'Adobe After Effects', icon: '/logos/adobe-after-effects-icon.png' },
      { name: 'Adobe Premiere Pro', icon: '/logos/adobe-premiere-pro-icon.png' },
    ],
  },
  {
    id: '02',
    name: 'Gaurav Agarwal',
    username: 'gaurav',
    role: 'Lead Photographer',
    image: '/team/gauravagrawal.jpeg',
    tagline: 'Light, frame and colour',
    skills: [
      { name: 'DaVinci Resolve', icon: '/logos/DaVinci_Resolve_Studio.png' },
      { name: 'Adobe Photoshop', icon: '/logos/adobe-photoshop-icon.png' },
      { name: 'Adobe Premiere Pro', icon: '/logos/adobe-premiere-pro-icon.png' },
      { name: 'Adobe After Effects', icon: '/logos/adobe-after-effects-icon.png' },
    ],
  },
  {
    id: '03',
    name: 'Ritul Tripathi',
    username: 'ritul',
    role: 'Creative Technologist',
    image: '/team/ritultripathi.jpeg',
    tagline: 'Ideas built into pixels',
    skills: [
      { name: 'Adobe After Effects', icon: '/logos/adobe-after-effects-icon.png' },
      { name: 'Adobe Illustrator', icon: '/logos/adobe-illustrator-icon.png' },
      { name: 'Adobe Photoshop', icon: '/logos/adobe-photoshop-icon.png' },
      { name: 'Adobe Lightroom', icon: '/logos/adobe-lightroom-icon.png' },
    ],
  },
  {
    id: '04',
    name: 'Arihan Jain',
    username: 'arihant',
    role: 'Creative Technologist',
    image: '/team/arihantjain.jpg',
    tagline: 'Ideas built into pixels',
    skills: [
      { name: 'Adobe After Effects', icon: '/logos/adobe-after-effects-icon.png' },
      { name: 'Adobe Premiere Pro', icon: '/logos/adobe-premiere-pro-icon.png' },
    ],
  },
  {
    id: '05',
    name: 'Herain Deegwal',
    username: 'herain',
    role: 'Creative Technologist',
    image: '/team/Herain.jpg',
    tagline: 'Ideas built into pixels',
    skills: [
      { name: 'Adobe Illustrator', icon: '/logos/adobe-illustrator-icon.png' },
      { name: 'Adobe Photoshop', icon: '/logos/adobe-photoshop-icon.png' },
    ],
  },
];

export function getMemberByUsername(username: string) {
  return TEAM.find((member) => member.username === username);
}
