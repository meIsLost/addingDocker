document.getElementById("destination-form")!.addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);

  const response = await fetch("http://localhost:8082/v1/destinations", {
    method: "POST",
    body: formData, 
  });

  if (response.ok) {
    alert("Destination created successfully!");
    form.reset();
  } else {
    alert("Failed to create destination.");
  }
});

