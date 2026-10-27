# Katalog računalnih komponenti

Jednostavna responzivna web-stranica koja prikazuje katalog računalnih komponenti. Kartice nisu ručno napisane u HTML-u: JavaScript ih izrađuje iz polja objekata.

## Svojstva zapisa

Svaka komponenta sadrži:
- `id` — jedinstveni identifikator
- `naziv` — naziv komponente
- `cijena` — brojčana cijena u eurima
- `kategorija` — tekstualna kategorija
- `slika` — adresa slike
- `detalji` — adresa poveznice na dodatne informacije

## Funkcionalnosti

- Kartice i njihov sadržaj generiraju se JavaScriptom.
- Svaka kartica ima `data-id`.
- Komponente s cijenom od najmanje 500 € dobivaju klasu `product-card--premium` preko `classList`.
- Filtriranje po kategoriji i sortiranje po nazivu ili cijeni.
- Brojač prikazuje broj trenutačno prikazanih zapisa.
- Poruka praznog stanja prikazuje se kad nema rezultata.

## Pokretanje

Projekt koristi JavaScript ES module (`type="module"`), zato ga pokreni preko lokalnog HTTP poslužitelja, a ne izravno otvaranjem `index.html`.

Primjer s Python instalacijom:

1. Otvori terminal u mapi projekta.
2. Pokreni `python -m http.server 8000`.
3. U pregledniku otvori `http://localhost:8000`.

Alternativno možeš koristiti proširenje **Live Server** u Visual Studio Codeu.

## Provjera praznog stanja

U `js/main.js` pri dnu datoteke privremeno promijeni `izradiPopis(komponente);` u `izradiPopis([]);`. Nakon osvježavanja stranice brojač mora prikazati nulu, a poruka praznog stanja mora biti vidljiva. Nakon provjere vrati izvorni poziv.

## Objavljivanje

Prenesi cijelu mapu projekta u javni GitHub repozitorij. Ako želiš javnu web-stranicu, u postavkama repozitorija uključi GitHub Pages i odaberi granu koja sadrži `index.html`.
