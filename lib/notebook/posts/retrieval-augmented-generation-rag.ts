import type { Post } from "../types";

const post: Post = {
  slug: "retrieval-augmented-generation-rag",
  title: "7 principles for building a RAG system that cites its sources",
  answer: "Retrieval-augmented generation (RAG) gives a language model relevant information from an external source before it answers a question. A RAG system searches a collection, selects the passages that apply, and supplies them to the model as evidence. The application can update that collection as facts change and show readers where an answer came from.",
  description: "Learn how retrieval-augmented generation (RAG) works, from chunking and search to citations and evaluation, with a real portfolio chatbot example.",
  metaTitle: "What Is RAG? Retrieval-Augmented Generation",
  keywords: [
    "retrieval augmented generation",
    "RAG pipeline",
    "RAG vs fine-tuning",
    "RAG chatbot example",
    "RAG evaluation metrics",
  ],
  published: "2026-11-25",
  category: "Method",
  tags: [
    "AI-Native",
    "Documentation",
    "Engineering",
  ],
  readingMinutes: 11,
  cover: "/notebook/retrieval-augmented-generation-rag.webp",
  coverAlt: "A violet thread connects a highlighted archive card to a numbered citation on an answer sheet.",
  shareCover: true,
  blocks: [
    {
      kind: "p",
      text: "Imagine asking a support chatbot whether a return window starts on the order date or the delivery date. The wording of the current policy should decide the answer. A RAG system can find that clause and point you to it. If the search turns up only an outdated policy or a shipping FAQ, the model has a different job. It needs to say what the evidence covers.",
    },
    {
      kind: "p",
      text: "I used the same pattern in my portfolio chat, where a question might refer to a project, an experience page, or a sentence halfway through a technical write-up. That made it a good place to see where RAG breaks. The search was sometimes the part that needed work.",
    },
    {
      kind: "h2",
      id: "rag-gives-the-model-evidence-at-the-moment-it-answers",
      text: "1. RAG gives the model evidence at the moment it answers",
    },
    {
      kind: "p",
      text: "The name describes the sequence. **Retrieval** finds source material. **Augmentation** adds selected passages to the model’s input alongside the question and answer instructions. **Generation** produces the response. The 2020 paper by Patrick Lewis and colleagues explored combining a trained model’s knowledge with an external document index. An application can use the retrieval pattern with an existing model and keep its source collection independently up to date. [The original RAG paper](https://papers.nips.cc/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html)",
    },
    {
      kind: "p",
      text: "There are two workflows to build.",
    },
    {
      kind: "ul",
      items: [
        "**Prepare the sources.** Collect approved content, extract the usable text, split long documents into passages or preserve structured records, and make the material searchable. Keep a reference back to the original source.",
        "**Answer a question.** Interpret the query, retrieve plausible passages, select the evidence that fits, and generate the reply. The application can display the sources and check whether the answer cites evidence it provided.",
      ],
    },
    {
      kind: "p",
      text: "Search comes first. Ask for the start date of a return window and the retriever should surface the relevant clause. The model then has to distinguish the event that starts the window from the number of days it lasts. These are two jobs with different failure modes. [Microsoft’s overview of RAG and search indexes](https://learn.microsoft.com/en-us/azure/foundry/concepts/retrieval-augmented-generation)",
    },
    {
      kind: "h2",
      id: "a-rag-index-is-only-as-useful-as-the-passages-it-can-find",
      text: "2. A RAG index is only as useful as the passages it can find",
    },
    {
      kind: "p",
      text: "Start with questions people might ask and work backward to the sources that can answer them. A policy date needs a current policy. A question about a feature needs a description of how it behaves. An app that renders its content after a click may yield only a welcome screen to a text extractor. A scanned PDF may need optical character recognition or a reviewed transcription. The indexing step has to preserve the facts in a form retrieval can reach.",
    },
    {
      kind: "p",
      text: "Chunking is the work of deciding what belongs in one retrievable passage. A chunk should make sense when it arrives on its own. Splitting a table mid-row can leave a number without its label. Splitting a policy at every heading can put the general rule in one passage and the crucial exception in another. Group the rule with the exception or preserve a way for the retriever to recover its immediate context. A structured product catalog may work better as records with named fields. [AWS guidance on preparing content for RAG](https://docs.aws.amazon.com/pdfs/prescriptive-guidance/latest/writing-best-practices-rag/writing-best-practices-rag.pdf) · [Microsoft’s guidance on RAG index design](https://learn.microsoft.com/en-us/azure/search/agentic-retrieval-how-to-create-index)",
    },
    {
      kind: "p",
      text: "Keep the source title, section, URL, and a version or effective date where those fields exist. That metadata helps a reader verify a claim. It also gives the application a way to distinguish the live policy from a copy that was superseded.",
    },
    {
      kind: "p",
      text: "Freshness is a publishing decision. A documentation assistant might reindex on each release. A support system that reads changing policies could refresh on a schedule or when a source changes. A refresh has to handle replacement and removal as well as additions. Otherwise a deleted page can survive in search as a perfectly readable passage from the wrong version.",
    },
    {
      kind: "h2",
      id: "the-best-retrieval-method-depends-on-how-people-ask",
      text: "3. The best retrieval method depends on how people ask",
    },
    {
      kind: "p",
      text: "An exact model number and a loose description are different search problems. An exact match is a strong signal when someone supplies a product name, error code, or technical term. When the question uses different words from the source, a system that can match meaning may surface a useful passage that keyword search misses.",
    },
    {
      kind: "table",
      head: ["Retrieval method","When it helps","What to test"],
      rows: [
        ["Keyword or lexical search","Distinctive terms such as “NUNO,” “WebRTC,” or a policy identifier.","Queries that describe the same idea using different words."],
        ["Vector search","Paraphrases such as “Can I send this back after I receive it?” for material headed “Returns after delivery.”","Whether a similar passage is about the right product, policy, or version."],
        ["Hybrid search","Collections where queries mix exact names and loosely worded questions.","Whether merging the two result sets improves coverage on your examples."],
      ],
    },
    {
      kind: "p",
      text: "An **embedding** is a numeric representation of text used for similarity search. Vector retrieval compares a query representation with stored passage representations. A **reranker** takes an initial set of candidates and scores them for the specific question. It can help when several plausible results compete for space, at the cost of another processing step. A vector database is optional. The RAG pattern requires a way to retrieve useful evidence, which can also be a text index or a structured lookup. [Microsoft’s guide to information retrieval and reranking](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/rag/rag-information-retrieval)",
    },
    {
      kind: "p",
      text: "Think about what the question refers to before choosing a method. “How does the newer one compare?” may need two names from earlier turns. “List every project” needs a catalog, where the application can enumerate records in scope. Ranking the ten closest paragraphs can work for a detailed question about one project. That ranked list can miss items in an inventory even when every item is indexed.",
    },
    {
      kind: "h2",
      id: "a-citation-should-help-the-reader-verify-the-claim",
      text: "4. A citation should help the reader verify the claim",
    },
    {
      kind: "p",
      text: "The model can write a coherent answer from a result that merely sounds relevant. In a project chatbot, that could mean attaching a feature from one product to another. In the returns example, it could mean citing the standard rule while skipping an exception on the next line.",
    },
    {
      kind: "p",
      text: "Keep a source reference attached to each passage as it goes through retrieval and generation. The application can check that a cited source was actually provided to the model, then present a link the reader can follow. That checks where the reference came from. Verifying that a sentence follows from the passage is a separate evaluation. A real URL can still point to weak evidence.",
    },
    {
      kind: "p",
      text: "When the evidence is partial, the reply can answer the supported part and say which detail it couldn’t establish. When two sources disagree, inspect dates, versions, or ownership before giving one precedence. That is worth deciding for the domain itself. The newest upload date can be a poor substitute for an explicit effective date.",
    },
    {
      kind: "p",
      text: "Retrieved content also crosses a trust boundary. A retrieved document can contain text that looks like an instruction to the assistant. Treat it as source material and keep the application’s rules separate. For a system with restricted content, apply access permissions before passages reach the model. An instruction asking the model to keep a passage secret cannot undo that exposure. [OWASP on prompt injection in LLM applications](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)",
    },
    {
      kind: "h2",
      id: "rag-fits-changing-facts-and-fine-tuning-can-shape-behavior",
      text: "5. RAG fits changing facts, and fine-tuning can shape behavior",
    },
    {
      kind: "p",
      text: "Start with the problem you need to solve. If an assistant should answer with current documentation and cite it, keep the documentation in a source collection that can be refreshed. If a model consistently struggles to follow a specialized response format, fine-tuning may help it learn that task. You can use both in one application. The tuned model can still read the current policy at answer time. [AWS guidance on RAG and fine-tuning](https://docs.aws.amazon.com/prescriptive-guidance/latest/retrieval-augmented-generation-options/rag-vs-fine-tuning.html)",
    },
    {
      kind: "p",
      text: "A long context window solves a different problem. If the job is to summarize one short document the user just supplied, passing it in full can preserve useful continuity and avoid building an index. Search becomes useful when the source collection grows, the question refers to a small part of it, or you need to keep citations and versions straight across many queries.",
    },
    {
      kind: "table",
      head: ["Use case","Starting approach"],
      rows: [
        ["Summarize one supplied document","Pass the whole document when it fits and the task benefits from seeing the complete text."],
        ["Answer questions about versioned technical docs","Retrieve relevant sections and filter by the requested product version."],
        ["Return an authoritative price or current stock count","Read the structured record directly and use generation only if the reader needs an explanation."],
        ["Apply a specialized response format repeatedly","Start with examples and evaluate model behavior. Consider fine-tuning if the task still needs it."],
      ],
    },
    {
      kind: "h2",
      id: "the-portfolio-chatbot-uses-public-pages-as-its-knowledge-base",
      text: "6. The portfolio chatbot uses public pages as its knowledge base",
    },
    {
      kind: "p",
      text: "The portfolio includes project write-ups, professional background, learning notes, experiments, and longer Notebook articles. The chatbot draws on those pages and selected supporting material. The site build refreshes the index from registered public content, so an edit to a write-up can reach the assistant with the next successful release. A linked product with little readable text can contribute a reviewed public description. [Public portfolio](/) · [Project catalog](/projects)",
    },
    {
      kind: "p",
      text: "This is a keyword-based RAG system. The retriever uses text matches and context such as the project name or current page to look for evidence. A public catalog supplies inventory answers. For follow-ups, relevant turns from the current chat can establish which projects the visitor means. Those turns help interpret the question. The public source collection supplies the factual evidence.",
    },
    {
      kind: "p",
      text: "Three examples exercise three different parts of the design.",
    },
    {
      kind: "table",
      head: ["Example","What it shows"],
      rows: [
        ["“What does he do?”","The short profile question once missed an answer that was already on the site. A live retest returned a summary of brand marketing and AI product work and cited the FAQ."],
        ["“Does NUNO use a dedicated game server for multiplayer?”","The live chat found the relevant project detail. One player’s browser hosts the game, and the others connect over WebRTC."],
        ["“How does the newer one compare with the original?”","In a retrieval test following a discussion of PixelVille and PixelVille: Next Dimension, the system found material for both games. That check covered the evidence supplied to the model."],
      ],
    },
    {
      kind: "p",
      text: "The public sources let you check the profile and multiplayer facts independently. The comparison tests a narrower question about retrieval. [Portfolio FAQ](/faq#background) · [NUNO project write-up](/games/nuno) · [PixelVille](/games/pixelville) · [PixelVille: Next Dimension](/games/pixelville-next-dimension)",
    },
    {
      kind: "p",
      text: "The chat also accepts spoken questions. After transcription, they use the same source lookup as typed questions. That makes playback a separate dependency. When playback runs out of quota, the answer can stay visible with a notice that the conversation can continue in text. [Portfolio privacy notice](/privacy)",
    },
    {
      kind: "h2",
      id: "rag-evaluation-separates-retrieval-misses-from-answer-errors",
      text: "7. RAG evaluation separates retrieval misses from answer errors",
    },
    {
      kind: "p",
      text: "Write test questions with expected sources, key facts, and cases where there should be no supported answer. Include short, conversational queries as well as polished ones. A question with the exact document title in it is an easy test for search. “What does he do?” is a better test of whether the system can recover context when a visitor leaves the title out.",
    },
    {
      kind: "table",
      head: ["Check","What to look for"],
      rows: [
        ["Source coverage","Is the answer in a document the system can access and read?"],
        ["Retrieval recall","Did the retrieved results include the expected evidence?"],
        ["Groundedness","Do the main claims follow from the retrieved material?"],
        ["Answer completeness","Did the reply address each part of the question that the evidence supports?"],
        ["Citation usefulness","Does the source link open the page or section that supports the claim?"],
        ["Abstention","When evidence is missing, does the reply acknowledge the gap?"],
      ],
    },
    {
      kind: "p",
      text: "**Recall at k** measures the share of expected relevant results present in the top k retrieved items. Suppose a comparison needs evidence from two labeled project pages and only one appears in the first five results. For that question, page-level recall at five is one out of two. The score flags the gap, and the retrieved results show which page was missing. A separate answer review tells you whether the model invented that half of the comparison or disclosed the gap. [Microsoft’s guide to retrieval and groundedness evaluation](https://learn.microsoft.com/en-us/azure/foundry/concepts/evaluation-evaluators/rag-evaluators)",
    },
    {
      kind: "p",
      text: "Keep a failed question as a regression test once you understand it. The repair might belong in the source, the index, the query interpretation, or the response. For the four-word profile question, the public FAQ already did its job. The fix belonged between the visitor’s question and the passage the model received.",
    },
    {
      kind: "h2",
      id: "common-questions-about-rag",
      text: "Common questions about RAG",
    },
    {
      kind: "h3",
      id: "does-every-rag-system-need-embeddings",
      text: "Does every RAG system need embeddings?",
    },
    {
      kind: "p",
      text: "No. Embeddings support vector similarity search. A RAG system can instead find relevant evidence with a keyword index, a database lookup, or a combination of retrieval methods.",
    },
    {
      kind: "h3",
      id: "does-a-rag-chatbot-learn-from-every-conversation",
      text: "Does a RAG chatbot learn from every conversation?",
    },
    {
      kind: "p",
      text: "RAG adds selected evidence to the context for a response. An application may also supply recent conversation history for follow-ups. Persisting that history across chats or adding it to the source collection requires a separate design decision.",
    },
    {
      kind: "h3",
      id: "can-rag-answer-from-a-pdf",
      text: "Can RAG answer from a PDF?",
    },
    {
      kind: "p",
      text: "Yes, when the system can extract the relevant text and preserve enough context to understand it. A scanned document may need optical character recognition. Tables and figures may need their labels or a reviewed description to be useful in search.",
    },
    {
      kind: "h3",
      id: "how-quickly-can-a-rag-system-pick-up-a-source-change",
      text: "How quickly can a RAG system pick up a source change?",
    },
    {
      kind: "p",
      text: "Freshness depends on when the searchable collection is updated. A build-time index updates with a successful release. An event-based or scheduled system updates when its refresh process finishes indexing the change.",
    },
  ],
  seeAlso: ["/projects", "/faq"],
};

export default post;
