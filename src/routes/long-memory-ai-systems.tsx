import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetail, OfferingDetail } from "@/components/site/ServiceDetail";
import { OptimizationMatrix } from "@/components/site/OptimizationMatrix";
import { PartnerSection } from "@/components/site/PartnerSection";
import { ragOptimizationOfferings } from "@/data/optimization-offerings";

const detailedOfferings: OfferingDetail[] = [
  {
    title: "1. Bespoke GraphRAG & Vector Knowledge Systems",
    subtitle: "Dense/sparse hybrid search indexes and structured semantic databases",
    description: "Designing and scaling enterprise knowledge systems that connect model interfaces to private corpora. We implement GraphRAG pipelines that link unstructured text shards into structured Neo4j database entities for reasoning over multi-hop relationships.",
    keySituations: [
      "Model hallucinations on domain-specific facts, policies, or regulatory definitions.",
      "Naive semantic search returning mismatched passages and stuffing context windows.",
      "Low recall rates across complex, multi-document research files."
    ],
    keyStatistics: [
      "Retrieval precision@5: Improved to 93-97% accuracy",
      "Hallucination rates on domain queries: Reduced below 2.5%",
      "Context token utilization: Compressed by 68% using budget limits",
      "Multi-document query search recall: Enhanced by 4.5x via relationships"
    ],
    offeringValue: "Unlocks high-fidelity semantic discovery across massive corporate document silos without exposing sensitive data.",
    expectedOutcomes: [
      "Tuned dense-vector and sparse-lexical indexing schemas.",
      "Neo4j or custom knowledge graph integration pipeline scripts.",
      "Cross-encoder re-ranking algorithms gating context retrieval."
    ]
  },
  {
    title: "2. Persistent State, Episodic & Semantic Memory Engines",
    subtitle: "Long-term context retention and cross-session memory pools",
    description: "Engineering state management and semantic storage layers that allow agent fleets to maintain context across sessions, months, and years. We build procedural memory managers that learn user preferences and corporate standards over time.",
    keySituations: [
      "AI assistants forgetting user context, historical tasks, or corporate policy rules between sessions.",
      "High storage and compute cost from loading extensive conversation logs into context.",
      "State drift causing agent execution errors in long-duration workflows."
    ],
    keyStatistics: [
      "Context reload cost: Reduced by 75% via prefix sharing",
      "Cross-session memory retrieval time: < 12ms p99 latency",
      "State synchronization conflicts: 0% using conflict-free stores",
      "Agent task compliance score: Raised to 98.2% after procedural tuning"
    ],
    offeringValue: "Transforms generic, stateless AI systems into specialized corporate assets that compound intelligence value over time.",
    expectedOutcomes: [
      "Persistent state database architecture mapped to Slurm/K8s clusters.",
      "Privacy-compliant entity extraction filters removing PII before storing memories.",
      "Memory indexing triggers indexing key milestones into historical state tables."
    ]
  }
];

export const Route = createFileRoute("/long-memory-ai-systems")({
  head: () => ({
    meta: [
      { title: "Long-Memory AI Systems — Knowledge Across Years | TrustGrid.AI" },
      { name: "description", content: "Engineer AI systems that retain knowledge across years instead of conversations. Vector databases, knowledge graphs, RAG and semantic search." },
      { property: "og:title", content: "Long-Memory AI Systems | TrustGrid.AI" },
      { property: "og:description", content: "AI memory architectures that span years of enterprise context." },
      { property: "og:url", content: "/long-memory-ai-systems" },
    ],
    links: [{ rel: "canonical", href: "/long-memory-ai-systems" }],
  }),
  component: () => (
    <ServiceDetail
      eyebrow="Long-Memory AI"
      title="AI that remembers — across years, not conversations"
      description="Hybrid memory architectures combining vector embeddings, knowledge graphs and structured stores so your AI compounds value over time."
      outcomes={[
        { value: "95%+", label: "Retrieval Recall" },
        { value: "< 2.5%", label: "Hallucination Rate" },
        { value: "-68%", label: "Context Window Load" },
        { value: "< 12ms", label: "p99 Query Latency" },
      ]}
      capabilities={[
        { title: "Vector Databases", desc: "High-recall semantic memory at billion-scale embeddings." },
        { title: "Knowledge Graphs", desc: "Structured enterprise ontologies with reasoning over relationships." },
        { title: "Persistent Memory", desc: "Episodic and semantic memory for long-running agent sessions." },
        { title: "RAG Architecture", desc: "Multi-stage retrieval, re-ranking, fusion and grounding." },
        { title: "Semantic Search", desc: "Hybrid lexical-semantic search across enterprise corpora." },
        { title: "Memory Governance", desc: "TTL, redaction, citation and provenance tracking." },
      ]}
      stack={["Pinecone", "Weaviate", "Milvus", "Neo4j", "Qdrant", "Elasticsearch", "LangChain"]}
      detailedOfferings={detailedOfferings}
    >
      <OptimizationMatrix
        title="RAG Optimization Offerings"
        description="Transform your retrieval-augmented generation pipelines from simple vector searches into highly precise, context-aware knowledge retrieval systems. We optimize every step from ingestion to generation."
        offerings={ragOptimizationOfferings}
      />
      <PartnerSection />
    </ServiceDetail>
  ),
});
