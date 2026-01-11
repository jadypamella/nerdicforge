# TODO: Shipping Implementation

## Overview

NerdicForge ships premium 3D printed statues from Brazil to customers worldwide.
Need to implement shipping calculation with customs/duties considerations.

---

## Business Context

- **Origin:** Brazil (manufacturing)
- **Company Location:** Sweden (EU)
- **Products:** Heavy statues (1-3kg each)
- **Target Markets:** Sweden, EU, UK, USA, Canada, Rest of World

---

## Shipping Zones to Consider

| Zone | Countries | Est. Shipping (SEK) | Customs? |
|------|-----------|---------------------|----------|
| **1. Sweden** | SE | 99-149 | No |
| **2. Nordics** | NO, DK, FI | 149-249 | No |
| **3. EU** | DE, FR, NL, ES, IT... | 199-349 | No |
| **4. UK** | GB | 299+ | **Yes** (Brexit) |
| **5. Americas** | US, CA | 499+ | **Yes** |
| **6. Rest of World** | Others | 699+ | **Yes** |

---

## Customs & Duties Considerations

### EU (No Customs)
- Products shipped Brazil → Sweden first
- Then distributed within EU
- No customs between EU countries
- Only VAT applies (handled by Stripe Tax)

### UK (Post-Brexit)
- VAT at 20% charged at delivery
- Possible customs duty (2.5-12% depending on product classification)
- Customer pays upon delivery (DDP vs DDU decision needed)

### USA
- No duty under $800 (de minimis threshold)
- Above $800: Customs duty varies
- State sales tax may apply

### Canada
- Duty-free under $20 CAD
- Above: GST (5%) + possible provincial tax + customs duty
- Brokerage fees common

### Other Countries
- Research needed per country
- Default: Customer responsible for import taxes

---

## Shipping Strategy Options

### Option A: DDU (Delivery Duty Unpaid)
```
Pros:
- Lower upfront shipping cost
- Simpler for merchant

Cons:
- Customer surprised by customs fees at delivery
- Bad customer experience
- Potential refused deliveries
```

### Option B: DDP (Delivery Duty Paid)
```
Pros:
- No surprises for customer
- Better experience
- Lower cart abandonment

Cons:
- Higher shipping prices shown
- Need to calculate duties correctly
- More complex implementation
```

### Option C: Hybrid
```
- DDP for EU (no customs anyway)
- DDU for rest of world with clear warning
- Consider: DDP for US orders above $800
```

---

## Implementation Options in Stripe

### 1. Fixed Shipping Rates
```typescript
shipping_options: [
  { shipping_rate_data: { fixed_amount: { amount: 9900 }, display_name: 'Sweden' } },
  { shipping_rate_data: { fixed_amount: { amount: 19900 }, display_name: 'EU' } },
  { shipping_rate_data: { fixed_amount: { amount: 49900 }, display_name: 'International' } },
]
```

### 2. Pre-created Shipping Rates in Dashboard
Create rates in Stripe Dashboard → Products → Shipping rates
Reference by ID in code

### 3. Dynamic Calculation
Integrate with carrier APIs (Postnord, DHL, FedEx)
Calculate based on weight, dimensions, destination

---

## Questions to Decide

- [ ] DDU or DDP for non-EU countries?
- [ ] Free shipping threshold? (e.g., orders over 5000 kr)
- [ ] Which carriers to use? (Postnord, DHL, FedEx?)
- [ ] Ship directly from Brazil or stock in Sweden?
- [ ] Offer expedited shipping options?
- [ ] Include insurance for high-value items?

---

## Next Steps

1. [ ] Decide DDU vs DDP strategy
2. [ ] Research actual shipping costs with carriers
3. [ ] Define final price per zone
4. [ ] Implement in Stripe Checkout
5. [ ] Add customs warning text for non-EU
6. [ ] Test checkout flow with shipping

---

## Useful Resources

- [Stripe Shipping Documentation](https://stripe.com/docs/payments/checkout/shipping)
- [Swedish Customs (Tullverket)](https://www.tullverket.se/)
- [UK HMRC Import Duties](https://www.gov.uk/trade-tariff)
- [US CBP De Minimis](https://www.cbp.gov/trade/basic-import-export)
