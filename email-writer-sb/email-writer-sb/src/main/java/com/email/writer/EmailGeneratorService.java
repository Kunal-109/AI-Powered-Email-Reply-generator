package com.email.writer;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class EmailGeneratorService {

    private final WebClient webClient;
    private final String apikey;

    public EmailGeneratorService(WebClient.Builder webClientBuilder,
                                 @Value("${gemini.api.url}") String baseUrl,
                                 @Value("${gemini.api.key}") String geminiApiKey) {
        this.webClient = webClientBuilder.baseUrl(baseUrl).build();
        this.apikey = geminiApiKey;
    }



    public String generateEmailReply(EmailRequest emailRequest) {
        //Build prompt
        String prompt = buildPrompt(emailRequest);

        // prepare raw json body
        String requestBody = String.format("""
                {
                    "contents": [
                      {
                        "parts": [
                          {
                            "text": "%s"
                          }
                        ]
                      }
                    ]
                  }""",prompt);


        // send request

        String response = webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/v1beta/models/gemini-2.5-flash:generateContent")
                        .build())

                .header("x-goog-api-key",apikey)
                .header("Content-Type","application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
        // extract response

        return extractResponseContent(response);
    }

    private String extractResponseContent(String response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);
            return root.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();

        prompt.append("Generate an email reply with the following specifications:\n\n");

        // Tone configuration
        String tone = emailRequest.getTone();
        if(tone != null && !tone.isEmpty() && !tone.equalsIgnoreCase("None")) {
            prompt.append("### TONE: ").append(tone.toUpperCase()).append(" ###\n");

            Map<String, String> toneDescriptions = Map.of(
                    "professional", "Use formal business language. Be polite, respectful, and maintain professional boundaries. Avoid slang or overly casual expressions.",
                    "friendly", "Be warm and personable while maintaining professionalism. Use conversational language with a positive attitude. Show genuine interest and enthusiasm.",
                    "casual", "Write in a relaxed, informal style. Use simple language as if talking to a colleague. Keep it brief and straightforward."
            );

            String description = toneDescriptions.get(tone.toLowerCase());
            if(description != null) {
                prompt.append(description).append("\n\n");
            }
        }

        // Structure guidelines
        prompt.append("### EMAIL STRUCTURE ###\n");
        prompt.append("1. Greeting: Use an appropriate salutation\n");
        prompt.append("2. Opening: Acknowledge the original email\n");
        prompt.append("3. Body: Address all key points raised\n");
        prompt.append("4. Closing: End with next steps or a courteous sign-off\n");
        prompt.append("5. Signature line: End with 'Best regards,' or similar\n\n");

        // Important constraints
        prompt.append("### CONSTRAINTS ###\n");
        prompt.append("- Length: 3-5 paragraphs (or less for casual tone)\n");
        prompt.append("- Do NOT include a subject line\n");
        prompt.append("- Do NOT add [Your Name] or placeholder signatures\n");
        prompt.append("- Write in first person (I/We)\n");
        prompt.append("- Be specific and actionable where appropriate\n\n");

        // Original email
        prompt.append("### ORIGINAL EMAIL TO REPLY TO ###\n");
        prompt.append(emailRequest.getEmailContent().trim());
        prompt.append("\n\n");

        // Clear instruction
        prompt.append("### YOUR TASK ###\n");
        prompt.append("Based on the above original email and tone requirements, write a complete email reply. Output ONLY the email body text, nothing else:");

        return prompt.toString();
    }
}
