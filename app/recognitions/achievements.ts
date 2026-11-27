interface Milestone {
  id: string;
  label: string;
  credentialName?: string;
  description: string;
  date: string;
  dateLabel: string;
  image: { src: string; width: number; height: number };
  credentialUrl?: string;
  featured?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  edition: string;
  issuer: string;
  year: number;
  profile: { href: string; label: string };
  milestones: Milestone[];
}

const googleProfile = {
  href: "https://g.dev/sumandebnath",
  label: "View Google Developer Profile",
};

const buildathonCredentials =
  "https://me.developers.google.com/badges/community/other-programs/startup-buildathon/india/2026";

export const achievements: Achievement[] = [
  {
    id: "google-startup-buildathon-2026",
    title: "Google Startup Buildathon",
    edition: "India 2026",
    issuer: "Google DeepMind × Google Cloud",
    year: 2026,
    profile: googleProfile,
    milestones: [
      {
        id: "applicant",
        label: "Applicant",
        description: "Applied to build an AI startup prototype.",
        date: "2026-11-19",
        dateLabel: "19 Nov 2026",
        image: { src: "/recognitions/buildathon-applicant.png", width: 83, height: 83 },
        credentialUrl: `${buildathonCredentials}/applicant?u=sumandebnath`,
      },
      {
        id: "participant",
        label: "Participant",
        description: "Built an AI prototype at the two-day, in-person Buildathon.",
        date: "2026-11-19",
        dateLabel: "19 Nov 2026",
        image: { src: "/recognitions/buildathon-participant.png", width: 83, height: 83 },
        credentialUrl: `${buildathonCredentials}/participant?u=sumandebnath`,
      },
      {
        id: "builder",
        label: "Builder",
        credentialName: "Prototype Shipper",
        description: "Shipped and demoed a working AI MVP at the City Buildathon.",
        date: "2026-11-27",
        dateLabel: "27 Nov 2026",
        image: { src: "/recognitions/buildathon-builder.png", width: 83, height: 83 },
        credentialUrl: `${buildathonCredentials}/builder?u=sumandebnath`,
        featured: true,
      },
    ],
  },
];
