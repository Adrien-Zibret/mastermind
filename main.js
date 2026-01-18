const couleurs = ['rouge', 'bleu', 'jaune', 'vert', 'rose', 'violet'];

let combinaison = [];
let combJoueur = [];
let combVerif = [];
let verifRouge = 0;
let verifBlanc = 0;
let tour = 1;
let estGagne = false;

const divBtnCommencer = document.getElementById('divBtnCommencer');
const btnCommencer = document.getElementById('btnCommencer');
const rowBtn = document.getElementById('rowBtn');
const zoneBtn = document.getElementById('zoneBtn');
const emp = document.getElementById('emp');
const zoneTourRestant = document.getElementById('tourRestant');
const zoneConsigne = document.getElementById('consigne');
const zoneBtnReco = document.getElementById('zoneBtnReco');


btnCommencer.addEventListener('click', () => {
    divBtnCommencer.style.display = 'none';
    commencerJeu(); console.log(combinaison);
})

function commencerJeu() {
    choisirCombinaisonAleatoire();
    creerLigneBouton();
    lancerTour();
}
function lancerTour() {
    creerLigne();
    ecouterBtn();
}


function nombreAleatoire(max) {
    return Math.floor(Math.random() * Math.floor(max))
}

function choisirCombinaisonAleatoire() {
    let indexUtilises = [];
    let combinaisonAleatoire = [];
    let index;
    for (let i = 0; i < 4; i++) {
        do {
            index = nombreAleatoire(couleurs.length);
        } while (indexUtilises.includes(index));
        indexUtilises[i] = index;
        combinaisonAleatoire[i] = couleurs[index];
    }
    combinaison = combinaisonAleatoire;
}
function creerLigneBouton() {
    rowBtn.style.display = 'block';
    couleurs.forEach((b) => {
        let btn = document.createElement('button');
        btn.id = b;
        btn.classList.add('btnCouleur');
        btn.classList.add(`${b}`);
        btn.classList.add('btn');
        btn.classList.add('rounded-circle');
        zoneBtn.appendChild(btn);
    })
}
function creerLigne() {
    let row = document.createElement('div');
    row.classList.add("row");
    row.classList.add("animate__animated");
    row.classList.add("animate__slideInLeft");
    row.id = `rowComb${tour}`;
    emp.appendChild(row);
    for (let i = 0; i < 4; i++) {
        let col = document.createElement('div');
        col.classList.add('col-1');
        col.classList.add('mb-1');
        col.classList.add('mx-auto');
        col.classList.add('text-center');
        col.classList.add('colComb');
        col.classList.add(`colComb${tour}`);
        col.id = `colComb${tour}-${i + 1}`;
        row.appendChild(col);
    }
    let col = document.createElement('div');
    col.classList.add('col-4');
    col.classList.add('colCombRes');
    col.classList.add('my-auto');
    col.classList.add(`colCombRes${tour}`);
    col.id = `colRes${tour}`;
    row.appendChild(col);
    mettreCombVide();
    mettreResultatVide();
}
function mettreCombVide() {
    for (let i = 0; i < 4; i++) {
        let col = document.getElementById(`colComb${tour}-${i + 1}`);
        let btn = document.createElement('button');
        btn.classList.add('btn');
        btn.classList.add('btnVide');
        btn.classList.add(`btnVide${tour}`);
        btn.classList.add('rounded-circle');
        btn.id = `btnComb${tour}-${i + 1}`;
        col.appendChild(btn);
    }
}
function mettreResultatVide() {
    let colRes = document.getElementById(`colRes${tour}`);
    for (let i = 0; i < 4; i++) {
        let btn = document.createElement('button');
        btn.classList.add('btn');
        btn.classList.add('btnVideRes');
        btn.classList.add(`btnVideRes${tour}`);
        btn.classList.add('rounded-circle');
        btn.id = `btnVerif${tour}-${i + 1}`;
        colRes.appendChild(btn);
    }
}
function ecouterBtn() {
    let btnsCouleur = document.querySelectorAll('.btnCouleur');
    btnsCouleur.forEach((b) => {
        b.addEventListener('click', () => {
            combJoueur.push(b.id);
            console.log(combJoueur);
            b.classList.add('disabled');
            console.log(combJoueur.length, tour)
            let btnComb = document.getElementById(`btnComb${tour}-${combJoueur.length}`);
            btnComb.classList.add(`${b.id}`);
            if (combJoueur.length === 4) {
                verifier(); afficherVerif();
                if (estGagne === false) {
                    if (tour < 14) {
                        combJoueur = [];
                        combVerif = [];
                        verifRouge = 0;
                        verifBlanc = 0;
                        btnsCouleur.forEach((b) => {
                            b.classList.remove('disabled');
                        })
                        tour++;
                        creerLigne();
                        afficherTourRestant();
                    } else {
                        btnsCouleur.forEach((b) => {
                            b.classList.add('disabled');
                        })
                        zoneConsigne.innerHTML = '';
                        zoneConsigne.innerHTML = 'Perdu';
                        zoneTourRestant.innerHTML = '';
                        ecouterBtnReco();
                    }
                } else {
                    zoneConsigne.innerHTML = 'Bravo !!! Vous avez trouvé la combinaison du mastermind !!!';
                    ecouterBtnReco();
                }
            }
        },
        )
    })
}
function verifier() {
    for (let i = 0; i < combJoueur.length; i++) {
        if (combinaison.includes(combJoueur[i])) {
            if (combJoueur[i] === combinaison[i]) {
                verifRouge++;
            } else {
                verifBlanc++;
            }
        }
        estGagne = verifRouge === 4 ? true : false;
    }
    for (let i = 0; i < verifRouge; i++) {
        combVerif.push('rougeVerif');
    }
    for (let i = 0; i < verifBlanc; i++) {
        combVerif.push('blanc');
    }
}
function afficherVerif() {
    const btnsVerif = document.querySelectorAll(`.btnVideRes${tour}`);
    for (let i = 0; i < combVerif.length; i++) {
        btnsVerif[i].classList.add(`${combVerif[i]}`);
    }
}
function afficherTourRestant() {
    zoneTourRestant.innerHTML = '';
    zoneTourRestant.innerHTML = `Il vous reste ${15 - tour} ${(15 - tour) > 1 ? 'tentatives' : 'tentative'}`;
}
function ecouterBtnReco() {
    let btn = document.createElement('button');
    btn.classList.add('btn');
    btn.classList.add('btn-success');
    btn.id = 'btnReco';
    btn.innerText = 'Recommencer';
    zoneBtnReco.appendChild(btn);
    btn.addEventListener('click', () => {
        reinit();
        creerLigneBouton();
        choisirCombinaisonAleatoire();
        console.log(combinaison);
        lancerTour();
    })
}
function reinit() {
    combJoueur = [];
    combVerif = [];
    verifRouge = 0;
    verifBlanc = 0;
    combinaison = [];
    estGagne = false;
    emp.innerHTML = '';
    zoneBtn.innerHTML = '';
    zoneTourRestant.innerHTML = '';
    zoneBtnReco.innerHTML = '';
    zoneConsigne.innerHTML = '';
    zoneConsigne.innerHTML = "Appuyez sur les boutons pour entrer votre combinaison, le mastermind mettra ensuite un pion rouge pour chaque pion correctement placé et un pion blanc pour chaque pion présent mais mal placé";
    tour = 1;
}
