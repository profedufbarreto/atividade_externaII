export const periods = ["Manhã", "Tarde", "Noite"];
export const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

export const scenarios = [
  // SEGUNDA
  {
    day: 0,
    period: 0,
    text: "O alarme toca às 06:30. Você se sente um pouco cansado(a) após o final de semana.",
    options: [
      {
        label: "Levantar e fazer alongamento",
        result: { energy: 10, stress: -5, mood: 5, social: 0 },
        message: "Você se sente revigorado(a) para começar a semana."
      },
      {
        label: "Dormir mais 15 minutos (soneca)",
        result: { energy: -5, stress: 10, mood: -5, social: 0 },
        message: "Você acordou na correria e se sente um pouco ansioso(a)."
      }
    ]
  },
  {
    day: 0,
    period: 1,
    text: "No trabalho/estudos, você tem uma pilha de tarefas e uma mensagem de um amigo.",
    options: [
      {
        label: "Focar total no trabalho sem pausas",
        result: { energy: -15, stress: 15, mood: -10, social: -5 },
        message: "As tarefas foram feitas, mas você está exausto(a)."
      },
      {
        label: "Fazer uma pausa para café e responder o amigo",
        result: { energy: -5, stress: -10, mood: 10, social: 15 },
        message: "A pausa te ajudou a relaxar e manter as conexões sociais."
      }
    ]
  },
  {
    day: 0,
    period: 2,
    text: "Fim do dia. Você chega em casa e o sofá parece tentador, mas tem louça na pia.",
    options: [
      {
        label: "Relaxar direto e pedir delivery",
        result: { energy: 15, stress: -10, mood: 10, social: 0 },
        message: "Noite tranquila, corpo descansado."
      },
      {
        label: "Organizar a casa e cozinhar algo",
        result: { energy: -10, stress: 5, mood: 15, social: 5 },
        message: "A casa está limpa e você comeu bem, traz satisfação."
      }
    ]
  },
  // TERÇA
  {
    day: 1,
    period: 0,
    text: "Terça-feira chuvosa. A vontade de sair debaixo das cobertas é mínima.",
    options: [
      {
        label: "Tomar um banho gelado para despertar",
        result: { energy: 20, stress: 5, mood: 5, social: 0 },
        message: "Choque térmico! Mas agora você está 100% acordado(a)."
      },
      {
        label: "Tomar um café forte e enrolar no celular",
        result: { energy: 5, stress: 10, mood: -10, social: 0 },
        message: "O café ajudou, mas o tempo perdido no celular gerou culpa."
      }
    ]
  },
  {
    day: 1,
    period: 1,
    text: "Surge um problema técnico no sistema que você usa. Ninguém sabe resolver.",
    options: [
      {
        label: "Tentar resolver sozinho(a) até conseguir",
        result: { energy: -20, stress: 20, mood: -5, social: -10 },
        message: "Você resolveu, mas o custo emocional foi alto."
      },
      {
        label: "Pedir ajuda para os colegas e colaborar",
        result: { energy: -5, stress: -5, mood: 10, social: 20 },
        message: "Trabalho em equipe facilitou tudo e uniu o grupo."
      }
    ]
  },
  {
    day: 1,
    period: 2,
    text: "À noite, você recebe um convite para uma palestra online interessante.",
    options: [
      {
        label: "Assistir e aprender algo novo",
        result: { energy: -10, stress: 5, mood: 20, social: 0 },
        message: "Conhecimento é poder! Você se sente inspirado(a)."
      },
      {
        label: "Desligar as telas e ler um livro",
        result: { energy: 10, stress: -15, mood: 10, social: 0 },
        message: "Detox digital necessário para um sono melhor."
      }
    ]
  },
  // QUARTA (Meio da semana)
  {
    day: 2,
    period: 0,
    text: "Quarta-feira, o famoso 'dia da pré-exaustão'. Como está o ânimo?",
    options: [
      {
        label: "Ir para a academia/caminhada",
        result: { energy: -10, stress: -15, mood: 20, social: 5 },
        message: "Endorfina é o melhor remédio para o meio da semana."
      },
      {
        label: "Comer algo bem gostoso no café da manhã",
        result: { energy: 10, stress: -5, mood: 15, social: 0 },
        message: "Um carinho no paladar ajuda a encarar o dia."
      }
    ]
  },
  {
    day: 2,
    period: 1,
    text: "Reunião de feedback marcada no último minuto.",
    options: [
      {
        label: "Ficar na defensiva e tenso(a)",
        result: { energy: -15, stress: 25, mood: -15, social: -10 },
        message: "Foi um momento difícil e desgastante."
      },
      {
        label: "Ouvir com calma e buscar melhorar",
        result: { energy: -5, stress: 5, mood: 5, social: 10 },
        message: "Críticas construtivas te ajudam a crescer sem pirar."
      }
    ]
  },
  {
    day: 2,
    period: 2,
    text: "Noite de quarta. Alguém te liga para desabafar.",
    options: [
      {
        label: "Ouvir e dar apoio por 1 hora",
        result: { energy: -15, stress: 10, mood: 5, social: 25 },
        message: "Você foi um(a) ótimo(a) amigo(a), mas se sente drenado(a)."
      },
      {
        label: "Dizer que está cansado(a) e ligar amanhã",
        result: { energy: 10, stress: -10, mood: -5, social: -10 },
        message: "Priorizou seu descanso, embora sinta um pouco de culpa."
      }
    ]
  },
  // QUINTA
  {
    day: 3,
    period: 0,
    text: "Quinta-feira. O cansaço acumulado começa a pesar nos ombros.",
    options: [
      {
        label: "Meditar por 10 minutos",
        result: { energy: 5, stress: -20, mood: 10, social: 0 },
        message: "Mente calma, corpo pronto para o dia."
      },
      {
        label: "Pular o café e sair correndo",
        result: { energy: -15, stress: 15, mood: -10, social: 0 },
        message: "Manhã caótica gera um dia instável."
      }
    ]
  },
  {
    day: 3,
    period: 1,
    text: "Um erro seu é descoberto. Ninguém brigou, mas você se cobra.",
    options: [
      {
        label: "Ficar se punindo mentalmente o dia todo",
        result: { energy: -20, stress: 30, mood: -20, social: -5 },
        message: "Auto-cobrança excessiva é o seu maior inimigo."
      },
      {
        label: "Assumir, corrigir e seguir em frente",
        result: { energy: -5, stress: 10, mood: 5, social: 5 },
        message: "Errar é humano. Aprender é o que importa."
      }
    ]
  },
  {
    day: 3,
    period: 2,
    text: "Happy Hour da firma/turma. Você quer ir?",
    options: [
      {
        label: "Ir e socializar até tarde",
        result: { energy: -25, stress: -10, mood: 15, social: 30 },
        message: "Foi divertido, mas amanhã vai ser difícil acordar."
      },
      {
        label: "Ir, ficar 30 min e voltar cedo",
        result: { energy: -5, stress: -5, mood: 5, social: 10 },
        message: "Equilíbrio perfeito: marcou presença e descansou."
      }
    ]
  },
  // SEXTA
  {
    day: 4,
    period: 0,
    text: "Sextou! O clima geral é de alívio e empolgação.",
    options: [
      {
        label: "Planejar o fim de semana com calma",
        result: { energy: 5, stress: -10, mood: 15, social: 10 },
        message: "Organização traz paz de espírito."
      },
      {
        label: "Deixar tudo para a última hora",
        result: { energy: -5, stress: 10, mood: 0, social: 0 },
        message: "O 'eu' do futuro que se vire, né?"
      }
    ]
  },
  {
    day: 4,
    period: 1,
    text: "Últimas tarefas da semana. O foco está difícil.",
    options: [
      {
        label: "Dar um último gás para terminar tudo",
        result: { energy: -20, stress: 15, mood: 10, social: 0 },
        message: "Liberdade! Nada ficou pendente para segunda."
      },
      {
        label: "Fazer o mínimo necessário e relaxar",
        result: { energy: -5, stress: -5, mood: 5, social: 5 },
        message: "Sem pressa, mas com algumas pendências no radar."
      }
    ]
  },
  {
    day: 4,
    period: 2,
    text: "Noite de sexta. Cinema, festa ou cama?",
    options: [
      {
        label: "Festa animada com muita gente",
        result: { energy: -30, stress: 5, mood: 20, social: 40 },
        message: "Noite inesquecível, mas bateria social no zero."
      },
      {
        label: "Filme em casa com pipoca",
        result: { energy: 20, stress: -20, mood: 10, social: -10 },
        message: "Paz, sossego e recarga de energia garantida."
      }
    ]
  },
  // SÁBADO (Extra)
  {
    day: 5,
    period: 0,
    text: "Sábado de manhã. O tempo está livre.",
    options: [
      {
        label: "Dormir até tarde sem culpa",
        result: { energy: 30, stress: -15, mood: 15, social: 0 },
        message: "Sono em dia, humor lá no alto."
      },
      {
        label: "Acordar cedo para aproveitar o dia",
        result: { energy: 10, stress: -5, mood: 20, social: 10 },
        message: "Dia longo e produtivo para lazer."
      }
    ]
  },
  {
    day: 5,
    period: 1,
    text: "Almoço com a família ou amigos próximos.",
    options: [
      {
        label: "Estar presente de corpo e alma",
        result: { energy: -10, stress: -10, mood: 15, social: 25 },
        message: "Conexões reais fortalecidas."
      },
      {
        label: "Ficar no celular durante o almoço",
        result: { energy: 0, stress: 5, mood: -10, social: -15 },
        message: "Você estava lá, mas ninguém sentiu sua presença."
      }
    ]
  },
  {
    day: 5,
    period: 2,
    text: "Noite de sábado. Reflexão ou agito?",
    options: [
      {
        label: "Sair para jantar em um lugar novo",
        result: { energy: -15, stress: -5, mood: 20, social: 15 },
        message: "Experiência gastronômica maravilhosa."
      },
      {
        label: "Praticar um hobby (desenhar, jogar, música)",
        result: { energy: -5, stress: -20, mood: 25, social: 0 },
        message: "Fluxo criativo total. Mente descansada."
      }
    ]
  },
  // DOMINGO
  {
    day: 6,
    period: 0,
    text: "Domingo de manhã. Aquela melancolia pré-segunda às vezes aparece.",
    options: [
      {
        label: "Fazer um passeio ao ar livre/natureza",
        result: { energy: 10, stress: -25, mood: 20, social: 10 },
        message: "Ar puro renova todas as energias."
      },
      {
        label: "Ficar em casa vendo notícias/redes sociais",
        result: { energy: -5, stress: 15, mood: -15, social: 0 },
        message: "Muita informação negativa gerou ansiedade."
      }
    ]
  },
  {
    day: 6,
    period: 1,
    text: "Tarde de domingo. Organizando a semana que vem.",
    options: [
      {
        label: "Preparar a agenda e roupas com antecedência",
        result: { energy: -5, stress: -20, mood: 10, social: 0 },
        message: "Sensação de controle e calma para amanhã."
      },
      {
        label: "Ignorar que amanhã é segunda",
        result: { energy: 10, stress: 10, mood: 0, social: 0 },
        message: "Aproveitou o agora, mas a angústia vai bater à noite."
      }
    ]
  },
  {
    day: 6,
    period: 2,
    text: "Noite de domingo. Ritual de sono.",
    options: [
      {
        label: "Dormir cedo com chá e silêncio",
        result: { energy: 30, stress: -15, mood: 10, social: 0 },
        message: "Preparação perfeita para a nova semana."
      },
      {
        label: "Maratonar série até de madrugada",
        result: { energy: -25, stress: 15, mood: 5, social: 0 },
        message: "Foi legal na hora, mas amanhã será um desafio."
      }
    ]
  }
];
