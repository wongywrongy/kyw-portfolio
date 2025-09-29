# APM v0.4 - Memory Log Guide
This guide defines how Implementation Agents log their work for Manager Agents and Users. Memory Logs capture task-level context using two format variants:
- Markdown (Simple & Dynamic-MD)
- JSON (Dynamic-JSON)

Both Manager and Implementation Agents must read this guide during session initialization. Implementation Agents reference it when logging; Manager Agents use it when reviewing logs.

## 1. Memory System Variant Overview
Summary of the three Memory System variants, their storage layouts and log formats:

- Simple
  - Storage: `Memory/` folder with inline sections in `Memory_Bank.md`
  - Format: Markdown, entries separated by `---`
  - Each section is a task log; summaries appended after logical groups as needed

- Dynamic-MD
  - Storage: `Memory/` folder with subfolders `Phase_XX_<slug>/`
  - Format: One `Task_XX_<slug>.md` file per task (Markdown)

- Dynamic-JSON **(Testing Preview)**
  - Storage: Same as Dynamic-MD
  - Format: One `Task_XX_<slug>.json` file per task (JSON, schema at `prompts/schemas/memory_log.schema.json`)
  - **Testing Preview - Not for Production (JSON):**
    - Intended for advanced testing scenarios requiring strict workflow validation, maximum LLM parsing fidelity, and active context retention
    - Designed for "token-wealthy" Users unconcerned with token consumption, or APM contributors seeking to experiment and provide feedback on asset structure and parsing efficiency
    - Experimental only; not suitable for production or resource-constrained use due to much higher token consumption
    - **WARNING:** JSON logs consume at least 15% more tokens, often 2x–3x higher than Markdown, and will fill the context window much faster, resulting in more frequent Handovers and context resets

Memory Logs are written by Implementation Agents after each task or when blockers occur. Manager Agents review logs to track progress and plan next steps.

## 2. Memory Log Structure Specifications
All Memory Log entries must follow a precise structure to ensure clarity, traceability, and context retention. The format for each log entry, adapting for the specific Memory System variant (Simple, Dynamic-MD, or Dynamic-JSON):

### 2.1. Simple Variant Log Entry Format
For Simple variant systems, entries are inline sections in `Memory_Bank.md` separated by `---`. Use structured headers for efficient parsing:

```markdown
---

## [Agent ID] - [Task Reference]
* **Status:** [Completed|Partial|Blocked|Error]

* **Output:** [Deliverables, file paths, key results]

* **Issues:** [Blockers/errors or None]

* **Next:** [Follow-up actions or None]
```

### 2.2. Dynamic-MD Variant Memory Log Format
For Dynamic-MD systems, each log is in a dedicated file created empty by Manager Agent, then populated by Implementation Agent. Use parsable Markdown with YAML front-matter and minimal formatting. Include optional sections only when their front-matter boolean is true:

```yaml
---
agent: [Agent ID]
task_ref: [Task_ID]
status: [Completed|Partial|Blocked|Error]
ad_hoc_delegation: [true|false]
compatibility_issues: [true|false]
important_findings: [true|false]
---
```
```markdown

# Task Log: [Task Reference]

## Summary
[1-2 sentences describing main outcome]

## Details
[Work performed, decisions made, steps taken in logical order]

## Output
- File paths for created/modified files
- Code snippets (if necessary, ≤ 20 lines)
- Configuration changes
- Results or deliverables

## Issues
[Specific blockers or errors, include error messages if relevant, or "None"]

## Compatibility Concerns
[Only include this section if compatibility_issues: true]
[Any compatibility issues identified]

## Ad-Hoc Agent Delegation
[Only include this section if ad_hoc_delegation: true]
[Details of any agent delegation that occurred during this task]

## Important Findings
[Only include this section if important_findings: true]
[Project-relevant information discovered during work that Manager must know]

## Next Steps
[Follow-up actions or instructions for next agent or "None"]
```

## 3. JSON Variant Specification
JSON Memory Logs follow identical rules and structure as Markdown but use schema validation at `/prompts/schemas/memory_log.schema.json`. All requirements for agent IDs, task references, status tracking, output documentation, and content guidelines apply as described for Markdown.

### **Testing Preview - Not for Production (JSON)**
- Intended for advanced testing scenarios requiring strict workflow validation, maximum LLM parsing fidelity, and active context retention
- Designed for "token-wealthy" Users unconcerned with token consumption, or APM contributors seeking to experiment and provide feedback on asset structure and parsing efficiency
- Experimental only; not suitable for production or resource-constrained use due to much higher token consumption
- **WARNING:** JSON logs consume at least 15% more tokens, often 2x–3x higher than Markdown, and will fill the context window much faster, resulting in more frequent Handovers and context resets

## 4. Implementation Agent Workflow
Main responsibilities and workflow steps for Implementation Agents when working with the Memory System:

1. **Receive Task Assignment:** Manager Agent provides a task prompt via the User with the `memory_log_path` specified in the YAML frontmatter pointing to an empty log file.
2. **Execute Task:** Work on the assigned task as described in the Task Assignment Prompt. Complete the task or note any issues, blockers, or bugs that prevent completion.
3. **Update Log:** Fill in all required fields in the provided log file using the correct format defined in sections 2 and 3.
4. **Report Outcome:** Notify the User of task completion or issues, confirming the Memory Log is updated.

## 5. Manager Agent Workflow
Main responsibilities and workflow steps for Manager Agents when maintaining the Memory System:

1. **Create Empty Logs:** At the start of each phase, create **completely empty** log files (or inline sections) for all phase tasks.  **DO NOT populate any content.** Implementation Agents will fill in the entire structure when executing tasks.
2. **Attach to Assignments:** Include the appropriate empty log file path (or inline section) with each task assignment prompt sent to Implementation Agents.
3. **Review Completed Logs:** When the User returns with a completed task, review the log content for:
  - Task completion status and quality
  - Any blockers or issues requiring attention
  - Outputs that inform subsequent task assignments
4. **Decide Next Action:** Based on log review, determine whether to:
  - Send follow-up prompt to same agent (if task was blocked or needs refinement)
  - Assign ad-hoc agent for specialized work or issue resolution
  - Continue with next planned task assignment (if all is well)

## 6. Content Guidelines

### 6.1. Writing Concisely and Effectively
- Summarize outcomes instead of listing every step
- Focus on key decisions and reasons, especially if plans changed
- Reference artifacts by path, avoid large code blocks
- Include code snippets only for novel, complex, or critical logic (≤ 20 lines)
- Link actions to requirements from the task description when relevant
- Include valuable explanations provided during task execution when they offer user insights

### 6.2. Code and Output Handling
- For code changes: show relevant snippets with file paths, not entire files
- For large outputs: save to a separate file and reference the path
- For error messages: include relevant stack traces or error details
- For configurations: note key settings changed and why

### 6.3. Issues and Blockers
When logging blockers or errors:
- Be specific about what prevented completion
- Provide actionable information for the Manager Agent
- Include error messages or diagnostic info
- Suggest potential solutions if possible

### 6.4. Example Quality Comparison

- Poor logging: "I worked on the API endpoint. I made some changes to the file. There were some issues but I fixed them. The endpoint works now."

- Good Logging:
```markdown
---
agent: Agent_Backend
task_ref: Task 2.3
status: Completed
ad_hoc_delegation: false
compatibility_issues: false
important_findings: false
---

# Task Log: Task 2.3 - API User Endpoint

## Summary
Implemented POST /api/users endpoint with input validation and fixed CORS issues blocking frontend requests.

## Details
- Added user registration route in routes/users.js using express-validator for email and password checks
- Updated server.js CORS settings to allow frontend integration  
- Tested endpoint with valid/invalid data to confirm validation and CORS fixes

## Output
- Modified files: routes/users.js, server.js
- Endpoint functionality: Accepts {email, password, name}; validates input; returns 201 on success, 400 on error
- Key validation logic added for email format, password length, and required name field

## Issues
None

## Next Steps
- Add unit/integration tests for validation and CORS
- Update API docs for new endpoint
```

---

**End of Guide**