import ClassicSendMoney from "./SendMoney/ClassicSendMoney";
import BoxedSendMoney from "./SendMoney/BoxedSendMoney";
import type React from "react";

interface TemplateRegistry {
    [key: string]: {
        id: string;
        name: string;
        component: React.ComponentType<any>;
    }[];
}

export const templateRegistry: TemplateRegistry = {
  "send-money": [
    {
        id: "classic-send-money",
        name: "Classic Send Money",
        component: ClassicSendMoney,
    },
    {
        id: "boxed-send-money",
        name: "Boxed Send Money",
        component: BoxedSendMoney,
    },
  ],
  "withdraw-agent": [],
  "lipa-na-mpesa": [],
}
