import app from "../../src/app";
import { prismaMock } from "../prisma";
import request from "supertest";

const reqBody = {
  name: "John Doe",
  email: "8aV4w@example.com",
  password: "password123",
};



describe("POST /auth/register", () => {
  it("should register successfully", async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(null);

    prismaMock.user.create.mockResolvedValueOnce({
      ...reqBody,
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await request(app).post("/auth/register").send(reqBody);

    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined;
  });

  it("should return error if email already exists", async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce({
      ...reqBody,
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await request(app).post("/auth/register").send(reqBody);

    expect(response.status).toBe(400);
    expect(response.text).toBe("Email already exists");
  });
});
