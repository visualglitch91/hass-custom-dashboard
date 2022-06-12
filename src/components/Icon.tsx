import { clsx } from "../utils/general";

export default function Icon({
  class: className,
  icon,
  size = 24,
}: {
  class?: string;
  icon: string;
  size?: number;
}) {
  const style = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: size,
    minWidth: size,
    minWeight: size,
    maxWidth: size,
    maxWeight: size,
  };

  if (icon.startsWith("icofont-")) {
    return <i style={style} class={clsx("icofont", icon, className)} />;
  }

  const name =
    icon.startsWith("mdi:") || icon.startsWith("mdi-") ? icon.slice(4) : icon;

  return <i style={style} class={clsx("mdi", `mdi-${name}`, className)} />;
}
