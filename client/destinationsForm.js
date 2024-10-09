// @ts-nocheck
document
  .getElementById("newDestination")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const country = document.getElementById("country").value;
    const location = document.getElementById("location").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const image = document.getElementById("image").value;
    const description = document.getElementById("description").value;

    const newDestinationObj = {
      title: "something",
      country,
      location,
      startDate,
      endDate,
      image: "sonething",
      description,
    };

    const responseJson = await fetch("http://localhost:8080/v1/destinations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDestinationObj),
    });

    const response = await responseJson.json();
    console.log(response);
  });
