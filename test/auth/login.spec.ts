import app from "../../src/app";
import { prismaMock } from "../prisma";
import request from "supertest";
import * as argonLib from "../../src/lib/argon";

const reqBody = {
  email: "8aV4w@example.com",
  password: "password123",
};


describe("POST /auth/login", () => {
  it("should login successfully", async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce({
      ...reqBody,
      id: 1,
      name: "John Doe",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    jest.spyOn(argonLib, "comparePassword").mockResolvedValueOnce(true);

    const response = await request(app).post("/auth/login").send(reqBody);

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined;
  });

  it("should return error if email not found", async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(null);

    const response = await request(app).post("/auth/login").send(reqBody);

    expect(response.status).toBe(400);
    expect(response.text).toBe("Invalid email address");
  });

  it("should return error if password is incorrect", async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce({
      ...reqBody,
      id: 1,
      name: "John Doe",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    jest.spyOn(argonLib, "comparePassword").mockResolvedValueOnce(false);

    const response = await request(app).post("/auth/login").send(reqBody);

    expect(response.status).toBe(400);
    expect(response.text).toBe("Incorrect password");
  });
});
