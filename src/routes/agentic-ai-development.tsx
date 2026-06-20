import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetail, OfferingDetail } from "@/components/site/ServiceDetail";
import { OptimizationMatrix } from "@/components/site/OptimizationMatrix";
import { PartnerSection } from "@/components/site/PartnerSection";
import { agenticOptimizationOfferings } from "@/data/optimization-offerings";

const detailedOfferings: OfferingDetail[] = [
  {
    title: "1. Multi-Agent Workflow Orchestration & Coordination",
    subtitle: "Complex task decomposition through specialized agent teams",
    description: "Designing and building advanced multi-agent systems where specialized agents (e.g. planners, executors, validators) collaborate, deliberate, and orchestrate business operations via structured routing, debate, and consensus mechanisms.",
    keySituations: [
      "Single-prompt or standard RAG agents stalling, repeating, or failing when handling complex multi-step processes.",
      "Need to run parallel research, analysis, and validation tasks with cross-validation gates.",
      "High rate of execution drift in long-running agent workflows."
    ],
    keyStatistics: [
      "Complex task completion rate: Improved to 92-96%",
      "Workflow execution loop failures: Reduced by 85%",
      "Task decomposition latency: Optimized for sub-second agent routing",
      "Resource coordination efficiency: Enhanced with Ray-based parallel orchestrations"
    ],
    offeringValue: "Solves complex business logic that single agents fail to navigate, producing deterministic enterprise outcomes.",
    expectedOutcomes: [
      "Stateful agent workflows designed on LangGraph or CrewAI.",
      "Supervised debate layers ensuring multi-agent output verification.",
      "Operational dashboards showing agent collaboration traces and state transitions."
    ]
  },
  {
    title: "2. Agent Tool Integration & Action Gating (Human-in-the-Loop)",
    subtitle: "Secure enterprise API bindings and action governance",
    description: "Developing robust Model Context Protocol (MCP) servers and tool-integration connectors, wrapped in a compliance-oriented governance gateway that requires explicit human validation for high-risk actions (e.g. database edits, API writes, transactions).",
    keySituations: [
      "AI agents requiring write permissions to core business systems without guardrail oversight.",
      "Integration challenges when binding legacy enterprise databases and software APIs to LLMs.",
      "Risks of agents running unverified external API writes or database transactions."
    ],
    keyStatistics: [
      "Unauthorized action executions: 0% through strict action gating",
      "Integration development velocity: 3x faster utilizing standardized MCP servers",
      "Human-in-the-loop review friction: Minimized with unified email/slack action approvals",
      "Tool call routing accuracy: 98.5% precision on function selector schemas"
    ],
    offeringValue: "Enables agents to perform real-world actions on production systems while maintaining absolute business control.",
    expectedOutcomes: [
      "Custom MCP servers connecting agents securely to databases and APIs.",
      "Interactive human-approval dashboard for gating high-risk agent operations.",
      "Granular permission scopes for each agent, tool, and database execution."
    ]
  }
];

export const Route = createFileRoute("/agentic-ai-development")({
  head: () => ({
    meta: [
      { title: "Agentic AI & Multi-Agent Development — Autonomous Systems | TrustGrid.AI" },
      { name: "description", content: "Build autonomous AI agents and multi-agent fleets capable of planning, reasoning, tool execution, and secure human-in-the-loop operations across enterprise workflows." },
      { property: "og:title", content: "Agentic AI & Multi-Agent Development | TrustGrid.AI" },
      { property: "og:description", content: "Autonomous AI agents engineered for enterprise scale with multi-agent orchestration and tool gating." },
      { property: "og:url", content: "/agentic-ai-development" },
    ],
    links: [{ rel: "canonical", href: "/agentic-ai-development" }],
  }),
  component: () => (
    <ServiceDetail
      eyebrow="Agentic AI & Multi-Agent Development"
      title="Engineering autonomous AI agents for the enterprise"
      description="From single-agent copilots to orchestrated multi-agent fleets, we build production-grade agentic systems that plan, reason, use tools, and operate under robust policy guardrails and human oversight."
      outcomes={[
        { value: "92-96%", label: "Task completion" },
        { value: "85%", label: "Failure loop reduction" },
        { value: "3x", label: "Tool integration speed" },
        { value: "0", label: "Unauthorized executions" },
      ]}
      capabilities={[
        { title: "Single-Agent Systems", desc: "Goal-directed agents with planning, tool use and reflection loops." },
        { title: "Multi-Agent Systems", desc: "Specialist agent teams coordinated via routing, debate and consensus." },
        { title: "Agent Memory Systems", desc: "Episodic, semantic and procedural memory across sessions and years." },
        { title: "Tool & MCP Integration", desc: "Function calling, API binding, Model Context Protocol (MCP) servers." },
        { title: "Agent Governance & Control", desc: "Policy engines, action gating, evaluation harnesses and audit trails." },
        { title: "Human Oversight (HITL)", desc: "Approval gates, interruptibility, Slack/Email approval loops." },
      ]}
      stack={["LangGraph", "CrewAI", "AutoGen", "OpenAI Agents SDK", "MCP", "LangSmith", "Ray"]}
      detailedOfferings={detailedOfferings}
    >
      <OptimizationMatrix
        title="Agentic AI Optimization (Software-Level)"
        description="As AI systems transition from passive responders to autonomous agents, software-level orchestration becomes critical. We optimize multi-agent pipelines, reducing compute waste and accelerating decision cycles."
        offerings={agenticOptimizationOfferings}
      />
      <PartnerSection />
    </ServiceDetail>
  ),
});
