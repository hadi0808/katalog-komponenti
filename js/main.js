import { komponente } from "./podaci.js";

const katalog = document.querySelector("#catalog");
const brojac = document.querySelector("#result-count");
const praznoStanje = document.querySelector("#empty-state");
const filtarKategorije = document.querySelector("#category-filter");
const sortiranje = document.querySelector("#sort-order");

const formatCijene = new Intl.NumberFormat("hr-HR", {
  style: "currency",
  currency: "EUR"
});

// Iz jednog podatkovnog zapisa stvara jednu karticu.
function izradiKarticu(zapis) {
  const kartica = document.createElement("article");
  kartica.classList.add("product-card");
  kartica.dataset.id = zapis.id;

  // Skuplje komponente dobivaju dodatnu klasu preko classList.
  if (zapis.cijena >= 500) {
    kartica.classList.add("product-card--premium");
  }

  const slika = document.createElement("img");
  slika.classList.add("product-image");
  slika.src = zapis.slika;
  slika.alt = `Slika komponente: ${zapis.naziv}`;
  slika.loading = "lazy";

  const sadrzaj = document.createElement("div");
  sadrzaj.classList.add("product-content");

  const kategorija = document.createElement("p");
  kategorija.classList.add("product-category");
  kategorija.textContent = zapis.kategorija;

  const naziv = document.createElement("h2");
  naziv.classList.add("product-title");
  naziv.textContent = zapis.naziv;

  const podnozje = document.createElement("div");
  podnozje.classList.add("product-footer");

  const cijena = document.createElement("p");
  cijena.classList.add("product-price");
  cijena.textContent = formatCijene.format(zapis.cijena);

  const poveznica = document.createElement("a");
  poveznica.classList.add("product-link");
  poveznica.href = zapis.detalji;
  poveznica.target = "_blank";
  poveznica.rel = "noopener noreferrer";
  poveznica.textContent = "Detalji ↗";
  poveznica.setAttribute("aria-label", `Detalji za ${zapis.naziv}`);

  podnozje.append(cijena, poveznica);
  sadrzaj.append(kategorija, naziv, podnozje);
  kartica.append(slika, sadrzaj);

  return kartica;
}

// Filtrira i sortira podatke prije nego što ih prikaže.
function izradiPopis(zapisi) {
  katalog.replaceChildren();

  const kategorija = filtarKategorije.value;
  const nacinSortiranja = sortiranje.value;

  let prikazaniZapisi = zapisi.filter((zapis) =>
    kategorija === "Sve" || zapis.kategorija === kategorija
  );

  prikazaniZapisi.sort((a, b) => {
    if (nacinSortiranja === "price-asc") return a.cijena - b.cijena;
    if (nacinSortiranja === "price-desc") return b.cijena - a.cijena;
    return a.naziv.localeCompare(b.naziv, "hr");
  });

  const kartice = prikazaniZapisi.map(izradiKarticu);
  katalog.append(...kartice);

  brojac.textContent = `${prikazaniZapisi.length} ${
    prikazaniZapisi.length === 1 ? "proizvod" : "proizvoda"
  }`;
  praznoStanje.hidden = prikazaniZapisi.length !== 0;
}

// Prikaz se izvršava pri učitavanju, a kontrole osvježavaju popis.
filtarKategorije.addEventListener("change", () => izradiPopis(komponente));
sortiranje.addEventListener("change", () => izradiPopis(komponente));

izradiPopis(komponente);

// Provjera praznog stanja:
// Privremeno zamijeni gornji poziv s izradiPopis([]). Brojač mora biti 0
// i poruka "Nema zapisa..." mora postati vidljiva. Zatim vrati komponente.
