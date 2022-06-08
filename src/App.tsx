import { useHass } from "./utils/hass";
import { compact } from "./utils/general";
import DesktopLayout from "./components/DesktopLayout";
import MobileLayout from "./components/MobileLayout";
import tvModule from "./modules/tv";
import houseModule from "./modules/house";
import vacuumModule from "./modules/vacuum";
import camerasModule from "./modules/cameras";

export default function App() {
  const { user } = useHass();
  const isAdmin = user.is_admin;
  const isMobile = window.innerWidth < 935;

  if (isMobile) {
    return (
      <MobileLayout
        tabs={compact([
          {
            title: "TV",
            icon: "mdi:television-classic",
            content: tvModule,
          },
          {
            title: "Casa",
            icon: "mdi:home",
            content: houseModule,
          },
          isAdmin && {
            title: "Aspirador",
            icon: "mdi:robot-vacuum",
            content: vacuumModule,
          },
          isAdmin && {
            title: "Câmeras",
            icon: "mdi:cctv",
            content: camerasModule,
          },
        ])}
      />
    );
  }

  return (
    <DesktopLayout>
      {tvModule}
      {houseModule}
      {isAdmin && vacuumModule}
      {isAdmin && camerasModule}
    </DesktopLayout>
  );
}