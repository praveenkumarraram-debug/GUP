export interface OptimizationOffering {
  id: number;
  problem: string;
  solutionTitle: string;
  solutionDesc: string;
  outcome: string;
}

export const llmOptimizationOfferings: OptimizationOffering[] = [
  {
    id: 1,
    problem: "High inference latency and slow Time-To-First-Token (TTFT)",
    solutionTitle: "Speculative Decoding Implementation",
    solutionDesc: "Deploying draft models to predict tokens in parallel.",
    outcome: "40% reduction in TTFT; 2x throughput. Quality maintained (MMLU variance < 1%)."
  },
  {
    id: 2,
    problem: "GPU underutilization during concurrent requests",
    solutionTitle: "Continuous Batching & Dynamic Routing",
    solutionDesc: "Orchestration of variable-length sequences on shared compute.",
    outcome: "3x throughput increase; 80%+ GPU utilization."
  },
  {
    id: 3,
    problem: "Excessive VRAM footprint driving up infrastructure costs",
    solutionTitle: "Weight Quantization (INT8/FP8)",
    solutionDesc: "Transitioning model weights to lower precision formats.",
    outcome: "50% memory reduction; 40% cost reduction per million tokens."
  },
  {
    id: 4,
    problem: "KV Cache memory bottlenecks on long-context windows",
    solutionTitle: "PagedAttention (vLLM) Integration",
    solutionDesc: "Fragmenting KV cache into fixed-size blocks for non-contiguous memory allocation.",
    outcome: "90% KV cache memory utilization; supports 3x larger batch sizes."
  },
  {
    id: 5,
    problem: "High operational costs for deploying massive parameter models",
    solutionTitle: "Knowledge Distillation",
    solutionDesc: "Training smaller student models from larger teacher ensembles.",
    outcome: "60% compute cost reduction; 95% accuracy retained on GSM8K (math reasoning)."
  },
  {
    id: 6,
    problem: "Cold-start latency during auto-scaling events",
    solutionTitle: "Pre-warmed Instance Pooling & Snapshot Loading",
    solutionDesc: "Maintaining ready-states with memory-mapped weights.",
    outcome: "<500ms cold-start TTFT; seamless auto-scaling."
  },
  {
    id: 7,
    problem: "Quadratic compute scaling with context length",
    solutionTitle: "Sparse Attention & Ring Attention",
    solutionDesc: "Modifying attention mechanisms to limit token-to-token comparisons.",
    outcome: "4x context window expansion; O(n log n) scaling."
  },
  {
    id: 8,
    problem: "Model hallucinations on factual prompts",
    solutionTitle: "Inference-Time Intervention (ITI)",
    solutionDesc: "Adjusting activation patterns across attention heads to enforce truthfulness.",
    outcome: "+15% improvement on TruthfulQA; negligible latency overhead."
  },
  {
    id: 9,
    problem: "Poor logical reasoning in complex tasks",
    solutionTitle: "Chain-of-Thought (CoT) & Self-Consistency Engine",
    solutionDesc: "Structured decoding forcing step-by-step reasoning paths.",
    outcome: "+12% accuracy on GSM8K; improved output coherence."
  },
  {
    id: 10,
    problem: "Subpar code generation and syntax errors",
    solutionTitle: "Domain-Specific Fine-Tuning & Execution Feedback (RLHF)",
    solutionDesc: "Refining models on verified code repositories.",
    outcome: "+20% pass@1 rate on HumanEval."
  },
  {
    id: 11,
    problem: "Tokenization inefficiencies inflating compute costs",
    solutionTitle: "Custom Tokenizer Training",
    solutionDesc: "Developing domain-specific BPE tokenizers for enterprise jargon.",
    outcome: "15% reduction in tokens per query; proportional cost and latency reduction."
  },
  {
    id: 12,
    problem: "Network bottlenecks in multi-GPU tensor parallelism",
    solutionTitle: "NVLink & Topology Optimization",
    solutionDesc: "Tuning all-to-all communication for distributed inference.",
    outcome: "85% scaling efficiency across 8x GPUs; reduced inter-node latency."
  },
  {
    id: 13,
    problem: "High compute waste from active expert evaluation (MoE)",
    solutionTitle: "Mixture-of-Experts (MoE) Pruning & Routing Optimization",
    solutionDesc: "Refining gate networks to limit active parameters.",
    outcome: "2x faster inference; 40% compute reduction with zero MMLU degradation."
  },
  {
    id: 14,
    problem: "Redundant LLM API calls for identical queries",
    solutionTitle: "Semantic Caching at Inference Layer",
    solutionDesc: "Hashing and matching prompt embeddings to serve cached responses.",
    outcome: "30% cache hit rate; 30% direct cost savings; sub-50ms latency for hits."
  },
  {
    id: 15,
    problem: "Prompt processing latency on massive system prompts",
    solutionTitle: "Prompt Compression (LLMLingua)",
    solutionDesc: "Removing low-information tokens before LLM processing.",
    outcome: "50% prompt token reduction; 30% TTFT improvement."
  },
  {
    id: 16,
    problem: "Edge deployment constraints for remote infrastructure",
    solutionTitle: "4-bit Quantization (AWQ/GPTQ)",
    solutionDesc: "Activation-aware weight quantization for resource-constrained environments.",
    outcome: "70% VRAM reduction; <2% drop on MMLU."
  },
  {
    id: 17,
    problem: "Output degradation and repetition loops",
    solutionTitle: "Advanced Sampling Tuning (Mirostat)",
    solutionDesc: "Dynamically adjusting temperature and top-p to target specific perplexity.",
    outcome: "Elimination of degeneration loops; +10% quality scores on HellaSwag."
  },
  {
    id: 18,
    problem: "Inefficient model routing for varied query complexity",
    solutionTitle: "LLM Cascading & Routing",
    solutionDesc: "Directing simple queries to small models, complex queries to large models.",
    outcome: "45% cost reduction; P99 latency maintained for complex queries."
  },
  {
    id: 19,
    problem: "Redundant compute on static system prompts",
    solutionTitle: "System Prompt KV Cache Pinning",
    solutionDesc: "Persisting KV caches for base instructions across sessions.",
    outcome: "25% TTFT reduction; lower recurring compute costs."
  },
  {
    id: 20,
    problem: "Unreliable structured data extraction (JSON failures)",
    solutionTitle: "Constrained Decoding (Outlines/Guidance)",
    solutionDesc: "Forcing token generation to comply with strict regex/JSON schemas.",
    outcome: "100% valid JSON output; 20% faster parsing; eliminates retry logic."
  }
];

export const ragOptimizationOfferings: OptimizationOffering[] = [
  {
    id: 1,
    problem: "Poor retrieval precision (irrelevant top results)",
    solutionTitle: "Cross-Encoder Reranking",
    solutionDesc: "Implementing late-stage rerankers (e.g., Cohere/BGE) over bi-encoder outputs.",
    outcome: "+35% improvement in nDCG@5; higher context precision."
  },
  {
    id: 2,
    problem: "Slow vector search latency on massive datasets",
    solutionTitle: "HNSW Index Tuning",
    solutionDesc: "Optimizing Hierarchical Navigable Small World graph parameters (efC, efS).",
    outcome: "10x faster search; 95%+ Recall@10 maintained."
  },
  {
    id: 3,
    problem: "Lost semantic context during chunking",
    solutionTitle: "Semantic & Late Chunking",
    solutionDesc: "Embedding sentences before chunking to preserve contextual meaning.",
    outcome: "+20% Recall@K; improved faithfulness scores."
  },
  {
    id: 4,
    problem: "Out-of-domain retrieval failures",
    solutionTitle: "Contrastive Fine-Tuning of Embeddings",
    solutionDesc: "Training embedding models on enterprise-specific corpora.",
    outcome: "+25% Mean Reciprocal Rank (MRR) for domain queries."
  },
  {
    id: 5,
    problem: "Vector database index bloat and memory costs",
    solutionTitle: "Product Quantization (PQ) & IVF Indexing",
    solutionDesc: "Compressing vectors for high-volume, low-latency search.",
    outcome: "80% memory reduction; <5ms p99 search latency."
  },
  {
    id: 6,
    problem: "Multi-hop reasoning failures across disparate docs",
    solutionTitle: "GraphRAG Integration",
    solutionDesc: "Fusing vector search with knowledge graphs to map entity relationships.",
    outcome: "+40% accuracy on complex multi-hop queries; richer context."
  },
  {
    id: 7,
    problem: "Low faithfulness and grounded hallucinations",
    solutionTitle: "RAGAS Evaluation & Faithfulness Tuning",
    solutionDesc: "Automated pipeline to detect ungrounded claims and tune prompts.",
    outcome: "+30% faithfulness score; strict adherence to retrieved context."
  },
  {
    id: 8,
    problem: "User query ambiguity leading to poor retrieval",
    solutionTitle: "Query Expansion & HyDE",
    solutionDesc: "Generating hypothetical answers to embed alongside the query.",
    outcome: "+15% Recall@10; more robust retrieval of relevant docs."
  },
  {
    id: 9,
    problem: "Token overflow and LLM context window exhaustion",
    solutionTitle: "Contextual Compression",
    solutionDesc: "Filtering out irrelevant sentences/paragraphs from retrieved chunks pre-injection.",
    outcome: "40% token efficiency; reduced inference costs; lower TTFT."
  },
  {
    id: 10,
    problem: "Redundant embedding API costs for static documents",
    solutionTitle: "Embedding Caching (Redis/Memcached)",
    solutionDesc: "Storing embeddings for unchanged text chunks.",
    outcome: "50% reduction in embedding API costs; faster ingestion throughput."
  },
  {
    id: 11,
    problem: "Inefficient metadata filtering post-retrieval",
    solutionTitle: "Hybrid Search (BM25 + Vector) & Pre-filtering",
    solutionDesc: "Applying structured metadata filters before vector search.",
    outcome: "50% faster filtered queries; 100% precision on metadata constraints."
  },
  {
    id: 12,
    problem: "Stale documents in the vector index",
    solutionTitle: "Incremental Indexing & Time-Decay Logic",
    solutionDesc: "Automating upserts/deletes and deprioritizing old data.",
    outcome: "100% data freshness; 90% reduction in re-indexing compute."
  },
  {
    id: 13,
    problem: "Table and structured data retrieval failures",
    solutionTitle: "Text-to-SQL + Vector Hybrid Routing",
    solutionDesc: "Dynamically routing structured queries to SQL engines.",
    outcome: "+45% accuracy on tabular queries; prevents LLM data hallucination."
  },
  {
    id: 14,
    problem: "Retrieval of incomplete information blocks",
    solutionTitle: "Parent-Child Document Retrieval",
    solutionDesc: "Embedding small chunks for precision, returning parent chunks for context.",
    outcome: "30% better context utilization; improved answer completeness."
  },
  {
    id: 15,
    problem: "Semantic loss in short queries",
    solutionTitle: "Multi-Vector Retrieval (ColBERT-style)",
    solutionDesc: "Storing token-level embeddings for late-interaction matching.",
    outcome: "+20% Precision@1; highly robust to out-of-vocabulary terms."
  },
  {
    id: 16,
    problem: "High LLM costs processing large retrieved contexts",
    solutionTitle: "Prompt Caching for Retrieved Context",
    solutionDesc: "Caching prefix tokens of frequently retrieved documents.",
    outcome: "40% cost reduction; 30% latency drop on repeated knowledge domains."
  },
  {
    id: 17,
    problem: "Inconsistent entity retrieval across synonyms",
    solutionTitle: "Entity Extraction & Metadata Tagging",
    solutionDesc: "Enriching chunks with standardized named entities pre-indexing.",
    outcome: "+25% MRR for entity-based searches; improved recall."
  },
  {
    id: 18,
    problem: "User typos breaking semantic search",
    solutionTitle: "Query Normalization & Spell-Check Pipelines",
    solutionDesc: "Pre-processing queries to correct syntax.",
    outcome: "+15% retrieval accuracy on noisy inputs."
  },
  {
    id: 19,
    problem: "Low answer relevance despite good retrieval",
    solutionTitle: "Answer-Prefix Prompting",
    solutionDesc: "Guiding the LLM to explicitly reference retrieved chunks.",
    outcome: "+20% answer relevance (RAGAS); improved user satisfaction."
  },
  {
    id: 20,
    problem: "Scalability bottlenecks during bulk ingestion",
    solutionTitle: "Parallelized Ingestion Pipelines (Kafka + Ray)",
    solutionDesc: "Distributing document parsing, embedding, and indexing.",
    outcome: "10x document ingestion throughput; zero pipeline backpressure."
  }
];

export const agenticOptimizationOfferings: OptimizationOffering[] = [
  {
    id: 1,
    problem: "Coordination overhead and deadlocks in multi-agent systems",
    solutionTitle: "Hierarchical Agent Orchestration",
    solutionDesc: "Implementing manager-worker topologies to centralize control logic.",
    outcome: "40% faster decision cycles; eliminated agent deadlocks."
  },
  {
    id: 2,
    problem: "Redundant LLM calls across different agents",
    solutionTitle: "Shared State & Memory Caching",
    solutionDesc: "Injecting centralized short-term memory accessible to all agents.",
    outcome: "30% reduction in compute waste; lower token expenditure."
  },
  {
    id: 3,
    problem: "Blocking execution during tool/API calls",
    solutionTitle: "Asynchronous Tool Execution & Polling",
    solutionDesc: "Deploying non-blocking I/O for external tool calls.",
    outcome: "50% reduction in idle agent time; 2x pipeline throughput."
  },
  {
    id: 4,
    problem: "Inefficient task allocation causing compute bottlenecks",
    solutionTitle: "Dynamic Task Allocation",
    solutionDesc: "Routing sub-tasks to specialized lightweight models based on complexity scoring.",
    outcome: "25% improved pipeline efficiency; optimized resource utilization."
  },
  {
    id: 5,
    problem: "Hallucinated tool usage and API payload errors",
    solutionTitle: "Constrained Function Calling & Schema Validation",
    solutionDesc: "Enforcing strict JSON schemas for tool inputs.",
    outcome: "95%+ successful tool executions; zero parsing failures."
  },
  {
    id: 6,
    problem: "Context window overflow in long-running autonomous loops",
    solutionTitle: "Sliding Window Memory Management",
    solutionDesc: "Automatically summarizing and pruning historical agent steps.",
    outcome: "Prevents 100% context overflow errors; 20% faster loop execution."
  },
  {
    id: 7,
    problem: "High cost of continuous reasoning in agent loops",
    solutionTitle: "Step-Back Prompting & Adaptive Compute",
    solutionDesc: "Simplifying prompts for routine steps, reserving deep reasoning for complex ones.",
    outcome: "40% cost reduction per autonomous run; maintained task accuracy."
  },
  {
    id: 8,
    problem: "Infinite loops and runaway compute in autonomous tasks",
    solutionTitle: "Max-Iteration Guards & Circuit Breakers",
    solutionDesc: "Hard limits and anomaly detection on agent reasoning chains.",
    outcome: "100% prevention of infinite loops; strict budget adherence."
  },
  {
    id: 9,
    problem: "Sub-optimal planning in multi-step tasks",
    solutionTitle: "Tree of Thoughts (ToT) Optimization",
    solutionDesc: "Implementing self-evaluation heuristics to prune bad paths early.",
    outcome: "35% higher end-to-end task completion rate."
  },
  {
    id: 10,
    problem: "Poor observability and debugging in distributed AI",
    solutionTitle: "Agent Tracing & Telemetry (LangSmith/Phoenix)",
    solutionDesc: "Full-stack tracing of thought processes and tool calls.",
    outcome: "60% faster Mean Time To Resolution (MTTR) for agent failures."
  }
];
