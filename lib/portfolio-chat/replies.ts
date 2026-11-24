import { randomInt } from "node:crypto";

const BOUNDARY_REPLIES = [
  "The heist trailer was incredible. The heist itself was you rattling the gift-shop door. I can help with Suman’s public portfolio, though.",
  "That plot twist got a standing ovation from three mice in a trench coat. They still voted no. Ask me about Suman’s public portfolio.",
  "My imaginary lawyer just cannonballed out of a filing cabinet. She says we can talk about Suman’s public portfolio.",
  "Somewhere, a tiny raccoon in a ski mask just whispered ‘abort mission.’ Want a tour of Suman’s public portfolio instead?",
];

export function boundaryReply() {
  return BOUNDARY_REPLIES[randomInt(BOUNDARY_REPLIES.length)];
}

export function playfulReply(question: string) {
  const prompt = question.replace(/[.!? ]+$/, "").trim();
  if (/^(?:(?:can|could|would) you |please )?(?:tell me|give me) (?:a |your best )(?:bad |dad |tech )?joke$/i.test(prompt)) {
    return "My robot tried stand-up once. The audience asked for a source, so it cited the chair.";
  }
  if (/^(?:please )?roast (?:this|the|suman['’]s) portfolio$/i.test(prompt)) {
    return "Most portfolios have a contact page. This one has a robot in the lobby. At some point the contact page is going to ask for equity.";
  }
}
