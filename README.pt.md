# NerdicForge Local - Stripe Integration do Zero

E-commerce com integração Stripe completa, construída passo-a-passo para aprendizado.

**Stack:**
- Frontend: React + TypeScript + Vite + TailwindCSS
- Backend: Express.js + TypeScript  
- Payments: Stripe Checkout
- State: React Context + localStorage

---

## Fluxo Completo do Checkout (Início ao Fim)

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                           FLUXO COMPLETO DE PAGAMENTO                                    │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│  1. ADICIONAR AO CARRINHO                                                               │
│  ────────────────────────                                                               │
│  ProductCard.tsx                                                                        │
│       │                                                                                  │
│       └──► addToCart(product)                                                           │
│                   │                                                                      │
│                   ▼                                                                      │
│  CartContext.tsx                                                                        │
│       │                                                                                  │
│       ├──► items = [...items, { product, qty: 1 }]                                     │
│       └──► localStorage.setItem('nerdicforge_cart', JSON.stringify(items))             │
│                                                                                          │
│  ═══════════════════════════════════════════════════════════════════════════════════   │
│                                                                                          │
│  2. INICIAR CHECKOUT                                                                    │
│  ───────────────────                                                                    │
│  Cart.tsx                                                                               │
│       │                                                                                  │
│       └──► handleCheckout()                                                             │
│                   │                                                                      │
│                   ▼                                                                      │
│  api.ts → createCheckoutSession(items)                                                  │
│       │                                                                                  │
│       └──► POST http://localhost:3001/create-checkout-session                          │
│            Body: { items: [{ name, price, quantity }] }                                 │
│                                                                                          │
│  ═══════════════════════════════════════════════════════════════════════════════════   │
│                                                                                          │
│  3. BACKEND PROCESSA                                                                    │
│  ───────────────────                                                                    │
│  server/index.ts                                                                        │
│       │                                                                                  │
│       ├──► Valida items                                                                 │
│       │                                                                                  │
│       ├──► Converte para Stripe line_items:                                            │
│       │    {                                                                             │
│       │      price_data: {                                                              │
│       │        currency: 'sek',                                                         │
│       │        unit_amount: 329900,  // centavos (öre)                                 │
│       │        product_data: { name: 'Griffith...' }                                   │
│       │      },                                                                         │
│       │      quantity: 1                                                                │
│       │    }                                                                            │
│       │                                                                                  │
│       └──► stripe.checkout.sessions.create({                                           │
│                payment_method_types: ['card'],                                          │
│                line_items: [...],                                                       │
│                mode: 'payment',                                                         │
│                success_url: 'http://localhost:8080/thank-you?session_id={...}',        │
│                cancel_url: 'http://localhost:8080/cart',                               │
│            })                                                                           │
│                   │                                                                      │
│                   ▼                                                                      │
│            Stripe API retorna:                                                          │
│            {                                                                            │
│              id: 'cs_test_a18ZtTRDi89...',                                             │
│              url: 'https://checkout.stripe.com/c/pay/cs_test_...'                      │
│            }                                                                            │
│                                                                                          │
│  ═══════════════════════════════════════════════════════════════════════════════════   │
│                                                                                          │
│  4. REDIRECT PARA STRIPE                                                                │
│  ───────────────────────                                                                │
│  Cart.tsx                                                                               │
│       │                                                                                  │
│       └──► window.location.href = 'https://checkout.stripe.com/c/pay/cs_test_...'     │
│                                                                                          │
│  ═══════════════════════════════════════════════════════════════════════════════════   │
│                                                                                          │
│  5. USUÁRIO NO STRIPE CHECKOUT                                                          │
│  ─────────────────────────────                                                          │
│  https://checkout.stripe.com (Página do Stripe)                                         │
│       │                                                                                  │
│       ├──► Insere email                                                                 │
│       ├──► Insere número do cartão                                                     │
│       ├──► Stripe valida e processa (3DS se necessário)                                │
│       │                                                                                  │
│       └──► Após sucesso, Stripe redireciona para:                                      │
│            http://localhost:8080/thank-you?session_id=cs_test_a18ZtTRDi89...           │
│                                                                                          │
│  ═══════════════════════════════════════════════════════════════════════════════════   │
│                                                                                          │
│  6. CONFIRMAÇÃO                                                                         │
│  ──────────────                                                                         │
│  ThankYou.tsx                                                                           │
│       │                                                                                  │
│       ├──► Extrai session_id da URL                                                    │
│       ├──► GET /session-status?session_id=cs_test_...                                  │
│       │                                                                                  │
│       ▼                                                                                  │
│  server/index.ts                                                                        │
│       │                                                                                  │
│       └──► stripe.checkout.sessions.retrieve(sessionId)                                │
│            Retorna: { status, payment_status, customer_details, amount_total }         │
│                                                                                          │
│       ▼                                                                                  │
│  ThankYou.tsx                                                                           │
│       │                                                                                  │
│       ├──► payment_status === 'paid' ? Mostra sucesso : Mostra erro                    │
│       └──► clearCart() // Limpa o carrinho                                             │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Como a Sessão Funciona (Sem Autenticação de Usuário)

### Por que NÃO precisa de login/autenticação?

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                     POR QUE NÃO PRECISA DE AUTENTICAÇÃO?                                 │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│  1. O CARRINHO ESTÁ NO CLIENTE                                                          │
│  ───────────────────────────────                                                        │
│  localStorage (Browser)                                                                 │
│       │                                                                                  │
│       └──► nerdicforge_cart = [{ product, quantity }, ...]                             │
│                                                                                          │
│  → Não há "sessão de usuário" no servidor                                              │
│  → O carrinho é armazenado no navegador do cliente                                     │
│  → Cada navegador tem seu próprio carrinho                                             │
│                                                                                          │
│  ═══════════════════════════════════════════════════════════════════════════════════   │
│                                                                                          │
│  2. O PAGAMENTO É DO STRIPE                                                             │
│  ──────────────────────────────                                                         │
│  Stripe Checkout Session                                                                │
│       │                                                                                  │
│       └──► cs_test_a18ZtTRDi89awe8abMUM4fPRzT5AHWaW9sTFeHIfCOyM...                    │
│                                                                                          │
│  → O "session_id" É a identificação da compra                                          │
│  → Stripe armazena: items, preços, status do pagamento                                 │
│  → Depois de pago, consultamos o Stripe para confirmar                                 │
│                                                                                          │
│  ═══════════════════════════════════════════════════════════════════════════════════   │
│                                                                                          │
│  3. EMAIL É COLETADO NO CHECKOUT                                                        │
│  ───────────────────────────────                                                        │
│  Stripe Checkout Page                                                                   │
│       │                                                                                  │
│       └──► Usuário digita email na página do Stripe                                    │
│            → Stripe armazena customer_details.email                                    │
│            → Podemos usar para enviar confirmação                                      │
│                                                                                          │
│  RESULTADO:                                                                             │
│  ──────────                                                                             │
│  ✅ Checkout anônimo (guest checkout)                                                  │
│  ✅ Sem necessidade de cadastro                                                        │
│  ✅ Menor atrito = mais conversões                                                     │
│  ✅ Dados de pagamento seguros no Stripe                                               │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### Tecnologias de Sessão Usadas

| Onde | Tecnologia | O que Armazena | Tempo de Vida |
|------|------------|----------------|---------------|
| **Browser** | localStorage | Carrinho (items) | Permanente até limpar |
| **Stripe** | Checkout Session | Pedido, pagamento | 24 horas |
| **Backend** | Memory (Map) | Order tracking | Enquanto server roda |

---

## Arquitetura do Sistema

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                              ARQUITETURA COMPLETA                                        │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│   FRONTEND (React - localhost:8080)                                                     │
│   ┌─────────────────────────────────────────────────────────────────────────────────┐   │
│   │                                                                                  │   │
│   │   src/                                                                          │   │
│   │   ├── data/products.ts          ← Dados dos produtos (local)                   │   │
│   │   │                                                                              │   │
│   │   ├── context/CartContext.tsx   ← Estado do carrinho (React Context)           │   │
│   │   │       ├── items: CartItem[]                                                 │   │
│   │   │       ├── addToCart()                                                       │   │
│   │   │       ├── removeFromCart()                                                  │   │
│   │   │       ├── updateQuantity()                                                  │   │
│   │   │       └── clearCart()                                                       │   │
│   │   │                                                                              │   │
│   │   ├── lib/api.ts                ← Cliente HTTP para backend                    │   │
│   │   │       ├── createCheckoutSession()                                           │   │
│   │   │       └── getSessionStatus()                                                │   │
│   │   │                                                                              │   │
│   │   └── pages/                                                                    │   │
│   │           ├── Cart.tsx          ← Página do carrinho + botão checkout          │   │
│   │           ├── ThankYou.tsx      ← Confirmação pós-pagamento                    │   │
│   │           ├── Shop.tsx          ← Lista de produtos                            │   │
│   │           └── Product.tsx       ← Detalhe do produto                           │   │
│   │                                                                                  │   │
│   └─────────────────────────────────────────────────────────────────────────────────┘   │
│                                              │                                           │
│                                              │ HTTP (fetch)                              │
│                                              ▼                                           │
│   BACKEND (Express - localhost:3001)                                                    │
│   ┌─────────────────────────────────────────────────────────────────────────────────┐   │
│   │                                                                                  │   │
│   │   server/index.ts                                                               │   │
│   │   │                                                                              │   │
│   │   ├── POST /create-checkout-session                                             │   │
│   │   │       ├── Recebe items do frontend                                          │   │
│   │   │       ├── Converte para Stripe line_items                                   │   │
│   │   │       ├── Cria Checkout Session via Stripe API                             │   │
│   │   │       └── Retorna { url, sessionId }                                        │   │
│   │   │                                                                              │   │
│   │   ├── GET /session-status                                                       │   │
│   │   │       └── Consulta status do pagamento no Stripe                           │   │
│   │   │                                                                              │   │
│   │   └── POST /webhook (futuro)                                                    │   │
│   │           └── Recebe eventos do Stripe (payment succeeded, etc.)                │   │
│   │                                                                                  │   │
│   └─────────────────────────────────────────────────────────────────────────────────┘   │
│                                              │                                           │
│                                              │ HTTPS (Stripe SDK)                        │
│                                              ▼                                           │
│   STRIPE (api.stripe.com + checkout.stripe.com)                                         │
│   ┌─────────────────────────────────────────────────────────────────────────────────┐   │
│   │                                                                                  │   │
│   │   Checkout Session                                                              │   │
│   │   ├── ID: cs_test_...                                                           │   │
│   │   ├── line_items: [{ name, price, qty }]                                        │   │
│   │   ├── payment_status: 'paid' | 'unpaid'                                         │   │
│   │   ├── customer_details: { email, address }                                      │   │
│   │   ├── amount_total: 329900 (öre)                                                │   │
│   │   └── success_url / cancel_url                                                  │   │
│   │                                                                                  │   │
│   │   Hosted Checkout Page                                                          │   │
│   │   ├── Coleta email                                                              │   │
│   │   ├── Coleta cartão (PCI compliant)                                            │   │
│   │   ├── 3D Secure se necessário                                                   │   │
│   │   └── Redireciona para success_url                                              │   │
│   │                                                                                  │   │
│   └─────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Todas as Funções (Código)

### 1. CartContext.tsx - Gerenciamento do Carrinho

```typescript
// Estado inicial - carrega do localStorage
const [items, setItems] = useState<CartItem[]>(() => {
  const stored = localStorage.getItem('nerdicforge_cart');
  return stored ? JSON.parse(stored) : [];
});

// Persiste automaticamente
useEffect(() => {
  localStorage.setItem('nerdicforge_cart', JSON.stringify(items));
}, [items]);

// Funções disponíveis
addToCart(product)           // Adiciona ou incrementa
removeFromCart(productId)    // Remove item
updateQuantity(id, qty)      // Atualiza quantidade
clearCart()                  // Limpa tudo
```

### 2. api.ts - Comunicação com Backend

```typescript
// Cria sessão de checkout
async function createCheckoutSession(items) {
  const response = await fetch('http://localhost:3001/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  });
  return response.json(); // { url, sessionId }
}

// Verifica status do pagamento
async function getSessionStatus(sessionId) {
  const response = await fetch(`http://localhost:3001/session-status?session_id=${sessionId}`);
  return response.json(); // { status, paymentStatus, customerEmail, amountTotal }
}
```

### 3. server/index.ts - Backend

```typescript
// Cria Checkout Session no Stripe
app.post('/create-checkout-session', async (req, res) => {
  const { items } = req.body;
  
  // Converte para formato Stripe
  const lineItems = items.map(item => ({
    price_data: {
      currency: 'sek',
      unit_amount: Math.round(item.price * 100), // Centavos
      product_data: { name: item.name },
    },
    quantity: item.quantity,
  }));

  // Cria a sessão
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${FRONTEND_URL}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${FRONTEND_URL}/cart`,
  });

  res.json({ url: session.url, sessionId: session.id });
});

// Verifica status
app.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  res.json({
    status: session.status,
    paymentStatus: session.payment_status,
    customerEmail: session.customer_details?.email,
    amountTotal: session.amount_total / 100,
  });
});
```

---

## Segurança

| Aspecto | Como é Tratado |
|---------|----------------|
| **Dados do cartão** | Nunca tocam nosso servidor (Stripe hospeda) |
| **STRIPE_SECRET_KEY** | Só no backend, nunca no frontend |
| **CORS** | Backend só aceita requests de localhost:8080 |
| **3D Secure** | Stripe aplica automaticamente quando necessário |
| **PCI Compliance** | Stripe é certificado, nós não precisamos ser |

---

## Como Rodar

```bash
# Terminal 1 - Backend
cd nerdicforge-local
cmd /c "npx tsx server/index.ts"

# Terminal 2 - Frontend
cd nerdicforge-local
cmd /c "npm run dev"
```

**URLs:**
- Frontend: http://localhost:8080
- Backend: http://localhost:3001

**Teste de Pagamento:**
- Cartão: `4242 4242 4242 4242`
- Data: Qualquer futura
- CVC: Qualquer 3 dígitos

---

## O que Acontece Dentro do Stripe

### Timeline de Eventos (Do Seu Pagamento Real)

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                    TIMELINE DE EVENTOS STRIPE (Transação Real)                           │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│   15:06:02 │ POST /v1/checkout/sessions → 200 OK                                        │
│            │ Seu backend chamou Stripe API para criar sessão                            │
│            │ Stripe criou: cs_test_a18ZtTRDi89...                                       │
│            │                                                                             │
│   15:06:02 │ Usuário redirecionado para checkout.stripe.com                             │
│      ↓     │                                                                             │
│            │ [Usuário preenche formulário de pagamento]                                 │
│      ↓     │                                                                             │
│   15:07:44 │ payment_intent.created                                                      │
│            │ PaymentIntent criado: pi_3SoQF2BkBVgkSA9U1Xf0LJ2t                          │
│            │ Amount: 2,799.00 SEK                                                        │
│            │                                                                             │
│   15:07:45 │ charge.succeeded                                                            │
│            │ Charge criado: ch_3SoQF2BkBVgkSA9U1On2EaZw                                 │
│            │ Cartão **** 4242 cobrado com sucesso                                       │
│            │                                                                             │
│   15:07:45 │ payment_intent.succeeded                                                    │
│            │ Pagamento confirmado                                                        │
│            │                                                                             │
│   15:07:45 │ checkout.session.completed                                                  │
│            │ Sessão de checkout finalizada                                              │
│            │ → Stripe envia webhook para seu servidor                                   │
│            │                                                                             │
│   15:07:48 │ charge.updated                                                              │
│            │ Atualização final do charge                                                │
│            │                                                                             │
│   15:07:48 │ Usuário redirecionado para /thank-you?session_id=cs_test_...              │
│            │                                                                             │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### Objetos Criados pelo Stripe

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                         OBJETOS STRIPE CRIADOS                                           │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│   CHECKOUT SESSION (cs_test_...)                                                        │
│   ─────────────────────────────                                                         │
│   │                                                                                      │
│   ├──► PaymentIntent (pi_3SoQF2BkBVgkSA9U1Xf0LJ2t)                                     │
│   │       │                                                                              │
│   │       └──► Charge (ch_3SoQF2BkBVgkSA9U1On2EaZw)                                    │
│   │               │                                                                      │
│   │               └──► Payment Method (pm_1SoQF2BkBVgkSA9UFydwfnVT)                    │
│   │                       ├── Card: **** 4242                                           │
│   │                       ├── Type: Visa credit                                         │
│   │                       ├── Issuer: Stripe Payments UK Limited                        │
│   │                       ├── Fingerprint: rNRPmQL0OXc0j1BE                            │
│   │                       └── Origin: United States                                     │
│   │                                                                                      │
│   └──► Guest Customer (gcus_1SoQGHBkBVgkSA9UA43J8bAA)                                  │
│           ├── Name: Jady                                                                │
│           ├── Email: jadypbs@gmail.com                                                  │
│           └── Country: Sweden                                                           │
│                                                                                          │
│   HIERARQUIA:                                                                           │
│   ───────────                                                                           │
│   Checkout Session                                                                      │
│       └──► PaymentIntent (intenção de cobrança)                                        │
│               └──► Charge (a cobrança real)                                            │
│                       └──► Balance Transaction (movimento no saldo)                    │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### Endpoints da API Stripe Usados

| Endpoint | Método | Quando | O que faz |
|----------|--------|--------|-----------|
| `/v1/checkout/sessions` | POST | Criar checkout | Cria sessão com items e URLs |
| `/v1/checkout/sessions/:id` | GET | Verificar status | Retorna status do pagamento |
| `/v1/payment_intents/:id` | GET | (interno) | Detalhes do payment intent |
| `/v1/charges/:id` | GET | (interno) | Detalhes da cobrança |

---

## Custos e Taxas do Stripe (Exemplo Real)

### Breakdown da Sua Transação

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                         BREAKDOWN DE CUSTOS (Transação Real)                             │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│   VALOR DA VENDA                                                                        │
│   ══════════════                                                                        │
│   Conan the Barbarian (1x)              2,799.00 kr SEK                                │
│                                         ─────────────────                               │
│   TOTAL BRUTO                           2,799.00 kr SEK                                │
│                                                                                          │
│   ═══════════════════════════════════════════════════════════════════════════════════   │
│                                                                                          │
│   TAXAS DO STRIPE                                                                       │
│   ═══════════════                                                                       │
│                                                                                          │
│   Fórmula Stripe Europa:                                                                │
│   ─────────────────────                                                                 │
│   Taxa = 1.5% + 1.80 SEK (cartão europeu)                                              │
│   Taxa = 2.9% + 1.80 SEK (cartão fora da Europa)                                       │
│                                                                                          │
│   Seu cálculo (cartão de teste = europeu):                                             │
│   ─────────────────────────────────────────                                             │
│   2,799.00 × 1.5%  = 41.985 kr                                                         │
│              + 1.80 kr (taxa fixa)                                                      │
│              ─────────────                                                              │
│   Total taxa       = ~43.78 kr (arredondado)                                           │
│                                                                                          │
│   ⚠️ Sua taxa real: 92.77 kr                                                           │
│   Isso indica cartão internacional (2.9% + taxas de câmbio)                            │
│                                                                                          │
│   ═══════════════════════════════════════════════════════════════════════════════════   │
│                                                                                          │
│   RESUMO                                                                                │
│   ══════                                                                                │
│   Valor bruto:        2,799.00 kr                                                      │
│   Taxas Stripe:       -  92.77 kr                                                      │
│                       ───────────────                                                   │
│   VALOR LÍQUIDO:      2,706.23 kr ← O que você recebe                                 │
│                                                                                          │
│   Taxa efetiva:       3.31%                                                            │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### Tabela de Taxas Stripe (Europa)

| Tipo de Cartão | Taxa Percentual | Taxa Fixa |
|----------------|-----------------|-----------|
| **Cartões Europeus Padrão** | 1.5% | 1.80 SEK |
| **Cartões UK** | 2.5% | 1.80 SEK |
| **Cartões Internacionais** | 2.9% | 1.80 SEK |
| **AMEX** | 2.5% | 1.80 SEK |
| **Klarna (BNPL)** | 3.29% | 1.80 SEK |


### Comparação: Quanto Você Perde por Venda

| Preço Produto | Taxa Stripe (~3%) | Você Recebe |
|---------------|-------------------|-------------|
| 2,799 kr | ~84 kr | ~2,715 kr |
| 2,999 kr | ~90 kr | ~2,909 kr |
| 3,299 kr | ~99 kr | ~3,200 kr |

---

## Por que o Stripe Checkout Funciona

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                      POR QUE STRIPE CHECKOUT É CONFIÁVEL                                 │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│   1. PCI DSS LEVEL 1                                                                    │
│   ─────────────────                                                                     │
│   • Maior nível de certificação de segurança de pagamentos                             │
│   • Auditado anualmente por terceiros                                                  │
│   • Dados de cartão nunca tocam seu servidor                                           │
│                                                                                          │
│   2. 3D SECURE 2 (SCA)                                                                  │
│   ────────────────────                                                                  │
│   • Autenticação de 2 fatores automática quando necessário                             │
│   • Compliance com PSD2 (regulação europeia)                                           │
│   • Reduz fraude e chargebacks                                                         │
│                                                                                          │
│   3. VERIFICAÇÕES ANTI-FRAUDE                                                          │
│   ──────────────────────────                                                           │
│   • CVC check: Passed ✓                                                                │
│   • Street check: Passed ✓                                                             │
│   • Zip check: Passed ✓                                                                │
│   • Risk score: 57 (Normal)                                                            │
│                                                                                          │
│   4. STRIPE RADAR                                                                       │
│   ───────────────                                                                       │
│   • Machine learning para detectar fraude                                              │
│   • Bloqueia transações suspeitas automaticamente                                      │
│   • Aprende com milhões de transações globais                                          │
│                                                                                          │
│   5. TOKENIZAÇÃO                                                                        │
│   ─────────────                                                                         │
│   • Número do cartão vira token (pm_1SoQF2...)                                        │
│   • Token só funciona na sua conta Stripe                                              │
│   • Mesmo se vazado, não pode ser usado em outro lugar                                 │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Como Melhorar Esta Integração

### Melhorias Essenciais (Produção)

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                            MELHORIAS PARA PRODUÇÃO                                       │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│   1. WEBHOOKS (CRÍTICO)                                                                 │
│   ─────────────────────                                                                 │
│   Agora: Verificamos status apenas quando usuário volta                                │
│   Problema: Usuário pode fechar o browser antes de voltar                              │
│                                                                                          │
│   SOLUÇÃO:                                                                              │
│   app.post('/webhook', async (req, res) => {                                           │
│     const event = stripe.webhooks.constructEvent(body, sig, secret);                   │
│     if (event.type === 'checkout.session.completed') {                                 │
│       // Atualizar pedido no banco                                                     │
│       // Enviar email de confirmação                                                   │
│       // Atualizar estoque                                                             │
│     }                                                                                   │
│   });                                                                                   │
│                                                                                          │
│   2. BANCO DE DADOS                                                                     │
│   ─────────────────                                                                     │
│   Agora: orders = Map() (memória, perde ao reiniciar)                                  │
│   Solução: PostgreSQL / MongoDB / Supabase                                             │
│                                                                                          │
│   3. VALIDAÇÃO DE PREÇOS NO BACKEND                                                    │
│   ───────────────────────────────────                                                  │
│   Agora: Confiamos no preço enviado pelo frontend                                      │
│   Problema: Usuário pode manipular e pagar menos                                       │
│                                                                                          │
│   SOLUÇÃO:                                                                              │
│   // backend busca preço do banco, não do frontend                                     │
│   const product = await db.products.findById(item.productId);                          │
│   const unit_amount = product.price * 100;                                             │
│                                                                                          │
│   4. STRIPE CUSTOMER                                                                    │
│   ──────────────────                                                                   │
│   Agora: Guest checkout (gcus_...)                                                     │
│   Melhoria: Criar Stripe Customer para recorrência                                     │
│                                                                                          │
│   const customer = await stripe.customers.create({                                     │
│     email: 'jadypbs@gmail.com',                                                        │
│     metadata: { userId: '123' }                                                        │
│   });                                                                                   │
│                                                                                          │
│   5. MAIS MÉTODOS DE PAGAMENTO                                                          │
│   ─────────────────────────────                                                        │
│   payment_method_types: ['card', 'klarna', 'swish', 'ideal']                           │
│                                                                                          │
│   6. STRIPE TAX (AUTOMÁTICO)                                                            │
│   ──────────────────────────                                                           │
│   automatic_tax: { enabled: true }                                                     │
│   → Stripe calcula e cobra VAT automaticamente                                         │
│                                                                                          │
│   7. EMAILS DE CONFIRMAÇÃO                                                              │
│   ────────────────────────                                                             │
│   • Stripe pode enviar recibos automáticos                                             │
│   • Ou integrar com SendGrid/Resend para customizado                                   │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### Prioridade de Implementação

| # | Melhoria | Impacto | Esforço |
|---|----------|---------|---------|
| 1 | Webhooks | 🔴 Crítico | Médio |
| 2 | Validação de preços | 🔴 Crítico | Baixo |
| 3 | Banco de dados | 🟡 Alto | Médio |
| 4 | Stripe Tax | 🟡 Alto | Baixo |
| 5 | Mais payment methods | 🟢 Médio | Baixo |
| 6 | Stripe Customer | 🟢 Médio | Baixo |
| 7 | Emails automáticos | 🟢 Médio | Médio |

---

## VAT e Impostos

### Situação Atual: Sem VAT Automático

```
Produto: 2,799.00 kr
VAT:     Não calculado/cobrado separadamente
```

### Com Stripe Tax (Recomendado)

```typescript
const session = await stripe.checkout.sessions.create({
  // ...
  automatic_tax: { enabled: true },
  customer_update: { address: 'auto' },
});
```

**Resultado:**
```
Produto base:  2,239.20 kr
VAT (25%):       559.80 kr
TOTAL:         2,799.00 kr

Stripe Tax identifica país do cliente e aplica taxa correta:
- Suécia: 25%
- Alemanha: 19%
- EUA: 0% (se B2C digital)
```

### Custo do Stripe Tax

| Modelo | Preço |
|--------|-------|
| Pay-as-you-go (No-code) | 0.5% da transação |
| Pay-as-you-go (API) | $0.50 por transação |
| Tax Complete | A partir de $90/mês |

---

## Resumo: Custos Totais de uma Venda

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                         CUSTOS TOTAIS DE UMA VENDA                                       │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│   Exemplo: Venda de 2,799.00 kr para cliente na Suécia                                  │
│                                                                                          │
│   RECEITA BRUTA                           2,799.00 kr                                   │
│                                                                                          │
│   DEDUÇÕES:                                                                             │
│   ─────────                                                                             │
│   Stripe Processing (1.5% + 1.80)         -  43.79 kr                                  │
│   Stripe Tax (se usar, 0.5%)              -  14.00 kr                                  │
│   VAT a recolher (25%)                    - 559.80 kr                                  │
│                                           ────────────                                  │
│   RECEITA LÍQUIDA                         2,181.41 kr                                  │
│                                                                                          │
│   % Retido em taxas:                      ~22% (inclui VAT)                            │
│   % Retido sem VAT:                       ~2.1%                                        │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```
