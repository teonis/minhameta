
import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Sparkles, Target, UserCheck, MessageSquare, Zap } from 'lucide-react';

const AIPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-amber-50 via-yellow-100 to-white py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 bg-white/80 text-clinic-black px-3 py-1.5 rounded-full text-sm font-medium shadow-sm">
                <Sparkles size={16} className="text-clinic-yellow" />
                Tecnologia Avançada
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mt-6">
                Minha Meta, <span className="text-clinic-yellow">potencializado por IA</span>
              </h1>
              <p className="text-lg text-gray-700 mt-6">
                Conheça como a Inteligência Artificial está transformando a experiência terapêutica 
                na Clínica Rocha, tornando seu tratamento mais personalizado e eficiente.
              </p>
            </div>
          </div>
        </section>

        {/* IA Features */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">O Poder da IA no Minha Meta</h2>
              <p className="text-gray-600">Veja como a Inteligência Artificial está presente em cada aspecto do aplicativo</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Brain className="h-10 w-10 text-clinic-yellow mb-2" />
                  <CardTitle>Análise Inteligente</CardTitle>
                  <CardDescription>Processamento avançado de dados</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Nossa IA analisa padrões de progresso e sugere ajustes personalizados nas metas terapêuticas para maximizar os resultados.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Target className="h-10 w-10 text-clinic-yellow mb-2" />
                  <CardTitle>Metas Adaptativas</CardTitle>
                  <CardDescription>Objetivos que evoluem com você</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>O sistema de IA ajusta automaticamente a dificuldade das metas com base no seu desempenho, mantendo-as desafiadoras mas alcançáveis.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <UserCheck className="h-10 w-10 text-clinic-yellow mb-2" />
                  <CardTitle>Recomendações Personalizadas</CardTitle>
                  <CardDescription>Conteúdo relevante para você</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>A IA sugere grupos, desafios e conteúdos específicos baseados no seu perfil, necessidades terapêuticas e histórico de interações.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <MessageSquare className="h-10 w-10 text-clinic-yellow mb-2" />
                  <CardTitle>Assistente Virtual</CardTitle>
                  <CardDescription>Suporte quando você precisar</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Conte com nosso assistente de IA para tirar dúvidas, obter orientações ou simplesmente conversar sobre seu progresso a qualquer momento.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Zap className="h-10 w-10 text-clinic-yellow mb-2" />
                  <CardTitle>Incentivos Inteligentes</CardTitle>
                  <CardDescription>Motivação no momento certo</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>O sistema identifica quando você precisa de um incentivo extra e envia lembretes e mensagens motivacionais personalizadas.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Sparkles className="h-10 w-10 text-clinic-yellow mb-2" />
                  <CardTitle>Evolução Contínua</CardTitle>
                  <CardDescription>Sempre melhorando</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Nossa plataforma aprende constantemente com as interações de todos os usuários para oferecer uma experiência cada vez mais eficaz.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIPage;
