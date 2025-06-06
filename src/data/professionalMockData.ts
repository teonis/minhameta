
import { PatientType, GoalType } from '../types/professional';

export const patientsData: PatientType[] = [
  { 
    id: 1, 
    name: "Ana Silva", 
    email: "ana@email.com", 
    phone: "(11) 98765-4321",
    lastActivity: "2 dias atrás", 
    totalGoals: 8, 
    completedGoals: 5,
    diaryEntries: [
      { id: 1, date: "10/11/2023", mood: "Bem", content: "Hoje foi um bom dia. Consegui realizar todos os exercícios propostos e me senti mais disposta." },
      { id: 2, date: "09/11/2023", mood: "Cansada", content: "Tive dificuldade para dormir ontem à noite, o que afetou minha energia hoje. Mesmo assim, fiz a caminhada recomendada." }
    ]
  },
  { 
    id: 2, 
    name: "Carlos Oliveira", 
    email: "carlos@email.com", 
    phone: "(11) 91234-5678",
    lastActivity: "Hoje", 
    totalGoals: 6, 
    completedGoals: 4,
    diaryEntries: [
      { id: 1, date: "11/11/2023", mood: "Motivado", content: "Consegui completar duas metas hoje! Estou me sentindo muito bem com o progresso." }
    ]
  },
  { 
    id: 3, 
    name: "Mariana Santos", 
    email: "mariana@email.com", 
    phone: "(11) 99876-5432",
    lastActivity: "5 dias atrás", 
    totalGoals: 10, 
    completedGoals: 3,
    diaryEntries: [
      { id: 1, date: "06/11/2023", mood: "Ansiosa", content: "Estou sentindo um pouco de ansiedade hoje. Tentei fazer os exercícios de respiração, mas tive dificuldade de concentração." }
    ]
  },
  { 
    id: 4, 
    name: "Bruno Costa", 
    email: "bruno@email.com", 
    phone: "(11) 95678-1234",
    lastActivity: "1 semana atrás", 
    totalGoals: 7, 
    completedGoals: 7,
    diaryEntries: [
      { id: 1, date: "04/11/2023", mood: "Realizado", content: "Completei todas as minhas metas! Estou muito feliz com meu progresso até agora." }
    ]
  },
];

export const goalsData: GoalType[] = [
  { 
    id: 1, 
    patientId: 1, 
    patientName: "Ana Silva", 
    title: "Exercícios de Respiração", 
    status: "completed",
    dueDate: "10/11/2023", 
    priority: "alta", 
    description: "Realizar exercícios de respiração diafragmática por 10 minutos diariamente."
  },
  { 
    id: 2, 
    patientId: 1, 
    patientName: "Ana Silva", 
    title: "Caminhada diária", 
    status: "in-progress",
    dueDate: "15/11/2023", 
    priority: "média", 
    description: "Caminhar por pelo menos 20 minutos todos os dias."
  },
  { 
    id: 3, 
    patientId: 2, 
    patientName: "Carlos Oliveira", 
    title: "Prática de Mindfulness", 
    status: "completed",
    dueDate: "12/11/2023", 
    priority: "média", 
    description: "Realizar 15 minutos de prática de atenção plena todas as manhãs."
  },
  { 
    id: 4, 
    patientId: 3, 
    patientName: "Mariana Santos", 
    title: "Alongamento Matinal", 
    status: "pending",
    dueDate: "18/11/2023", 
    priority: "baixa", 
    description: "Fazer uma sequência de alongamentos por 10 minutos ao acordar."
  },
];

export const goalTemplates: Record<string, { title: string; description: string }[]> = {
  "Exercício Físico": [
    { title: "Caminhada Diária", description: "Caminhar por pelo menos 30 minutos todos os dias." },
    { title: "Treino de Força", description: "Realizar exercícios de força 3 vezes por semana." },
    { title: "Alongamento", description: "Fazer uma rotina de alongamento por 15 minutos diariamente." }
  ],
  "Lifestyle": [
    { title: "Meditação", description: "Praticar meditação por 10 minutos todas as manhãs." },
    { title: "Leitura", description: "Ler um livro por 20 minutos antes de dormir." },
    { title: "Organização", description: "Dedicar 15 minutos por dia para organizar o ambiente." }
  ],
  "Finanças": [
    { title: "Controle de Gastos", description: "Registrar todos os gastos diários em um aplicativo." },
    { title: "Economias", description: "Separar 10% da renda mensal para poupança." }
  ],
  "Nutrição": [
    { title: "Hidratação", description: "Beber pelo menos 2 litros de água por dia." },
    { title: "Frutas e Vegetais", description: "Consumir 5 porções de frutas e vegetais diariamente." },
    { title: "Planejamento de Refeições", description: "Planejar as refeições da semana com antecedência." }
  ],
  "Saúde Mental": [
    { title: "Diário", description: "Escrever 3 coisas positivas que aconteceram no dia." },
    { title: "Limites", description: "Praticar dizer 'não' quando necessário." },
    { title: "Desconexão", description: "Passar 1 hora por dia sem dispositivos eletrônicos." }
  ]
};
