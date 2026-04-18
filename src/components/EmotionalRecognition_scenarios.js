export const emotionalScenarios = [
  {
    id: 1,
    situation: "Um amigo prometeu te ajudar em um projeto importante, mas cancelou no último minuto dizendo que 'surgiu um imprevisto'.",
    emotions: [
      { label: "Frustração", emoji: "😤", type: "primary" },
      { label: "Tristeza", emoji: "😢", type: "secondary" },
      { label: "Alívio", emoji: "😌", type: "unexpected" },
      { label: "Indiferença", emoji: "😐", type: "avoidant" }
    ],
    actions: [
      { label: "Reclamar por mensagem e cobrar a promessa", interpretation: "Você está expressando sua necessidade, mas o tom pode gerar conflito." },
      { label: "Dizer que está tudo bem (mesmo não estando)", interpretation: "Isso pode evitar conflito agora, mas acumula ressentimento." },
      { label: "Expressar seu desapontamento e remarcar", interpretation: "Comunicação assertiva: você valida seu sentimento e busca solução." }
    ],
    feedback: "É normal sentir raiva ou frustração quando expectativas não são atendidas. O segredo é não deixar que a emoção assuma o controle total da sua resposta."
  },
  {
    id: 2,
    situation: "Você recebeu um elogio em público do seu chefe ou professor por um trabalho bem feito.",
    emotions: [
      { label: "Orgulho", emoji: "😊", type: "primary" },
      { label: "Vergonha", emoji: "😳", type: "secondary" },
      { label: "Medo", emoji: "😨", type: "unexpected" },
      { label: "Alegria", emoji: "🎉", type: "primary" }
    ],
    actions: [
      { label: "Agradecer e celebrar a conquista", interpretation: "Essencial para fortalecer sua autoestima e autoconfiança." },
      { label: "Diminuir o feito, dizendo que 'não foi nada'", interpretation: "Cuidado com a modéstia excessiva; você merece o crédito." },
      { label: "Ficar em silêncio e mudar de assunto rápido", interpretation: "Pode ser timidez, mas tente acolher o elogio internamente." }
    ],
    feedback: "Aceitar elogios é uma habilidade social. Muitas vezes nos sentimos expostos, mas reconhecer o próprio valor é fundamental para a saúde mental."
  },
  {
    id: 3,
    situation: "Você vê um grupo de colegas conversando e eles param de falar assim que você se aproxima.",
    emotions: [
      { label: "Ansiedade", emoji: "😰", type: "primary" },
      { label: "Insegurança", emoji: "😟", type: "secondary" },
      { label: "Exclusão", emoji: "💔", type: "primary" },
      { label: "Curiosidade", emoji: "🤔", type: "cognitive" }
    ],
    actions: [
      { label: "Se afastar e pensar que estavam falando mal de você", interpretation: "Esta é uma distorção cognitiva (leitura mental). Nem tudo é sobre nós." },
      { label: "Cumprimentar normalmente e perguntar o assunto", interpretation: "Enfrentamento positivo. Você tira o peso do mistério." },
      { label: "Ignorar e fingir que não percebeu", interpretation: "Uma forma de proteção, mas não resolve a dúvida interna." }
    ],
    feedback: "Nossa mente adora preencher lacunas com pensamentos negativos. Questionar se temos evidências reais do que pensamos ajuda a reduzir a ansiedade social."
  },
  {
    id: 4,
    situation: "Você cometeu um erro bobo em algo que você costuma ser bom(boa).",
    emotions: [
      { label: "Irritação", emoji: "😠", type: "primary" },
      { label: "Culpa", emoji: "😔", type: "secondary" },
      { label: "Humilhação", emoji: "😫", type: "primary" },
      { label: "Autocompaixão", emoji: "🫂", type: "positive" }
    ],
    actions: [
      { label: "Se chamar de 'burro(a)' ou 'incompetente'", interpretation: "Autocrítica dura gera estresse e diminui a motivação." },
      { label: "Rir do próprio erro e tentar consertar", interpretation: "Resiliência. O erro é um evento, não a sua identidade." },
      { label: "Tentar esconder o erro para ninguém ver", interpretation: "O medo do julgamento pode aumentar a pressão sobre você." }
    ],
    feedback: "Erros são as ferramentas de aprendizado mais rápidas que temos. Ser gentil consigo mesmo(a) em momentos de falha é o que chamamos de autocompaixão."
  }
];
