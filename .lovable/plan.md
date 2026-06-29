# Plano: aumentar conversão do Postviral.AI

Auditei o site (landing, pricing, geradores, fluxo de onboarding) com olhar de growth/CRO para SaaS de criadores. Abaixo, o que eu mudaria — agrupado por **impacto vs esforço**, do mais alto para o mais baixo.

---

## 🔥 Alto impacto, baixo esforço (fazer primeiro)

### 1. Prova de valor instantânea — "demo sem cadastro"
Hoje o visitante precisa criar conta para ver a IA funcionando. Isso mata 60–80% das conversões.
- Adicionar na home um **mini-gerador interativo** (1 geração grátis sem login, rate-limited por IP).
- Após gerar, mostrar resultado + CTA "criar conta para salvar e gerar mais 4 grátis".

### 2. Hero com vídeo/GIF do produto rodando
A imagem estática do dashboard converte muito menos que ver a IA gerando texto em tempo real.
- Trocar a screenshot do hero por um **loop de 8–12s** mostrando: digitar nicho → IA escrevendo roteiro → resultado pronto.
- Manter mockup como fallback no mobile.

### 3. Pricing — corrigir fricção
- **Destacar o ROI**, não a feature: "100 roteiros virais por R$ 0,37 cada" em vez de só "100 gerações".
- Adicionar **garantia de 7 dias** ("não gostou? devolvemos") em todos os planos pagos — reduz objeção de cartão.
- Mostrar **economia em R$** no toggle anual ("Economize R$ 75/ano"), não só "2 meses grátis".
- Remover o plano Premium do destaque visual ou tornar "ilimitado" mais concreto ("até 500/mês" — ilimitado real assusta).

### 4. Checkout — integrar Cakto (já conversamos)
Sem pagamento real, não há venda. Esse é o gargalo #1.

### 5. Social proof real e verificável
- Substituir avatares Pravatar por **prints reais de DMs/comentários** de clientes (ou criar 3–5 beta testers para gerar).
- Adicionar **logos de marcas/criadores** que usam ("Usado por +X criadores", contador dinâmico).
- Trocar o link "ver resultado" placeholder por **prints reais de posts virais** gerados pela ferramenta (com métricas: "Reel com 240k views usando este roteiro").

---

## 🎯 Alto impacto, médio esforço

### 6. Onboarding orientado a resultado
Hoje o usuário cria conta e cai num dashboard vazio. Mudar para:
- **Wizard de 3 passos** no primeiro login: nicho → tom de voz → primeiro objetivo
- Gerar **1 roteiro automaticamente** no fim do wizard ("aqui está seu primeiro roteiro viral")
- Mostrar progresso: "você já usou 1/10 créditos — gere mais 9 e veja o poder completo"

### 7. Página de comparação Postviral vs alternativas
Criadores comparam com ChatGPT, Copy.ai, etc. Criar `/vs/chatgpt`:
- "Por que o ChatGPT genérico não gera virais"
- Tabela comparativa (foco em PT-BR, hooks brasileiros, formato pronto p/ Reels)

### 8. Páginas SEO por nicho/uso
Cada uma vira porta de entrada de Google:
- `/roteiros-para-reels`
- `/carrossel-instagram-afiliados`
- `/conteudo-viral-infoprodutor`
- `/scripts-tiktok-emagrecimento` (por nicho top)

Cada página: H1 com keyword, exemplo gerado pela IA, depoimento do nicho, CTA.

### 9. Bloco "antes/depois"
Mostrar lado a lado:
- **Sem Postviral**: roteiro genérico (cinza, sem hook)
- **Com Postviral**: roteiro com hook forte, cena a cena, CTA

Visual extremamente persuasivo, fácil de fazer.

### 10. Urgência/escassez ética
- "Oferta de lançamento: 30% off nos 3 primeiros meses (válido até [data])"
- Banner sutil no topo da landing

---

## 📈 Médio impacto, baixo esforço

### 11. CTA flutuante no scroll
Botão "Começar grátis" fixo no canto inferior depois que o usuário rolou 50% da página.

### 12. FAQ expandido com objeções reais
Adicionar perguntas que travam venda:
- "Posso cancelar quando quiser?"
- "A IA copia conteúdo de outros?"
- "Funciona para meu nicho específico?"
- "Os roteiros são em português do Brasil?"
- "Posso usar para clientes (agência)?"

### 13. Exit-intent popup
Quando o mouse sair pela parte de cima: "Espera! Leve 5 roteiros grátis no seu e-mail" → captura lead.

### 14. Footer com selos de confiança
- "Pagamento seguro via Cakto"
- "Dados protegidos LGPD"
- "Cancele quando quiser"
- "Suporte em PT-BR"

### 15. Página de afiliados
Criadores adoram divulgar o que usam. `/afiliados` com 30–40% recorrente atrai tráfego orgânico de graça.

---

## 🧪 Médio impacto, médio esforço

### 16. Sistema de referral embutido
"Indique um amigo, ganhe 10 créditos extras quando ele assinar."

### 17. Email marketing pós-cadastro
Sequência de 5 e-mails (dia 0, 1, 3, 5, 7):
- Boas-vindas + tutorial
- "3 hooks que viralizaram essa semana"
- Caso de sucesso de cliente
- Lembrete de upgrade (créditos acabando)
- Última chance / desconto

### 18. Dashboard com "métricas vaidade"
Mostrar para o usuário logado:
- "Você já gerou 47 roteiros"
- "Estimativa de tempo economizado: 23 horas"
- "Compartilhe sua conquista" (gera card pro Instagram stories)

Aumenta retenção e gera marketing orgânico.

---

## 🚨 Problemas atuais que estão sangrando conversão

1. **Sem pagamento ativo** → impossível vender
2. **Sem demo livre** → exige fé cega antes do cadastro
3. **Depoimentos com avatar Pravatar** → batem como falsos, derrubam credibilidade
4. **"Ver resultado" leva pra link quebrado** → quebra confiança
5. **Premium "ilimitado"** sem definição assusta compradores sérios
6. **Sem garantia** em nenhum plano → maior objeção de cartão
7. **CTA do hero não menciona "grátis"** com força suficiente

---

## Sugestão de sequência de implementação

**Sprint 1 (essencial p/ vender):**
- Cakto integrado (checkout funcionando)
- Demo sem cadastro no hero
- Garantia 7 dias nos planos
- Substituir depoimentos por reais (ou betar com 3 pessoas reais primeiro)

**Sprint 2 (otimização):**
- Vídeo/GIF no hero
- Wizard de onboarding
- FAQ expandido
- Exit-intent popup

**Sprint 3 (escala):**
- Páginas SEO por nicho
- Sistema de afiliados
- Email marketing
- Página de comparação

---

## Pergunta antes de implementar

Quer que eu implemente já a **Sprint 1** completa nessa próxima rodada (com prioridade no checkout Cakto + demo grátis no hero + garantia), ou prefere que eu comece por algum item específico da lista?
