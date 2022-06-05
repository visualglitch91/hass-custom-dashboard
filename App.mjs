import { h } from "./utils.mjs";
import EntitiesCard from "./components/EntitiesCard.mjs";
import Stack from "./components/Stack.mjs";
import RunScriptButton from "./components/RunScriptButton.mjs";
import Switch from "./components/Switch.mjs";
import ColumnarLayout from "./components/ColumnarLayout.mjs";

const groups = {
  living_room: {
    title: "Sala",
    rows: [
      { label: "Luz da Mesa", entityId: "switch.sala_luz_mesa" },
      { label: "Luz da Sala", entityId: "switch.sala_luz" },
      { label: "Luminária", entityId: "switch.sala_luminaria" },
      { label: "Luz Ambiente", entityId: "light.sala_luz_ambiente" },
    ],
  },
  office: {
    title: "Escritório",
    rows: [
      { label: "Luz", entityId: "switch.escritorio_luz" },
      { label: "Ventilador", entityId: "switch.escritorio_ventilador" },
      { label: "Luz Ambiente", entityId: "light.escritorio_rgb" },
    ],
  },
  kitchen: {
    title: "Cozinha e Lavanderia",
    rows: [
      { label: "Luz da Cozinha", entityId: "switch.cozinha_luz" },
      { label: "Luz da Lavanderia", entityId: "switch.lavanderia_luz" },
      {
        label: "Bateria do Sensor de Vazamento",
        entityId: "sensor.water_leak_sensor_battery",
        renderContent: (entity) => `${Math.floor(Number(entity.state))}%`,
      },
    ],
  },
  bedroom: {
    title: "Quarto",
    rows: [
      { label: "Aquecedor", entityId: "switch.quarto_aquecedor" },
      { label: "Umidificador", entityId: "switch.quarto_umidificador" },
      { label: "Ventilador", entityId: "switch.quarto_ventilador" },
      { label: "Luz", entityId: "switch.quarto_luz" },
      { label: "Abajur Esquerdo", entityId: "switch.quarto_abajur_esquerdo" },
      { label: "Abajur Direito", entityId: "switch.quarto_abajur_direito" },
      { label: "Banheiro", entityId: "switch.banheiro_luz" },
      { label: "Sacada", entityId: "switch.sacada_luz" },
    ],
  },
  shortcuts: {
    title: "Atalhos",
    rows: [
      {
        label: "Impressora 3D",
        entityId: "switch.impressora_3d",
        renderContent: (entity) =>
          entity.state === "on"
            ? "Ligada"
            : h`<${Switch}
                  checked=${false}
                  onInput=${() => {
                    hass.callService("homeassistant", "turn_on", {
                      entity_id: "switch.impressora_3d",
                    });
                  }} />`,
      },
      {
        entityId: "script.casa_apagar_todas_luzes",
        label: "Apagar todas as luzes",
        renderContent: (entity) =>
          h`<${RunScriptButton} entityId=${entity.entity_id} />`,
      },
      {
        entityId: "script.casa_apagar_todas_luzes_menos_sala",
        label: "Apagar todas as luzes, menos da sala",
        renderContent: (entity) =>
          h`<${RunScriptButton} entityId=${entity.entity_id} />`,
      },
      {
        entityId: "script.quarto_iluminacao_abajures",
        label: "Iluminação abajures",
        renderContent: (entity) =>
          h`<${RunScriptButton} entityId=${entity.entity_id} />`,
      },
    ],
  },
};

export default function App() {
  return h`
      <${ColumnarLayout} columnCount=${5}>
          <${Stack} type="vertical" class="grid-item">
            <${EntitiesCard} ...${groups.living_room} />
            <${EntitiesCard} ...${groups.office} />
            <${EntitiesCard} ...${groups.kitchen} />
            </${Stack}>
          <${Stack} type="vertical" class="grid-item">
            <${EntitiesCard} ...${groups.bedroom} />
            <${EntitiesCard} ...${groups.shortcuts} />
          </${Stack}>
      </${ColumnarLayout}>
  `;
}
