import { pgTable, text, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const rateConfigurations = pgTable("rate_configurations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  buyingCurrency: text("buying_currency").notNull(),
  sellingRateSource: text("selling_rate_source").notNull(),
  buyFrom: text("buy_from").notNull(),
  markupType: text("markup_type").notNull(), // 'percentage' or 'flat'
  markupValue: decimal("markup_value", { precision: 10, scale: 2 }).notNull(),
  isActive: boolean("is_active").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const offers = pgTable("offers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  paymentMethod: text("payment_method").notNull(),
  platform: text("platform").notNull(),
  tradeType: text("trade_type").notNull(), // 'buy' or 'sell'
  coinType: text("coin_type").notNull(),
  rateConfigId: integer("rate_config_id").references(() => rateConfigurations.id),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertRateConfigSchema = createInsertSchema(rateConfigurations).omit({
  id: true,
  userId: true,
  createdAt: true,
});

export const insertOfferSchema = createInsertSchema(offers).omit({
  id: true,
  userId: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type RateConfiguration = typeof rateConfigurations.$inferSelect;
export type InsertRateConfiguration = z.infer<typeof insertRateConfigSchema>;
export type Offer = typeof offers.$inferSelect;
export type InsertOffer = z.infer<typeof insertOfferSchema>;
