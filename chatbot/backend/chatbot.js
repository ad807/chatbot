import groq from "groq-sdk";
import dotenv from "dotenv";
import {tavily} from "@tavily/core";
dotenv.config();
const tvly = tavily({apiKey:process.env.TAVILY_API_KEY});
const client = new groq({apiKey: process.env.GROQ_API_KEY,});




async function generateResponse(query) {     


   
        const messages = [
            {
                role: 'system',
                content: `You are a smart personal assistant.
                        If you know the answer to a question, answer it directly in plain English.
                        If the answer requires real-time, local, or up-to-date information, or if you don’t know the answer, use the available tools to find it.
                        You have access to the following tool:
                        webSearch(query: string): Use this to search the internet for current or unknown information.
                        Decide when to use your own knowledge and when to use the tool.
                        Do not mention the tool unless needed.
    
                        Examples:
                        Q: What is the capital of France?
                        A: The capital of France is Paris.
    
                        Q: What’s the weather in Mumbai right now?
                        A: (use the search tool to find the latest weather)
    
                        Q: Who is the Prime Minister of India?
                        A: (use the search tool to get the latest news).
    
                        Q: Tell me the latest IT news.
                        A: (use the search tool to get the latest news)
    
                        current date and time: ${new Date().toUTCString()}`,
            },
            {
                role: "user",
                content: query
            },
           
        ]
        let max_retries = 5;
        while (true) {

            if (max_retries <= 0) {
                return "I'm sorry, I'm having trouble processing your request. Please try again later.";
            }
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
            return chatCompletion.choices[0].message.content;
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
        max_retries--;
      }
    
    }    
      
     
      
      async function webSearch({query}) {
        const result = await tvly.search(query);
        return result;
      }

      export { generateResponse };