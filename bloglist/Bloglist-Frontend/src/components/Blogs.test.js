import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import Card from "./Card";
import Create from "./Create";
import Message from "./Message";

import blogService from "../../services/blogs";

jest.mock("../../services/blogs");

let setBlogs;
let toggleVisibility;
let setNewBlog;
let setMessage;
let u;

beforeEach(() => {
  setBlogs = jest.fn();
  toggleVisibility = jest.fn();
  setNewBlog = jest.fn();
  setMessage = jest.fn();
  u = userEvent.setup();
});

const renderCard = (
  blog,
  user,
  showDetails = jest.fn(),
  updateBlog = jest.fn()
) => {
  return render(
    <Card
      blog={blog}
      showDetails={showDetails}
      user={user}
      updateBlog={updateBlog}
    />
  );
};

const renderCreate = (newBlog) => {
  return render(
    <Create
      setBlogs={setBlogs}
      newBlog={newBlog}
      setNewBlog={setNewBlog}
      toggleVisibility={toggleVisibility}
      setMessage={setMessage}
    />
  );
};

describe("<Card />", () => {
  const blog = {
    title: "test-blog",
    author: "test-author",
    url: "test-url",
    likes: 1000,
    user: {
      id: 12345,
    },
  };

  const user = {
    id: 12345,
  };

  test("Component renders the blog's title and author, but does not render its URL or number of likes by default.", () => {
    renderCard(blog, user);

    const title = screen.getByText("test-blog");
    const author = screen.getByText("test-author");
    const urlLink = screen.queryByText("test-url");
    const likes = screen.queryByText(1000);

    expect(title).toBeDefined();
    expect(author).toBeDefined();
    expect(urlLink).toBeNull();
    expect(likes).toBeNull();
  });

  test("Number of likes are shown when the button controlling details has been clicked.", async () => {
    renderCard(blog, user);

    const button = screen.getByText("Show details");
    await u.click(button);

    screen.debug();

    const url = screen.queryByText("test-url");
    const likes = screen.getByText(1000);

    expect(url).toBeDefined();
    expect(likes).toBeDefined();
  });

  test("if the like button is clicked twice, event handler is called twice", async () => {
    const updateBlog = jest.fn();
    renderCard(blog, user, undefined, updateBlog);

    const button = screen.getByText("Show details");
    await u.click(button);
    const likeButton = screen.getByText("▲");
    await u.click(likeButton);
    await u.click(likeButton);

    expect(updateBlog.mock.calls).toHaveLength(2);
  });

  test("Form calls the event handler with the right details when a new blog is created", async () => {
    const newBlog = {
      title: "The Blogfather",
      author: "Mr Blog",
      url: "www.blogdaddy.com",
    };

    const message = {
      error: "",
      success: `${newBlog.title} was added to the database`,
    };

    blogService.create.mockResolvedValue(newBlog);

    renderCreate(newBlog);

    const title = screen.getByPlaceholderText("Blog title");
    const author = screen.getByPlaceholderText("Blog Author");
    const url = screen.getByPlaceholderText("Blog Website");

    const button = screen.getByText("Create");

    await u.type(title, newBlog.title);
    await u.type(author, newBlog.author);
    await u.type(url, newBlog.url);

    await u.click(button);

    await waitFor(() => {
      expect(toggleVisibility.mock.calls).toHaveLength(1);
      expect(setBlogs.mock.calls).toHaveLength(1);
    });

    render(<Message message={message} />);

    const success = screen.getByText(
      `${newBlog.title} was added to the database`
    );

    expect(success).toBeDefined();
  });
});
