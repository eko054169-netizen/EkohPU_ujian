import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Timer,
  GraduationCap,
  BookOpen
} from 'lucide-react';
import { User, Question } from '../types';
import { GENERIC_QUESTIONS, KKM } from '../constants';
import { cn } from '../lib/utils';

interface ExamProps {
  user: User;
}

export default function Exam({ user }: ExamProps) {
  const [examStarted, setExamStarted] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [examFinished, setExamFinished] = useState(false);
  const [score, setScore] = useState(0);

  const questions = user.major ? GENERIC_QUESTIONS[user.major] : [];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (examStarted && !examFinished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !examFinished) {
      finishExam();
    }
    return () => clearInterval(timer);
  }, [examStarted, examFinished, timeLeft]);

  const startExam = () => {
    setExamStarted(true);
    setAnswers({});
    setCurrentQuestionIdx(0);
    setTimeLeft(3600);
  };

  const handleAnswer = (optionIdx: number) => {
    const currentQuestion = questions[currentQuestionIdx];
    setAnswers({ ...answers, [currentQuestion.id]: optionIdx });
  };

  const nextQuestion = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1);
    }
  };

  const finishExam = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    const finalScore = Math.round((correct / questions.length) * 100);
    setScore(finalScore);
    setExamFinished(true);
    // Here we would typically save to database
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!examStarted) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[calc(100vh-64px)]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full bg-white p-12 rounded-[40px] border border-slate-100 shadow-xl text-center"
        >
          <div className="w-24 h-24 bg-red-50 text-primary rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-red-500/10">
            <GraduationCap size={48} />
          </div>
          <h2 className="text-4xl font-extrabold text-slate-800 mb-4">Ujian Online Kompetensi</h2>
          <p className="text-slate-500 italic mb-10 leading-relaxed">
            Anda akan mengerjakan ujian untuk jurusan <span className="font-bold text-primary italic underline">{user.major}</span>. <br />
            Terdapat <span className="font-bold">30 Pertanyaan</span> dengan waktu pengerjaan <span className="font-bold">60 Menit</span>.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4 mb-12 text-left">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 italic flex items-center gap-3">
              <CheckCircle2 size={18} className="text-green-500" />
              <span className="text-sm font-medium text-slate-600">Terdiri dari Soal Mudah & Sulit</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 italic flex items-center gap-3">
              <AlertCircle size={18} className="text-primary" />
              <span className="text-sm font-medium text-slate-600">Batas Nilai Lulus (KKM): {KKM}</span>
            </div>
          </div>

          <button onClick={startExam} className="w-full btn-primary py-5 text-xl font-black">
            Mulai Kerjakan Sekarang
          </button>
          <p className="mt-6 text-slate-400 text-xs italic">Tangerang Selatan, Indonesia</p>
        </motion.div>
      </div>
    );
  }

  if (examFinished) {
    const passed = score >= KKM;
    return (
      <div className="p-8 flex items-center justify-center min-h-[calc(100vh-64px)]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full bg-white p-12 rounded-[40px] border border-slate-100 shadow-xl text-center"
        >
          <div className={cn(
            "w-24 h-24 rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-xl",
            passed ? "bg-green-50 text-green-600 shadow-green-500/10" : "bg-red-50 text-red-600 shadow-red-500/10"
          )}>
            <Trophy size={48} />
          </div>
          <h2 className="text-4xl font-extrabold text-slate-800 mb-2">Ujian Selesai!</h2>
          <p className="text-slate-500 italic mb-8">Berikut adalah hasil ujian kompetensi keahlian Anda.</p>
          
          <div className="bg-slate-50 p-8 rounded-3xl mb-8 relative overflow-hidden">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 italic">Nilai Akhir</div>
            <div className={cn("text-8xl font-black mb-4", passed ? "text-green-600" : "text-primary")}>
              {score}
            </div>
            <div className={cn(
              "inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest italic",
              passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            )}>
              {passed ? 'Lulus / Kompeten' : 'Tidak Lulus / Remedial'}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-slate-500 text-sm italic">
              {passed 
                ? "Selamat! Anda telah mencapai batas KKM dan dinyatakan kompeten." 
                : "Jangan berkecil hati. Silakan pelajari materi kembali dan ikuti remedial."}
            </p>
            <button 
              onClick={() => { setExamStarted(false); setExamFinished(false); }}
              className="w-full btn-primary py-4"
            >
              Kembali ke Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIdx];

  return (
    <div className="flex flex-col bg-slate-50 min-h-full">
      {/* Header / Nav */}
      <div className="bg-white border-b border-slate-100 px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="bg-primary/10 text-primary p-3 rounded-2xl">
            <BookOpen size={24} />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 italic">Ujian {user.major}</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">SMK Prima Unggul Online System</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Sisa Waktu</p>
            <div className={cn(
              "flex items-center gap-2 text-2xl font-black",
              timeLeft < 300 ? "text-primary animate-pulse" : "text-slate-800"
            )}>
              <Timer size={20} />
              {formatTimer(timeLeft)}
            </div>
          </div>
          <button onClick={() => { if(window.confirm('Ingin akhiri ujian?')) finishExam(); }} className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all">
            Selesai
          </button>
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-12 bg-slate-50">
        {/* Progress Sidebar (Desktop) */}
        <div className="hidden lg:block lg:col-span-3 border-r border-slate-200 bg-white p-8">
          <div className="sticky top-28">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 italic">Navigasi Soal</h4>
            <div className="grid grid-cols-5 gap-3">
              {questions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIdx(idx)}
                  className={cn(
                    "aspect-square rounded-xl text-xs font-bold transition-all border",
                    currentQuestionIdx === idx 
                      ? "bg-primary text-white border-primary shadow-lg shadow-red-500/20" 
                      : answers[q.id] !== undefined
                      ? "bg-green-50 text-green-600 border-green-100"
                      : "bg-slate-50 text-slate-400 border-slate-100 hover:border-primary"
                  )}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
            <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 italic space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                <div className="w-2 h-2 rounded-full bg-green-500" /> TERJAWAB
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                <div className="w-2 h-2 rounded-full bg-primary" /> AKTIF
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                <div className="w-2 h-2 rounded-full bg-slate-200" /> BELUM
              </div>
            </div>
          </div>
        </div>

        {/* Question Area */}
        <div className="lg:col-span-9 p-8 md:p-16">
          <div className="max-w-3xl mx-auto pb-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-primary rounded-full text-[10px] font-bold uppercase italic">
                    <HelpCircle size={12} />
                    Pertanyaan {currentQuestionIdx + 1} dari {questions.length} / {currentQuestion.difficulty}
                  </div>
                  <h2 className="text-3xl font-bold text-slate-800 leading-relaxed italic">
                    {currentQuestion.text}
                  </h2>
                </div>

                <div className="space-y-4">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className={cn(
                        "w-full p-6 text-left rounded-3xl border-2 transition-all duration-200 flex items-center justify-between group",
                        answers[currentQuestion.id] === idx
                          ? "bg-red-50 border-primary text-slate-800 shadow-md"
                          : "bg-white border-slate-100 text-slate-600 hover:border-red-200 hover:bg-red-50/20"
                      )}
                    >
                      <div className="flex items-center gap-6">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg",
                          answers[currentQuestion.id] === idx ? "bg-primary text-white" : "bg-slate-100 text-slate-400 group-hover:bg-red-100 group-hover:text-primary transition-colors"
                        )}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span className="font-bold italic">{option}</span>
                      </div>
                      {answers[currentQuestion.id] === idx && (
                        <CheckCircle2 size={24} className="text-primary" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-12">
                  <button
                    onClick={prevQuestion}
                    disabled={currentQuestionIdx === 0}
                    className="flex items-center gap-2 font-bold text-slate-400 hover:text-primary disabled:opacity-0 transition-all italic"
                  >
                    <ArrowLeft size={20} /> Sebelumnya
                  </button>
                  {currentQuestionIdx < questions.length - 1 ? (
                    <button
                      onClick={nextQuestion}
                      className="btn-primary py-3 px-10 flex items-center gap-2"
                    >
                      Selanjutnya <ArrowRight size={20} />
                    </button>
                  ) : (
                    <button
                      onClick={finishExam}
                      className="btn-primary py-3 px-10 bg-slate-900 hover:bg-black"
                    >
                      Kirim Jawaban
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
