import ClassicSendMoney from "./SendMoney/ClassicSendMoney";
import ClassicWithdrawAgent from "./WithdrawAgent/ClassicWithdrawAgent";
import BoxedSendMoney from "./SendMoney/BoxedSendMoney";
import BoxedWithdrawAgent from "./WithdrawAgent/BoxedWithdrawAgent";
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
  "withdraw-agent": [
    {
      id: "classic-withdraw-agent",
      name: "Classic Withdraw Agent",
      component: ClassicWithdrawAgent,
    },
    {
      id: "boxed-withdraw-agent",
      name: "Boxed Withdraw Agent",
      component: BoxedWithdrawAgent,
    },
  ],
  "lipa-na-mpesa": [],
}
