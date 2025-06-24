import { users, rateConfigurations, offers, type User, type InsertUser, type RateConfiguration, type InsertRateConfiguration, type Offer, type InsertOffer } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getRateConfigurations(userId?: number): Promise<RateConfiguration[]>;
  getRateConfiguration(id: number): Promise<RateConfiguration | undefined>;
  createRateConfiguration(config: InsertRateConfiguration & { userId: number }): Promise<RateConfiguration>;
  updateRateConfiguration(id: number, config: Partial<RateConfiguration>): Promise<RateConfiguration | undefined>;
  
  getOffers(userId?: number): Promise<Offer[]>;
  getOffer(id: number): Promise<Offer | undefined>;
  createOffer(offer: InsertOffer & { userId: number }): Promise<Offer>;
  updateOffer(id: number, offer: Partial<Offer>): Promise<Offer | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private rateConfigurations: Map<number, RateConfiguration>;
  private offers: Map<number, Offer>;
  private currentUserId: number;
  private currentRateConfigId: number;
  private currentOfferId: number;

  constructor() {
    this.users = new Map();
    this.rateConfigurations = new Map();
    this.offers = new Map();
    this.currentUserId = 1;
    this.currentRateConfigId = 1;
    this.currentOfferId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getRateConfigurations(userId?: number): Promise<RateConfiguration[]> {
    const configs = Array.from(this.rateConfigurations.values());
    if (userId) {
      return configs.filter(config => config.userId === userId);
    }
    return configs;
  }

  async getRateConfiguration(id: number): Promise<RateConfiguration | undefined> {
    return this.rateConfigurations.get(id);
  }

  async createRateConfiguration(config: InsertRateConfiguration & { userId: number }): Promise<RateConfiguration> {
    const id = this.currentRateConfigId++;
    const rateConfig: RateConfiguration = {
      ...config,
      id,
      createdAt: new Date(),
    };
    this.rateConfigurations.set(id, rateConfig);
    return rateConfig;
  }

  async updateRateConfiguration(id: number, config: Partial<RateConfiguration>): Promise<RateConfiguration | undefined> {
    const existing = this.rateConfigurations.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...config };
    this.rateConfigurations.set(id, updated);
    return updated;
  }

  async getOffers(userId?: number): Promise<Offer[]> {
    const allOffers = Array.from(this.offers.values());
    if (userId) {
      return allOffers.filter(offer => offer.userId === userId);
    }
    return allOffers;
  }

  async getOffer(id: number): Promise<Offer | undefined> {
    return this.offers.get(id);
  }

  async createOffer(offer: InsertOffer & { userId: number }): Promise<Offer> {
    const id = this.currentOfferId++;
    const newOffer: Offer = {
      ...offer,
      id,
      createdAt: new Date(),
    };
    this.offers.set(id, newOffer);
    return newOffer;
  }

  async updateOffer(id: number, offer: Partial<Offer>): Promise<Offer | undefined> {
    const existing = this.offers.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...offer };
    this.offers.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
