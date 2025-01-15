document.addEventListener("DOMContentLoaded", function() {
    const clientForm = document.getElementById("client-form");
    const clientTable = document.getElementById("client-table").getElementsByTagName('tbody')[0];

    // Load stored data from localStorage
    const loadClients = () => {
        const clients = JSON.parse(localStorage.getItem("clients")) || [];
        clientTable.innerHTML = '';
        clients.forEach((client, index) => {
            const row = clientTable.insertRow();
            row.innerHTML = `
                <td>${client.barangay}</td>
                <td>${client.name}</td>
                <td>${client.streetNumber}</td>
                <td><img src="${client.image}" alt="Client Image"></td>
                <td class="actions">
                    <button onclick="editClient(${index})">Edit</button>
                    <button onclick="deleteClient(${index})">Delete</button>
                </td>
            `;
        });
    };

    // Add client
    clientForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const barangay = document.getElementById("barangay").value;
        const name = document.getElementById("client-name").value;
        const streetNumber = document.getElementById("street-number").value;
        const image = document.getElementById("client-image").files[0];

        if (!image) {
            alert("Please upload an image.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = function() {
            const newClient = {
                barangay,
                name,
                streetNumber,
                image: reader.result // store base64 image
            };

            const clients = JSON.parse(localStorage.getItem("clients")) || [];
            clients.push(newClient);
            localStorage.setItem("clients", JSON.stringify(clients));

            loadClients(); // Reload the client list
            clientForm.reset(); // Reset form
        };
        reader.readAsDataURL(image);
    });

    // Edit client
    window.editClient = function(index) {
        const clients = JSON.parse(localStorage.getItem("clients"));
        const client = clients[index];
        document.getElementById("barangay").value = client.barangay;
        document.getElementById("client-name").value = client.name;
        document.getElementById("street-number").value = client.streetNumber;
        // You can add an edit function here (e.g., updating the client in localStorage)
    };

    // Delete client
    window.deleteClient = function(index) {
        const clients = JSON.parse(localStorage.getItem("clients"));
        clients.splice(index, 1);
        localStorage.setItem("clients", JSON.stringify(clients));
        loadClients(); // Reload the client list
    };

    loadClients(); // Load clients on page load
});
