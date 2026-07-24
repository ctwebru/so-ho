// Соседский клуб — модель подписки для семьи
// Один владелец платит за всех. Цена убывает с каждым следующим членом семьи.

export const FAMILY_TIER_PRICES = [990, 790, 590, 490, 390] as const;
export const MAX_FAMILY_MEMBERS = FAMILY_TIER_PRICES.length;

export type FamilyRelation = "owner" | "spouse" | "child" | "parent" | "friend";

export type FamilyMember = {
  id: string;
  name: string;
  phone?: string; // если есть — полноценный пользователь ЛК
  relation: FamilyRelation;
  birthYear?: number;
  addedAt: string; // ISO
  // индивидуальная цена члена семьи (по позиции добавления)
  monthlyPrice: number;
};

export const RELATION_LABEL: Record<FamilyRelation, string> = {
  owner: "Владелец",
  spouse: "Супруг(а)",
  child: "Ребёнок",
  parent: "Родитель",
  friend: "Друг",
};

export const priceForPosition = (index: number) =>
  FAMILY_TIER_PRICES[Math.min(index, FAMILY_TIER_PRICES.length - 1)];

export const totalFamilyPrice = (members: { monthlyPrice: number }[]) =>
  members.reduce((sum, m) => sum + m.monthlyPrice, 0);

// Мок начальной семьи
export const INITIAL_FAMILY: FamilyMember[] = [
  {
    id: "m-owner",
    name: "Анна Морозова",
    phone: "+7 (999) 000-00-00",
    relation: "owner",
    birthYear: 1991,
    addedAt: new Date().toISOString(),
    monthlyPrice: FAMILY_TIER_PRICES[0],
  },
];
