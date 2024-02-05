// Reset databse
Cypress.Commands.add("resetDB", () => {
  cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
});
// Add New User
Cypress.Commands.add("addUser", (user) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
});
// Login User
Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/login`, {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("loggedUser", JSON.stringify(body));
    cy.visit("");
  });
});
// Create Blog
Cypress.Commands.add("create", (body) => {
  const headers = {
    Authorization: `Bearer ${
      JSON.parse(localStorage.getItem("loggedUser")).token
    }`,
  };
  cy.request({
    method: "POST",
    url: `${Cypress.env("BACKEND")}/blogs`,
    body,
    headers,
  });
  cy.visit("");
});
