import { Page } from "@playwright/test";
import { Logger } from "winston";
import CartPage from "../pages/cartPage";

export const fixture = {
    page: undefined as Page,
    logger: undefined as Logger,
    testData: {} as Record<string, any>,   // scenario-level test data
    env: "" as string,                     // ✅ environment (staging, prod, etc.)
    subStepLogger: undefined as any,
    pages: {} as {
        cartPage: CartPage;
        [key: string]: any;
    },
};
