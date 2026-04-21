import { useState } from 'react';
import './FashionHub.css';

/* ══════════════════════════════════════════════════
   FEMININO — 8 situações × 5 looks (mapeiam 1:1 para estilo)
══════════════════════════════════════════════════ */
const SCENARIOS_FEM = [
  {
    id: 1,
    context: '🎂 Aniversário num restaurante chique à noite',
    question: 'Você foi convidada para um jantar de aniversário num restaurante sofisticado. Qual look você escolhe?',
    outfits: [
      { style: 'classic',    label: 'Clássico Intemporal',  emoji: '🖤👠💍', items: ['Vestido midi preto justo', 'Scarpin nude de couro', 'Brinco de pérola', 'Bolsa clutch dourada'],               vibe: 'Elegante e certeiro' },
      { style: 'glam',       label: 'Red Carpet Moment',   emoji: '✨🥂👑', items: ['Body metálico dourado', 'Calça lápis preta', 'Salto stiletto', 'Brinco maxi chandeliers'],              vibe: 'Impactante e glamouroso' },
      { style: 'romantic',   label: 'Romântico Delicado',  emoji: '🌸👗🌷', items: ['Vestido floral midi com babados', 'Sapatilha rosê', 'Bolsa mini arredondada', 'Tiara discreta'],        vibe: 'Delicado e feminino' },
      { style: 'minimal',    label: 'Clean & Sofisticado', emoji: '⬜🤍🕊️', items: ['Calça reta off-white', 'Blusa de seda branca', 'Mule bege', 'Sem acessório exagerado'],                vibe: 'Simples, mas luxuoso' },
      { style: 'boho',       label: 'Boho Chic Noturno',   emoji: '🍂🥻🌙', items: ['Saia longa de cetim terrosa', 'Cropped veludo bordô', 'Ankle boot de couro', 'Colar longo dourado'], vibe: 'Despojado com charme' },
    ],
  },
  {
    id: 2,
    context: '☀️ Tarde livre de sábado na cidade',
    question: 'É sábado e você tem o dia livre para sair. O que você veste?',
    outfits: [
      { style: 'streetwear', label: 'Full Street',     emoji: '🧢👟🖤', items: ['Moletom oversized gráfico', 'Cargo pants caqui', 'Tênis chunky', 'Boné snapback'],                          vibe: 'Confortável e atitude' },
      { style: 'minimal',    label: 'Minimal Weekend', emoji: '👖🤍🛍️', items: ['Jeans reta slim', 'Camiseta básica branca', 'Tênis branco limpo', 'Tote bag de lona'],                     vibe: 'Fácil, leve e clean' },
      { style: 'boho',       label: 'Boho Day Out',    emoji: '🌿🌻👒', items: ['Saia midi floral com camadas', 'Blusa de linho bege', 'Sandália rasteira com franjas', 'Chapéu de palha'], vibe: 'Livre e criativa' },
      { style: 'romantic',   label: 'Doce & Casual',   emoji: '🎀🌸👟', items: ['Vestido florido curto com laço', 'Tênis chunky pastel', 'Bolsinha couro pink', 'Laço de cetim'],         vibe: 'Fofa e leve' },
      { style: 'sporty',     label: 'Sporty Casual',   emoji: '🏃‍♀️💪🎧', items: ['Legging de compressão camuflada', 'Moletom cropped', 'Tênis de corrida colorido', 'Boné + fone BT'],  vibe: 'Conforto em movimento' },
    ],
  },
  {
    id: 3,
    context: '🎵 Festival de música ao ar livre',
    question: 'É dia de festival! Sol, shows incríveis e muita gente estilosa. O que você veste?',
    outfits: [
      { style: 'boho',       label: 'Festival Boho Rainha', emoji: '🌺🪄🍃', items: ['Top cropped com bordados', 'Saia midi de filó e renda', 'Bota de couro cano longo', 'Colar étnico em camadas'], vibe: 'Espírito livre e poético' },
      { style: 'streetwear', label: 'Festival Street',      emoji: '🕶️⚡🎒', items: ['Top bandeau', 'Calça cargo colorida', 'Tênis plataforma', 'Óculos espelhados + pochete'],                   vibe: 'Hype e despojado' },
      { style: 'glam',       label: 'Glamour ao Sol',       emoji: '✨🪩💫', items: ['Top com paetê prateado', 'Short de couro', 'Sandália flatform metalizada', 'Óculos oversized dourados'],     vibe: 'Brilhando na multidão' },
      { style: 'romantic',   label: 'Floral Festival',      emoji: '🌼👗🌷', items: ['Vestido floralinho com lastex', 'Rasteirinha caramelo', 'Coroa de flores de tecido', 'Bolsinha crochê'],    vibe: 'Delicada entre as flores' },
      { style: 'minimal',    label: 'Minimal Fest',         emoji: '🤍🕊️☀️', items: ['Jeans destroyed', 'Camiseta branca cropped', 'Tênis All Star branco', 'Óculos de sol clássico'],           vibe: 'Simples e chic' },
    ],
  },
  {
    id: 4,
    context: '💼 Primeiro dia num trabalho/estágio',
    question: 'Primeiro dia no trabalho (empresa criativa, semiprofissional). Você quer causar boa impressão sem perder seu estilo.',
    outfits: [
      { style: 'classic',    label: 'Poder Clássico',           emoji: '💼👔🏆', items: ['Blazer estruturado bege', 'Calça de alfaiataria preta', 'Scarpin baixo', 'Bolsa structured de couro'], vibe: 'Profissional e imponente' },
      { style: 'minimal',    label: 'Effortless Pro',           emoji: '🤍⬜💡', items: ['Calça wide reta cinza', 'Camiseta qualidade gola canoa', 'Tênis branco clean', 'Mochila minimalista'],  vibe: 'Confiante sem esforço' },
      { style: 'romantic',   label: 'Delicada & Profissional',  emoji: '🌸💕📎', items: ['Blusa com renda na gola', 'Saia midi plissada rosê', 'Scarpin nude', 'Brinco botão pérola'],           vibe: 'Feminina e segura' },
      { style: 'streetwear', label: 'Creative Director Vibe',   emoji: '🧢🎨🔥', items: ['Alfaiataria + tênis chunky', 'Camiseta de banda + blazer', 'Boné e óculos', 'Mochila de grife'],       vibe: 'Criativa e ousada' },
      { style: 'boho',       label: 'Artística & Autêntica',    emoji: '🍂🎨🌿', items: ['Calça linho larga caramelo', 'Blusa de seda estampada', 'Sandália rasteira', 'Argola longa'],           vibe: 'Única e autêntica' },
    ],
  },
  {
    id: 5,
    context: '🏋️ Tarde de treino / academia',
    question: 'Hora do treino! Você vai à academia ou fazer um esporte. O que você usa?',
    outfits: [
      { style: 'sporty',     label: 'Performance Total',  emoji: '🏅💦🏃', items: ['Legging compressão estampada', 'Top dry-fit', 'Tênis de corrida técnico', 'Pochete esportiva'],       vibe: 'Foco e desempenho' },
      { style: 'streetwear', label: 'Street Gym',         emoji: '🧢👟🔥', items: ['Shorts cargo', 'Oversized hoodie cortado', 'Tênis retro Jordan', 'Boné e meião alto'],               vibe: 'Estilo até na academia' },
      { style: 'minimal',    label: 'Clean Workout',      emoji: '🤍⬛🧘', items: ['Legging preta simples', 'Camiseta branca básica', 'Tênis all white', 'Sem acessórios'],               vibe: 'Limpo e funcional' },
      { style: 'glam',       label: 'Gym Glam',           emoji: '✨💄💪', items: ['Set treino com recortes', 'Tênis plataforma chunky', 'Acessórios dourados', 'Maquiagem leve'],        vibe: 'Linda até suando' },
      { style: 'romantic',   label: 'Pilates Princess',   emoji: '🌸🎀🧘‍♀️', items: ['Legging floral pastel', 'Top franzido rosa', 'Tênis pastel', 'Tiara fofinha'],                       vibe: 'Delicada em movimento' },
    ],
  },
  {
    id: 6,
    context: '☕ Brunch com as amigas num café bonito',
    question: 'Domingo de brunch num café instagramável. O que você veste?',
    outfits: [
      { style: 'romantic',   label: 'Cottagecore Chic',  emoji: '🌸🫖💐', items: ['Vestido de manga bufante', 'Sandália couro caramelo', 'Bolsa de palha', 'Brinco de florzinha'],      vibe: 'Doce e sonhadora' },
      { style: 'minimal',    label: 'Parisian Casual',   emoji: '🥐☕🤍', items: ['Jeans cintura alta', 'Blusa de algodão listrada', 'Mocassim de couro', 'Óculos finos'],              vibe: 'Chic sem esforço' },
      { style: 'classic',    label: 'Sunday Best',       emoji: '🍵💎👜', items: ['Saia midi plissada caramelo', 'Blusa de crepe', 'Scarpin de camurça', 'Bolsa estruturada'],          vibe: 'Polida e impecável' },
      { style: 'glam',       label: 'Influencer Brunch', emoji: '📸✨👁️', items: ['Co-ord com estampa bold', 'Mule de salto', 'Óculos oversized', 'Bolsa de grife destaque'],           vibe: 'Foto-pronta sempre' },
      { style: 'boho',       label: 'Boho Sunday',       emoji: '🌿🧃🕊️', items: ['Conjunto de linho solto', 'Rasteirinha trançada', 'Acessórios de pedra', 'Chapéu bucket de pano'], vibe: 'Relaxada e única' },
    ],
  },
  {
    id: 7,
    context: '🌊 Dia de praia ou piscina',
    question: 'Dia de sol, praia ou clube! Como você chega?',
    outfits: [
      { style: 'sporty',   label: 'Beach Athlete',  emoji: '🏄‍♀️🌊🏅', items: ['Maiô alta performance', 'Shorts esportivo', 'Tênis aquático', 'Boné + protetor solar'],                vibe: 'Pronta para o esporte' },
      { style: 'glam',     label: 'Riviera Chic',   emoji: '🌞👙✨',   items: ['Biquíni com detalhes dourados', 'Saída transparente', 'Sandália flatform', 'Chapéu aba larga'], vibe: 'Deusa da Riviera' },
      { style: 'boho',     label: 'Boho Beach',     emoji: '🐚🌺🌊',   items: ['Biquíni de crochê', 'Saída bordada', 'Sandália rasteira', 'Acessórios de conchas'],           vibe: 'Filha do mar' },
      { style: 'minimal',  label: 'Minimal Coast',  emoji: '🤍🌊⬛',   items: ['Biquíni triangular preto', 'Short branco liso', 'Rasteirinha nude', 'Sacola palha clean'],    vibe: 'Elegante sem exagerar' },
      { style: 'romantic', label: 'Beach Romantic', emoji: '🌸🌊🌷',   items: ['Biquíni floral', 'Saída de tule rosê', 'Rasteirinha de flores', 'Canga estampa pastel'],      vibe: 'Delicada ao sol' },
    ],
  },
  {
    id: 8,
    context: '🎓 Formatura ou evento de gala',
    question: 'Grande momento — formatura, casamento ou baile. Qual é o seu look dos sonhos?',
    outfits: [
      { style: 'glam',     label: 'Diva da Noite',       emoji: '✨🥂👑', items: ['Vestido longo brilho com fenda', 'Stiletto', 'Brinco de cristal', 'Clutch metalizada'],          vibe: 'Protagonista da noite' },
      { style: 'classic',  label: 'Elegância Atemporal', emoji: '💎👗🕊️', items: ['Vestido A-line crepe preto/navy', 'Scarpin de couro', 'Colar de pérolas', 'Luva de renda'],    vibe: 'Clássica e inesquecível' },
      { style: 'romantic', label: 'Conto de Fadas',      emoji: '🌸🎀🌹', items: ['Vestido volumoso flores 3D', 'Scarpin rosa', 'Coque com flores e laço', 'Bolsa minaudière'],    vibe: 'Princesa da noite' },
      { style: 'minimal',  label: 'Minimal Luxo',        emoji: '🤍⚡💫', items: ['Slip dress satinado off-white', 'Sandália de tiras finas', 'Brinco geométrico', 'Bolsa minimal'], vibe: 'Luxo silencioso' },
      { style: 'boho',     label: 'Noiva Boho',          emoji: '🌿🌸🕊️', items: ['Vestido fluido renda bufante', 'Sandália bordada', 'Coroa de flores naturais', 'Argola longa'],  vibe: 'Livre e mágica' },
    ],
  },
];

/* ══════════════════════════════════════════════════
   MASCULINO — 8 situações × 5 looks
══════════════════════════════════════════════════ */
const SCENARIOS_MASC = [
  {
    id: 1,
    context: '🎂 Jantar de aniversário num restaurante chique',
    question: 'Você foi convidado para um jantar de aniversário num restaurante sofisticado. Qual look você escolhe?',
    outfits: [
      { style: 'classic_m', label: 'Terno Impecável',      emoji: '🤵🖤💍', items: ['Terno navy ou grafite', 'Camisa branca + gravata discreta', 'Derby de couro preto', 'Cinto estruturado'],      vibe: 'Elegante e imponente' },
      { style: 'minimal_m', label: 'Minimal Noturno',      emoji: '⬛🤍👟', items: ['Calça slim preta', 'Camiseta de qualidade gola alta', 'Mocassim de couro', 'Sem acessórios exagerados'],       vibe: 'Sofisticado sem esforço' },
      { style: 'smart_m',   label: 'Smart & Moderno',      emoji: '👔👞✨', items: ['Blazer bege + calça slim', 'Camisa Oxford aberta no colarinho', 'Loafer com penny', 'Relógio discreto'],       vibe: 'Arrumado e descontraído' },
      { style: 'street_m',  label: 'Street Formal',        emoji: '🧢🔥👟', items: ['Terno desconstruído + camiseta gráfica', 'Calça de alfaiataria', 'Chunky sneaker', 'Bag a tiracolo'],        vibe: 'Fashion e ousado' },
      { style: 'boho_m',    label: 'Alternativo & Charmoso', emoji: '🍂🌿🧡', items: ['Calça wide de linho bege', 'Camisa de botão solta de seda', 'Sandália de couro', 'Colar étnico discreto'],  vibe: 'Único e autêntico' },
    ],
  },
  {
    id: 2,
    context: '☀️ Tarde livre de sábado na cidade',
    question: 'É sábado e você tem o dia todo livre. O que você veste para sair?',
    outfits: [
      { style: 'street_m',  label: 'Full Street',       emoji: '🧢👟🖤', items: ['Moletom oversized gráfico', 'Cargo pants caqui', 'Chunky sneaker', 'Boné + óculos'],                       vibe: 'Atitude e conforto' },
      { style: 'minimal_m', label: 'Minimal Weekend',   emoji: '👖🤍☀️', items: ['Jeans slim reta', 'Camiseta branca básica premium', 'Tênis branco limpo', 'Tote bag'],                      vibe: 'Clean e descomplicado' },
      { style: 'smart_m',   label: 'Smart Casual',      emoji: '🩳👕👟', items: ['Short chino bege', 'Polo em algodão', 'Tênis clássico colorido', 'Meia colorida'],                          vibe: 'Casual mas arrumado' },
      { style: 'sporty_m',  label: 'Sporty Casual',     emoji: '🏃💪🎧', items: ['Shorts esportivo', 'Moletom cropped', 'Tênis de corrida colorido', 'Boné + fone Bluetooth'],              vibe: 'Ativo o dia todo' },
      { style: 'boho_m',    label: 'Indie & Despojado', emoji: '🌿🕶️🍂', items: ['Calça wide brim de brim', 'Camisa de linho estampada aberta', 'Sandália de couro', 'Óculos discreto'],    vibe: 'Livre e descolado' },
    ],
  },
  {
    id: 3,
    context: '🎵 Festival de música ao ar livre',
    question: 'É dia de festival! Sol, shows incríveis. O que você veste?',
    outfits: [
      { style: 'street_m',  label: 'Festival Street',      emoji: '🕶️⚡🎒', items: ['Regata gráfica + camiseta aberta', 'Cargo colorida', 'Platform sneaker', 'Óculos espelhados + pochete'], vibe: 'Hype e na vibe' },
      { style: 'boho_m',    label: 'Boho Festival',        emoji: '🌿🎸🍂', items: ['Camisa estampada de linho', 'Bermuda de corduroy', 'Sandália de couro', 'Colar étnico + pulseiras'],     vibe: 'Livre e poético' },
      { style: 'minimal_m', label: 'Minimal Fest',         emoji: '🤍🕊️🖤', items: ['Camiseta branca', 'Jeans rasgado', 'All Star branco', 'Óculos de sol clássico'],                       vibe: 'Simples e icônico' },
      { style: 'classic_m', label: 'Preppy no Festival',   emoji: '👕🧢💛', items: ['Polo estampada', 'Bermuda chino', 'Tênis de lona', 'Boné tipo baseball'],                               vibe: 'Charmoso e arrumado' },
      { style: 'sporty_m',  label: 'Active Festival',      emoji: '🏃🔥🎧', items: ['Short esportivo', 'Moletom estampado cortado', 'Tênis chunky colorido', 'Boné + mochila'],             vibe: 'Energia total' },
    ],
  },
  {
    id: 4,
    context: '💼 Primeiro dia num trabalho/estágio',
    question: 'Primeiro dia no trabalho (empresa criativa, semiprofissional). O que você veste para causar boa impressão?',
    outfits: [
      { style: 'classic_m', label: 'Poder Clássico',         emoji: '💼👔🏆', items: ['Blazer estruturado', 'Calça de alfaiataria preta', 'Oxford de couro', 'Bolsa structured'],               vibe: 'Profissional e imponente' },
      { style: 'smart_m',   label: 'Smart Professional',     emoji: '🤍⬜💡', items: ['Calça chino cinza', 'Camisa casual + blazer casual', 'Tênis branco clean', 'Mochila minimalista'],       vibe: 'Confiante sem esforço' },
      { style: 'minimal_m', label: 'Effortless Minimal',     emoji: '⬛🔵👟', items: ['Calça slim gris', 'Camiseta gola rolê premium', 'Tênis low-top', 'Mochila discreta'],                  vibe: 'Limpo e moderno' },
      { style: 'street_m',  label: 'Creative Street',        emoji: '🧢🎨🔥', items: ['Alfaiataria + tênis chunky', 'Camiseta de banda sob blazer', 'Boné', 'Mochila de grife'],              vibe: 'Criativo e ousado' },
      { style: 'boho_m',    label: 'Artístico & Autêntico',  emoji: '🍂🎨🌿', items: ['Calça linho larga', 'Camisa estampada de seda', 'Loafer de couro', 'Relógio vintage'],                 vibe: 'Único e autêntico' },
    ],
  },
  {
    id: 5,
    context: '🏋️ Tarde de treino / academia',
    question: 'Hora do treino! Academia ou esporte. O que você usa?',
    outfits: [
      { style: 'sporty_m',  label: 'Performance Total',  emoji: '🏅💦🏃', items: ['Legging masculina de compressão', 'Regata dry-fit', 'Tênis técnico de corrida', 'Pochete esportiva'],       vibe: 'Foco e desempenho' },
      { style: 'street_m',  label: 'Street Gym',         emoji: '🧢👟🔥', items: ['Shorts cargo', 'Camiseta larga cortada', 'Jordan retro', 'Boné + meião alto'],                            vibe: 'Estilo até na academia' },
      { style: 'minimal_m', label: 'Clean Workout',      emoji: '🤍⬛🧘', items: ['Short preto simples', 'Camiseta branca básica', 'Tênis all white', 'Sem acessórios'],                     vibe: 'Limpo e funcional' },
      { style: 'classic_m', label: 'Club Sport',         emoji: '⛳🏃💛', items: ['Short de sarja bege', 'Polo esportiva', 'Tênis retro clássico', 'Viseira'],                               vibe: 'Clássico esportivo' },
      { style: 'boho_m',    label: 'Active & Livre',     emoji: '🌿🔆🧡', items: ['Short de crepom estampado', 'Regata de algodão leve', 'Sandália esportiva', 'Pulseiras de couro'],        vibe: 'Natural e confortável' },
    ],
  },
  {
    id: 6,
    context: '☕ Brunch com os amigos num café bonito',
    question: 'Domingo de brunch num café instagramável. O que você veste?',
    outfits: [
      { style: 'smart_m',   label: 'Smart Brunch',       emoji: '☕🧡👟', items: ['Bermuda chino creme', 'Polo pastel', 'Tênis branco', 'Meia listrada colorida'],                            vibe: 'Casual e arrumado' },
      { style: 'minimal_m', label: 'Parisian Minimal',   emoji: '🥐🤍🕶️', items: ['Calça de linho bege', 'Camiseta básica + casaco simples', 'Oxford de couro', 'Óculos discreto'],          vibe: 'Clean e elegante' },
      { style: 'boho_m',    label: 'Indie Sunday',       emoji: '🌿🎸🍂', items: ['Camisa floral de botão (aberta)', 'Calça wide de veludo', 'Sandália de couro', 'Colar de pedra natural'], vibe: 'Relaxado e autêntico' },
      { style: 'classic_m', label: 'Sunday Best',        emoji: '🍵💎👜', items: ['Calça slim caramelo', 'Camisa Oxford', 'Scarpin/mocassim', 'Relógio clássico'],                           vibe: 'Polido e impecável' },
      { style: 'street_m',  label: 'Brunch Street',      emoji: '📸🔥👟', items: ['Shorts + camiseta oversized estampada', 'Tênis retro', 'Boné', 'Mochila pequena'],                       vibe: 'Descolado e moderno' },
    ],
  },
  {
    id: 7,
    context: '🌊 Dia de praia ou piscina',
    question: 'Dia de sol — praia ou clube! Como você chega?',
    outfits: [
      { style: 'sporty_m',  label: 'Beach Athlete',   emoji: '🏄🌊🏅', items: ['Sunga de performance', 'Bermuda esportiva', 'Tênis aquático', 'Boné + capa de sol'],                       vibe: 'Pronto para o esporte' },
      { style: 'classic_m', label: 'Riviera Chic',    emoji: '🌞👔✨', items: ['Bermuda de tecido bege', 'Camisa de linho branca aberta', 'Chapéu panamá', 'Sandália de couro'],           vibe: 'Elegante ao sol' },
      { style: 'street_m',  label: 'Street Beach',    emoji: '🕶️🏖️🔥', items: ['Bermuda gráfica colorida', 'Regata + camiseta aberta', 'Havaianas + óculos espelhados'],                 vibe: 'Descolado e na vibe' },
      { style: 'minimal_m', label: 'Minimal Coast',   emoji: '🤍🌊⬛', items: ['Sunga/bermuda preta ou branca', 'Regata básica', 'Rasteirinha neutra', 'Sacola de palha'],                 vibe: 'Elegante e discreto' },
      { style: 'boho_m',    label: 'Boho Beach',      emoji: '🐚🌿🌊', items: ['Bermuda estampada étnica', 'Regata de algodão', 'Sandália trançada', 'Colar e pulseiras de corda'],       vibe: 'Filho do mar' },
    ],
  },
  {
    id: 8,
    context: '🎓 Formatura ou evento de gala',
    question: 'Grande momento — formatura, casamento ou baile. Qual é o seu look dos sonhos?',
    outfits: [
      { style: 'classic_m', label: 'Terno Black Tie',       emoji: '🤵✨🥂', items: ['Terno completo preto/navy', 'Gravata ou borboleta', 'Oxford envernizado', 'Lenço de bolso'],             vibe: 'Imponente e memorável' },
      { style: 'minimal_m', label: 'Minimal Luxo',          emoji: '🤍⚡💫', items: ['Terno bege/off-white', 'Camisa branca sem gravata', 'Derby de camurça', 'Sem acessórios extras'],       vibe: 'Luxo silencioso' },
      { style: 'smart_m',   label: 'Smart Gala',            emoji: '👔💎🌟', items: ['Blazer escuro + calça slim', 'Camisa aberta', 'Loafer de verniz', 'Relógio marcante'],                 vibe: 'Moderno e sofisticado' },
      { style: 'street_m',  label: 'Fashion Statement',     emoji: '🔥🧥👟', items: ['Terno desconstruído colorido', 'Camiseta branca', 'Chunky sneaker', 'Correntes e rings'],             vibe: 'Ousado e marcante' },
      { style: 'boho_m',    label: 'Alternativo Formal',    emoji: '🌿🍂🕊️', items: ['Kimono/jaqueta veludo', 'Calça larga', 'Bota de couro', 'Acessórios de pedra natural'],              vibe: 'Único e poético' },
    ],
  },
];

/* ══════════════════════════════════════════════════
   PERFIS FEMININOS
══════════════════════════════════════════════════ */
const PROFILES_FEM = {
  classic:    { name: 'Clássico & Sofisticado', emoji: '💎', color: '#C0C0C0', desc: 'Você é a elegância em pessoa. Peças atemporais, cortes impecáveis e cores neutras são sua assinatura. Audrey Hepburn te inspiraria.', tags: ['Elegância', 'Atemporalidade', 'Qualidade', 'Formalidade'], colors: ['#2C2C2C','#F5F0EB','#8B7355','#C0C0C0','#1A1A2E'], pieces: ['Blazer estruturado','Calça de alfaiataria','Scarpin neutro','Colar de pérolas','Bolsa structured'], tip: 'Invista em peças cápsula de qualidade. Um blazer bom dura décadas.' },
  minimal:    { name: 'Minimalista Moderno',    emoji: '⬜', color: '#A0A0A0', desc: 'Para você, simplicidade é luxo. Cada peça tem propósito. Você acredita em "menos é mais" e escolhe qualidade acima de quantidade.',  tags: ['Clean','Versátil','Slow Fashion','Funcional'],            colors: ['#FFFFFF','#E5E5E5','#A0A0A0','#404040','#0D0D0D'],   pieces: ['Camiseta branca premium','Calça reta','Tênis branco','Tote bag de lona','Mocassim'],    tip: 'Monte um guarda-roupa cápsula com 30 peças que se combinam.' },
  boho:       { name: 'Boho & Free Spirit',     emoji: '🌿', color: '#C17D3C', desc: 'Você é a natureza em forma de look! Camadas, bordados, franjas e cores terrosas contam sua história aventureira e criativa.',       tags: ['Liberdade','Criatividade','Artesanal','Natureza'],         colors: ['#C17D3C','#8B6355','#556B2F','#D4A27F','#B8A99A'],   pieces: ['Vestido longo floral','Bota cano longo','Chapéu de palha','Colar étnico','Saia de camadas'], tip: 'Explore feiras de artesanato. As melhores peças boho são exclusivas.' },
  streetwear: { name: 'Streetwear Urbano',      emoji: '🏙️', color: '#FF4040', desc: 'Você vive no ritmo da cidade! Oversized, drops exclusivos, sneakers raros e muito hype. Seu look é statement.',                     tags: ['Urbano','Hype','Atitude','Conforto'],                      colors: ['#1A1A1A','#FF4040','#FFFFFF','#FFD700','#00BFFF'],    pieces: ['Moletom oversized gráfico','Cargo pants','Chunky sneaker','Boné','Puffer jacket'],     tip: 'Fique de olho em drops e collabs. Peças exclusivas valorizam o guarda-roupa.' },
  romantic:   { name: 'Romântico & Feminino',   emoji: '🌸', color: '#F7C5D5', desc: 'Você transborda delicadeza! Flores, laços, tules e tons rosados fazem parte do seu universo. Seu estilo é um poema visual.',          tags: ['Delicadeza','Feminilidade','Flores','Leveza'],             colors: ['#F7C5D5','#E8A0BF','#FFF0F5','#FFB6C1','#DDA0DD'],   pieces: ['Vestido floral','Blusa com laço','Sapatilha pastel','Bolsa mini','Tiara de flores'],   tip: 'Mix e camadas funcionam muito! Experimente vestido + tênis chunky.' },
  glam:       { name: 'Glam & Luxuoso',         emoji: '✨', color: '#C9A84C', desc: 'Você nasceu para brilhar! Metálicos, veludo e acessórios marcantes são sua identidade. Cada look é uma produção.',                   tags: ['Brilho','Luxo','Impacto','Confiança'],                     colors: ['#C9A84C','#F5E6C8','#8B0000','#1C1C2E','#E8D5A3'],   pieces: ['Body metálico','Stiletto','Saia lápis','Brinco chandelier','Bolsa metalizada'],        tip: 'Invista em 2-3 peças Statement por temporada. Uma peça glam transforma qualquer look.' },
  sporty:     { name: 'Sporty Chic',            emoji: '🏆', color: '#00C9FF', desc: 'Conforto e estilo são inseparáveis para você! Athleisure é sua linguagem — da academia ao brunch no mesmo look.',                     tags: ['Conforto','Funcional','Athleisure','Movimento'],           colors: ['#1A1A2E','#00C9FF','#FFFFFF','#FF6B35','#A8FF3E'],    pieces: ['Legging','Cropped esportivo','Tênis chunky','Corta-vento','Pochete'],                  tip: 'Busque tecidos tecnológicos que funcionam no esporte e no lazer.' },
};

/* ══════════════════════════════════════════════════
   PERFIS MASCULINOS
══════════════════════════════════════════════════ */
const PROFILES_MASC = {
  classic_m: { name: 'Clássico & Formal',        emoji: '💎', color: '#C0C0C0', desc: 'Você é a elegância masculina em sua forma mais pura. Ternos bem cortados, camisas impecáveis e acessórios discretos são sua assinatura. Seu estilo inspira autoridade e sofisticação.',    tags: ['Elegância','Formal','Atemporalidade','Autoridade'],     colors: ['#1A1A2E','#F5F0EB','#8B7355','#C0C0C0','#2C2C2C'], pieces: ['Terno navy ou grafite','Camisa social Oxford','Derby de couro','Cinto de couro','Relógio clássico'],      tip: 'Um bom terno é o investimento mais versátil que um homem pode fazer no guarda-roupa.' },
  minimal_m: { name: 'Minimalista Moderno',       emoji: '⬜', color: '#A0A0A0', desc: 'Você acredita que roupa de qualidade fala mais alto que estampa. Básicos premium, cortes precisos e paleta neutra criam um visual elegante e atemporal sem esforço.',                      tags: ['Clean','Versátil','Slow Fashion','Essencial'],          colors: ['#FFFFFF','#E5E5E5','#404040','#0D0D0D','#A0A0A0'],  pieces: ['Camiseta de qualidade','Calça slim gris','Tênis branco','Jaqueta essencial','Tote/mochila'], tip: 'Investir em 5 básicos perfeitos vale mais do que 20 peças medianas.' },
  street_m:  { name: 'Streetwear Urbano',         emoji: '🏙️', color: '#FF4040', desc: 'Você respira a cultura da rua — drops, sneakers, collabs e atitude inconfundível. Oversized e gráficos marcantes são seu idioma. Você é a cena.',                                        tags: ['Hype','Atitude','Drops','Autenticidade'],                colors: ['#1A1A1A','#FF4040','#FFFFFF','#FFD700','#00BFFF'],   pieces: ['Moletom oversized','Cargo pants','Chunky sneaker','Boné','Puffer jacket'],            tip: 'Fique de olho em drops locais e collabs. As melhores peças são exclusivas.' },
  smart_m:   { name: 'Smart Casual',              emoji: '👔', color: '#6B8CFF', desc: 'Você tem o equilíbrio perfeito: arrumado o suficiente para qualquer ocasião, sem abrir mão do conforto. Polo, chino e tênis limpo são seu trio favorito.',                                 tags: ['Equilíbrio','Versátil','Casual','Curado'],               colors: ['#6B8CFF','#F5F0EB','#2C5F2E','#C17D3C','#FFFFFF'],   pieces: ['Polo de algodão','Short/Calça chino','Tênis clássico','Mocassim','Relógio casual'],   tip: 'O Smart Casual funciona em 80% das situações. Domine esse estilo e você nunca errará.' },
  sporty_m:  { name: 'Sporty Chic',               emoji: '🏆', color: '#00C9FF', desc: 'Conforto e performance são suas prioridades. Athleisure masculino é sua marca — você sai da academia para o brunch sem trocar de roupa e ainda fica incrível.',                              tags: ['Conforto','Funcional','Athleisure','Movimento'],         colors: ['#1A1A2E','#00C9FF','#FFFFFF','#FF6B35','#A8FF3E'],   pieces: ['Short de compressão','Regata dry-fit','Tênis técnico','Corta-vento','Mochila esportiva'], tip: 'Marcas de performance elevada são o segredo do athleisure masculino que funciona.' },
  boho_m:    { name: 'Alternativo & Autêntico',   emoji: '🌿', color: '#C17D3C', desc: 'Você não segue tendências — você as cria. Peças únicas, tecidos naturais, referências étnicas e um espírito livre definem seu guarda-roupa. Feiras e brechós são seu playground.',         tags: ['Liberdade','Criatividade','Artesanal','Natural'],        colors: ['#C17D3C','#8B6355','#556B2F','#D4A27F','#B8A99A'],   pieces: ['Camisa de linho','Calça wide de brim','Sandália de couro','Colares étnicos','Jaqueta vintage'], tip: 'Explore brechós e feiras. Peças únicas diferenciam seu estilo de qualquer cópia.' },
};

/* ══════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════ */
export default function FashionLookGame({ onBack }) {
  const [gender, setGender] = useState(null);   // null | 'fem' | 'masc'
  const [step, setStep]     = useState(0);
  const [choices, setChoices] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);

  const SCENARIOS = gender === 'masc' ? SCENARIOS_MASC : SCENARIOS_FEM;
  const PROFILES  = gender === 'masc' ? PROFILES_MASC  : PROFILES_FEM;

  const handleChoice = (style) => {
    setSelected(style);
    setTimeout(() => {
      const newChoices = [...choices, style];
      setSelected(null);
      if (step < SCENARIOS.length - 1) {
        setChoices(newChoices);
        setStep(s => s + 1);
      } else {
        const scores = {};
        for (const s of newChoices) scores[s] = (scores[s] || 0) + 1;
        const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
        setResult({ profile: PROFILES[winner], scores, total: newChoices.length, winner });
        setChoices(newChoices);
      }
    }, 400);
  };

  const reset = () => { setStep(0); setChoices([]); setSelected(null); setResult(null); setGender(null); };
  const progress = (step / SCENARIOS.length) * 100;

  /* ── Seleção de gênero ── */
  if (!gender) {
    return (
      <div className="glass-panel look-game fade-enter" style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, background: 'linear-gradient(135deg,#fff,var(--fashion-rose),var(--fashion-gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 8 }}>
          Qual seria o seu Look?
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.95rem', marginBottom: 32 }}>
          Escolha sua seção para ver os looks certos para você
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
          <button id="btn-gender-fem" className="fashion-card" onClick={() => setGender('fem')}>
            <div className="fashion-card-icon" style={{ fontSize: '2.8rem' }}>👗</div>
            <span className="fashion-card-title">Feminino</span>
            <span className="fashion-card-desc">Looks, estilos e dicas para moda feminina</span>
          </button>
          <button id="btn-gender-masc" className="fashion-card" onClick={() => setGender('masc')}>
            <div className="fashion-card-icon" style={{ fontSize: '2.8rem' }}>👔</div>
            <span className="fashion-card-title">Masculino</span>
            <span className="fashion-card-desc">Looks, estilos e dicas para moda masculina</span>
          </button>
        </div>
        <button className="fashion-back-btn" onClick={onBack} id="btn-lookgame-gender-back">
          ← Voltar ao Hub
        </button>
      </div>
    );
  }

  /* ── Resultado ── */
  if (result) {
    const { profile, scores, total, winner } = result;
    const sortedStyles = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const confidence = Math.round((scores[winner] / total) * 100);
    return (
      <div className="glass-panel style-quiz fade-enter">
        <div className="style-result">
          <p className="look-result-intro">Com base nos {total} looks que você escolheu...</p>
          <div className="style-result-badge" style={{ boxShadow: `0 0 50px ${profile.color}50` }}>{profile.emoji}</div>
          <h1 className="style-result-name">{profile.name}</h1>
          <div className="confidence-bar-wrapper">
            <div className="confidence-label">
              <span>Compatibilidade</span>
              <span style={{ color: profile.color, fontWeight: 800 }}>{confidence}%</span>
            </div>
            <div className="confidence-bar-bg">
              <div className="confidence-bar-fill" style={{ width: `${confidence}%`, background: `linear-gradient(90deg, ${profile.color}, #fff8)` }} />
            </div>
          </div>
          <p className="style-result-desc">{profile.desc}</p>
          <div className="style-breakdown">
            <p className="breakdown-title">Seu mix de estilos</p>
            {sortedStyles.map(([sty, count]) => {
              const p = PROFILES[sty];
              if (!p || count === 0) return null;
              return (
                <div key={sty} className="breakdown-row">
                  <span className="breakdown-emoji">{p.emoji}</span>
                  <span className="breakdown-name">{p.name}</span>
                  <div className="breakdown-bar-bg">
                    <div className="breakdown-bar-fill" style={{ width: `${(count / total) * 100}%`, background: p.color }} />
                  </div>
                  <span className="breakdown-pct">{Math.round((count / total) * 100)}%</span>
                </div>
              );
            })}
          </div>
          <div className="style-attributes">
            {profile.tags.map(tag => <span key={tag} className="style-tag">{tag}</span>)}
          </div>
          <p className="style-colors-title">Sua paleta ideal</p>
          <div className="style-colors-row">
            {profile.colors.map((hex, i) => <div key={i} className="style-color-dot" style={{ background: hex, width: 40, height: 40 }} title={hex} />)}
          </div>
          <div className="result-card" style={{ textAlign: 'left', marginBottom: 16 }}>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--fashion-rose)', marginBottom: 10 }}>
              {gender === 'masc' ? '👔' : '👗'} Peças-chave do seu guarda-roupa
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {profile.pieces.map(p => (
                <span key={p} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '6px 14px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>{p}</span>
              ))}
            </div>
          </div>
          <div className="style-tip-box">
            <span className="style-tip-icon">💡</span>
            <p className="style-tip-text">{profile.tip}</p>
          </div>
          <div className="result-actions" style={{ marginTop: 24 }}>
            <button id="btn-look-reset" className="btn-camera primary" onClick={reset} style={{ padding: '12px 28px' }}>🔄 Jogar Novamente</button>
            <button id="btn-look-back" className="fashion-back-btn" onClick={onBack}>← Voltar ao Hub</button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Pergunta ── */
  const scenario = SCENARIOS[step];
  return (
    <div className="glass-panel look-game fade-enter">
      <div className="quiz-progress-bar" style={{ marginBottom: 8 }}>
        <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="look-game-counter">
        <span>Look {step + 1} de {SCENARIOS.length}</span>
        <span style={{ opacity: 0.5 }}>{SCENARIOS.length - step - 1} situações restantes</span>
      </div>
      <div className="look-game-context">
        <p className="look-context-badge">{scenario.context}</p>
        <h2 className="look-game-question">{scenario.question}</h2>
      </div>
      <div className="look-outfit-grid">
        {scenario.outfits.map((outfit, i) => (
          <button
            key={i}
            id={`btn-look-${step}-${i}`}
            className={`look-outfit-card ${selected === outfit.style ? 'look-selected' : ''}`}
            onClick={() => handleChoice(outfit.style)}
            disabled={selected !== null}
          >
            <div className="look-outfit-emoji">{outfit.emoji}</div>
            <div className="look-outfit-info">
              <span className="look-outfit-label">{outfit.label}</span>
              <ul className="look-outfit-items">
                {outfit.items.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
              <span className="look-outfit-vibe">✦ {outfit.vibe}</span>
            </div>
          </button>
        ))}
      </div>
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <button className="fashion-back-btn" onClick={onBack} id="btn-lookgame-back">← Voltar ao Hub</button>
      </div>
    </div>
  );
}
