import { useState } from "react";
import OpenAI from "openai";
import "./App.css";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  async function handleSubmit() {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a personal meal planner. You help users plan meals based on their dietary preferences, available ingredients, and health goals. Do not reply to other queries",
          },
          { role: "user", content: query },
        ],
      });

      setResponse(completion.choices[0].message.content);
      const formattedResponse = completion.choices[0].message.content.replace(
        /\n/g,
        "<br>"
      );
      setResponse(formattedResponse);
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse("Error fetching response");
    }
  }

  return (
    <div className="container">
      <h1 className="title"> Welcome to TailorMeal 👋</h1>
      <textarea
        className="query-box"
        placeholder="Enter your queries, goals or dietary preferences here..."
        onChange={handleInputChange}
      />
      <button className="submit-btn" onClick={handleSubmit}>
        Create Plan
      </button>
      <div
        className="response-box"
        dangerouslySetInnerHTML={{ __html: response }}
      ></div>
    </div>
  );
}

export default App;
