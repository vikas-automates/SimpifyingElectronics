import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

// Initialize the Gemini API client
// Ensure process.env.API_KEY is available in your environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Converts a File object to a Base64 string.
 */
export const fileToGenerativePart = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Analyzes the uploaded image to identify the device and its components.
 */
export const analyzeElectronicDevice = async (base64Image: string, mimeType: string): Promise<AnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image
            }
          },
          {
            text: `You are a cool science teacher explaining electronics to a curious teenager. Analyze this image.
            
            1. Identify the specific device.
            2. Provide a fun, engaging 2-sentence summary of how it works (the "Big Picture").
            3. Identify 4 to 6 main electrical or functional components (internal or external) that make it tick.
            4. For each component:
               - Name: Technical name.
               - Description: Simple physical description.
               - WorkflowRole: Explain its job in the flow of electricity or data (e.g., "First it takes the sound...").
               - Analogy: A relatable real-world comparison (e.g., "Like the brain of the operation", "Like a traffic cop").
               - ScientificPrinciple: The underlying physics/engineering concept (e.g., "Electromagnetism", "Photoelectric Effect", "Capacitance") with a very brief explanation of what that means.
            
            Return the result in JSON format.`
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            deviceName: { type: Type.STRING },
            summary: { type: Type.STRING },
            components: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  workflowRole: { type: Type.STRING },
                  analogy: { type: Type.STRING },
                  scientificPrinciple: { type: Type.STRING }
                },
                required: ["name", "description", "workflowRole", "analogy", "scientificPrinciple"]
              }
            }
          },
          required: ["deviceName", "summary", "components"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AnalysisResult;
    } else {
      throw new Error("No analysis text returned from Gemini.");
    }
  } catch (error) {
    console.error("Analysis Error:", error);
    throw error;
  }
};

/**
 * Generates a schematic diagram based on the original image and analysis.
 */
export const generateSchematicDiagram = async (base64Original: string, mimeType: string, analysis: AnalysisResult): Promise<string> => {
  try {
    // Construct a list of labels for the prompt
    const componentLabels = analysis.components.map(c => c.name).join(", ");
    
    const prompt = `Create a "Science Textbook" style educational illustration based on this object: ${analysis.deviceName}.
    
    Style Requirements:
    - Visual Style: Semi-realistic technical illustration, similar to DK Eyewitness books.
    - View: Cutaway or Exploded view showing internal components.
    - Background: Pure white.
    - Aesthetics: Clean lines, soft colors (pastel blues, greys, oranges), very high clarity.
    
    Content:
    - Recreate the device but reveal its insides.
    - CRITICAL: You MUST generate text labels with leader lines pointing to these parts: ${componentLabels}.
    - The labels should be clearly written and legible.
    
    The image should look like a page from a modern science encyclopedia explaining how things work.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Original
            }
          },
          {
            text: prompt
          }
        ]
      }
    });

    // Extract image from response
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    
    throw new Error("No image generated.");
  } catch (error) {
    console.error("Generation Error:", error);
    throw error;
  }
};