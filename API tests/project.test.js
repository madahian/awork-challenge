const api = require("../api");

describe("Project CRUD operations", () => {
  let projectId;

  test("Create a project", async () => {
    const response = await api.post("/projects", {
      name: "Website Design",
      isPrivate: false,
      description:
        "Sitemap, design, assets and implementation of the new online presence.",
      startDate: "2022-03-01T00:00:00Z",
      dueDate: "2022-05-01T00:00:00Z",
      timeBudget: 576000,
      isBillableByDefault: true,
    });
    expect(response.status).toBe(200);
    expect(response.data.name).toBe("Website Design");
    projectId = response.data.id;
  });

  test("Fetch the created project", async () => {
    const response = await api.get(`/projects/${projectId}`);
    expect(response.status).toBe(200);
    expect(response.data.name).toBe("Website Design");
    expect(response.data.description).toBe(
      "Sitemap, design, assets and implementation of the new online presence."
    );
  });

  test("Update the project", async () => {
    const response = await api.put(`/projects/${projectId}`, {
      name: "Updated Test Project",
    });
    expect(response.status).toBe(200);
    expect(response.data.name).toBe("Updated Test Project");
  });

  test("Fetch the updated project", async () => {
    const response = await api.get(`/projects/${projectId}`);
    expect(response.status).toBe(200);
    expect(response.data.name).toBe("Updated Test Project");
  });

  test("Delete the project", async () => {
    const response = await api.post(`/projects/${projectId}/delete`, {
      deleteTimeTrackings: true,
    });
    expect(response.status).toBe(204);
  });

  test("Ensure the project has been deleted", async () => {
    try {
      await api.get(`/projects/${projectId}`);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });
});
