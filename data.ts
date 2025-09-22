// Types
export interface Event {
  id: number;
  title: string;
  date: string;
  displayDate: string;
  category: 'meetings' | 'tournaments' | 'national' | 'international' | 'special';
  timeline: 'past' | 'current' | 'upcoming';
  responsible: string;
  location: string;
  description: string;
  imageUrl: string;
  leagues?: string[];
  statusIcon?: string;
  badge?: string;
}

export interface WorkplanItem {
  id: number;
  date: string;
  title: string;
  responsible: string;
  details?: { title: string }[];
  icon: string;
}

export interface LeadershipMember {
  name: string;
  title: string;
  school: string;
  region: string;
  email: string;
  phone: string;
  photoUrl: string;
  zone?: string;
}

export interface PhotoCollection {
    title: string;
    description: string;
    count: string;
    date: string;
    icon: string;
    link: string;
}

// Data
export const EVENTS_DATA: Event[] = [
    { id: 1, title: "EXCOM Annual Planning Meeting", date: "2025-01-15", displayDate: "January 15, 2025", category: "meetings", timeline: "past", responsible: "EXCOM", location: "USRA Headquarters, Kampala", description: "Annual executive committee meeting to plan the year's activities and set strategic direction.", imageUrl: '/photos/event1.jpg', statusIcon: 'fa-check-circle' },
    { id: 2, title: "Ball Game One Qualifiers", date: "2025-04-06", displayDate: "Feb 23 - Apr 6, 2025", category: "tournaments", timeline: "past", responsible: "Regional Committees", location: "All Regions - Multiple Venues", description: "Regional qualifying tournaments across Central, Eastern, Western, and Northern regions.", imageUrl: '/photos/event2.jpg', leagues: ["Central Main League", "Regional Girls' Leagues", "+7 more leagues"], statusIcon: 'fa-check-circle' },
    { id: 3, title: "Regional Qualifiers Evaluation", date: "2025-04-13", displayDate: "April 6-13, 2025", category: "meetings", timeline: "past", responsible: "Regional Reps", location: "Regional Centers", description: "Post-qualifier evaluation meetings to assess performance and prepare for national games.", imageUrl: '/photos/event3.jpg', statusIcon: 'fa-check-circle' },
    { id: 4, title: "Ball Game One Evaluation & Planning", date: "2025-04-19", displayDate: "April 19, 2025", category: "meetings", timeline: "past", responsible: "EXCOM", location: "USRA Headquarters, Kampala", description: "Comprehensive evaluation of qualifiers and strategic planning for national ball game one.", imageUrl: '/photos/event4.jpg', statusIcon: 'fa-check-circle' },
    { id: 5, title: "USSSA National Ball Game One", date: "2025-05-14", displayDate: "May 4-14, 2025", category: "national", timeline: "past", responsible: "Qualified Schools", location: "Kampala Rugby Club", description: "The premier national schools rugby championship featuring qualified teams from across Uganda.", imageUrl: '/photos/event5.jpg', statusIcon: 'fa-check-circle' },
    { id: 6, title: "Ball Game Two Qualifiers (7s)", date: "2025-06-29", displayDate: "June 8-29, 2025", category: "tournaments", timeline: "past", responsible: "Regional Committees", location: "Regional Venues", description: "Fast-paced 7s rugby qualifiers including Kabaka Coronation, Kyabazinga, and regional championships.", imageUrl: '/photos/event6.jpg', leagues: ["Kabaka Coronation 7s", "Kyabazinga 7s", "+3 more tournaments"], statusIcon: 'fa-check-circle' },
    { id: 7, title: "Ball Game Two Evaluation", date: "2025-07-05", displayDate: "July 5, 2025", category: "meetings", timeline: "past", responsible: "EXCOM", location: "USRA Headquarters, Kampala", description: "Evaluation of 7s tournaments and strategic planning for Ball Game Two and AGM preparations.", imageUrl: '/photos/event7.jpg', statusIcon: 'fa-check-circle' },
    { id: 8, title: "USSSA National Ball Game Two", date: "2025-07-18", displayDate: "July 9-18, 2025", category: "national", timeline: "past", responsible: "Qualified Schools", location: "Kampala Rugby Club", description: "Second national schools rugby championship featuring qualified teams from 7s tournaments.", imageUrl: '/photos/event8.jpg', statusIcon: 'fa-check-circle' },
    { id: 9, title: "FEASSA Games", date: "2025-08-27", displayDate: "August 19-27, 2025", category: "international", timeline: "past", responsible: "Qualified Schools", location: "Nairobi, Kenya", description: "Federation of East African Secondary Schools Sports Association games.", imageUrl: '/photos/event9.jpg', statusIcon: 'fa-check-circle' },
    { id: 10, title: "Annual General Meeting", date: "2025-09-06", displayDate: "September 6, 2025", category: "meetings", timeline: "current", responsible: "EXCOM", location: "USRA Headquarters, Kampala", description: "Annual general meeting to review the year's achievements and plan for the future.", imageUrl: '/photos/group.jpg', statusIcon: 'fa-clock', badge: 'Happening Today' },
    { id: 11, title: "Independence Cup", date: "2025-10-09", displayDate: "October 9, 2025", category: "special", timeline: "upcoming", responsible: "All Regions", location: "Kampala - Venue TBA", description: "Special tournament celebrating Uganda's independence with participation from all regions.", imageUrl: '/photos/event11.jpg', badge: 'Next Event' },
    { id: 12, title: "Abu Dhabi World Schools Festival", date: "2025-12-14", displayDate: "Dec 14-20, 2025", category: "international", timeline: "upcoming", responsible: "National Select Team", location: "Abu Dhabi, UAE", description: "Elite international schools rugby festival featuring Uganda's U20 select team.", imageUrl: '/photos/event12.jpg', badge: 'International' },
];

export const WORKPLAN_DATA: WorkplanItem[] = [
    { id: 1, date: 'January 15, 2025', title: 'EXCOM Annual Planning Meeting', responsible: 'EXCOM', icon: 'fa-users' },
    { id: 2, date: 'Feb 23 - Apr 6, 2025', title: 'Ball Game One Qualifiers', responsible: 'Regional Coordination Committees & RDOs', icon: 'fa-map-marker-alt', details: [
        { title: 'Central Schools Main League: Feb 23 - Mar 30' },
        { title: 'Central Schools Second Division League: Mar 2 - Mar 30' },
        { title: 'Central Schools Girls\' League: Mar 2 - Mar 30' },
        { title: 'Eastern Region Schools League: Mar 2 - Apr 6' },
        { title: 'Western Region Schools\' League: Mar 2 - Apr 6' },
        { title: 'Northern Region Schools\' League: Mar 2 - Apr 6' },
    ]},
    { id: 3, date: 'April 6 - 13, 2025', title: 'Regional Ball Game One Qualifiers Evaluation Meetings', responsible: 'Regional Representatives', icon: 'fa-users' },
    { id: 4, date: 'April 19, 2025', title: 'Ball Games One Evaluation and Planning Meeting', responsible: 'EXCOM', icon: 'fa-users' },
    { id: 5, date: 'May 4 - 14, 2025', title: 'USSSA National Ball Game One', responsible: 'Qualified Schools', icon: 'fa-trophy' },
    { id: 6, date: 'June 8 - 29, 2025', title: 'Ball Game Two Qualifiers', responsible: 'Regional Coordination Committees & RDOs', icon: 'fa-map-marker-alt', details: [
        { title: 'Central Schools Kabaka Coronation 7s' },
        { title: 'Western Schools 7s' },
        { title: 'Eastern Schools Kyabazinga 7s' },
        { title: 'Lango Schools Won Nyaci 7s' },
        { title: 'Acholi Schools Rwot Adwong 7s' },
    ]},
    { id: 7, date: 'July 5, 2025', title: 'Ball Game Two Qualifiers Evaluation and AGM Planning', responsible: 'EXCOM', icon: 'fa-users' },
    { id: 8, date: 'July 9 - 18, 2025', title: 'USSSA National Ball Game Two', responsible: 'Qualified Schools', icon: 'fa-trophy' },
    { id: 9, date: 'August 19 - 27, 2025', title: 'FEASSA Games', responsible: 'Qualified Schools', icon: 'fa-globe-africa' },
    { id: 10, date: 'September 6, 2025', title: 'Annual General Meeting', responsible: 'EXCOM', icon: 'fa-users' },
    { id: 11, date: 'October 9, 2025', title: 'Independence Cup', responsible: 'All Regional Representatives', icon: 'fa-flag' },
    { id: 12, date: 'December 14 - 20, 2025', title: 'Abu Dhabi World Schools Festival', responsible: 'National Schools U20 Select, URU, EXCOM', icon: 'fa-globe' },
];

export const LEADERSHIP_DATA: Record<string, LeadershipMember[]> = {
  excom: [
    { name: 'Okello Dickson', title: 'Chairman', school: 'Makerere College School', region: 'Central Region', email: 'okellodsn@gmail.com', phone: '+256 783 562 222', photoUrl: '/photos/dixon.jpg' },
    { name: 'Molo Robson', title: 'Vice Chairman', school: 'Inomo S.S', region: 'Northern Region', email: 'robsonmolo@gmail.com', phone: '+256 773 346 360', photoUrl: '/photos/molo.jpg' },
    { name: 'Seguya Wilfred Bakaluba', title: 'General Secretary', school: 'Hana International', region: 'Central Region', email: 'wilfredsseguya@gmail.com', phone: '+256 788 378 660', photoUrl: '/photos/seguya.jpg' },
    { name: 'Sewaya Ismail', title: 'Treasurer', school: 'Kira College Butiki', region: 'Eastern Region', email: 'sewayamiti77@gmail.com', phone: '+256 774 416 871', photoUrl: '/photos/group.jpg' },
    { name: 'Faridah Kayegi', title: 'Woman Representative', school: 'Oxford High School Mbale', region: 'Eastern Region', email: 'kayeridah1@gmail.com', phone: '+256 786 082 927', photoUrl: '/photos/faridah.jpg' },
    { name: 'Wati Richard', title: 'Central Schools Rep.', school: 'London College of St. Lawrence-Maya', region: 'Central Region', email: 'watirichard3@gmail.com', phone: '+256 766 026 974', photoUrl: '/photos/wati.jpg' },
    { name: 'Kigenyi Patrick Paul', title: 'Western Schools Rep.', school: 'Mbarara High School', region: 'Western Region', email: 'mukyapat@gmail.com', phone: '+256 775 728 516', photoUrl: '/photos/kigenyi.jpg' },
    { name: 'Ochakachon Robert', title: 'Northern Schools Rep.', school: 'Sir Samuel Baker School-Gulu', region: 'Northern Region', email: 'ochakachonrobert@gmail.com', phone: '+256 779 758 887', photoUrl: '/photos/group.jpg' },
    { name: 'Barasa Moses', title: 'Eastern Schools Rep.', school: 'Busoga College Mwiri', region: 'Eastern Region', email: 'barasamoses295@gmail.com', phone: '+256 772 614 568', photoUrl: '/photos/barasa.jpg' },
  ],
  finance: [
    { name: 'Sewaya Ismail', title: 'Chairperson', school: 'Kira College Butiki', region: 'Eastern Region', email: 'sewayamiti77@gmail.com', phone: '+256774416871', photoUrl: '/photos/group.jpg' },
    { name: 'Seguya Wilfred Bakaluba', title: 'Secretary', school: 'Hana International', region: 'Central Region', email: 'wilfredsseguya@gmail.com', phone: '+256788378660', photoUrl: '/photos/seguya.jpg' },
    { name: 'Okello Dickson', title: 'Member', school: 'Makerere College School', region: 'Central Region', email: 'okellodsn@gmail.com', phone: '+256783562222', photoUrl: '/photos/dixon.jpg' },
  ],
  technical: [
      { name: 'Matsiko Vian', title: 'Chairperson', school: 'TBA', region: 'TBA', email: '', phone: '', photoUrl: '/photos/default-avatar.png' },
      { name: 'Molo Robson', title: 'Secretary', school: 'Inomo S.S', region: 'Northern Region', email: 'robsonmolo@gmail.com', phone: '+256773346360', photoUrl: '/photos/molo.jpg' },
      { name: 'Barasa Moses', title: 'Member', school: 'Busoga College Mwiri', region: 'Eastern Region', email: 'barasamoses295@gmail.com', phone: '+256772614568', photoUrl: '/photos/barasa.jpg' },
  ],
  disciplinary: [
      { name: 'Faridah Kayegi', title: 'Secretary', school: 'Oxford High School Mbale', region: 'Eastern Region', email: 'kayeridah1@gmail.com', phone: '+256786082927', photoUrl: '/photos/faridah.jpg' },
      { name: 'To Be Appointed', title: 'Additional Members', school: 'Various Schools', region: 'All Regions', email: '', phone: '', photoUrl: '/photos/default-avatar.png' },
  ],
  regional: [
    { name: 'Wati Richard', title: 'Chairperson', school: 'London College of St. Lawrence Maya', region: 'Central Region', email: 'watirichard3@gmail.com', phone: '+256766026974', photoUrl: '/photos/wati.jpg', zone: 'Central' },
    { name: 'Adong Zelindae Harriet', title: 'Rep', school: 'Boston High School Mpala', region: 'Central Region', email: 'zelindaharriets@gmail.com', phone: '+256770726467', photoUrl: '/photos/default-avatar.png', zone: 'Central' },
    { name: 'Kigenyi Patrick Paul', title: 'Rep', school: 'Mbarara High School', region: 'Western Region', email: 'mukyapat@gmail.com', phone: '+256775728516', photoUrl: '/photos/kigenyi.jpg', zone: 'Western' },
    { name: 'Hannington Rugumayo', title: 'Rep', school: 'Nyakasura School', region: 'Western Region', email: 'hanningtonjames31@gmail.com', phone: '+256785291931', photoUrl: '/photos/default-avatar.png', zone: 'Western' },
    { name: 'Ochakachon Robert', title: 'Rep', school: 'Sir Samuel Baker School', region: 'Northern Region', email: 'ochakachonrobert@gmail.com', phone: '+256779758887', photoUrl: '/photos/group.jpg', zone: 'Northern' },
    { name: 'Olanya Thomas', title: 'Rep', school: 'Kitgum Comprehensive College', region: 'Northern Region', email: 'olanyathomas5@gmail.com', phone: '+256762180188', photoUrl: '/photos/default-avatar.png', zone: 'Northern' },
    { name: 'Barasa Moses', title: 'Rep', school: 'Busoga College Mwiri', region: 'Eastern Region', email: 'barasamoses295@gmail.com', phone: '+256772614568', photoUrl: '/photos/barasa.jpg', zone: 'Eastern' },
    { name: 'Ochola Samuel', title: 'Rep', school: 'Great Aubrey Memorial', region: 'Eastern Region', email: 'N/A', phone: '+256706066806', photoUrl: '/photos/default-avatar.png', zone: 'Eastern' },
  ],
  girls: [
      { name: 'Ms. Kayegi Faridah', title: 'Chairperson', school: 'Oxford High School Mbale', region: 'Eastern Region', email: 'kayeridah1@gmail.com', phone: '+256786082927', photoUrl: '/photos/faridah.jpg' },
      { name: 'Mr. Molo Robson', title: 'Secretary', school: 'Inomo S.S', region: 'Northern Region', email: 'robsonmolo@gmail.com', phone: '+256773346360', photoUrl: '/photos/molo.jpg' },
      { name: 'Mr. Kafeero Yusuf', title: 'Western Region Member', school: 'Kijjabwemi S.S', region: 'Western Region', email: 'yusufukafeero3@gmail.com', phone: '+256755369747', photoUrl: '/photos/default-avatar.png' },
  ]
};

export const PHOTO_COLLECTIONS: PhotoCollection[] = [
    { title: "2025 School's League Finals", description: "Inter-school championship matches, finals, and trophy ceremonies. Witness the intensity and passion of school rugby competition.", count: "150+ Photos", date: "December 2024", icon: "fa-trophy", link: "https://drive.google.com/drive/folders/14dXQZ-8ItZ1XY8RAvFWnEhmKZTZvdb9V" },
    { title: "2nd Leg Semi Finals 2025", description: "Behind-the-scenes training sessions, skill development, and team preparation. See how our athletes develop their rugby skills.", count: "80+ Photos", date: "November 2024", icon: "fa-running", link: "https://drive.google.com/drive/folders/1-mJKC3wcCCNFucFP1Xu7WV8urjIkgLvd" },
    { title: "Division II Finals 2025", description: "Prize giving ceremonies, recognition events, and celebration of achievements. Honoring excellence in school rugby.", count: "60+ Photos", date: "December 2024", icon: "fa-medal", link: "https://drive.google.com/drive/folders/1-ncPUCNxE-ZPBz8Z9ZzzCNuToQxJfQMJ" },
    { title: "Northern Schools Finals 2025", description: "Social events, team building activities, and community outreach programs. Building bonds beyond the rugby field.", count: "120+ Photos", date: "October 2024", icon: "fa-users", link: "https://drive.google.com/drive/folders/1h5A2eBEkq7HibZuAs8y1FhcC8NFFDvzh" },
];