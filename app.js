import groq from "groq-sdk";
import dotenv from "dotenv";
import {tavily} from "@tavily/core";
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
dotenv.config();
const tvly = tavily({apiKey:process.env.TAVILY_API_KEY});
const client = new groq({apiKey: process.env.GROQ_API_KEY,});
// async function main() {
// const chatCompletion = await client.chat.completions.create({
//    "messages": [
//     {
//         "role": "system",
//         "content":`you are a smart assistant
      
//         `
//     },
//     {
//       "role": "user",
//       "content": "when was iphone 17 launched",
//     }
//   ],
//   "model": "llama-3.3-70b-versatile",
//   "temperature": 0.8,
// });
// console.log(chatCompletion.choices[0].message.content);
// }

// main();

// async function main() {
//   const chatCompletion = await client.chat.completions.create({
//       messages: [
//           {
//               role: "system",
//               content: `you are a smart assistant. you have following tools available
//               - webSearch: to search the web for a given query`
//           },
//           {
//               role: "user",
//               content: "when was iphone 17 launched"
//           }
//       ],
//       tools: [
//           {
//               type: "function",
//               function: {
//                   name: "webSearch",
//                   description: "Search the web for a given query",
//                   parameters: {
//                       type: "object",
//                       properties: {
//                           query: {
//                               type: "string",
//                               description: "The search query"
//                           }
//                       },
//                       required: ["query"]
//                   }
//               }
//           }
//       ],
//       tool_choice: "auto",
//       model: "llama-3.3-70b-versatile",
//       temperature: 0
//   });
  
//   const toolCalls = chatCompletion.choices[0].message.tool_calls;
  
//   if (!toolCalls) {
//       console.log(chatCompletion.choices[0].message.content);
//       return;
//   }
  
//   const messages = [
//       {
//           role: "system",
//           content: `you are a smart assistant. you have following tools available
//           - webSearch: to search the web for a given query`
//       },
//       {
//           role: "user",
//           content: "when was iphone 17 launched"
//       },
//       chatCompletion.choices[0].message
//   ];
  
//   for (const toolCall of toolCalls) {
//       const functionName = toolCall.function.name;
//       const functionArgs = toolCall.function.arguments;
//       if (functionName === "webSearch") {
//           const query = JSON.parse(functionArgs).query;
//           const result = await webSearch({query});
//           const content = result.results.length > 0 ? result.results[0].content : "No results found.";
          
//           messages.push({
//               role: "tool",
//               tool_call_id: toolCall.id,
//               content: content
//           });
//       }
//   }
  
//   const chatCompletion2 = await client.chat.completions.create({
//       messages: messages,
//       model: "llama-3.3-70b-versatile",
//       temperature: 0
//   });
  
//   console.log(chatCompletion2.choices[0].message.content);
// }
// main();

// async function webSearch({query}) {
//   const result = await tvly.search(query);
//   return result;
// }



// async function main() {
//     const query = "when was iphone 17 launched";
//     const messages = [
//         {
//             role: "system",
//             content: `you are a smart assistant. you have following tools available
//             - webSearch: to search the web for a given query`
//         },
//         {
//             role: "user",
//             content: query
//         },
       
//     ]
//     while (true) {
//     const chatCompletion = await client.chat.completions.create({
        
   
//         messages:messages,
//         tools: [
//             {
//                 type: "function",
//                 function: {
//                     name: "webSearch",
//                     description: "Search the web for a given query",
//                     parameters: {
//                         type: "object",
//                         properties: {
//                             query: {
//                                 type: "string",
//                                 description: "The search query"
//                             }
//                         },
//                         required: ["query"]
//                     }
//                 }
//             }
//         ],
//         tool_choice: "auto",model: "llama-3.1-8b-instant",
//         temperature: 0
//     });
//     messages.push(chatCompletion.choices[0].message);
//     const toolCalls = chatCompletion.choices[0].message.tool_calls;
    
//     if (!toolCalls) {
//         console.log(chatCompletion.choices[0].message.content);
//         break;
//     }
    
    
//     for (const toolCall of toolCalls) {
//         const functionName = toolCall.function.name;
//         const functionArgs = toolCall.function.arguments;
//         if (functionName === "webSearch") {
//             console.log("webSearch tool call");
//             const query = JSON.parse(functionArgs).query;
//             const result = await webSearch({query});
//             const content = result.results.length > 0 ? result.results[0].content : "No results found.";
            
//             messages.push({
//                 role: "tool",
//                 tool_call_id: toolCall.id,
//                 content: content
//             });
//         }
//     }
    
//   }}
//   main();
  
//   async function webSearch({query}) {
//     const result = await tvly.search(query);
//     return result;
//   }




// async function main() {
//     const rl = readline.createInterface({ input, output });
// const query = await rl.question('User: ');
// rl.close();

//     const messages = [
//         {
//             role: "system",
//             content: `you are a smart assistant. you have following tools available
//             - webSearch: to search the web for a given query`
//         },
//         {
//             role: "user",
//             content: query
//         },
       
//     ]
//     while (true) {
//     const chatCompletion = await client.chat.completions.create({
        
   
//         messages:messages,
//         tools: [
//             {
//                 type: "function",
//                 function: {
//                     name: "webSearch",
//                     description: "Search the web for a given query",
//                     parameters: {
//                         type: "object",
//                         properties: {
//                             query: {
//                                 type: "string",
//                                 description: "The search query"
//                             }
//                         },
//                         required: ["query"]
//                     }
//                 }
//             }
//         ],
//         tool_choice: "auto",model: "llama-3.1-8b-instant",
//         temperature: 0
//     });
//     messages.push(chatCompletion.choices[0].message);
//     const toolCalls = chatCompletion.choices[0].message.tool_calls;
    
//     if (!toolCalls) {
//         console.log(chatCompletion.choices[0].message.content);
//         break;
//     }
    
    
//     for (const toolCall of toolCalls) {
//         const functionName = toolCall.function.name;
//         const functionArgs = toolCall.function.arguments;
//         if (functionName === "webSearch") {
//             console.log("webSearch tool call");
//             const query = JSON.parse(functionArgs).query;
//             const result = await webSearch({query});
//             const content = result.results.length > 0 ? result.results[0].content : "No results found.";
            
//             messages.push({
//                 role: "tool",
//                 tool_call_id: toolCall.id,
//                 content: content
//             });
//         }
//     }
    
//   }}
//   main();
  
//   async function webSearch({query}) {
//     const result = await tvly.search(query);
//     return result;
//   }




async function main() {     

while (true) {  

    const rl = readline.createInterface({ input, output });
const query = await rl.question('User: ');

if (query === "exit") {
    break;
}
    const messages = [
        {
            role: "system",
            content: `you are a smart assistant. you have following tools available
            - webSearch: to search the web for a given query`
        },
        {
            role: "user",
            content: query
        },
       
    ]
    while (true) {
    const chatCompletion = await client.chat.completions.create({
        
   
        messages:messages,
        tools: [
            {
                type: "function",
                function: {
                    name: "webSearch",
                    description: "Search the web for a given query",
                    parameters: {
                        type: "object",
                        properties: {
                            query: {
                                type: "string",
                                description: "The search query"
                            }
                        },
                        required: ["query"]
                    }
                }
            }
        ],
        tool_choice: "auto",model: "llama-3.1-8b-instant",
        temperature: 0
    });
    messages.push(chatCompletion.choices[0].message);
    const toolCalls = chatCompletion.choices[0].message.tool_calls;
    
    if (!toolCalls) {
        console.log("Assistant: " + chatCompletion.choices[0].message.content);
        break;
    }
    
    
    for (const toolCall of toolCalls) {
        const functionName = toolCall.function.name;
        const functionArgs = toolCall.function.arguments;
        if (functionName === "webSearch") {
            console.log("webSearch tool call");
            const query = JSON.parse(functionArgs).query;
            const result = await webSearch({query});
            const content = result.results.length > 0 ? result.results[0].content : "No results found.";
            
            messages.push({
                role: "tool",
                tool_call_id: toolCall.id,
                content: content
            });
        }
    }
    
  }
rl.close();
}    
  }
  main();
  
  async function webSearch({query}) {
    const result = await tvly.search(query);
    return result;
  }