        // Fonction pour ajouter un emploi du temps
        function addEmploi() {
            const filiere = document.getElementById('filiere').value;
            const semestre = document.getElementById('semestre').value;
            const emploiInput = document.getElementById('emploi-pdf');
            const emploiPDF = emploiInput.files[0];
            
            if (filiere && semestre && emploiPDF) {
                const reader = new FileReader();
                
                reader.onload = function(event) {
                    const emplois = JSON.parse(localStorage.getItem('emplois')) || [];
                    const emploi = {
                        filiere,
                        semestre,
                        pdfData: event.target.result // Base64 du fichier PDF
                    };
                    emplois.push(emploi);
                    localStorage.setItem('emplois', JSON.stringify(emplois));
                    alert('Emploi du temps ajouté avec succès !');
                    loadEmplois();
                };

                reader.readAsDataURL(emploiPDF); // Lire le fichier PDF en Base64
            } else {
                alert('Veuillez remplir tous les champs et sélectionner un fichier PDF.');
            }
        }

        // Fonction pour charger les emplois du temps
        function loadEmplois() {
            const emplois = JSON.parse(localStorage.getItem('emplois')) || [];
            const emploisList = document.getElementById('emplois-list');
            emploisList.innerHTML = '';

            emplois.forEach((emploi, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    ${emploi.filiere} - ${emploi.semestre} 
                    <a href="${emploi.pdfData}" download="emploi_${emploi.filiere}_${emploi.semestre}.pdf">Télécharger</a>
                    <button onclick="removeEmploi(${index})">Supprimer</button>
                `;
                emploisList.appendChild(li);
            });
        }

        // Fonction pour supprimer un emploi du temps
        function removeEmploi(index) {
            const emplois = JSON.parse(localStorage.getItem('emplois')) || [];
            emplois.splice(index, 1); // Retirer l'emploi du temps à l'index donné
            localStorage.setItem('emplois', JSON.stringify(emplois)); // Mettre à jour localStorage
            loadEmplois(); // Recharger les emplois pour mettre à jour l'affichage
            alert('Emploi du temps supprimé avec succès !');
        }

        // Fonction pour rechercher des emplois du temps
        function searchEmplois() {
            const searchValue = document.getElementById('search-input').value.toLowerCase();
            const emplois = JSON.parse(localStorage.getItem('emplois')) || [];
            const emploisList = document.getElementById('emplois-list');
            emploisList.innerHTML = '';

            emplois.forEach((emploi, index) => {
                if (
                    emploi.filiere.toLowerCase().includes(searchValue) ||
                    emploi.semestre.toLowerCase().includes(searchValue)
                ) {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        ${emploi.filiere} - ${emploi.semestre} 
                        <a href="${emploi.pdfData}" download="emploi_${emploi.filiere}_${emploi.semestre}.pdf">Télécharger</a>
                        <button onclick="removeEmploi(${index})">Supprimer</button>
                    `;
                    emploisList.appendChild(li);
                }
            });
        }

        // Charger les emplois à l'ouverture de la page



        document.addEventListener('DOMContentLoaded', loadEmplois);













        // etudient 

        
        let allEmplois = [];

        // Fonction pour charger les emplois du temps
        function loadEmplois() {
            const emplois = JSON.parse(localStorage.getItem('emplois')) || [];
            allEmplois = emplois;
            displayEmplois(emplois);
        }

        // Fonction pour afficher les emplois du temps
        function displayEmplois(emplois) {
            const emploisList = document.getElementById('emplois-list');
            emploisList.innerHTML = '';

            emplois.forEach((emploi) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    ${emploi.filiere} - ${emploi.semestre}
                    <a href="${emploi.pdfData}" download="emploi_${emploi.filiere}_${emploi.semestre}.pdf">Télécharger</a>
                `;
                emploisList.appendChild(li);
            });
        }

        // Fonction pour filtrer les emplois par filière
        function filterEmploisByFiliere() {
            const selectedFiliere = document.getElementById('filiere-select').value.toLowerCase();
            const filteredEmplois = selectedFiliere 
                ? allEmplois.filter(emploi => emploi.filiere.toLowerCase() === selectedFiliere)
                : allEmplois;

            displayEmplois(filteredEmplois);
        }

        // Fonction pour rechercher des emplois du temps
        function searchEmplois() {
            const searchValue = document.getElementById('search-input').value.toLowerCase();
            const filteredEmplois = allEmplois.filter(emploi => 
                emploi.filiere.toLowerCase().includes(searchValue) ||
                emploi.semestre.toLowerCase().includes(searchValue)
            );
            displayEmplois(filteredEmplois);
        }

        // Charger les emplois à l'ouverture de la page
        document.addEventListener('DOMContentLoaded', loadEmplois);
    