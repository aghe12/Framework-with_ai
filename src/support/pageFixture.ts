import { Page } from "@playwright/test";
import { Logger } from "winston";
import CartPage from "../pages/cartPage";
import HomePage from "../pages/homePage";

export const fixture = {
    page: undefined as Page,
    logger: undefined as Logger,
    testData: {} as Record<string, any>,   // scenario-level test data
    env: "" as string,                     // ✅ environment (staging, prod, etc.)
    subStepLogger: undefined as any,
    pages: {} as {
        cartPage: CartPage;
        homePage: HomePage;
        [key: string]: any;
    },
};
