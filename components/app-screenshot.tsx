import Image from "next/image";

export function AppScreenshot({
  screen,
  alt,
  priority = false,
  className = "",
}: {
  screen: "employees" | "reports" | "sites" | "map" | "mobile-hours";
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`real-screen ${className}`}>
      <Image
        src={screen === "employees" ? "/screenshots/employees-cropped.png" : `/screenshots/${screen}.${screen === "mobile-hours" ? "jpg" : "png"}`}
        alt={alt}
        width={screen === "mobile-hours" ? 591 : 2560}
        height={screen === "mobile-hours" ? 1280 : 1600}
        priority={priority}
        sizes="(max-width: 760px) 110vw, (max-width: 1100px) 90vw, 65vw"
      />
    </div>
  );
}
