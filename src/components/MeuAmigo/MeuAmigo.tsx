import React, { useState, useRef, useEffect } from "react";
import styles from "./MeuAmigo.module.css";

const MeuAmigo: React.FC = () => {
  // State do valor que o usuário está digitando e da conversa exibida
  const [userInput, setUserInput] = useState("");
  const [conversation, setConversation] = useState<string[]>([]);
  // Controla se está executando a simulação de resposta para bloquear input
  const [isTyping, setIsTyping] = useState(false);
  // Controla o efeito de cursor piscante
  const inputRef = useRef<HTMLInputElement>(null);

  // Texto fixo de resposta que será exibido letra por letra
  const fixedResponse = "Olá, tudo bem? Estou aqui para ajudar! Mas primeiro preciso que você entenda que sou apenas um assistente virtual. Bla bla bla..";

  useEffect(() => {
    const handleWindowFocus = () => {
      if (inputRef.current && !isTyping) {
        inputRef.current.focus();
      }
    };

    window.addEventListener("focus", handleWindowFocus);
    return () => {
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, [isTyping]);

  // Garante que o input seja focado quando permitido digitar
  useEffect(() => {
    if (inputRef.current && !isTyping) {
      inputRef.current.focus();
    }
  }, [isTyping]);

  // Processa o envio quando o usuário pressiona "Enter"
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && userInput.trim() !== "" && !isTyping) {
      // Adiciona a mensagem do usuário à conversa
      setConversation((prev) => [...prev, `> ${userInput}`]);
      setIsTyping(true);
      // Inicia a simulação da resposta fixa
      simulateResponse(fixedResponse);
    }
  };

  // Função que simula a digitação da resposta letra por letra
  const simulateResponse = async (responseText: string) => {
    setUserInput("");
    let currentText = "";
    for (let char of responseText) {
      currentText += char;
      // Atualiza a conversa: se já existir uma resposta em andamento, atualiza o último item; caso contrário, adiciona um novo item
      setConversation((prev) => {
        if (prev[prev.length - 1]?.startsWith("  ")) {
          const updated = [...prev];
          updated[updated.length - 1] = `  ${currentText}`;
          return updated;
        } else {
          return [...prev, `  ${currentText}`];
        }
      });
      // Delay para o efeito de digitação (50ms por caractere)
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    // Quando a resposta termina, habilita novamente a digitação e limpa o input
    setIsTyping(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Atualiza o valor do input conforme o usuário digita
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  return (
    <div className={styles.terminal}>
      <h1>Meu Amigo</h1>
      <div className={styles.screen}>
        {conversation.map((line, index) => {
          // Identifica se a linha é do usuário (começa com ">") ou da resposta (com indentação)
          const isUser = line.startsWith(">");
          return (
            <div key={index} className={isUser ? styles.userLine : styles.responseLine}>
              {line}
            </div>
          );
        })}
        <div className={styles.inputLine}>
          <span className={styles.prompt}>&gt;</span>
          <input
            ref={inputRef}
            type="text"
            className={styles.inputField}
            value={userInput}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
          />
        </div>
      </div>
    </div>
  );
};

export default MeuAmigo;
