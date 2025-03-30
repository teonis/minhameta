
import React from 'react';
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Sparkles, Target, UserCheck, MessageSquare, Zap } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";

const AIPage = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-amber-50 via-yellow-100 to-white py-12 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 bg-white/80 text-clinic-black px-3 py-1.5 rounded-full text-sm font-medium shadow-sm">
                <Sparkles size={16} className="text-clinic-yellow" />
                Tecnologia Avançada
              </span>
              <h1 className="text-3xl sm:text-5xl font-bold mt-4 sm:mt-6">
                Minha Meta, <span className="text-clinic-yellow">potencializado por IA</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-700 mt-4 sm:mt-6">
                Conheça como a Inteligência Artificial está transformando a experiência terapêutica 
                na Clínica Rocha, tornando seu tratamento mais personalizado e eficiente.
              </p>
            </div>
          </div>
        </section>

        {/* IA Features */}
        <section className="py-12 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">O Poder da IA no Minha Meta</h2>
              <p className="text-gray-600">Veja como a Inteligência Artificial está presente em cada aspecto do aplicativo</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              <Card>
                <CardHeader>
                  <Brain className="h-8 w-8 sm:h-10 sm:w-10 text-clinic-yellow mb-2" />
                  <CardTitle>Análise Inteligente</CardTitle>
                  <CardDescription>Processamento avançado de dados</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base">Nossa IA analisa padrões de progresso e sugere ajustes personalizados nas metas terapêuticas para maximizar os resultados.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Target className="h-8 w-8 sm:h-10 sm:w-10 text-clinic-yellow mb-2" />
                  <CardTitle>Metas Adaptativas</CardTitle>
                  <CardDescription>Objetivos que evoluem com você</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base">O sistema de IA ajusta automaticamente a dificuldade das metas com base no seu desempenho, mantendo-as desafiadoras mas alcançáveis.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <UserCheck className="h-8 w-8 sm:h-10 sm:w-10 text-clinic-yellow mb-2" />
                  <CardTitle>Recomendações Personalizadas</CardTitle>
                  <CardDescription>Conteúdo relevante para você</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base">A IA sugere grupos, desafios e conteúdos específicos baseados no seu perfil, necessidades terapêuticas e histórico de interações.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <MessageSquare className="h-8 w-8 sm:h-10 sm:w-10 text-clinic-yellow mb-2" />
                  <CardTitle>Assistente Virtual</CardTitle>
                  <CardDescription>Suporte quando você precisar</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base">Conte com nosso assistente de IA para tirar dúvidas, obter orientações ou simplesmente conversar sobre seu progresso a qualquer momento.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-clinic-yellow mb-2" />
                  <CardTitle>Incentivos Inteligentes</CardTitle>
                  <CardDescription>Motivação no momento certo</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base">O sistema identifica quando você precisa de um incentivo extra e envia lembretes e mensagens motivacionais personalizadas.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-clinic-yellow mb-2" />
                  <CardTitle>Evolução Contínua</CardTitle>
                  <CardDescription>Sempre melhorando</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base">Nossa plataforma aprende constantemente com as interações de todos os usuários para oferecer uma experiência cada vez mais eficaz.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex justify-around z-10">
          <Link to="/" className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1">Início</span>
          </Link>
          
          <Link to="/sobre-clinica" className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-xs mt-1">Clínica</span>
          </Link>
          
          <Link to="/ia" className="flex flex-col items-center justify-center text-clinic-yellow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span className="text-xs mt-1">IA</span>
          </Link>
          
          <Link to="/login" className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs mt-1">Entrar</span>
          </Link>
        </div>
      )}
      
      {isMobile && <div className="h-16"></div>}
      
      <Footer />
    </div>
  );
};

export default AIPage;
