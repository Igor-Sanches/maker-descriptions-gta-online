const qtdSelect = document.getElementById("qtd");
const cards = document.getElementById("cards");
const tpl = document.getElementById("card-tpl");
const gerarBtn = document.getElementById("gerar");
const output = document.getElementById("output");

const T = {
  pt: {
    character: "Personagem",
    genre: "Gênero", male: "Masculino", female: "Feminino",
    bank: "Banco", pocket: "Bolso",
    unidade: { milhoes: "Milhões", mil: "Mil", reais: "Reais" },
    level: "Level", km: "V/M",
    ability: "Habilidade", allMax: "Todas no máximo",
    jog: "Corridinha", modded: "Mod",
    outfits: "Trajes",
    trajes: { sem_mods: "Sem mods", uns_com_mod: "Uns com mod", todos_mods: "Mods" },
    secVehicles: "___ Veículos e aeronaves",
    vehicles: "Veículos", includesMod: "(Inclui mods)",
    pegasus: "Veículos Pegasus", special: "Veículos especiais", aircraft: "Aeronaves", sparrow: "Sparrow",
    secProps: "___ Propriedades móveis",
    yacht: "Super Iate Galaxy", kosatka: "Kosatka (Submarino)",
    com: "Centro de operações Móveis (C.O.M)", avenger: "Avenger", terrorbyte: "Terrorbyte", acidLab: "Laboratório Tóxico",
    secMore: "___ Mais",
    agency: "1 Agência", office: "1 Escritório", arena: "Arena", vehWarehouse: "1 Galpão de veículos",
    apartments: "Apartamentos", warehouse: "Depósitos", mansion: "Mansão",
    eclipse: "1 Garagem Eclipse Boulevard", vinewood: "1 Garagem Club Vinewood", garage3: "1 Garagem escritório 3 andares",
    casino: "Cassino", factory: "Fábrica de roupas", mckenzie: "Hangar McKenzie", detention: "Central de detenção",
    salvage: "Ferro velho", autoshop: "Oficina de tuning", arcade: "Fliperama", nightclub: "Boate",
    facility: "Complexo (Completo com gancho)", hangar: "Hangar", bunker: "Bunker",
    clubhouse: "Sedes", hatchet: "Machadinha de pedra",
  },
  en: {
    character: "Character",
    genre: "Genre", male: "Male", female: "Female",
    bank: "Bank", pocket: "Pocket",
    unidade: { milhoes: "Millions", mil: "Thousand", reais: "Reais" },
    level: "Level", km: "K/M Ratio",
    ability: "Ability", allMax: "All at maximum",
    jog: "Little jog", modded: "Modded",
    outfits: "Outfits",
    trajes: { sem_mods: "No mods", uns_com_mod: "Some modded", todos_mods: "Moddeds" },
    secVehicles: "___ Vehicles and aircraft",
    vehicles: "Vehicles", includesMod: "(Includes modded)",
    pegasus: "Vehicles Pegasus", special: "Special vehicles", aircraft: "Aircraft", sparrow: "Sparrow",
    secProps: "___ Service Vehicles",
    yacht: "Galaxy Super Yacht", kosatka: "Kosatka (Submarine)",
    com: "Mobile Operations Center", avenger: "Avenger", terrorbyte: "Terrorbyte", acidLab: "Acid Lab",
    secMore: "___ More",
    agency: "1 Agency", office: "1 Office", arena: "Arena", vehWarehouse: "1 Owned Vehicle Warehouse",
    apartments: "Apartments", warehouse: "Owned Warehouse", mansion: "Mansion",
    eclipse: "1 Eclipse Blvd Garage", vinewood: "1 The Vinewood Club Garage", garage3: "1 Owned Garage 3-story office",
    casino: "Casino", factory: "Darnell Bros Garment Factory", mckenzie: "McKenzie Field Hangar", detention: "Ball Office",
    salvage: "Salvage Yard", autoshop: "Auto Shop Property", arcade: "Arcade", nightclub: "Nightclub Property",
    facility: "Facility (Complete with hook)", hangar: "Hangar", bunker: "Bunker",
    clubhouse: "Clubhouse", hatchet: "Stone hatchet",
  },
};

function render(qtd) {
  cards.innerHTML = "";
  output.hidden = true;
  for (let i = 1; i <= qtd; i++) {
    const node = tpl.content.cloneNode(true);
    node.querySelector(".character__title").textContent = "Personagem " + i;
    cards.appendChild(node);
  }
}

function val(form, name) {
  const el = form.querySelector(`[name="${name}"]`);
  return el ? el.value.trim() : "";
}
function checked(form, name) {
  const el = form.querySelector(`[name="${name}"]`);
  return el ? el.checked : false;
}

function montarPersonagem(form, indice, t) {
  const L = [];
  L.push(`👤 - ${indice} ${t.character}`);
  L.push(`${t.genre}: ${val(form, "genero") === "feminino" ? t.female : val(form, "genero") === "masculino" ? t.male : "-"}`);
  if (val(form, "banco"))
    L.push(`${t.bank}: ${val(form, "banco")} ${t.unidade[val(form, "banco_unidade") || "milhoes"]}`);
  if (val(form, "bolso"))
    L.push(`${t.pocket}: ${val(form, "bolso")} ${t.unidade[val(form, "bolso_unidade") || "milhoes"]}`);
  if (val(form, "level")) L.push(`${t.level}: ${val(form, "level")}`);
  if (val(form, "vm")) L.push(`${t.km}: ${val(form, "vm")}`);
  if (checked(form, "todas_habilidades")) L.push(`${t.ability}: ${t.allMax}`);
  if (checked(form, "corridinha_mod")) L.push(`${t.jog}: ${t.modded}`);
  if (val(form, "trajes_qtd")) {
    const tr = t.trajes[val(form, "trajes")] || "";
    L.push(`${t.outfits}: ${val(form, "trajes_qtd")}${tr ? ` (${tr})` : ""}`);
  }

  const vehic = [];
  if (val(form, "veiculos"))
    vehic.push(`🚙 - ${val(form, "veiculos")} ${t.vehicles}${checked(form, "veiculos_mods") ? ` ${t.includesMod}` : ""}`);
  if (val(form, "pegasus")) vehic.push(`🐎 - ${val(form, "pegasus")} ${t.pegasus}`);
  if (val(form, "veiculos_especiais"))
    vehic.push(`🏎️ - ${val(form, "veiculos_especiais")} ${t.special}${checked(form, "veiculos_especiais_mods") ? ` ${t.includesMod}` : ""}`);
  if (val(form, "aeronaves"))
    vehic.push(`✈️ - ${val(form, "aeronaves")} ${t.aircraft}${checked(form, "aeronaves_mods") ? ` ${t.includesMod}` : ""}`);
  if (checked(form, "sparrow")) vehic.push(`🚁 - ${t.sparrow}`);
  if (vehic.length) {
    L.push(``, t.secVehicles, ...vehic);
  }

  const props = [];
  if (checked(form, "super_iate_galaxy")) props.push(`🛥️ - ${t.yacht}`);
  if (checked(form, "kosatka")) props.push(`🚀 - ${t.kosatka}`);
  if (checked(form, "centro_operacoes_moveis")) props.push(`🚛 - ${t.com}`);
  if (checked(form, "avenger")) props.push(`🛫 - ${t.avenger}`);
  if (checked(form, "terrorbyte")) props.push(`🚛 - ${t.terrorbyte}`);
  if (checked(form, "laboratorio_toxico")) props.push(`🚛 - ${t.acidLab}`);
  if (props.length) {
    L.push(``, t.secProps, ...props);
  }

  const mais = [];
  if (val(form, "mansao")) mais.push(`🌄 - ${val(form, "mansao")} ${t.mansion}`);
  if (checked(form, "agencia")) mais.push(`🏘️ - ${t.agency}`);
  if (checked(form, "escritorio")) mais.push(`🏬 - ${t.office}`);
  if (checked(form, "arena")) mais.push(`🏟️ - ${t.arena}`);
  if (checked(form, "galpao_veiculos")) mais.push(`🏚️ - ${t.vehWarehouse}`);
  if (val(form, "apartamentos")) mais.push(`🏘️ - ${val(form, "apartamentos")} ${t.apartments}`);
  if (val(form, "depositos")) mais.push(`🏬 - ${val(form, "depositos")} ${t.warehouse}`);
  if (checked(form, "garagem_eclipse_boulevard")) mais.push(`🏚️ - ${t.eclipse}`);
  if (checked(form, "garagem_club_vinewood")) mais.push(`🏚️ - ${t.vinewood}`);
  if (checked(form, "garagem_3_andares_escritorio")) mais.push(`🏚️ - ${t.garage3}`);
  if (checked(form, "cassino")) mais.push(`🃏 - ${t.casino}`);
  if (checked(form, "fabrica_roupas")) mais.push(`👗 - ${t.factory}`);
  if (checked(form, "hangar_mckenzie")) mais.push(`🛖 - ${t.mckenzie}`);
  if (checked(form, "centro_detencao")) mais.push(`👮 - ${t.detention}`);
  if (checked(form, "ferro_velho")) mais.push(`⚒️ - ${t.salvage}`);
  if (checked(form, "oficina_tunning")) mais.push(`🏁 - ${t.autoshop}`);
  if (checked(form, "fliperama")) mais.push(`🎰 - ${t.arcade}`);
  if (checked(form, "boate")) mais.push(`🦸‍♀️ - ${t.nightclub}`);
  if (checked(form, "complexo")) mais.push(`🏚️ - ${t.facility}`);
  if (checked(form, "hangar")) mais.push(`🛖 - ${t.hangar}`);
  if (checked(form, "banker")) mais.push(`🛖 - ${t.bunker}`);
  if (checked(form, "sede")) mais.push(`🏚️ - ${t.clubhouse}`);
  if (checked(form, "machadinha_pedra")) mais.push(`🪓 - ${t.hatchet}`);
  if (mais.length) {
    L.push(``, t.secMore, ...mais);
  }

  return L.join("\n");
}

function gerarTexto(lang) {
  const forms = cards.querySelectorAll("form");
  return Array.from(forms)
    .map((f, i) => montarPersonagem(f, i + 1, T[lang]))
    .join("\n\n========================\n\n");
}

const GERACAO = {
  pt: { ambas: "Ambas gerações", antiga: "Antiga geração", nova: "Nova geração" },
  en: { ambas: "Both generations", antiga: "Old generation", nova: "New generation" },
};
const PLATAFORMA = { xbox: "Xbox", playstation: "PlayStation" };

function cabecalho(lang) {
  const contaMod = document.getElementById("conta-mod").checked;
  const geracao = document.getElementById("geracao").value;
  const plataforma = document.getElementById("plataforma").value;
  const conta = contaMod
    ? (lang === "pt" ? "Conta Mod" : "Modded Account")
    : (lang === "pt" ? "Conta OG" : "OG Account");
  return `${PLATAFORMA[plataforma]} - ${GERACAO[lang][geracao]}\n${conta}\n\n`;
}

function gerarDescricao() {
  const pt = gerarTexto("pt");
  const en = gerarTexto("en");
  const texto =
    "🇧🇷 PORTUGUÊS\n\n" + cabecalho("pt") + pt +
    "\n\n\n========================================\n\n" +
    "🇺🇸 ENGLISH\n\n" + cabecalho("en") + en;

  output.textContent = texto;
  output.hidden = false;

  const blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "descricao.txt";
  a.click();
  URL.revokeObjectURL(url);
}

qtdSelect.addEventListener("change", () => render(Number(qtdSelect.value)));
gerarBtn.addEventListener("click", gerarDescricao);

const bannerClose = document.getElementById("banner-close");
if (bannerClose) {
  bannerClose.addEventListener("click", () => {
    document.querySelector(".banner").classList.add("is-hidden");
    document.querySelector(".page").style.paddingBottom = "32px";
  });
}

render(Number(qtdSelect.value));
