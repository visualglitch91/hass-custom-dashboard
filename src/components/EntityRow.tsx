import { ComponentChildren } from "preact";
import { HassEntity } from "home-assistant-js-websocket";
import { useHass, getIcon, makeServiceCall } from "../utils/hass";
import ListCardRow from "./ListCardRow";
import LightEntityDialog from "./LightEntityDialog";
import Switch from "./Switch";
import { renderModal } from "../utils/general";
import Icon from "./Icon";
import ColorBadge from "./ColorBadge";

export default function EntityRow({
  icon: customIcon,
  label,
  entityId,
  renderContent,
}: {
  icon?: string;
  label?: string;
  entityId: string;
  renderContent?: (entity: HassEntity) => ComponentChildren;
}) {
  const hass = useHass();

  const entity = hass.states[entityId];
  const icon = customIcon || entity?.attributes?.icon || getIcon(entity);

  if (!entity) {
    return (
      <ListCardRow icon={icon} label={entityId}>
        unavailable
      </ListCardRow>
    );
  }

  function onLightClick() {
    renderModal((unmount) => (
      <LightEntityDialog title={label} entity={entity} onClose={unmount} />
    ));
  }

  const { state, attributes } = entity;
  const { friendly_name: friendlyName } = attributes;
  const [domain] = entityId.split(".");
  const checked = state === "on";
  const unavailable = state === "unavailable";

  return (
    <ListCardRow
      disabled={unavailable}
      icon={icon}
      label={
        <>
          {label || friendlyName}
          {checked && attributes.rgb_color && (
            <ColorBadge size={12} color={attributes.rgb_color} />
          )}
        </>
      }
      onIconClick={domain === "light" && checked ? onLightClick : undefined}
    >
      {renderContent ? (
        renderContent(entity)
      ) : ["light", "switch", "input_boolean"].includes(domain) ? (
        unavailable ? (
          <Icon icon="cancel" />
        ) : (
          <Switch
            checked={checked}
            onInput={makeServiceCall(
              "homeassistant",
              checked ? "turn_off" : "turn_on",
              { entity_id: entityId }
            )}
          />
        )
      ) : (
        entity.state
      )}
    </ListCardRow>
  );
}
