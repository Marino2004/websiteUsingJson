// script.js
let currentSection = 0;
let sections = [];

document.addEventListener("DOMContentLoaded", function() {
    fetch('../data/data.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('title').textContent = data.title;
            document.getElementById('description').textContent = data.description;

            const contentDiv = document.getElementById('content');
            data.content.forEach((section, index) => {
                const sectionDiv = document.createElement('div');
                sectionDiv.classList.add('section');
                if (index === 0) sectionDiv.classList.add('active'); // Activer la première section par défaut
                
                const header = document.createElement('h2');
                header.textContent = section.header;
                sectionDiv.appendChild(header);

                const text = document.createElement('p');
                text.textContent = section.text;
                sectionDiv.appendChild(text);

                if (section.listItems && section.listItems.length > 0) {
                    const ul = document.createElement('ul');
                    section.listItems.forEach(item => {
                        const li = document.createElement('li');
                        li.textContent = item;
                        ul.appendChild(li);
                    });
                    sectionDiv.appendChild(ul);
                }

                // Ajouter les boutons de navigation à chaque section
                const prevButton = document.createElement('button');
                prevButton.id = 'prevButton';
                prevButton.textContent = '◀';
                prevButton.addEventListener('click', showPreviousSection);
                sectionDiv.appendChild(prevButton);

                const nextButton = document.createElement('button');
                nextButton.id = 'nextButton';
                nextButton.textContent = '▶';
                nextButton.addEventListener('click', showNextSection);
                sectionDiv.appendChild(nextButton);

                contentDiv.appendChild(sectionDiv);
                sections.push(sectionDiv); // Ajouter la section à la liste des sections
            });

            updateButtons();
        })
        .catch(error => console.error('Erreur lors du chargement du JSON:', error));
});

 // Ajout des écouteurs d'événements pour les touches directionnelles
 document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft") {
        showPreviousSection();
    } else if (event.key === "ArrowRight") {
        showNextSection();
    }
});

// Fonction pour afficher la section précédente
function showPreviousSection() {
    if (currentSection > 0) {
        sections[currentSection].classList.remove('active');
        currentSection--;   
        sections[currentSection].classList.add('active');
        updateButtons();
    }
}

// Fonction pour afficher la section suivante
function showNextSection() {
    if (currentSection < sections.length - 1) {
        sections[currentSection].classList.remove('active');
        currentSection++;
        sections[currentSection].classList.add('active');
        updateButtons();
    }
}

// Mettre à jour l'état des boutons en fonction de la section actuelle
function updateButtons() {
    // Mise à jour des boutons dans chaque section
    sections.forEach((section, index) => {
        const prevButton = section.querySelector('#prevButton');
        const nextButton = section.querySelector('#nextButton');
        prevButton.disabled = index === 0;
        nextButton.disabled = index === sections.length - 1;
    });
}
