describe("Blog app", function () {
  beforeEach(function () {
    cy.resetDB();
    const user = {
      name: "Mr Test",
      username: "tester",
      password: "12345678",
    };
    cy.addUser(user);
    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.get("#login-form").contains("Login");
  });

  // Make tests for logging in.
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("tester");
      cy.get("#password").type("12345678");
      cy.get(".login-button").click();

      cy.contains("Welcome Mr Test");
      cy.contains("Add Blog");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("wrong-tester");
      cy.get("#password").type("12345678");
      cy.get(".login-button").click();

      cy.get(".error")
        .contains("invalid username or password")
        .and("have.css", "color", "rgb(211, 39, 82)");
    });
  });

  // Logged in user.
  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "tester", password: "12345678" });
      cy.create({
        title: "test-blog-1",
        author: "Mr Test",
        url: "www.test-me.com",
      });
    });

    // Make a test that verifies a logged-in user can create a new blog.
    it("A blog can be created", function () {
      cy.get(".toggle-button").click();

      cy.get("#blog-title").type("test-blog-2");
      cy.get("#blog-author").type("Mr Test");
      cy.get("#blog-url").type("www.test-me.com");

      cy.get(".create-button").click();

      cy.get(".blog")
        .should("contain", "test-blog-2")
        .and("contain", "Mr Test");
      cy.get(".success")
        .should("contain", "test-blog-2 was added to the database")
        .and("have.css", "color", "rgb(65, 167, 65)");
    });

    // Make a test that confirms users can like a blog.
    it("User can like a blog post", function () {
      cy.contains("test-blog-1")
        .parent()
        .find(".show-details")
        .as("showDetails");
      cy.get("@showDetails").click();
      cy.get(".up").click();
    });

    // Make a test for ensuring that the user who created a blog can delete it.
    it("User can delete blog post", function () {
      cy.contains("test-blog-1").parent().find(".delete").as("delete");
      cy.get("@delete").click();

      cy.get("#alert-dialog-actions").contains("Delete").as("confirm");
      cy.get("@confirm").click();

      cy.get(".success").should("contain", "Deleted blog");
      cy.get("test-blog-1").should("not.exist");

      cy.create({
        title: "test-blog-1",
        author: "Mr Test",
        url: "www.test-me.com",
      });
    });

    // Make a test for ensuring that only the creator can see the delete button of a blog.
    it("User can only delete own blog", function () {
      cy.get(".logout-button").click();

      cy.addUser({
        name: "Mr Test 2",
        username: "tester2",
        password: "12345678",
      });

      cy.login({ username: "tester2", password: "12345678" });
      cy.get(".delete").should("not.exist");
    });

    // Make a test that checks that the blogs are ordered according to likes.
    it("Check blogs are ordered by likes", function () {
      cy.create({
        title: "Most Likes",
        author: "Mr Test",
        url: "www.test-me.com",
        likes: 30,
      });
      cy.create({
        title: "2nd Most Likes",
        author: "Mr Test",
        url: "www.test-me.com",
        likes: 20,
      });
      cy.create({
        title: "3rd Most Likes",
        author: "Mr Test",
        url: "www.test-me.com",
        likes: 10,
      });

      cy.get(".blog").then(($blogs) => {
        const titles = [];
        $blogs.each((index, el) => {
          const title = Cypress.$(el).find(".blog-title").text();
          console.log("TITLE", title, index);
          titles.push(title);
        });
        expect(titles).to.deep.equal([
          "Most Likes",
          "2nd Most Likes",
          "3rd Most Likes",
          "test-blog-1",
        ]);
      });
    });
  });
});
