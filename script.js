// script.js

const teamContainer = document.getElementById('team-container');
const apiURL = 'site_data.json'; 

async function loadTeam() {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        const teamMembers = data.team; 

        teamMembers.forEach(member => {
            const memberDiv = document.createElement('div');
            memberDiv.classList.add('team-member');
            memberDiv.innerHTML = `
                <img src="${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.role}</p> 
            `;
            teamContainer.appendChild(memberDiv);
        });

    } catch (error) {
        console.log("Could not load local data:", error);
    }
}

loadTeam();

// FORM VALIDATION SCRIPT


const applicationForm = document.getElementById('job-application-form');

if (applicationForm) {
    applicationForm.addEventListener('submit', async function(event) {
        event.preventDefault(); 

        
        const formData = {
            name: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            experience: document.getElementById('experience').value,
            timestamp: new Date().toLocaleString()
        };

        const submitBtn = applicationForm.querySelector('button');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = "Processing...";

        try {
    
            //FAKE API 

            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const serverResult = await response.json();
            console.log("Server received it:", serverResult);

            

            const jsonString = JSON.stringify(formData, null, 2);
            const blob = new Blob([jsonString], { type: "application/json" });
            
            // download//
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `Copy_of_Application_${formData.name}.json`;
            
            document.body.appendChild(link);
            link.click(); 
            document.body.removeChild(link); 

            alert(`Success! \n1. Sent to Server (ID: ${serverResult.id})`);
            
            applicationForm.reset();

        } catch (error) {
            console.error("Something went wrong:", error);
            alert("Error: Could not connect to the server.");
        } finally {
        
            submitBtn.innerText = originalText;
        }
    });
}