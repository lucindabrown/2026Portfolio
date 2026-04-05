import { sanityClient } from "@/lib/sanity";
import { urlFor } from "@/sanity/lib/image";
import PatientJourneysModule from "@/app/components/PatientJourneysModule";
import HeroModule from "@/app/components/HeroModule";
import LogoModule from "@/app/components/LogoModule";
import CenteredModule from "@/app/components/CenteredModule";
import ContactModule from "@/app/components/ContactModule";

interface HeroModuleData {
  _type: "heroModule";
  headline: string;
  accentText?: string;
  accentColor?: string;
  body?: unknown[];
  ctaText?: string;
  ctaLink?: string;
  stillImage?: { asset: { _ref: string } };
  lottieFile?: { asset: { url: string } };
  backgroundColor?: string;
}

interface PatientJourneysModuleData {
  _type: "patientJourneysModule";
  headline: string;
  body: unknown[];
  ctaText?: string;
  ctaLink?: string;
  image?: { asset: { _ref: string } };
  backgroundColor?: string;
  imagePosition?: "left" | "right";
}

interface LogoModuleData {
  _type: "logoModule";
  headline: string;
  backgroundColor?: string;
  logos: { _id: string; name: string; logoUrl: string; url?: string }[];
}

interface CenteredModuleData {
  _type: "centeredModule";
  headline: string;
  body?: unknown[];
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: { asset: { _ref: string } };
  backgroundColor?: string;
}

interface ContactModuleData {
  _type: "contactModule";
  headline: string;
  body?: string;
  photo?: { asset: { _ref: string } };
  backgroundColor?: string;
}

type Module = HeroModuleData | PatientJourneysModuleData | LogoModuleData | CenteredModuleData | ContactModuleData;

interface LandingPage {
  modules: Module[];
}

const query = `*[_type == "landingPage"][0]{
  modules[]{
    _type,
    headline,
    // heroModule fields
    accentText,
    accentColor,
    ctaText,
    ctaLink,
    stillImage,
    lottieFile { asset -> { url } },
    // patientJourneysModule fields
    body,
    ctaText,
    ctaLink,
    image,
    backgroundColor,
    imagePosition,
    // logoModule fields
    logos[]-> { _id, name, "logoUrl": logo.asset->url, url },
    // centeredModule fields
    backgroundImage,
    // contactModule fields
    photo
  }
}`;

export default async function Home() {
  const page = await sanityClient.fetch<LandingPage>(query);
  const modules = page?.modules;

  if (!modules?.length) return null;

  return (
    <main>
      {modules.map((module, i) => {
        if (module._type === "heroModule") {
          const heroImageUrl = module.stillImage ? urlFor(module.stillImage).width(2000).url() : undefined;
          return (
            <HeroModule
              key={i}
              headline={module.headline}
              accentText={module.accentText}
              accentColor={module.accentColor}
              body={module.body}
              ctaText={module.ctaText}
              ctaLink={module.ctaLink}
              imageUrl={heroImageUrl}
              lottieUrl={module.lottieFile?.asset?.url}
              backgroundColor={module.backgroundColor}
            />
          );
        }

        if (module._type === "patientJourneysModule") {
          const imageUrl = module.image ? urlFor(module.image).width(1000).url() : undefined;
          return (
            <PatientJourneysModule
              key={i}
              headline={module.headline}
              body={module.body}
              ctaText={module.ctaText}
              ctaLink={module.ctaLink}
              imageUrl={imageUrl}
              backgroundColor={module.backgroundColor}
              imagePosition={module.imagePosition}
            />
          );
        }

        if (module._type === "logoModule") {
          return (
            <LogoModule
              key={i}
              headline={module.headline}
              logos={module.logos}
              backgroundColor={module.backgroundColor}
            />
          );
        }

        if (module._type === "centeredModule") {
          const backgroundImageUrl = module.backgroundImage ? urlFor(module.backgroundImage).url() : undefined;
          return (
            <CenteredModule
              key={i}
              headline={module.headline}
              body={module.body}
              ctaText={module.ctaText}
              ctaLink={module.ctaLink}
              backgroundImageUrl={backgroundImageUrl}
              backgroundColor={module.backgroundColor}
            />
          );
        }

        if (module._type === "contactModule") {
          const photoUrl = module.photo ? urlFor(module.photo).width(600).height(600).url() : undefined;
          return (
            <ContactModule
              key={i}
              headline={module.headline}
              body={module.body}
              photoUrl={photoUrl}
              backgroundColor={module.backgroundColor}
            />
          );
        }

        return null;
      })}
    </main>
  );
}
