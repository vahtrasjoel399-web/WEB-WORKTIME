import Image from "next/image";

const labels = {
  employees: "Tööaeg employee overview",
  reports: "Tööaeg reporting dashboard",
  sites: "Tööaeg worksite management",
  map: "Tööaeg live work map",
  "mobile-hours": "Tööaeg mobile employee hours view",
};

export function AppScreenshot({
  screen,
  priority = false,
  className = "",
}: {
  screen: keyof typeof labels;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`real-screen ${className}`}>
      <Image
        src={screen === "employees" ? "/screenshots/employees-cropped.png" : `/screenshots/${screen}.${screen === "mobile-hours" ? "jpg" : "png"}`}
        alt={labels[screen]}
        width={screen === "mobile-hours" ? 591 : 2816}
        height={screen === "mobile-hours" ? 1280 : 1427}
        priority={priority}
        sizes="(max-width: 760px) 110vw, (max-width: 1100px) 90vw, 65vw"
      />
    </div>
  );
}
