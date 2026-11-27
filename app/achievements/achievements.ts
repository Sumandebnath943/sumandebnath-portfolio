interface ImageAsset {
  src: string;
  width: number;
  height: number;
}

interface Milestone {
  id: string;
  label: string;
  credentialName?: string;
  description: string;
  date: string;
  dateLabel: string;
  image: ImageAsset;
  proof?: ImageAsset & { alt: string };
  credentialUrl: string;
  featured?: boolean;
}

export interface Achievement {
  id: string;
  category: string;
  title: string;
  edition?: string;
  issuer: string;
  year: number;
  presentation?: { project: string; href: string; event: string };
  profile?: { href: string; label: string };
  milestones?: Milestone[];
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
    category: "AI-Native Developer Achievement",
    title: "Google Startup Buildathon",
    edition: "India 2026",
    issuer: "Google DeepMind × Google Cloud",
    year: 2026,
    presentation: {
      project: "IMPRINT",
      href: "https://imprint.houseofnamus.com",
      event: "the City Buildathon",
    },
    profile: googleProfile,
    milestones: [
      {
        id: "applicant",
        label: "Applicant",
        description: "Applied to build an AI startup prototype.",
        date: "2026-11-19",
        dateLabel: "19 Nov 2026",
        image: { src: "/achievements/buildathon-applicant.png", width: 83, height: 83 },
        proof: {
          src: "/achievements/buildathon-applicant-proof.png",
          width: 508,
          height: 570,
          alt: "Google’s Applicant credential, earned 19 November 2026.",
        },
        credentialUrl: `${buildathonCredentials}/applicant?u=sumandebnath`,
      },
      {
        id: "participant",
        label: "Participant",
        description: "Built an AI prototype at the two-day, in-person Buildathon.",
        date: "2026-11-19",
        dateLabel: "19 Nov 2026",
        image: { src: "/achievements/buildathon-participant.png", width: 83, height: 83 },
        proof: {
          src: "/achievements/buildathon-participant-proof.png",
          width: 505,
          height: 569,
          alt: "Google’s Participant credential, earned 19 November 2026.",
        },
        credentialUrl: `${buildathonCredentials}/participant?u=sumandebnath`,
      },
      {
        id: "builder",
        label: "Builder",
        credentialName: "Prototype Shipper",
        description: "Shipped and demoed a working AI MVP.",
        date: "2026-11-27",
        dateLabel: "27 Nov 2026",
        image: { src: "/achievements/buildathon-builder.png", width: 83, height: 83 },
        proof: {
          src: "/achievements/buildathon-builder-proof.png",
          width: 509,
          height: 610,
          alt: "Google’s Prototype Shipper credential, earned 27 November 2026.",
        },
        credentialUrl: `${buildathonCredentials}/builder?u=sumandebnath`,
        featured: true,
      },
    ],
  },
];
