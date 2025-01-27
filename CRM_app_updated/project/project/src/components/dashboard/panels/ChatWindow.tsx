// import React, { useState, useEffect } from 'react';
// import { Send, Paperclip } from 'lucide-react';
// import { v4 as uuidv4 } from 'uuid';
// import { supabase } from '../../../lib/supabase';


// interface Message {
//   id: string;
//   content: string;
//   sender: 'user' | 'gemini';
//   timestamp: Date;
// }

// export default function ChatWindow() {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [conversationId, setConversationId] = useState<string | null>(null);

//   const fetchGeminiResponse = async (query: string): Promise<string> => {
//     setLoading(true);
//     const apiKey = 'AIzaSyAspdTpDwuj5s93jEOnalVm0I7RzeujAqw';

//     try {
//       const response = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             contents: [
//               {
//                 parts: [
//                   {
//                     text: query,
//                   },
//                 ],
//               },
//             ],
//             safetySettings: [
//               {
//                 category: 'HARM_CATEGORY_HARASSMENT',
//                 threshold: 'BLOCK_MEDIUM_AND_ABOVE',
//               },
//               {
//                 category: 'HARM_CATEGORY_HATE_SPEECH',
//                 threshold: 'BLOCK_MEDIUM_AND_ABOVE',
//               },
//               {
//                 category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
//                 threshold: 'BLOCK_MEDIUM_AND_ABOVE',
//               },
//               {
//                 category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
//                 threshold: 'BLOCK_MEDIUM_AND_ABOVE',
//               },
//             ],
//             generationConfig: {
//               temperature: 0.7,
//               topK: 40,
//               topP: 0.95,
//               maxOutputTokens: 1024,
//             },
//           }),
//         }
//       );

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`API error: ${response.status} - ${errorText}`);
//       }

//       const data = await response.json();

//       if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
//         throw new Error('Invalid response format from Gemini API');
//       }

//       return data.candidates[0].content.parts[0].text;
//     } catch (error) {
//       console.error('Error fetching Gemini AI response:', error);
//       return 'Sorry, I am unable to process your request right now.';
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatResponseWithDashes = (response: string): string => {
//     return response
//       .split(/\n\s*|\.\s*\n/)
//       .map((point) => point.replace(/(\\|\*)/g, '').trim())
//       .filter((point) => point)
//       .map((point) => `- ${point}`)
//       .join('\n\n');
//   };

  
//   useEffect(() => {
//     const initializeConversation = async () => {
//       if (!conversationId) {
//         const newConversationId = uuidv4(); // Generate a new conversation ID
//         setConversationId(newConversationId);
  
//         try {
//           // Save the new conversation to the database with an initial placeholder message
//           const { error } = await supabase.from('chat_history').insert([
//             {
//               conversation_id: newConversationId,
//               role: 'system', // Optional: To mark system initialization messages
//               content: 'New conversation started.',
//             },
//           ]);
  
//           if (error) {
//             throw new Error(`Error initializing conversation: ${error.message}`);
//           }
  
//           console.log('Conversation initialized with ID:', newConversationId);
//         } catch (err) {
//           console.error('Failed to initialize conversation:', err);
//         }
//       }
//     };
  
//     initializeConversation();
//   }, [conversationId]);
  
  
//   const handleSend = async () => {
//     if (!message.trim()) return;
  
//     if (!conversationId) {
//       console.error('No conversation ID found. Please start a new conversation.');
//       return;
//     }
  
//     const userMessage: Message = {
//       id: uuidv4(),
//       content: message,
//       sender: 'user',
//       timestamp: new Date(),
//     };
  
//     setMessages((prev) => [...prev, userMessage]);
  
//     try {
//       const { error: userError } = await supabase.from('chat_history').insert([
//         {
//           conversation_id: conversationId,
//           role: 'user',
//           content: message,
//           timestamp: new Date(),
//         },
//       ]);
  
//       if (userError) {
//         throw new Error(`Error saving user message: ${userError.message}`);
//       }
  
//       const geminiResponse = await fetchGeminiResponse(message);
//       const formattedResponse = formatResponseWithDashes(geminiResponse);
  
//       const geminiMessage: Message = {
//         id: uuidv4(),
//         content: formattedResponse,
//         sender: 'gemini',
//         timestamp: new Date(),
//       };
  
//       setMessages((prev) => [...prev, geminiMessage]);
  
//       const { error: assistantError } = await supabase.from('chat_history').insert([
//         {
//           conversation_id: conversationId,
//           role: 'assistant',
//           content: formattedResponse,
//           timestamp: new Date(),
//         },
//       ]);
  
//       if (assistantError) {
//         throw new Error(`Error saving assistant message: ${assistantError.message}`);
//       }
//     } catch (error) {
//       console.error('Error in handleSend:', error);
//     } finally {
//       setMessage('');
//     }
//   };

//   const startNewConversation = () => {
//     const newConversationId = uuidv4();
//     setConversationId(newConversationId);
//     setMessages([]);
//     console.log('Started a new conversation with ID:', newConversationId);
//   };
  
  
//   const loadChatHistory = async (conversationId: string) => {
//     const { data, error } = await supabase
//       .from('chat_history')
//       .select('*')
//       .eq('conversation_id', conversationId)
//       .order('timestamp', { ascending: true });
  
//     if (error) {
//       console.error('Error loading chat history:', error);
//       return;
//     }
  
//     const loadedMessages: Message[] = data.map((msg) => ({
//       id: msg.id,
//       content: msg.content,
//       sender: msg.role,
//       timestamp: new Date(msg.timestamp),
//     }));
  
//     setMessages(loadedMessages);
//   };
  
//   return (
//     <div className="flex flex-col h-full">
//       {/* Chat Messages */}
//       <div className="flex-1 p-4 overflow-y-auto">
//         <div className="space-y-4">
//           {messages.map((msg) => (
//             <div
//               key={msg.id}
//               className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//             >
//               <div
//                 className={`max-w-[70%] rounded-lg px-4 py-2 ${
//                   msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-900'
//                 }`}
//                 style={{ textAlign: 'justify' }} // Add justify alignment here
//               >
//                 <pre className="whitespace-pre-wrap">{msg.content}</pre>
//                 <span className="text-xs opacity-75 mt-1 block">
//                   {msg.timestamp.toLocaleTimeString()}
//                 </span>
//               </div>
//             </div>
//           ))}
//           {loading && (
//             <div className="flex justify-start">
//               <div
//                 className="max-w-[70%] rounded-lg px-4 py-2 bg-white text-gray-500"
//                 style={{ textAlign: 'justify' }} // Add justify alignment here
//               >
//                 Typing...
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Message Input */}
//       <div className="border-t border-gray-200 p-4 bg-white">
//         <div className="flex space-x-4">
//           <button className="text-gray-400 hover:text-gray-600">
//             <Paperclip className="h-5 w-5" />
//           </button>
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type your message..."
//             className="flex-1 focus:outline-none"
//             onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//           />
//           <button
//             onClick={handleSend}
//             className="text-indigo-600 hover:text-indigo-700"
//             disabled={!message.trim() || loading}
//           >
//             <Send className="h-5 w-5" />
//           </button>

//           <button
//             onClick={startNewConversation}
//             className="text-indigo-600 hover:text-indigo-700 px-4 py-2"
//           >
//             Start New Conversation
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from 'react';
// import { Send, Paperclip } from 'lucide-react';
// import { v4 as uuidv4 } from 'uuid';
// import { supabase } from '../../../lib/supabase';

// interface Message {
//   id: string;
//   content: string;
//   sender: 'user' | 'gemini';
//   timestamp: Date;
// }

// interface ChatWindowProps {
//   conversationId: string | null;
//   onNewConversation: () => void;
// }

// export default function ChatWindow({ conversationId, onNewConversation }: ChatWindowProps) {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [loading, setLoading] = useState(false);

//   // Load chat history when conversationId changes
//   useEffect(() => {
//     if (conversationId) {
//       loadChatHistory(conversationId);
//     } else {
//       setMessages([]);
//     }
//   }, [conversationId]);

//   const loadChatHistory = async (convoId: string) => {
//     const { data, error } = await supabase
//       .from('chat_history')
//       .select('*')
//       .eq('conversation_id', convoId)
//       .order('timestamp', { ascending: true });

//     if (error) {
//       console.error('Error loading chat history:', error);
//       return;
//     }

//     const loadedMessages: Message[] = data.map((msg) => ({
//       id: msg.id,
//       content: msg.content,
//       sender: msg.role === 'user' ? 'user' : 'gemini',
//       timestamp: new Date(msg.timestamp),
//     }));

//     setMessages(loadedMessages);
//   };

//   // Your existing fetchGeminiResponse and formatResponseWithDashes functions here...
//   const fetchGeminiResponse = async (query: string): Promise<string> => {
//         setLoading(true);
//         const apiKey = 'AIzaSyAspdTpDwuj5s93jEOnalVm0I7RzeujAqw';
    
//         try {
//           const response = await fetch(
//             `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
//             {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({
//                 contents: [
//                   {
//                     parts: [
//                       {
//                         text: query,
//                       },
//                     ],
//                   },
//                 ],
//                 safetySettings: [
//                   {
//                     category: 'HARM_CATEGORY_HARASSMENT',
//                     threshold: 'BLOCK_MEDIUM_AND_ABOVE',
//                   },
//                   {
//                     category: 'HARM_CATEGORY_HATE_SPEECH',
//                     threshold: 'BLOCK_MEDIUM_AND_ABOVE',
//                   },
//                   {
//                     category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
//                     threshold: 'BLOCK_MEDIUM_AND_ABOVE',
//                   },
//                   {
//                     category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
//                     threshold: 'BLOCK_MEDIUM_AND_ABOVE',
//                   },
//                 ],
//                 generationConfig: {
//                   temperature: 0.7,
//                   topK: 40,
//                   topP: 0.95,
//                   maxOutputTokens: 1024,
//                 },
//               }),
//             }
//           );
    
//           if (!response.ok) {
//             const errorText = await response.text();
//             throw new Error(`API error: ${response.status} - ${errorText}`);
//           }
    
//           const data = await response.json();
    
//           if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
//             throw new Error('Invalid response format from Gemini API');
//           }
    
//           return data.candidates[0].content.parts[0].text;
//         } catch (error) {
//           console.error('Error fetching Gemini AI response:', error);
//           return 'Sorry, I am unable to process your request right now.';
//         } finally {
//           setLoading(false);
//         }
//       };
    
//       const formatResponseWithDashes = (response: string): string => {
//         return response
//           .split(/\n\s*|\.\s*\n/)
//           .map((point) => point.replace(/(\\|\*)/g, '').trim())
//           .filter((point) => point)
//           .map((point) => `- ${point}`)
//           .join('\n\n');
//       };
    

//   const handleSend = async () => {
//     if (!message.trim() || !conversationId) return;
//     console.log('Sending message:', message);

//     const userMessage: Message = {
//       id: uuidv4(),
//       content: message,
//       sender: 'user',
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, userMessage]);

//     try {
//       const { error: userError } = await supabase.from('chat_history').insert([
//         {
//           conversation_id: conversationId,
//           role: 'user',
//           content: message,
//           timestamp: new Date(),
//         },
//       ]);

//       if (userError) throw userError;

//       const geminiResponse = await fetchGeminiResponse(message);
//       const formattedResponse = formatResponseWithDashes(geminiResponse);

//       const geminiMessage: Message = {
//         id: uuidv4(),
//         content: formattedResponse,
//         sender: 'gemini',
//         timestamp: new Date(),
//       };

//       setMessages((prev) => [...prev, geminiMessage]);

//       const { error: assistantError } = await supabase.from('chat_history').insert([
//         {
//           conversation_id: conversationId,
//           role: 'assistant',
//           content: formattedResponse,
//           timestamp: new Date(),
//         },
//       ]);

//       if (assistantError) throw assistantError;
//     } catch (error) {
//       console.error('Error in handleSend:', error);
//     } finally {
//       setMessage('');
//     }
//   };

//   return (
//     <div className="flex flex-col h-full">
//       <div className="flex-1 p-4 overflow-y-auto">
//         <div className="space-y-4">
//           {messages.map((msg) => (
//             <div
//               key={msg.id}
//               className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//             >
//               <div
//                 className={`max-w-[70%] rounded-lg px-4 py-2 ${
//                   msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-900'
//                 }`}
//                 style={{ textAlign: 'justify' }}
//               >
//                 <pre className="whitespace-pre-wrap">{msg.content}</pre>
//                 <span className="text-xs opacity-75 mt-1 block">
//                   {msg.timestamp.toLocaleTimeString()}
//                 </span>
//               </div>
//             </div>
//           ))}
//           {loading && (
//             <div className="flex justify-start">
//               <div className="max-w-[70%] rounded-lg px-4 py-2 bg-white text-gray-500">
//                 Typing...
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="border-t border-gray-200 p-4 bg-white">
//         <div className="flex space-x-4">
//           <button className="text-gray-400 hover:text-gray-600">
//             <Paperclip className="h-5 w-5" />
//           </button>
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type your message..."
//             className="flex-1 focus:outline-none"
//             onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//           />
//           <button
//             onClick={handleSend}
//             className="text-indigo-600 hover:text-indigo-700"
//             disabled={!message.trim() || loading}
//           >
//             <Send className="h-5 w-5" />
//           </button>
//           <button
//             onClick={onNewConversation}
//             className="text-indigo-600 hover:text-indigo-700 px-4 py-2"
//           >
//             Start New Conversation
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from 'react';
// import { Send, Paperclip } from 'lucide-react';
// import { v4 as uuidv4 } from 'uuid';
// import { supabase } from '../../../lib/supabase';

// interface Message {
//   id: string;
//   content: string;
//   sender: 'user' | 'gemini';
//   timestamp: Date;
// }

// interface ChatWindowProps {
//   conversationId: string | null;
//   onNewConversation: () => void;
// }

// export default function ChatWindow({ conversationId, onNewConversation }: ChatWindowProps) {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);

//   const fetchGeminiResponse = async (query: string): Promise<string> => {
//     setLoading(true);
//     const apiKey = 'AIzaSyAspdTpDwuj5s93jEOnalVm0I7RzeujAqw';

//     try {
//       const response = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             contents: [{ parts: [{ text: query }] }],
//             safetySettings: [
//               {
//                 category: 'HARM_CATEGORY_HARASSMENT',
//                 threshold: 'BLOCK_MEDIUM_AND_ABOVE',
//               },
//               {
//                 category: 'HARM_CATEGORY_HATE_SPEECH',
//                 threshold: 'BLOCK_MEDIUM_AND_ABOVE',
//               },
//               {
//                 category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
//                 threshold: 'BLOCK_MEDIUM_AND_ABOVE',
//               },
//               {
//                 category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
//                 threshold: 'BLOCK_MEDIUM_AND_ABOVE',
//               },
//             ],
//             generationConfig: {
//               temperature: 0.7,
//               topK: 40,
//               topP: 0.95,
//               maxOutputTokens: 1024,
//             },
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`API error: ${response.status}`);
//       }

//       const data = await response.json();
//       return data.candidates[0].content.parts[0].text;
//     } catch (error) {
//       console.error('Error fetching Gemini AI response:', error);
//       return 'Sorry, I am unable to process your request right now.';
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatResponseWithDashes = (response: string): string => {
//     return response
//       .split(/\n\s*|\.\s*\n/)
//       .map((point) => point.replace(/(\\|\*)/g, '').trim())
//       .filter((point) => point)
//       .map((point) => `- ${point}`)
//       .join('\n\n');
//   };

//   useEffect(() => {
//     if (conversationId) {
//       setCurrentConversationId(conversationId);
//       loadChatHistory(conversationId);
//     }
//   }, [conversationId]);

//   const loadChatHistory = async (convoId: string) => {
//     const { data, error } = await supabase
//       .from('chat_history')
//       .select('*')
//       .eq('conversation_id', convoId)
//       .order('timestamp', { ascending: true });
  
//     if (error) {
//       console.error('Error loading chat history:', error);
//       return;
//     }
  
//     const loadedMessages: Message[] = data.map((msg: any) => ({
//       id: msg.id,
//       content: msg.content,
//       sender: msg.role === 'user' ? 'user' : 'gemini' as 'user' | 'gemini',
//       timestamp: new Date(msg.timestamp),
//     }));
  
//     setMessages(loadedMessages);
//   };

//   const createNewConversation = async () => {
//     const newId = uuidv4();
//     setCurrentConversationId(newId);
//     return newId;
//   };

//   const handleSend = async () => {
//     if (!message.trim()) return;

//     const convoId = currentConversationId || await createNewConversation();
    
//     const userMessage: Message = {
//       id: uuidv4(),
//       content: message,
//       sender: 'user',
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, userMessage]);

//     try {
//       const { error: userError } = await supabase.from('chat_history').insert([
//         {
//           conversation_id: convoId,
//           role: 'user',
//           content: message,
//           timestamp: new Date(),
//         },
//       ]);

//       if (userError) throw userError;

//       const geminiResponse = await fetchGeminiResponse(message);
//       const formattedResponse = formatResponseWithDashes(geminiResponse);

//       const geminiMessage: Message = {
//         id: uuidv4(),
//         content: formattedResponse,
//         sender: 'gemini',
//         timestamp: new Date(),
//       };

//       setMessages((prev) => [...prev, geminiMessage]);

//       await supabase.from('chat_history').insert([
//         {
//           conversation_id: convoId,
//           role: 'assistant',
//           content: formattedResponse,
//           timestamp: new Date(),
//         },
//       ]);
//     } catch (error) {
//       console.error('Error in handleSend:', error);
//     } finally {
//       setMessage('');
//     }
//   };

//   return (
//     <div className="flex flex-col h-full">
//       <div className="flex-1 p-4 overflow-y-auto">
//         <div className="space-y-4">
//           {messages.map((msg) => (
//             <div
//               key={msg.id}
//               className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//             >
//               <div
//                 className={`max-w-[70%] rounded-lg px-4 py-2 ${
//                   msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-900'
//                 }`}
//                 style={{ textAlign: 'justify' }}
//               >
//                 <pre className="whitespace-pre-wrap">{msg.content}</pre>
//                 <span className="text-xs opacity-75 mt-1 block">
//                   {msg.timestamp.toLocaleTimeString()}
//                 </span>
//               </div>
//             </div>
//           ))}
//           {loading && (
//             <div className="flex justify-start">
//               <div className="max-w-[70%] rounded-lg px-4 py-2 bg-white text-gray-500">
//                 Typing...
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="border-t border-gray-200 p-4 bg-white">
//         <div className="flex space-x-4">
//           <button className="text-gray-400 hover:text-gray-600">
//             <Paperclip className="h-5 w-5" />
//           </button>
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type your message..."
//             className="flex-1 focus:outline-none"
//             onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//           />
//           <button
//             onClick={handleSend}
//             className="text-indigo-600 hover:text-indigo-700"
//             disabled={!message.trim() || loading}
//           >
//             <Send className="h-5 w-5" />
//           </button>
//           <button
//             onClick={onNewConversation}
//             className="text-indigo-600 hover:text-indigo-700 px-4 py-2"
//           >
//             Start New Conversation
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }










// import { useState, useEffect } from 'react';
// import { Send, Paperclip } from 'lucide-react';
// import { v4 as uuidv4 } from 'uuid';
// import { supabase } from '../../../lib/supabase';
// import { Task } from '../../../types/types'; // Adjust the path as needed
// import { useAuth } from '../../../contexts/AuthContext'; // Assuming you have an AuthContext

// interface Message {
//   id: string;
//   content: string;
//   sender: 'user' | 'gemini';
//   timestamp: Date;
// }

// interface ChatWindowProps {
//   conversationId: string | null;
//   onNewConversation: () => void;
// }

// export default function ChatWindow({ conversationId, onNewConversation }: ChatWindowProps) {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
//   const { user } = useAuth(); // Get the current user from your AuthContext

//   const fetchGeminiResponse = async (query: string): Promise<string> => {
//     setLoading(true);
//     const apiKey = 'AIzaSyAspdTpDwuj5s93jEOnalVm0I7RzeujAqw';

//     try {
//       const response = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             contents: [{ parts: [{ text: query }] }],
//             safetySettings: [
//               {
//                 category: 'HARM_CATEGORY_HARASSMENT',
//                 threshold: 'BLOCK_MEDIUM_AND_ABOVE',
//               },
//               {
//                 category: 'HARM_CATEGORY_HATE_SPEECH',
//                 threshold: 'BLOCK_MEDIUM_AND_ABOVE',
//               },
//               {
//                 category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
//                 threshold: 'BLOCK_MEDIUM_AND_ABOVE',
//               },
//               {
//                 category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
//                 threshold: 'BLOCK_MEDIUM_AND_ABOVE',
//               },
//             ],
//             generationConfig: {
//               temperature: 0.7,
//               topK: 40,
//               topP: 0.95,
//               maxOutputTokens: 1024,
//             },
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`API error: ${response.status}`);
//       }

//       const data = await response.json();
//       return data.candidates[0].content.parts[0].text;
//     } catch (error) {
//       console.error('Error fetching Gemini AI response:', error);
//       return 'Sorry, I am unable to process your request right now.';
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatResponseWithDashes = (response: string): string => {
//     return response
//       .split(/\n\s*|\.\s*\n/)
//       .map((point) => point.replace(/(\\|\*)/g, '').trim())
//       .filter((point) => point)
//       .map((point) => `- ${point}`)
//       .join('\n\n');
//   };

//   useEffect(() => {
//     if (conversationId) {
//       setCurrentConversationId(conversationId);
//       loadChatHistory(conversationId);
//     }
//   }, [conversationId]);

//   const loadChatHistory = async (convoId: string) => {
//     const { data, error } = await supabase
//       .from('chat_history')
//       .select('*')
//       .eq('conversation_id', convoId)
//       .order('timestamp', { ascending: true });

//     if (error) {
//       console.error('Error loading chat history:', error);
//       return;
//     }

//     const loadedMessages: Message[] = data.map((msg: any) => ({
//       id: msg.id,
//       content: msg.content,
//       sender: msg.role === 'user' ? 'user' : 'gemini' as 'user' | 'gemini',
//       timestamp: new Date(msg.timestamp),
//     }));

//     setMessages(loadedMessages);
//   };

//   const createNewConversation = async () => {
//     const newId = uuidv4();
//     setCurrentConversationId(newId);
//     return newId;
//   };

//   const extractTaskDetails = async (prompt: string): Promise<Partial<Task>> => {
//     const taskDetails: Partial<Task> = {};

//     // Extract task description
//     const descriptionMatch = prompt.match(/send (.*?) details of study X/i);
//     if (descriptionMatch) {
//       taskDetails.task_description = `Send ${descriptionMatch[1]} details of study X`;
//     } else {
//       // Fallback: Use the entire prompt as the task description
//       taskDetails.task_description = prompt;
//     }

//     // Extract customer/HCP name (e.g., "Dr Rugo")
//     const customerMatch = prompt.match(/Dr (\w+)/i);
//     if (customerMatch) {
//       const customerName = customerMatch[1];
//       const { data: customer } = await supabase
//         .from('customers')
//         .select('id')
//         .ilike('name', `%${customerName}%`)
//         .single();

//       if (customer) {
//         taskDetails.customer_id = customer.id;
//       }
//     }

//     // Extract due date (if mentioned in the prompt)
//     const dueDateMatch = prompt.match(/by (\d{4}-\d{2}-\d{2})/i); // Matches "by YYYY-MM-DD"
//     if (dueDateMatch) {
//       taskDetails.due_date = dueDateMatch[1];
//     } else {
//       // Set default due date to 7 days from today
//       const dueDate = new Date();
//       dueDate.setDate(dueDate.getDate() + 7);
//       taskDetails.due_date = dueDate.toISOString().split('T')[0];
//     }

//     // Extract task requested by (e.g., "requested by John")
//     const requestedByMatch = prompt.match(/requested by (\w+)/i);
//     if (requestedByMatch) {
//       taskDetails.task_requested_by = requestedByMatch[1];
//     } else {
//       // Default to the current user's name or "User"
//       taskDetails.task_requested_by = user?.email || 'User'; // Use email or a default value
//     }

//     // Assign task to the current user
//     taskDetails.task_assigned_to = user?.id || '';
//     taskDetails.task_created_by = user?.id || '';

//     // Set default status
//     taskDetails.status = 'Pending';

//     return taskDetails;
//   };

//   const createTask = async (taskDetails: Partial<Task>) => {
//     try {
//       console.log('Creating task with details:', taskDetails); // Log task details for debugging
//       const { data, error } = await supabase
//         .from('tasks')
//         .insert([taskDetails])
//         .select();

//       if (error) throw error;
//       console.log('Task created successfully:', data); // Log success for debugging
//       return data;
//     } catch (error) {
//       console.error('Error creating task:', error);
//       throw error;
//     }
//   };

//   const handleSend = async () => {
//     if (!message.trim()) return;

//     const convoId = currentConversationId || await createNewConversation();

//     const userMessage: Message = {
//       id: uuidv4(),
//       content: message,
//       sender: 'user',
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, userMessage]);

//     try {
//       const { error: userError } = await supabase.from('chat_history').insert([
//         {
//           conversation_id: convoId,
//           role: 'user',
//           content: message,
//           timestamp: new Date(),
//         },
//       ]);

//       if (userError) throw userError;

//       // Improved task detection logic
//       const isTaskCreationPrompt =
//         message.toLowerCase().includes('create task') ||
//         message.toLowerCase().includes('make a task') ||
//         message.toLowerCase().includes('new task');

//       if (isTaskCreationPrompt) {
//         // Extract task details and create the task
//         const taskDetails = await extractTaskDetails(message);
//         const taskData = await createTask(taskDetails);

//         // Log the task details for debugging (not shown to the user)
//         console.log('Task created successfully:', taskData);

//         const geminiMessage: Message = {
//           id: uuidv4(),
//           content: 'Task created successfully', // Simplified response
//           sender: 'gemini',
//           timestamp: new Date(),
//         };

//         setMessages((prev) => [...prev, geminiMessage]);

//         await supabase.from('chat_history').insert([
//           {
//             conversation_id: convoId,
//             role: 'assistant',
//             content: 'Task created successfully', // Simplified response
//             timestamp: new Date(),
//           },
//         ]);
//       } else {
//         // If it's not a task creation prompt, send the message to Gemini API
//         const geminiResponse = await fetchGeminiResponse(message);
//         const formattedResponse = formatResponseWithDashes(geminiResponse);

//         const geminiMessage: Message = {
//           id: uuidv4(),
//           content: formattedResponse,
//           sender: 'gemini',
//           timestamp: new Date(),
//         };

//         setMessages((prev) => [...prev, geminiMessage]);

//         await supabase.from('chat_history').insert([
//           {
//             conversation_id: convoId,
//             role: 'assistant',
//             content: formattedResponse,
//             timestamp: new Date(),
//           },
//         ]);
//       }
//     } catch (error) {
//       console.error('Error in handleSend:', error);

//       // Display an error message to the user if task creation fails
//       const errorMessage: Message = {
//         id: uuidv4(),
//         content: 'Failed to create task. Please try again.',
//         sender: 'gemini',
//         timestamp: new Date(),
//       };

//       setMessages((prev) => [...prev, errorMessage]);

//       await supabase.from('chat_history').insert([
//         {
//           conversation_id: convoId,
//           role: 'assistant',
//           content: 'Failed to create task. Please try again.',
//           timestamp: new Date(),
//         },
//       ]);
//     } finally {
//       setMessage('');
//     }
//   };

//   return (
//     <div className="flex flex-col h-full">
//       <div className="flex-1 p-4 overflow-y-auto">
//         <div className="space-y-4">
//           {messages.map((msg) => (
//             <div
//               key={msg.id}
//               className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//             >
//               <div
//                 className={`max-w-[70%] rounded-lg px-4 py-2 ${
//                   msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-900'
//                 }`}
//                 style={{ textAlign: 'justify' }}
//               >
//                 <pre className="whitespace-pre-wrap">{msg.content}</pre>
//                 <span className="text-xs opacity-75 mt-1 block">
//                   {msg.timestamp.toLocaleTimeString()}
//                 </span>
//               </div>
//             </div>
//           ))}
//           {loading && (
//             <div className="flex justify-start">
//               <div className="max-w-[70%] rounded-lg px-4 py-2 bg-white text-gray-500">
//                 Typing...
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="border-t border-gray-200 p-4 bg-white">
//         <div className="flex space-x-4">
//           <button className="text-gray-400 hover:text-gray-600">
//             <Paperclip className="h-5 w-5" />
//           </button>
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type your message..."
//             className="flex-1 focus:outline-none"
//             onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//           />
//           <button
//             onClick={handleSend}
//             className="text-indigo-600 hover:text-indigo-700"
//             disabled={!message.trim() || loading}
//           >
//             <Send className="h-5 w-5" />
//           </button>
//           <button
//             onClick={onNewConversation}
//             className="text-indigo-600 hover:text-indigo-700 px-4 py-2"
//           >
//             Start New Conversation
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }













import { useState, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../../../lib/supabase';
import { Task } from '../../../types/types'; // Adjust the path as needed
import { useAuth } from '../../../contexts/AuthContext'; // Assuming you have an AuthContext

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'gemini';
  timestamp: Date;
}

interface ChatWindowProps {
  conversationId: string | null;
  onNewConversation: () => void;
}

export default function ChatWindow({ conversationId, onNewConversation }: ChatWindowProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const { user } = useAuth(); // Get the current user from your AuthContext

  const fetchGeminiResponse = async (query: string): Promise<string> => {
    setLoading(true);
    const apiKey = 'AIzaSyAspdTpDwuj5s93jEOnalVm0I7RzeujAqw';

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: query }] }],
            safetySettings: [
              {
                category: 'HARM_CATEGORY_HARASSMENT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE',
              },
              {
                category: 'HARM_CATEGORY_HATE_SPEECH',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE',
              },
              {
                category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE',
              },
              {
                category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE',
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error fetching Gemini AI response:', error);
      return 'Sorry, I am unable to process your request right now.';
    } finally {
      setLoading(false);
    }
  };

  const formatResponseWithDashes = (response: string): string => {
    return response
      .split(/\n\s*|\.\s*\n/)
      .map((point) => point.replace(/(\\|\*)/g, '').trim())
      .filter((point) => point)
      .map((point) => `- ${point}`)
      .join('\n\n');
  };

  useEffect(() => {
    if (conversationId) {
      setCurrentConversationId(conversationId);
      loadChatHistory(conversationId);
    }
  }, [conversationId]);

  const loadChatHistory = async (convoId: string) => {
    const { data, error } = await supabase
      .from('chat_history')
      .select('*')
      .eq('conversation_id', convoId)
      .order('timestamp', { ascending: true });

    if (error) {
      console.error('Error loading chat history:', error);
      return;
    }

    const loadedMessages: Message[] = data.map((msg: any) => ({
      id: msg.id,
      content: msg.content,
      sender: msg.role === 'user' ? 'user' : 'gemini' as 'user' | 'gemini',
      timestamp: new Date(msg.timestamp),
    }));

    setMessages(loadedMessages);
  };

  const createNewConversation = async () => {
    const newId = uuidv4();
    setCurrentConversationId(newId);
    return newId;
  };

  const extractTaskDetails = async (prompt: string): Promise<Partial<Task>> => {
    const taskDetails: Partial<Task> = {};

    // Extract task description and name
    const descriptionMatch = prompt.match(/send (.*?) details of study X/i);
    if (descriptionMatch) {
      taskDetails.task_description = `Send ${descriptionMatch[1]} details of study X`;
      taskDetails.task_requested_by = descriptionMatch[1].trim(); // Extract and set the name
    } else {
      // Fallback: Use the entire prompt as the task description
      taskDetails.task_description = prompt;
      taskDetails.task_requested_by = 'User'; // Default value
    }

    // Set due date to current date + 7 days
    const currentDate = new Date();
    const dueDate = new Date(currentDate);
    dueDate.setDate(currentDate.getDate() + 7); // Add 7 days to the current date
    taskDetails.due_date = dueDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD

    // Assign task to the current user
    taskDetails.task_assigned_to = user?.id || '';
    taskDetails.task_created_by = user?.id || '';

    // Set default status
    taskDetails.status = 'Pending';

    return taskDetails;
  };

  const createTask = async (taskDetails: Partial<Task>) => {
    try {
      console.log('Creating task with details:', taskDetails); // Log task details for debugging
      const { data, error } = await supabase
        .from('tasks')
        .insert([taskDetails])
        .select();

      if (error) throw error;
      console.log('Task created successfully:', data); // Log success for debugging
      return data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    const convoId = currentConversationId || await createNewConversation();

    const userMessage: Message = {
      id: uuidv4(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const { error: userError } = await supabase.from('chat_history').insert([
        {
          conversation_id: convoId,
          role: 'user',
          content: message,
          timestamp: new Date(),
        },
      ]);

      if (userError) throw userError;

      // Improved task detection logic
      const isTaskCreationPrompt =
        message.toLowerCase().includes('create task') ||
        message.toLowerCase().includes('make a task') ||
        message.toLowerCase().includes('new task');

      if (isTaskCreationPrompt) {
        // Extract task details and create the task
        const taskDetails = await extractTaskDetails(message);
        const taskData = await createTask(taskDetails);

        // Log the task details for debugging (not shown to the user)
        console.log('Task created successfully:', taskData);

        const geminiMessage: Message = {
          id: uuidv4(),
          content: 'Task created successfully', // Simplified response
          sender: 'gemini',
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, geminiMessage]);

        await supabase.from('chat_history').insert([
          {
            conversation_id: convoId,
            role: 'assistant',
            content: 'Task created successfully', // Simplified response
            timestamp: new Date(),
          },
        ]);
      } else {
        // If it's not a task creation prompt, send the message to Gemini API
        const geminiResponse = await fetchGeminiResponse(message);
        const formattedResponse = formatResponseWithDashes(geminiResponse);

        const geminiMessage: Message = {
          id: uuidv4(),
          content: formattedResponse,
          sender: 'gemini',
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, geminiMessage]);

        await supabase.from('chat_history').insert([
          {
            conversation_id: convoId,
            role: 'assistant',
            content: formattedResponse,
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) {
      console.error('Error in handleSend:', error);

      // Display an error message to the user if task creation fails
      const errorMessage: Message = {
        id: uuidv4(),
        content: 'Failed to create task. Please try again.',
        sender: 'gemini',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);

      await supabase.from('chat_history').insert([
        {
          conversation_id: convoId,
          role: 'assistant',
          content: 'Failed to create task. Please try again.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-900'
                }`}
                style={{ textAlign: 'justify' }}
              >
                <pre className="whitespace-pre-wrap">{msg.content}</pre>
                <span className="text-xs opacity-75 mt-1 block">
                  {msg.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[70%] rounded-lg px-4 py-2 bg-white text-gray-500">
                Typing...
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex space-x-4">
          <button className="text-gray-400 hover:text-gray-600">
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 focus:outline-none"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="text-indigo-600 hover:text-indigo-700"
            disabled={!message.trim() || loading}
          >
            <Send className="h-5 w-5" />
          </button>
          <button
            onClick={onNewConversation}
            className="text-indigo-600 hover:text-indigo-700 px-4 py-2"
          >
            Start New Conversation
          </button>
        </div>
      </div>
    </div>
  );
}