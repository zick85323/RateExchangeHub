import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRateConfigSchema, insertOfferSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Rate configuration routes
  app.get("/api/rate-configurations", async (req, res) => {
    try {
      const configs = await storage.getRateConfigurations();
      res.json(configs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch rate configurations" });
    }
  });

  app.get("/api/rate-configurations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const config = await storage.getRateConfiguration(id);
      if (!config) {
        return res.status(404).json({ message: "Rate configuration not found" });
      }
      res.json(config);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch rate configuration" });
    }
  });

  app.post("/api/rate-configurations", async (req, res) => {
    try {
      const validatedData = insertRateConfigSchema.parse(req.body);
      const config = await storage.createRateConfiguration({
        ...validatedData,
        userId: 1, // Default user for demo
      });
      res.json(config);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create rate configuration" });
    }
  });

  app.put("/api/rate-configurations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertRateConfigSchema.partial().parse(req.body);
      const config = await storage.updateRateConfiguration(id, validatedData);
      if (!config) {
        return res.status(404).json({ message: "Rate configuration not found" });
      }
      res.json(config);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update rate configuration" });
    }
  });

  // Offers routes
  app.get("/api/offers", async (req, res) => {
    try {
      const offers = await storage.getOffers();
      res.json(offers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch offers" });
    }
  });

  app.post("/api/offers", async (req, res) => {
    try {
      const validatedData = insertOfferSchema.parse(req.body);
      const offer = await storage.createOffer({
        ...validatedData,
        userId: 1, // Default user for demo
      });
      res.json(offer);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create offer" });
    }
  });

  // Mock external rate API
  app.get("/api/external-rates/:source", async (req, res) => {
    const source = req.params.source;
    const mockRates = {
      binance: 64300000,
      coinbase: 64250000,
      kraken: 64280000,
      bitstamp: 64320000,
    };
    
    const rate = mockRates[source as keyof typeof mockRates] || 64300000;
    res.json({ rate, source, timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}
